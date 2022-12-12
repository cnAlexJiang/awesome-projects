import { Vdom } from ".";



export function h(tag: string, data: any, children: any): Vdom {
    return {
        tag,
        data,
        children
    }
}