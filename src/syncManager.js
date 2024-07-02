const { ipcRenderer } = require('electron');

const syncData = async (db) => {
  return ipcRenderer.invoke('sync-data');
};

module.exports = {
  syncData,
};
