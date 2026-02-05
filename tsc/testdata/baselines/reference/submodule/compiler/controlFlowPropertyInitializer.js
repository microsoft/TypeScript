//// [tests/cases/compiler/controlFlowPropertyInitializer.ts] ////

//// [controlFlowPropertyInitializer.ts]
// Repro from #8967

const LANG = "Turbo Pascal"

class BestLanguage {
    name = LANG;
}

//// [controlFlowPropertyInitializer.js]
"use strict";
// Repro from #8967
const LANG = "Turbo Pascal";
class BestLanguage {
    name = LANG;
}
