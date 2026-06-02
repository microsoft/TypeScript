// @declaration: true
// @target: esnext

// https://github.com/microsoft/typescript-go/issues/4130

class C {
  y: number = 2;
  accessor y: number = 3;
}
