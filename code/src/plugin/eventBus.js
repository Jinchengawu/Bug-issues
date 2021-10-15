class EventBus {
  constructor() {
    /**
     * 构造函数需要存储的 event 事件
     */
    this.events = this.events || new Object();
  }
}

/**
 * @name emit
 * @description 触发事件
 * @param {*} type 事件类型
 * @param  {...any} args 参数
 */
EventBus.prototype.emit = function (type, ...args) {
  const eventFuncs = this.events[type];
  // 查看这个 type 的 event 有多少个回调函数，如果有多个需要依次调用。
  if (Array.isArray(eventFuncs)) {
    for (let index = 0; index < eventFuncs.length; index++) {
      eventFuncs[index].apply(this, args)
    }
  }
  else {
    eventFuncs.apply(this, args)
  }
};

/**
 * @name addEventListener
 * @description 增加监听函数
 * @param {*} type
 * @param {*} fun
 */
EventBus.prototype.addListener = function (type, func) {
  const eventFuncs = this.events[type];

  // 如果从未注册过监听函数，则将函数放入数组存入对应的键名下
  if (!eventFuncs) {
    this.events[type] = [func]
  }
  // 如果注册过，则直接放入
  else {
    eventFuncs.push(func)
  }
}

/**
 * @name removeListener
 * @description 删除监听事件
 * @param {*} type
 */
EventBus.prototype.removeListener = function (type, func) {
  if (this.events[type]) {
    const eventFuncs = this.events[type]
    if (Array.isArray(eventFuncs)) {
      if (func) {
        const funcIndex = eventFuncs.findIndex(eventFunc => func === eventFunc)
        if (funcIndex !== -1) {
          eventFuncs.splice(funcIndex, 1)
        }
        else {
          console.warn(`eventBus may remove unexit func(${type})`)
        }
      }
      else {
        delete eventFuncs[type]
      }
    }
    else {
      delete eventFuncs[type]
    }
  }
}

// const eventBus = new EventBus();
// eventBus.addListener("test", function (...args) {
// console.log('test',args);
// });
// eventBus.addListener("test", function (...args) {
//   console.log('test2',args);
//   });
// eventBus.emit("test", [1, 3]);


export default new EventBus()

