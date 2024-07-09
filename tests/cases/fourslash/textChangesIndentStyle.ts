/// <reference path="fourslash.ts" />

// This fourslash file is indented with tabs.

// @Filename: /a.ts
//// [|export class Foo {
//// 	constructor(
//// 		public readonly a: number,
//// 
//// 		/**
//// 		 * Docs!
//// 		 */
//// 		public readonly b: number,
//// 	) { }
//// }|]

format.setOption("convertTabsToSpaces", false);
verify.moveToNewFile({
  newFileContents: {
    "/a.ts": "",
    "/Foo.ts":
`export class Foo {
	constructor(
		public readonly a: number,

		/**
		 * Docs!
		 */
		public readonly b: number
	) { }
}
`
  }
});
