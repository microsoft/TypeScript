package tsoptions

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/diagnostics"
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

var CompilerOptionsDidYouMeanDiagnostics = getParseCommandLineWorkerDiagnostics(OptionsDeclarations)

func getParseCommandLineWorkerDiagnostics(decls []*CommandLineOption) *ParseCommandLineWorkerDiagnostics {
	// this will only return the correct diagnostics for `compiler` mode, and is factored into a function for testing reasons.
	return &ParseCommandLineWorkerDiagnostics{
		didYouMean: DidYouMeanOptionsDiagnostics{
			alternateMode: &AlternateModeDiagnostics{
				diagnostic:     diagnostics.Compiler_option_0_may_only_be_used_with_build,
				optionsNameMap: BuildNameMap,
			},
			OptionDeclarations:          decls,
			UnknownOptionDiagnostic:     diagnostics.Unknown_compiler_option_0,
			UnknownDidYouMeanDiagnostic: diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
		},
		OptionTypeMismatchDiagnostic: diagnostics.Compiler_option_0_expects_an_argument,
	}
}

var watchOptionsDidYouMeanDiagnostics = &ParseCommandLineWorkerDiagnostics{
	didYouMean: DidYouMeanOptionsDiagnostics{
		// no alternateMode
		OptionDeclarations:          optionsForWatch,
		UnknownOptionDiagnostic:     diagnostics.Unknown_watch_option_0,
		UnknownDidYouMeanDiagnostic: diagnostics.Unknown_watch_option_0_Did_you_mean_1,
	},
	OptionTypeMismatchDiagnostic: diagnostics.Watch_option_0_requires_a_value_of_type_1,
}

var buildOptionsDidYouMeanDiagnostics = &ParseCommandLineWorkerDiagnostics{
	didYouMean: DidYouMeanOptionsDiagnostics{
		alternateMode: &AlternateModeDiagnostics{
			diagnostic:     diagnostics.Compiler_option_0_may_not_be_used_with_build,
			optionsNameMap: CompilerNameMap,
		},
		OptionDeclarations:          BuildOpts,
		UnknownOptionDiagnostic:     diagnostics.Unknown_build_option_0,
		UnknownDidYouMeanDiagnostic: diagnostics.Unknown_build_option_0_Did_you_mean_1,
	},
	OptionTypeMismatchDiagnostic: diagnostics.Build_option_0_requires_a_value_of_type_1,
}
