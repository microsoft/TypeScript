//@filename: file.tsx
//@jsx: preserve

declare namespace JSX { interface Element { } }

function foo() {
	var x = <div>  { </div>
}
// Shouldn't see any errors down here
var y = { a: 1 };
