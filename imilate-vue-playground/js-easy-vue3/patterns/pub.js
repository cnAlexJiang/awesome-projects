class eventEmitter {
  constructor() {
    this.cbs = {}
  }
  listen (key, cb) {
    if (this.cbs[key] === undefined) this.cbs[key] = []
    this.cbs[key].push(cb)
  }
  on (key, ...args) {
    if (this.cbs[key]) {
      this.cbs[key].forEach((cb) => {
        cb.apply(this, args)
      })
    }
  }
  off (key) {
    this.cbs[key] = []
  }
}

// Test


let emit =  new eventEmitter()

function test(){
  console.log('this= ', this,'call test', arguments)
}


emit.listen('test', test)


emit.on('test', 1,2,3)
