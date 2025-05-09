import {
    addRange,
    cloneCompilerOptions,
    CommandLineOptionOfCustomType,
    CompilerHost,
    CompilerOptions,
    createCompilerDiagnosticForInvalidCustomType,
    createProgram,
    createSourceFile,
    CustomTransformers,
    Debug,
    Diagnostic,
    fileExtensionIs,
    filter,
    forEachEntry,
    getDefaultCompilerOptions,
    getEmitScriptTarget,
    getImpliedNodeFormatForFile,
    getNewLineCharacter,
    getSetExternalModuleIndicator,
    hasProperty,
    isString,
    JSDocParsingMode,
    MapLike,
    normalizePath,
    optionDeclarations,
    parseCustomTypeOption,
    ScriptTarget,
    SourceFile,
    toPath,
    transpileOptionValueCompilerOptions,
} from "./_namespaces/ts.js";

export interface TranspileOptions {
    compilerOptions?: CompilerOptions;
    fileName?: string;
    reportDiagnostics?: boolean;
    moduleName?: string;
    renamedDependencies?: MapLike<string>;
    transformers?: CustomTransformers;
    jsDocParsingMode?: JSDocParsingMode;
}

export interface TranspileOutput {
    outputText: string;
    diagnostics?: Diagnostic[];
    sourceMapText?: string;
}

const optionsRedundantWithVerbatimModuleSyntax = new Set([
    "isolatedModules",
]);

/*
 * This function will compile source text from 'input' argument using specified compiler options.
 * If no options are provided - it will use a set of default compiler options.
 * Extra compiler options that will unconditionally be used by this function are:
 * - isolatedModules = true
 * - allowNonTsExtensions = true
 * - noLib = true
 * - noResolve = true
 * - declaration = false
 * - noCheck = true
 */
export function transpileModule(input: string, transpileOptions: TranspileOptions): TranspileOutput {
    return transpileWorker(input, transpileOptions, /*declaration*/ false);
}

/*
 * This function will create a declaration file from 'input' argument using specified compiler options.
 * If no options are provided - it will use a set of default compiler options.
 * Extra compiler options that will unconditionally be used by this function are:
 * - isolatedDeclarations = true
 * - isolatedModules = true
 * - allowNonTsExtensions = true
 * - noLib = true
 * - noResolve = true
 * - declaration = true
 * - emitDeclarationOnly = true
 * - noCheck = true
 * Note that this declaration file may differ from one produced by a full program typecheck,
 * in that only types in the single input file are available to be used in the generated declarations.
 */
export function transpileDeclaration(input: string, transpileOptions: TranspileOptions): TranspileOutput {
    return transpileWorker(input, transpileOptions, /*declaration*/ true);
}

// Declaration emit works without a `lib`, but some local inferences you'd expect to work won't without
//  at least a minimal `lib` available, since the checker will `any` their types without these defined.
//  Late bound symbol names, in particular, are impossible to define without `Symbol` at least partially defined.
// TODO: This should *probably* just load the full, real `lib` for the `target`.
const barebonesLibContent = `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}
interface Array<T> { length: number; [n: number]: T; }
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}`;
const barebonesLibName = "lib.d.ts";
let barebonesLibSourceFile: SourceFile | undefined;

