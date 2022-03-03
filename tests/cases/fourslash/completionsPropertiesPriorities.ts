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

verify.completions(
  {
    marker: ['a'],
    exact: [
      { name: 'd', sortText: completion.SortText.LocationPriority, kind: 'property' },
      { name: 'c', kindModifiers: 'optional', sortText: completion.SortText.OptionalMember, kind: 'property' },
      { name: 'a', sortText: completion.SortText.MemberDeclaredBySpreadAssignment, kind: 'property' },
      { name: 'B', kindModifiers: 'optional', sortText: completion.SortText.MemberDeclaredBySpreadAssignment, kind: 'property' },
    ]
  }
);