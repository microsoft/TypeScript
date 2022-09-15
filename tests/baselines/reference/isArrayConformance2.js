//// [isArrayConformance2.ts]
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


//// [isArrayConformance2.js]
function fa(a) {
    if (Array.isArray(a)) {
        a; // Expected: [number, ...string[]] | readonly [boolean, boolean]
    }
}
function fb(a) {
    if (Array.isArray(a)) {
        var b = a; // OK
        a[0]; // Expected: number | boolean
    }
}
function fc(obj, prop) {
    var value = obj[prop];
    if (Array.isArray(value)) {
        value.length; // OK
    }
}
function fd(value) {
    if (Array.isArray(value)) {
        value.length; // OK
    }
}
function fe(data) {
    if (Array.isArray(data)) {
        for (var key in data) { // OK
            var value = data[key];
            if (Array.isArray(value)) {
                value.length; // OK
            }
        }
    }
}
