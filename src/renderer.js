document.getElementById('fetch-orders').addEventListener('click', async () => {
  const orders = await window.electronAPI.getOrders();
  const orderList = document.getElementById('order-list');
  orderList.innerHTML = orders.map(order => `<li>${order.customerName}: ${order.orderDetails}</li>`).join('');
});

document.getElementById('fetch-inventory').addEventListener('click', async () => {
  const inventory = await window.electronAPI.getInventory();
  const inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = inventory.map(item => `<li>${item.itemName}: ${item.quantity} units</li>`).join('');
});

const addOrderForm = document.getElementById('addOrderForm');
addOrderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const orderData = {
        customerName: document.getElementById('customerName').value,
        orderDetails: document.getElementById('orderDetails').value,
        totalPrice: parseFloat(document.getElementById('totalPrice').value),
        status: document.getElementById('status').value
    };

    window.electronAPI.send('add-order', orderData);

    window.electronAPI.receive('add-order-response', (data) => {
        if (data.success) {
            alert('Order added successfully! Order ID: ' + data.orderId);
            addOrderForm.reset(); // Reset form after successful submission
        } else {
            alert('Failed to add order: ' + data.message);
        }
    });
});
