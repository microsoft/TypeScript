//// [tests/cases/conformance/expressions/assignmentOperator/assignmentGenericLookupTypeNarrowing.ts] ////

//// [assignmentGenericLookupTypeNarrowing.ts]
// Repro from #26130

let mappedObject: {[K in "foo"]: null | {x: string}} = {foo: {x: "hello"}};
declare function foo<T>(x: T): null | T;

function bar<K extends "foo">(key: K) {
  const element = foo(mappedObject[key]);
  if (element == null)
    return;
  const x = element.x;
}


//// [assignmentGenericLookupTypeNarrowing.js]
// Repro from #26130
var mappedObject = { foo: { x: "hello" } };
function bar(key) {
    var element = foo(mappedObject[key]);
    if (element == null)
        return;
    var x = element.x;
}
