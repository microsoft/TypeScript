package compiler

import (
	"cmp"
	"iter"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileLoader struct {
	host            CompilerHost
	programOptions  ProgramOptions
	compilerOptions *core.CompilerOptions

	resolver             *module.Resolver
	resolvedModulesMutex sync.Mutex
	resolvedModules      map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]

	sourceFileMetaDatasMutex sync.RWMutex
	sourceFileMetaDatas      map[tspath.Path]*ast.SourceFileMetaData

	mu                      sync.Mutex
	wg                      core.WorkGroup
	tasksByFileName         map[string]*parseTask
	currentNodeModulesDepth int
	defaultLibraryPath      string
	comparePathsOptions     tspath.ComparePathsOptions
	rootTasks               []*parseTask
	supportedExtensions     []string
}

func processAllProgramFiles(
	host CompilerHost,
	programOptions ProgramOptions,
	compilerOptions *core.CompilerOptions,
	resolver *module.Resolver,
	rootFiles []string,
	libs []string,
) (files []*ast.SourceFile, resolvedModules map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule], sourceFileMetaDatas map[tspath.Path]*ast.SourceFileMetaData) {
	supportedExtensions := tsoptions.GetSupportedExtensions(compilerOptions, nil /*extraFileExtensions*/)
	loader := fileLoader{
		host:               host,
		programOptions:     programOptions,
		compilerOptions:    compilerOptions,
		resolver:           resolver,
		tasksByFileName:    make(map[string]*parseTask),
		defaultLibraryPath: tspath.GetNormalizedAbsolutePath(host.DefaultLibraryPath(), host.GetCurrentDirectory()),
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},
		wg:                  core.NewWorkGroup(programOptions.SingleThreaded),
		rootTasks:           make([]*parseTask, 0, len(rootFiles)+len(libs)),
		supportedExtensions: core.Flatten(tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions)),
	}

	loader.addRootTasks(rootFiles, false)
	loader.addRootTasks(libs, true)
	loader.addAutomaticTypeDirectiveTasks()

	loader.startTasks(loader.rootTasks)

	loader.wg.RunAndWait()

	files, libFiles := []*ast.SourceFile{}, []*ast.SourceFile{}
	for task := range loader.collectTasks(loader.rootTasks) {
		if task.isLib {
			libFiles = append(libFiles, task.file)
		} else {
			files = append(files, task.file)
		}
	}
	loader.sortLibs(libFiles)

	return append(libFiles, files...), loader.resolvedModules, loader.sourceFileMetaDatas
}

func (p *fileLoader) addRootTasks(files []string, isLib bool) {
	for _, fileName := range files {
		absPath := tspath.GetNormalizedAbsolutePath(fileName, p.host.GetCurrentDirectory())
		if core.Tristate.IsTrue(p.compilerOptions.AllowNonTsExtensions) || slices.Contains(p.supportedExtensions, tspath.TryGetExtensionFromPath(absPath)) {
			p.rootTasks = append(p.rootTasks, &parseTask{normalizedFilePath: absPath, isLib: isLib})
		}
	}
}

func (p *fileLoader) addAutomaticTypeDirectiveTasks() {
	var containingDirectory string
	if p.compilerOptions.ConfigFilePath != "" {
		containingDirectory = tspath.GetDirectoryPath(p.compilerOptions.ConfigFilePath)
	} else {
		containingDirectory = p.host.GetCurrentDirectory()
	}
	containingFileName := tspath.CombinePaths(containingDirectory, module.InferredTypesContainingFile)

	automaticTypeDirectiveNames := module.GetAutomaticTypeDirectiveNames(p.compilerOptions, p.host)
	for _, name := range automaticTypeDirectiveNames {
		resolved := p.resolver.ResolveTypeReferenceDirective(name, containingFileName, core.ModuleKindNodeNext, nil)
		if resolved.IsResolved() {
			p.rootTasks = append(p.rootTasks, &parseTask{normalizedFilePath: resolved.ResolvedFileName, isLib: false})
		}
	}
}

