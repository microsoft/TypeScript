// @strict: true

let foo;
try {
	if (Math.random() > 0.5) {
		foo = 1234;
	}
} catch {
	foo;
}
