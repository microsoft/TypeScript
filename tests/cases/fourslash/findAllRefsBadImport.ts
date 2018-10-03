/// <reference path='fourslash.ts'/>

////import { [|ab|] as [|cd|] } from "doesNotExist";

const [r0, r1]  = test.ranges();
verify.referencesOf(r0, [r1]);
verify.referencesOf(r1, [r1]);
