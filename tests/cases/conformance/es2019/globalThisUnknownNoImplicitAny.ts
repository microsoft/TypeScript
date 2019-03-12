// @noImplicitAny: true
declare let win: Window & typeof globalThis;

// all accesses should be errors
win.hi
this.hi
globalThis.hi

win['hi']
this['hi']
globalThis['hi']
