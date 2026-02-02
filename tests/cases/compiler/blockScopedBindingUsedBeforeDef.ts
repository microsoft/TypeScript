// @target: es2015
// @strict: false
// 1:
for (let {[a]: a} of [{ }]) continue;

// 2:
for (let {[a]: a} = { }; false; ) continue;

// 3:
let {[b]: b} = { };