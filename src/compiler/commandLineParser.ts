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
        const { fileNames, wildcardDirectories } = getFileNames();
        return {
            options,
            fileNames,
            errors,
            wildcardDirectories
        };

        function getFileNames(): ExpandResult {
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
                includeSpecs = ["**/*"];
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

    const invalidTrailingRecursionPattern = /(^|\/)\*\*\/?$/;
    const invalidMultipleRecursionPatterns = /(^|\/)\*\*\/(.*\/)?\*\*($|\/)/;

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
    export function expandFiles(fileNames: string[], includeSpecs: string[], excludeSpecs: string[], basePath: string, options: CompilerOptions, host: ParseConfigHost, errors?: Diagnostic[]): ExpandResult {
        basePath = normalizePath(basePath);
        basePath = removeTrailingDirectorySeparator(basePath);

        // The exclude spec list is converted into a regular expression, which allows us to quickly
        // test whether a file or directory should be excluded before recursively traversing the
        // file system.
        const keyMapper = host.useCaseSensitiveFileNames ? caseSensitiveKeyMapper : caseInsensitiveKeyMapper;

        // Literal file names (provided via the "files" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map later when when including
        // wildcard paths.
        const literalFileMap: Map<string> = {};

        // Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map to store paths matched
        // via wildcard, and to handle extension priority.
        const wildcardFileMap: Map<string> = {};

        // Wildcard directories (provided as part of a wildcard path) are stored in a
        // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
        // or a recursive directory. This information is used by filesystem watchers to monitor for
        // new entries in these paths.
        const wildcardDirectories: Map<WatchDirectoryFlags> = getWildcardDirectories(includeSpecs, basePath, host.useCaseSensitiveFileNames);

        // Rather than requery this for each file and filespec, we query the supported extensions
        // once and store it on the expansion context.
        const supportedExtensions = getSupportedExtensions(options);

        // Literal files are always included verbatim. An "include" or "exclude" specification cannot
        // remove a literal file.
        if (fileNames) {
            for (const fileName of fileNames) {
                const file = combinePaths(basePath, fileName);
                literalFileMap[keyMapper(file)] = file;
            }
        }

        if (includeSpecs) {
            includeSpecs = validateSpecs(includeSpecs, errors, /*allowTrailingRecursion*/ false);
            if (excludeSpecs) {
                excludeSpecs = validateSpecs(excludeSpecs, errors, /*allowTrailingRecursion*/ true);
            }

            for (const file of host.readDirectory(basePath, supportedExtensions, excludeSpecs, includeSpecs)) {
                // If we have already included a literal or wildcard path with a
                // higher priority extension, we should skip this file.
                //
                // This handles cases where we may encounter both <file>.ts and
                // <file>.d.ts (or <file>.js if "allowJs" is enabled) in the same
                // directory when they are compilation outputs.
                if (hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMapper)) {
                    continue;
                }

                // We may have included a wildcard path with a lower priority
                // extension due to the user-defined order of entries in the
                // "include" array. If there is a lower priority extension in the
                // same directory, we should remove it.
                removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMapper);

                const key = keyMapper(file);
                if (!hasProperty(literalFileMap, key) && !hasProperty(wildcardFileMap, key)) {
                    wildcardFileMap[key] = file;
                }
            }
        }

        const literalFiles = reduceProperties(literalFileMap, addFileToOutput, []);
        const wildcardFiles = reduceProperties(wildcardFileMap, addFileToOutput, []);
        wildcardFiles.sort(host.useCaseSensitiveFileNames ? compareStrings : compareStringsCaseInsensitive);
        return {
            fileNames: literalFiles.concat(wildcardFiles),
            wildcardDirectories
        };
    }

    function validateSpecs(specs: string[], errors: Diagnostic[], allowTrailingRecursion: boolean) {
        const validSpecs: string[] = [];
        for (const spec of specs) {
            if (!allowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, spec));
            }
            else if (invalidMultipleRecursionPatterns.test(spec)) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec));
            }
            else {
                validSpecs.push(spec);
            }
        }

        return validSpecs;
    }

    const watchRecursivePattern = /\/[^/]*?[*?][^/]*\//;
    const wildcardDirectoryPattern = /^[^*?]*(?=\/[^/]*[*?])/;

    /**
     * Gets directories in a set of include patterns that should be watched for changes.
     */
    function getWildcardDirectories(includes: string[], path: string, useCaseSensitiveFileNames: boolean) {
        // We watch a directory recursively if it contains a wildcard anywhere in a directory segment
        // of the pattern:
        //
        //  /a/b/**/d   - Watch /a/b recursively to catch changes to any d in any subfolder recursively
        //  /a/b/*/d    - Watch /a/b recursively to catch any d in any immediate subfolder, even if a new subfolder is added
        //
        // We watch a directory without recursion if it contains a wildcard in the file segment of
        // the pattern:
        //
        //  /a/b/*      - Watch /a/b directly to catch any new file
        //  /a/b/a?z    - Watch /a/b directly to catch any new file matching a?z
        const wildcardDirectories: Map<WatchDirectoryFlags> = {};
        if (includes !== undefined) {
            const recursiveKeys: string[] = [];
            for (const include of includes) {
                const name = combinePaths(path, include);
                const match = wildcardDirectoryPattern.exec(name);
                if (match) {
                    const key = useCaseSensitiveFileNames ? match[0] : match[0].toLowerCase();
                    const flags = watchRecursivePattern.test(name) ? WatchDirectoryFlags.Recursive : WatchDirectoryFlags.None;
                    const existingFlags = getProperty(wildcardDirectories, key);
                    if (existingFlags === undefined || existingFlags < flags) {
                        wildcardDirectories[key] = flags;
                        if (flags === WatchDirectoryFlags.Recursive) {
                            recursiveKeys.push(key);
                        }
                    }
                }
            }

            // Remove any subpaths under an existing recursively watched directory.
            for (const key in wildcardDirectories) {
                if (hasProperty(wildcardDirectories, key)) {
                    for (const recursiveKey in recursiveKeys) {
                        if (containsPath(recursiveKey, key, path, !useCaseSensitiveFileNames)) {
                            delete wildcardDirectories[key];
                        }
                    }
                }
            }
        }

        return wildcardDirectories;
    }

    /**
     * Determines whether a literal or wildcard file has already been included that has a higher
     * extension priority.
     *
     * @param file The path to the file.
     * @param extensionPriority The priority of the extension.
     * @param context The expansion context.
     */
    function hasFileWithHigherPriorityExtension(file: string, literalFiles: Map<string>, wildcardFiles: Map<string>, extensions: string[], keyMapper: (value: string) => string) {
        const extensionPriority = getExtensionPriority(file, extensions);
        const adjustedExtensionPriority = adjustExtensionPriority(extensionPriority);
        for (let i = ExtensionPriority.Highest; i < adjustedExtensionPriority; ++i) {
            const higherPriorityExtension = extensions[i];
            const higherPriorityPath = keyMapper(changeExtension(file, higherPriorityExtension));
            if (hasProperty(literalFiles, higherPriorityPath) || hasProperty(wildcardFiles, higherPriorityPath)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Removes files included via wildcard expansion with a lower extension priority that have
     * already been included.
     *
     * @param file The path to the file.
     * @param extensionPriority The priority of the extension.
     * @param context The expansion context.
     */
    function removeWildcardFilesWithLowerPriorityExtension(file: string, wildcardFiles: Map<string>, extensions: string[], keyMapper: (value: string) => string) {
        const extensionPriority = getExtensionPriority(file, extensions);
        const nextExtensionPriority = getNextLowestExtensionPriority(extensionPriority);
        for (let i = nextExtensionPriority; i < extensions.length; ++i) {
            const lowerPriorityExtension = extensions[i];
            const lowerPriorityPath = keyMapper(changeExtension(file, lowerPriorityExtension));
            delete wildcardFiles[lowerPriorityPath];
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
