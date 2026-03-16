using Microsoft.EntityFrameworkCore;
using MiniFullStackApi.Models;

namespace MiniFullStackApi.Models
{
    public class AppDbContext : DbContext
    {

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .Property(o => o.Amount)
                .HasColumnType("decimal(10,2)");
        }
        
    }
}