// @target: es5
var K = 'k'
var a = { p  : (true ? { [K] : 'v'}        : null) }
var b = { p  : (true ? { [K] : 'v'} as any : null) }