//// [tests/cases/compiler/moduleMemberWithoutTypeAnnotation2.ts] ////

//// [moduleMemberWithoutTypeAnnotation2.ts]
module TypeScript {
    export module CompilerDiagnostics {

        export interface IDiagnosticWriter {
            Alert(output: string): void;
        }

        export var diagnosticWriter = null;

        export function Alert(output: string) {
            if (diagnosticWriter) {
                diagnosticWriter.Alert(output);
            }
        }
    }
}


//// [moduleMemberWithoutTypeAnnotation2.js]
var TypeScript;
(function (TypeScript) {
    var CompilerDiagnostics;
    (function (CompilerDiagnostics) {
        CompilerDiagnostics.diagnosticWriter = null;
        function Alert(output) {
            if (CompilerDiagnostics.diagnosticWriter) {
                CompilerDiagnostics.diagnosticWriter.Alert(output);
            }
        }
        CompilerDiagnostics.Alert = Alert;
    })(CompilerDiagnostics = TypeScript.CompilerDiagnostics || (TypeScript.CompilerDiagnostics = {}));
})(TypeScript || (TypeScript = {}));
