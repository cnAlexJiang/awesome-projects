// easy observer parttern



// 被观察者
class Observer{
  constructor(name){
    this.name= name;
  }
  doTask({caller}){
    console.log(this.name, 'do its things', 'caller=', caller);
  }
}


// 观察人
class Subject{
  constructor(name){
    this.name = name;
    this.observerList  = []
  }

  addObserver(observer){
    this.observerList.push(observer);
  }
  //  通知观察列表
  notify(){
    this.observerList.forEach(observer=>observer.doTask({caller: this.name}));
  }
}


// test 

 const o1 = new Observer('aa')
 const o2 = new Observer('bb')


 const sub1 = new Subject('sub1')


 sub1.addObserver(o1)
 sub1.addObserver(o2)



 sub1.notify()