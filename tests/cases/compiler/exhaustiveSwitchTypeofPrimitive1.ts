// @strict: true
// @noEmit: true

function woo(x: string): number {
  switch (typeof x) {
    case "string":
      return 1;
  }
}
