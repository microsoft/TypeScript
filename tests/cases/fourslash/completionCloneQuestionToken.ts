/// <reference path='fourslash.ts'/>

// @Filename: /file2.ts
//// type TCallback<T = any> = (options: T) => any;
//// type InKeyOf<E> = { [K in keyof E]?: TCallback<E[K]>; };
//// export class Bar<A> {
////     baz(a: InKeyOf<A>): void { }
//// }

// @Filename: /file1.ts
//// import { Bar } from './file2';
//// type TwoKeys = Record<'a' | 'b', { thisFails?: any; }>
//// class Foo extends Bar<TwoKeys> {
////     /**/
//// }

verify.completions({
    marker: "",
    includes: {
        name: "baz",
        insertText: "baz(a: { a?: (options: { thisFails?: any; }) => any; b?: (options: { thisFails?: any; }) => any; }): void {\n}",
        filterText: "baz",
    },
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithClassMemberSnippets: true,
    },
});