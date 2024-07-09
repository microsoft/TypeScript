//// [tests/cases/conformance/jsx/tsxErrorRecovery1.tsx] ////

//// [file.tsx]
declare namespace JSX { interface Element { } }

function foo() {
	var x = <div>  { </div>
}
// Shouldn't see any errors down here
var y = { a: 1 };


//// [file.jsx]
function foo() {
    var x = <div>  {} </div>;
}
// Shouldn't see any errors down here
var y = { a: 1 };
