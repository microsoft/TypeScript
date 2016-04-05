/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
////export var foo: number = 1;
////export function bar() { return 10; }
////export function baz() { return 10; }

// @Filename: m2.ts
////export {/*1*/, /*2*/ from "./m1"
////export {/*3*/} from "./m1"
////export {foo,/*4*/ from "./m1"
////export {bar as /*5*/, /*6*/ from "./m1"
////export {foo, bar, baz as b,/*7*/} from "./m1"

function verifyCompletionAtMarker(marker: string, showBuilder: boolean, ...completions: string[]) {
    goTo.marker(marker);
    if (completions.length) {
        for (let completion of completions) {
            verify.completionListContains(completion);
        }
    }
    else {
        verify.completionListIsEmpty();
    }

    if (showBuilder) {
        verify.completionListAllowsNewIdentifier();
    }
    else {
        verify.not.completionListAllowsNewIdentifier();
    }
}

verifyCompletionAtMarker("1", /*showBuilder*/ false, "foo", "bar", "baz");
verifyCompletionAtMarker("2", /*showBuilder*/ false, "foo", "bar", "baz");
verifyCompletionAtMarker("3", /*showBuilder*/ false, "foo", "bar", "baz");
verifyCompletionAtMarker("4", /*showBuilder*/ false, "bar", "baz");
verifyCompletionAtMarker("5", /*showBuilder*/ true);
verifyCompletionAtMarker("6", /*showBuilder*/ false, "foo", "baz");
verifyCompletionAtMarker("7", /*showBuilder*/ false);