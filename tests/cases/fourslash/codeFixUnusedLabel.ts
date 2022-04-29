/// <reference path='fourslash.ts' />

/////* a */[|label|]/* b */:/* c */while (1) {}

verify.getSuggestionDiagnostics([{
    message: "Unused label.",
    code: 7028,
    reportsUnnecessary: true,
}]);

verify.codeFix({
    description: "Remove unused label",
    newFileContent:
`/* a */while (1) {}`,
});
