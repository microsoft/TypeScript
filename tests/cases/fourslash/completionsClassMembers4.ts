/// <reference path="fourslash.ts" />

// @filename: /foo.ts
////export class Observable<T> {
////    pipe(): Observable<T>;
////    pipe<A>(): Observable<A>;
////    pipe<A, B>(): Observable<B>;
////    pipe<A, B, C>(): Observable<C>;
////    pipe<A, B, C, D>(): Observable<D>;
////    pipe<A, B, C, D, E>(): Observable<E>;
////    pipe<A, B, C, D, E, F>(): Observable<F>;
////    pipe<A, B, C, D, E, F, G>(): Observable<G>;
////    pipe<A, B, C, D, E, F, G, H>(): Observable<H>;
////    pipe<A, B, C, D, E, F, G, H, I>(): Observable<I>;
////    pipe<A, B, C, D, E, F, G, H, I>(): Observable<unknown>;
////}
////export class Foo extends Observable<any> {
////    /**/
////}

verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithClassMemberSnippets: true,
});
