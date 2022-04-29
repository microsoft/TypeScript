

/// <reference path='fourslash.ts' />

//// interface X { value: -1 | 0 | 1; }
//// class Y implements X { }

// https://github.com/Microsoft/TypeScript/issues/30431
verify.codeFixAvailable([{ description: "Implement interface 'X'" }]);
