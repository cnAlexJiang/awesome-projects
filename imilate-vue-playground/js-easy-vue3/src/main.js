import { createApp } from '../core/index.js'
// import App from './App-noVdom.js'
import App from './App-vdom.js'

createApp(App).mount(document.querySelector('#app'))