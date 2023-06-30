//// [tests/cases/compiler/spreadTypeRemovesReadonly.ts] ////

//// [spreadTypeRemovesReadonly.ts]
interface ReadonlyData {
    readonly value: string;
}

const data: ReadonlyData = { value: 'foo' };
const clone = { ...data };
clone.value = 'bar';


//// [spreadTypeRemovesReadonly.js]
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
var data = { value: 'foo' };
var clone = __assign({}, data);
clone.value = 'bar';
