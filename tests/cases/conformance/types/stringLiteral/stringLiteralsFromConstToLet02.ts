// @declaration: true
// @noImplicitAny: true

const a = "A";
const b = a;

let c = a;
c = "A";
c = "B";
c = "C";

let d = b;
d = "A";
d = "B";
d = "C";
