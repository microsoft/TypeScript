// @lib: esnext

function f1(a: any) {
	if (Array.isArray(a)) {
		a; // Expected: any[]
	}
}

function f2(a: unknown) {
	if (Array.isArray(a)) {
		a; // Expected: unknown[]
	}
}

function f3(a: string | readonly string[] | number[]) {
	if (Array.isArray(a)) {
		var b: readonly string[] | number[] = a; // OK
		a[0]; // Expected: string | number
	}
}

function f4<T extends string | readonly string[] | number[]>(a: T) {
	if (Array.isArray(a)) {
		var b: readonly string[] | number[] = a; // OK
		a[0]; // Expected: string | number
	}
}

// Repro from #41808

function f5<T extends string | undefined | string[]>(a: T) {
	if (Array.isArray(a)) {
		a[0]; // Expected: string
	}
}

function f6(a: (number[] | null | "loading")[]) {
	a.filter(Array.isArray); // Expected: number[][]
}

function f7(a: {} | null) {
	if (Array.isArray(a)) {
		a; // Expected: unknown[]
	}
}

function f8<T extends ArrayLike<number> | Iterable<boolean> | readonly string[] | null>(a: T) {
	if (Array.isArray(a)) {
		var b: readonly string[] | number[] | boolean[] = a; // OK
		a[0]; // Expected: string | number | boolean
	}
}

function f9(a: number | null) {
	if (Array.isArray(a)) {
		a; // Expected: never
	}
}
