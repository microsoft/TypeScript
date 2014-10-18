/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>

module ts {
    export var optionDeclarations: CommandLineOption[] = [
        {
            name: "charset",
            type: "string",
        },
        {
            name: "codepage",
            type: "number",
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
            name: "locale",
            type: "string",
        },
        {
            name: "mapRoot",
            type: "string",
            description: Diagnostics.Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "module",
            shortName: "m",
            type: {
                "commonjs": ModuleKind.CommonJS,
                "amd": ModuleKind.AMD
            },
            description: Diagnostics.Specify_module_code_generation_Colon_commonjs_or_amd,
            paramType: Diagnostics.KIND,
            error: Diagnostics.Argument_for_module_option_must_be_commonjs_or_amd
        },
        {
            name: "noImplicitAny",
            type: "boolean",
            description: Diagnostics.Warn_on_expressions_and_declarations_with_an_implied_any_type,
        },
        {
            name: "noLib",
            type: "boolean",
        },
        {
            name: "noLibCheck",
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
            description: Diagnostics.Redirect_output_structure_to_the_directory,
            paramType: Diagnostics.DIRECTORY,
        },
        {
            name: "removeComments",
            type: "boolean",
            description: Diagnostics.Do_not_emit_comments_to_output,
        },
        {
            name: "sourceMap",
            type: "boolean",
            description: Diagnostics.Generates_corresponding_map_file,
        },
        {
            name: "sourceRoot",
            type: "string",
            description: Diagnostics.Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations,
            paramType: Diagnostics.LOCATION,
        },
        {
            name: "target",
            shortName: "t",
            type: { "es3": ScriptTarget.ES3, "es5": ScriptTarget.ES5 },
            description: Diagnostics.Specify_ECMAScript_target_version_Colon_ES3_default_or_ES5,
            paramType: Diagnostics.VERSION,
            error: Diagnostics.Argument_for_target_option_must_be_es3_or_es5
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
        }
    ];

    var shortOptionNames: Map<string> = {};
    var optionNameMap: Map<CommandLineOption> = {};

    forEach(optionDeclarations, option => {
        optionNameMap[option.name.toLowerCase()] = option;

        if (option.shortName) {
            shortOptionNames[option.shortName] = option.name;
        }
    });

    export function parseCommandLine(commandLine: string[]): ParsedCommandLine {
        // Set default compiler option values
        var options: CompilerOptions = {
            target: ScriptTarget.ES3,
            module: ModuleKind.None
        };
        var filenames: string[] = [];
        var errors: Diagnostic[] = [];

        parseStrings(commandLine);
        return {
            options: options,
            filenames: filenames,
            errors: errors
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
                                var value = (args[i++] || "").toLowerCase();
                                if (hasProperty(opt.type, value)) {
                                    options[opt.name] = opt.type[value];
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
                    testPathsAndPush(s);
                }
            }
        }

        function testPathsAndPush(filenameOrPattern: string) {
            var fs = require("fs");
            var path = require("path");

            if (fs.existsSync(path.resolve(process.cwd(), filenameOrPattern))) {
                filenames.push(filenameOrPattern);
                return;
            }

            var glob = require("glob");

            glob.sync(filenameOrPattern).forEach(function(filename) {
                filenames.push(filename);
            });
        }

        function parseResponseFile(filename: string) {
            var text = sys.readFile(filename);

            if (!text) {
                errors.push(createCompilerDiagnostic(Diagnostics.File_0_not_found, filename));
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
                        errors.push(createCompilerDiagnostic(Diagnostics.Unterminated_quoted_string_in_response_file_0, filename));
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
}
