
export function mountElement(vdom, container) {

    const { tag, props = {}, children = [] } = vdom
    const el = document.createElement(tag)

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