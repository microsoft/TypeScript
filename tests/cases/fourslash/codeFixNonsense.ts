/// <reference path='fourslash.ts' />

////nonsense;

test.setTypesRegistry({
    "abs": undefined,
});

verify.codeFixAvailable([{
    description: "Add declaration file for 'nonsense'",
    commands: [{
        type: "nonsense",
    }],
}]);
