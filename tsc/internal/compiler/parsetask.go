package compiler

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type parseTask struct {
	normalizedFilePath string
	path               tspath.Path
	file               *ast.SourceFile
	isLib              bool
	isRedirected       bool
	subTasks           []*parseTask

	metadata                     ast.SourceFileMetaData
	resolutionsInFile            module.ModeAwareCache[*module.ResolvedModule]
	typeResolutionsInFile        module.ModeAwareCache[*module.ResolvedTypeReferenceDirective]
	importHelpersImportSpecifier *ast.Node
	jsxRuntimeImportSpecifier    *jsxRuntimeImportSpecifier
}

func (t *parseTask) FileName() string {
	return t.normalizedFilePath
}

func (t *parseTask) Path() tspath.Path {
	return t.path
}

func (t *parseTask) start(loader *fileLoader) {
	t.path = loader.toPath(t.normalizedFilePath)
	redirect := loader.projectReferenceFileMapper.getParseFileRedirect(t)
	if redirect != "" {
		t.redirect(loader, redirect)
		return
	}

	loader.totalFileCount.Add(1)
	if t.isLib {
		loader.libFileCount.Add(1)
	}

	t.metadata = loader.loadSourceFileMetaData(t.normalizedFilePath)
	file := loader.parseSourceFile(t)
	if file == nil {
		return
	}

	t.file = file

	// !!! if noResolve, skip all of this
	t.subTasks = make([]*parseTask, 0, len(file.ReferencedFiles)+len(file.Imports())+len(file.ModuleAugmentations))

	for _, ref := range file.ReferencedFiles {
		resolvedPath := loader.resolveTripleslashPathReference(ref.FileName, file.FileName())
		t.addSubTask(resolvedPath, false)
	}

	compilerOptions := loader.opts.Config.CompilerOptions()
	toParseTypeRefs, typeResolutionsInFile := loader.resolveTypeReferenceDirectives(file, t.metadata)
	t.typeResolutionsInFile = typeResolutionsInFile
	for _, typeResolution := range toParseTypeRefs {
		t.addSubTask(typeResolution, false)
	}

	if compilerOptions.NoLib != core.TSTrue {
		for _, lib := range file.LibReferenceDirectives {
			name, ok := tsoptions.GetLibFileName(lib.FileName)
			if !ok {
				continue
			}
			t.addSubTask(tspath.CombinePaths(loader.defaultLibraryPath, name), true)
		}
	}

	toParse, resolutionsInFile, importHelpersImportSpecifier, jsxRuntimeImportSpecifier := loader.resolveImportsAndModuleAugmentations(file, t.metadata)
	for _, imp := range toParse {
		t.addSubTask(imp, false)
	}

	t.resolutionsInFile = resolutionsInFile
	t.importHelpersImportSpecifier = importHelpersImportSpecifier
	t.jsxRuntimeImportSpecifier = jsxRuntimeImportSpecifier
}

func (t *parseTask) redirect(loader *fileLoader, fileName string) {
	t.isRedirected = true
	t.subTasks = []*parseTask{{normalizedFilePath: tspath.NormalizePath(fileName), isLib: t.isLib}}
}

func (t *parseTask) addSubTask(fileName string, isLib bool) {
	normalizedFilePath := tspath.NormalizePath(fileName)
	t.subTasks = append(t.subTasks, &parseTask{normalizedFilePath: normalizedFilePath, isLib: isLib})
}

func getSubTasksOfParseTask(t *parseTask) []*parseTask {
	return t.subTasks
}
