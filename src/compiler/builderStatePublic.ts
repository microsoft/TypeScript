namespace ts {
    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
        /* @internal */ exportedModulesFromDeclarationEmit?: ExportedModulesFromDeclarationEmit;
    }

    export interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
}