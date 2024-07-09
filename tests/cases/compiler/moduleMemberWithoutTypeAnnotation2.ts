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
