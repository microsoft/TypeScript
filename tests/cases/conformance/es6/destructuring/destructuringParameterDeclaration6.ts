// A parameter declaration may specify either an identifier or a binding pattern.

// Reserved words are not allowed to be used as an identifier in parameter declaration
"use strict"

// Error
function a({while}) { }
function a1({public}) { }
function a4([while, for, public]){ }
function a5(...while) { }
function a6(...public) { }
function a7(...a: string) { }
a({ while: 1 });

// No Error
function b1({public: x}) { }
function b2({while: y}) { }
b1({ public: 1 });
b2({ while: 1 });

