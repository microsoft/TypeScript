package incremental

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func GetAllDependencies(program *compiler.Program, checker *checker.Checker, file *ast.SourceFile) []*ast.SourceFile {
	files := program.GetSourceFiles()
	if !fileAffectsGlobalScope(file) {
		seen := collections.Set[tspath.PathKey]{}
		queue := []tspath.PathKey{file.PathKey()}
		for len(queue) > 0 {
			path := queue[len(queue)-1]
			queue = queue[:len(queue)-1]
			current := program.GetSourceFileByPath(path)
			if current == nil || !seen.AddIfAbsent(current.PathKey()) {
				continue
			}
			if references := getReferencedFilesWithChecker(program, checker, current); references != nil {
				for reference := range references.Keys() {
					queue = append(queue, reference)
				}
			}
		}
		files = core.Filter(files, func(f *ast.SourceFile) bool {
			return seen.Has(f.PathKey())
		})
	}
	dependencies := make([]*ast.SourceFile, 0, len(files))
	dependencies = append(dependencies, file)
	for _, f := range files {
		if f != file {
			dependencies = append(dependencies, f)
		}
	}
	return dependencies
}
