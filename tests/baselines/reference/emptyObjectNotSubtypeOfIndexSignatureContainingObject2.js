//// [tests/cases/compiler/emptyObjectNotSubtypeOfIndexSignatureContainingObject2.ts] ////

//// [emptyObjectNotSubtypeOfIndexSignatureContainingObject2.ts]
// This should behave the same as emptyObjectNotSubtypeOfIndexSignatureContainingObject1.ts
// Begin types from Lodash.
interface Dictionary<T> {
  [index: string]: T;
}

interface NumericDictionary<T> {
  [index: number]: T;
}

type ObjectIterator<TObject, TResult> = (
  value: TObject[keyof TObject],
  key: string,
  collection: TObject
) => TResult;

type DictionaryIterator<T, TResult> = ObjectIterator<Dictionary<T>, TResult>;

// In lodash.d.ts this function has many overloads, but this seems to be the problematic one.
function mapValues<T, TResult>(
  obj: Dictionary<T> | NumericDictionary<T> | null | undefined,
  callback: DictionaryIterator<T, TResult>
): Dictionary<TResult> {
  return null as any;
}
// End types from Lodash.

interface Foo {
  foo: string;
}

interface Bar {
  bar: string;
}

export function fooToBar(
  foos: Record<string, Foo>
): Record<string, Bar | null> {
  const wat = mapValues(foos, f => f.foo);
  const result = foos == null ? {} : mapValues(foos, f => f.foo);
  // This line _should_ fail, because `result` is not the right type.
  return result;
}


//// [emptyObjectNotSubtypeOfIndexSignatureContainingObject2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fooToBar = fooToBar;
// In lodash.d.ts this function has many overloads, but this seems to be the problematic one.
function mapValues(obj, callback) {
    return null;
}
function fooToBar(foos) {
    var wat = mapValues(foos, function (f) { return f.foo; });
    var result = foos == null ? {} : mapValues(foos, function (f) { return f.foo; });
    // This line _should_ fail, because `result` is not the right type.
    return result;
}
