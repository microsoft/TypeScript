import { Diagnostic, ExportedModulesFromDeclarationEmit } from "./types";

    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
        /* @internal */ diagnostics: readonly Diagnostic[];
        /* @internal */ exportedModulesFromDeclarationEmit?: ExportedModulesFromDeclarationEmit;
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }

