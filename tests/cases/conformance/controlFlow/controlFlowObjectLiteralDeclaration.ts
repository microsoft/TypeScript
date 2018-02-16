// @strict: true
type A = {
    x?: string[]
    y?: number[]
    z?: {
        ka?: boolean
        ki?: boolean
    }
    extra?: string
    0?: string
    'two words'?: string
}
// Note: spread assignments, as well as strings, numbers and computed properties,
// are not supported because they are all accessed with element access, which doesn't
// participate in control flow right now because of performance reasons.
const y = [1, 2, 3]
const wat = { extra: "life" }
let a: A = {
    x: [],
    y,
    z: {
        ka: false
    },
    ...wat,
    0: 'hi',
    'two words': 'ho'
}
a.x.push('hi')
a.y.push(4)
let b = a.z.ka
b = a.z.ki // error, object is possibly undefined
a.extra.length // error, reference doesn't match the spread
a[0].length // error, element access doesn't narrow
a['two words'].length


