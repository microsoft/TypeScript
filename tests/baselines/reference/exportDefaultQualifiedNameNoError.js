//// [tests/cases/compiler/exportDefaultQualifiedNameNoError.ts] ////

//// [code.ts]
class C { static x = 0; };
export default C.x;
//// [usage.ts]
import def from "./code";
void def;

//// [code.js]
class C {
}
C.x = 0;
;
export default C.x;
//// [usage.js]
import def from "./code";
void def;
