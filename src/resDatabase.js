const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Database connected!');
    }
});

const sampleOrders = [
    { customerName: 'Alice Johnson', orderDetails: '2x Pizza, 1x Soda', totalPrice: 24.99, status: 'completed' },
    { customerName: 'Bob Smith', orderDetails: '1x Coffee, 1x Bagel', totalPrice: 5.75, status: 'pending' },
    { customerName: 'Carol White', orderDetails: '3x Burger, 2x Fries', totalPrice: 29.45, status: 'completed' },
    { customerName: 'Dave Brown', orderDetails: '1x Pizza, 1x Ice Cream', totalPrice: 18.20, status: 'canceled' }
];

sampleOrders.forEach(order => {
    const { customerName, orderDetails, totalPrice, status } = order;
    const sql = `INSERT INTO orders (customerName, orderDetails, totalPrice, status) VALUES (?, ?, ?, ?)`;
    db.run(sql, [customerName, orderDetails, totalPrice, status], function(err) {
        if (err) {
            console.error('Failed to insert order:', err.message);
        } else {
            console.log(`Order added with ID: ${this.lastID}`);
        }
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
