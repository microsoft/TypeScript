package tsc

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tsoptions"
)

func PrintVersion(sys System) {
	fmt.Fprintln(sys.Writer(), diagnostics.Version_0.Format(core.Version()))
}

func PrintHelp(sys System, commandLine *tsoptions.ParsedCommandLine) {
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
	colors := createColors(sys)
	header := make([]string, 0, 3)
	terminalWidth := sys.GetWidthOfTerminal()
	const tsIcon = "     "
	const tsIconTS = "  TS "
	const tsIconLength = len(tsIcon)

	tsIconFirstLine := colors.blueBackground(tsIcon)
	tsIconSecondLine := colors.blueBackground(colors.brightWhite(tsIconTS))
	// If we have enough space, print TS icon.
	if terminalWidth >= len(message)+tsIconLength {
		// right align of the icon is 120 at most.
		rightAlign := core.IfElse(terminalWidth > 120, 120, terminalWidth)
		leftAlign := rightAlign - tsIconLength
		header = append(header, fmt.Sprintf("%-*s", leftAlign, message), tsIconFirstLine, "\n")
		header = append(header, strings.Repeat(" ", leftAlign), tsIconSecondLine, "\n")
	} else {
		header = append(header, message, "\n", "\n")
	}
	return header
}

func printEasyHelp(sys System, simpleOptions []*tsoptions.CommandLineOption) {
	colors := createColors(sys)
	var output []string
	example := func(examples []string, desc *diagnostics.Message) {
		for _, example := range examples {
			output = append(output, "  ", colors.blue(example), "\n")
		}
		output = append(output, "  ", desc.Format(), "\n", "\n")
	}

	msg := diagnostics.X_tsc_Colon_The_TypeScript_Compiler.Format() + " - " + diagnostics.Version_0.Format(core.Version())
	output = append(output, getHeader(sys, msg)...)

	output = append(output, colors.bold(diagnostics.COMMON_COMMANDS.Format()), "\n", "\n")

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

	// !!! locale formatMessage
	after := diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0.Format("https://aka.ms/tsc")
	output = append(output, generateSectionOptionsOutput(sys, diagnostics.COMMON_COMPILER_OPTIONS.Format(), configOpts /*subCategory*/, false /*beforeOptionsDescription*/, nil, &after)...)

	for _, chunk := range output {
		fmt.Fprint(sys.Writer(), chunk)
	}
}

func PrintBuildHelp(sys System, buildOptions []*tsoptions.CommandLineOption) {
	var output []string
	output = append(output, getHeader(sys, diagnostics.X_tsc_Colon_The_TypeScript_Compiler.Format()+" - "+diagnostics.Version_0.Format(core.Version()))...)
	before := diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0.Format("https://aka.ms/tsc-composite-builds")
	options := core.Filter(buildOptions, func(option *tsoptions.CommandLineOption) bool {
		return option != &tsoptions.TscBuildOption
	})
	output = append(output, generateSectionOptionsOutput(sys, diagnostics.BUILD_OPTIONS.Format(), options, false, &before, nil)...)

	for _, chunk := range output {
		fmt.Fprint(sys.Writer(), chunk)
	}
}

func generateSectionOptionsOutput(
	sys System,
	sectionName string,
	options []*tsoptions.CommandLineOption,
	subCategory bool,
	beforeOptionsDescription,
	afterOptionsDescription *string,
) (output []string) {
	output = append(output, createColors(sys).bold(sectionName), "\n", "\n")

	if beforeOptionsDescription != nil {
		output = append(output, *beforeOptionsDescription, "\n", "\n")
	}
	if !subCategory {
		output = append(output, generateGroupOptionOutput(sys, options)...)
		if afterOptionsDescription != nil {
			output = append(output, *afterOptionsDescription, "\n", "\n")
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
		output = append(output, "### ", key, "\n", "\n")
		output = append(output, generateGroupOptionOutput(sys, value)...)
	}
	if afterOptionsDescription != nil {
		output = append(output, *afterOptionsDescription, "\n", "\n")
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
	if len(lines) < 2 || lines[len(lines)-2] != "\n" {
		lines = append(lines, "\n")
	}

	return lines
}

func generateOptionOutput(
	sys System,
	option *tsoptions.CommandLineOption,
	rightAlignOfLeft, leftAlignOfRight int,
) []string {
	var text []string
	colors := createColors(sys)

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

	terminalWidth := sys.GetWidthOfTerminal()

	if terminalWidth >= 80 {
		description := ""
		if option.Description != nil {
			description = option.Description.Format()
		}
		text = append(text, getPrettyOutput(colors, name, description, rightAlignOfLeft, leftAlignOfRight, terminalWidth, true /*colorLeft*/)...)
		text = append(text, "\n")
		if showAdditionalInfoOutput(valueCandidates, option) {
			if valueCandidates != nil {
				text = append(text, getPrettyOutput(colors, valueCandidates.valueType, valueCandidates.possibleValues, rightAlignOfLeft, leftAlignOfRight, terminalWidth, false /*colorLeft*/)...)
				text = append(text, "\n")
			}
			if defaultValueDescription != "" {
				text = append(text, getPrettyOutput(colors, diagnostics.X_default_Colon.Format(), defaultValueDescription, rightAlignOfLeft, leftAlignOfRight, terminalWidth, false /*colorLeft*/)...)
				text = append(text, "\n")
			}
		}
		text = append(text, "\n")
	} else {
		text = append(text, colors.blue(name), "\n")
		if option.Description != nil {
			text = append(text, option.Description.Format())
		}
		text = append(text, "\n")
		if showAdditionalInfoOutput(valueCandidates, option) {
			if valueCandidates != nil {
				text = append(text, valueCandidates.valueType, " ", valueCandidates.possibleValues)
			}
			if defaultValueDescription != "" {
				if valueCandidates != nil {
					text = append(text, "\n")
				}
				text = append(text, diagnostics.X_default_Colon.Format(), " ", defaultValueDescription)
			}

			text = append(text, "\n")
		}
		text = append(text, "\n")
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

func getPrettyOutput(colors *colors, left string, right string, rightAlignOfLeft int, leftAlignOfRight int, terminalWidth int, colorLeft bool) []string {
	// !!! How does terminalWidth interact with UTF-8 encoding? Strada just assumed UTF-16.
	res := make([]string, 0, 4)
	isFirstLine := true
	remainRight := right
	rightCharacterNumber := terminalWidth - leftAlignOfRight
	for len(remainRight) > 0 {
		curLeft := ""
		if isFirstLine {
			curLeft = fmt.Sprintf("%*s", rightAlignOfLeft, left)
			curLeft = fmt.Sprintf("%-*s", leftAlignOfRight, curLeft)
			if colorLeft {
				curLeft = colors.blue(curLeft)
			}
		} else {
			curLeft = strings.Repeat(" ", leftAlignOfRight)
		}

		idx := min(rightCharacterNumber, len(remainRight))
		curRight := remainRight[:idx]
		remainRight = remainRight[idx:]
		res = append(res, curLeft, curRight, "\n")
		isFirstLine = false
	}
	return res
}

func getDisplayNameTextOfOption(option *tsoptions.CommandLineOption) string {
	return "--" + option.Name + core.IfElse(option.ShortName != "", ", -"+option.ShortName, "")
}
