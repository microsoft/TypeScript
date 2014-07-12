// module then enum
// should be errors
module m4 { }
enum m4 { }

module m4a { var y = 2; }
enum m4a { One }

module m4b { export var y = 2; }
enum m4b { One }

module m4c { interface I { foo(): void } }
enum m4c { One }

module m4d { class C { foo() { } } }
enum m4d { One }

//// module then module

module m5 { export var y = 2; }
module m5 { export interface I { foo(): void } } // should already be reasonably well covered
