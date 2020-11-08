//// [cachedIterableTypesShouldAlwaysError.ts]
function foo(obj:
    { x: "x", [Symbol.iterator](): Generator<{ b: false }> } |
    { y: "y" }
) {
	for (const k of obj) { // should error
		void k;
	}

	for (const k of obj) { // should error
		void k;
	}
}


//// [cachedIterableTypesShouldAlwaysError.js]
function foo(obj) {
    for (const k of obj) { // should error
        void k;
    }
    for (const k of obj) { // should error
        void k;
    }
}
