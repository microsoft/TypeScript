// @target: es6
let { [Symbol.iterator]: destructured } = [];
void destructured;

const named = "prop";

let { [named]: computed } = { prop: "b" };
void computed;

const notPresent = "prop2";

let { [notPresent]: computed2 } = { prop: "b" };
