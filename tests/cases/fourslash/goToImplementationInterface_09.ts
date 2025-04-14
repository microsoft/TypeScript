/// <reference path='fourslash.ts'/>

// Should go to object literals within cast expressions when invoked on interface

// @Filename: def.d.ts
//// export interface Interface { P: number }

// @Filename: ref.ts
//// import { Interface } from "./def";
//// const c: I/*ref*/nterface = [|{ P: 2 }|];

verify.baselineGoToImplementation("ref");