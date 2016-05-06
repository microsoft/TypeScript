let o = { a: 1, b: 'no' }
let o2 = { ...o, c: false }
let o3 = { c: false, ...o }
let o4 = { b: 'ignored', ...o }
let o5 = { ...o, b: 'override' }
let o6 = { ...o, a: 'wrong type?' }
let o7 = { a: 'wrong type?', ...o }

// TODO: What about *, ?, methods, and setters/getters?
// No, this should be a total fork that looks like
/// ... expression
