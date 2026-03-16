import { useState } from 'react'
// import CustomerList from './components/CustomerList';
// import CustomerForm from './components/CustomerForm';
import Customers from './pages/Customers.jsx';
import Orders from './pages/Orders.jsx';
import CustomerOrderSummary from './pages/CustomerOrderSummary.jsx';
// import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css'

function App() {
  // const [refreshKey, setRefreshKey] = useState(0)
  const [page, setPage] = useState('customers')




  // return (
  //   <Router>
  //     <nav>
  //       <Link to="/">Customers</Link>
  //       <Link to="/orders">Orders</Link>
  //     </nav>
  //     <Routes>
  //       <Route path="/" element={<Customers />} />
  //       <Route path="/orders" element={<Orders />} />
  //     </Routes>
  //   </Router>
  // )

  const renderPAge = () => {
    switch (page) {
      case 'customers':
        return <Customers />
      case 'orders':
        return <Orders />
      case 'summary':
        return <CustomerOrderSummary />
      default:
        return <Customers />
    }
  }

  return (
    <div>
      <h1>Mini Full Stack App</h1>
      <nav>
        <button onClick={() => setPage('customers')}>Customers</button>
        <button onClick={() => setPage('orders')}>Orders</button>
        <button onClick={() => setPage('summary')}>Customer Order Summary</button>
      </nav>

      <hr />

      {/* {page === 'customers' && <Customers />}
      {page === 'orders' && <Orders />}
      {page === 'summary' && <CustomerOrderSummary />} */}

      {renderPAge()}

    </div>
  )
}

export default App
