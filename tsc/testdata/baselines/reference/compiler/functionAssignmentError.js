//// [tests/cases/compiler/functionAssignmentError.ts] ////

//// [functionAssignmentError.ts]
var func = function (){return "ONE";};
func = function (){return "ONE";};

//// [functionAssignmentError.js]
"use strict";
var func = function () { return "ONE"; };
func = function () { return "ONE"; };
