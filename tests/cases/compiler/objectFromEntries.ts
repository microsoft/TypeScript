// @target: es2019

const o = Object.fromEntries([['a', 1], ['b', 2], ['c', 3]]);
const o2 = Object.fromEntries(new URLSearchParams());
const o3 = Object.fromEntries(new Map([[Symbol("key"), "value"]]));
