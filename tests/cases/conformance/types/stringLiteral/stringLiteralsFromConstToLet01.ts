// @declaration: true
// @noImplicitAny: true

declare var randVal: boolean;

const a = randVal ? "A" : "B";
const b = a;

let c = a;
c = "A";
c = "B";
c = "C";

let d = b;
d = "A";
d = "B";
d = "C";
