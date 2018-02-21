// @strict: true
let x1: (a?: {b?:number, c?:number}) => void;
x1 = ({b = 1, c = 2} = {}) => {};
const x2 = ({b = 1, c = 2} = {}) => {};
x1 = x2;

let x3: (a?: {b?:number, c?:{d?:number, e?:number}}) => void;
x3 = ({b = 1, c:{d = 2, e = 3} = {}} = {}) => {};
const x4 = ({b = 1, c:{d = 2, e = 3} = {}} = {}) => {};
x3 = x4;

let x5: (a?: {b?:number, c?:{d?:{f?:number, g?:number}, e?:number}}) => void;
x5 = ({b = 1, c:{d:{f = 4, g = 5} = {}, e = 3} = {}} = {}) => {};
const x6 = ({b = 1, c:{d:{f = 4, g = 5} = {}, e = 3} = {}} = {}) => {};
x5 = x6;

let useImplementation1 = true;
let someOtherFunctionOfThisType = ({a = 3, b = 4} = {}) => a + b;
let adder: (nums?: {a?:number, b?:number}) => number;
if (useImplementation1) {
  adder = ({a = 1, b = 2} = {}) => a + b;
} else {
  adder = someOtherFunctionOfThisType;
}
