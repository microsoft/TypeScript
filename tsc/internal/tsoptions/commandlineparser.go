package tsoptions

import (
	"strconv"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type DidYouMeanOptionsDiagnostics struct {
	alternateMode               *AlternateModeDiagnostics
	OptionDeclarations          []CommandLineOption
	UnknownOptionDiagnostic     *diagnostics.Message
	UnknownDidYouMeanDiagnostic *diagnostics.Message
}

type AlternateModeDiagnostics struct {
	diagnostic     *diagnostics.Message
	optionsNameMap *NameMap
}

type ParseCommandLineWorkerDiagnostics struct {
	didYouMean                   DidYouMeanOptionsDiagnostics
	optionsNameMap               *NameMap
	optionsNameMapOnce           sync.Once
	OptionTypeMismatchDiagnostic *diagnostics.Message
}

type OptionsBase map[string]any // CompilerOptionsValue|TsConfigSourceFile

func (p *CommandLineParser) AlternateMode() *AlternateModeDiagnostics {
	return p.workerDiagnostics.didYouMean.alternateMode
}

func (p *CommandLineParser) OptionsDeclarations() []CommandLineOption {
	return p.workerDiagnostics.didYouMean.OptionDeclarations
}

func (p *CommandLineParser) UnknownOptionDiagnostic() *diagnostics.Message {
	return p.workerDiagnostics.didYouMean.UnknownOptionDiagnostic
}

func (p *CommandLineParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
	return p.workerDiagnostics.didYouMean.UnknownDidYouMeanDiagnostic
}

func (p *CommandLineParser) GetOptionsNameMap() *NameMap {
	p.workerDiagnostics.optionsNameMapOnce.Do(func() {
		optionsNames := map[string]*CommandLineOption{}
		shortOptionNames := map[string]string{}
		for _, option := range p.workerDiagnostics.didYouMean.OptionDeclarations {
			optionsNames[strings.ToLower(option.Name)] = &option
			if option.shortName != "" {
				shortOptionNames[option.shortName] = option.Name
			}
		}
		p.workerDiagnostics.optionsNameMap = &NameMap{
			optionsNames:     optionsNames,
			shortOptionNames: shortOptionNames,
		}
	})
	return p.workerDiagnostics.optionsNameMap
}

type CommandLineParser struct {
	workerDiagnostics *ParseCommandLineWorkerDiagnostics
	fs                vfs.FS
	options           OptionsBase
	// todo: watchOptions   OptionsBase
	fileNames []string
	errorLoc  core.TextRange
	errors    []*ast.Diagnostic
}

func ParseCommandLine(
	commandLine []string,
	fs vfs.FS,
) *ParsedCommandLine {
	// this function should convert commandLineWorker output to compileroptions
	// todo: return correct type (waiting on shared tsconfig parsing utilities)
	// parseCommandLineWorker()
	return &ParsedCommandLine{}
}

func parseCommandLineWorker(
	parseCommandLineWithDiagnostics *ParseCommandLineWorkerDiagnostics,
	commandLine []string,
	fs vfs.FS,
) *CommandLineParser {
	parser := &CommandLineParser{
		fs:                fs,
		workerDiagnostics: parseCommandLineWithDiagnostics,
		fileNames:         []string{},
		options:           OptionsBase{},
		errorLoc:          core.NewTextRange(-1, -1),
		errors:            []*ast.Diagnostic{},
	}
	parser.parseStrings(commandLine)
	return parser
}

func (p *CommandLineParser) parseStrings(args []string) {
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
			opt := p.GetOptionsNameMap().GetOptionDeclarationFromName(inputOptionName, true /*allowShort*/)
			if opt != nil {
				i = p.parseOptionValue(args, i, opt)
			} else {
				// todo: watch options not yet implemented
				// watchOpt := getOptionDeclarationFromName(watchOptionsDidYouMeanDiagnostics.getOptionsNameMap, inputOptionName, /*allowShort*/ true);
				// if (watchOpt != nil) {
				// 	i := parser.parseOptionValue(args, i, watchOptionsDidYouMeanDiagnostics, watchOpt, watchOptions, errors);
				// } else {
				p.errors = append(p.errors, p.createUnknownOptionError(inputOptionName, s, nil, nil))
				// }
			}
		default:
			p.fileNames = append(p.fileNames, s)
		}
	}
}

func getInputOptionName(input string) string {
	// removes at most two leading '-' from the input string
	return strings.ToLower(strings.TrimLeft(strings.TrimLeft(input, "-"), "-"))
}

