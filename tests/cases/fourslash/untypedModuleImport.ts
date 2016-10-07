/// <reference path='fourslash.ts' />

// @Filename: tsconfig.json
////{}

// @Filename: node_modules/foo/package.json
////{}

// @Filename: a.ts
////import /*foo*/[|foo|] from /*fooModule*/"foo";
////[|foo|]();

goTo.file("a.ts");
verify.numberOfErrorsInCurrentFile(0);

goTo.marker("fooModule");
verify.goToDefinitionIs([]);
verify.quickInfoIs('module "foo"');
verify.referencesAre([])

goTo.marker("foo");
verify.goToDefinitionIs([]);
verify.quickInfoIs("import foo");
verify.rangesReferenceEachOther();
