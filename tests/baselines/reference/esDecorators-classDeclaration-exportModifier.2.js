//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-exportModifier.2.ts] ////

//// [global.ts]
/** @type {*} */
var dec;

//// [file1.ts]
// ok
@dec export class C1 { }

//// [file2.ts]
// ok
@dec export default class C2 {}

//// [file3.ts]
// error
export @dec default class C3 {}

//// [file4.ts]
// ok
export @dec class C4 {}

//// [file5.ts]
// ok
export default @dec class C5 {}

//// [file6.ts]
// error
@dec export @dec class C6 {}

//// [file7.ts]
// error
@dec export default @dec class C7 {}


//// [global.js]
/** @type {*} */
var dec;
//// [file1.js]
// ok
@dec
export class C1 {
}
//// [file2.js]
// ok
@dec
export default class C2 {
}
//// [file3.js]
// error
export 
@dec
default class C3 {
}
//// [file4.js]
// ok
export 
@dec
class C4 {
}
//// [file5.js]
// ok
export default 
@dec
class C5 {
}
//// [file6.js]
// error
@dec
export 
@dec
class C6 {
}
//// [file7.js]
// error
@dec
export default 
@dec
class C7 {
}
