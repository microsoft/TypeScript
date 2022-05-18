//// [controlFlowOptionalChainAlias2.ts]
interface Food2b {
    bard?: {
        getValues(): number[];
    }
}
declare const food2b: Food2b | undefined;
const bards = food2b?.bard?.getValues();
if (bards) {
    food2b; // type Food2b, OK  
    food2b.bard; // type { getValues(): number[] } | undefined. --- BUG 
    food2b.bard.getValues(); // error --- BUG
}



//// [controlFlowOptionalChainAlias2.js]
"use strict";
var _a;
var bards = (_a = food2b === null || food2b === void 0 ? void 0 : food2b.bard) === null || _a === void 0 ? void 0 : _a.getValues();
if (bards) {
    food2b; // type Food2b, OK  
    food2b.bard; // type { getValues(): number[] } | undefined. --- BUG 
    food2b.bard.getValues(); // error --- BUG
}


//// [controlFlowOptionalChainAlias2.d.ts]
interface Food2b {
    bard?: {
        getValues(): number[];
    };
}
declare const food2b: Food2b | undefined;
declare const bards: number[] | undefined;
