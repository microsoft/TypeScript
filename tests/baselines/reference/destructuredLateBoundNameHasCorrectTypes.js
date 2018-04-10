//// [destructuredLateBoundNameHasCorrectTypes.ts]
let { [Symbol.iterator]: destructured } = [];
void destructured;

const named = "prop";

let { [named]: computed } = { prop: "b" };
void computed;


//// [destructuredLateBoundNameHasCorrectTypes.js]
let { [Symbol.iterator]: destructured } = [];
void destructured;
const named = "prop";
let { [named]: computed } = { prop: "b" };
void computed;
