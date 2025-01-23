package tsoptions

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
)

type DidYouMeanOptionsDiagnostics struct {
	alternateMode               *AlternateModeDiagnostics
	OptionDeclarations          []*CommandLineOption
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

var CompilerOptionsDidYouMeanDiagnostics = getParseCommandLineWorkerDiagnostics(optionsDeclarations)

func getParseCommandLineWorkerDiagnostics(decls []*CommandLineOption) *ParseCommandLineWorkerDiagnostics {
	// todo watch, build
	// this currently will only return the correct diagnostics for `compiler` mode
	return &ParseCommandLineWorkerDiagnostics{
		didYouMean: DidYouMeanOptionsDiagnostics{
			alternateMode: &AlternateModeDiagnostics{
				diagnostic:     diagnostics.Compiler_option_0_may_only_be_used_with_build,
				optionsNameMap: GetNameMapFromList(optionsForBuild),
			},
			OptionDeclarations:          decls,
			UnknownOptionDiagnostic:     diagnostics.Unknown_compiler_option_0,
			UnknownDidYouMeanDiagnostic: diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
		},
		optionsNameMap:               nil,
		OptionTypeMismatchDiagnostic: diagnostics.Compiler_option_0_expects_an_argument,
	}
}
