import { h } from '../lib/h'
import { ref, reactive } from '../lib/reactivity/index'

export default {

    setup() {
        const counter = ref(0)
        const state = reactive({
            on: {},
            name: 123,
            info: {
                classNames: ['aa', 'bb', 'cc']

            }
        })
        return {
            counter,
            state
        }
    },
    render(context: any) {
        console.log('render', context)
        return h(
            'div', {
            props: {
                class: context.state.info.classNames.join(' ')
            }
        }, [
            h('div', null, String(context.counter.value)),
            h('button', {
                on: {
                    click: () => {
                        console.log('click');
                        context.counter.value = context.counter.value + 1;
                        context.state.info.classNames.push(context.counter.value + '' + context.counter.value)
                    }
                }
            }, 'add')
        ]
        )
    },
}