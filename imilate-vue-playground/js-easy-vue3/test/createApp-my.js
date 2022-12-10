import { effectWatch, reactive, ref } from '../core/reactivity/index.js'
// vue3
const App = {
  render(context) {
    // 构建 view = b
    const root = document.getElementById('root')
    const button = document.createElement('button')
    button.innerText = 'add-test'
    button.addEventListener('click', (e) => {
      console.log(e.target.value)
      window.state.count++
    })
    document.body.append(button)
    effectWatch(() => {
      // reset
      root.innerHTML = ``
      const div = document.createElement('div')
      div.innerHTML = context.state.count;
      // root
      root.append(div)
    })


  },
  setup() {
    // a = 响应式数据
    const state = reactive({
      count: 0
    })

    window.state = state
    return { state }
  }
}

App.render(App.setup())

