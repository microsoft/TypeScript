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