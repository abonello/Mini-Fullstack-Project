If you want to setup the database manually the following code will help.

-- 1. Create and select the database
```SQL
CREATE DATABASE SalesDb;
GO

USE SalesDb;
GO
```

-- 2. Create Customers table
```SQL
CREATE TABLE Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Region NVARCHAR(50)
);
GO
```

-- 3. Create Orders table with Status as NVARCHAR(50)
```SQL
CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    Product NVARCHAR(100) NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId)
        REFERENCES Customers(Id)
        ON DELETE CASCADE
);
GO
```

-- 4. Optional: Check your tables
```
SELECT * FROM Customers;
SELECT * FROM Orders;
```

After setting up the database, you can uncomment the Seeding sections in program.cs and execute dotnet run, to get some initial data to play with.
