//// [tests/cases/compiler/newAbstractInstance2.ts] ////

//// [a.ts]
export default abstract class {}

//// [b.ts]
import A from "./a";
new A();


//// [a.js]
export default class {
}
//// [b.js]
import A from "./a";
new A();
