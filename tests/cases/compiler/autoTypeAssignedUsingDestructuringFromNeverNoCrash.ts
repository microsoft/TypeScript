// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57582

declare const b: null;
let file;

if (b === null) {
  // empty
} else {
  [file] = b;
}

file; // request flow type here
