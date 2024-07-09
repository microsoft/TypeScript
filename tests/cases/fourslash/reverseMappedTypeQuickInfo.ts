/// <reference path="fourslash.ts" />

////interface IAction {
////    type: string;
////}
////
////type Reducer<S> = (state: S, action: IAction) => S
////
////function combineReducers<S>(reducers: { [K in keyof S]: Reducer<S[K]> }): Reducer<S> {
////    const dummy = {} as S;
////    return () => dummy;
////}
////
////const test_inner = (test: string, action: IAction) => {
////    return 'dummy';
////}
////const test = combineReducers({
////    test_inner
////});
////
////const test_outer = combineReducers({
////    test
////});
////
////// '{test: { test_inner: any } }'
////type FinalType/*1*/ = ReturnType<typeof test_outer>;
////
////var k: FinalType;
////k.test.test_inner/*2*/

verify.quickInfoAt("1", `type FinalType = {
    test: {
        test_inner: string;
    };
}`);
verify.quickInfoAt("2", `(property) test_inner: string`);
