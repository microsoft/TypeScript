//// [primitiveUnionDetection.ts]
// Repro from #46624

export type Kind = "one" | "two" | "three";

declare function getInterfaceFromString<T extends Kind>(options?: { type?: T } & { type?: Kind }): T;

const result = getInterfaceFromString({ type: 'two' });


//// [primitiveUnionDetection.js]
"use strict";
// Repro from #46624
exports.__esModule = true;
var result = getInterfaceFromString({ type: 'two' });


//// [primitiveUnionDetection.d.ts]
export declare type Kind = "one" | "two" | "three";
