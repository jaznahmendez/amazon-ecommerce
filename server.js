const express = require('express');
const sql = require('mssql');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));


const config = {
    user: 'Estancias',
    password: 'T3mp0r4l-2024',
    server: 'EC2AMAZ-JU47TK4',
    port: 1433,
    database: '02_Semana_Estancias',
    options: {
      encrypt: true,
      trustServerCertificate: true // or use the certificate file path as mentioned earlier
    }
  };
 
// Connect to SQL Server
sql.connect(config).then(pool => {
    console.log('Connected to SQL Server');

    // Define a route to get data from SQL Server
    app.get('/electronics', async (req, res) => {
        try {
            const result = await pool.request().query(`
                SELECT P.product_name, P.actual_price, R.rating, P.product_id, I.img_link, L.product_link FROM Products P
                JOIN Reviews R ON R.product_id = P.product_id
                JOIN Images I ON I.product_id = P.product_id
                JOIN Links L ON L.product_id = P.product_id
                WHERE P.category_id = 'Electronics'
                group by P.product_name, P.actual_price, R.rating, P.product_id, I.img_link, L.product_link
            `);
            console.log(result);
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // Close the SQL connection when the server is stopped
    process.on('SIGINT', () => {
        sql.close();
        process.exit();
    });

}).catch(err => {
    console.error('SQL Server connection error:', err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
  });
  

sql.on('error', err => {
    console.error('SQL error:', err);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

