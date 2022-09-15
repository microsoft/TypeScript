function fa(a: [number, ...string[]] | readonly [boolean, boolean] | null) {
	if (Array.isArray(a)) {
		a; // Expected: [number, ...string[]] | readonly [boolean, boolean]
	}
}

function fb<T extends [number, ...string[]] | readonly [boolean, boolean] | null>(a: T) {
	if (Array.isArray(a)) {
		var b: [number, ...string[]] | readonly [boolean, boolean] = a; // OK
		a[0]; // Expected: number | boolean
	}
}

function fc<T, P extends keyof T>(obj: T, prop: P) {
	const value = obj[prop];
	if (Array.isArray(value)) {
		value.length; // OK
	}
}

function fd(value: Record<string, unknown>) {
	if (Array.isArray(value)) {
		value.length; // OK
	}
}

function fe<T>(data: T) {
	if (Array.isArray(data)) {
		for (const key in data) { // OK
			const value = data[key];
			if (Array.isArray(value)) {
				value.length; // OK
			}
		}
	}
}
