package compiler

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type parseTask struct {
	normalizedFilePath          string
	path                        tspath.Path
	file                        *ast.SourceFile
	isLib                       bool
	isRedirected                bool
	subTasks                    []*parseTask
	loaded                      bool
	isForAutomaticTypeDirective bool
	root                        bool

	metadata                     ast.SourceFileMetaData
	resolutionsInFile            module.ModeAwareCache[*module.ResolvedModule]
	typeResolutionsInFile        module.ModeAwareCache[*module.ResolvedTypeReferenceDirective]
	importHelpersImportSpecifier *ast.Node
	jsxRuntimeImportSpecifier    *jsxRuntimeImportSpecifier
	increaseDepth                bool
	elideOnDepth                 bool

	// Track if this file is from an external library (node_modules)
	// This mirrors the TypeScript currentNodeModulesDepth > 0 check
	fromExternalLibrary bool
}

func (t *parseTask) FileName() string {
	return t.normalizedFilePath
}

func (t *parseTask) Path() tspath.Path {
	return t.path
}

func (t *parseTask) load(loader *fileLoader) {
	t.loaded = true
	t.path = loader.toPath(t.normalizedFilePath)
	if t.isForAutomaticTypeDirective {
		t.loadAutomaticTypeDirectives(loader)
		return
	}
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
	t.subTasks = make([]*parseTask, 0, len(file.ReferencedFiles)+len(file.Imports())+len(file.ModuleAugmentations))

	for _, ref := range file.ReferencedFiles {
		resolvedPath := loader.resolveTripleslashPathReference(ref.FileName, file.FileName())
		t.addSubTask(resolvedPath, false)
	}

	compilerOptions := loader.opts.Config.CompilerOptions()
	loader.resolveTypeReferenceDirectives(t)

	if compilerOptions.NoLib != core.TSTrue {
		for _, lib := range file.LibReferenceDirectives {
			if name, ok := tsoptions.GetLibFileName(lib.FileName); ok {
				t.addSubTask(resolvedRef{fileName: loader.pathForLibFile(name)}, true)
			}
		}
	}

	loader.resolveImportsAndModuleAugmentations(t)
}

func (t *parseTask) redirect(loader *fileLoader, fileName string) {
	t.isRedirected = true
	// increaseDepth and elideOnDepth are not copied to redirects, otherwise their depth would be double counted.
	t.subTasks = []*parseTask{{normalizedFilePath: tspath.NormalizePath(fileName), isLib: t.isLib, fromExternalLibrary: t.fromExternalLibrary}}
}

func (t *parseTask) loadAutomaticTypeDirectives(loader *fileLoader) {
	toParseTypeRefs, typeResolutionsInFile := loader.resolveAutomaticTypeDirectives(t.normalizedFilePath)
	t.typeResolutionsInFile = typeResolutionsInFile
	for _, typeResolution := range toParseTypeRefs {
		t.addSubTask(typeResolution, false)
	}
}

type resolvedRef struct {
	fileName              string
	increaseDepth         bool
	elideOnDepth          bool
	isFromExternalLibrary bool
}

func (t *parseTask) addSubTask(ref resolvedRef, isLib bool) {
	normalizedFilePath := tspath.NormalizePath(ref.fileName)
	subTask := &parseTask{
		normalizedFilePath:  normalizedFilePath,
		isLib:               isLib,
		increaseDepth:       ref.increaseDepth,
		elideOnDepth:        ref.elideOnDepth,
		fromExternalLibrary: ref.isFromExternalLibrary,
	}
	t.subTasks = append(t.subTasks, subTask)
}

func (t *parseTask) getSubTasks() []*parseTask {
	return t.subTasks
}

func (t *parseTask) shouldIncreaseDepth() bool {
	return t.increaseDepth
}

func (t *parseTask) shouldElideOnDepth() bool {
	return t.elideOnDepth
}

func (t *parseTask) isLoaded() bool {
	return t.loaded
}

func (t *parseTask) isRoot() bool {
	return t.root
}

func (t *parseTask) isFromExternalLibrary() bool {
	return t.fromExternalLibrary
}

func (t *parseTask) markFromExternalLibrary() {
	t.fromExternalLibrary = true
}
