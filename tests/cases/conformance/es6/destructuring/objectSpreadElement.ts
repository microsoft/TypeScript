let o = { a: 1, b: 'no' }
let o2 = { ...o, c: false }
let o3 = { c: false, ...o }
let o4 = { b: 'ignored', ...o }
let o5 = { ...o, b: 'override' }
