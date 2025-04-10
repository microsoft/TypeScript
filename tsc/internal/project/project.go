package project

import (
	"fmt"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Kind -output=project_stringer_generated.go

var projectNamer = &namer{}

var _ ls.Host = (*Project)(nil)

type Kind int

const (
	KindInferred Kind = iota
	KindConfigured
	KindAutoImportProvider
	KindAuxiliary
)

type ProjectHost interface {
	tsoptions.ParseConfigHost
	NewLine() string
	DefaultLibraryPath() string
	DocumentRegistry() *DocumentRegistry
	GetScriptInfoByPath(path tspath.Path) *ScriptInfo
	GetOrCreateScriptInfoForFile(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo
	OnDiscoveredSymlink(info *ScriptInfo)
	Log(s string)
	PositionEncoding() lsproto.PositionEncodingKind
}

type Project struct {
	host ProjectHost
	mu   sync.Mutex

	name string
	kind Kind

	initialLoadPending        bool
	dirty                     bool
	version                   int
	hasAddedOrRemovedFiles    bool
	hasAddedOrRemovedSymlinks bool
	deferredClose             bool
	reloadConfig              bool

	currentDirectory string
	// Inferred projects only
	rootPath tspath.Path

	configFileName string
	configFilePath tspath.Path
	// rootFileNames was a map from Path to { NormalizedPath, ScriptInfo? } in the original code.
	// But the ProjectService owns script infos, so it's not clear why there was an extra pointer.
	rootFileNames   *collections.OrderedMap[tspath.Path, string]
	compilerOptions *core.CompilerOptions
	languageService *ls.LanguageService
	program         *compiler.Program
}

func NewConfiguredProject(configFileName string, configFilePath tspath.Path, host ProjectHost) *Project {
	project := NewProject(configFileName, KindConfigured, tspath.GetDirectoryPath(configFileName), host)
	project.configFileName = configFileName
	project.configFilePath = configFilePath
	project.initialLoadPending = true
	return project
}

func NewInferredProject(compilerOptions *core.CompilerOptions, currentDirectory string, projectRootPath tspath.Path, host ProjectHost) *Project {
	project := NewProject(projectNamer.next("/dev/null/inferredProject"), KindInferred, currentDirectory, host)
	project.rootPath = projectRootPath
	project.compilerOptions = compilerOptions
	return project
}

func NewProject(name string, kind Kind, currentDirectory string, host ProjectHost) *Project {
	host.Log(fmt.Sprintf("Creating %sProject: %s, currentDirectory: %s", kind.String(), name, currentDirectory))
	project := &Project{
		host:             host,
		name:             name,
		kind:             kind,
		currentDirectory: currentDirectory,
		rootFileNames:    &collections.OrderedMap[tspath.Path, string]{},
	}
	project.languageService = ls.NewLanguageService(project)
	project.markAsDirty()
	return project
}

// FS implements LanguageServiceHost.
func (p *Project) FS() vfs.FS {
	return p.host.FS()
}

// DefaultLibraryPath implements LanguageServiceHost.
func (p *Project) DefaultLibraryPath() string {
	return p.host.DefaultLibraryPath()
}

// GetCompilerOptions implements LanguageServiceHost.
func (p *Project) GetCompilerOptions() *core.CompilerOptions {
	return p.compilerOptions
}

// GetCurrentDirectory implements LanguageServiceHost.
func (p *Project) GetCurrentDirectory() string {
	return p.currentDirectory
}

// GetProjectVersion implements LanguageServiceHost.
func (p *Project) GetProjectVersion() int {
	return p.version
}

// GetRootFileNames implements LanguageServiceHost.
func (p *Project) GetRootFileNames() []string {
	fileNames := make([]string, 0, p.rootFileNames.Size())
	for path, fileName := range p.rootFileNames.Entries() {
		if p.host.GetScriptInfoByPath(path) != nil {
			fileNames = append(fileNames, fileName)
		}
	}
	return fileNames
}

// GetSourceFile implements LanguageServiceHost.
func (p *Project) GetSourceFile(fileName string, path tspath.Path, languageVersion core.ScriptTarget) *ast.SourceFile {
	scriptKind := p.getScriptKind(fileName)
	if scriptInfo := p.getOrCreateScriptInfoAndAttachToProject(fileName, scriptKind); scriptInfo != nil {
		var (
			oldSourceFile      *ast.SourceFile
			oldCompilerOptions *core.CompilerOptions
		)
		if p.program != nil {
			oldSourceFile = p.program.GetSourceFileByPath(scriptInfo.path)
			oldCompilerOptions = p.program.GetCompilerOptions()
		}
		return p.host.DocumentRegistry().AcquireDocument(scriptInfo, p.GetCompilerOptions(), oldSourceFile, oldCompilerOptions)
	}
	return nil
}

// GetProgram implements LanguageServiceHost. Updates the program if needed.
func (p *Project) GetProgram() *compiler.Program {
	p.updateIfDirty()
	return p.program
}

// NewLine implements LanguageServiceHost.
func (p *Project) NewLine() string {
	return p.host.NewLine()
}

// Trace implements LanguageServiceHost.
func (p *Project) Trace(msg string) {
	p.log(msg)
}

// GetDefaultLibraryPath implements ls.Host.
func (p *Project) GetDefaultLibraryPath() string {
	return p.host.DefaultLibraryPath()
}

// GetScriptInfo implements ls.Host.
func (p *Project) GetScriptInfo(fileName string) ls.ScriptInfo {
	return p.host.GetScriptInfoByPath(p.toPath(fileName))
}

// GetPositionEncoding implements ls.Host.
func (p *Project) GetPositionEncoding() lsproto.PositionEncodingKind {
	return p.host.PositionEncoding()
}

func (p *Project) Name() string {
	return p.name
}

func (p *Project) Kind() Kind {
	return p.kind
}

func (p *Project) Version() int {
	return p.version
}

func (p *Project) CurrentProgram() *compiler.Program {
	return p.program
}

func (p *Project) LanguageService() *ls.LanguageService {
	return p.languageService
}

func (p *Project) getOrCreateScriptInfoAndAttachToProject(fileName string, scriptKind core.ScriptKind) *ScriptInfo {
	if scriptInfo := p.host.GetOrCreateScriptInfoForFile(fileName, p.toPath(fileName), scriptKind); scriptInfo != nil {
		scriptInfo.attachToProject(p)
		return scriptInfo
	}
	return nil
}

func (p *Project) getScriptKind(fileName string) core.ScriptKind {
	// Customizing script kind per file extension is a common plugin / LS host customization case
	// which can probably be replaced with static info in the future
	return core.GetScriptKindFromFileName(fileName)
}

func (p *Project) markFileAsDirty(path tspath.Path) {
	p.markAsDirty()
}

func (p *Project) markAsDirty() {
	p.mu.Lock()
	defer p.mu.Unlock()
	if !p.dirty {
		p.dirty = true
		p.version++
	}
}

func (p *Project) updateIfDirty() bool {
	// !!! p.invalidateResolutionsOfFailedLookupLocations()
	return p.dirty && p.updateGraph()
}

func (p *Project) onFileAddedOrRemoved(isSymlink bool) {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.hasAddedOrRemovedFiles = true
	if isSymlink {
		p.hasAddedOrRemovedSymlinks = true
	}
}

// updateGraph updates the set of files that contribute to the project.
// Returns true if the set of files in has changed. NOTE: this is the
// opposite of the return value in Strada, which was frequently inverted,
// as in `updateProjectIfDirty()`.
func (p *Project) updateGraph() bool {
	// !!!
	p.log("Starting updateGraph: Project: " + p.name)
	oldProgram := p.program
	hasAddedOrRemovedFiles := p.hasAddedOrRemovedFiles
	p.initialLoadPending = false

	if p.kind == KindConfigured && p.reloadConfig {
		if err := p.LoadConfig(); err != nil {
			panic(fmt.Sprintf("failed to reload config: %v", err))
		}
		p.reloadConfig = false
	}

	p.hasAddedOrRemovedFiles = false
	p.hasAddedOrRemovedSymlinks = false
	p.updateProgram()
	p.dirty = false
	p.log(fmt.Sprintf("Finishing updateGraph: Project: %s version: %d", p.name, p.version))
	if hasAddedOrRemovedFiles {
		p.log(p.print(true /*writeFileNames*/, true /*writeFileExplanation*/, false /*writeFileVersionAndText*/))
	} else if p.program != oldProgram {
		p.log("Different program with same set of files")
	}

	if p.program != oldProgram && oldProgram != nil {
		for _, oldSourceFile := range oldProgram.GetSourceFiles() {
			if p.program.GetSourceFileByPath(oldSourceFile.Path()) == nil {
				p.host.DocumentRegistry().ReleaseDocument(oldSourceFile, oldProgram.GetCompilerOptions())
			}
		}
	}

	return true
}

func (p *Project) updateProgram() {
	rootFileNames := p.GetRootFileNames()
	compilerOptions := p.GetCompilerOptions()

	p.program = compiler.NewProgram(compiler.ProgramOptions{
		RootFiles: rootFileNames,
		Host:      p,
		Options:   compilerOptions,
	})

	p.program.BindSourceFiles()
}

func (p *Project) isOrphan() bool {
	switch p.kind {
	case KindInferred:
		return p.rootFileNames.Size() == 0
	case KindConfigured:
		return p.deferredClose
	default:
		panic("unhandled project kind")
	}
}

func (p *Project) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, p.GetCurrentDirectory(), p.FS().UseCaseSensitiveFileNames())
}

