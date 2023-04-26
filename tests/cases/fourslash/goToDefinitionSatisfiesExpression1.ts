/// <reference path="./fourslash.ts"/>

////const STRINGS = {
////    [|/*definition*/title|]: 'A Title',
////} satisfies Record<string,string>;
////
//////somewhere in app
////STRINGS.[|/*usage*/title|]

verify.baselineGoToDefinition("definition", "usage")
