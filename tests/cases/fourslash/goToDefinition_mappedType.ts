///<reference path="fourslash.ts"/>

////interface I { /*def*/m(): void; };
////declare const i: { [K in "m"]: I[K] };
////i.[|/*ref*/m|]();

verify.baselineGoToDefinition("ref");
