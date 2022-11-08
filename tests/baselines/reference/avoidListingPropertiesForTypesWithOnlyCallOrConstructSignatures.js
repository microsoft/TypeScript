//// [avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.ts]
interface Dog {
    barkable: true
}

declare function getRover(): Dog
    
export let x:Dog = getRover;
// export let x: Dog = getRover; 

//// [avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = getRover;
// export let x: Dog = getRover; 
