import * as ts from 'typescript';
import { File } from './input';
import { Host } from './host';
import { ProjectInfo } from './project';
export interface ICompiler {
    prepare(project: ProjectInfo): void;
    inputFile(file: File): void;
    inputDone(): void;
}
/**
 * Compiles a whole project, with full type checking
 */
export declare class ProjectCompiler implements ICompiler {
    host: Host;
    project: ProjectInfo;
    program: ts.Program;
    private hasSourceMap;
    prepare(project: ProjectInfo): void;
    inputFile(file: File): void;
    inputDone(): void;
    private attachContentToFile(file, fileName, content);
    private emit(result, callback);
    private emitFile({file, jsFileName, dtsFileName, jsContent, dtsContent, jsMapContent}, currentDirectory);
    private reportDiagnostics(diagnostics);
    private removeSourceMapComment(content);
}
export declare class FileCompiler implements ICompiler {
    host: Host;
    project: ProjectInfo;
    private output;
    private previousOutput;
    private compilationResult;
    prepare(project: ProjectInfo): void;
    private write(file, fileName, diagnostics, content, sourceMap);
    inputFile(file: File): void;
    inputDone(): void;
}
