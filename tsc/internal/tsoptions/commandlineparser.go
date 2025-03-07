package tsoptions

import (
	"strconv"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func (p *commandLineParser) AlternateMode() *AlternateModeDiagnostics {
	return p.workerDiagnostics.didYouMean.alternateMode
}

func (p *commandLineParser) OptionsDeclarations() []*CommandLineOption {
	return p.workerDiagnostics.didYouMean.OptionDeclarations
}

func (p *commandLineParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return p.workerDiagnostics.didYouMean.UnknownOptionDiagnostic
}

func (p *commandLineParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
	return p.workerDiagnostics.didYouMean.UnknownDidYouMeanDiagnostic
}

type commandLineParser struct {
	workerDiagnostics *ParseCommandLineWorkerDiagnostics
	optionsMap        *NameMap
	fs                vfs.FS
	options           *collections.OrderedMap[string, any]
	fileNames         []string
	errors            []*ast.Diagnostic
}

func ParseCommandLine(
	commandLine []string,
	host ParseConfigHost,
) *ParsedCommandLine {
	if commandLine == nil {
		commandLine = []string{}
	}
	parser := parseCommandLineWorker(CompilerOptionsDidYouMeanDiagnostics, commandLine, host.FS())
	optionsWithAbsolutePaths := convertToOptionsWithAbsolutePaths(parser.options, commandLineCompilerOptionsMap, host.GetCurrentDirectory())
	compilerOptions := convertMapToOptions(commandLineCompilerOptionsMap, optionsWithAbsolutePaths, &compilerOptionsParser{&core.CompilerOptions{}}).CompilerOptions
	watchOptions := convertMapToOptions(commandLineCompilerOptionsMap, optionsWithAbsolutePaths, &watchOptionsParser{&core.WatchOptions{}}).WatchOptions
	return &ParsedCommandLine{
		ParsedConfig: &core.ParsedOptions{
			CompilerOptions: compilerOptions,
			WatchOptions:    watchOptions,
			FileNames:       parser.fileNames,
		},
		ConfigFile:    nil,
		Errors:        parser.errors,
		Raw:           parser.options, // !!! keep optionsBase incase needed later. todo: figure out if this is still needed
		CompileOnSave: nil,
	}
}

func parseCommandLineWorker(
	parseCommandLineWithDiagnostics *ParseCommandLineWorkerDiagnostics,
	commandLine []string,
	fs vfs.FS,
) *commandLineParser {
	parser := &commandLineParser{
		fs:                fs,
		workerDiagnostics: parseCommandLineWithDiagnostics,
		fileNames:         []string{},
		options:           &collections.OrderedMap[string, any]{},
		errors:            []*ast.Diagnostic{},
	}
	parser.optionsMap = GetNameMapFromList(parser.OptionsDeclarations())
	parser.parseStrings(commandLine)
	return parser
}

func (p *commandLineParser) parseStrings(args []string) {
	i := 0
	for i < len(args) {
		s := args[i]
		i++
		if s == "" {
			continue
		}
		switch s[0] {
		case '@':
			p.parseResponseFile(s[1:])
		case '-':
			inputOptionName := getInputOptionName(s)
			opt := p.optionsMap.GetOptionDeclarationFromName(inputOptionName, true /*allowShort*/)
			if opt != nil {
				i = p.parseOptionValue(args, i, opt, nil)
			} else {
				watchOpt := WatchNameMap.GetOptionDeclarationFromName(inputOptionName, true /*allowShort*/)
				if watchOpt != nil {
					i = p.parseOptionValue(args, i, watchOpt, watchOptionsDidYouMeanDiagnostics.OptionTypeMismatchDiagnostic)
				} else {
					p.errors = append(p.errors, p.createUnknownOptionError(inputOptionName, s, nil, nil))
				}
			}
		default:
			p.fileNames = append(p.fileNames, s)
		}
	}
}

func getInputOptionName(input string) string {
	// removes at most two leading '-' from the input string
	return strings.ToLower(strings.TrimPrefix(strings.TrimPrefix(input, "-"), "-"))
}

func (p *commandLineParser) parseResponseFile(fileName string) {
	fileContents, errors := TryReadFile(fileName, func(fileName string) (string, bool) {
		if p.fs == nil {
			return "", false
		}
		read, err := p.fs.ReadFile(fileName)
		return read, err
	}, p.errors)
	p.errors = errors

	if fileContents == "" {
		return
	}

	var args []string
	text := []rune(fileContents)
	textLength := len(text)
	pos := 0
	for pos < textLength {
		for pos < textLength && text[pos] <= ' ' {
			pos++
		}
		if pos >= textLength {
			break
		}
		start := pos
		if text[pos] == '"' {
			pos++
			for pos < textLength && text[pos] != '"' {
				pos++
			}
			if pos < textLength {
				args = append(args, string(text[start+1:pos]))
				pos++
			} else {
				p.errors = append(p.errors, ast.NewCompilerDiagnostic(diagnostics.Unterminated_quoted_string_in_response_file_0, fileName))
			}
		} else {
			for text[pos] > ' ' {
				pos++
			}
			args = append(args, string(text[start:pos]))
		}
	}
	p.parseStrings(args)
}

func TryReadFile(fileName string, readFile func(string) (string, bool), errors []*ast.Diagnostic) (string, []*ast.Diagnostic) {
	// this function adds a compiler diagnostic if the file cannot be read
	text, e := readFile(fileName)

	if !e || text == "" {
		// !!! Divergence: the returned error will not give a useful message
		// errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Cannot_read_file_0_Colon_1, *e));
		text = ""
		errors = append(errors, ast.NewCompilerDiagnostic(diagnostics.Cannot_read_file_0, fileName))
	}
	return text, errors
}

func (p *commandLineParser) parseOptionValue(
	args []string,
	i int,
	opt *CommandLineOption,
	diag *diagnostics.Message,
) int {
	if opt.IsTSConfigOnly && i <= len(args) {
		optValue := ""
		if i < len(args) {
			optValue = args[i]
		}
		if optValue == "null" {
			p.options.Set(opt.Name, nil)
			i++
		} else if opt.Kind == "boolean" {
			if optValue == "false" {
				p.options.Set(opt.Name, false)
				i++
			} else {
				if optValue == "true" {
					i++
				}
				p.errors = append(p.errors, ast.NewCompilerDiagnostic(diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line, opt.Name))
			}
		} else {
			p.errors = append(p.errors, ast.NewCompilerDiagnostic(diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line, opt.Name))
			if len(optValue) != 0 && !strings.HasPrefix(optValue, "-") {
				i++
			}
		}
	} else {
		// Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
		if i >= len(args) {
			if opt.Kind != "boolean" {
				if diag == nil {
					diag = p.workerDiagnostics.OptionTypeMismatchDiagnostic
				}
				p.errors = append(p.errors, ast.NewCompilerDiagnostic(diag, opt.Name, getCompilerOptionValueTypeString(opt)))
				if opt.Kind == "list" {
					p.options.Set(opt.Name, []string{})
				} else if opt.Kind == "enum" {
					p.errors = append(p.errors, createDiagnosticForInvalidEnumType(opt, nil, nil))
				}
			} else {
				p.options.Set(opt.Name, true)
			}
			return i
		}
		if args[i] != "null" {
			switch opt.Kind {
			case "number":
				// todo: Make sure this parseInt matches JS parseInt
				num, e := strconv.ParseInt(args[i], 10, 0)
				if e == nil {
					p.options.Set(opt.Name, num)
				}
				i++
			case "boolean":
				// boolean flag has optional value true, false, others
				optValue := args[i]

				// check next argument as boolean flag value
				if optValue == "false" {
					p.options.Set(opt.Name, false)
				} else {
					p.options.Set(opt.Name, true)
				}
				// try to consume next argument as value for boolean flag; do not consume argument if it is not "true" or "false"
				if optValue == "false" || optValue == "true" {
					i++
				}
			case "string":
				val, err := validateJsonOptionValue(opt, args[i], nil, nil)
				if err == nil {
					p.options.Set(opt.Name, val)
				} else {
					p.errors = append(p.errors, err...)
				}
				i++
			case "list":
				result, err := p.parseListTypeOption(opt, args[i])
				p.options.Set(opt.Name, result)
				p.errors = append(p.errors, err...)
				if len(result) > 0 || len(err) > 0 {
					i++
				}
			case "listOrElement":
				// If not a primitive, the possible types are specified in what is effectively a map of options.
				panic("listOrElement not supported here")
			default:
				val, err := convertJsonOptionOfEnumType(opt, strings.TrimFunc(args[i], stringutil.IsWhiteSpaceLike), nil, nil)
				p.options.Set(opt.Name, val)
				p.errors = append(p.errors, err...)
				i++
			}
		} else {
			p.options.Set(opt.Name, nil)
			i++
		}
	}
	return i
}

func (p *commandLineParser) parseListTypeOption(opt *CommandLineOption, value string) ([]string, []*ast.Diagnostic) {
	return ParseListTypeOption(opt, value)
}

func ParseListTypeOption(opt *CommandLineOption, value string) ([]string, []*ast.Diagnostic) {
	value = strings.TrimSpace(value)
	var errors []*ast.Diagnostic
	if strings.HasPrefix(value, "-") {
		return []string{}, errors
	}
	if opt.Kind == "listOrElement" && !strings.ContainsRune(value, ',') {
		val, err := validateJsonOptionValue(opt, value, nil, nil)
		if err != nil {
			return []string{}, err
		}
		return []string{val.(string)}, errors
	}
	if value == "" {
		return []string{}, errors
	}
	values := strings.Split(value, ",")
	switch opt.Elements().Kind {
	case "string":
		elements := core.Filter(core.Map(values, func(v string) string {
			val, err := validateJsonOptionValue(opt.Elements(), v, nil, nil)
			if s, ok := val.(string); ok && len(err) == 0 && s != "" {
				return s
			}
			errors = append(errors, err...)
			return ""
		}), isDefined)
		return elements, errors
	case "boolean", "object", "number":
		// do nothing: only string and enum/object types currently allowed as list entries
		// 				!!! we don't actually have number list options, so I didn't implement number list parsing
		panic("List of " + opt.Elements().Kind + " is not yet supported.")
	default:
		result := core.Filter(core.Map(values, func(v string) string {
			val, err := convertJsonOptionOfEnumType(opt.Elements(), strings.TrimFunc(v, stringutil.IsWhiteSpaceLike), nil, nil)
			if s, ok := val.(string); ok && len(err) == 0 && s != "" {
				return s
			}
			errors = append(errors, err...)
			return ""
		}), isDefined)
		return result, errors
	}
}

func isDefined(s string) bool {
	return s != ""
}

func convertJsonOptionOfEnumType(
	opt *CommandLineOption,
	value string,
	valueExpression *ast.Expression,
	sourceFile *ast.SourceFile,
) (any, []*ast.Diagnostic) {
	if value == "" {
		return nil, nil
	}
	key := strings.ToLower(value)
	typeMap := opt.EnumMap()
	if typeMap == nil {
		return nil, nil
	}
	val, ok := typeMap.Get(key)
	if ok {
		return validateJsonOptionValue(opt, val, valueExpression, sourceFile)
	}
	return nil, []*ast.Diagnostic{createDiagnosticForInvalidEnumType(opt, sourceFile, valueExpression)}
}
