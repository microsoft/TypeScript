/// <reference path='fourslash.ts' />

////import * as abs from "abs";

test.setTypesRegistry({
    "abs": undefined,
});

verify.codeFixAvailable([{
    description: "Install '@types/abs'",
    commands: [{
        type: "install package",
        packageName: "@types/abs",
    }],
}]);
