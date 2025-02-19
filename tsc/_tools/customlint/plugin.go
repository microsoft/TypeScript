package customlint

import (
	"github.com/golangci/plugin-module-register/register"
	"golang.org/x/tools/go/analysis"
)

func init() {
	register.Plugin("customlint", func(conf any) (register.LinterPlugin, error) {
		return &plugin{}, nil
	})
}

type plugin struct{}

func (f *plugin) BuildAnalyzers() ([]*analysis.Analyzer, error) {
	return []*analysis.Analyzer{
		emptyCaseAnalyzer,
		shadowAnalyzer,
	}, nil
}

func (f *plugin) GetLoadMode() string {
	return register.LoadModeSyntax
}
