/// <reference path='fourslash.ts'/>

// Should go to object literals within cast expressions when invoked on interface

// @Filename: def.d.ts
//// export type TypeAlias = { P: number }

// @Filename: ref.ts
//// import { TypeAlias } from "./def";
//// const c: T/*ref*/ypeAlias = [|{ P: 2 }|];

verify.baselineGoToImplementation("ref");