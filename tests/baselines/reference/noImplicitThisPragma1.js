//// [tests/cases/conformance/pragma/noImplicitThis/noImplicitThisPragma1.ts] ////

//// [file1.ts]
// @ts-noImplicitThis
const a = () => this.Math;

//// [file2.ts]
// @ts-noImplicitThis true
const b = () => this.Math;

//// [file3.ts]
// @ts-noImplicitThis false
const c = () => this.Math;

//// [file4.ts]
const d = () => this.Math;

//// [file1.js]
var _this = this;
// @ts-noImplicitThis
var a = function () { return _this.Math; };
//// [file2.js]
var _this = this;
// @ts-noImplicitThis true
var b = function () { return _this.Math; };
//// [file3.js]
var _this = this;
// @ts-noImplicitThis false
var c = function () { return _this.Math; };
//// [file4.js]
var _this = this;
var d = function () { return _this.Math; };
