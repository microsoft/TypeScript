namespace ts {
    export interface TranspileOptions {
        compilerOptions?: CompilerOptions;
        fileName?: string;
        reportDiagnostics?: boolean;
        moduleName?: string;
        renamedDependencies?: MapLike<string>;
        transformers?: CustomTransformers;
    }

    export interface TranspileOutput {
        outputText: string;
        diagnostics?: Diagnostic[];
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
            options[option.name] = option.transpileOptionValue;
        }

        // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
        options.suppressOutputPathCheck = true;

        // Filename can be non-ts file.
        options.allowNonTsExtensions = true;

        // if jsx is specified then treat file as .tsx
        const inputFileName = transpileOptions.fileName || (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? "module.tsx" : "module.ts");
        const sourceFile = createSourceFile(inputFileName, input, options.target!); // TODO: GH#18217
        if (transpileOptions.moduleName) {
            sourceFile.moduleName = transpileOptions.moduleName;
        }

        if (transpileOptions.renamedDependencies) {
            sourceFile.renamedDependencies = new Map(getEntries(transpileOptions.renamedDependencies));
        }

        const newLine = getNewLineCharacter(options);

        // Output
        let outputText: string | undefined;
        let sourceMapText: string | undefined;

        // Create a compilerHost object to allow the compiler to read and write files
        const compilerHost: CompilerHost = {
            getSourceFile: (fileName) => fileName === normalizePath(inputFileName) ? sourceFile : undefined,
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

        const program = createProgram([inputFileName], options, compilerHost);

        if (transpileOptions.reportDiagnostics) {
            addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics(sourceFile));
            addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
        }
        // Emit
        program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ undefined, transpileOptions.transformers);

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

    /** JS users may pass in string values for enum compiler options (such as ModuleKind), so convert. */
    /*@internal*/
    export function fixupCompilerOptions(options: CompilerOptions, diagnostics: Diagnostic[]): CompilerOptions {
        // Lazily create this value to fix module loading errors.
        commandLineOptionsStringToEnum = commandLineOptionsStringToEnum || <CommandLineOptionOfCustomType[]>filter(optionDeclarations, o =>
            typeof o.type === "object" && !forEachEntry(o.type, v => typeof v !== "number"));

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
}
