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
            name: "declarationDir",
            type: "string",
            isFilePath: true,
            paramType: Diagnostics.DIRECTORY,
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
            name: "reactNamespace",
            type: "string",
            description: Diagnostics.Specify_the_object_invoked_for_createElement_and_spread_when_targeting_react_JSX_emit
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
            description: Diagnostics.Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "module",
            shortName: "m",
            type: {
                "none": ModuleKind.None,
                "commonjs": ModuleKind.CommonJS,
                "amd": ModuleKind.AMD,
                "system": ModuleKind.System,
                "umd": ModuleKind.UMD,
                "es6": ModuleKind.ES6,
                "es2015": ModuleKind.ES2015,
            },
            description: Diagnostics.Specify_module_code_generation_Colon_commonjs_amd_system_umd_or_es2015,
            paramType: Diagnostics.KIND,
            error: Diagnostics.Argument_for_module_option_must_be_commonjs_amd_system_umd_es2015_or_none
        },
        {
            name: "newLine",
            type: {
                "crlf": NewLineKind.CarriageReturnLineFeed,
                "lf": NewLineKind.LineFeed
            },
            description: Diagnostics.Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix,
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
            description: Diagnostics.Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir,
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
            description: Diagnostics.Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
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
            description: Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES2015,
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
                "classic": ModuleResolutionKind.Classic,
            },
            description: Diagnostics.Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6,
            paramType: Diagnostics.KIND,
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
            name: "baseUrl",
            type: "string",
            isFilePath: true,
            description: Diagnostics.Base_directory_to_resolve_non_absolute_module_names
        },
        {
            // this option can only be specified in tsconfig.json
            // use type = object to copy the value as-is
            name: "paths",
            type: "object",
            isTSConfigOnly: true
        },
        {
            // this option can only be specified in tsconfig.json
            // use type = object to copy the value as-is
            name: "rootDirs",
            type: "object",
            isTSConfigOnly: true,
            isFilePath: true
        },
        {
            name: "traceModuleResolution",
            type: "boolean",
            description: Diagnostics.Enable_tracing_of_the_module_resolution_process
        },
        {
            name: "allowJs",
            type: "boolean",
            description: Diagnostics.Allow_javascript_files_to_be_compiled
        },
        {
            name: "allowSyntheticDefaultImports",
            type: "boolean",
            description: Diagnostics.Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking
        },
        {
            name: "noImplicitUseStrict",
            type: "boolean",
            description: Diagnostics.Do_not_emit_use_strict_directives_in_module_output
        },
        {
            name: "lib",
            shortName: "l",
            type: {
                // JavaScript only
                "es5": "lib.es5.d.ts",
                "es6": "lib.es6.d.ts",
                "es7": "lib.es7.d.ts",
                // Host only
                "dom": "lib.dom.d.ts",
                "webworker": "lib.webworker.d.ts",
                "scripthost": "lib.scripthost.d.ts",
                // ES6 Or ESNext By-feature options
                "es6.array": "lib.es6.array.d.ts",
                "es6.collection": "lib.es6.collection.d.ts",
                "es6.generator": "lib.es6.generator.d.ts",
                "es6.function": "lib.es6.function.d.ts",
                "es6.iterable": "lib.es6.iterable.d.ts",
                "es6.math": "lib.es6.math.d.ts",
                "es6.number": "lib.es6.number.d.ts",
                "es6.object": "lib.es6.object.d.ts",
                "es6.promise": "lib.es6.promise.d.ts",
                "es6.proxy": "lib.es6.proxy.d.ts",
                "es6.reflect": "lib.es6.reflect.d.ts",
                "es6.regexp": "lib.es6.regexp.d.ts",
                "es6.string": "lib.es6.string.d.ts",
                "es6.symbol": "lib.es6.symbol.d.ts",
                "es6.symbol.wellknown": "lib.es6.symbol.wellknown.d.ts",
                "es7.array.include": "lib.es7.array.include.d.ts"
            },
            paramType: Diagnostics.LIBRARY,
            description: Diagnostics.Specify_library_to_be_included_in_the_compilation_Colon,
            error: Diagnostics.Arguments_for_library_option_must_be_Colon_0
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

    let libOptionNameArrayCache: string[];

    export function convertLibFlagTypeToLibOptionNameArray(): string[] {
        if (libOptionNameArrayCache) {
            return libOptionNameArrayCache;
        }
        const { optionNameMap } = getOptionNameMap();

        const libraryOpt = optionNameMap["lib"];
        const types = <Map<number>>libraryOpt.type;
        const typeNames: string[] = [];
        for (const name in types) {
            if (types.hasOwnProperty(name)) {
                typeNames.push(name);
            }
        }

        libOptionNameArrayCache = typeNames;
        return typeNames;
    }

    /**
     * 
     * @param argument
     * @param opt
     * @param errors
     */
    /* @internal */
    export function tryParseLibCommandLineFlag(argument: string, opt: CommandLineOption, errors: Diagnostic[]): string[] {
        // --library option can take multiple arguments.
        // i.e --library es5
        //     --library es5,es6.array  // Note: space is not allow between comma
        if (opt.paramType === Diagnostics.LIBRARY) {
            const libOptionFileNameMap = <Map<string>>opt.type;
            const libFileNames: string[] = [];
            const inputs = argument.split(",");
            for (const input of inputs) {
                // This is to make sure we are properly handle this cases:
                //  --library es5, es6 => argument is [es5,] when split with ",", it will be ["es5", ""]
                if (input !== "") {
                    const libraryOption = input.toLowerCase();
                    const libraryFileName = getProperty(libOptionFileNameMap, libraryOption);
                    if (libraryFileName) {
                        libFileNames.push(libraryFileName);
                    }
                    else {
                        errors.push(createCompilerDiagnostic((<CommandLineOptionOfCustomType>opt).error, convertLibFlagTypeToLibOptionNameArray()));
                        break;
                    }
                }
            }
            return libFileNames;
        }
        return undefined;
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
                let s = args[i];
                i++;
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

                        if (opt.isTSConfigOnly) {
                            errors.push(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file, opt.name));
                        }
                        else {
                            // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
                            if (!args[i] && opt.type !== "boolean") {
                                errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_expects_an_argument, opt.name));
                            }

                            switch (opt.type) {
                                case "number":
                                    options[opt.name] = parseInt(args[i]);
                                    i++;
                                    break;
                                case "boolean":
                                    options[opt.name] = true;
                                    break;
                                case "string":
                                    options[opt.name] = args[i] || "";
                                    i++;
                                    break;
                                // If not a primitive, the possible types are specified in what is effectively a map of options.
                                default:
                                    const map = <Map<number>>opt.type;
                                    let key = (args[i] || "").toLowerCase();
                                    i++;
                                    // If the current option is '--library' which specifies library files to be include in the compilation
                                    let libOptions = tryParseLibCommandLineFlag(key, opt, errors);
                                    if (libOptions) {
                                        if (!options[opt.name]) {
                                            options[opt.name] = [];
                                        }
                                        (<string[]>options[opt.name]).push(...libOptions);
                                    }
                                    else if (!libOptions && hasProperty(map, key)) {
                                        options[opt.name] = map[key];
                                    }
                                    else {
                                        errors.push(createCompilerDiagnostic((<CommandLineOptionOfCustomType>opt).error));
                                    }
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
    export function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions: CompilerOptions = {}, configFileName?: string): ParsedCommandLine {
        const { options: optionsFromJsonConfigFile, errors } = convertCompilerOptionsFromJson(json["compilerOptions"], basePath, configFileName);

        const options = extend(existingOptions, optionsFromJsonConfigFile);

        return {
            options,
            fileNames: getFileNames(),
            typingOptions: getTypingOptions(),
            errors
        };

        function getFileNames(): string[] {
            let fileNames: string[] = [];
            if (hasProperty(json, "files")) {
                if (json["files"] instanceof Array) {
                    fileNames = map(<string[]>json["files"], s => combinePaths(basePath, s));
                }
                else {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "files", "Array"));
                }
            }
            else {
                const filesSeen: Map<boolean> = {};

                let exclude: string[] = [];
                if (json["exclude"] instanceof Array) {
                    exclude = json["exclude"];
                }
                else {
                    // by default exclude node_modules, and any specificied output directory
                    exclude = ["node_modules"];
                    const outDir = json["compilerOptions"] && json["compilerOptions"]["outDir"];
                    if (outDir) {
                        exclude.push(outDir);
                    }
                }
                exclude = map(exclude, normalizeSlashes);

                const supportedExtensions = getSupportedExtensions(options);
                Debug.assert(indexOf(supportedExtensions, ".ts") < indexOf(supportedExtensions, ".d.ts"), "Changed priority of extensions to pick");

                // Get files of supported extensions in their order of resolution
                for (const extension of supportedExtensions) {
                    const filesInDirWithExtension = host.readDirectory(basePath, extension, exclude);
                    for (const fileName of filesInDirWithExtension) {
                        // .ts extension would read the .d.ts extension files too but since .d.ts is lower priority extension,
                        // lets pick them when its turn comes up
                        if (extension === ".ts" && fileExtensionIs(fileName, ".d.ts")) {
                            continue;
                        }

                        // Skip over any minified JavaScript files (ending in ".min.js")
                        if (/\.min\.js$/.test(fileName)) {
                            continue;
                        }

                        // If this is one of the output extension (which would be .d.ts and .js if we are allowing compilation of js files)
                        // do not include this file if we included .ts or .tsx file with same base name as it could be output of the earlier compilation
                        if (extension === ".d.ts" || (options.allowJs && contains(supportedJavascriptExtensions, extension))) {
                            const baseName = fileName.substr(0, fileName.length - extension.length);
                            if (hasProperty(filesSeen, baseName + ".ts") || hasProperty(filesSeen, baseName + ".tsx")) {
                                continue;
                            }
                        }

                        filesSeen[fileName] = true;
                        fileNames.push(fileName);
                    }
                }
            }
            return fileNames;
        }

        function getTypingOptions(): TypingOptions {
            const options: TypingOptions = getBaseFileName(configFileName) === "jsconfig.json"
                ? { enableAutoDiscovery: true, include: [], exclude: [] }
                : { enableAutoDiscovery: false, include: [], exclude: [] };
            const jsonTypingOptions = json["typingOptions"];
            if (jsonTypingOptions) {
                for (const id in jsonTypingOptions) {
                    if (id === "enableAutoDiscovery") {
                        if (typeof jsonTypingOptions[id] === "boolean") {
                            options.enableAutoDiscovery = jsonTypingOptions[id];
                        }
                        else {
                            errors.push(createCompilerDiagnostic(Diagnostics.Unknown_typing_option_0, id));
                        }
                    }
                    else if (id === "include") {
                        options.include = convertJsonOptionToStringArray(id, jsonTypingOptions[id], errors);
                    }
                    else if (id === "exclude") {
                        options.exclude = convertJsonOptionToStringArray(id, jsonTypingOptions[id], errors);
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_typing_option_0, id));
                    }
                }
            }
            return options;
        }
    }

    export function convertCompilerOptionsFromJson(jsonOptions: any, basePath: string, configFileName?: string): { options: CompilerOptions, errors: Diagnostic[] } {
        const options: CompilerOptions = {};
        const errors: Diagnostic[] = [];

        if (configFileName && getBaseFileName(configFileName) === "jsconfig.json") {
            options.allowJs = true;
        }

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
                        switch (typeof value) {
                            case "string":
                                value = normalizePath(combinePaths(basePath, value));
                                break;
                            case "object":
                                // "object" options with 'isFilePath' = true expected to be string arrays
                                value = convertJsonOptionToStringArray(opt.name, value, errors, (element) => normalizePath(combinePaths(basePath, element)));
                                break;
                        }
                        if (value === "") {
                            value = ".";
                        }
                    }
                    const libOptions = tryParseLibCommandLineFlag(value, opt, errors);
                    if (libOptions) {
                        if (!options[opt.name]) {
                            options[opt.name] = [];
                        }
                        (<string[]>options[opt.name]).concat(...libOptions);
                    }
                    else {
                        options[opt.name] = value;
                    }
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

    function convertJsonOptionToStringArray(optionName: string, optionJson: any, errors: Diagnostic[], func?: (element: string) => string): string[] {
        const items: string[] = [];
        let invalidOptionType = false;
        if (!isArray(optionJson)) {
            invalidOptionType = true;
        }
        else {
            for (const element of <any[]>optionJson) {
                if (typeof element === "string") {
                    const item = func ? func(element) : element;
                    items.push(item);
                }
                else {
                    invalidOptionType = true;
                    break;
                }
            }
        }
        if (invalidOptionType) {
            errors.push(createCompilerDiagnostic(Diagnostics.Option_0_should_have_array_of_strings_as_a_value, optionName));
        }
        return items;
    }
}
