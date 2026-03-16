import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, updateCustomer } from "../api/api";

export default function CustomerOrderSummary() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        const data = await getCustomers();
        setCustomers(data);
    };

    const handleFetchSummary = async () => {
        if (!selectedCustomerId) {
            alert("Please select a customer.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5165/api/orders/summary/${selectedCustomerId}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched summary:", data);
            setSummary(data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }

    return (
        <div>
            <h2>Customer Order Summary</h2>

            <select
                value={selectedCustomerId}
                onChange={(e) => {setSelectedCustomerId(e.target.value); setSummary(null);}}
            >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>
            <button onClick={handleFetchSummary}>
                Get Orders Summary for <span style={{fontWeight: 700}}>{customers.find(c => c.id == selectedCustomerId)?.name || "Select a customer"}</span>
            </button>

            {summary && (
                <div>
                    <h3>Order Summary for {summary.customerName}</h3>
                    <p>Overall Total: ${summary.overallTotal}</p>
                    
                    <h4>Totals by Status</h4>
                    <ul style={{ listStyle: "none", padding: 0, maxWidth: "400px", margin: "0 auto" }}>
                            {summary.groupedTotals.map((g) => (
                                <li key={g.status}>
                                    {g.status} ({g.count}): ${g.totalAmount}
                                </li>
                        ))}
                    </ul>
                    
                    <h4>Orders</h4>
                    <ul style={{ listStyle: "none", padding: 0, maxWidth: "400px", margin: "0 auto" }}>
                        {summary.orders.map((o) => (
                            <li key={o.id}>
                                {o.product} - ${o.amount} ({o.status})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};