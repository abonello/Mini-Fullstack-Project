using System.Text.Json.Serialization;

namespace MiniFullStackApi.Models;

public class Order
{
    public int Id { get; set; }
    public string Product { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; }

    public int CustomerId { get; set; }
    [JsonIgnore] // Prevent circular reference during JSON serialization
    public Customer Customer { get; set; }
}