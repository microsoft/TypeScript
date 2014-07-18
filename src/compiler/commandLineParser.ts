/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>

module ts {
    var shortOptionNames: Map<string> = {
        "d": "declaration",
        "h": "help",
        "m": "module",
        "o": "out",
        "t": "target",
        "v": "version",
    };

    var options: CommandLineOption[] = [
        { name: "charset", type: "string" },
        { name: "codepage", type: "number" },
        { name: "declaration", type: "boolean" },
        { name: "diagnostics", type: "boolean" },
        { name: "help", type: "boolean" },
        { name: "locale", type: "string" },
        { name: "mapRoot", type: "string" },
        { name: "module", type: { "commonjs": ModuleKind.CommonJS, "amd": ModuleKind.AMD }, error: Diagnostics.Argument_for_module_option_must_be_commonjs_or_amd },
        { name: "noImplicitAny", type: "boolean" },
        { name: "noLib", type: "boolean" },
        { name: "noLibCheck", type: "boolean" },
        { name: "noResolve", type: "boolean" },
        { name: "out", type: "string" },
        { name: "outDir", type: "string" },
        { name: "removeComments", type: "boolean" },
        { name: "sourceMap", type: "boolean" },
        { name: "sourceRoot", type: "string" },
        { name: "target", type: { "es3": ScriptTarget.ES3, "es5": ScriptTarget.ES5 }, error: Diagnostics.Argument_for_target_option_must_be_es3_or_es5 },
        { name: "version", type: "boolean" }
    ];

    // Map command line switches to compiler options' property descriptors. Keys must be lower case spellings of command line switches.
    // The 'name' property specifies the property name in the CompilerOptions type. The 'type' property specifies the type of the option.
    var optionDeclarations: Map<CommandLineOption> = {};
    forEach(options, option => {
        optionDeclarations[option.name.toLowerCase()] = option;
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

                    if (hasProperty(optionDeclarations, s)) {
                        var opt = optionDeclarations[s];

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
                    filenames.push(s);
                }
            }
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
