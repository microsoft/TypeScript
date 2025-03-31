package execute

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func getFormatOptsOfSys(sys System) *diagnosticwriter.FormattingOptions {
	return &diagnosticwriter.FormattingOptions{
		NewLine: "\n",
		ComparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          sys.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: sys.FS().UseCaseSensitiveFileNames(),
		},
	}
}

type diagnosticReporter = func(*ast.Diagnostic)

func createDiagnosticReporter(sys System, pretty core.Tristate) diagnosticReporter {
	formatOpts := getFormatOptsOfSys(sys)
	if pretty.IsFalseOrUnknown() {
		return func(diagnostic *ast.Diagnostic) {
			diagnosticwriter.WriteFormatDiagnostic(sys.Writer(), diagnostic, formatOpts)
			sys.EndWrite()
		}
	}
	return func(diagnostic *ast.Diagnostic) {
		diagnosticwriter.FormatDiagnosticsWithColorAndContext(sys.Writer(), []*ast.Diagnostic{diagnostic}, formatOpts)
		sys.EndWrite()
	}
}

func shouldBePretty(sys System, options *core.CompilerOptions) bool {
	if options == nil || options.Pretty.IsTrueOrUnknown() {
		// todo: return defaultIsPretty(sys);
		return true
	}
	return options.Pretty.IsTrue()
}

func createReportErrorSummary(sys System, options *core.CompilerOptions) func(diagnostics []*ast.Diagnostic) {
	if shouldBePretty(sys, options) {
		formatOpts := getFormatOptsOfSys(sys)
		return func(diagnostics []*ast.Diagnostic) {
			diagnosticwriter.WriteErrorSummaryText(sys.Writer(), diagnostics, formatOpts)
			sys.EndWrite()
		}
	}
	return func(diagnostics []*ast.Diagnostic) {}
}

func reportStatistics(sys System, program *compiler.Program) {
	// todo
	stats := []statistic{
		newStatistic("Files", len(program.SourceFiles())),
		// newStatistic("Identifiers", program.IdentifierCount()),
		// newStatistic("Symbols", program.getSymbolCount()),
		newStatistic("Types", program.TypeCount()),
		// newStatistic("Instantiations", program.getInstantiationCount()),
	}

	for _, stat := range stats {
		fmt.Fprintf(sys.Writer(), "%s:"+strings.Repeat(" ", 20-len(stat.name))+"%v\n", stat.name, stat.value)
	}
}

type statistic struct {
	name  string
	value int
}

func newStatistic(name string, count int) statistic {
	return statistic{name, count}
}

func printVersion(sys System) {
	fmt.Fprint(sys.Writer(), diagnostics.Version_0.Format(core.Version)+sys.NewLine())
	sys.EndWrite()
}

func printHelp(sys System, commandLine *tsoptions.ParsedCommandLine) {
	if commandLine.CompilerOptions().All.IsFalseOrUnknown() {
		printEasyHelp(sys, getOptionsForHelp(commandLine))
	} else {
		// !!! printAllHelp(sys, getOptionsForHelp(commandLine))
	}
}

func getOptionsForHelp(commandLine *tsoptions.ParsedCommandLine) []*tsoptions.CommandLineOption {
	// Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
	opts := slices.Clone(tsoptions.OptionsDeclarations)
	opts = append(opts, &tsoptions.TscBuildOption)

	if commandLine.CompilerOptions().All.IsTrue() {
		slices.SortFunc(opts, func(a, b *tsoptions.CommandLineOption) int {
			return strings.Compare(strings.ToLower(a.Name), strings.ToLower(b.Name))
		})
		return opts
	} else {
		return core.Filter(opts, func(opt *tsoptions.CommandLineOption) bool {
			return opt.ShowInSimplifiedHelpView
		})
	}
}

