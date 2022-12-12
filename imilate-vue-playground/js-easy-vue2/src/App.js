

import { h } from '../lib/h.js'
// vue2
export default {
    render(context) {
        return h('div', {
            id: 'app -id' + context.state.count,
            class: 'showTime'
        }, context.state.count + ' ')
    },
    data() {
        // a = 响应式数据
        const state = {
            count: 1
        }
        window.state = state
        return { state }
    }
}


