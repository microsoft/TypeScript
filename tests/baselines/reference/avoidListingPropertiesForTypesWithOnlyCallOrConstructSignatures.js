//// [tests/cases/compiler/avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.ts] ////

//// [avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.ts]
interface Dog {
    barkable: true
}

declare function getRover(): Dog
    
export let x:Dog = getRover;
// export let x: Dog = getRover; 

//// [avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = getRover;
// export let x: Dog = getRover; 