func (p *Project) isRoot(info *ScriptInfo) bool {
	return p.rootFileNames.Has(info.path)
}

func (p *Project) removeFile(info *ScriptInfo, fileExists bool, detachFromProject bool) {
	if p.isRoot(info) {
		switch p.kind {
		case KindInferred:
			p.rootFileNames.Delete(info.path)
		case KindConfigured:
			p.reloadConfig = true
		}
	}

	// !!!
	// if (fileExists) {
	// 	// If file is present, just remove the resolutions for the file
	// 	this.resolutionCache.removeResolutionsOfFile(info.path);
	// } else {
	// 	this.resolutionCache.invalidateResolutionOfFile(info.path);
	// }
	// this.cachedUnresolvedImportsPerFile.delete(info.path);
	if detachFromProject {
		info.detachFromProject(p)
	}
	p.markAsDirty()
}

func (p *Project) addRoot(info *ScriptInfo) {
	// !!!
	// if p.kind == KindInferred {
	// 	p.host.startWatchingConfigFilesForInferredProjectRoot(info.path);
	//  // handle JS toggling
	// }
	if p.isRoot(info) {
		panic("script info is already a root")
	}
	p.rootFileNames.Set(info.path, info.fileName)
	info.attachToProject(p)
	p.markAsDirty()
}

