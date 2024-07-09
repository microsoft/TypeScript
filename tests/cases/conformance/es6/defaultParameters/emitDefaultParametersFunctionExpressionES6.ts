// @target:es6
var lambda1 = (y = "hello") => { }
var lambda2 = (x: number, y = "hello") => { }
var lambda3 = (x: number, y = "hello", ...rest) => { }
var lambda4 = (y = "hello", ...rest) => { }

var x = function (str = "hello", ...rest) { }
var y = (function (num = 10, boo = false, ...rest) { })()
var z = (function (num: number, boo = false, ...rest) { })(10)