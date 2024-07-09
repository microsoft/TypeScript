// @Filename: file1.d.ts

// Errors: Initializers & statements in declaration file

declare class Foo {
	name = "test";
	"some prop" = 42;
	fn(): boolean {
		return false;
	}
}

declare var x = [];
declare var y = {};

declare module M1 {
	while(true);

	export var v1 = () => false;
}