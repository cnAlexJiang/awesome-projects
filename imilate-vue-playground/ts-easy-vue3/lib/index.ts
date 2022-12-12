import { } from './'
import { mountElement, diff } from './renderer'
import { effect } from './reactivity/index'
export interface Vdom {
    tag: string,
    _el?: Element,
    data: any,
    children: string | Vdom[]
}

export interface Component {
    setup: () => any
    render: (context: any) => Vdom
}

export function createApp(rootCompnent: Component) {
    return {
        mount(rootContainer: Element | null) {
            if (!rootContainer) {
                console.warn('error with no root')
                return
            }
            let isMounted = false
            const context = rootCompnent.setup()
            let prevVdom
            effect(() => {
                if (!isMounted) {
                    // init
                    isMounted = true
                    const vdom = rootCompnent.render(context)
                    prevVdom = vdom
                    mountElement(vdom, rootContainer)
                } else {
                    // no diff
                    // rootContainer.innerHTML = ``
                    // const vdom = rootCompnent.render(context)
                    // mountElement(vdom, rootContainer)
                    // easy  diff
                    const vdom = rootCompnent.render(context)   // new vdom
                    diff(prevVdom, vdom)
                    prevVdom = vdom
                }
            })

        }
    }
}