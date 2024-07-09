CREATE LOGIN [Estancias] 
WITH PASSWORD = 'Estancias2024';

USE [02_Semana_Estancias];
GO
CREATE USER [Estancias] FOR LOGIN [Estancias];

USE [02_Semana_Estancias];
GO
-- Grant read/write access
ALTER ROLE db_datareader ADD MEMBER [Estancias];
ALTER ROLE db_datawriter ADD MEMBER [Estancias];

-- Grant execute permissions if needed
GRANT EXECUTE TO [Estancias];


