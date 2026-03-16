import { useState } from "react";
import { createCustomer } from "../api/api";

export default function CustomerForm({ onCustomerCreated }) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const newCustomer = { name, region };
    const createdCustomer = await createCustomer(newCustomer);
    if (createdCustomer) {
      onCustomerCreated(createdCustomer);
      setName("");
      setRegion("");
    } else {
      alert("Failed to create customer. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "60px" }}>
        <h2>Create Customer</h2>
      <div>
        <label style={{ display: "flex", justifyContent: "space-between",  maxWidth: "250px", margin: "0 auto 5px" }}>
          Name:
          <input
            
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label style={{ display: "flex", justifyContent: "space-between",  maxWidth: "250px", margin: "0 auto 5px" }}>
          Region:
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Create Customer</button>
    </form>
  );
}