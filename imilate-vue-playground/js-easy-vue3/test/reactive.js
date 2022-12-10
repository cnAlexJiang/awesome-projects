import { effectWatch, reactive, ref } from '../core/reactivity/index.js'

// test ractive

let a = reactive({ value: 1 })
let b;
effectWatch(() => {
  // 1 会执行以下
  b = a.value + 10;
  console.log('b=', b)
})
a.value = 30;


// test ref

let c = ref(10);
let d
effectWatch(() => {
  d = c.value + 10;
  console.log('d = ', d)
})

c.value = 20
