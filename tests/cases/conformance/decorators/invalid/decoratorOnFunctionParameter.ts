declare const dec: any;

class C { n = true; }

function direct(@dec this: C) { return this.n; }
function called(@dec() this: C) { return this.n; }