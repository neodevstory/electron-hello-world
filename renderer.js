const information = document.getElementById('info')
// const log = require('electron-log/renderer');

// information.innerText = `Chrome: v${versions.chrome()}, Node: v${versions.node()}, Electron: v${versions.electron()}`
  
let rx_msg = '';

const func = async () => {
  rx_msg = await window.versions.ping();
  rx_msg = `v.${rx_msg}`;
  information.innerText = rx_msg;
  // log.info(`v.${rx_msg}`);
}
  
func()

window.electronAPI.onUpdateCounter((res) => {
  rx_msg += '\n' + res;
  information.innerText = rx_msg;
  // log.info(rx_msg);
})
