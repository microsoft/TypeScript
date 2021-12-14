function test1(x: string | 0) {
	if (check1(x)) {
		x
	}
	if (check2(x)) {
		x
	}
}

function test2(x: string | number) {
	if (check1(x)) {
		x
	}
	if (check2(x)) {
		x
	}
}


function test3(x: "hello" | number) {
	if (check1(x)) {
		x
	}
	if (check2(x)) {
		x
	}
}

function check1(x: string | number): x is ("hello" | 0) {
	return x === "hello" || x === 0;
}

function check2(x: string | number): x is ("hello" | "bye" | 0) {
	return x === "hello" || x === "bye" || x === 0;
}