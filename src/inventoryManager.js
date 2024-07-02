const { ipcRenderer } = require('electron');

const getInventory = async (db) => {
  return ipcRenderer.invoke('get-inventory');
};

const updateInventory = async (db, item) => {
  return ipcRenderer.invoke('update-inventory', item);
};

module.exports = {
  getInventory,
  updateInventory,
};
