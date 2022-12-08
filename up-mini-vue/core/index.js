
// support vdom 

import { effectWatch } from './reactivity/index.js'
import { mountElement } from './renderer/index.js'
export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup();
            effectWatch(() => {
                rootContainer.innerHTML = ``

                // 挂载真实dom
                // const element = rootComponent.render(context);
                // rootContainer.append(element)

                // 挂载虚拟dom
                const vdom = rootComponent.render(context);
                mountElement(vdom, rootContainer)

            })

        }
    }
}