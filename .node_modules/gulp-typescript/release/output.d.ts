/// <reference types="node" />
import * as stream from 'stream';
import * as ts from 'typescript';
import * as input from './input';
import * as reporter from './reporter';
import * as project from './project';
export declare class Output {
    constructor(_project: project.ProjectInfo, streamFull: stream.Readable, streamJs: stream.Readable, streamDts: stream.Readable);
    project: project.ProjectInfo;
    result: reporter.CompilationResult;
    streamFull: stream.Readable;
    streamJs: stream.Readable;
    streamDts: stream.Readable;
    writeJs(base: string, fileName: string, content: string, sourceMapContent: string, cwd: string, original: input.File): void;
    writeDts(base: string, fileName: string, content: string, cwd: string): void;
    private applySourceMap(sourceMapContent, original, output);
    finish(result: reporter.CompilationResult): void;
    private getError(info);
    diagnostic(info: ts.Diagnostic): void;
    error(error: reporter.TypeScriptError): void;
}
