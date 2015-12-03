/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="diagnosticInformationMap.generated.ts"/>
/// <reference path="scanner.ts"/>

namespace ts {
    /* @internal */
    export let optionDeclarations: CommandLineOption[] = [
        {
            name: "charset",
            type: "string",
        },
        {
            name: "declaration",
            shortName: "d",
            type: "boolean",
            description: Diagnostics.Generates_corresponding_d_ts_file,
        },
        {
            name: "diagnostics",
            type: "boolean",
        },
        {
            name: "emitBOM",
            type: "boolean"
        },
        {
            name: "help",
            shortName: "h",
            type: "boolean",
            description: Diagnostics.Print_this_message,
        },
        {
            name: "init",
            type: "boolean",
            description: Diagnostics.Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file,
        },
        {
            name: "inlineSourceMap",
            type: "boolean",
        },
        {
            name: "inlineSources",
            type: "boolean",
        },
        {
            name: "jsx",
            type: {
                "preserve": JsxEmit.Preserve,
                "react": JsxEmit.React
            },
            paramType: Diagnostics.KIND,
            description: Diagnostics.Specify_JSX_code_generation_Colon_preserve_or_react,
            error: Diagnostics.Argument_for_jsx_must_be_preserve_or_react
        },
        {
            name: "listFiles",
            type: "boolean",
        },
        {
            name: "locale",
            type: "string",
        },
        {
            name: "mapRoot",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "module",
            shortName: "m",
            type: {
                "commonjs": ModuleKind.CommonJS,
                "amd": ModuleKind.AMD,
                "system": ModuleKind.System,
                "umd": ModuleKind.UMD,
                "es6": ModuleKind.ES6,
                "es2015": ModuleKind.ES2015,
            },
            description: Diagnostics.Specify_module_code_generation_Colon_commonjs_amd_system_umd_or_es2015,
            paramType: Diagnostics.KIND,
            error: Diagnostics.Argument_for_module_option_must_be_commonjs_amd_system_umd_or_es2015
        },
        {
            name: "newLine",
            type: {
                "crlf": NewLineKind.CarriageReturnLineFeed,
                "lf": NewLineKind.LineFeed
            },
            description: Diagnostics.Specifies_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix,
            paramType: Diagnostics.NEWLINE,
            error: Diagnostics.Argument_for_newLine_option_must_be_CRLF_or_LF
        },
        {
            name: "noEmit",
            type: "boolean",
            description: Diagnostics.Do_not_emit_outputs,
        },
        {
            name: "noEmitHelpers",
            type: "boolean"
        },
        {
            name: "noEmitOnError",
            type: "boolean",
            description: Diagnostics.Do_not_emit_outputs_if_any_errors_were_reported,
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            description: Diagnostics.Raise_error_on_expressions_and_declarations_with_an_implied_any_type,
        },
        {
            name: "noLib",
            type: "boolean",
        },
        {
            name: "noResolve",
            type: "boolean",
        },
        {
            name: "skipDefaultLibCheck",
            type: "boolean",
        },
        {
            name: "out",
            type: "string",
            isFilePath: false, // This is intentionally broken to support compatability with existing tsconfig files
                               // for correct behaviour, please use outFile
            paramType: Diagnostics.FILE,
        },
        {
            name: "outFile",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Concatenate_and_emit_output_to_single_file,
            paramType: Diagnostics.FILE,
        },
        {
            name: "outDir",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Redirect_output_structure_to_the_directory,
            paramType: Diagnostics.DIRECTORY,
        },
        {
            name: "preserveConstEnums",
            type: "boolean",
            description: Diagnostics.Do_not_erase_const_enum_declarations_in_generated_code
        },
        {
            name: "pretty",
            paramType: Diagnostics.KIND,
            description: Diagnostics.Stylize_errors_and_messages_using_color_and_context_experimental,
            type: "boolean"
        },
        {
            name: "project",
            shortName: "p",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Compile_the_project_in_the_given_directory,
            paramType: Diagnostics.DIRECTORY
        },
        {
            name: "removeComments",
            type: "boolean",
            description: Diagnostics.Do_not_emit_comments_to_output,
        },
        {
            name: "rootDir",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Specifies_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "isolatedModules",
            type: "boolean",
        },
        {
            name: "sourceMap",
            type: "boolean",
            description: Diagnostics.Generates_corresponding_map_file,
        },
        {
            name: "sourceRoot",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "suppressExcessPropertyErrors",
            type: "boolean",
            description: Diagnostics.Suppress_excess_property_checks_for_object_literals,
            experimental: true
        },
        {
            name: "suppressImplicitAnyIndexErrors",
            type: "boolean",
            description: Diagnostics.Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures,
        },
        {
            name: "stripInternal",
            type: "boolean",
            description: Diagnostics.Do_not_emit_declarations_for_code_that_has_an_internal_annotation,
            experimental: true
        },
        {
            name: "target",
            shortName: "t",
            type: {
                "es3": ScriptTarget.ES3,
                "es5": ScriptTarget.ES5,
                "es6": ScriptTarget.ES6,
                "es2015": ScriptTarget.ES2015,
            },
            description: Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES2015_experimental,
            paramType: Diagnostics.VERSION,
            error: Diagnostics.Argument_for_target_option_must_be_ES3_ES5_or_ES2015
        },
        {
            name: "version",
            shortName: "v",
            type: "boolean",
            description: Diagnostics.Print_the_compiler_s_version,
        },
        {
            name: "watch",
            shortName: "w",
            type: "boolean",
            description: Diagnostics.Watch_input_files,
        },
        {
            name: "experimentalDecorators",
            type: "boolean",
            description: Diagnostics.Enables_experimental_support_for_ES7_decorators
        },
        {
            name: "emitDecoratorMetadata",
            type: "boolean",
            experimental: true,
            description: Diagnostics.Enables_experimental_support_for_emitting_type_metadata_for_decorators
        },
        {
            name: "moduleResolution",
            type: {
                "node": ModuleResolutionKind.NodeJs,
                "classic": ModuleResolutionKind.Classic
            },
            description: Diagnostics.Specifies_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6,
            error: Diagnostics.Argument_for_moduleResolution_option_must_be_node_or_classic,
        },
        {
            name: "allowUnusedLabels",
            type: "boolean",
            description: Diagnostics.Do_not_report_errors_on_unused_labels
        },
        {
            name: "noImplicitReturns",
            type: "boolean",
            description: Diagnostics.Report_error_when_not_all_code_paths_in_function_return_a_value
        },
        {
            name: "noFallthroughCasesInSwitch",
            type: "boolean",
            description: Diagnostics.Report_errors_for_fallthrough_cases_in_switch_statement
        },
        {
            name: "allowUnreachableCode",
            type: "boolean",
            description: Diagnostics.Do_not_report_errors_on_unreachable_code
        },
        {
            name: "forceConsistentCasingInFileNames",
            type: "boolean",
            description: Diagnostics.Disallow_inconsistently_cased_references_to_the_same_file
        },
        {
            name: "allowSyntheticDefaultImports",
            type: "boolean",
            description: Diagnostics.Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking
        },
        {
            name: "allowJs",
            type: "boolean",
            description: Diagnostics.Allow_javascript_files_to_be_compiled
        }
    ];

