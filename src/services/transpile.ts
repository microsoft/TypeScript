import * as ts from "./_namespaces/ts";

export interface TranspileOptions {
    compilerOptions?: ts.CompilerOptions;
    fileName?: string;
    reportDiagnostics?: boolean;
    moduleName?: string;
    renamedDependencies?: ts.MapLike<string>;
    transformers?: ts.CustomTransformers;
}

export interface TranspileOutput {
    outputText: string;
    diagnostics?: ts.Diagnostic[];
    sourceMapText?: string;
}

/*
 * This function will compile source text from 'input' argument using specified compiler options.
 * If not options are provided - it will use a set of default compiler options.
 * Extra compiler options that will unconditionally be used by this function are:
 * - isolatedModules = true
 * - allowNonTsExtensions = true
 * - noLib = true
 * - noResolve = true
 */
export function transpileModule(input: string, transpileOptions: TranspileOptions): TranspileOutput {
    const diagnostics: ts.Diagnostic[] = [];

    const options: ts.CompilerOptions = transpileOptions.compilerOptions ? fixupCompilerOptions(transpileOptions.compilerOptions, diagnostics) : {};

    // mix in default options
    const defaultOptions = ts.getDefaultCompilerOptions();
    for (const key in defaultOptions) {
        if (ts.hasProperty(defaultOptions, key) && options[key] === undefined) {
            options[key] = defaultOptions[key];
        }
    }

    for (const option of ts.transpileOptionValueCompilerOptions) {
        options[option.name] = option.transpileOptionValue;
    }

    // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
    options.suppressOutputPathCheck = true;

    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;

    const newLine = ts.getNewLineCharacter(options);
    // Create a compilerHost object to allow the compiler to read and write files
    const compilerHost: ts.CompilerHost = {
        getSourceFile: (fileName) => fileName === ts.normalizePath(inputFileName) ? sourceFile : undefined,
        writeFile: (name, text) => {
            if (ts.fileExtensionIs(name, ".map")) {
                ts.Debug.assertEqual(sourceMapText, undefined, "Unexpected multiple source map outputs, file:", name);
                sourceMapText = text;
            }
            else {
                ts.Debug.assertEqual(outputText, undefined, "Unexpected multiple outputs, file:", name);
                outputText = text;
            }
        },
        getDefaultLibFileName: () => "lib.d.ts",
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: fileName => fileName,
        getCurrentDirectory: () => "",
        getNewLine: () => newLine,
        fileExists: (fileName): boolean => fileName === inputFileName,
        readFile: () => "",
        directoryExists: () => true,
        getDirectories: () => []
    };

    // if jsx is specified then treat file as .tsx
    const inputFileName = transpileOptions.fileName || (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? "module.tsx" : "module.ts");
    const sourceFile = ts.createSourceFile(
        inputFileName,
        input,
        {
            languageVersion: ts.getEmitScriptTarget(options),
            impliedNodeFormat: ts.getImpliedNodeFormatForFile(ts.toPath(inputFileName, "", compilerHost.getCanonicalFileName), /*cache*/ undefined, compilerHost, options),
            setExternalModuleIndicator: ts.getSetExternalModuleIndicator(options)
        }
    );
    if (transpileOptions.moduleName) {
        sourceFile.moduleName = transpileOptions.moduleName;
    }

    if (transpileOptions.renamedDependencies) {
        sourceFile.renamedDependencies = new ts.Map(ts.getEntries(transpileOptions.renamedDependencies));
    }

    // Output
    let outputText: string | undefined;
    let sourceMapText: string | undefined;

    const program = ts.createProgram([inputFileName], options, compilerHost);

    if (transpileOptions.reportDiagnostics) {
        ts.addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics(sourceFile));
        ts.addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
    }
    // Emit
    program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ undefined, transpileOptions.transformers);

    if (outputText === undefined) return ts.Debug.fail("Output generation failed");

    return { outputText, diagnostics, sourceMapText };
}

/*
 * This is a shortcut function for transpileModule - it accepts transpileOptions as parameters and returns only outputText part of the result.
 */
export function transpile(input: string, compilerOptions?: ts.CompilerOptions, fileName?: string, diagnostics?: ts.Diagnostic[], moduleName?: string): string {
    const output = transpileModule(input, { compilerOptions, fileName, reportDiagnostics: !!diagnostics, moduleName });
    // addRange correctly handles cases when wither 'from' or 'to' argument is missing
    ts.addRange(diagnostics, output.diagnostics);
    return output.outputText;
}

let commandLineOptionsStringToEnum: ts.CommandLineOptionOfCustomType[];

/** JS users may pass in string values for enum compiler options (such as ModuleKind), so convert. */
/*@internal*/
export function fixupCompilerOptions(options: ts.CompilerOptions, diagnostics: ts.Diagnostic[]): ts.CompilerOptions {
    // Lazily create this value to fix module loading errors.
    commandLineOptionsStringToEnum = commandLineOptionsStringToEnum ||
        ts.filter(ts.optionDeclarations, o => typeof o.type === "object" && !ts.forEachEntry(o.type, v => typeof v !== "number")) as ts.CommandLineOptionOfCustomType[];

    options = ts.cloneCompilerOptions(options);

    for (const opt of commandLineOptionsStringToEnum) {
        if (!ts.hasProperty(options, opt.name)) {
            continue;
        }

        const value = options[opt.name];
        // Value should be a key of opt.type
        if (ts.isString(value)) {
            // If value is not a string, this will fail
            options[opt.name] = ts.parseCustomTypeOption(opt, value, diagnostics);
        }
        else {
            if (!ts.forEachEntry(opt.type, v => v === value)) {
                // Supplied value isn't a valid enum value.
                diagnostics.push(ts.createCompilerDiagnosticForInvalidCustomType(opt));
            }
        }
    }

    return options;
}
