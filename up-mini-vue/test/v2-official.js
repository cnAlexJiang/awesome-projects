// v3.0
// a 变了  b 自动变更
import { effect, reactive, ref } from '../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js'


// reactive  声明响应式对象
let a = reactive({ value: 1 })
console.log('a=', a)

let c = ref(1)
console.log('c=', c)
console.log('a=', a, 'c=', c)
c.value
let b;
effect(() => {
  // 1 会执行以下
  b = a.value + 10;
  console.log(b)
})

a.value = 30;