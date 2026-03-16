import {useEffect, useState} from "react";

const BASE_URL = "http://localhost:5165/api/";

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}orders`)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
                console.log("Fetched orders:", data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading orders...</p>;

    return (
        <div>
            <h2>Orders List</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0, maxWidth: "600px", margin: "0 auto" }}>
                    {orders.map(order => (
                        <li key={order.id}>
                            {/* {order.product} - ${order.amount} - {order.status} (Customer: {order.customer.name}) */}
                            Customer: {order.customerName} | Product: {order.product} | Amount: ${order.amount} | Status: {order.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}