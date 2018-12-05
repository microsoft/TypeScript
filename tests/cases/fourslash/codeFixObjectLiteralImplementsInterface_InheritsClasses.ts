/// <reference path='fourslash.ts' />

//// class car{ wheels: number = 0; }
//// class boat{ lifeVests: number = 0; }
////
//// interface amphibian extends car, boat {}
//// let VAB: amphibian = { }

verify.codeFix({
    description: "Implement interface 'amphibian'",
    newFileContent:
`class car{ wheels: number = 0; }
class boat{ lifeVests: number = 0; }

interface amphibian extends car, boat {}
let VAB: amphibian = {
    wheels: 0,
    lifeVests: 0,
}`,
});