func getHeader(sys System, message string) []string {
	// !!! const colors = createColors(sys);
	var header []string
	// !!! terminalWidth := sys.GetWidthOfTerminal?.() ?? 0
	const tsIconLength = 5

	//     const tsIconFirstLine = colors.blueBackground("".padStart(tsIconLength));
	//     const tsIconSecondLine = colors.blueBackground(colors.brightWhite("TS ".padStart(tsIconLength)));
	//     // If we have enough space, print TS icon.
	//     if (terminalWidth >= message.length + tsIconLength) {
	//         // right align of the icon is 120 at most.
	//         const rightAlign = terminalWidth > 120 ? 120 : terminalWidth;
	//         const leftAlign = rightAlign - tsIconLength;
	//         header.push(message.padEnd(leftAlign) + tsIconFirstLine + sys.newLine);
	//         header.push("".padStart(leftAlign) + tsIconSecondLine + sys.newLine);
	//     }
	//     else {
	header = append(header, message+sys.NewLine(), sys.NewLine())
	//     }
	return header
}

func printEasyHelp(sys System, simpleOptions []*tsoptions.CommandLineOption) {
	// !!! const colors = createColors(sys);
	var output []string
	example := func(examples []string, desc *diagnostics.Message) {
		for _, example := range examples {
			// !!! colors
			// output.push("  " + colors.blue(example) + sys.newLine);
			output = append(output, "  ", example, sys.NewLine())
		}
		output = append(output, "  ", desc.Format(), sys.NewLine(), sys.NewLine())
	}

	msg := diagnostics.X_tsc_Colon_The_TypeScript_Compiler.Format() + " - " + diagnostics.Version_0.Format(core.Version)
	output = append(output, getHeader(sys, msg)...)

	output = append(output /*colors.bold(*/, diagnostics.COMMON_COMMANDS.Format() /*)*/, sys.NewLine(), sys.NewLine())

	example([]string{"tsc"}, diagnostics.Compiles_the_current_project_tsconfig_json_in_the_working_directory)
	example([]string{"tsc app.ts util.ts"}, diagnostics.Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options)
	example([]string{"tsc -b"}, diagnostics.Build_a_composite_project_in_the_working_directory)
	example([]string{"tsc --init"}, diagnostics.Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory)
	example([]string{"tsc -p ./path/to/tsconfig.json"}, diagnostics.Compiles_the_TypeScript_project_located_at_the_specified_path)
	example([]string{"tsc --help --all"}, diagnostics.An_expanded_version_of_this_information_showing_all_possible_compiler_options)
	example([]string{"tsc --noEmit", "tsc --target esnext"}, diagnostics.Compiles_the_current_project_with_additional_settings)

	var cliCommands []*tsoptions.CommandLineOption
	var configOpts []*tsoptions.CommandLineOption
	for _, opt := range simpleOptions {
		if opt.IsCommandLineOnly || opt.Category == diagnostics.Command_line_Options {
			cliCommands = append(cliCommands, opt)
		} else {
			configOpts = append(configOpts, opt)
		}
	}

	output = append(output, generateSectionOptionsOutput(sys, diagnostics.COMMAND_LINE_FLAGS.Format(), cliCommands /*subCategory*/, false /*beforeOptionsDescription*/, nil /*afterOptionsDescription*/, nil)...)

	after := diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0.Format("https://aka.ms/tsc")
	output = append(output, generateSectionOptionsOutput(sys, diagnostics.COMMON_COMPILER_OPTIONS.Format(), configOpts /*subCategory*/, false /*beforeOptionsDescription*/, nil,
		// !!! locale formatMessage(Diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, "https://aka.ms/tsc")),
		&after)...)

	for _, chunk := range output {
		fmt.Fprint(sys.Writer(), chunk)
	}
	sys.EndWrite()
}

