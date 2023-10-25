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

//// [file8.ts]
// ok
@dec abstract class C8 {}

//// [file9.ts]
// ok
@dec export abstract class C9 {}

//// [file10.ts]
// ok
@dec export default abstract class C10 {}

//// [file11.ts]
// ok
export @dec abstract class C11 {}

//// [file12.ts]
// ok
export default @dec abstract class C12 {}

//// [file13.ts]
// error
abstract @dec class C13 {}

//// [file14.ts]
// error
export abstract @dec class C14 {}

//// [file15.ts]
// error
export default abstract @dec class C15 {}


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
//// [file8.js]
// ok
@dec
class C8 {
}
//// [file9.js]
// ok
@dec
export class C9 {
}
//// [file10.js]
// ok
@dec
export default class C10 {
}
//// [file11.js]
// ok
export 
@dec
class C11 {
}
//// [file12.js]
// ok
export default 
@dec
class C12 {
}
//// [file13.js]
// error
abstract;
@dec
class C13 {
}
//// [file14.js]
abstract;
@dec
class C14 {
}
//// [file15.js]
// error
export default abstract;
@dec
class C15 {
}
