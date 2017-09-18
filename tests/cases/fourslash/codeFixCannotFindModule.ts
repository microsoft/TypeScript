/// <reference path='fourslash.ts' />

////import * as abs from "abs";

verify.codeFixAvailable([{
    description: "!",
    actions: [{
        type: "!!!",
        data: {},
    }],
}]);

//verify.getAndApplyCodeFix();
//verify.currentFileContentIs('import * as abs from "abs"');
