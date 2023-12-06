//// [tests/cases/compiler/controlFlowPropertyInitializer.ts] ////

//// [controlFlowPropertyInitializer.ts]
// Repro from #8967

const LANG = "Turbo Pascal"

class BestLanguage {
    name = LANG;
}

//// [controlFlowPropertyInitializer.js]
// Repro from #8967
var LANG = "Turbo Pascal";
var BestLanguage = /** @class */ (function () {
    function BestLanguage() {
        this.name = LANG;
    }
    return BestLanguage;
}());
