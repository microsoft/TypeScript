//// [tests/cases/compiler/unusedDestructuringParameters.ts] ////

//// [unusedDestructuringParameters.ts]
const f = ([a]) => { };
f([1]);
const f2 = ({a}) => { };
f2({ a: 10 });
const f3 = ([_]) => { };
f3([10]);

//// [unusedDestructuringParameters.js]
const f = ([a]) => { };
f([1]);
const f2 = ({ a }) => { };
f2({ a: 10 });
const f3 = ([_]) => { };
f3([10]);
