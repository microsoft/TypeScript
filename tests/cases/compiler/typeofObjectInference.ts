let val = 1

function decorateA<O extends any>(fn: (first: {value: typeof val}) => O) {
    return (): O => fn({value: val})
}
let a = decorateA(({value}) => 5)

function decorateB<O extends any>(fn: (first: typeof val) => O) {
    return (): O => fn(val)
}
let b = decorateB((value) => 5)

function decorateC<O extends any>(fn: (first: {value: number}) => O) {
    return (): O => fn({value: val})
}
let c = decorateC(({value}) => 5)

type First = {value: typeof val}
function decorateD<O extends any>(fn: (first: First) => O) {
    return (): O => fn({value: val})
}
let d = decorateD(({value}) => 5)