func (p *CommandLineParser) parseResponseFile(fileName string) {
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

func (p *CommandLineParser) parseOptionValue(
	args []string,
	i int,
	opt *CommandLineOption,
) int {
	if opt.isTSConfigOnly && i < len(args) {
		optValue := args[i]
		if optValue == "null" {
			p.options[opt.Name] = nil
			i++
		} else if opt.Kind == "boolean" {
			if optValue == "false" {
				p.options[opt.Name] = false
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
				p.errors = append(p.errors, ast.NewCompilerDiagnostic(p.workerDiagnostics.OptionTypeMismatchDiagnostic, opt.Name, getCompilerOptionValueTypeString(opt)))
				if opt.Kind == "list" {
					p.options[opt.Name] = []string{}
				}
			} else {
				p.options[opt.Name] = true
			}
			return i
		}
		if args[i] != "null" {
			switch opt.Kind {
			case "number":
				// todo: Make sure this parseInt matches JS parseInt
				num, e := strconv.ParseInt(args[i], 10, 0)
				if e == nil {
					p.options[opt.Name] = num
				}
				i++
			case "boolean":
				// boolean flag has optional value true, false, others
				optValue := args[i]

				// check next argument as boolean flag value
				if optValue == "false" {
					p.options[opt.Name] = false
				} else {
					p.options[opt.Name] = true
				}
				// try to consume next argument as value for boolean flag; do not consume argument if it is not "true" or "false"
				if optValue == "false" || optValue == "true" {
					i++
				}
			case "string":
				p.options[opt.Name] = p.validateJsonOptionValue(opt, args[i], nil, nil)
				i++
			case "list":
				result := p.parseListTypeOption(opt, args[i])
				p.options[opt.Name] = result
				if len(result) != 0 {
					i++
				}
			case "listOrElement":
				// If not a primitive, the possible types are specified in what is effectively a map of options.
				panic("listOrElement not supported here")
			default:
				p.options[opt.Name] = p.parseEnumOption(opt, args[i])
				i++
			}
		} else {
			p.options[opt.Name] = nil
			i++
		}
	}
	return i
}

func (p *CommandLineParser) parseListTypeOption(opt *CommandLineOption, value string) []string {
	value = strings.TrimSpace(value)
	if strings.HasPrefix(value, "-") {
		return []string{}
	}
	if opt.Kind == "listOrElement" && !strings.ContainsRune(value, ',') {
		return []string{p.validateJsonOptionValue(opt, value, nil, nil)}
	}
	if value == "" {
		return []string{}
	}
	values := strings.Split(value, ",")
	switch opt.Elements().Kind {
	case "string":
		return core.Filter(core.Map(values, func(v string) string { return p.validateJsonOptionValue(opt.Elements(), v, nil, nil) }), isDefined)
	case "boolean", "object", "number":
		// do nothing: only string and enum/object types currently allowed as list entries
		// 				!!! we don't actually have number list options, so I didn't implement number list parsing
		panic("List of " + opt.Elements().Kind + " is not yet supported.")
	default:
		return core.Filter(core.Map(values, func(v string) string { return p.parseEnumOption(opt.Elements(), v).(string) }), isDefined)
	}
}

func isDefined(s string) bool {
	return s != ""
}

// currently, the only options with `extravalidation` are string options
func (p *CommandLineParser) validateJsonOptionValue(
	opt *CommandLineOption,
	value string,
	loc *core.TextRange,
	sourceFile *ast.SourceFile, // TODO TsConfigSourceFile,
) string {
	if opt.extraValidation != nil {
		d, args := opt.extraValidation(value)
		if d != nil {
			p.errors = append(p.errors,
				ast.NewDiagnostic(sourceFile, *loc, d, args))
			return ""
		}
	}
	return value
}

func (parser *CommandLineParser) parseEnumOption(opt *CommandLineOption, value string) any {
	return parser.convertJsonOptionOfEnumType(opt, strings.TrimFunc(value, stringutil.IsWhiteSpaceLike))
}

func (parser *CommandLineParser) convertJsonOptionOfEnumType(
	opt *CommandLineOption,
	value string,
	// todo: previously used for error reporting, remove if ported functions do not need
	// valueExpression Expression,
	// sourceFile TsConfigSourceFile,
) any {
	if value == "" {
		return ""
	}
	key := strings.ToLower(value)
	typeMap := opt.EnumMap()
	if typeMap == nil {
		return ""
	}
	val, b := typeMap.Get(key)
	if (val != nil) && (val != "" || b) {
		return val
	}
	parser.errors = append(parser.errors, createDiagnosticForInvalidEnumType(opt))
	return ""
}
