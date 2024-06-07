const information = document.getElementById('info')

information.innerText = `Chrome: v${versions.chrome()}, Node: v${versions.node()}, Electron: v${versions.electron()}`

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // devtools console에 'pong' 출력
}
  
func()
