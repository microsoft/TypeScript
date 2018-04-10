// @target: es6
let { [Symbol.iterator]: destructured } = [];
void destructured;

const named = "prop";

let { [named]: computed } = { prop: "b" };
void computed;
