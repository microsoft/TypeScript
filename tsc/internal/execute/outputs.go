package execute

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
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
	// !!! if lines[len(lines)-2] != sys.NewLine() {
	// !!! 	lines = append(lines, sys.NewLine())
	// !!! }

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
	// !!! name := getDisplayNameTextOfOption(option)

	// !!!

	return text
}

func getDisplayNameTextOfOption(option *tsoptions.CommandLineOption) string {
	return "--" + option.Name + core.IfElse(option.ShortName != "", ", -"+option.ShortName, "")
}
