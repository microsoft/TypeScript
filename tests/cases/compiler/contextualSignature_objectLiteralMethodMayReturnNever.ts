interface I { m(): number; }
const o: I = { m() { throw new Error("not implemented"); } };
