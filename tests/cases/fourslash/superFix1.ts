/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() {/*0*/
////    }
////}

verify.codeFixAtPosition(`
class Base {
}
class C extends Base {
    constructor() {
        super();
    }
}`);
