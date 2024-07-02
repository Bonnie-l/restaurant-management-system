const { ipcMain } = require('electron');
const Database = require('./database');
const orderManager = require('./orderManager');
const inventoryManager = require('./inventoryManager');
const syncManager = require('./syncManager');

// Setup database
const db = new Database('restaurant.db');

// IPC handlers
ipcMain.handle('get-orders', async () => {
  return orderManager.getOrders(db);
});

ipcMain.handle('add-order', async (order) => {
  return orderManager.addOrder(db, order);
});

ipcMain.handle('get-inventory', async () => {
  return inventoryManager.getInventory(db);
});

ipcMain.handle('update-inventory', async (item) => {
  return inventoryManager.updateInventory(db, item);
});

ipcMain.handle('sync-data', async () => {
  return syncManager.syncData(db);
});
