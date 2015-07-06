/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
////export var foo: number = 1;
////export function bar() { return 10; }
////export function baz() { return 10; }

// @Filename: m2.ts
////import {/*1*/, /*2*/ from "m1"
////import {/*3*/} from "m1"
////import {foo,/*4*/ from "m1"
////import {bar as /*5*/, /*6*/ from "m1"
////import {foo, bar, baz as b,/*7*/} from "m1"
function verifyCompletionAtMarker(marker: string, ...completions: string[]) {
    goTo.marker(marker);
    if (completions.length) {
        for (var i = 0; i < completions.length; ++i) {
            verify.completionListContains(completions[i]);
        }
    }
    else {
        verify.completionListIsEmpty();
    }
}

verifyCompletionAtMarker("1", "foo", "bar", "baz");
verifyCompletionAtMarker("2", "foo", "bar", "baz");
verifyCompletionAtMarker("3", "foo", "bar", "baz");
verifyCompletionAtMarker("4", "bar", "baz");
verifyCompletionAtMarker("5");
verifyCompletionAtMarker("6", "foo", "baz");
verifyCompletionAtMarker("7");