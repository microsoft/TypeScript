import * as ts from "./_namespaces/ts";

export interface EmitOutput {
    outputFiles: OutputFile[];
    emitSkipped: boolean;
    /* @internal */ diagnostics: readonly ts.Diagnostic[];
}

export interface OutputFile {
    name: string;
    writeByteOrderMark: boolean;
    text: string;
    /* @internal */ data?: ts.WriteFileCallbackData;
}
