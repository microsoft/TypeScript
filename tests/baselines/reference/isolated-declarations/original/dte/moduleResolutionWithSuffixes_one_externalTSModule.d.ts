//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalTSModule.ts] ////

//// [/test.ts]
import { ios } from "some-library";

//// [/node_modules/some-library/index.ios.ts]
export function ios() {}
//// [/node_modules/some-library/index.ts]
export function base() {}

/// [Declarations] ////



//// [/bin/test.d.ts]
export {};
