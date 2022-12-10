
let currentEffect: (() => any) | null;

class Dep {
    public effects: Array<() => any>;
    private _value: any;
    constructor(v?: any) {
        this.effects = []
        this._value = v
    }
    get value() {
        this.depend()
        return this._value
    }
    set value(v) {
        this._value = v
        this.notify()
    }

    public depend() {
        if (currentEffect) {
            this.effects.push(currentEffect)
        }
    }
    public notify() {
        this.effects.forEach((effect: () => any) => {
            effect()
        })
    }
}


export const ref = (v) => {
    return new Dep(v)
}

export function effect(callback: () => void) {
    currentEffect = callback;
    callback();
    currentEffect = null
}

const allTargets = new Map()

function getDep(target: Object, key: any): Dep {
    let targetDeps = allTargets.get(target)
    if (!targetDeps) {
        targetDeps = new Map()
        allTargets.set(target, targetDeps)
    }
    let dep = targetDeps.get(key);
    if (!dep) {
        dep = new Dep()
        targetDeps.set(key, dep)
    }
    return dep
}

export const reactive = (raw: Object) => {
    return new Proxy(raw, {
        get(target, key) {
            console.log('proxy get= ', target, key)
            const dep = getDep(target, key)
            dep.depend()
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value)
            dep.notify()
            return result
        }
    })
}