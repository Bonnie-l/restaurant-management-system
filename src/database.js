const sqlite3 = require('sqlite3').verbose();

/*class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database('./mydatabase.db', (err) => {
      if (err) {
        console.error('Database opening error: ', err);
      } else {
        console.log('Connected to the SQLite database.');
        this.initialize();
      }
    });
  }

  initialize() {
    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    orderDetails TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    status TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);
    `;

    const createInventoryTable = `
      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY,
        itemName TEXT,
        quantity INTEGER,
        price REAL
      );
    `;

    this.db.run(createOrdersTable);
    this.db.run(createInventoryTable);
  }

  runQuery(query, params) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  getQuery(query, params) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}*/

//module.exports = Database;

const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
      console.error('Error opening database', err.message);
  } else {
      console.log('Database connected!');
  }
});

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT NOT NULL,
      orderDetails TEXT NOT NULL,
      totalPrice REAL NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'canceled')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

db.run(createOrdersTable, (err) => {
  if (err) {
      console.error('Error creating orders table', err.message);
  } else {
      console.log('Orders table created successfully!');
  }
});

db.close((err) => {
  if (err) {
      console.error('Error closing database', err.message);
  }
});