///<reference path='references.ts' />

module TypeScript {
    export interface DiagnosticInfo {
        category: DiagnosticCategory;
        message: string;
        code: number;
    }
}