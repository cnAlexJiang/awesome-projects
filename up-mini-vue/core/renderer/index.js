




// n1 old node
// n2 new node

export function diff(n1, n2) {
    // 1.tag 
    if (n1.tag !== n2.tag) {
        n1.el.replaceWith(document.createElement(n2.tag))
    } else {
        n2.el = n1.el

        // 2.props
        // new {a:1 ,b: 2, c:3}
        // old {a:1 ,b:2 , d:4 ,f:5}
        const { props: newProps } = n2
        const { props: oldProps } = n1
        if (newProps && oldProps) {
            Object.keys(newProps).forEach((key) => {
                const newVal = newProps[key]
                const oldVal = oldProps[key]
                if (newVal !== oldVal) {
                    n1.el.setAttribute(key, newVal)
                }
            })
        }
        if (oldProps) {
            Object.keys(oldProps).forEach(key => {
                if (!newProps[key]) {
                    n1.el.removeAttribute(key)
                }
            })
        }
        //  3. children -- easy diff
        // 1 new children string (old children string or old children array)
        // 1 new children array (old children string or old children array)
        const { children: newChildren } = n2
        const { children: oldChildren } = n1
        const el = n1.el
        if (typeof newChildren === 'string') {
            if (typeof oldChildren === 'string') {
                if (newChildren !== oldChildren) {
                    el.textContent = newChildren
                }
            } else if (Array.isArray(oldChildren)) {
                el.textContent = newChildren
            }
        } else if (Array.isArray(newChildren)) {
            if (typeof oldChildren === 'string') {
                el.innerHTML = ``
                mountElement(n2, el)
            } else if (Array.isArray(oldChildren)) {
                // new  {a,b,c,d,e,f}
                // old  {a,e,c,d}

                const length = Math.min(newChildren.length, oldChildren.length)
                // 处理等长部分的节点
                for (let idx = 0; idx < length; idx++) {
                    const newVnode = newChildren[idx]
                    const oldVnode = oldChildren[idx]
                    diff(oldVnode, newVnode)
                }

                if (newChildren.length > length) {
                    // create node
                    for (let idx = length; idx < newChildren.length; idx++) {
                        const newVnode = newChildren[idx]
                        mountElement(newVnode, el)
                    }
                }

                if (oldChildren.length > length) {
                    // remove node
                    for (let idx = length; idx < oldChildren.length; idx++) {
                        const oldVnode = oldChildren[idx]
                        oldVnode.el.parent.removeChild(oldVnode.el)

                    }
                }

            }
        }




    }



    // 3.children

}

export function mountElement(vdom, container) {

    const { tag, props = {}, children = [] } = vdom
    const el = (vdom.el = document.createElement(tag))
    for (const key in props) {
        const val = props[key]
        el.setAttribute(key, val)
    }

    // children  可以是 string  or array
    if (typeof children === 'string') {
        const textNode = document.createTextNode(children)
        el.append(textNode)
    }
    if (Array.isArray(children)) {
        children.forEach(v => {
            mountElement(v, el)
        })
    }

    // 
    container.append(el)
}