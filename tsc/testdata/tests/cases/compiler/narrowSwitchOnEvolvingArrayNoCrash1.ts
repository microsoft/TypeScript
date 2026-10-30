// @target: es2015
// @strict: true
// @noEmit: true

function f1() {
  const a = [];
  while (true) switch (a) { case 0: }
}

function f2() {
  const b = [];
  switch (b) {
    case 0:
      b;
  }
}

function f3() {
  const b = [];
  if (b === 0) {
    b;
  }
}

function f4() {
  let c = [];
  switch (typeof c) {
    case "object": {
      c.push("x");
      const arr: number[] = c;
    }
  }
}

function f5() {
  let c = [];
  if (typeof c === "object") {
    c.push("x");
    const arr: number[] = c;
  }
}
