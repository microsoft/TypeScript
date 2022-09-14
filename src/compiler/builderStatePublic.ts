import { BuildInfo, Diagnostic } from "./_namespaces/ts.js";

export interface EmitOutput {
    outputFiles: OutputFile[];
    emitSkipped: boolean;
    /** @internal */ diagnostics: readonly Diagnostic[];
}

export interface OutputFile {
    name: string;
    writeByteOrderMark: boolean;
    text: string;
    /** @internal */ buildInfo?: BuildInfo
}
