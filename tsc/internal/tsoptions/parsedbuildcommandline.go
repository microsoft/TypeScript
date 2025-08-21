package tsoptions

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ParsedBuildCommandLine struct {
	BuildOptions    *core.BuildOptions    `json:"buildOptions"`
	CompilerOptions *core.CompilerOptions `json:"compilerOptions"`
	WatchOptions    *core.WatchOptions    `json:"watchOptions"`
	Projects        []string              `json:"projects"`
	Errors          []*ast.Diagnostic     `json:"errors"`

	comparePathsOptions tspath.ComparePathsOptions

	resolvedProjectPaths     []string
	resolvedProjectPathsOnce sync.Once
}

func (p *ParsedBuildCommandLine) ResolvedProjectPaths() []string {
	p.resolvedProjectPathsOnce.Do(func() {
		p.resolvedProjectPaths = core.Map(p.Projects, func(project string) string {
			return core.ResolveConfigFileNameOfProjectReference(
				tspath.ResolvePath(p.comparePathsOptions.CurrentDirectory, project),
			)
		})
	})
	return p.resolvedProjectPaths
}
