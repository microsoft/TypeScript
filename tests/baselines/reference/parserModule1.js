//// [parserModule1.ts]
    export module CompilerDiagnostics {
        export var debug = false;
        export interface IDiagnosticWriter {
            Alert(output: string): void;
        }

        export var diagnosticWriter: IDiagnosticWriter = null;

        export var analysisPass: number = 0;

        export function Alert(output: string) {
            if (diagnosticWriter) {
                diagnosticWriter.Alert(output);
            }
        }

        export function debugPrint(s: string) {
            if (debug) {
                Alert(s);
            }
        }

        export function assert(condition: boolean, s: string) {
            if (debug) {
                if (!condition) {
                    Alert(s);
                }
            }
        }

    }

//// [parserModule1.js]
"use strict";
exports.__esModule = true;
exports.CompilerDiagnostics = void 0;
var CompilerDiagnostics;
(function (CompilerDiagnostics) {
    CompilerDiagnostics.debug = false;
    CompilerDiagnostics.diagnosticWriter = null;
    CompilerDiagnostics.analysisPass = 0;
    function Alert(output) {
        if (CompilerDiagnostics.diagnosticWriter) {
            CompilerDiagnostics.diagnosticWriter.Alert(output);
        }
    }
    CompilerDiagnostics.Alert = Alert;
    function debugPrint(s) {
        if (CompilerDiagnostics.debug) {
            Alert(s);
        }
    }
    CompilerDiagnostics.debugPrint = debugPrint;
    function assert(condition, s) {
        if (CompilerDiagnostics.debug) {
            if (!condition) {
                Alert(s);
            }
        }
    }
    CompilerDiagnostics.assert = assert;
})(CompilerDiagnostics = exports.CompilerDiagnostics || (exports.CompilerDiagnostics = {}));
