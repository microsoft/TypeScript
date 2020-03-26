// @strictNullChecks: true

// Constructed repro
function fn1(x: number | undefined = x > 0 ? x : 0) { }

// Report from user
function fn2(x?: string = someCondition ? 'value1' : x) { }