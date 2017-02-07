/// <reference path="..\compiler\transformer.ts"/>
/// <reference path="transpile.ts"/>
namespace ts {
    /**
     * Transform one or more source files using the supplied transformers.
     * @param source A `SourceFile` or an array of `SourceFiles`.
     * @param transformers An array of `Transformer` callbacks used to process the transformation.
     * @param compilerOptions Optional compiler options.
     */
    export function transform(source: SourceFile | SourceFile[], transformers: Transformer[], compilerOptions?: CompilerOptions) {
        const diagnostics: Diagnostic[] = [];
        compilerOptions = fixupCompilerOptions(compilerOptions, diagnostics);
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
        const result = transformFiles(/*resolver*/ undefined, emitHost, sourceFiles, transformers);
        result.diagnostics = concatenate(result.diagnostics, diagnostics);
        return result;
    }
}