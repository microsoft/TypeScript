//// [tests/cases/compiler/topLevelLambda3.ts] ////

//// [topLevelLambda3.ts]
var f = () => {this.window;}

//// [topLevelLambda3.js]
var f = () => { this.window; };
