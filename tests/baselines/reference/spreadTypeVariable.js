//// [spreadTypeVariable.ts]
function f1<T extends number>(arg: T) {
  return { ...arg };
}

function f2<T extends string[]>(arg: T) {
  return { ...arg }
}

function f3<T extends number | string[]>(arg: T) {
  return { ...arg }
}

function f4<T extends number | { [key: string]: any }>(arg: T) {
  return { ...arg }
}

function f5<T extends string[] | { [key: string]: any }>(arg: T) {
  return { ...arg }
}

function f6<T>(arg: T) {
  return { ...arg }
}



//// [spreadTypeVariable.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function f1(arg) {
    return __assign({}, arg);
}
function f2(arg) {
    return __assign({}, arg);
}
function f3(arg) {
    return __assign({}, arg);
}
function f4(arg) {
    return __assign({}, arg);
}
function f5(arg) {
    return __assign({}, arg);
}
function f6(arg) {
    return __assign({}, arg);
}
