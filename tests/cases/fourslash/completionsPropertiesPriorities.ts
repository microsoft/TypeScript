/// <reference path="fourslash.ts" />
// @strict: true

//// interface I {
////   B?: number;
////   a: number;
////   c?: string;
////   d: string
//// }

//// const foo = {
////   a: 1,
////   B: 2
//// }

//// const i: I = {
////   ...foo,
////   /*a*/
//// }

verify.completions({
  marker: ['a'],
  exact: [
    { name: 'B', isFulfilled: true, kindModifiers: 'optional', sortText: completion.SortText.LocationPriorityFulfilled, kind: 'property' },
    { name: 'a', isFulfilled: true, sortText: completion.SortText.LocationPriorityFulfilled, kind: 'property' },
    { name: 'c', isFulfilled: false, kindModifiers: 'optional', sortText: completion.SortText.LocationPriorityOptional, kind: 'property' },
    { name: 'd', isFulfilled: false, sortText: completion.SortText.LocationPriority, kind: 'property' }
  ]
});