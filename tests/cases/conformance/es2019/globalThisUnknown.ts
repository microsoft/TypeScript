declare let win: Window & typeof globalThis;

// this access should be an error
win.hi
// these two should be fine, with type any
this.hi
globalThis.hi

// element access is always ok without noImplicitAny
win['hi']
this['hi']
globalThis['hi']

