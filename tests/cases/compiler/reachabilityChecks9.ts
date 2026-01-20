// @strict: true
// @noEmit: true
// @allowUnreachableCode: false

// https://github.com/microsoft/TypeScript/issues/55562

function g(str: string) {
  switch (str) {
    case "a":
      return;
      console.log("1");
      console.log("2");
    case "b":
      console.log("3");
  }
}

function h(str: string) {
  switch (str) {
    case "a":
      console.log("1");
    default:
      return;
      console.log("2");
      console.log("3");
    case "b":
      console.log("4");
  }
}
