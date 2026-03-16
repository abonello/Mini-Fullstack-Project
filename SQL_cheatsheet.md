# **2️⃣ SQL Cheatsheet (Markdown)**

Here’s a concise cheatsheet you can include in `README.md` and later convert to PDF:

````markdown
# SQL Cheatsheet (SQL Server)

## Database
```sql
CREATE DATABASE MyDb;
USE MyDb;
GO
DROP DATABASE MyDb;
GO


Use master;
GO

ALTER DATABASE SalesDb
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;
GO

DROP DATABASE SalesDb;
GO
````

## Tables

```sql
CREATE TABLE Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Region NVARCHAR(50)
);

CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    Product NVARCHAR(100),
    Amount DECIMAL(10,2),
    Status NVARCHAR(50) DEFAULT 'Pending',
    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId)
        REFERENCES Customers(Id)
        ON DELETE CASCADE
);
```

## Insert Data

```sql
INSERT INTO Customers (Name, Region) VALUES ('Alice', 'North');
INSERT INTO Orders (CustomerId, Product, Amount) VALUES (1, 'Widget', 99.99);
```

## Query Data

```sql
-- All customers
SELECT * FROM Customers;

-- Orders with customer names
SELECT o.Id, c.Name AS CustomerName, o.Product, o.Amount, o.Status
FROM Orders o
JOIN Customers c ON o.CustomerId = c.Id;
```

## Update Data

```sql
UPDATE Customers
SET Region = 'East'
WHERE Name = 'Alice';

UPDATE Orders
SET Status = 'Completed'
WHERE Id = 1;
```

## Delete Data

```sql
DELETE FROM Orders WHERE Id = 1;
DELETE FROM Customers WHERE Id = 1;
```

## Constraints

```sql
ALTER TABLE Orders
ADD CONSTRAINT DF_Orders_Status DEFAULT 'Pending' FOR Status;

ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId)
    REFERENCES Customers(Id)
    ON DELETE CASCADE;
```

## Alter Table

```sql
-- Change column type
ALTER TABLE Orders
ALTER COLUMN Status NVARCHAR(50) NOT NULL;
```

## Misc

```sql
SELECT COUNT(*) FROM Orders;
SELECT SUM(Amount) FROM Orders WHERE Status = 'Pending';
```

````

---

# **3️⃣ Download as MD and PDF**

1. Save the above cheatsheet as `SQL_Cheatsheet.md`.  
2. To convert Markdown → PDF:

**Option A — VS Code + Markdown PDF extension**  
- Install **Markdown PDF** extension in VS Code.  
- Open `SQL_Cheatsheet.md` → Right-click → **Markdown PDF: Export (pdf)**  

**Option B — Using Pandoc (command line)**

```bash
pandoc SQL_Cheatsheet.md -o SQL_Cheatsheet.pdf
````

This will generate a clean PDF.


