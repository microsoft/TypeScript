/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>

module ts {
    /* @internal */
    export var optionDeclarations: CommandLineOption[] = [
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
            name: "inlineSourceMap",
            type: "boolean",
        },
        {
            name: "inlineSources",
            type: "boolean",
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
            },
            description: Diagnostics.Specify_module_code_generation_Colon_commonjs_amd_system_or_umd,
            paramType: Diagnostics.KIND,
            error: Diagnostics.Argument_for_module_option_must_be_commonjs_amd_system_or_umd
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
            description: Diagnostics.Do_not_emit_outputs_if_any_type_checking_errors_were_reported,
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
            name: "out",
            type: "string",
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
            type: { "es3": ScriptTarget.ES3, "es5": ScriptTarget.ES5, "es6": ScriptTarget.ES6 },
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
        }
    ];

    export function parseCommandLine(commandLine: string[]): ParsedCommandLine {
        var options: CompilerOptions = {};
        var fileNames: string[] = [];
        var errors: Diagnostic[] = [];
        var shortOptionNames: Map<string> = {};
        var optionNameMap: Map<CommandLineOption> = {};

        forEach(optionDeclarations, option => {
            optionNameMap[option.name.toLowerCase()] = option;
            if (option.shortName) {
                shortOptionNames[option.shortName] = option.name;
            }
        });
        parseStrings(commandLine);
        return {
            options,
            fileNames,
            errors
        };

        function parseStrings(args: string[]) {
            var i = 0;
            while (i < args.length) {
                var s = args[i++];
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
                        var opt = optionNameMap[s];

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
                                var map = <Map<number>>opt.type;
                                var key = (args[i++] || "").toLowerCase();
                                if (hasProperty(map, key)) {
                                    options[opt.name] = map[key];
                                }
                                else {
                                    errors.push(createCompilerDiagnostic(opt.error));
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
            var text = sys.readFile(fileName);

            if (!text) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_0_not_found, fileName));
                return;
            }

            var args: string[] = [];
            var pos = 0;
            while (true) {
                while (pos < text.length && text.charCodeAt(pos) <= CharacterCodes.space) pos++;
                if (pos >= text.length) break;
                var start = pos;
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
    export function readConfigFile(fileName: string): { config?: any; error?: Diagnostic }  {
        try {
            var text = sys.readFile(fileName);
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message) };
        }
        return parseConfigFileText(fileName, text);
    }

    /**
      * Parse the text of the tsconfig.json file
      * @param fileName The path to the config file
      * @param jsonText The text of the config file
      */
    export function parseConfigFileText(fileName: string, jsonText: string): { config?: any; error?: Diagnostic } {
        try {
            return { config: /\S/.test(jsonText) ? JSON.parse(jsonText) : {} };
        }
        catch (e) {
            return { error: createCompilerDiagnostic(Diagnostics.Failed_to_parse_file_0_Colon_1, fileName, e.message) };
        }
    }

    /**
      * Parse the contents of a config file (tsconfig.json).
      * @param json The contents of the config file to parse
      * @param basePath A root directory to resolve relative path entries in the config
      *    file to. e.g. outDir 
      */
    export function parseConfigFile(json: any, host: ParseConfigHost, basePath: string): ParsedCommandLine {
        var errors: Diagnostic[] = [];

        return {
            options: getCompilerOptions(),
            fileNames: getFiles(),
            errors
        };

        function getCompilerOptions(): CompilerOptions {
            var options: CompilerOptions = {};
            var optionNameMap: Map<CommandLineOption> = {};
            forEach(optionDeclarations, option => {
                optionNameMap[option.name] = option;
            });
            var jsonOptions = json["compilerOptions"];
            if (jsonOptions) {
                for (var id in jsonOptions) {
                    if (hasProperty(optionNameMap, id)) {
                        var opt = optionNameMap[id];
                        var optType = opt.type;
                        var value = jsonOptions[id];
                        var expectedType = typeof optType === "string" ? optType : "string";
                        if (typeof value === expectedType) {
                            if (typeof optType !== "string") {
                                var key = value.toLowerCase();
                                if (hasProperty(optType, key)) {
                                    value = optType[key];
                                }
                                else {
                                    errors.push(createCompilerDiagnostic(opt.error));
                                    value = 0;
                                }
                            }
                            if (opt.isFilePath) {
                                value = normalizePath(combinePaths(basePath, value));
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
            }
            return options;
        }

        function getFiles(): string[] {
            var files: string[] = [];
            if (hasProperty(json, "files")) {
                if (json["files"] instanceof Array) {
                    var files = map(<string[]>json["files"], s => combinePaths(basePath, s));
                }
            }
            else {
                var sysFiles = host.readDirectory(basePath, ".ts");
                for (var i = 0; i < sysFiles.length; i++) {
                    var name = sysFiles[i];
                    if (!fileExtensionIs(name, ".d.ts") || !contains(sysFiles, name.substr(0, name.length - 5) + ".ts")) {
                        files.push(name);
                    }
                }
            }
            return files;
        }
    }
}