func (p *fileLoader) startTasks(tasks []*parseTask) {
	if len(tasks) > 0 {
		p.mu.Lock()
		defer p.mu.Unlock()
		for i, task := range tasks {
			// dedup tasks to ensure correct file order, regardless of which task would be started first
			if existingTask, ok := p.tasksByFileName[task.normalizedFilePath]; ok {
				tasks[i] = existingTask
			} else {
				p.tasksByFileName[task.normalizedFilePath] = task
				task.start(p)
			}
		}
	}
}

func (p *fileLoader) collectTasks(tasks []*parseTask) iter.Seq[*parseTask] {
	return func(yield func(*parseTask) bool) {
		p.collectTasksWorker(tasks, yield)
	}
}

func (p *fileLoader) collectTasksWorker(tasks []*parseTask, yield func(*parseTask) bool) bool {
	for _, task := range tasks {
		if _, ok := p.tasksByFileName[task.normalizedFilePath]; ok {
			// ensure we only walk each task once
			delete(p.tasksByFileName, task.normalizedFilePath)

			if len(task.subTasks) > 0 {
				if !p.collectTasksWorker(task.subTasks, yield) {
					return false
				}
			}

			if task.file != nil {
				if !yield(task) {
					return false
				}
			}
		}
	}
	return true
}

func (p *fileLoader) sortLibs(libFiles []*ast.SourceFile) {
	slices.SortFunc(libFiles, func(f1 *ast.SourceFile, f2 *ast.SourceFile) int {
		return cmp.Compare(p.getDefaultLibFilePriority(f1), p.getDefaultLibFilePriority(f2))
	})
}

func (p *fileLoader) getDefaultLibFilePriority(a *ast.SourceFile) int {
	// defaultLibraryPath and a.FileName() are absolute and normalized; a prefix check should suffice.
	defaultLibraryPath := tspath.RemoveTrailingDirectorySeparator(p.defaultLibraryPath)
	aFileName := a.FileName()

	if strings.HasPrefix(aFileName, defaultLibraryPath) && len(aFileName) > len(defaultLibraryPath) && aFileName[len(defaultLibraryPath)] == tspath.DirectorySeparator {
		// avoid tspath.GetBaseFileName; we know these paths are already absolute and normalized.
		basename := aFileName[strings.LastIndexByte(aFileName, tspath.DirectorySeparator)+1:]
		if basename == "lib.d.ts" || basename == "lib.es6.d.ts" {
			return 0
		}
		name := strings.TrimSuffix(strings.TrimPrefix(basename, "lib."), ".d.ts")
		index := slices.Index(tsoptions.Libs, name)
		if index != -1 {
			return index + 1
		}
	}
	return len(tsoptions.Libs) + 2
}

type parseTask struct {
	normalizedFilePath string
	file               *ast.SourceFile
	isLib              bool
	subTasks           []*parseTask
}

func (t *parseTask) start(loader *fileLoader) {
	loader.wg.Queue(func() {
		file := loader.parseSourceFile(t.normalizedFilePath)

		// !!! if noResolve, skip all of this
		t.subTasks = make([]*parseTask, 0, len(file.ReferencedFiles)+len(file.Imports)+len(file.ModuleAugmentations))

		for _, ref := range file.ReferencedFiles {
			resolvedPath := loader.resolveTripleslashPathReference(ref.FileName, file.FileName())
			t.addSubTask(resolvedPath, false)
		}

		for _, ref := range file.TypeReferenceDirectives {
			resolved := loader.resolver.ResolveTypeReferenceDirective(ref.FileName, file.FileName(), core.ModuleKindCommonJS /* !!! */, nil)
			if resolved.IsResolved() {
				t.addSubTask(resolved.ResolvedFileName, false)
			}
		}

		if loader.compilerOptions.NoLib != core.TSTrue {
			for _, lib := range file.LibReferenceDirectives {
				name, ok := tsoptions.GetLibFileName(lib.FileName)
				if !ok {
					continue
				}
				t.addSubTask(tspath.CombinePaths(loader.defaultLibraryPath, name), true)
			}
		}

		for _, imp := range loader.resolveImportsAndModuleAugmentations(file) {
			t.addSubTask(imp, false)
		}

		t.file = file
		loader.startTasks(t.subTasks)
	})
}

