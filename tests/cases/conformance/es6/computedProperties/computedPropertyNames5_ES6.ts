// @target: es6
var b: boolean;
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
}