//// [tests/cases/compiler/defineVariables_useDefineForClassFields.ts] ////

//// [defineVariables_useDefineForClassFields.ts]
const a = () => b()
const b = () => null
a()

//// [defineVariables_useDefineForClassFields.js]
const a = () => b();
const b = () => null;
a();
