// easy observer parttern



// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  // 变化通知
  doTask({ caller }) {
    console.log(this.name, 'do its things', 'caller=', caller);
  }
}


// 被观察者
class Subject {
  constructor(name) {
    this.name = name;
    this.observerList = [] // 观察人列表
  }
  // 添加观察者  
  addObserver(observer) {
    this.observerList.push(observer);
  }
  //  通知观察列表
  notify() {
    this.observerList.forEach(observer => observer.doTask({ caller: this.name }));
  }
}


// test 

const o1 = new Observer('aa')
const o2 = new Observer('bb')


const sub1 = new Subject('sub1')


sub1.addObserver(o1)
sub1.addObserver(o2)



sub1.notify()