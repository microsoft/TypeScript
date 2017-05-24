//// [functionAssignmentError.ts]
var func = function (){return "ONE";};
func = function (){return "ONE";};

//// [functionAssignmentError.js]
var func = function func() { return "ONE"; };
func = function () { return "ONE"; };