func (p *fileLoader) loadSourceFileMetaData(path tspath.Path) {
	p.sourceFileMetaDatasMutex.RLock()
	_, ok := p.sourceFileMetaDatas[path]
	p.sourceFileMetaDatasMutex.RUnlock()
	if ok {
		return
	}

	packageJsonType := p.resolver.GetPackageJsonTypeIfApplicable(string(path))
	impliedNodeFormat := ast.GetImpliedNodeFormatForFile(string(path), packageJsonType)
	metadata := &ast.SourceFileMetaData{
		PackageJsonType:   packageJsonType,
		ImpliedNodeFormat: impliedNodeFormat,
	}

	p.sourceFileMetaDatasMutex.Lock()
	defer p.sourceFileMetaDatasMutex.Unlock()
	if p.sourceFileMetaDatas == nil {
		p.sourceFileMetaDatas = make(map[tspath.Path]*ast.SourceFileMetaData)
	}
	p.sourceFileMetaDatas[path] = metadata
}

func (p *fileLoader) parseSourceFile(fileName string) *ast.SourceFile {
	path := tspath.ToPath(fileName, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	sourceFile := p.host.GetSourceFile(fileName, path, p.compilerOptions.GetEmitScriptTarget())
	p.loadSourceFileMetaData(path)
	return sourceFile
}

func (t *parseTask) addSubTask(fileName string, isLib bool) {
	normalizedFilePath := tspath.NormalizePath(fileName)
	t.subTasks = append(t.subTasks, &parseTask{normalizedFilePath: normalizedFilePath, isLib: isLib})
}

func (p *fileLoader) resolveTripleslashPathReference(moduleName string, containingFile string) string {
	basePath := tspath.GetDirectoryPath(containingFile)
	referencedFileName := moduleName

	if !tspath.IsRootedDiskPath(moduleName) {
		referencedFileName = tspath.CombinePaths(basePath, moduleName)
	}
	return tspath.NormalizePath(referencedFileName)
}

func (p *fileLoader) resolveImportsAndModuleAugmentations(file *ast.SourceFile) []string {
	toParse := make([]string, 0, len(file.Imports))
	if len(file.Imports) > 0 || len(file.ModuleAugmentations) > 0 {
		moduleNames := getModuleNames(file)
		resolutions := p.resolveModuleNames(moduleNames, file)

		resolutionsInFile := make(module.ModeAwareCache[*module.ResolvedModule], len(resolutions))

		p.resolvedModulesMutex.Lock()
		defer p.resolvedModulesMutex.Unlock()
		if p.resolvedModules == nil {
			p.resolvedModules = make(map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule])
		}
		p.resolvedModules[file.Path()] = resolutionsInFile

		for i, resolution := range resolutions {
			resolvedFileName := resolution.ResolvedFileName
			// TODO(ercornel): !!!: check if from node modules

			mode := core.ModuleKindCommonJS // !!!
			resolutionsInFile[module.ModeAwareCacheKey{Name: moduleNames[i].Text(), Mode: mode}] = resolution

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			// const elideImport = isJSFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;

			// Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
			// This may still end up being an untyped module -- the file won't be included but imports will be allowed.
			hasAllowedExtension := false
			if p.compilerOptions.ResolveJsonModule.IsTrue() {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsWithJsonFlat)
			} else {
				hasAllowedExtension = tspath.FileExtensionIsOneOf(resolvedFileName, tspath.SupportedTSExtensionsFlat)
			}
			shouldAddFile := resolution.IsResolved() && hasAllowedExtension
			// TODO(ercornel): !!!: other checks on whether or not to add the file

			if shouldAddFile {
				// p.findSourceFile(resolvedFileName, FileIncludeReason{Import, 0})
				toParse = append(toParse, resolvedFileName)
			}
		}
	}
	return toParse
}

func (p *fileLoader) resolveModuleNames(entries []*ast.Node, file *ast.SourceFile) []*module.ResolvedModule {
	if len(entries) == 0 {
		return nil
	}

	resolvedModules := make([]*module.ResolvedModule, 0, len(entries))

	for _, entry := range entries {
		moduleName := entry.Text()
		if moduleName == "" {
			continue
		}
		resolvedModule := p.resolver.ResolveModuleName(moduleName, file.FileName(), core.ModuleKindCommonJS /* !!! */, nil)
		resolvedModules = append(resolvedModules, resolvedModule)
	}

	return resolvedModules
}
