/// <reference path="fourslash.ts" />

//// module M {
//// 	export enum E {
//// 		A = 1,
//// 		B = 2,
//// 		C = 3,
//// 		/*1*/
//// 	}
//// }
//// module M {
//// 	function foo(): M.E {
//// 		return M.E.A;
//// 	}
//// }

// The point here is to make sure that we clean any
// decls for the enum instance type after an edit
// If we do not, an error will be raised claiming
// that foo's return type is not assignable with
// it's signature return type
verify.noErrors();
goTo.marker('1');
edit.insert('D = C << 1,');
verify.noErrors();