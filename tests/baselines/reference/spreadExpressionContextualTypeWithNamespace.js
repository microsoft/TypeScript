//// [tests/cases/compiler/spreadExpressionContextualTypeWithNamespace.ts] ////

//// [spreadExpressionContextualTypeWithNamespace_0.ts]
// Repro from #44179 with some modification

function func() {}
class klass {}
const obj = { x: true };

export { func, klass, obj };

export function exportedDirectly() {}

//// [spreadExpressionContextualTypeWithNamespace_1.ts]
import * as stuff from "./spreadExpressionContextualTypeWithNamespace_0";

stuff.func;
stuff.klass;
stuff.obj;
stuff.exportedDirectly;

function getStuff<T>() {
  const thing = { ...stuff };
  thing.func;
  thing.klass;
  thing.obj;
  thing.exportedDirectly;
  return thing;
}

getStuff().func;
getStuff().klass;
getStuff().obj;
getStuff().exportedDirectly;


//// [spreadExpressionContextualTypeWithNamespace_0.js]
// Repro from #44179 with some modification
function func() { }
class klass {
}
const obj = { x: true };
export { func, klass, obj };
export function exportedDirectly() { }
//// [spreadExpressionContextualTypeWithNamespace_1.js]
import * as stuff from "./spreadExpressionContextualTypeWithNamespace_0";
stuff.func;
stuff.klass;
stuff.obj;
stuff.exportedDirectly;
function getStuff() {
    const thing = Object.assign({}, stuff);
    thing.func;
    thing.klass;
    thing.obj;
    thing.exportedDirectly;
    return thing;
}
getStuff().func;
getStuff().klass;
getStuff().obj;
getStuff().exportedDirectly;
