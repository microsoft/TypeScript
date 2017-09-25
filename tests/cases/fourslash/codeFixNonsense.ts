/// <reference path='fourslash.ts' />

////import * as abs from "abs";

test.setTypesRegistry({
    "abs": undefined,
});

verify.codeFixAvailable([{
    description: "!",
    actions: [{
        type: "!!!",
        data: {},
    }],
}]);

