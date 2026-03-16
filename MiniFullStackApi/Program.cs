using Microsoft.EntityFrameworkCore;
using MiniFullStackApi.Models;  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more abo ut configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// builder.Services.AddCors(options =>
// { 
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//                       policy =>
//                       {
//                           policy.WithOrigins()
//                                 .AllowAnyHeader()
//                                 .AllowAnyMethod();
//                       });
// });
builder.Services.AddCors(options =>
{ 
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var app = builder.Build();


/*

// Seed customers and demonstrate CRUD operations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Optional: ensures db is created.
    db.Database.EnsureCreated();

    if (!db.Customers.Any())
    {
        // Seed some data if the database is empty.
        db.Customers.AddRange(
            new Customer { Name = "Alice", Region = "North" },
            new Customer { Name = "Bob", Region = "South" },
            new Customer { Name = "Charlie", Region = "East" }
        );
        db.SaveChanges();
    }

    // List existing customers OR count them
    var customerCount = db.Customers.Count();
    Console.WriteLine($"There are {customerCount} customers in the database.");


    Console.WriteLine("All customers:");
    foreach (var customer in db.Customers)    {
        Console.WriteLine($"- Id: {customer.Id}, Name: {customer.Name} from {customer.Region}");
    }


    // ADD a new customer

    var newCustomer = new Customer
    {
        Name = "Diana",
        Region = "West"
    };

    db.Customers.Add(newCustomer);
    db.SaveChanges();

    Console.WriteLine($"Added new customer: Id: {newCustomer.Id}, Name: {newCustomer.Name} from {newCustomer.Region}");

    Console.WriteLine("\nAll customers:");
    foreach (var customer in db.Customers)
    {
        Console.WriteLine($"- Id: {customer.Id}, Name: {customer.Name} from {customer.Region}");
    }


    // UPDATE a customer
    var customerToUpdate = db.Customers.FirstOrDefault(c => c.Name == "Alice");
    if (customerToUpdate != null)
    {
        customerToUpdate.Region = "Central";
        db.SaveChanges();
        Console.WriteLine($"Updated customer: Id: {customerToUpdate.Id}, Name: {customerToUpdate.Name} now from {customerToUpdate.Region}");
    }

     Console.WriteLine("\nAll customers:");
    foreach (var customer in db.Customers)
    {
        Console.WriteLine($"- Id: {customer.Id}, Name: {customer.Name} from {customer.Region}");
    }

    var customerToDelete = db.Customers.FirstOrDefault(c => c.Name == "Diana");
    if (customerToDelete != null)
    {
        db.Customers.Remove(customerToDelete);
        db.SaveChanges();

        Console.WriteLine($"\nDeleted customer: Id: {customerToDelete.Id}, Name: {customerToDelete.Name} from {customerToDelete.Region}");
    }

}
*/

/*
// Seed orders and demonstrate CRUD operations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Optional: ensures db is created.
    db.Database.EnsureCreated();

    if (!db.Orders.Any())
    {
        // Seed some data if the database is empty.
        var alice = db.Customers.FirstOrDefault(c => c.Name == "Alice");
        var bob = db.Customers.FirstOrDefault(c => c.Name == "Bob");
        var charlie = db.Customers.FirstOrDefault(c => c.Name == "Charlie");

        if (alice is not null && bob is not null && charlie is not null)
        {
            db.Orders.AddRange(
                // new Order { Product = "Widget A", Amount = 19.99, CustomerId = alice.Id },
                // new Order { Product = "Widget B", Amount = 29.99, CustomerId = alice.Id },
                // new Order { Product = "Widget C", Amount = 39.99, CustomerId = bob.Id },
                new Order { CustomerId = alice.Id, Product = "Laptop", Amount = 1200.00, Status = "Pending" },
                new Order { CustomerId = alice.Id, Product = "Mouse", Amount = 25.50, Status = "Pending" },
                new Order { CustomerId = bob.Id, Product = "Tablet", Amount = 450.00, Status = "Pending" },
                new Order { CustomerId = bob.Id, Product = "Keyboard", Amount = 75.00, Status = "Pending" },
                new Order { CustomerId = charlie.Id, Product = "Monitor", Amount = 300.00, Status = "Pending" },
                new Order { CustomerId = charlie.Id, Product = "Headphones", Amount = 85.00, Status = "Pending" }
            );
            db.SaveChanges();

            Console.WriteLine("Seeded orders for Alice, Bob, and Charlie.");
            foreach (var order in db.Orders.Include(o => o.Customer))
            {
                Console.WriteLine($"- Id: {order.Id}, Customer: {order.Customer.Name}, Product: {order.Product}, Amount: {order.Amount}, Status: {order.Status}");
            }
        }
    }

    var orderCount = db.Orders.Count();
    Console.WriteLine($"There are {orderCount} orders in the database.");

    Console.WriteLine("All orders:");
    foreach (var order in db.Orders.Include(o => o.Customer))
    {
        Console.WriteLine($"- Id: {order.Id}, Customer: {order.Customer.Name}, Product: {order.Product}, Amount: {order.Amount}, Status: {order.Status}");
    }

}
*/


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);
// app.UseCors("AllowAll");


// app.MapControllers();

// Get all customers
app.MapGet("/api/customers", async (AppDbContext db) =>
{
    return await db.Customers.Include(c => c.Orders).ToListAsync();
});

// Get a single customer by ID
app.MapGet("/api/customers/{id:int}", async (int id, AppDbContext db) =>
{
    var customer = await db.Customers.Include(c => c.Orders).FirstOrDefaultAsync(c => c.Id == id);
    return customer is not null ? Results.Ok(customer) : Results.NotFound();
});

// Create a new customer
app.MapPost("/api/customers", async (Customer customer, AppDbContext db) =>
{
    db.Customers.Add(customer);
    await db.SaveChangesAsync();
    return Results.Created($"/api/customers/{customer.Id}", customer);
});

// Update an existing customer
app.MapPut("/api/customers/{id:int}", async (int id, Customer updatedCustomer, AppDbContext db) =>
{
    var customer = await db.Customers.FindAsync(id);
    if (customer is null) return Results.NotFound();

    customer.Name = updatedCustomer.Name;
    customer.Region = updatedCustomer.Region;
    await db.SaveChangesAsync();

    return Results.Ok(customer);
});

// Delete a customer
app.MapDelete("/api/customers/{id:int}", async (int id, AppDbContext db) =>
{
    var customer = await db.Customers.FindAsync(id);
    if (customer is null) return Results.NotFound();

    db.Customers.Remove(customer);
    await db.SaveChangesAsync();

    // return Results.NoContent();
    return Results.Ok(customer);
});


// Get all orders
app.MapGet("/api/orders", async (AppDbContext db) =>
{
    // return await db.Orders.Include(o => o.Customer).ToListAsync();

    Console.WriteLine("Fetching all orders");

    var orders = await db.Orders
        .Select(o => new
        {
            o.Id,
            o.Product,
            o.Amount,
            o.Status,
            o.CustomerId,
            CustomerName = o.Customer.Name
        }).ToListAsync();
        Console.WriteLine("Orders with Customer Names:");
        foreach (var order in orders)        {
            Console.WriteLine($"- Id: {order.Id}, Product: {order.Product}, Amount: {order.Amount}, Status: {order.Status}, Customer: {order.CustomerName}");
        }
    return Results.Ok(orders);

});


// Get a single order by ID
app.MapGet("/api/orders/{id:int}", async (int id, AppDbContext db) =>
{
    var order = await db.Orders.Include(o => o.Customer)
                                .FirstOrDefaultAsync(o => o.Id == id);
    return order is not null ? Results.Ok(order) : Results.NotFound();
});

// Get all orders for a specific customer
app.MapGet("/api/customers/{customerId:int}/orders", async (int customerId, AppDbContext db) =>
{
    var customer = await db.Customers.FindAsync(customerId);
    if (customer is null) return Results.NotFound();

    var orders = await db.Orders.Where(o => o.CustomerId == customerId)
                                .Include(o => o.Customer)
                                .ToListAsync();
    return Results.Ok(orders);
});

// Create a new order for a specific customer
app.MapPost("/api/customers/{customerId:int}/orders", async (int customerId, Order order, AppDbContext db) =>
{
    var customer = await db.Customers.FindAsync(customerId);
    if (customer is null) return Results.NotFound();

    order.CustomerId = customerId;
    db.Orders.Add(order);
    await db.SaveChangesAsync();

    return Results.Created($"/api/orders/{order.Id}", order);
});

// Update an existing order
app.MapPut("/api/orders/{id:int}", async (int id, Order updatedOrder, AppDbContext db) =>
{
    var order = await db.Orders.FindAsync(id);
    if (order is null) return Results.NotFound();

    order.Product = updatedOrder.Product;
    order.Amount = updatedOrder.Amount;
    await db.SaveChangesAsync();

    return Results.Ok(order);
});

// Delete an order
app.MapDelete("/api/orders/{id:int}", async (int id, AppDbContext db) =>
{
    var order = await db.Orders.FindAsync(id);
    if (order is null) return Results.NotFound();

    db.Orders.Remove(order);
    await db.SaveChangesAsync();

    // return Results.NoContent();
    return Results.Ok(order);
});

app.MapGet("/api/orders/summary/{customerId:int}", async (int customerId, AppDbContext db) =>
{
    var customer = await db.Customers
        .Include(c => c.Orders)
        .FirstOrDefaultAsync(c => c.Id == customerId);

    if (customer is null) return Results.NotFound();

    var groupedTotals = customer.Orders
                    .GroupBy(o => o.Status)
                    .Select(g => new
                    {
                        Status = g.Key,
                        TotalAmount = g.Sum(o => o.Amount),
                        Count = g.Count()
                    }).ToList();

    var overallTotal = customer.Orders.Sum(o => o.Amount);

    return Results.Ok(new {
        CustomerId = customer.Id,
        CustomerName = customer.Name,
        OverallTotal = overallTotal,
        GroupedTotals = groupedTotals,
        Orders = customer.Orders.Select(o => new {
            o.Id,
            o.Product,
            o.Amount,
            o.Status
        }).ToList() 
    });
});
















app.Run();
