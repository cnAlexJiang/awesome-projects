// features 
// 1 dep + effectWatch  
// 2 imitate ref  &  reactive
// 3 createApp  + vdom + easy diss


import { reactive } from '../core/reactivity/index.js'
import { h } from '../core/h.js'
// vue3
export default {
  render(context) {
    //  js --> diff

    // build virtual dom
    // tag
    // props 
    // children
    //
    // const div = document.createElement('div')
    // div.innerHTML = context.state.count;
    // return div

    const children = [...Array(context.state.count).keys()].map(item => h('p', null, 'item-' + item))
    console.log(11, children)
    return h('div', {
      id: 'app -id' + context.state.count,
      class: 'showTime'
    }, children)
  },


  setup() {
    // a = 响应式数据
    const state = reactive({
      count: 1
    })
    window.state = state
    return { state }
  }
}


