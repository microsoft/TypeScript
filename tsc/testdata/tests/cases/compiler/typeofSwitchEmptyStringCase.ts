// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3909

function f(x: string | number) {
  switch (typeof x) {
    case "":
    case "string":
      x.charAt(0);
      break;
  }
}
