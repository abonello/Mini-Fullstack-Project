using System.Collections.Generic;

namespace MiniFullStackApi.Models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Region { get; set; }

    public ICollection<Order> Orders { get; set; }
}