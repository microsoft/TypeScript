package project

import (
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

//go:generate go run golang.org/x/tools/cmd/stringer -type=ProjectKind -output=project_stringer_generated.go

var projectNamer = &namer{}

var _ ls.Host = (*Project)(nil)

type ProjectKind int

const (
	ProjectKindInferred ProjectKind = iota
	ProjectKindConfigured
	ProjectKindAutoImportProvider
	ProjectKindAuxiliary
)

type Project struct {
	projectService *ProjectService

	name string
	kind ProjectKind

	initialLoadPending        bool
	dirty                     bool
	version                   int
	hasAddedOrRemovedFiles    bool
	hasAddedOrRemovedSymlinks bool
	deferredClose             bool

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

func NewConfiguredProject(configFileName string, configFilePath tspath.Path, projectService *ProjectService) *Project {
	project := NewProject(configFileName, ProjectKindConfigured, tspath.GetDirectoryPath(configFileName), projectService)
	project.configFileName = configFileName
	project.configFilePath = configFilePath
	project.initialLoadPending = true
	return project
}

func NewInferredProject(compilerOptions *core.CompilerOptions, currentDirectory string, projectRootPath tspath.Path, projectService *ProjectService) *Project {
	project := NewProject(projectNamer.next("/dev/null/inferredProject"), ProjectKindInferred, currentDirectory, projectService)
	project.rootPath = projectRootPath
	project.compilerOptions = compilerOptions
	return project
}

func NewProject(name string, kind ProjectKind, currentDirectory string, projectService *ProjectService) *Project {
	projectService.log(fmt.Sprintf("Creating %sProject: %s, currentDirectory: %s", kind.String(), name, currentDirectory))
	project := &Project{
		projectService:   projectService,
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
	return p.projectService.host.FS()
}

// DefaultLibraryPath implements LanguageServiceHost.
func (p *Project) DefaultLibraryPath() string {
	return p.projectService.host.DefaultLibraryPath()
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
	return slices.Collect(p.rootFileNames.Values())
}

// GetSourceFile implements LanguageServiceHost.
func (p *Project) GetSourceFile(fileName string, languageVersion core.ScriptTarget) *ast.SourceFile {
	scriptKind := p.getScriptKind(fileName)
	if scriptInfo := p.getOrCreateScriptInfoAndAttachToProject(fileName, scriptKind); scriptInfo != nil {
		var (
			oldSourceFile      *ast.SourceFile
			oldCompilerOptions *core.CompilerOptions
		)
		if p.program != nil {
			oldSourceFile = p.program.GetSourceFileByPath(scriptInfo.path)
		}
		return p.projectService.documentRegistry.AcquireDocument(scriptInfo, p.GetCompilerOptions(), oldSourceFile, oldCompilerOptions)
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
	return p.projectService.host.NewLine()
}

// Trace implements LanguageServiceHost.
func (p *Project) Trace(msg string) {
	p.projectService.host.Trace(msg)
}

// GetDefaultLibraryPath implements ls.Host.
func (p *Project) GetDefaultLibraryPath() string {
	return p.projectService.options.DefaultLibraryPath
}

func (p *Project) LanguageService() *ls.LanguageService {
	return p.languageService
}

func (p *Project) getOrCreateScriptInfoAndAttachToProject(fileName string, scriptKind core.ScriptKind) *ScriptInfo {
	if scriptInfo := p.projectService.getOrCreateScriptInfoNotOpenedByClient(fileName, p.projectService.toPath(fileName), scriptKind); scriptInfo != nil {
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
	case ProjectKindInferred:
		return p.rootFileNames.Size() == 0
	case ProjectKindConfigured:
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
		p.rootFileNames.Delete(info.path)
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
	// if p.kind == ProjectKindInferred {
	// 	p.projectService.startWatchingConfigFilesForInferredProjectRoot(info.path);
	//  // handle JS toggling
	// }
	if p.isRoot(info) {
		panic("script info is already a root")
	}
	p.rootFileNames.Set(info.path, info.fileName)
	info.attachToProject(p)
	p.markAsDirty()
}

func (p *Project) addMissingRootFile(fileName string, path tspath.Path) {
	p.rootFileNames.Set(path, fileName)
	p.markAsDirty()
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
					builder.WriteString(fmt.Sprintf(" %d %s", sourceFile.Version, sourceFile.Text))
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
	p.projectService.log(s)
}
