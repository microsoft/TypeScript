package project

import (
	"fmt"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

const (
	inferredProjectName = "/dev/null/inferred" // lowercase so toPath is a no-op regardless of settings
	hr                  = "-----------------------------------------------"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Kind -trimprefix=Kind -output=project_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -w project_stringer_generated.go

type Kind int

const (
	KindInferred Kind = iota
	KindConfigured
)

type ProgramUpdateKind int

const (
	ProgramUpdateKindNone ProgramUpdateKind = iota
	ProgramUpdateKindCloned
	ProgramUpdateKindSameFileNames
	ProgramUpdateKindNewFiles
)

type PendingReload int

const (
	PendingReloadNone PendingReload = iota
	PendingReloadFileNames
	PendingReloadFull
)

// Project represents a TypeScript project.
// If changing struct fields, also update the Clone method.
type Project struct {
	Kind             Kind
	currentDirectory string
	configFileName   string
	configFilePath   tspath.Path

	dirty         bool
	dirtyFilePath tspath.Path

	host                            *compilerHost
	CommandLine                     *tsoptions.ParsedCommandLine
	commandLineWithTypingsFiles     *tsoptions.ParsedCommandLine
	commandLineWithTypingsFilesOnce sync.Once
	Program                         *compiler.Program
	// The kind of update that was performed on the program last time it was updated.
	ProgramUpdateKind ProgramUpdateKind
	// The ID of the snapshot that created the program stored in this project.
	ProgramLastUpdate uint64

	programFilesWatch       *WatchedFiles[patternsAndIgnored]
	failedLookupsWatch      *WatchedFiles[map[tspath.Path]string]
	affectingLocationsWatch *WatchedFiles[map[tspath.Path]string]
	typingsWatch            *WatchedFiles[patternsAndIgnored]

	checkerPool *checkerPool

	// installedTypingsInfo is the value of `project.ComputeTypingsInfo()` that was
	// used during the most recently completed typings installation.
	installedTypingsInfo *ata.TypingsInfo
	// typingsFiles are the root files added by the typings installer.
	typingsFiles []string
}

func NewConfiguredProject(
	configFileName string,
	configFilePath tspath.Path,
	builder *projectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	return NewProject(configFileName, KindConfigured, tspath.GetDirectoryPath(configFileName), builder, logger)
}

func NewInferredProject(
	currentDirectory string,
	compilerOptions *core.CompilerOptions,
	rootFileNames []string,
	builder *projectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	p := NewProject(inferredProjectName, KindInferred, currentDirectory, builder, logger)
	if compilerOptions == nil {
		compilerOptions = &core.CompilerOptions{
			AllowJs:                    core.TSTrue,
			Module:                     core.ModuleKindESNext,
			ModuleResolution:           core.ModuleResolutionKindBundler,
			Target:                     core.ScriptTargetES2022,
			Jsx:                        core.JsxEmitReactJSX,
			AllowImportingTsExtensions: core.TSTrue,
			StrictNullChecks:           core.TSTrue,
			StrictFunctionTypes:        core.TSTrue,
			SourceMap:                  core.TSTrue,
			ESModuleInterop:            core.TSTrue,
			AllowNonTsExtensions:       core.TSTrue,
			ResolveJsonModule:          core.TSTrue,
		}
	}
	p.CommandLine = tsoptions.NewParsedCommandLine(
		compilerOptions,
		rootFileNames,
		tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: builder.fs.fs.UseCaseSensitiveFileNames(),
			CurrentDirectory:          currentDirectory,
		},
	)
	return p
}

func NewProject(
	configFileName string,
	kind Kind,
	currentDirectory string,
	builder *projectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	if logger != nil {
		logger.Log(fmt.Sprintf("Creating %sProject: %s, currentDirectory: %s", kind.String(), configFileName, currentDirectory))
	}
	project := &Project{
		configFileName:   configFileName,
		Kind:             kind,
		currentDirectory: currentDirectory,
		dirty:            true,
	}

	project.configFilePath = tspath.ToPath(configFileName, currentDirectory, builder.fs.fs.UseCaseSensitiveFileNames())
	if builder.sessionOptions.WatchEnabled {
		project.programFilesWatch = NewWatchedFiles(
			"non-root program files for "+configFileName,
			lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
			core.Identity,
		)
		project.failedLookupsWatch = NewWatchedFiles(
			"failed lookups for "+configFileName,
			lsproto.WatchKindCreate,
			createResolutionLookupGlobMapper(builder.sessionOptions.CurrentDirectory, builder.sessionOptions.DefaultLibraryPath, project.currentDirectory, builder.fs.fs.UseCaseSensitiveFileNames()),
		)
		project.affectingLocationsWatch = NewWatchedFiles(
			"affecting locations for "+configFileName,
			lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
			createResolutionLookupGlobMapper(builder.sessionOptions.CurrentDirectory, builder.sessionOptions.DefaultLibraryPath, project.currentDirectory, builder.fs.fs.UseCaseSensitiveFileNames()),
		)
		if builder.sessionOptions.TypingsLocation != "" {
			project.typingsWatch = NewWatchedFiles(
				"typings installer files",
				lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
				core.Identity,
			)
		}
	}
	return project
}

func (p *Project) Name() string {
	return p.configFileName
}

// ConfigFileName panics if Kind() is not KindConfigured.
func (p *Project) ConfigFileName() string {
	if p.Kind != KindConfigured {
		panic("ConfigFileName called on non-configured project")
	}
	return p.configFileName
}

// ConfigFilePath panics if Kind() is not KindConfigured.
func (p *Project) ConfigFilePath() tspath.Path {
	if p.Kind != KindConfigured {
		panic("ConfigFilePath called on non-configured project")
	}
	return p.configFilePath
}

func (p *Project) GetProgram() *compiler.Program {
	return p.Program
}

func (p *Project) containsFile(path tspath.Path) bool {
	return p.Program != nil && p.Program.GetSourceFileByPath(path) != nil
}

func (p *Project) IsSourceFromProjectReference(path tspath.Path) bool {
	return p.Program != nil && p.Program.IsSourceFromProjectReference(path)
}

func (p *Project) Clone() *Project {
	return &Project{
		Kind:             p.Kind,
		currentDirectory: p.currentDirectory,
		configFileName:   p.configFileName,
		configFilePath:   p.configFilePath,

		dirty:         p.dirty,
		dirtyFilePath: p.dirtyFilePath,

		host:                        p.host,
		CommandLine:                 p.CommandLine,
		commandLineWithTypingsFiles: p.commandLineWithTypingsFiles,
		Program:                     p.Program,
		ProgramUpdateKind:           ProgramUpdateKindNone,
		ProgramLastUpdate:           p.ProgramLastUpdate,

		programFilesWatch:       p.programFilesWatch,
		failedLookupsWatch:      p.failedLookupsWatch,
		affectingLocationsWatch: p.affectingLocationsWatch,
		typingsWatch:            p.typingsWatch,

		checkerPool: p.checkerPool,

		installedTypingsInfo: p.installedTypingsInfo,
		typingsFiles:         p.typingsFiles,
	}
}

// getCommandLineWithTypingsFiles returns the command line augmented with typing files if ATA is enabled.
func (p *Project) getCommandLineWithTypingsFiles() *tsoptions.ParsedCommandLine {
	if len(p.typingsFiles) == 0 {
		return p.CommandLine
	}

	// Check if ATA is enabled for this project
	typeAcquisition := p.GetTypeAcquisition()
	if typeAcquisition == nil || !typeAcquisition.Enable.IsTrue() {
		return p.CommandLine
	}

	p.commandLineWithTypingsFilesOnce.Do(func() {
		if p.commandLineWithTypingsFiles == nil {
			// Create an augmented command line that includes typing files
			originalRootNames := p.CommandLine.FileNames()
			newRootNames := make([]string, 0, len(originalRootNames)+len(p.typingsFiles))
			newRootNames = append(newRootNames, originalRootNames...)
			newRootNames = append(newRootNames, p.typingsFiles...)

			// Create a new ParsedCommandLine with the augmented root file names
			p.commandLineWithTypingsFiles = tsoptions.NewParsedCommandLine(
				p.CommandLine.CompilerOptions(),
				newRootNames,
				tspath.ComparePathsOptions{
					UseCaseSensitiveFileNames: p.host.FS().UseCaseSensitiveFileNames(),
					CurrentDirectory:          p.currentDirectory,
				},
			)
		}
	})
	return p.commandLineWithTypingsFiles
}

type CreateProgramResult struct {
	Program     *compiler.Program
	UpdateKind  ProgramUpdateKind
	CheckerPool *checkerPool
}

func (p *Project) CreateProgram() CreateProgramResult {
	updateKind := ProgramUpdateKindNewFiles
	var programCloned bool
	var checkerPool *checkerPool
	var newProgram *compiler.Program

	// Create the command line, potentially augmented with typing files
	commandLine := p.getCommandLineWithTypingsFiles()

	if p.dirtyFilePath != "" && p.Program != nil && p.Program.CommandLine() == commandLine {
		newProgram, programCloned = p.Program.UpdateProgram(p.dirtyFilePath, p.host)
		if programCloned {
			updateKind = ProgramUpdateKindCloned
			for _, file := range newProgram.GetSourceFiles() {
				if file.Path() != p.dirtyFilePath {
					// UpdateProgram only called host.GetSourceFile for the dirty file.
					// Increment ref count for all other files.
					p.host.builder.parseCache.Ref(file)
				}
			}
		}
	} else {
		var typingsLocation string
		if p.GetTypeAcquisition().Enable.IsTrue() {
			typingsLocation = p.host.sessionOptions.TypingsLocation
		}
		newProgram = compiler.NewProgram(
			compiler.ProgramOptions{
				Host:                        p.host,
				Config:                      commandLine,
				UseSourceOfProjectReference: true,
				TypingsLocation:             typingsLocation,
				JSDocParsingMode:            ast.JSDocParsingModeParseAll,
				CreateCheckerPool: func(program *compiler.Program) compiler.CheckerPool {
					checkerPool = newCheckerPool(4, program, p.log)
					return checkerPool
				},
			},
		)
	}

	if !programCloned && p.Program != nil && p.Program.HasSameFileNames(newProgram) {
		updateKind = ProgramUpdateKindSameFileNames
	}

	newProgram.BindSourceFiles()

	return CreateProgramResult{
		Program:     newProgram,
		UpdateKind:  updateKind,
		CheckerPool: checkerPool,
	}
}

func (p *Project) CloneWatchers(workspaceDir string, libDir string) (programFilesWatch *WatchedFiles[patternsAndIgnored], failedLookupsWatch *WatchedFiles[map[tspath.Path]string], affectingLocationsWatch *WatchedFiles[map[tspath.Path]string]) {
	failedLookups := make(map[tspath.Path]string)
	affectingLocations := make(map[tspath.Path]string)
	programFiles := getNonRootFileGlobs(workspaceDir, libDir, p.Program.GetSourceFiles(), p.CommandLine.FileNamesByPath(), tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: p.host.FS().UseCaseSensitiveFileNames(),
		CurrentDirectory:          p.currentDirectory,
	})
	extractLookups(p.toPath, failedLookups, affectingLocations, p.Program.GetResolvedModules())
	extractLookups(p.toPath, failedLookups, affectingLocations, p.Program.GetResolvedTypeReferenceDirectives())
	programFilesWatch = p.programFilesWatch.Clone(programFiles)
	failedLookupsWatch = p.failedLookupsWatch.Clone(failedLookups)
	affectingLocationsWatch = p.affectingLocationsWatch.Clone(affectingLocations)
	return programFilesWatch, failedLookupsWatch, affectingLocationsWatch
}

