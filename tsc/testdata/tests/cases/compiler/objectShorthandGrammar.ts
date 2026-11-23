// @strict: true

const value = 1;
const valid = { value, other: value };
const optional = { value? };
const definite = { value! };
const initializer = { value = 2 };
const duplicate = { value, value };
