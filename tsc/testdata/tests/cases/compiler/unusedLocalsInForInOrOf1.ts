// @strict: true
// @target: esnext
// @noEmit: true
// @noUnusedLocals: true
// @noUnusedParameters: true

for (let x of [1, 2]) {
  function f() {
    x;
  }
}

for (let x of [1, 2]) {
  let f = () => {
    x;
  };
}

for (const x of [1, 2]) {
  function g() {
    x;
  }
}

for (let x in { a: 1, b: 2 }) {
  function f2() {
    x;
  }
}

for (let x in { a: 1, b: 2 }) {
  let f2 = () => {
    x;
  };
}

for (const x in { a: 1, b: 2 }) {
  function g2() {
    x;
  }
}

for (let { x } of [{ x: 1 }, { x: 2 }]) {
  function f3() {
    x;
  }
}

for (let { x } of [{ x: 1 }, { x: 2 }]) {
  let f3 = () => {
    x;
  };
}

for (const { x } of [{ x: 1 }, { x: 2 }]) {
  function g3() {
    x;
  }
}
