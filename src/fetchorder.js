const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

function fetchAllOrders(callback) {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) {
            callback(err, null);
            return console.error('Error fetching data', err.message);
        }
        callback(null, rows);
    });
}

function fetchCompletedOrders(callback) {
    db.all('SELECT * FROM orders WHERE status = ?', ['completed'], (err, rows) => {
        if (err) {
            callback(err, null);
            return console.error('Error fetching data', err.message);
        }
        callback(null, rows);
    });
}

// Using the fetch functions
fetchAllOrders((err, orders) => {
    if (err) {
        console.error('Error while fetching orders:', err);
    } else {
        console.log('All Orders:', orders);
    }
});

fetchCompletedOrders((err, orders) => {
    if (err) {
        console.error('Error while fetching completed orders:', err);
    } else {
        console.log('Completed Orders:', orders);
    }
});

// Close the database
db.close((err) => {
    if (err) {
        console.error('Error closing the database', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
