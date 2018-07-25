/// <reference path="fourslash.ts" />

////declare function foo<T>(x: T, y: T): T;
////declare function bar<U>(x: U, y: U): U;
////
////foo(bar/*1*/)

goTo.marker("1");

edit.insert("(");
verify.signatureHelp({
    text: "bar(x: {}, y: {}): {}",
    triggerReason: {
        kind: "characterTyped",
        triggerCharacter: "(",
    }
});
edit.backspace();

edit.insert("<");
verify.signatureHelp({
    text: "bar<U>(x: U, y: U): U",
    triggerReason: {
        kind: "characterTyped",
        triggerCharacter: "(",
    }
});
edit.backspace();

edit.insert(",");
verify.signatureHelp({
    text: "foo(x: <U>(x: U, y: U) => U, y: <U>(x: U, y: U) => U): <U>(x: U, y: U) => U",
    triggerReason: {
        kind: "characterTyped",
        triggerCharacter: "(",
    }
});
edit.backspace();