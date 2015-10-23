//// [tsxErrorRecovery1.tsx]

declare namespace JSX { interface Element { } }

function foo() {
	var x = <div>  { </div>
}
// Shouldn't see any errors down here
var y = { a: 1 };


//// [tsxErrorRecovery1.jsx]
function foo() {
    var x = <div>  {}div>
}
// Shouldn't see any errors down here
var y = {a} 1 };
</>;
}
