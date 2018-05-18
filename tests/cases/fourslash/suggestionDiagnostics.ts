/// <reference path='fourslash.ts' />

////[|1|], 2;

verify.noErrors();
verify.getSuggestionDiagnostics([{
    message: "Left side of comma operator is unused and has no side effects.",
    code: 2695,
    reportsUnnecessary: true,
}]);
