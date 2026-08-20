//// [tests/cases/conformance/jsdoc/extendsTagEmit.ts] ////

//// [super.js]
export class B { }

//// [main.js]
import { B } from './super'
/** @extends {Mismatch} */
class C extends B { }



//// [super.js]
export class B {
}
//// [main.js]
import { B } from './super';
/** @extends {Mismatch} */
class C extends B {
}
