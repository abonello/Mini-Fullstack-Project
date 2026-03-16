import {useEffect, useState} from "react";
import CustomerList from '../components/CustomerList.jsx';
import CustomerForm from '../components/CustomerForm.jsx';

// const BASE_URL = "http://localhost:5165/api/";

export default function Customers() {
    // const [customers, setCustomers] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);


      

    return (
        <div>
            <h1>Mini Full-Stack App - Customers</h1>
            <CustomerForm onCustomerCreated={() => setRefreshKey((prev) => prev + 1)} />
            <CustomerList key={refreshKey} />
        </div>
    );
}


