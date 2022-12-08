// 响应式库

// 依赖
let currentEffect;
class Dep {
  // 1 收集依赖
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  get value() {
    this.depend();
    return this._val;
  }
  set value(newValue) {
    this._val = newValue
    this.notify()
  }
  // 2 触发依赖
  notify() {
    this.effects.forEach((effect) => effect())
  }
}
export function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect;
  effect()
  currentEffect = null;
}

export const ref = (v) => (new Dep(v))

// ref  很像了
// const dep = new Dep(10);
// let b;

//  effectWatch(() => {
//   b = dep.value + 10
//   console.log('b=', b);
// })


// // 值发生变更
// dep.value = 20

// reactive
// dep  --> number string 
//  object --> key --> dep

// 1 这个对象在什么时候改变的
// object.a -> get
// object.a = 2  -> set



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

// proxy
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      console.log('target=', target, 'key=', key)
      // key - dep
      // dep  存在哪里
      // let depsMap = targetMap.get(target);
      // if (!depsMap) {
      //   depsMap = new Map();
      //   targetMap.set(target, depsMap);
      // }

      // let dep = depsMap.get(key);
      // if (!dep) {
      //   dep = new Dep()
      //   depsMap.set(key, dep)
      // }// 到此为止 是为了让key 和 dep 做匹配

      // 依赖收集
      const dep = getDep(target, key)
      dep.depend()

      // return target[key] //规范不推荐
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      console.log(key, '=', value)
      dep.notify()
      return result
    }
  })
}

// const user = reactive({
//   age: 19,
//   temp: {
//     a: 19
//   }
// })


// let double

// effectWatch(() => {
//   console.log('--reactive--')
//   double  = user.age + 10
//   console.log('double=' , double)
// })

// user.age = 20;