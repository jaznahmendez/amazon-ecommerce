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

/*
// SQL Server configuration
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server', 
    database: 'your_database',
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

// Connect to SQL Server
sql.connect(config).then(pool => {
    console.log('Connected to SQL Server');

    // Define a route to get data from SQL Server
    app.get('/data', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM your_table');
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

sql.on('error', err => {
    console.error('SQL error:', err);
});
*/

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
