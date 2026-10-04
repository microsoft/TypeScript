//// [tests/cases/compiler/avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.ts] ////

//// [avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.ts]
interface Dog {
    barkable: true
}

declare function getRover(): Dog
    
export let x:Dog = getRover;
// export let x: Dog = getRover; 

//// [avoidListingPropertiesForTypesWithOnlyCallOrConstructSignatures.js]
export let x = getRover;
// export let x: Dog = getRover; 
