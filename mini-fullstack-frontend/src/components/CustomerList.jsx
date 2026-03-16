import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, updateCustomer } from "../api/api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: "", region: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const data = await getCustomers();
    setCustomers(data);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const success = await deleteCustomer(id);
      if (success) {
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        alert("Failed to delete customer. Please try again.");
      }
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!editingCustomer) return;
    // Call API to update customer here, then refresh list

    const response = await updateCustomer(editingCustomer.id, formData);
    if (!response) {
      alert("Failed to update customer. Please try again.");
      return;
    }

    if (response) {
      alert("Customer updated successfully!");
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingCustomer.id ? { ...customer, ...formData } : customer
        )
      );
      setEditingCustomer(null);
    } else {
      alert("Failed to update customer. Please try again.");
    }
    // fetchCustomers();
  }

  function startEdit(customer) {
    setEditingCustomer(customer);
    setFormData({ name: customer.name, region: customer.region });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{ marginBottom: "60px" }}>
      <h2>Customer List</h2>
      <ul style={{ listStyle: "none", padding: 0, maxWidth: "250px", margin: "0 auto" }}>
        {customers.map((customer) => (
          <li key={customer.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px" }}>
            {customer.name} - {customer.region}
            <div> 
              <button onClick={() => startEdit(customer)}>Edit</button>
              <button onClick={() => handleDelete(customer.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingCustomer && (
        <div>
          <form onSubmit={handleUpdate}>
            <h3>Edit Customer</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
            <button type="submit">Update</button>
            <button onClick={() => setEditingCustomer(null)}>Cancel</button>
          </form>
        </div>
      )}

      {/* {customers.map((customer) => (
        <div key={customer.id}>
          <span>{customer.name} - {customer.region}</span>
          <input
            type="text"
            value={customer.region}
            onChange={(e) => handleRegionChange(customer.id, e.target.value)} />
          <button onClick={() => handleDelete(customer.id)}>Delete</button>
        </div>
      ))} */}

    </div>
  );
}