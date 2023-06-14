//// [tests/cases/compiler/globalThisCapture.ts] ////

//// [globalThisCapture.ts]
// Add a lambda to ensure global 'this' capture is triggered
(()=>this.window);

var parts = [];

// Ensure that the generated code is correct
parts[0];


//// [globalThisCapture.js]
var _this = this;
// Add a lambda to ensure global 'this' capture is triggered
(function () { return _this.window; });
var parts = [];
// Ensure that the generated code is correct
parts[0];
