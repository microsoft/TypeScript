/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
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
            description: Diagnostics.Specify_module_code_generation_Colon_commonjs_amd_system_umd_or_es6,
            paramType: Diagnostics.KIND,
            error: Diagnostics.Argument_for_module_option_must_be_commonjs_amd_system_umd_or_es6
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
            description: Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES6_experimental,
            paramType: Diagnostics.VERSION,
            error: Diagnostics.Argument_for_target_option_must_be_ES3_ES5_or_ES6
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
            name: "allowJs",
            type: "boolean",
            description: Diagnostics.Allow_javascript_files_to_be_compiled,
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

        let optionNameMap: Map<CommandLineOption> = {};
        let shortOptionNames: Map<string> = {};
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
        let options: CompilerOptions = {};
        let fileNames: string[] = [];
        let errors: Diagnostic[] = [];
        let { optionNameMap, shortOptionNames } = getOptionNameMap();

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
                        let opt = optionNameMap[s];

                        if (opt.type === "boolean") {
                            // This needs to be treated specially since it doesnt accept argument
                            options[opt.name] = true;
                        }
                        else {
                            // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
                            if (!args[i]) {
                                errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_expects_an_argument, opt.name));
                            }

                            let { hasError, value} = parseOption(opt, args[i++], options[opt.name]);
                            if (hasError) {
                                errors.push(createCompilerDiagnostic((<CommandLineOptionOfCustomType>opt).error));
                            }
                            else {
                                options[opt.name] = value;
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
            let text = readFile ? readFile(fileName) : sys.readFile(fileName);

            if (!text) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_0_not_found, fileName));
                return;
            }

            let args: string[] = [];
            let pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= CharacterCodes.space) pos++;
                if (pos >= text.length) break;
                let start = pos;
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
     * Parses non quoted strings separated by comma e.g. "a,b" would result in string array ["a", "b"]
     * @param s
     * @param existingValue
     */
    function parseMultiValueStringArray(s: string, existingValue: string[]) {
        let value: string[] = existingValue || [];
        let hasError = false;
        let currentString = "";
        if (s) {
            for (let i = 0; i < s.length; i++) {
                let ch = s.charCodeAt(i);
                if (ch === CharacterCodes.comma) {
                    pushCurrentStringToResult();
                }
                else {
                    currentString += s.charAt(i);
                }
            }
            // push last string
            pushCurrentStringToResult();
        }
        return { value, hasError };

        function pushCurrentStringToResult() {
            if (currentString) {
                value.push(currentString);
                currentString = "";
            }
            else {
                hasError = true;
            }
        }
    }

    /* @internal */
    export function parseOption(option: CommandLineOption, stringValue: string, existingValue: CompilerOptionsValueType) {
        let hasError: boolean;
        let value: CompilerOptionsValueType;
        switch (option.type) {
            case "number":
                value = parseInt(stringValue);
                break;
            case "string":
                value = stringValue || "";
                break;
            case "string[]":
                return parseMultiValueStringArray(stringValue, <string[]>existingValue);
            // If not a primitive, the possible types are specified in what is effectively a map of options.
            default:
                let map = <Map<number>>option.type;
                let key = (stringValue || "").toLowerCase();
                if (hasProperty(map, key)) {
                    value = map[key];
                }
                else {
                    hasError = true;
                }
        }
        return { hasError, value };
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
            return { config: /\S/.test(jsonText) ? JSON.parse(jsonText) : {} };
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Failed_to_parse_file_0_Colon_1, fileName, e.message) };
        }
    }

    /* @internal */
    export function parseJsonCompilerOption(opt: CommandLineOption, jsonValue: any, errors: Diagnostic[]) {
        let optType = opt.type;
        let expectedType = typeof optType === "string" ? optType : "string";
        let hasValidValue = true;
        if (typeof jsonValue === expectedType) {
            if (typeof optType !== "string") {
                let key = jsonValue.toLowerCase();
                if (hasProperty(optType, key)) {
                    jsonValue = optType[key];
                }
                else {
                    errors.push(createCompilerDiagnostic((<CommandLineOptionOfCustomType>opt).error));
                    jsonValue = 0;
                }
            }
        }
        // Check if the value asked was string[] and value provided was not string[]
        else if (expectedType !== "string[]" ||
            !(jsonValue instanceof Array) ||
            forEach(<string[]>jsonValue, individualValue => typeof individualValue !== "string")) {
            // Not expectedType
            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, expectedType));
            hasValidValue = false;
        }

        return {
            value: <CompilerOptionsValueType>jsonValue,
            hasValidValue
        };
    }

    /**
      * Parse the contents of a config file (tsconfig.json).
      * @param json The contents of the config file to parse
      * @param basePath A root directory to resolve relative path entries in the config
      *    file to. e.g. outDir
      * @param existingOptions optional existing options to extend into
      */
    export function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions: CompilerOptions = {}): ParsedCommandLine {
        let errors: Diagnostic[] = [];

        let options = getCompilerOptions(existingOptions);
        return {
            options,
            fileNames: getFileNames(),
            errors
        };

        function getCompilerOptions(existingOptions: CompilerOptions): CompilerOptions {
            let options: CompilerOptions = {};
            let optionNameMap: Map<CommandLineOption> = {};
            forEach(optionDeclarations, option => {
                optionNameMap[option.name] = option;
            });
            let jsonOptions = json["compilerOptions"];
            if (jsonOptions) {
                for (let id in jsonOptions) {
                    if (hasProperty(optionNameMap, id)) {
                        let opt = optionNameMap[id];
                        let { hasValidValue, value } = parseJsonCompilerOption(opt, jsonOptions[id], errors);
                        if (hasValidValue) {
                            if (opt.isFilePath) {
                                value = normalizePath(combinePaths(basePath, <string>value));
                                if (value === "") {
                                    value = ".";
                                }
                            }
                            options[opt.name] = value;
                        }
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_compiler_option_0, id));
                    }
                }
            }
            return extend(existingOptions, options);
        }

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
                let filesSeen: Map<boolean> = {};
                let exclude = json["exclude"] instanceof Array ? map(<string[]>json["exclude"], normalizeSlashes) : undefined;
                let extensionsByPriority = getSupportedExtensions(options);
                for (let extensionsIndex = 0; extensionsIndex < extensionsByPriority.length; extensionsIndex++) {
                    let currentExtension = extensionsByPriority[extensionsIndex];
                    let filesInDirWithExtension = host.readDirectory(basePath, currentExtension, exclude);
                    // Get list of conflicting extensions, conflicting extension is
                    // - extension that is lower priority than current extension and 
                    // - extension also is current extension (ends with "." + currentExtension)
                    let conflictingExtensions: string[] = [];
                    for (let i = extensionsIndex + 1; i < extensionsByPriority.length; i++) {
                        let extension = extensionsByPriority[i]; // lower priority extension
                        if (fileExtensionIs(extension, currentExtension)) { // also has current extension
                            conflictingExtensions.push(extension);
                        }
                    }

                    // Add the files to fileNames list if the file is not any of conflicting extension
                    for (const fileName of filesInDirWithExtension) {
                        let hasConflictingExtension = false;
                        for (const conflictingExtension of conflictingExtensions) {
                            // eg. 'f.d.ts' will match '.ts' extension but really should be process later with '.d.ts' files
                            if (fileExtensionIs(fileName, conflictingExtension)) {
                                hasConflictingExtension = true;
                                break;
                            }
                        }

                        if (!hasConflictingExtension) {
                            // Add the file only if there is no higher priority extension file already included
                            // eg. when a.d.ts and a.js are present in the folder, include only a.d.ts not a.js
                            const baseName = fileName.substr(0, fileName.length - currentExtension.length - 1);
                            if (!hasProperty(filesSeen, baseName)) {
                                filesSeen[baseName] = true;
                                fileNames.push(fileName);
                            }
                        }
                    }
                }
            }
            return fileNames;
        }
    }
}
