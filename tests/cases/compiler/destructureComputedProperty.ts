declare const ab: { n: number } | { n: string };
const nameN = "n";
const { [nameN]: n } = ab;

class C { private p: number; }
const nameP = "p";
const { [nameP]: p } = new C();
const { p: p2 } = new C();
