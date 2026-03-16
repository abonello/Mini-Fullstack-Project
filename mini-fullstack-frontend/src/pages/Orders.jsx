import {useEffect, useState} from "react";
import NewOrderForm from '../components/NewOrderForm.jsx';
import OrdersList from '../components/OrdersList.jsx';

// const BASE_URL = "http://localhost:5165/api/";

export default function Orders() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <>
            <NewOrderForm onOrderCreated={() => setRefreshKey((prev) => prev + 1)} />
            <OrdersList key={refreshKey} />
        </>
    )
}