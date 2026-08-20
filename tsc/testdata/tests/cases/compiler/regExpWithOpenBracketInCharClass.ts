// @target: es5,es2015,esnext

const regexes: RegExp[] = [
  /[[]/,  // Valid
  /[[]/u, // Valid
  /[[]/v, // Well-terminated regex with an incomplete character class
];
