// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55526

type Something1 = {
  a?: string;
};

const x1: Something1 = {};

function assignToKey1(key: keyof Something1, value: string | undefined) {
  x1[key] = value;
}

type Something2 = {
  a?: string;
  b?: string;
};

const x2: Something2 = {};

function assignToKey2(key: keyof Something2, value: string | undefined) {
  x2[key] = value;
}
