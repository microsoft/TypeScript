//// [conditionalTypeContextualTypeSimplificationsSuceeds.ts]
// repro from https://github.com/Microsoft/TypeScript/issues/26395
interface Props {
    when: (value: string) => boolean;
}

function bad<P extends Props>(
    attrs: string extends keyof P ? { [K in keyof P]: P[K] } : { [K in keyof P]: P[K] }) { }
function good1<P extends Props>(
    attrs: string extends keyof P ? P : { [K in keyof P]: P[K] }) { }
function good2<P extends Props>(
    attrs: { [K in keyof P]: P[K] }) { }

bad({ when: value => false });
good1({ when: value => false });
good2({ when: value => false });

//// [conditionalTypeContextualTypeSimplificationsSuceeds.js]
"use strict";
function bad(attrs) { }
function good1(attrs) { }
function good2(attrs) { }
bad({ when: function (value) { return false; } });
good1({ when: function (value) { return false; } });
good2({ when: function (value) { return false; } });
