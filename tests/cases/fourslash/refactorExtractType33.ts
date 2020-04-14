/// <reference path='fourslash.ts' />

//// type Item<T> = T extends (infer /*a*/P/*b*/)[] ? P : never

goTo.select("a", "b");
verify.not.refactorAvailable('Extract type')
