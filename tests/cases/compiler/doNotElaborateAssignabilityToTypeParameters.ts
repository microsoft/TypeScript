// @lib: es2015
// @target: ES5, ES2015
async function foo<T>(x: T): Promise<T> {
  let yaddable = await getXOrYadda(x);
  return yaddable;
}

interface Yadda {
  stuff: string,
  things: string,
}

declare function getXOrYadda<T>(x: T): T | Yadda;
