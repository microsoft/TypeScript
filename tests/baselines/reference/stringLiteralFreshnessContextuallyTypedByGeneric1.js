//// [stringLiteralFreshnessContextuallyTypedByGeneric1.ts]
interface Guard<T> {
  (val: unknown): val is T;
}

type ObjectGuard<T> = {
  [key in keyof T]: Guard<T[key]>;
};

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== undefined && val !== null && typeof val === 'object' && !Array.isArray(val);
}

declare function createObjectGuard<T>(guard: ObjectGuard<T>): (val: unknown) => val is T;

declare function asLiteral<T extends (string | boolean | number)[]>(...literals: T): (val: unknown) => val is T[number]

// See type of `isWorking` - should include the type key as a union of strings
const isWorking = createObjectGuard({
//    ^?
  type: asLiteral('these', 'should', 'be', 'a', 'union'),
});


//// [stringLiteralFreshnessContextuallyTypedByGeneric1.js]
function isObject(val) {
    return val !== undefined && val !== null && typeof val === 'object' && !Array.isArray(val);
}
// See type of `isWorking` - should include the type key as a union of strings
var isWorking = createObjectGuard({
    //    ^?
    type: asLiteral('these', 'should', 'be', 'a', 'union')
});
