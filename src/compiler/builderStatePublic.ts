import {
    Diagnostic,
    WriteFileCallbackData,
} from "./types";

export interface EmitOutput {
    outputFiles: OutputFile[];
    emitSkipped: boolean;
    /** @internal */ diagnostics: readonly Diagnostic[];
}

export interface OutputFile {
    name: string;
    writeByteOrderMark: boolean;
    text: string;
    /** @internal */ data?: WriteFileCallbackData;
}
