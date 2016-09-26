namespace ts {
    export interface TranspileOptions {
        compilerOptions?: CompilerOptions;
        fileName?: string;
        reportDiagnostics?: boolean;
        moduleName?: string;
        renamedDependencies?: MapLike<string>;
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

        const options: CompilerOptions = transpileOptions.compilerOptions ? fixupCompilerOptions(transpileOptions.compilerOptions, diagnostics) : getDefaultCompilerOptions();

        options.isolatedModules = true;

        // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
        options.suppressOutputPathCheck = true;

        // Filename can be non-ts file.
        options.allowNonTsExtensions = true;

        // We are not returning a sourceFile for lib file when asked by the program,
        // so pass --noLib to avoid reporting a file not found error.
        options.noLib = true;

        // Clear out other settings that would not be used in transpiling this module
        options.lib = undefined;
        options.types = undefined;
        options.noEmit = undefined;
        options.noEmitOnError = undefined;
        options.paths = undefined;
        options.rootDirs = undefined;
        options.declaration = undefined;
        options.declarationDir = undefined;
        options.out = undefined;
        options.outFile = undefined;

        // We are not doing a full typecheck, we are not resolving the whole context,
        // so pass --noResolve to avoid reporting missing file errors.
        options.noResolve = true;

        // if jsx is specified then treat file as .tsx
        const inputFileName = transpileOptions.fileName || (options.jsx ? "module.tsx" : "module.ts");
        const sourceFile = createSourceFile(inputFileName, input, options.target);
        if (transpileOptions.moduleName) {
            sourceFile.moduleName = transpileOptions.moduleName;
        }

        if (transpileOptions.renamedDependencies) {
            sourceFile.renamedDependencies = mapOfMapLike(transpileOptions.renamedDependencies);
        }

        const newLine = getNewLineCharacter(options);

        // Output
        let outputText: string;
        let sourceMapText: string;

        // Create a compilerHost object to allow the compiler to read and write files
        const compilerHost: CompilerHost = {
            getSourceFile: (fileName, target) => fileName === normalizePath(inputFileName) ? sourceFile : undefined,
            writeFile: (name, text, writeByteOrderMark) => {
                if (fileExtensionIs(name, ".map")) {
                    Debug.assert(sourceMapText === undefined, `Unexpected multiple source map outputs for the file '${name}'`);
                    sourceMapText = text;
                }
                else {
                    Debug.assert(outputText === undefined, `Unexpected multiple outputs for the file: '${name}'`);
                    outputText = text;
                }
            },
            getDefaultLibFileName: () => "lib.d.ts",
            useCaseSensitiveFileNames: () => false,
            getCanonicalFileName: fileName => fileName,
            getCurrentDirectory: () => "",
            getNewLine: () => newLine,
            fileExists: (fileName): boolean => fileName === inputFileName,
            readFile: (fileName): string => "",
            directoryExists: directoryExists => true,
            getDirectories: (path: string) => []
        };

        const program = createProgram([inputFileName], options, compilerHost);

        if (transpileOptions.reportDiagnostics) {
            addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics(sourceFile));
            addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
        }
        // Emit
        program.emit();

        Debug.assert(outputText !== undefined, "Output generation failed");

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
    function fixupCompilerOptions(options: CompilerOptions, diagnostics: Diagnostic[]): CompilerOptions {
        // Lazily create this value to fix module loading errors.
        commandLineOptionsStringToEnum = commandLineOptionsStringToEnum || <CommandLineOptionOfCustomType[]>filter(optionDeclarations, o =>
            typeof o.type === "object" && !someValueInMap(o.type, v => typeof v !== "number"));

        options = clone(options);

        for (const opt of commandLineOptionsStringToEnum) {
            if (!hasProperty(options, opt.name)) {
                continue;
            }

            const value = options[opt.name];
            // Value should be a key of opt.type
            if (typeof value === "string") {
                // If value is not a string, this will fail
                options[opt.name] = parseCustomTypeOption(opt, value, diagnostics);
            }
            else {
                if (!someValueInMap(opt.type, v => v === value)) {
                    // Supplied value isn't a valid enum value.
                    diagnostics.push(createCompilerDiagnosticForInvalidCustomType(opt));
                }
            }
        }

        return options;
    }
}
