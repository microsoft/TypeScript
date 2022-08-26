
/// <reference path="./fourslash.ts" />

////declare class GetterFirst {
////    get mask(): any;
////    set mask(value: any);
////}
////export class A extends GetterFirst {
////    /*A*/
////}
////
////declare class SetterFirst {
////    set mask(value: any);
////    get mask(): any;
////}
////export class B extends SetterFirst {
////    /*B*/
////}

for (const marker of test.markers()) {
    goTo.marker(marker);
    verify.baselineCompletions({
        includeCompletionsWithInsertText: true,
        includeCompletionsWithClassMemberSnippets: true
    });
}