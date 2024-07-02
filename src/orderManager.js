const { ipcRenderer } = require('electron');

const getOrders = async (db) => {
  return ipcRenderer.invoke('get-orders');
};

const addOrder = async (db, order) => {
  return ipcRenderer.invoke('add-order', order);
};

module.exports = {
  getOrders,
  addOrder,
};
