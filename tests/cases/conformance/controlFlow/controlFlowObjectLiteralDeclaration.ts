// @strict: true
type A = {
    x?: string[]
    y?: number[]
    z?: {
        ka?: boolean
        ki?: boolean
    }
    extra?: string
}
const y = [1, 2, 3]
const wat = { extra: "life" }
let a: A = {
    x: [],
    y,
    z: {
        ka: false
    },
    ...wat
}
a.x.push('hi')
a.y.push(4)
let b = a.z.ka
b = a.z.ki // error, object is possibly undefined
a.extra.length // error, reference doesn't match 'wat', so object is possibly undefined


