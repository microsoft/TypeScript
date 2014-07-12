//// [functionTypeArgumentArrayAssignment.ts]
interface Array<T> {
	foo: T;
	length: number;
}

function map<U>() {
var ys: U[] = [];
}


//// [functionTypeArgumentArrayAssignment.js]
function map() {
    var ys = [];
}
