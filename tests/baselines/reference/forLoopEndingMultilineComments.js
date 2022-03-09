//// [forLoopEndingMultilineComments.ts]
declare var a: any;

export function consoleTestResultHandler(testResult: any): boolean {
    // needed to get colors to show up when passing through Grunt
    void a;

    for (const q of a) {
        void a;

        /* eslint-disable no-console */
        if (a) {
        } else {
        }
        /* eslint-enable no-console */
    }

    return true;
}

//// [forLoopEndingMultilineComments.js]
"use strict";
exports.__esModule = true;
exports.consoleTestResultHandler = void 0;
function consoleTestResultHandler(testResult) {
    // needed to get colors to show up when passing through Grunt
    void a;
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var q = a_1[_i];
        void a;
        /* eslint-disable no-console */
        if (a) {
        }
        else {
        }
        /* eslint-enable no-console */
    }
    return true;
}
exports.consoleTestResultHandler = consoleTestResultHandler;
