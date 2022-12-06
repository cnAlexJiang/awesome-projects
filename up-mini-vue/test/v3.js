import {effectWatch, reactive} from '../core/reactivity/index.js'


let a = reactive({value:1})
let b;
effectWatch (()=>{
  // 1 会执行以下
  b= a.value+ 10;
  console.log('b=',  b)
})

a.value = 30;