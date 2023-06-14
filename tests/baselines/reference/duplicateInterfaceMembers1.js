//// [tests/cases/compiler/duplicateInterfaceMembers1.ts] ////

//// [duplicateInterfaceMembers1.ts]
interface Bar {
   x: number;
   x: number;
}


//// [duplicateInterfaceMembers1.js]
