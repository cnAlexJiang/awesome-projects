// 响应式库

// 依赖
let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  // 1 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 2 触发依赖
  notify() {
    this.effects.forEach((effect) => effect())
  }
  get value() {
    this.depend();
    return this._val;
  }
  set value(newValue) {
    this._val = newValue
    this.notify()
  }
}
export function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect;
  effect()
  currentEffect = null;
}

// 模拟ref
export const ref = (v) => (new Dep(v))

// 全局引用保存
const targetMap = new Map();
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  return dep
}

export function defineReactive(data) {
  Object.keys(data).forEach(key => {
    _defineReactive(data, key, data[key])
    if (typeof data[key]) {
      defineReactive(data[key])
    }
  })
}

export function _defineReactive(obj, key, val, cb) {
  var dep = getDep(obj, key)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      /*....依赖收集等....*/
      dep.depend()
      return val
    },
    set: newVal => {
      val = newVal;
      /*触发回调*/
      dep.notify()
    }
  })
}

export
  // 具体的订阅器Watcher
  // 传入一个vue 的示例， 监听的属性， 以及处理的回调函数
  class Watcher {
  constructor() {
    this.vm = vm;
    this.$prop = prop;
    this.value = this.get();
    this.callback = callback;
  }
  // 添加watcher 获得属性的get 方法，当有属性访问/设置 的时候，就产生订阅者 将这个订阅者放进调度中心
  get() {
    Dep.target = this;
    // 获得属性值
    const value = this.vm.$data[this.$prop];
    return value
  }
  // 添加watcher的更新视图的方法
  update() {
    // 当属性值有变化的时候，执行方法，更新试图
    const value = this.vm.$data[this.$prop];
    this.callback(this.value)
  }
}