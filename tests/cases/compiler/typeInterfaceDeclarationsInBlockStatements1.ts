// @strict: true
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/60175

function f1() {
  if (true) type s = string;
  console.log("" as s);
}

function f2() {
  if (true) {
    type s = string;
  }
  console.log("" as s);
}

function f3() {
  if (true)
    interface s {
      length: number;
    }
  console.log("" as s);
}

function f4() {
  if (true) {
    interface s {
      length: number;
    }
  }
  console.log("" as s);
}
