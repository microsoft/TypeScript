// @strict: true
interface Dictionary<T> {
    [myFavouriteType: string]: T | undefined
}
const x = 'bar'
let foo: Dictionary<number> = {}
if (foo[x] === undefined) {
    foo[x] = 1
}
else {
    let nu = foo[x]
    let n = foo[x]
    foo[x]!++
}
