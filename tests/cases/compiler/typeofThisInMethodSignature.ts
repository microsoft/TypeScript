// @strict: true
// @noEmit: true

// Repro from #54167

export class A {
	x = 1
	a(x: typeof this.x): void {}
}

const a = new A().a(1);