func generateSectionOptionsOutput(
	sys System,
	sectionName string,
	options []*tsoptions.CommandLineOption,
	subCategory bool,
	beforeOptionsDescription,
	afterOptionsDescription *string,
) (output []string) {
	// !!! color
	output = append(output /*createColors(sys).bold(*/, sectionName /*)*/, sys.NewLine(), sys.NewLine())

	if beforeOptionsDescription != nil {
		output = append(output, *beforeOptionsDescription, sys.NewLine(), sys.NewLine())
	}
	if !subCategory {
		output = append(output, generateGroupOptionOutput(sys, options)...)
		if afterOptionsDescription != nil {
			output = append(output, *afterOptionsDescription, sys.NewLine(), sys.NewLine())
		}
		return output
	}
	categoryMap := make(map[string][]*tsoptions.CommandLineOption)
	for _, option := range options {
		if option.Category == nil {
			continue
		}
		curCategory := option.Category.Format()
		categoryMap[curCategory] = append(categoryMap[curCategory], option)
	}
	for key, value := range categoryMap {
		output = append(output, "### ", key, sys.NewLine(), sys.NewLine())
		output = append(output, generateGroupOptionOutput(sys, value)...)
	}
	if afterOptionsDescription != nil {
		output = append(output, *afterOptionsDescription, sys.NewLine(), sys.NewLine())
	}

	return output
}

func generateGroupOptionOutput(sys System, optionsList []*tsoptions.CommandLineOption) []string {
	var maxLength int
	for _, option := range optionsList {
		curLenght := len(getDisplayNameTextOfOption(option))
		maxLength = max(curLenght, maxLength)
	}

	// left part should be right align, right part should be left align

	// assume 2 space between left margin and left part.
	rightAlignOfLeftPart := maxLength + 2
	// assume 2 space between left and right part
	leftAlignOfRightPart := rightAlignOfLeftPart + 2

	var lines []string
	for _, option := range optionsList {
		tmp := generateOptionOutput(sys, option, rightAlignOfLeftPart, leftAlignOfRightPart)
		lines = append(lines, tmp...)
	}

	// make sure always a blank line in the end.
	if len(lines) < 2 || lines[len(lines)-2] != sys.NewLine() {
		lines = append(lines, sys.NewLine())
	}

	return lines
}

func generateOptionOutput(
	sys System,
	option *tsoptions.CommandLineOption,
	rightAlignOfLeftPart, leftAlignOfRightPart int,
) []string {
	var text []string
	// !!! const colors = createColors(sys);

	// name and description
	name := getDisplayNameTextOfOption(option)

	// value type and possible value
	valueCandidates := getValueCandidate(option)

	var defaultValueDescription string
	if msg, ok := option.DefaultValueDescription.(*diagnostics.Message); ok && msg != nil {
		defaultValueDescription = msg.Format()
	} else {
		defaultValueDescription = formatDefaultValue(
			option.DefaultValueDescription,
			core.IfElse(
				option.Kind == tsoptions.CommandLineOptionTypeList || option.Kind == tsoptions.CommandLineOptionTypeListOrElement,
				option.Elements(), option,
			),
		)
	}

	var terminalWidth int
	// !!! const terminalWidth = sys.getWidthOfTerminal?.() ?? 0;

	// Note: child_process might return `terminalWidth` as undefined.
	if terminalWidth >= 80 {
		// !!!     let description = "";
		// !!!     if (option.description) {
		// !!!         description = getDiagnosticText(option.description);
		// !!!     }
		// !!!     text.push(...getPrettyOutput(name, description, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ true), sys.newLine);
		// !!!     if (showAdditionalInfoOutput(valueCandidates, option)) {
		// !!!         if (valueCandidates) {
		// !!!             text.push(...getPrettyOutput(valueCandidates.valueType, valueCandidates.possibleValues, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ false), sys.newLine);
		// !!!         }
		// !!!         if (defaultValueDescription) {
		// !!!             text.push(...getPrettyOutput(getDiagnosticText(Diagnostics.default_Colon), defaultValueDescription, rightAlignOfLeft, leftAlignOfRight, terminalWidth, /*colorLeft*/ false), sys.newLine);
		// !!!         }
		// !!!     }
		// !!!     text.push(sys.newLine);
	} else {
		text = append(text /* !!! colors.blue(name) */, name, sys.NewLine())
		if option.Description != nil {
			text = append(text, option.Description.Format())
		}
		text = append(text, sys.NewLine())
		if showAdditionalInfoOutput(valueCandidates, option) {
			if valueCandidates != nil {
				text = append(text, valueCandidates.valueType, " ", valueCandidates.possibleValues)
			}
			if defaultValueDescription != "" {
				if valueCandidates != nil {
					text = append(text, sys.NewLine())
				}
				text = append(text, diagnostics.X_default_Colon.Format(), " ", defaultValueDescription)
			}

			text = append(text, sys.NewLine())
		}
		text = append(text, sys.NewLine())
	}

	return text
}

