// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60106

declare class A {
  IsA(): this is A;
}

declare const patternWithUndefined: A | undefined;

function applyPatternWithUndefined() {
  if (patternWithUndefined?.IsA() === false) {
    patternWithUndefined; // never
    return;
  }
  patternWithUndefined; // A | undefined
}

function applyPatternWithUndefined2() {
  if (!patternWithUndefined?.IsA()) {
    patternWithUndefined; // undefined
    return;
  }
  patternWithUndefined; // A
}

function applyPatternWithUndefined3() {
  if (patternWithUndefined?.IsA() === true) {
    patternWithUndefined; // A
    return;
  }
  patternWithUndefined; // undefined
}

function applyPatternWithUndefined4() {
  if (patternWithUndefined?.IsA()) {
    patternWithUndefined; // A
    return;
  }
  patternWithUndefined; // undefined
}

declare const patternWithNull: A | null;

function applyPatternWithNull() {
  if (patternWithNull?.IsA() === false) {
    patternWithNull; // never
    return;
  }
  patternWithNull; // A | null
}

function applyPatternWithNull2() {
  if (!patternWithNull?.IsA()) {
    patternWithNull; // null
    return;
  }
  patternWithNull; // A
}

function applyPatternWithNull3() {
  if (patternWithNull?.IsA() === true) {
    patternWithNull; // A
    return;
  }
  patternWithNull; // null
}

function applyPatternWithNull4() {
  if (patternWithNull?.IsA()) {
    patternWithNull; // A
    return;
  }
  patternWithNull; // null
}

declare const nullablePattern: A | null | undefined;

function applyNullablePattern() {
  if (nullablePattern?.IsA() === false) {
    nullablePattern; // never
    return;
  }
  nullablePattern; // A | null | undefined
}

function applyNullablePattern2() {
  if (!nullablePattern?.IsA()) {
    nullablePattern; // null | undefined
    return;
  }
  nullablePattern; // A
}

function applyNullablePattern3() {
  if (nullablePattern?.IsA() === true) {
    nullablePattern; // A
    return;
  }
  nullablePattern; // null | undefined
}

function applyNullablePattern4() {
  if (nullablePattern?.IsA()) {
    nullablePattern; // A
    return;
  }
  nullablePattern; // null | undefined
}

declare const pattern: A;

function applyPatternInChain() {
  if (pattern?.IsA() === false) {
    pattern; // never
    return;
  }
  pattern; // A
}

function applyPatternInChain2() {
  if (!pattern?.IsA()) {
    pattern; // never
    return;
  }
  pattern; // A
}

function applyPatternInChain3() {
  if (pattern?.IsA() === true) {
    pattern; // A
    return;
  }
  pattern; // never
}

function applyPatternInChain4() {
  if (pattern?.IsA()) {
    pattern; // A
    return;
  }
  pattern; // never
}

function applyPattern() {
  if (pattern.IsA() === false) {
    pattern; // never
    return;
  }
  pattern; // A
}

function applyPattern2() {
  if (!pattern.IsA()) {
    pattern; // never
    return;
  }
  pattern; // A
}

function applyPattern3() {
  if (pattern.IsA() === true) {
    pattern; // A
    return;
  }
  pattern; // never
}

function applyPattern4() {
  if (pattern.IsA()) {
    pattern; // A
    return;
  }
  pattern; // never
}
