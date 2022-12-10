// create a virtual dom


export function h(tag, props, children) {
    return {
        tag,
        props,
        children
    }
}