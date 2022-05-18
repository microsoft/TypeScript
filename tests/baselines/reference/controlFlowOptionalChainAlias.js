//// [controlFlowOptionalChainAlias.ts]
interface Foodb {
    getValues(): number[];
}

declare const foodb: Foodb | undefined;

const valsb = foodb?.getValues();
if (valsb) {
    foodb; // before: Foodb|undefined after: Foodb 
    foodb.getValues; // before: error, after: OK
    foodb.getValues(); // before: error, after: OK
}


//// [controlFlowOptionalChainAlias.js]
"use strict";
var valsb = foodb === null || foodb === void 0 ? void 0 : foodb.getValues();
if (valsb) {
    foodb; // before: Foodb|undefined after: Foodb 
    foodb.getValues; // before: error, after: OK
    foodb.getValues(); // before: error, after: OK
}


//// [controlFlowOptionalChainAlias.d.ts]
interface Foodb {
    getValues(): number[];
}
declare const foodb: Foodb | undefined;
declare const valsb: number[] | undefined;
