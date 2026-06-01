// @target: esnext

// https://github.com/microsoft/typescript-go/issues/4123

class C {
  in x = 1;
  out y = 2;
}

const isIn = "x" in { x: 1 };
for (const k in { x: 1 }) {
  console.log(k);
}
