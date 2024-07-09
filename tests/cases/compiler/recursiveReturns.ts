function R1() {
	R1();
	return;
}

function R2() { R2(); }

function R3(n:number) {
	if (n == 0) {
		//return;
	}
	else {
		R3(n--);
	}
}