function transpileWorker(input: string, transpileOptions: TranspileOptions, declaration?: boolean): TranspileOutput {
    barebonesLibSourceFile ??= createSourceFile(barebonesLibName, barebonesLibContent, { languageVersion: ScriptTarget.Latest });

    const diagnostics: Diagnostic[] = [];

    const options: CompilerOptions = transpileOptions.compilerOptions ? fixupCompilerOptions(transpileOptions.compilerOptions, diagnostics) : {};

    // mix in default options
    const defaultOptions = getDefaultCompilerOptions();
    for (const key in defaultOptions) {
        if (hasProperty(defaultOptions, key) && options[key] === undefined) {
            options[key] = defaultOptions[key];
        }
    }

    for (const option of transpileOptionValueCompilerOptions) {
        // Do not set redundant config options if `verbatimModuleSyntax` was supplied.
        if (options.verbatimModuleSyntax && optionsRedundantWithVerbatimModuleSyntax.has(option.name)) {
            continue;
        }

        options[option.name] = option.transpileOptionValue;
    }

    // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
    options.suppressOutputPathCheck = true;

    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;

    if (declaration) {
        options.declaration = true;
        options.emitDeclarationOnly = true;
        options.isolatedDeclarations = true;
    }
    else {
        options.declaration = false;
        options.declarationMap = false;
    }

    const newLine = getNewLineCharacter(options);
    // Create a compilerHost object to allow the compiler to read and write files
    const compilerHost: CompilerHost = {
        getSourceFile: fileName => fileName === normalizePath(inputFileName) ? sourceFile : fileName === normalizePath(barebonesLibName) ? barebonesLibSourceFile : undefined,
        writeFile: (name, text) => {
            if (fileExtensionIs(name, ".map")) {
                Debug.assertEqual(sourceMapText, undefined, "Unexpected multiple source map outputs, file:", name);
                sourceMapText = text;
            }
            else {
                Debug.assertEqual(outputText, undefined, "Unexpected multiple outputs, file:", name);
                outputText = text;
            }
        },
        getDefaultLibFileName: () => barebonesLibName,
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: fileName => fileName,
        getCurrentDirectory: () => "",
        getNewLine: () => newLine,
        fileExists: (fileName): boolean => fileName === inputFileName || (!!declaration && fileName === barebonesLibName),
        readFile: () => "",
        directoryExists: () => true,
        getDirectories: () => [],
    };

    // if jsx is specified then treat file as .tsx
    const inputFileName = transpileOptions.fileName || (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? "module.tsx" : "module.ts");
    const sourceFile = createSourceFile(
        inputFileName,
        input,
        {
            languageVersion: getEmitScriptTarget(options),
            impliedNodeFormat: getImpliedNodeFormatForFile(toPath(inputFileName, "", compilerHost.getCanonicalFileName), /*packageJsonInfoCache*/ undefined, compilerHost, options),
            setExternalModuleIndicator: getSetExternalModuleIndicator(options),
            jsDocParsingMode: transpileOptions.jsDocParsingMode ?? JSDocParsingMode.ParseAll,
        },
    );
    if (transpileOptions.moduleName) {
        sourceFile.moduleName = transpileOptions.moduleName;
    }

    if (transpileOptions.renamedDependencies) {
        sourceFile.renamedDependencies = new Map(Object.entries(transpileOptions.renamedDependencies));
    }

    // Output
    let outputText: string | undefined;
    let sourceMapText: string | undefined;

    const inputs = declaration ? [inputFileName, barebonesLibName] : [inputFileName];
    const program = createProgram(inputs, options, compilerHost);

    if (transpileOptions.reportDiagnostics) {
        addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics(sourceFile));
        addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
    }
    // Emit
    const result = program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ declaration, transpileOptions.transformers, /*forceDtsEmit*/ declaration);

    addRange(/*to*/ diagnostics, /*from*/ result.diagnostics);

    if (outputText === undefined) return Debug.fail("Output generation failed");

    return { outputText, diagnostics, sourceMapText };
}

/*
 * This is a shortcut function for transpileModule - it accepts transpileOptions as parameters and returns only outputText part of the result.
 */
export function transpile(input: string, compilerOptions?: CompilerOptions, fileName?: string, diagnostics?: Diagnostic[], moduleName?: string): string {
    const output = transpileModule(input, { compilerOptions, fileName, reportDiagnostics: !!diagnostics, moduleName });
    // addRange correctly handles cases when wither 'from' or 'to' argument is missing
    addRange(diagnostics, output.diagnostics);
    return output.outputText;
}

let commandLineOptionsStringToEnum: CommandLineOptionOfCustomType[];

/**
 * JS users may pass in string values for enum compiler options (such as ModuleKind), so convert.
 *
 * @internal
 */
export function fixupCompilerOptions(options: CompilerOptions, diagnostics: Diagnostic[]): CompilerOptions {
    // Lazily create this value to fix module loading errors.
    commandLineOptionsStringToEnum = commandLineOptionsStringToEnum ||
        filter(optionDeclarations, o => typeof o.type === "object" && !forEachEntry(o.type, v => typeof v !== "number")) as CommandLineOptionOfCustomType[];

    options = cloneCompilerOptions(options);

    for (const opt of commandLineOptionsStringToEnum) {
        if (!hasProperty(options, opt.name)) {
            continue;
        }

        const value = options[opt.name];
        // Value should be a key of opt.type
        if (isString(value)) {
            // If value is not a string, this will fail
            options[opt.name] = parseCustomTypeOption(opt, value, diagnostics);
        }
        else {
            if (!forEachEntry(opt.type, v => v === value)) {
                // Supplied value isn't a valid enum value.
                diagnostics.push(createCompilerDiagnosticForInvalidCustomType(opt));
            }
        }
    }

    return options;
}