func (p *Project) log(msg string) {
	// !!!
}

func (p *Project) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, p.currentDirectory, p.host.FS().UseCaseSensitiveFileNames())
}

func (p *Project) print(writeFileNames bool, writeFileExplanation bool, builder *strings.Builder) string {
	builder.WriteString(fmt.Sprintf("\nProject '%s'\n", p.Name()))
	if p.Program == nil {
		builder.WriteString("\tFiles (0) NoProgram\n")
	} else {
		sourceFiles := p.Program.GetSourceFiles()
		builder.WriteString(fmt.Sprintf("\tFiles (%d)\n", len(sourceFiles)))
		if writeFileNames {
			for _, sourceFile := range sourceFiles {
				builder.WriteString("\t\t" + sourceFile.FileName() + "\n")
			}
			// !!!
			// if writeFileExplanation {}
		}
	}
	builder.WriteString(hr)
	return builder.String()
}

// GetTypeAcquisition returns the type acquisition settings for this project.
func (p *Project) GetTypeAcquisition() *core.TypeAcquisition {
	if p.Kind == KindInferred {
		// For inferred projects, use default settings
		return &core.TypeAcquisition{
			Enable:                              core.TSTrue,
			Include:                             nil,
			Exclude:                             nil,
			DisableFilenameBasedTypeAcquisition: core.TSFalse,
		}
	}

	if p.CommandLine != nil {
		return p.CommandLine.TypeAcquisition()
	}

	return nil
}

// GetUnresolvedImports extracts unresolved imports from this project's program.
func (p *Project) GetUnresolvedImports() *collections.Set[string] {
	if p.Program == nil {
		return nil
	}

	return p.Program.GetUnresolvedImports()
}

// ShouldTriggerATA determines if ATA should be triggered for this project.
func (p *Project) ShouldTriggerATA(snapshotID uint64) bool {
	if p.Program == nil || p.CommandLine == nil {
		return false
	}

	typeAcquisition := p.GetTypeAcquisition()
	if typeAcquisition == nil || !typeAcquisition.Enable.IsTrue() {
		return false
	}

	if p.installedTypingsInfo == nil || p.ProgramLastUpdate == snapshotID && p.ProgramUpdateKind == ProgramUpdateKindNewFiles {
		return true
	}

	return !p.installedTypingsInfo.Equals(p.ComputeTypingsInfo())
}

func (p *Project) ComputeTypingsInfo() ata.TypingsInfo {
	return ata.TypingsInfo{
		CompilerOptions:   p.CommandLine.CompilerOptions(),
		TypeAcquisition:   p.GetTypeAcquisition(),
		UnresolvedImports: p.GetUnresolvedImports(),
	}
}
