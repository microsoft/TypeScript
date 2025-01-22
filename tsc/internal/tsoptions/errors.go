package tsoptions

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func createDiagnosticForInvalidEnumType(opt *CommandLineOption) *ast.Diagnostic {
	namesOfType := slices.Collect(opt.EnumMap().Keys())
	stringNames := ""
	if opt.DeprecatedKeys() != nil {
		stringNames = formatEnumTypeKeys(core.Filter(namesOfType, func(k string) bool { return opt.DeprecatedKeys().Has(k) }))
	} else {
		stringNames = formatEnumTypeKeys(namesOfType)
	}
	optName := "--" + opt.Name
	return ast.NewCompilerDiagnostic(diagnostics.Argument_for_0_option_must_be_Colon_1, optName, stringNames)
}

func formatEnumTypeKeys(keys []string) string {
	var output strings.Builder

	fmt.Fprintf(&output, "Invalid custom type: '%s'", keys[0])
	for _, key := range keys[1:] {
		fmt.Fprintf(&output, ", '%s'", key)
	}

	return output.String()
}

func getCompilerOptionValueTypeString(option *CommandLineOption) string {
	switch option.Kind {
	case CommandLineOptionTypeListOrElement:
		return fmt.Sprintf("%v or Array", getCompilerOptionValueTypeString(option.Elements()))
	case CommandLineOptionTypeList:
		return "Array"
	default:
		return string(option.Kind)
	}
}

func (parser *CommandLineParser) createUnknownOptionError(
	unknownOption string,
	unknownOptionErrorText string,
	node *ast.Node,
	sourceFile *ast.SourceFile, // todo: TsConfigSourceFile,
) *ast.Diagnostic {
	errorLoc := parser.errorLoc
	if node != nil {
		errorLoc = node.Loc
	}
	alternateMode := parser.AlternateMode()

	if alternateMode != nil && alternateMode.optionsNameMap != nil {
		otherOption := alternateMode.optionsNameMap.Get(strings.ToLower(unknownOption))
		if otherOption != nil {
			// tscbuildoption
			if otherOption.Name == "build" {
				return ast.NewDiagnostic(
					sourceFile,
					errorLoc,
					diagnostics.Option_build_must_be_the_first_command_line_argument,
					unknownOption,
				)
			} else {
				return ast.NewDiagnostic(
					sourceFile,
					errorLoc,
					alternateMode.diagnostic,
					unknownOption,
				)
			}
		}
	}
	if unknownOptionErrorText == "" {
		unknownOptionErrorText = unknownOption
	}
	// TODO: possibleOption := spelling suggestion
	return ast.NewDiagnostic(sourceFile, errorLoc, parser.UnknownOptionDiagnostic(), unknownOptionErrorText)
}

func createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile *ast.SourceFile, node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	if sourceFile != nil && node != nil {
		return ast.NewDiagnostic(sourceFile, core.NewTextRange(scanner.SkipTrivia(sourceFile.Text, node.Loc.Pos()), node.End()), message, args...)
	}
	return ast.NewCompilerDiagnostic(message, args...)
}
