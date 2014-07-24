//// [mixedExports.ts]
declare module M {
     function foo();
     export function foo();
     function foo();
}

module A {
	interface X {x}
	export module X {}
	interface X {y}
}

//// [mixedExports.js]
