import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, updateCustomer } from "../api/api";

const BASE_URL = "http://localhost:5165/api/";

export default function NewOrderForm({onOrderCreated}) {
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        const data = await getCustomers();
        setCustomers(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!customerId || !product || !amount) {
            alert("Please fill in all fields.");
            return;
        }

        const newOrder = {
            customerId,
            product,
            amount: parseFloat(amount),
            status
        };

        try {
            const response = await fetch(`${BASE_URL}customers/${customerId}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Order created successfully!");

            const createdOrder = await response.json();
            console.log("Created order:", createdOrder);
            onOrderCreated();



            // Optionally, reset form fields here
            setCustomerId("");
            setProduct("");
            setAmount("");
            setStatus("Pending");

        }
        catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order. Please try again.");
        }
    }


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>New Order Form</h2>
            <p>This is where the form to create a new order will go.</p>
            <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placehoder="Product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">Create Order</button>
        </form>
    );
}