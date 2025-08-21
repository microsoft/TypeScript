package tsoptions

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func createDiagnosticForInvalidEnumType(opt *CommandLineOption, sourceFile *ast.SourceFile, node *ast.Node) *ast.Diagnostic {
	namesOfType := slices.Collect(opt.EnumMap().Keys())
	stringNames := formatEnumTypeKeys(opt, namesOfType)
	optName := "--" + opt.Name
	return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.Argument_for_0_option_must_be_Colon_1, optName, stringNames)
}

func formatEnumTypeKeys(opt *CommandLineOption, keys []string) string {
	if opt.DeprecatedKeys() != nil {
		keys = core.Filter(keys, func(key string) bool { return !opt.DeprecatedKeys().Has(key) })
	}
	return "'" + strings.Join(keys, "', '") + "'"
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

func (parser *commandLineParser) createUnknownOptionError(
	unknownOption string,
	unknownOptionErrorText string,
	node *ast.Node,
	sourceFile *ast.SourceFile,
) *ast.Diagnostic {
	return createUnknownOptionError(
		unknownOption,
		parser.UnknownOptionDiagnostic(),
		unknownOptionErrorText,
		node,
		sourceFile,
		parser.AlternateMode(),
	)
}

func createUnknownOptionError(
	unknownOption string,
	unknownOptionDiagnostic *diagnostics.Message,
	unknownOptionErrorText string, // optional
	node *ast.Node, // optional
	sourceFile *ast.SourceFile, // optional
	alternateMode *AlternateModeDiagnostics, // optional
) *ast.Diagnostic {
	if alternateMode != nil && alternateMode.optionsNameMap != nil {
		otherOption := alternateMode.optionsNameMap.Get(strings.ToLower(unknownOption))
		if otherOption != nil {
			// tscbuildoption
			diagnostic := alternateMode.diagnostic
			if otherOption.Name == "build" {
				diagnostic = diagnostics.Option_build_must_be_the_first_command_line_argument
			}
			return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostic, unknownOption)
		}
	}
	if unknownOptionErrorText == "" {
		unknownOptionErrorText = unknownOption
	}
	// TODO: possibleOption := spelling suggestion
	return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, unknownOptionDiagnostic, unknownOptionErrorText)
}

func CreateDiagnosticForNodeInSourceFile(sourceFile *ast.SourceFile, node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return ast.NewDiagnostic(sourceFile, core.NewTextRange(scanner.SkipTrivia(sourceFile.Text(), node.Loc.Pos()), node.End()), message, args...)
}

func CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile *ast.SourceFile, node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	if sourceFile != nil && node != nil {
		return CreateDiagnosticForNodeInSourceFile(sourceFile, node, message, args...)
	}
	return ast.NewCompilerDiagnostic(message, args...)
}

func extraKeyDiagnostics(s string) *diagnostics.Message {
	switch s {
	case "compilerOptions":
		return diagnostics.Unknown_compiler_option_0
	case "watchOptions":
		return diagnostics.Unknown_watch_option_0
	case "typeAcquisition":
		return diagnostics.Unknown_type_acquisition_option_0
	case "buildOptions":
		return diagnostics.Unknown_build_option_0
	default:
		return nil
	}
}