func formatDefaultValue(defaultValue any, option *tsoptions.CommandLineOption) string {
	if defaultValue == nil || defaultValue == core.TSUnknown {
		return "undefined"
	}

	if option.Kind == tsoptions.CommandLineOptionTypeEnum {
		// e.g. ScriptTarget.ES2015 -> "es6/es2015"
		var names []string
		for name, value := range option.EnumMap().Entries() {
			if value == defaultValue {
				names = append(names, name)
			}
		}
		return strings.Join(names, "/")
	}
	return fmt.Sprintf("%v", defaultValue)
}

type valueCandidate struct {
	// "one or more" or "any of"
	valueType      string
	possibleValues string
}

func showAdditionalInfoOutput(valueCandidates *valueCandidate, option *tsoptions.CommandLineOption) bool {
	if option.Category == diagnostics.Command_line_Options {
		return false
	}
	if valueCandidates != nil && valueCandidates.possibleValues == "string" &&
		(option.DefaultValueDescription == nil ||
			option.DefaultValueDescription == "false" ||
			option.DefaultValueDescription == "n/a") {
		return false
	}
	return true
}

func getValueCandidate(option *tsoptions.CommandLineOption) *valueCandidate {
	// option.type might be "string" | "number" | "boolean" | "object" | "list" | Map<string, number | string>
	// string -- any of: string
	// number -- any of: number
	// boolean -- any of: boolean
	// object -- null
	// list -- one or more: , content depends on `option.element.type`, the same as others
	// Map<string, number | string> -- any of: key1, key2, ....
	if option.Kind == tsoptions.CommandLineOptionTypeObject {
		return nil
	}

	res := &valueCandidate{}
	if option.Kind == tsoptions.CommandLineOptionTypeListOrElement {
		// assert(option.type !== "listOrElement")
		panic("no value candidate for list or element")
	}

	switch option.Kind {
	case tsoptions.CommandLineOptionTypeString,
		tsoptions.CommandLineOptionTypeNumber,
		tsoptions.CommandLineOptionTypeBoolean:
		res.valueType = diagnostics.X_type_Colon.Format()
	case tsoptions.CommandLineOptionTypeList:
		res.valueType = diagnostics.X_one_or_more_Colon.Format()
	default:
		res.valueType = diagnostics.X_one_of_Colon.Format()
	}

	res.possibleValues = getPossibleValues(option)

	return res
}

func getPossibleValues(option *tsoptions.CommandLineOption) string {
	switch option.Kind {
	case tsoptions.CommandLineOptionTypeString,
		tsoptions.CommandLineOptionTypeNumber,
		tsoptions.CommandLineOptionTypeBoolean:
		return string(option.Kind)
	case tsoptions.CommandLineOptionTypeList,
		tsoptions.CommandLineOptionTypeListOrElement:
		return getPossibleValues(option.Elements())
	case tsoptions.CommandLineOptionTypeObject:
		return ""
	default:
		// Map<string, number | string>
		// Group synonyms: es6/es2015
		enumMap := option.EnumMap()
		inverted := collections.NewOrderedMapWithSizeHint[any, []string](enumMap.Size())
		deprecatedKeys := option.DeprecatedKeys()

		for name, value := range enumMap.Entries() {
			if deprecatedKeys == nil || !deprecatedKeys.Has(name) {
				inverted.Set(value, append(inverted.GetOrZero(value), name))
			}
		}
		var syns []string
		for synonyms := range inverted.Values() {
			syns = append(syns, strings.Join(synonyms, "/"))
		}
		return strings.Join(syns, ", ")
	}
}

func getDisplayNameTextOfOption(option *tsoptions.CommandLineOption) string {
	return "--" + option.Name + core.IfElse(option.ShortName != "", ", -"+option.ShortName, "")
}