    /* @internal */
    export interface OptionNameMap {
        optionNameMap: Map<CommandLineOption>;
        shortOptionNames: Map<string>;
    }

    let optionNameMapCache: OptionNameMap;
    /* @internal */
    export function getOptionNameMap(): OptionNameMap {
        if (optionNameMapCache) {
            return optionNameMapCache;
        }

        const optionNameMap: Map<CommandLineOption> = {};
        const shortOptionNames: Map<string> = {};
        forEach(optionDeclarations, option => {
            optionNameMap[option.name.toLowerCase()] = option;
            if (option.shortName) {
                shortOptionNames[option.shortName] = option.name;
            }
        });

        optionNameMapCache = { optionNameMap, shortOptionNames };
        return optionNameMapCache;
    }

    export function parseCommandLine(commandLine: string[], readFile?: (path: string) => string): ParsedCommandLine {
        const options: CompilerOptions = {};
        const fileNames: string[] = [];
        const errors: Diagnostic[] = [];
        const { optionNameMap, shortOptionNames } = getOptionNameMap();

        parseStrings(commandLine);
        return {
            options,
            fileNames,
            errors
        };

        function parseStrings(args: string[]) {
            let i = 0;
            while (i < args.length) {
                let s = args[i++];
                if (s.charCodeAt(0) === CharacterCodes.at) {
                    parseResponseFile(s.slice(1));
                }
                else if (s.charCodeAt(0) === CharacterCodes.minus) {
                    s = s.slice(s.charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();

                    // Try to translate short option names to their full equivalents.
                    if (hasProperty(shortOptionNames, s)) {
                        s = shortOptionNames[s];
                    }

                    if (hasProperty(optionNameMap, s)) {
                        const opt = optionNameMap[s];

                        // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
                        if (!args[i] && opt.type !== "boolean") {
                            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_expects_an_argument, opt.name));
                        }

                        switch (opt.type) {
                            case "number":
                                options[opt.name] = parseInt(args[i++]);
                                break;
                            case "boolean":
                                options[opt.name] = true;
                                break;
                            case "string":
                                options[opt.name] = args[i++] || "";
                                break;
                            // If not a primitive, the possible types are specified in what is effectively a map of options.
                            default:
                                let map = <Map<number>>opt.type;
                                let key = (args[i++] || "").toLowerCase();
                                if (hasProperty(map, key)) {
                                    options[opt.name] = map[key];
                                }
                                else {
                                    errors.push(createCompilerDiagnostic((<CommandLineOptionOfCustomType>opt).error));
                                }
                        }
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_compiler_option_0, s));
                    }
                }
                else {
                    fileNames.push(s);
                }
            }
        }

        function parseResponseFile(fileName: string) {
            const text = readFile ? readFile(fileName) : sys.readFile(fileName);

            if (!text) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_0_not_found, fileName));
                return;
            }

            const args: string[] = [];
            let pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= CharacterCodes.space) pos++;
                if (pos >= text.length) break;
                const start = pos;
                if (text.charCodeAt(start) === CharacterCodes.doubleQuote) {
                    pos++;
                    while (pos < text.length && text.charCodeAt(pos) !== CharacterCodes.doubleQuote) pos++;
                    if (pos < text.length) {
                        args.push(text.substring(start + 1, pos));
                        pos++;
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unterminated_quoted_string_in_response_file_0, fileName));
                    }
                }
                else {
                    while (text.charCodeAt(pos) > CharacterCodes.space) pos++;
                    args.push(text.substring(start, pos));
                }
            }
            parseStrings(args);
        }
    }

    /**
      * Read tsconfig.json file
      * @param fileName The path to the config file
      */
    export function readConfigFile(fileName: string, readFile: (path: string) => string): { config?: any; error?: Diagnostic }  {
        let text = "";
        try {
            text = readFile(fileName);
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message) };
        }
        return parseConfigFileTextToJson(fileName, text);
    }

    /**
      * Parse the text of the tsconfig.json file
      * @param fileName The path to the config file
      * @param jsonText The text of the config file
      */
    export function parseConfigFileTextToJson(fileName: string, jsonText: string): { config?: any; error?: Diagnostic } {
        try {
            const jsonTextWithoutComments = removeComments(jsonText);
            return { config: /\S/.test(jsonTextWithoutComments) ? JSON.parse(jsonTextWithoutComments) : {} };
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Failed_to_parse_file_0_Colon_1, fileName, e.message) };
        }
    }


    /**
     * Remove the comments from a json like text.
     * Comments can be single line comments (starting with # or //) or multiline comments using / * * /
     *
     * This method replace comment content by whitespace rather than completely remove them to keep positions in json parsing error reporting accurate.
     */
    function removeComments(jsonText: string): string {
        let output = "";
        const scanner = createScanner(ScriptTarget.ES5, /* skipTrivia */ false, LanguageVariant.Standard, jsonText);
        let token: SyntaxKind;
        while ((token = scanner.scan()) !== SyntaxKind.EndOfFileToken) {
            switch (token) {
                case SyntaxKind.SingleLineCommentTrivia:
                case SyntaxKind.MultiLineCommentTrivia:
                    // replace comments with whitespace to preserve original character positions
                    output += scanner.getTokenText().replace(/\S/g, " ");
                    break;
                default:
                    output += scanner.getTokenText();
                    break;
            }
        }
        return output;
    }


    /**
      * Parse the contents of a config file (tsconfig.json).
      * @param json The contents of the config file to parse
      * @param host Instance of ParseConfigHost used to enumerate files in folder.
      * @param basePath A root directory to resolve relative path entries in the config
      *    file to. e.g. outDir
      */
    export function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions: CompilerOptions = {}): ParsedCommandLine {
        const { options: optionsFromJsonConfigFile, errors } = convertCompilerOptionsFromJson(json["compilerOptions"], basePath);

        const options = extend(existingOptions, optionsFromJsonConfigFile);
        return {
            options,
            fileNames: getFileNames(),
            errors
        };

        function getFileNames(): string[] {
            let fileNames: string[];
            if (hasProperty(json, "files")) {
                if (isArray(json["files"])) {
                    fileNames = <string[]>json["files"];
                }
                else {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "files", "Array"));
                }
            }

            let includeSpecs: string[];
            if (hasProperty(json, "include")) {
                if (isArray(json["include"])) {
                    includeSpecs = <string[]>json["include"];
                }
                else {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "include", "Array"));
                }
            }

            let excludeSpecs: string[];
            if (hasProperty(json, "exclude")) {
                if (isArray(json["exclude"])) {
                    excludeSpecs = <string[]>json["exclude"];
                }
                else {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "exclude", "Array"));
                }
            }

            if (fileNames === undefined && includeSpecs === undefined) {
                includeSpecs = ["**/*.ts"];
                if (options.jsx) {
                    includeSpecs.push("**/*.tsx");
                }

                if (options.allowJs) {
                    includeSpecs.push("**/*.js");
                    if (options.jsx) {
                        includeSpecs.push("**/*.jsx");
                    }
                }
            }

            return expandFiles(fileNames, includeSpecs, excludeSpecs, basePath, options, host, errors);
        }
    }

    export function convertCompilerOptionsFromJson(jsonOptions: any, basePath: string): { options: CompilerOptions, errors: Diagnostic[] } {
        const options: CompilerOptions = {};
        const errors: Diagnostic[] = [];

        if (!jsonOptions) {
            return { options, errors };
        }

        const optionNameMap = arrayToMap(optionDeclarations, opt => opt.name);

        for (const id in jsonOptions) {
            if (hasProperty(optionNameMap, id)) {
                const opt = optionNameMap[id];
                const optType = opt.type;
                let value = jsonOptions[id];
                const expectedType = typeof optType === "string" ? optType : "string";
                if (typeof value === expectedType) {
                    if (typeof optType !== "string") {
                        const key = value.toLowerCase();
                        if (hasProperty(optType, key)) {
                            value = optType[key];
                        }
                        else {
                            errors.push(createCompilerDiagnostic((<CommandLineOptionOfCustomType>opt).error));
                            value = 0;
                        }
                    }
                    if (opt.isFilePath) {
                        value = normalizePath(combinePaths(basePath, value));
                        if (value === "") {
                            value = ".";
                        }
                    }
                    options[opt.name] = value;
                }
                else {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, id, expectedType));
                }
            }
            else {
                errors.push(createCompilerDiagnostic(Diagnostics.Unknown_compiler_option_0, id));
            }
        }

        return { options, errors };
    }

    // Simplified whitelist, forces escaping of any non-word (or digit), non-whitespace character.
    const reservedCharacterPattern = /[^\w\s]/g;

    const enum ExpandResult {
        Ok,
        Error
    }

    /**
     * Expands an array of file specifications.
     *
     * @param fileNames The literal file names to include.
     * @param includeSpecs The file specifications to expand.
     * @param excludeSpecs The file specifications to exclude.
     * @param basePath The base path for any relative file specifications.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param errors An array for diagnostic reporting.
     */
    export function expandFiles(fileNames: string[], includeSpecs: string[], excludeSpecs: string[], basePath: string, options: CompilerOptions, host: ParseConfigHost, errors?: Diagnostic[]): string[] {
        basePath = normalizePath(basePath);
        basePath = removeTrailingDirectorySeparator(basePath);

        const excludePattern = includeSpecs ? createExcludeRegularExpression(excludeSpecs, basePath, options, host, errors) : undefined;
        const fileSet = createFileMap<Path>(host.useCaseSensitiveFileNames ? caseSensitiveKeyMapper : caseInsensitiveKeyMapper);

        // include every literal file.
        if (fileNames) {
            for (const fileName of fileNames) {
                const path = toPath(fileName, basePath, caseSensitiveKeyMapper);
                if (!fileSet.contains(path)) {
                    fileSet.set(path, path);
                }
            }
        }

        // expand and include the provided files into the file set.
        if (includeSpecs) {
            for (let includeSpec of includeSpecs) {
                includeSpec = normalizePath(includeSpec);
                includeSpec = removeTrailingDirectorySeparator(includeSpec);
                expandFileSpec(basePath, includeSpec, 0, excludePattern, options, host, errors, fileSet);
            }
        }

        const output = fileSet.reduce(addFileToOutput, []);
        return output;
    }

    /**
     * Expands a file specification with wildcards.
     *
     * @param basePath The directory to expand.
     * @param fileSpec The original file specification.
     * @param start The starting offset in the file specification.
     * @param excludePattern A pattern used to exclude a file specification.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param errors An array for diagnostic reporting.
     * @param fileSet The set of matching files.
     * @param isExpandingRecursiveDirectory A value indicating whether the file specification includes a recursive directory wildcard prior to the start of this segment.
     */
    function expandFileSpec(basePath: string, fileSpec: string, start: number, excludePattern: RegExp, options: CompilerOptions, host: ParseConfigHost, errors: Diagnostic[], fileSet: FileMap<Path>, isExpandingRecursiveDirectory?: boolean): ExpandResult {
        // Skip expansion if the base path matches an exclude pattern.
        if (isExcludedPath(excludePattern, basePath)) {
            return ExpandResult.Ok;
        }

        // Find the offset of the next wildcard in the file specification
        let offset = indexOfWildcard(fileSpec, start);
        if (offset < 0) {
            // There were no more wildcards, so include the file.
            const path = toPath(fileSpec.substring(start), basePath, caseSensitiveKeyMapper);
            includeFile(path, excludePattern, options, host, fileSet);
            return ExpandResult.Ok;
        }

        // Find the last directory separator before the wildcard to get the leading path.
        offset = fileSpec.lastIndexOf(directorySeparator, offset);
        if (offset > start) {
            // The wildcard occurs in a later segment, include remaining path up to
            // wildcard in prefix.
            basePath = combinePaths(basePath, fileSpec.substring(start, offset));

            // Skip this wildcard path if the base path now matches an exclude pattern.
            if (isExcludedPath(excludePattern, basePath)) {
                return ExpandResult.Ok;
            }

            start = offset + 1;
        }

        // Find the offset of the next directory separator to extract the wildcard path segment.
        offset = getEndOfPathSegment(fileSpec, start);

        // Check if the current offset is the beginning of a recursive directory pattern.
        if (isRecursiveDirectoryWildcard(fileSpec, start, offset)) {
            if (offset >= fileSpec.length) {
                // If there is no file specification following the recursive directory pattern
                // we cannot match any files, so we will ignore this pattern.
                return ExpandResult.Ok;
            }

            // Stop expansion if a file specification contains more than one recursive directory pattern.
            if (isExpandingRecursiveDirectory) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, fileSpec));
                }

                return ExpandResult.Error;
            }

            // Expand the recursive directory pattern.
            return expandRecursiveDirectory(basePath, fileSpec, offset + 1, excludePattern, options, host, errors, fileSet);
        }

        // Match the entries in the directory against the wildcard pattern.
        const pattern = createRegularExpressionFromWildcard(fileSpec, start, offset, host);

        // If there are no more directory separators (the offset is at the end of the file specification), then
        // this must be a file.
        if (offset >= fileSpec.length) {
            const files = host.readFileNames(basePath);
            for (const extension of getSupportedExtensions(options)) {
                for (const file of files) {
                    if (fileExtensionIs(file, extension)) {
                        const path = toPath(file, basePath, caseSensitiveKeyMapper);

                        // .ts extension would read the .d.ts extension files too but since .d.ts is lower priority extension,
                        // lets pick them when its turn comes up.
                        if (extension === ".ts" && fileExtensionIs(file, ".d.ts")) {
                            continue;
                        }

                        // If this is one of the output extension (which would be .d.ts and .js if we are allowing compilation of js files)
                        // do not include this file if we included .ts or .tsx file with same base name as it could be output of the earlier compilation
                        if (extension === ".d.ts" || (options.allowJs && contains(supportedJavascriptExtensions, extension))) {
                            if (fileSet.contains(changeExtension(path, ".ts")) || fileSet.contains(changeExtension(path, ".tsx"))) {
                                continue;
                            }
                        }

                        // This wildcard has no further directory to process, so include the file.
                        includeFile(path, excludePattern, options, host, fileSet);
                    }
                }
            }
        }
        else {
            const directories = host.readDirectoryNames(basePath);
            for (const directory of directories) {
                // If this was a directory, process the directory.
                const path = toPath(directory, basePath, caseSensitiveKeyMapper);
                if (expandFileSpec(path, fileSpec, offset + 1, excludePattern, options, host, errors, fileSet, isExpandingRecursiveDirectory) === ExpandResult.Error) {
                    return ExpandResult.Error;
                }
            }
        }

        return ExpandResult.Ok;
    }

    /**
     * Expands a `**` recursive directory wildcard.
     *
     * @param basePath The directory to recursively expand.
     * @param fileSpec The original file specification.
     * @param start The starting offset in the file specification.
     * @param excludePattern A pattern used to exclude a file specification.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param errors An array for diagnostic reporting.
     * @param fileSet The set of matching files.
     */
    function expandRecursiveDirectory(basePath: string, fileSpec: string, start: number, excludePattern: RegExp, options: CompilerOptions, host: ParseConfigHost, errors: Diagnostic[], fileSet: FileMap<Path>): ExpandResult {
        // expand the non-recursive part of the file specification against the prefix path.
        if (expandFileSpec(basePath, fileSpec, start, excludePattern, options, host, errors, fileSet, /*isExpandingRecursiveDirectory*/ true) === ExpandResult.Error) {
            return ExpandResult.Error;
        }

        // Recursively expand each subdirectory.
        const directories = host.readDirectoryNames(basePath);
        for (const entry of directories) {
            const path = combinePaths(basePath, entry);
            if (expandRecursiveDirectory(path, fileSpec, start, excludePattern, options, host, errors, fileSet) === ExpandResult.Error) {
                return ExpandResult.Error;
            }
        }

        return ExpandResult.Ok;
    }

    /**
     * Attempts to include a file in a file set.
     *
     * @param file The file to include.
     * @param excludePattern A pattern used to exclude a file specification.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param fileSet The set of matching files.
     */
    function includeFile(file: Path, excludePattern: RegExp, options: CompilerOptions, host: ParseConfigHost, fileSet: FileMap<Path>): void {
        // Ignore the file if it should be excluded.
        if (isExcludedPath(excludePattern, file)) {
            return;
        }

        // Ignore the file if it doesn't exist.
        if (!host.fileExists(file)) {
            return;
        }

        // Ignore the file if it does not have a supported extension.
        if (!options.allowNonTsExtensions && !isSupportedSourceFileName(file, options)) {
            return;
        }

        if (!fileSet.contains(file)) {
            fileSet.set(file, file);
        }
    }

    /**
     * Adds a file to an array of files.
     *
     * @param output The output array.
     * @param file The file path.
     */
    function addFileToOutput(output: string[], file: string) {
        output.push(file);
        return output;
    }

    /**
     * Determines whether a path should be excluded.
     *
     * @param excludePattern A pattern used to exclude a file specification.
     * @param path The path to test for exclusion.
     */
    function isExcludedPath(excludePattern: RegExp, path: string) {
        return excludePattern ? excludePattern.test(path) : false;
    }

    /**
     * Creates a regular expression from a glob-style wildcard.
     *
     * @param fileSpec The file specification.
     * @param start The starting offset in the file specification.
     * @param end The end offset in the file specification.
     * @param host The host used to resolve files and directories.
     */
    function createRegularExpressionFromWildcard(fileSpec: string, start: number, end: number, host: ParseConfigHost): RegExp {
        const pattern = createPatternFromWildcard(fileSpec, start, end);
        return new RegExp("^" + pattern + "$", host.useCaseSensitiveFileNames ? "" : "i");
    }

    /**
     * Creates a pattern from a wildcard segment.
     *
     * @param fileSpec The file specification.
     * @param start The starting offset in the file specification.
     * @param end The end offset in the file specification.
     */
    function createPatternFromWildcard(fileSpec: string, start: number, end: number): string {
        let pattern = "";
        let offset = indexOfWildcard(fileSpec, start);
        while (offset >= 0 && offset < end) {
            if (offset > start) {
                // Escape and append the non-wildcard portion to the regular expression
                pattern += escapeRegularExpressionText(fileSpec, start, offset);
            }

            const charCode = fileSpec.charCodeAt(offset);
            if (charCode === CharacterCodes.asterisk) {
                // Append a multi-character (zero or more characters) pattern to the regular expression
                pattern += "[^/]*";
            }
            else if (charCode === CharacterCodes.question) {
                // Append a single-character (zero or one character) pattern to the regular expression
                pattern += "[^/]";
            }

            start = offset + 1;
            offset = indexOfWildcard(fileSpec, start);
        }

        // Escape and append any remaining non-wildcard portion.
        if (start < end) {
            pattern += escapeRegularExpressionText(fileSpec, start, end);
        }

        return pattern;
    }

    /**
     * Creates a regular expression from a glob-style wildcard used to exclude a file.
     *
     * @param excludeSpecs The file specifications to exclude.
     * @param basePath The prefix path.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param errors An array for diagnostic reporting.
     */
    function createExcludeRegularExpression(excludeSpecs: string[], basePath: string, options: CompilerOptions, host: ParseConfigHost, errors: Diagnostic[]): RegExp {
        // Ignore an empty exclusion list
        if (!excludeSpecs || excludeSpecs.length === 0) {
            return undefined;
        }

        basePath = escapeRegularExpressionText(basePath, 0, basePath.length);

        let pattern = "";
        for (const excludeSpec of excludeSpecs) {
            const excludePattern = createExcludePattern(excludeSpec, basePath, options, host, errors);
            if (excludePattern) {
                if (pattern.length > 0) {
                    pattern += "|";
                }

                pattern += "(" + excludePattern + ")";
            }
        }

        if (pattern.length > 0) {
            return new RegExp("^(" + pattern + ")($|/)", host.useCaseSensitiveFileNames ? "" : "i");
        }

        return undefined;
    }

    /**
     * Creates a pattern for used to exclude a file.
     *
     * @param excludeSpec The file specification to exclude.
     * @param basePath The base path for the exclude pattern.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     * @param errors An array for diagnostic reporting.
     */
    function createExcludePattern(excludeSpec: string, basePath: string, options: CompilerOptions, host: ParseConfigHost, errors: Diagnostic[]): string {
        if (!excludeSpec) {
            return undefined;
        }

        excludeSpec = normalizePath(excludeSpec);
        excludeSpec = removeTrailingDirectorySeparator(excludeSpec);

        let pattern = isRootedDiskPath(excludeSpec) ? "" : basePath;
        let hasRecursiveDirectoryWildcard = false;
        let segmentStart = 0;
        let segmentEnd = getEndOfPathSegment(excludeSpec, segmentStart);
        while (segmentStart < segmentEnd) {
            if (isRecursiveDirectoryWildcard(excludeSpec, segmentStart, segmentEnd)) {
                if (hasRecursiveDirectoryWildcard) {
                    if (errors) {
                        errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, excludeSpec));
                    }

                    return undefined;
                }

                // As an optimization, if the recursive directory is the last
                // wildcard, or is followed by only `*` or `*.ts`, don't add the
                // remaining pattern and exit the loop.
                if (canElideRecursiveDirectorySegment(excludeSpec, segmentEnd, options, host)) {
                    break;
                }

                hasRecursiveDirectoryWildcard = true;
                pattern += "(/.+)?";
            }
            else {
                if (pattern) {
                    pattern += directorySeparator;
                }

                pattern += createPatternFromWildcard(excludeSpec, segmentStart, segmentEnd);
            }

            segmentStart = segmentEnd + 1;
            segmentEnd = getEndOfPathSegment(excludeSpec, segmentStart);
        }

        return pattern;
    }

    /**
     * Determines whether a recursive directory segment can be elided when
     * building a regular expression to exclude a path.
     *
     * @param excludeSpec The file specification used to exclude a path.
     * @param segmentEnd The end position of the recursive directory segment.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     */
    function canElideRecursiveDirectorySegment(excludeSpec: string, segmentEnd: number, options: CompilerOptions, host: ParseConfigHost) {
        // If there are no segments after this segment, the pattern for this segment may be elided.
        if (segmentEnd + 1 >= excludeSpec.length) {
            return true;
        }

        // If the following segment is a wildcard that may be elided, the pattern for this segment may be elided.
        return canElideWildcardSegment(excludeSpec, segmentEnd + 1, options, host);
    }

    /**
     * Determines whether a wildcard segment can be elided when building a
     * regular expression to exclude a path.
     *
     * @param excludeSpec The file specification used to exclude a path.
     * @param segmentStart The starting position of the segment.
     * @param options Compiler options.
     * @param host The host used to resolve files and directories.
     */
    function canElideWildcardSegment(excludeSpec: string, segmentStart: number, options: CompilerOptions, host: ParseConfigHost) {
        const charCode = excludeSpec.charCodeAt(segmentStart);
        if (charCode === CharacterCodes.asterisk) {
            const end = excludeSpec.length;

            // If the segment consists only of `*`, we may elide this segment.
            if (segmentStart + 1 === end) {
                return true;
            }

            // If the segment consists only of `*.ts`, and we do not allow
            // any other extensions for source files, we may elide this segment.
            if (!options.allowNonTsExtensions && !options.jsx && !options.allowJs && segmentStart + 4 === end) {
                const segment = excludeSpec.substr(segmentStart);
                return fileExtensionIs(host.useCaseSensitiveFileNames ? segment : segment.toLowerCase(), ".ts");
            }
        }
        return false;
    }

    /**
     * Escape regular expression reserved tokens.
     *
     * @param text The text to escape.
     * @param start The starting offset in the string.
     * @param end The ending offset in the string.
     */
    function escapeRegularExpressionText(text: string, start: number, end: number) {
        return text.substring(start, end).replace(reservedCharacterPattern, "\\$&");
    }

    /**
     * Determines whether the wildcard at the current offset is a recursive directory wildcard.
     *
     * @param fileSpec The file specification.
     * @param segmentStart The starting offset of a segment in the file specification.
     * @param segmentEnd The ending offset of a segment in the file specification.
     */
    function isRecursiveDirectoryWildcard(fileSpec: string, segmentStart: number, segmentEnd: number) {
        return segmentEnd - segmentStart === 2 &&
            fileSpec.charCodeAt(segmentStart) === CharacterCodes.asterisk &&
            fileSpec.charCodeAt(segmentStart + 1) === CharacterCodes.asterisk;
    }

    /**
     * Gets the index of the next wildcard character in a file specification.
     *
     * @param fileSpec The file specification.
     * @param start The starting offset in the file specification.
     */
    function indexOfWildcard(fileSpec: string, start: number): number {
        for (let i = start; i < fileSpec.length; ++i) {
            const ch = fileSpec.charCodeAt(i);
            if (ch === CharacterCodes.asterisk || ch === CharacterCodes.question) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Get the end position of a path segment, either the index of the next directory separator or
     * the provided end position.
     *
     * @param fileSpec The file specification.
     * @param segmentStart The start offset in the file specification.
     */
    function getEndOfPathSegment(fileSpec: string, segmentStart: number): number {
        const end = fileSpec.length;
        if (segmentStart >= end) {
            return end;
        }

        const offset = fileSpec.indexOf(directorySeparator, segmentStart);
        return offset < 0 ? end : offset;
    }

    /**
     * Gets a case sensitive key.
     *
     * @param key The original key.
     */
    function caseSensitiveKeyMapper(key: string) {
        return key;
    }

    /**
     * Gets a case insensitive key.
     *
     * @param key The original key.
     */
    function caseInsensitiveKeyMapper(key: string) {
        return key.toLowerCase();
    }
}
