// @strict: true
// @noEmit: true

let foo = [];

switch (foo?.length) {
  case 1:
    foo[0];
}

let bar = [];

switch (bar?.length) {
  case 1: {
    bar.push("baz");
    const arr: string[] = bar;
  }
}
