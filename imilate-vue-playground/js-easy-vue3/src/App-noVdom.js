
import { reactive } from '../core/reactivity/index.js'

// vue3
export default {
  render(context) {
    //  js --> diff

    // build virtual dom
    // tag
    // props 
    // children
    //
    const div = document.createElement('div')
    div.innerHTML = context.state.count;
    return div
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


