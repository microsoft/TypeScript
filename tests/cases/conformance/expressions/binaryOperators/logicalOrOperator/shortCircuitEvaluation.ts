// @strictNullChecks: true
let a = undefined || 1;
a++

let b = null || 'foo';
b.concat('bar')

type EventType = 'click' | 'dblclick'

const handlerMap: { [P in EventType]?: any[] } = {}

function addHandler<P extends EventType>(evType: P) {
  const handlerList = handlerMap[evType] || <any[]>[]
  handlerList.push({})
  handlerMap[evType] = handlerList
}