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
            name: "separateCompilation",
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
            name: "emitDecoratorMetadata",
            type: "boolean",
            experimental: true
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
        let errors: Diagnostic[] = [];
        let options = getCompilerOptions();
        
        return {
            options,
            fileNames: getFileNames(),
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

        function getFileNames(): string[] {
            var exclude = json["exclude"] instanceof Array ? <string[]>json["exclude"] : undefined;
            if (hasProperty(json, "files")) {
                if (json["files"] instanceof Array) {
                    var fileNames = <string[]>json["files"];
                    return expandFiles(fileNames, exclude, /*literalFiles*/ false);
                }
                
                return [];
            }
            else {
                var fileNames: string[] = [];
                var sysFiles = host.readDirectory(basePath, ".ts");
                for (var i = 0; i < sysFiles.length; i++) {
                    var name = sysFiles[i];
                    if (!fileExtensionIs(name, ".d.ts") || !contains(sysFiles, name.substr(0, name.length - 5) + ".ts")) {
                        fileNames.push(name);
                    }
                }
                
                if (!exclude) {
                    return fileNames;
                }

                return expandFiles(fileNames, exclude, /*literalFiles*/ true);
            }
        }
        
        /**
          * Expands an array of file specifications.
          * @param files The file specifications to expand.
          * @param exclude Any file specifications to exclude.
          * @param literalFiles A value indicating whether the files array are literal files and not wildcards.
          */
        function expandFiles(files: string[], exclude: string[], literalFiles: boolean): string[] {
            // Used to verify the file specification does not have multiple recursive directory wildcards.
            let invalidRecursiveWildcardPattern = /(^|\/)\*\*\/(.*\/)?\*\*(\/|$)/;
            
            // Used to parse glob-style wildcards, this pattern matches the following tokens:
            // 
            //  `*`                     - Matches zero or more characters. This token, if matched, will be 
            //                            stored in capture group $1.
            //  `?`                     - Matches zero or one character. This token, if matched, will be
            //                            stored in capture group $2.
            //  `[` RangeCharacters `]` - Matches a zero or one character in the specified range of  
            //                            characters, where RangeCharacters consists of any character not 
            //                            in the set { `*`, `?`, `]` }. These tokens, if matched, will be 
            //                            stored in capture group $3.
            //  ReservedCharacters      - Where ReservedCharacters are tokens with special meaning in
            //                            the regular expression grammar that need to be escaped. 
            //                            This includes characters in the set { `+`, `.`, `^`, `$`, `(`, `)`,
            //                            `{`, `}`, `[`, `]`, `|` }. These tokens, if matched, will be stored
            //                            in capture group $4.
            //  DirectorySeparators     - Characters in the set { `/`, `\` }.
            let wildcardParserPattern = /(\*)|(\?)|(\[[^?*\]]*\])|([+.^$(){}\[\]|])/g;
        
            // Used to parse glob-style wildcards for exclude paths, this pattern matches the following tokens:
            // 
            //  `**`                    - Matches a recursive directory, but only when found in the following
            //                            context: 
            //                              - As the whole wildcard.
            //                              - At the start of the wildcard, followed by `/`.
            //                              - At the end of the wildcard, preceeded by `/`.
            //                              - Anywhere in the pattern if preceeded and followed by `/`.
            //                            These tokens, if matched, will be stored in capture group $1. 
            //                            the pattern and followed by a directory separator
            //  `*`                     - Matches zero or more characters. This token, if matched, will be 
            //                            stored in capture group $2.
            //  `?`                     - Matches zero or one character. This token, if matched, will be
            //                            stored in capture group $3.
            //  `[` RangeCharacters `]` - Matches a zero or one character in the specified range of  
            //                            characters, where RangeCharacters consists of any character not 
            //                            in the set { `*`, `?`, `]` }. These tokens, if matched, will be 
            //                            stored in capture group $4.
            //  ReservedCharacters      - Where ReservedCharacters are tokens with special meaning in
            //                            the regular expression grammar that need to be escaped. 
            //                            This includes characters in the set { `+`, `.`, `^`, `$`, `(`, `)`,
            //                            `{`, `}`, `[`, `]`, `|` }. These tokens, if matched, will be stored
            //                            in capture group $5.
            let excludeWildcardParserPattern = /((?:^|\/)\*\*(?:\/|$))|(\*)|(\?)|(\[[^?*\/\]]*\])|([+.^$(){}\[\]|])/g;
            
            // Used to parse a glob-style character range, this pattern matches the following tokens:
            //
            //  `[`                 - The opening bracket of the range, if at the start of the string. 
            //                        This token, if matched, will be stored in capture group $1.
            //  `!`                 - Indicates the range should match any character except those listed in 
            //                        the range, if found immediately following the opening bracket of the 
            //                        range. This token, if matched, will be stored in capture group $2. 
            //  ReservedCharacters  - Where ReservedCharacters are tokens with special meaning in the
            //                        regular expression grammar that need to be escaped. This includes
            //                        characters in the set { `^`, `[` }. These tokens, if matched,
            //                        will be stored in capture group $3.
            //  `]`                 - Matches the closing bracket of the range, if at the end of the string. 
            //                        This token, if matched, will be stored in capture group $4.
            let rangeParserPattern = /(^\[)(!)?|([\^\[])|(\]$)/g;
            
            // Used to match characters with special meaning in a regular expression.
            let regExpReservedCharacterPattern = /[?*+.^$(){}\[\]|]/;
            
            let prefix = normalizePath(basePath);            
            let ignoreCase = !host.useCaseSensitiveFileNames;
            let fileSet: Map<string> = {};
            
            // populate the exclusion list
            let excludePattern = createExcludePattern(prefix, exclude);
            
            if (literalFiles) {
                // process each file spec as a literal file entry.
                for (let fileSpec of files) {
                    let normalizedFileSpec = normalizePath(fileSpec);
                    normalizedFileSpec = combinePaths(basePath, normalizedFileSpec);
                    includeFile(normalizedFileSpec);
                }
            }
            else {
                // expand and include the provided files into the file set.
                for (let fileSpec of files) {
                    let normalizedFileSpec = normalizePath(fileSpec);
                    normalizedFileSpec = removeTrailingDirectorySeparator(normalizedFileSpec);
                    if (invalidRecursiveWildcardPattern.test(normalizedFileSpec)) {
                        errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, fileSpec))
                    }
                    else {
                        expandDirectory(prefix, normalizedFileSpec, 0);
                    }
                }
            }
            
            let result: string[] = [];
            forEachValue(fileSet, value => { result.push(value); });
            return result;
            
            /**
              * Expands a wildcard portion of a file specification.
              * @param prefix The prefix path.
              * @param fileSpec The file specification.
              * @param offset The offset in the file specification.
              */
            function expandWildcard(prefix: string, fileSpec: string, offset: number): void {
                // find the offset of the next directory separator to extract the wildcard path segment. 
                let endOffset = fileSpec.indexOf(directorySeparator, offset);
                let endOfLine = endOffset < 0;
                let wildcard = fileSpec.substring(offset, endOfLine ? fileSpec.length : endOffset);
                if (wildcard === "**") {
                    // If the path contains only "**", then this is a recursive directory pattern.
                    if (endOfLine) {
                        // If there is no file specification following the recursive directory pattern, 
                        // we cannot match any files, so we will ignore this pattern
                        return;
                    }
                    
                    // expand the recursive directory pattern
                    expandRecursiveDirectory(prefix, fileSpec, endOffset + 1);
                }
                else {
                    // match the entries in the directory against the wildcard pattern.
                    let entries = host.readDirectoryFlat(prefix);
                    let pattern = createPatternFromWildcard(wildcard);
                    for (let entry of entries) {
                        // skip the entry if it does not match the pattern.
                        if (!pattern.test(entry)) {
                            continue;
                        }
                        
                        let path = combinePaths(prefix, entry);
                        if (endOfLine) {
                            // This wildcard has no further directory so process the match.
                            includeFile(path);
                        }
                        else if (host.directoryExists(path)) {
                            // If this was a directory, process the directory.
                            expandDirectory(path, fileSpec, endOffset + 1);
                        }
                    }
                }
            }
            
            /**
              * Expands a `**` recursive directory wildcard.
              * @param prefix The directory to recursively expand
              * @param fileSpec The original file specification
              * @param offset The offset into the file specification
              */
            function expandRecursiveDirectory(prefix: string, fileSpec: string, offset: number): void {
                // expand the non-recursive part of the file specification against the prefix path.
                expandDirectory(prefix, fileSpec, offset);
                
                // recursively expand each subdirectory.
                let entries = host.readDirectoryFlat(prefix);
                for (let entry of entries) {
                    let path = combinePaths(prefix, entry);
                    if (host.directoryExists(path)) {
                        expandRecursiveDirectory(path, fileSpec, offset);
                    }
                }
            }
            
            /**
              * Expands a directory with wildcards.
              * @param prefix The directory to expand.
              * @param fileSpec The original file specification.
              * @param offset The offset into the file specification.
              */
            function expandDirectory(prefix: string, fileSpec: string, offset: number): void {
                 // find the offset of the next wildcard in the file specification
                 let wildcardOffset = indexOfWildcard(fileSpec, offset);
                 if (wildcardOffset < 0) {
                     // There were no more wildcards, so process the match if the file exists and was not excluded.
                     let path = combinePaths(prefix, fileSpec.substring(offset));
                     includeFile(path);
                     return;
                 }
                 
                 // find the last directory separator before the wildcard to get the leading path.
                 let endOffset = fileSpec.lastIndexOf(directorySeparator, wildcardOffset);
                 if (endOffset > offset) {
                     // wildcard occurs in a later segment, include remaining path up to wildcard in prefix
                     prefix = combinePaths(prefix, fileSpec.substring(offset, endOffset));
                     offset = endOffset + 1;
                 }
                 
                 // Expand the wildcard portion of the path.
                 expandWildcard(prefix, fileSpec, offset);
            }
            
            /**
              * Includes a file in a file set.
              * @param file The file to include.
              */
            function includeFile(file: string): void {
                let key = ignoreCase ? file.toLowerCase() : file;
                // ignore the file if we've already matched it.
                if (hasProperty(fileSet, key)) {
                    return;
                }
                
                // ignore the file if it matches an exclude pattern
                if (excludePattern && excludePattern.test(file)) {
                    return;
                }
                
                // ignore the file if it doesn't exist or is a directory
                if (!host.fileExists(file) || host.directoryExists(file)) {
                    return;
                }
                
                // ignore the file if it does not have a supported extension
                if (!options.allowNonTsExtensions && !hasSupportedFileExtension(file)) {
                    return;
                }
                
                fileSet[key] = file;
            }
            
            /**
              * Gets the index of the next wildcard character in a file specification.
              * @param fileSpec The file specification.
              * @param start The offset at which to start the search.
              */
            function indexOfWildcard(fileSpec: string, start: number): number {
                const len = fileSpec.length;
                for (let i = start; i < len; ++i) {
                    let charCode = fileSpec.charCodeAt(i);
                    if (charCode === 42 /*asterisk*/ ||
                        charCode === 63 /*question*/ ||
                        charCode === 91 /*openBracket*/) {
                        return i;
                    }
                }
                return -1;
            }
            
            /**
              * Creates a regular expression from a glob-style wildcard.
              * @param wildcard The wildcard
              */
            function createPatternFromWildcard(wildcard: string): RegExp {
                return new RegExp("^" + wildcard.replace(wildcardParserPattern, wildcardTokenReplacer) + "$", ignoreCase ? "i" : "");
            }
            
            /**
              * Creates a regular expression from a glob-style wildcard used to exclude a file.
              * @param prefix The prefix path 
              * @param exclude The file specifications to exclude.
              */
            function createExcludePattern(prefix: string, exclude: string[]): RegExp {
                // ignore an empty exclusion list
                if (!exclude || exclude.length === 0) {
                    return undefined;
                }
                
                prefix = regExpEscape(prefix);
                
                let pattern = "";
                for (let excludeSpec of exclude) {
                    // skip empty entries.
                    if (!excludeSpec) continue;
                    
                    let normalizedExcludeSpec = normalizePath(excludeSpec);
                    if (invalidRecursiveWildcardPattern.test(normalizedExcludeSpec)) {
                        errors.push(createCompilerDiagnostic(Diagnostics.File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0, excludeSpec));
                    }
                    else {
                        if (pattern) {
                            pattern += "|";
                        }

                        normalizedExcludeSpec = normalizedExcludeSpec.replace(excludeWildcardParserPattern, excludeWildcardTokenReplacer);
                        pattern += "(" + combinePaths(prefix, normalizedExcludeSpec) + ")";
                    }
                }
        
                if (pattern) {
                    return new RegExp("^(" + pattern + ")$", ignoreCase ? "i" : "");
                }
                
                return undefined;
            }
            
            /**
              * Replaces a wildcard token with an encoded regular expression pattern.
              * @param raw The raw matched string
              * @param multiChar The match for the multi-character wildcard token ('*').
              * @param singleChar The match for the single-character wildcard token ('?').
              * @param range The match for a character-range wildcard token ('[a-z]').
              * @param meta A token that needs to be encoded in a regular expression.
              */
            function wildcardTokenReplacer(raw: string, multiChar: string, singleChar: string, range: string, meta: string) {
                if (multiChar) return ".*";
                if (singleChar) return ".?";
                if (range) return range.replace(rangeParserPattern, rangeTokenReplacer)
                if (meta) return "\\" + meta;
                return raw;
            }
            
            /**
              * Replaces a wildcard token with an encoded regular expression pattern.
              * @param raw The raw matched string
              * @param recursive The match for the recursive directory wildcard token ('**'). Capture group $1
              * @param multiChar The match for the multi-character wildcard token ('*'). Capture group $2
              * @param singleChar The match for the single-character wildcard token ('?'). Capture group $3
              * @param range The match for a character-range wildcard token ('[a-z]'). Capture group $4
              * @param meta A token that needs to be encoded in a regular expression. Capture group $5
              */
            function excludeWildcardTokenReplacer(raw: string, recursive: string, multiChar: string, singleChar: string, range: string, meta: string) {
                if (recursive) return "(^|/)(.*(/|$))?";
                if (multiChar) return ".*";
                if (singleChar) return ".?";
                if (range) return range.replace(rangeParserPattern, rangeTokenReplacer)
                if (meta) return "\\" + meta;
                return raw;
            }
        
            /**
              * Replaces a range token with an encoded regular expression pattern.
              * @param raw The raw matched string.
              * @param open The opening bracket of the range ('[').
              * @param not The negation token for a range ('!').
              * @param meta A token that needs to be encoded in a regular expression.
              * @param close The closing bracket of the range (']').
              */
            function rangeTokenReplacer(raw: string, open: string, not: string, meta: string, close: string) {
                if (open) return not ? "[^" : "[";
                if (meta) return "\\" + meta;
                if (close) return "]";
                return raw;
            }
            
            /**
              * Escape regular expression reserved tokens.
              * @param text The text to escape.
              */
            function regExpEscape(text: string) {
                return text.replace(regExpReservedCharacterPattern, token => "\\" + token);
            }
        }
    }
}
