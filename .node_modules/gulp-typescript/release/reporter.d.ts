/// <reference types="vinyl" />
import * as ts from 'typescript';
import * as VinylFile from 'vinyl';
export interface TypeScriptError extends Error {
    fullFilename?: string;
    relativeFilename?: string;
    file?: VinylFile;
    tsFile?: ts.SourceFile;
    diagnostic: ts.Diagnostic;
    startPosition?: {
        position: number;
        line: number;
        character: number;
    };
    endPosition?: {
        position: number;
        line: number;
        character: number;
    };
}
export interface CompilationResult {
    /**
     * Only used when using isolatedModules.
     */
    transpileErrors: number;
    optionsErrors: number;
    syntaxErrors: number;
    globalErrors: number;
    semanticErrors: number;
    declarationErrors: number;
    emitErrors: number;
    noEmit: boolean;
    emitSkipped: boolean;
}
export declare function emptyCompilationResult(noEmit: boolean): CompilationResult;
export interface Reporter {
    error?: (error: TypeScriptError, typescript: typeof ts) => void;
    finish?: (results: CompilationResult) => void;
}
export declare function nullReporter(): Reporter;
export declare function defaultReporter(): Reporter;
export declare function longReporter(): Reporter;
export declare function fullReporter(fullFilename?: boolean): Reporter;
