//// [tests/cases/compiler/primitiveUnionDetection.ts] ////

//// [primitiveUnionDetection.ts]
// Repro from #46624

type Kind = "one" | "two" | "three";

declare function getInterfaceFromString<T extends Kind>(options?: { type?: T } & { type?: Kind }): T;

const result = getInterfaceFromString({ type: 'two' });


//// [primitiveUnionDetection.js]
"use strict";
// Repro from #46624
var result = getInterfaceFromString({ type: 'two' });


//// [primitiveUnionDetection.d.ts]
type Kind = "one" | "two" | "three";
declare function getInterfaceFromString<T extends Kind>(options?: {
    type?: T;
} & {
    type?: Kind;
}): T;
declare const result: "two";
