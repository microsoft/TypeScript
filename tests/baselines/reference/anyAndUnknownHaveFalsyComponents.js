//// [tests/cases/compiler/anyAndUnknownHaveFalsyComponents.ts] ////

//// [anyAndUnknownHaveFalsyComponents.ts]
declare let x1: any;
const y1 = x1 && 3;

// #39113
declare let isTreeHeader1: any;
function foo1() {
  return {
    display: "block",
    ...(isTreeHeader1 && {
      display: "flex",
    })
  };
}

declare let x2: unknown;
const y2 = x2 && 3;

// #39113
declare let isTreeHeader2: unknown;
function foo2() {
  return {
    display: "block",
    ...(isTreeHeader1 && {
      display: "flex",
    })
  };
}


//// [anyAndUnknownHaveFalsyComponents.js]
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
var y1 = x1 && 3;
function foo1() {
    return __assign({ display: "block" }, (isTreeHeader1 && {
        display: "flex",
    }));
}
var y2 = x2 && 3;
function foo2() {
    return __assign({ display: "block" }, (isTreeHeader1 && {
        display: "flex",
    }));
}
