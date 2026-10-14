// @target: es2015
// @strict: true
// @noEmit: true

const a = [];
while (true) switch (a) { case 0: }

const b = [];
switch (b) {
  case 0:
    b;
}

let c = [];
switch (typeof c) {
  case "object": {
    c.push("x");
    const arr: string[] = c;
  }
}
