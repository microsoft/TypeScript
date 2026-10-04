//// [tests/cases/compiler/awaitInNonAsyncFunction.ts] ////

//// [awaitInNonAsyncFunction.ts]
// https://github.com/Microsoft/TypeScript/issues/26586

function normalFunc(p: Promise<number>) {
  for await (const _ of []);
  return await p;
}

export function exportedFunc(p: Promise<number>) {
  for await (const _ of []);
  return await p;
}

const functionExpression = function(p: Promise<number>) {
  for await (const _ of []);
  await p;
}

const arrowFunc = (p: Promise<number>) => {
  for await (const _ of []);
  return await p;
};

function* generatorFunc(p: Promise<number>) {
  for await (const _ of []);
  yield await p;
}

class clazz {
  constructor(p: Promise<number>) {
    for await (const _ of []);
    await p;
  }
  method(p: Promise<number>) {
  for await (const _ of []);
    await p;
  }
}

for await (const _ of []);
await null;

//// [awaitInNonAsyncFunction.js]
// https://github.com/Microsoft/TypeScript/issues/26586
function normalFunc(p) {
    for await (const _ of [])
        ;
    return await p;
}
export function exportedFunc(p) {
    for await (const _ of [])
        ;
    return await p;
}
const functionExpression = function (p) {
    for await (const _ of [])
        ;
    await p;
};
const arrowFunc = (p) => {
    for await (const _ of [])
        ;
    return await p;
};
function* generatorFunc(p) {
    for await (const _ of [])
        ;
    yield await p;
}
class clazz {
    constructor(p) {
        for await (const _ of [])
            ;
        await p;
    }
    method(p) {
        for await (const _ of [])
            ;
        await p;
    }
}
for await (const _ of [])
    ;
await null;
