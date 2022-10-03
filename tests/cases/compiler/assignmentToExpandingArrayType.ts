// @noImplicitAny: true
// Fixes exponential time/space in #14628
let x = []
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' } // previously ran out of memory here
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
x[0] = { foo: 'hi' }
