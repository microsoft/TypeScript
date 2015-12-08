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

    // Simplified whitelist, forces escaping of any non-word (or digit), non-whitespace character.
    const reservedCharacterPattern = /[^\w\s]/g;

    const enum ExpansionState {
        Ok,
        Error
    }

    interface ExpansionContext {
        /** A pattern used to exclude a file specification.  */
        excludePattern: RegExp;
        /** Compiler options. */
        options: CompilerOptions;
        /** The host used to resolve files and directories. */
        host: ParseConfigHost;
        /** Errors to report. */
        errors: Diagnostic[];
        /** The set of literal files. */
        literalFiles: FileMap<Path>;
        /** The set of files matching a wildcard. */
        wildcardFiles: FileMap<Path>;
        /** Directories to be watched. */
        wildcardDirectories: FileMap<WatchDirectoryFlags>;
        /** Supported extensions. */
        supportedExtensions: string[];
        /**
         * Path cache, used to reduce calls to the file system. `true` indicates a file exists,
         * `false` indicates a file or directory does not exist. A DirectoryResult
         * indicates the file and subdirectory names in a directory. */
        cache: FileMap<boolean | DirectoryResult>;
    }

    const enum FileSystemEntryKind {
        File,
        Directory
    }

    interface DirectoryResult {
        files?: string[];
        directories?: string[];
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
    export function expandFiles(fileNames: string[], includeSpecs: string[], excludeSpecs: string[], basePath: string, options: CompilerOptions, host: ParseConfigHost, errors?: Diagnostic[]): ExpandResult {
        basePath = normalizePath(basePath);
        basePath = removeTrailingDirectorySeparator(basePath);

        // The exclude spec list is converted into a regular expression, which allows us to quickly
        // test whether a file or directory should be excluded before recursively traversing the
        // file system.
        const excludePattern = includeSpecs ? createExcludeRegularExpression(excludeSpecs, basePath, options, host, errors) : undefined;
        const keyMapper = host.useCaseSensitiveFileNames ? caseSensitiveKeyMapper : caseInsensitiveKeyMapper;

        // Literal file names (provided via the "files" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map later when when including
        // wildcard paths.
        const literalFiles = createFileMap<Path>(keyMapper);

        // Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
        // file map with a possibly case insensitive key. We use this map to store paths matched
        // via wildcard, and to handle extension priority.
        const wildcardFiles = createFileMap<Path>(keyMapper);

        // Wildcard directories (provided as part of a wildcard path) are stored in a
        // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
        // or a recursive directory. This information is used by filesystem watchers to monitor for
        // new entries in these paths.
        const wildcardDirectories = createFileMap<WatchDirectoryFlags>(keyMapper);

        // To reduce the overhead of disk I/O (and marshalling to managed code when hosted in
        // Visual Studio), file system queries are cached during the expansion session.
        // If present, a cache entry can be one of three values:
        // - A `false` value indicates the file or directory did not exist.
        // - A `true` value indicates the path is a file and it exists.
        // - An object value indicates the path is a directory and exists. The object may have
        //   zero, one, or both of the following properties:
        //   - A "files" array, which contains the file names in the directory.
        //   - A "directories" array, which contains the subdirectory names in the directory.
        const cache = createFileMap<boolean | DirectoryResult>(keyMapper);

        // Rather than requery this for each file and filespec, we query the supported extensions
        // once and store it on the expansion context.
        const supportedExtensions = getSupportedExtensions(options);

        // The expansion context holds references to shared information for the various expansion
        // operations to reduce the overhead of closures.
        const context: ExpansionContext = {
            options,
            host,
            errors,
            excludePattern,
            literalFiles,
            wildcardFiles,
            wildcardDirectories,
            supportedExtensions,
            cache
        };

        // Literal files are always included verbatim. An "include" or "exclude" specification cannot
        // remove a literal file.
        if (fileNames) {
            for (const fileName of fileNames) {
                const path = toPath(fileName, basePath, caseSensitiveKeyMapper);
                if (!literalFiles.contains(path)) {
                    literalFiles.set(path, path);
                }
            }
        }

        // Each "include" specification is expanded and matching files are added.
        if (includeSpecs) {
            for (let includeSpec of includeSpecs) {
                includeSpec = normalizePath(includeSpec);
                includeSpec = removeTrailingDirectorySeparator(includeSpec);
                expandFileSpec(includeSpec, <Path>basePath, 0, context);
            }
        }

        return {
            fileNames: wildcardFiles.reduce(addFileToOutput, literalFiles.reduce(addFileToOutput, [])),
            wildcardDirectories: wildcardDirectories.reduce<Map<WatchDirectoryFlags>>(addDirectoryToOutput, {}),
        };
    }

    /**
     * Expands a file specification with wildcards.
     *
     * @param fileSpec The original file specification.
     * @param basePath The directory to expand. This path must exist.
     * @param start The starting offset in the file specification.
     * @param context The expansion context.
     * @param isExpandingRecursiveDirectory A value indicating whether the file specification includes a recursive directory wildcard prior to the start of this segment.
     */
    function expandFileSpec(fileSpec: string, basePath: Path, start: number, context: ExpansionContext, isExpandingRecursiveDirectory?: boolean): ExpansionState {
        // A file specification must always point to a file. As a result, we always assume the
        // path segment following the last directory separator points to a file. The only
        // exception is when the final path segment is the recursive directory pattern "**", in
        // which case we report an error.
        const { host, options, errors, wildcardFiles, wildcardDirectories, excludePattern, cache, supportedExtensions } = context;

        // Skip expansion if the base path matches an exclude pattern.
        if (isExcludedPath(basePath, excludePattern)) {
            return ExpansionState.Ok;
        }

        // Find the offset of the next wildcard in the file specification. If there are no more
        // wildcards, we can include the file if it exists and isn't excluded.
        let offset = indexOfWildcard(fileSpec, start);
        if (offset < 0) {
            const path = toPath(fileSpec.substring(start), basePath, caseSensitiveKeyMapper);
            if (!isExcludedPath(path, excludePattern) && pathExists(path, FileSystemEntryKind.File, context)) {
                includeFile(path, context, /*wildcardHasExtension*/ true);
            }

            return ExpansionState.Ok;
        }

        // Find the last directory separator before the wildcard to get the leading path.
        offset = fileSpec.lastIndexOf(directorySeparator, offset);
        if (offset > start) {
            // The wildcard occurs in a later segment, include remaining path up to
            // wildcard in prefix.
            basePath = toPath(fileSpec.substring(start, offset), basePath, caseSensitiveKeyMapper);

            // Skip this wildcard path if the base path now matches an exclude pattern.
            if (isExcludedPath(basePath, excludePattern) || !pathExists(basePath, FileSystemEntryKind.Directory, context)) {
                return ExpansionState.Ok;
            }

            start = offset + 1;
        }

        // Find the offset of the next directory separator to extract the wildcard path segment.
        offset = getEndOfPathSegment(fileSpec, start);

        // Check if the current offset is the beginning of a recursive directory pattern.
        if (isRecursiveDirectoryWildcard(fileSpec, start, offset)) {
            // Stop expansion if a file specification contains more than one recursive directory pattern.
            if (isExpandingRecursiveDirectory) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, fileSpec));
                }

                return ExpansionState.Error;
            }

            if (offset >= fileSpec.length) {
                // If there is no file specification following the recursive directory pattern
                // then we report an error as we cannot match any files.
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, fileSpec));
                }

                return ExpansionState.Error;
            }

            // Keep track of the recursive wildcard directory
            wildcardDirectories.set(basePath, WatchDirectoryFlags.Recursive);

            // Expand the recursive directory pattern.
            return expandRecursiveDirectory(fileSpec, basePath, offset + 1, context);
        }

        if (!isExpandingRecursiveDirectory) {
            wildcardDirectories.set(basePath, WatchDirectoryFlags.None);
        }

        // Match the entries in the directory against the wildcard pattern.
        const pattern = createRegularExpressionFromWildcard(fileSpec, start, offset, host);

        // If there are no more directory separators (the offset is at the end of the file specification), then
        // this must be a file.
        if (offset >= fileSpec.length) {
            const wildcardHasExtension = fileSegmentHasExtension(fileSpec, start);
            const fileNames = readDirectory(basePath, FileSystemEntryKind.File, context);
            for (const fileName of fileNames) {
                // Skip the file if it doesn't match the pattern.
                if (!pattern.test(fileName)) {
                    continue;
                }

                const path = toPath(fileName, basePath, caseSensitiveKeyMapper);

                // If we have excluded this path, we should skip the file.
                if (isExcludedPath(path, excludePattern)) {
                    continue;
                }

                // This wildcard has no further directory to process, so include the file.
                includeFile(path, context, wildcardHasExtension);
            }
        }
        else {
            const directoryNames = readDirectory(basePath, FileSystemEntryKind.Directory, context);
            for (const directoryName of directoryNames) {
                if (pattern.test(directoryName)) {
                    const newBasePath = toPath(directoryName, basePath, caseSensitiveKeyMapper);

                    // Expand the entries in this directory.
                    if (expandFileSpec(fileSpec, newBasePath, offset + 1, context, isExpandingRecursiveDirectory) === ExpansionState.Error) {
                        return ExpansionState.Error;
                    }
                }
            }
        }

        return ExpansionState.Ok;
    }

    /**
     * Expands a `**` recursive directory wildcard.
     *
     * @param fileSpec The original file specification.
     * @param basePath The directory to recursively expand.
     * @param start The starting offset in the file specification.
     * @param context The expansion context.
     */
    function expandRecursiveDirectory(fileSpec: string, basePath: Path, start: number, context: ExpansionContext): ExpansionState {
        // Skip the directory if it is excluded.
        if (isExcludedPath(basePath, context.excludePattern)) {
            return ExpansionState.Ok;
        }

        // Expand the non-recursive part of the file specification against the prefix path.
        if (expandFileSpec(fileSpec, basePath, start, context, /*isExpandingRecursiveDirectory*/ true) === ExpansionState.Error) {
            return ExpansionState.Error;
        }

        // Recursively expand each subdirectory.
        const directoryNames = readDirectory(basePath, FileSystemEntryKind.Directory, context);
        for (const directoryName of directoryNames) {
            const newBasePath = toPath(directoryName, basePath, caseSensitiveKeyMapper);
            if (expandRecursiveDirectory(fileSpec, newBasePath, start, context) === ExpansionState.Error) {
                return ExpansionState.Error;
            }
        }

        return ExpansionState.Ok;
    }

    /**
     * Attempts to include a file in a file set.
     *
     * @param file The file to include.
     * @param context The expansion context.
     * @param wildcardHasExtension A value indicating whether the wildcard supplied an explicit extension.
     */
    function includeFile(file: Path, context: ExpansionContext, wildcardHasExtension: boolean): void {
        const { options, literalFiles, wildcardFiles, excludePattern, supportedExtensions } = context;

        // Ignore the file if it does not have a supported extension.
        if ((!wildcardHasExtension || !options.allowNonTsExtensions) && !isSupportedSourceFileName(file, options)) {
            return;
        }

        // If we have already included a literal or wildcard path with a
        // higher priority extension, we should skip this file.
        //
        // This handles cases where we may encounter both <file>.ts and
        // <file>.d.ts (or <file>.js if "allowJs" is enabled) in the same
        // directory when they are compilation outputs.
        const extensionPriority = getExtensionPriority(file, supportedExtensions);
        if (hasFileWithHigherPriorityExtension(file, extensionPriority, context)) {
            return;
        }

        // We may have included a wildcard path with a lower priority
        // extension due to the user-defined order of entries in the
        // "include" array. If there is a lower priority extension in the
        // same directory, we should remove it.
        removeWildcardFilesWithLowerPriorityExtension(file, extensionPriority, context);

        if (!literalFiles.contains(file) && !wildcardFiles.contains(file)) {
            wildcardFiles.set(file, file);
        }
    }

    /**
     * Tests whether a path exists and is a specific kind of item. Results are
     * cached for performance.
     *
     * @param path The path to tests.
     * @param kind The kind of file system entry to find.
     * @param context The expansion context.
     */
    function pathExists(path: Path, kind: FileSystemEntryKind, context: ExpansionContext) {
        const { cache, host } = context;
        const entry = cache.get(path);
        if (entry === false) {
            // If the entry is strictly `false` then the path doesn`t exist, regardless of its kind.
            return false;
        }
        else if (entry === true) {
            // If the entry is strictly `true` then a file exists at this path.
            return kind === FileSystemEntryKind.File;
        }
        else if (typeof entry === "object") {
            // If the entry is an object, then a directory exists at this path.
            return kind === FileSystemEntryKind.Directory;
        }
        else {
            // The entry does not exist in the cache, so we need to check the host.
            if (kind === FileSystemEntryKind.File) {
                const result = host.fileExists(path);
                cache.set(path, result);
                return result;
            }
            else if (kind === FileSystemEntryKind.Directory) {
                const result = host.directoryExists(path);
                cache.set(path, result ? {} : false);
                return result;
            }
        }

        return false;
    }

    /**
     * Reads the contents of a directory for a specific kind of item. Results are
     * cached for performance.
     *
     * @param basePath The path to the directory. The path must already exist.
     * @param kind The kind of file system entry to find.
     * @param context The expansion context.
     */
    function readDirectory(basePath: Path, kind: FileSystemEntryKind, context: ExpansionContext) {
        const { cache, host } = context;

        let entry = cache.get(basePath);
        if (entry === undefined) {
            entry = {};
            cache.set(basePath, entry);
        }

        if (typeof entry === "object") {
            if (kind === FileSystemEntryKind.File) {
                if (entry.files === undefined) {
                    entry.files = host.readFileNames(basePath);
                }

                return entry.files;
            }
            else if (kind === FileSystemEntryKind.Directory) {
                if (entry.directories === undefined) {
                    entry.directories = host.readDirectoryNames(basePath);
                }

                return entry.directories;
            }
        }

        return [];
    }

    /**
     * Determines whether a literal or wildcard file has already been included that has a higher
     * extension priority.
     *
     * @param file The path to the file.
     * @param extensionPriority The priority of the extension.
     * @param context The expansion context.
     */
    function hasFileWithHigherPriorityExtension(file: Path, extensionPriority: ExtensionPriority, context: ExpansionContext) {
        const { literalFiles, wildcardFiles, supportedExtensions } = context;
        const adjustedExtensionPriority = adjustExtensionPriority(extensionPriority);
        for (let i = ExtensionPriority.Highest; i < adjustedExtensionPriority; ++i) {
            const higherPriorityExtension = supportedExtensions[i];
            const higherPriorityPath = changeExtension(file, higherPriorityExtension);
            if (literalFiles.contains(higherPriorityPath) || wildcardFiles.contains(higherPriorityPath)) {
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
    function removeWildcardFilesWithLowerPriorityExtension(file: Path, extensionPriority: ExtensionPriority, context: ExpansionContext) {
        const { wildcardFiles, supportedExtensions } = context;
        const nextExtensionPriority = getNextLowestExtensionPriority(extensionPriority);
        for (let i = nextExtensionPriority; i < supportedExtensions.length; ++i) {
            const lowerPriorityExtension = supportedExtensions[i];
            const lowerPriorityPath = changeExtension(file, lowerPriorityExtension);
            wildcardFiles.remove(lowerPriorityPath);
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
     * Adds a watched directory to an output map.
     *
     * @param output The output map.
     * @param flags The directory flags.
     * @param directory The directory path.
     */
    function addDirectoryToOutput(output: Map<WatchDirectoryFlags>, flags: WatchDirectoryFlags, directory: string) {
        output[directory] = flags;
        return output;
    }

    /**
     * Determines whether a path should be excluded.
     *
     * @param path The path to test for exclusion.
     * @param excludePattern A pattern used to exclude a file specification.
     */
    function isExcludedPath(path: string, excludePattern: RegExp) {
        return excludePattern ? excludePattern.test(path) : false;
    }

    /**
     * Determines whether a file segment contains a valid extension.
     *
     * @param fileSpec The file specification.
     * @param segmentStart The offset to the start of the file segment in the specification.
     */
    function fileSegmentHasExtension(fileSpec: string, segmentStart: number) {
        // if the final path segment does not have a . token, the file does not have an extension.
        if (fileSpec.indexOf(".", segmentStart) === -1) {
            return false;
        }

        // if the extension for the final path segment is (".*"), then the file does not have an extension.
        if (fileExtensionIs(fileSpec, ".*")) {
            return false;
        }

        return true;
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
                // Escape and append the non-wildcard portion to the regular expression.
                pattern += escapeRegularExpressionText(fileSpec, start, offset);
            }

            const charCode = fileSpec.charCodeAt(offset);
            if (charCode === CharacterCodes.asterisk) {
                // Append a multi-character (zero or more characters) pattern to the regular expression.
                pattern += "[^/]*?";
            }
            else if (charCode === CharacterCodes.question) {
                // Append a single-character pattern to the regular expression.
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
    function indexOfWildcard(fileSpec: string, start: number, end: number = fileSpec.length): number {
        for (let i = start; i < end; ++i) {
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
