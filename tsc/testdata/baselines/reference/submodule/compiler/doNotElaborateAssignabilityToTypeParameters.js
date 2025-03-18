//// [tests/cases/compiler/doNotElaborateAssignabilityToTypeParameters.ts] ////

//// [doNotElaborateAssignabilityToTypeParameters.ts]
async function foo<T>(x: T): Promise<T> {
  let yaddable = await getXOrYadda(x);
  return yaddable;
}

interface Yadda {
  stuff: string,
  things: string,
}

declare function getXOrYadda<T>(x: T): T | Yadda;


//// [doNotElaborateAssignabilityToTypeParameters.js]
async function foo(x) {
    let yaddable = await getXOrYadda(x);
    return yaddable;
}
