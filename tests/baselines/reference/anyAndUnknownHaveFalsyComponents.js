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
const y1 = x1 && 3;
function foo1() {
    return Object.assign({ display: "block" }, (isTreeHeader1 && {
        display: "flex",
    }));
}
const y2 = x2 && 3;
function foo2() {
    return Object.assign({ display: "block" }, (isTreeHeader1 && {
        display: "flex",
    }));
}