func (p *Project) LoadConfig() error {
	if p.kind != KindConfigured {
		panic("loadConfig called on non-configured project")
	}

	if configFileContent, ok := p.host.FS().ReadFile(p.configFileName); ok {
		configDir := tspath.GetDirectoryPath(p.configFileName)
		tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(p.configFileName, p.configFilePath, configFileContent)
		parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
			tsConfigSourceFile,
			p.host,
			configDir,
			nil, /*existingOptions*/
			p.configFileName,
			nil, /*resolutionStack*/
			nil, /*extraFileExtensions*/
			nil, /*extendedConfigCache*/
		)

		p.logf("Config: %s : %s",
			p.configFileName,
			core.Must(core.StringifyJson(map[string]any{
				"rootNames":         parsedCommandLine.FileNames(),
				"options":           parsedCommandLine.CompilerOptions(),
				"projectReferences": parsedCommandLine.ProjectReferences(),
			}, "    ", "  ")),
		)

		p.compilerOptions = parsedCommandLine.CompilerOptions()
		p.setRootFiles(parsedCommandLine.FileNames())
	} else {
		p.compilerOptions = &core.CompilerOptions{}
		return fmt.Errorf("could not read file %q", p.configFileName)
	}

	p.markAsDirty()
	return nil
}

func (p *Project) setRootFiles(rootFileNames []string) {
	newRootScriptInfos := make(map[tspath.Path]struct{}, len(rootFileNames))
	for _, file := range rootFileNames {
		scriptKind := p.getScriptKind(file)
		scriptInfo := p.host.GetOrCreateScriptInfoForFile(file, p.toPath(file), scriptKind)
		newRootScriptInfos[scriptInfo.path] = struct{}{}
		if _, isRoot := p.rootFileNames.Get(scriptInfo.path); !isRoot {
			p.addRoot(scriptInfo)
			if scriptInfo.isOpen {
				// !!!
				// s.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo)
			}
		} else {
			p.rootFileNames.Set(scriptInfo.path, file)
		}
	}

	if p.rootFileNames.Size() > len(rootFileNames) {
		for root := range p.rootFileNames.Keys() {
			if _, ok := newRootScriptInfos[root]; !ok {
				if info := p.host.GetScriptInfoByPath(root); info != nil {
					p.removeFile(info, true /*fileExists*/, true /*detachFromProject*/)
				} else {
					p.rootFileNames.Delete(root)
				}
			}
		}
	}
}

func (p *Project) clearSourceMapperCache() {
	// !!!
}

func (p *Project) print(writeFileNames bool, writeFileExplanation bool, writeFileVersionAndText bool) string {
	var builder strings.Builder
	builder.WriteString(fmt.Sprintf("Project '%s' (%s)\n", p.name, p.kind.String()))
	if p.initialLoadPending {
		builder.WriteString("\tFiles (0) InitialLoadPending\n")
	} else if p.program == nil {
		builder.WriteString("\tFiles (0) NoProgram\n")
	} else {
		sourceFiles := p.program.GetSourceFiles()
		builder.WriteString(fmt.Sprintf("\tFiles (%d)\n", len(sourceFiles)))
		if writeFileNames {
			for _, sourceFile := range sourceFiles {
				builder.WriteString("\t\t" + sourceFile.FileName())
				if writeFileVersionAndText {
					builder.WriteString(fmt.Sprintf(" %d %s", sourceFile.Version, sourceFile.Text()))
				}
				builder.WriteRune('\n')
			}
			// !!!
			// if writeFileExplanation {}
		}
	}
	builder.WriteString("-----------------------------------------------")
	return builder.String()
}

func (p *Project) log(s string) {
	p.host.Log(s)
}

func (p *Project) logf(format string, args ...interface{}) {
	p.log(fmt.Sprintf(format, args...))
}

func (p *Project) Close() {
	// !!!
}
