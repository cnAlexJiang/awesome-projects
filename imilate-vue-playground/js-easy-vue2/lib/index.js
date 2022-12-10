
import { mountElement, diff } from './renderer/index.js'
import { defineReactive, effectWatch } from './reactivity/index.js'


export function Vue(rootVdom) {
    return {
        mount(rootContainer) {
            const context = rootVdom.data()
            defineReactive(context)

            let isMounted = false
            let prevVdom
            effectWatch(() => {

                if (!isMounted) {
                    // init
                    isMounted = true
                    rootContainer.innerHTML = ``
                    const vdom = rootVdom.render(context);
                    mountElement(vdom, rootContainer)
                    prevVdom = vdom
                    isMounted = true
                } else {
                    // diff and update
                    const vdom = rootVdom.render(context);
                    diff(prevVdom, vdom)
                    console.log('vdom=', vdom)
                    prevVdom = vdom
                }
            })

        }
    }
}