const BASE_URL = "http://localhost:5165"

export async function getCustomers() {
  try {
    const response = await fetch(`${BASE_URL}/api/customers`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched customers:", data);
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}

export async function getCustomerById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/customers/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Fetched customer with ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    return null;
  }
}

export async function createCustomer(customer) {
  try {
    const response = await fetch(`${BASE_URL}/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Created customer:", data);
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    return null;
  }
}

export async function updateCustomer(id, customer) {
  try {
    const response = await fetch(`${BASE_URL}/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Updated customer with ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    return null;
  }
}

export async function deleteCustomer(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/customers/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Deleted customer with ID ${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    return false;
  }
}