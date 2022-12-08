
// support vdom 

import { effectWatch } from './reactivity/index.js'
import { mountElement, diff } from './renderer/index.js'




export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup();
            let isMounted = false
            let prevVdom
            effectWatch(() => {
                // 挂载真实dom
                // const element = rootComponent.render(context);
                // rootContainer.append(element)

                // init 
                if (!isMounted) {
                    // 挂载虚拟dom
                    rootContainer.innerHTML = ``
                    const vdom = rootComponent.render(context);
                    mountElement(vdom, rootContainer)
                    console.log('vdom=', vdom)

                    prevVdom = vdom
                    isMounted = true
                } else {
                    // diff and update
                    const vdom = rootComponent.render(context);
                    diff(prevVdom, vdom)
                    console.log('vdom=', vdom)

                    prevVdom = vdom

                }


            })

        }
    }
}