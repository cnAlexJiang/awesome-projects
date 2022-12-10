import { Vdom } from "..";


// n1 old 
// n2 new 
export function diff(n1: Vdom, n2: Vdom) {
    if (!n1._el) {
        return
    }

    // 1 diff tag 
    if (n1.tag !== n2.tag) {
        n1._el.replaceWith(document.createElement(n2.tag))  // has bug
        // other
    } else {
        n2._el = n1._el;
        // 2 data only diff props
        const { props: newProps } = n2.data || {}
        const { props: oldProps } = n1.data || {}
        const el = n1._el

        // new {a,c,d,e}
        // old {a,b,c}
        // both exist
        if (newProps && oldProps) {
            Object.keys(newProps).forEach(key => {
                const newVal = newProps[key]
                const oldVal = oldProps[key]
                if (newVal !== oldVal) {
                    el.setAttribute(key, newVal)
                }
            })
        }
        // remove unexist key
        if (oldProps) {
            Object.keys(oldProps).forEach(key => {
                if (!newProps[key]) {
                    el.removeAttribute(key)
                }
            })
        }

        //3 diff children
        //  3.1 new children string 
        //      3.1.1 old children string 
        //      3.1.2 old children array
        //  3.2 new children array 
        //      3.2.1 old children string
        //      3.2.2 old children array

        const { children: oldChildren } = n1
        const { children: newChildren } = n2

        if (typeof newChildren === 'string') {
            // 3.1.1
            if (typeof oldChildren === 'string') {
                if (newChildren !== oldChildren) {
                    el.textContent = newChildren
                }
                // 3.1.2
            } else if (Array.isArray(oldChildren)) {
                el.textContent = newChildren
            }
        } else if (Array.isArray(newChildren)) {
            // 3.2.1
            if (typeof oldChildren === 'string') {
                el.innerHTML = ``
                mountElement(n2, el)
                // 3.2.2
            } else if (Array.isArray(oldChildren)) {
                // new  {a,b,c,d,e,f}
                // old  {a,e,c,d}
                const length = Math.min(newChildren.length, oldChildren.length)
                // 处理等长部分
                for (let idx = 0; idx < length; idx++) {
                    const newVnode = newChildren[idx]
                    const oldVnode = oldChildren[idx]
                    if (newVnode !== oldVnode) {
                        diff(oldVnode, newVnode)
                    }
                }
                // add new node
                if (newChildren.length > length) {
                    for (let idx = length; idx < length; idx++) {
                        const newVnode = newChildren[idx];
                        mountElement(newVnode, el)
                    }
                }
                // remove old node
                if (oldChildren.length > length) {
                    for (let idx = length; idx < length; idx++) {
                        const oldVnode = oldChildren[idx];
                        // different
                        oldVnode._el && el.removeChild(oldVnode._el)
                    }

                }
            }

        }

    }



    // children 


}

function createEl(vdom: Vdom) {
    const { tag, data = {}, children } = vdom
    const { props, on } = data || {}
    const el = document.createElement(tag) as Element

    if (props) {
        Object.keys(props).forEach((key: string) => {
            el.setAttribute(key, props[key])
        });
    }


    if (on && typeof on === 'object') {
        Object.keys(on).forEach(key => {
            el.addEventListener(key, on[key])
        })
    }


    if (typeof children === 'string') {
        const textNode = document.createTextNode(children)
        el.append(textNode)
    }

    if (Array.isArray(children)) {
        children.forEach((child: Vdom) => {
            mountElement(child, el)
        })
    }
    return el
}

export function mountElement(vdom: Vdom, container: Element) {
    const { tag, data = {}, children } = vdom
    const { props, on } = data || {}
    const el = (vdom._el = document.createElement(tag)) as Element

    if (props) {
        Object.keys(props).forEach((key: string) => {
            el.setAttribute(key, props[key])
        });
    }


    if (on && typeof on === 'object') {
        Object.keys(on).forEach(key => {
            el.addEventListener(key, on[key])
        })
    }


    if (typeof children === 'string') {
        const textNode = document.createTextNode(children)
        el.append(textNode)
    }

    if (Array.isArray(children)) {
        children.forEach((child: Vdom) => {
            mountElement(child, el)
        })
    }
    container.append(el)
}