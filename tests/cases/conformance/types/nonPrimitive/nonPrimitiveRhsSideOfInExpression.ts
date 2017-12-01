let o: object = {};

function f(): object {
	return {};
}

const b1 = "foo" in o;
const b2 = "bar" in f();