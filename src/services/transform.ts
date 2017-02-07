/// <reference path="..\compiler\transformer.ts"/>
/// <reference path="transpile.ts"/>
namespace ts {
    export interface TransformOptions {
        newLine?: NewLineKind;
    }

    /**
     * Transform one or more source files using the supplied transformers.
     * @param source A `SourceFile` or an array of `SourceFiles`.
     * @param transformers An array of `Transformer` callbacks used to process the transformation.
     * @param compilerOptions Optional compiler options.
     */
    export function transform(source: SourceFile | SourceFile[], transformers: Transformer[], transformOptions?: TransformOptions) {
        const compilerOptions = <CompilerOptions>transformOptions || {};
        const newLine = getNewLineCharacter(compilerOptions);
        const sourceFiles = isArray(source) ? source : [source];
        const fileMap = arrayToMap(sourceFiles, sourceFile => sourceFile.fileName);
        const emitHost: EmitHost = {
            getCompilerOptions: () => compilerOptions,
            getCanonicalFileName: fileName => fileName,
            getCommonSourceDirectory: () => "",
            getCurrentDirectory: () => "",
            getNewLine: () => newLine,
            getSourceFile: fileName => fileMap.get(fileName),
            getSourceFileByPath: fileName => fileMap.get(fileName),
            getSourceFiles: () => sourceFiles,
            isSourceFileFromExternalLibrary: () => false,
            isEmitBlocked: () => false,
            writeFile: () => Debug.fail("'writeFile()' is not supported during transformation.")
        };
        return transformFiles(/*resolver*/ undefined, emitHost, sourceFiles, transformers);
    }
}