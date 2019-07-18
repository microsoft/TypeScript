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

//// class A implements I {
////    /*b*/ 
//// }

const keywordEntries = ['private', 'protected', 'public', 'static', 'abstract', 'async', 'constructor', 'get', 'readonly', 'set'].map(keyword => {
  return {
    name: keyword,
    kind: 'keyword',
    kindModifiers: '',
    sortText: completion.SortText.GlobalsOrKeywords
  }
});

verify.completions(
  {
    marker: ['a'],
    exact: [
      { name: 'B', kindModifiers: 'optional', sortText: completion.SortText.MemberDeclaredBySpreadAssignment, kind: 'property' },
      { name: 'a', sortText: completion.SortText.MemberDeclaredBySpreadAssignment, kind: 'property' },
      { name: 'c', kindModifiers: 'optional', sortText: completion.SortText.OptionalMember, kind: 'property' },
      { name: 'd', sortText: completion.SortText.LocationPriority, kind: 'property' }
    ]
  },
  {
    marker: ['b'],
    isNewIdentifierLocation: true,
    exact:[
      { name: 'B', kindModifiers: 'optional', sortText: completion.SortText.OptionalMember, kind: 'property' },
      { name: 'a', sortText: completion.SortText.LocationPriority, kind: 'property' },
      { name: 'c', kindModifiers: 'optional', sortText: completion.SortText.OptionalMember, kind: 'property' },
      { name: 'd', sortText: completion.SortText.LocationPriority, kind: 'property' },
      ...keywordEntries
    ]
  }
);