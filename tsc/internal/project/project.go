package project

import (
	"context"
	"fmt"
	"slices"
	"strconv"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/project/ata"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

const (
	inferredProjectName    = "/dev/null/inferred" // lowercase so toPath is a no-op regardless of settings
	syntheticProjectPrefix = "/dev/null/synthetic/"
	hr                     = "-----------------------------------------------"
)

type ID string

type ConfiguredProjectID tspath.Path

func (id ConfiguredProjectID) Path() tspath.Path {
	return tspath.Path(id)
}

type InferredProjectID string

const inferredProjectID InferredProjectID = inferredProjectName

type SyntheticProjectID string

func NewSyntheticProjectID(id int) SyntheticProjectID {
	if id <= 0 {
		panic(fmt.Sprintf("invalid synthetic project ID: %d", id))
	}
	return SyntheticProjectID(fmt.Sprintf("%s%d", syntheticProjectPrefix, id))
}

func (id ID) String() string            { return string(id) }
func (id ConfiguredProjectID) AsID() ID { return ID(id) }
func (id InferredProjectID) AsID() ID   { return ID(id) }
func (id SyntheticProjectID) AsID() ID  { return ID(id) }

func (id ID) Configured() (ConfiguredProjectID, bool) {
	return ParseConfiguredProjectID(tspath.Path(id))
}

func ParseConfiguredProjectID(value tspath.Path) (ConfiguredProjectID, bool) {
	id := ID(value)
	if id == "" {
		return "", false
	}
	if _, ok := id.Inferred(); ok {
		return "", false
	}
	if _, ok := id.Synthetic(); ok {
		return "", false
	}
	return ConfiguredProjectID(value), true
}

func (id ID) Inferred() (InferredProjectID, bool) {
	return inferredProjectID, id == inferredProjectID.AsID()
}

func (id ID) Synthetic() (SyntheticProjectID, bool) {
	return ParseSyntheticProjectID(string(id))
}

func (id *SyntheticProjectID) UnmarshalJSONFrom(dec *json.Decoder) error {
	var value string
	if err := json.UnmarshalDecode(dec, &value); err != nil {
		return err
	}
	parsed, ok := ParseSyntheticProjectID(value)
	if !ok {
		return fmt.Errorf("invalid synthetic project ID: %s", value)
	}
	*id = parsed
	return nil
}

func ParseSyntheticProjectID(value string) (SyntheticProjectID, bool) {
	suffix, ok := strings.CutPrefix(value, syntheticProjectPrefix)
	if !ok {
		return "", false
	}
	id, err := strconv.Atoi(suffix)
	if err != nil || id <= 0 {
		return "", false
	}
	return NewSyntheticProjectID(id), true
}

//go:generate npx hereby generate:project

type Kind int

const (
	KindInferred Kind = iota
	KindConfigured
	KindSynthetic
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
	id               ID
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
	// Set of projects that this project could be referencing.
	// Only set before actually loading config file to get actual project references
	potentialProjectReferences *collections.Set[tspath.Path]

	programFilesWatch         *WatchedFiles[*collections.SyncSet[tspath.Path]]
	typingsWatch              *WatchedFiles[PatternsAndIgnored]
	contentMapperWatch        *WatchedFiles[[]string]
	contentMapperWatchedFiles *collections.Set[tspath.Path]

	checkerPool *checkerPool

	moduleResolverFactory ModuleResolverFactory
	moduleResolverID      uint64

	// installedTypingsInfo is the value of `project.ComputeTypingsInfo()` that was
	// used during the most recently completed typings installation.
	installedTypingsInfo *ata.TypingsInfo
	// typingsFiles are the root files added by the typings installer.
	typingsFiles []string
}

var _ ls.Project = (*Project)(nil)

func NewConfiguredProject(
	configFileName string,
	configFilePath tspath.Path,
	builder *ProjectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	configuredProjectID, ok := ParseConfiguredProjectID(configFilePath)
	if !ok {
		panic(fmt.Sprintf("invalid configured project ID: %s", configFilePath))
	}
	project := NewProject(configuredProjectID.AsID(), KindConfigured, tspath.GetDirectoryPath(configFileName), builder, logger)
	project.configFileName = configFileName
	project.configFilePath = configFilePath
	return project
}

func NewInferredProject(
	currentDirectory string,
	compilerOptions *core.CompilerOptions,
	rootFileNames []string,
	projectReferences []*core.ProjectReference,
	contentMappers []*contentmapper.Mapper,
	builder *ProjectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	p := NewProject(inferredProjectID.AsID(), KindInferred, currentDirectory, builder, logger)
	if compilerOptions == nil {
		compilerOptions = &core.CompilerOptions{
			AllowJs:                    core.TSTrue,
			Module:                     core.ModuleKindESNext,
			ModuleResolution:           core.ModuleResolutionKindBundler,
			Target:                     core.ScriptTargetLatestStandard,
			Jsx:                        core.JsxEmitReactJSX,
			AllowImportingTsExtensions: core.TSTrue,
			StrictNullChecks:           core.TSTrue,
			StrictFunctionTypes:        core.TSTrue,
			SourceMap:                  core.TSTrue,
			AllowNonTsExtensions:       core.TSTrue,
			ResolveJsonModule:          core.TSTrue,
		}
	}
	p.CommandLine = newInferredProjectCommandLine(
		compilerOptions,
		rootFileNames,
		projectReferences,
		contentMappers,
		tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: builder.fs.fs.UseCaseSensitiveFileNames(),
			CurrentDirectory:          currentDirectory,
		},
	)
	return p
}

func newSyntheticProject(
	id SyntheticProjectID,
	currentDirectory string,
	compilerOptions *core.CompilerOptions,
	rootFileNames []string,
	projectReferences []*core.ProjectReference,
	contentMappers []*contentmapper.Mapper,
	builder *ProjectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	project := NewProject(id.AsID(), KindSynthetic, currentDirectory, builder, logger)
	project.CommandLine = newInferredProjectCommandLine(
		compilerOptions,
		rootFileNames,
		projectReferences,
		contentMappers,
		tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: builder.fs.fs.UseCaseSensitiveFileNames(),
			CurrentDirectory:          currentDirectory,
		},
	)
	return project
}

func newInferredProjectCommandLine(
	compilerOptions *core.CompilerOptions,
	rootFileNames []string,
	projectReferences []*core.ProjectReference,
	contentMappers []*contentmapper.Mapper,
	comparePathsOptions tspath.ComparePathsOptions,
) *tsoptions.ParsedCommandLine {
	commandLine := tsoptions.NewParsedCommandLine(compilerOptions, rootFileNames, projectReferences, comparePathsOptions)
	commandLine.ParsedConfig.ContentMappers = contentMappers
	return commandLine
}

func NewProject(
	id ID,
	kind Kind,
	currentDirectory string,
	builder *ProjectCollectionBuilder,
	logger *logging.LogTree,
) *Project {
	if logger != nil {
		logger.Log(fmt.Sprintf("Creating %sProject: %s, currentDirectory: %s", kind.String(), id, currentDirectory))
	}
	project := &Project{
		Kind:             kind,
		id:               id,
		currentDirectory: currentDirectory,
		dirty:            true,
	}

	project.programFilesWatch = NewWatchedFiles(
		"program files for "+string(id),
		lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
		lsproto.GetClientCapabilities(builder.ctx).Workspace.DidChangeWatchedFiles.RelativePatternSupport,
		createResolutionLookupGlobMapper(builder.sessionOptions.CurrentDirectory, builder.sessionOptions.DefaultLibraryPath, project.currentDirectory, builder.fs.fs.UseCaseSensitiveFileNames()),
	)
	if builder.sessionOptions.TypingsLocation != "" {
		project.typingsWatch = NewWatchedFiles(
			"typings installer files",
			lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
			lsproto.GetClientCapabilities(builder.ctx).Workspace.DidChangeWatchedFiles.RelativePatternSupport,
			core.Identity,
		)
	}
	project.contentMapperWatch = NewWatchedFilesForPaths(
		"content mapper configuration files for "+string(id),
		lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
		lsproto.GetClientCapabilities(builder.ctx).Workspace.DidChangeWatchedFiles.RelativePatternSupport,
		builder.sessionOptions.CurrentDirectory,
		builder.sessionOptions.CurrentDirectory,
		builder.fs.fs.UseCaseSensitiveFileNames(),
	)
	return project
}

func (p *Project) CurrentDirectory() string {
	return p.currentDirectory
}

// DisplayName returns a short, human-readable name for the project,
// relative to the given workspace root directory.
// For configured projects, this is the config file path made relative.
// For inferred projects, this is the last component of the current directory.
func (p *Project) DisplayName(cwd string) string {
	if p.Kind == KindInferred {
		return tspath.GetBaseFileName(p.currentDirectory)
	}
	name := string(p.ID())
	if p.Kind == KindConfigured {
		name = p.ConfigFileName()
	}
	return tspath.ConvertToRelativePath(name, tspath.ComparePathsOptions{
		CurrentDirectory: cwd,
	})
}

func (p *Project) ID() ID {
	return p.id
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

func (p *Project) Id() string {
	return string(p.ID())
}

func (p *Project) GetProgram() *compiler.Program {
	return p.Program
}

func (p *Project) IsDirty() bool {
	return p.dirty
}

// GetProjectDiagnostics returns program diagnostics combined with any global
// diagnostics discovered during checking. These are the diagnostics reported on
// the tsconfig.json file.
func (p *Project) GetProjectDiagnostics(ctx context.Context) []*ast.Diagnostic {
	var globalDiags []*ast.Diagnostic
	if p.checkerPool != nil {
		globalDiags = p.checkerPool.GetGlobalDiagnostics()
	}
	return compiler.SortAndDeduplicateDiagnostics(slices.Concat(
		p.Program.GetConfigFileParsingDiagnostics(),
		p.Program.GetProgramDiagnostics(),
		globalDiags,
	))
}

func (p *Project) HasFile(fileName string) bool {
	return p.containsFile(p.toPath(fileName))
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
		id:               p.id,
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
		potentialProjectReferences:  p.potentialProjectReferences,

		programFilesWatch:         p.programFilesWatch,
		typingsWatch:              p.typingsWatch,
		contentMapperWatch:        p.contentMapperWatch,
		contentMapperWatchedFiles: p.contentMapperWatchedFiles,

		checkerPool: p.checkerPool,

		moduleResolverFactory: p.moduleResolverFactory,
		moduleResolverID:      p.moduleResolverID,

		installedTypingsInfo: p.installedTypingsInfo,
		typingsFiles:         p.typingsFiles,
	}
}

// SetCommandLine reassigns the project's command line and resets all state derived
// from it. Changing the command line always requires a full program rebuild, so the
// project is marked fully dirty. It also resets:
//   - the memoized command line augmented with typings files (and its sync.Once, so
//     the augmented command line is rebuilt from the new command line on next access);
//   - potentialProjectReferences, the pre-load placeholder derived from the old
//     command line (always nil for inferred projects, which have no project references).
func (p *Project) SetCommandLine(commandLine *tsoptions.ParsedCommandLine) {
	p.CommandLine = commandLine
	p.commandLineWithTypingsFiles = nil
	p.commandLineWithTypingsFilesOnce = sync.Once{}
	p.potentialProjectReferences = nil
	p.dirty = true
	p.dirtyFilePath = ""
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

			p.commandLineWithTypingsFiles = p.CommandLine.WithFileNames(newRootNames)
		}
	})
	return p.commandLineWithTypingsFiles
}

func (p *Project) setPotentialProjectReference(configFilePath tspath.Path) {
	if p.potentialProjectReferences == nil {
		p.potentialProjectReferences = &collections.Set[tspath.Path]{}
	} else {
		p.potentialProjectReferences = p.potentialProjectReferences.Clone()
	}
	p.potentialProjectReferences.Add(configFilePath)
}

func (p *Project) hasPotentialProjectReference(projectTreeRequest *ProjectTreeRequest) bool {
	if p.CommandLine != nil {
		for _, path := range p.CommandLine.ResolvedProjectReferencePaths() {
			if projectTreeRequest.IsProjectReferenced(p.toPath(path)) {
				return true
			}
		}
	} else if p.potentialProjectReferences != nil {
		for path := range p.potentialProjectReferences.Keys() {
			if projectTreeRequest.IsProjectReferenced(path) {
				return true
			}
		}
	}
	return false
}

type CreateProgramResult struct {
	Program    *compiler.Program
	UpdateKind ProgramUpdateKind
}

func (p *Project) CreateProgram() CreateProgramResult {
	updateKind := ProgramUpdateKindNewFiles
	var programCloned bool
	var newProgram *compiler.Program

	// Define a fresh CreateCheckerPool closure for this call. Each invocation of
	// CreateProgram must use its own closure so that concurrent goroutines cloning
	// the same project never share a captured variable through a stale closure
	// stored in the old program's options.
	createCheckerPool := func(program *compiler.Program) compiler.CheckerPool {
		return newCheckerPool(p.host.sessionOptions.CheckerPoolOptions, program, p.log)
	}
	var cleanupModuleResolver func()
	createModuleResolver := func(options module.ResolverOptions) module.Resolver {
		if p.moduleResolverFactory == nil {
			return module.NewResolver(options)
		}
		resolver, cleanup := p.moduleResolverFactory.NewResolver(options)
		cleanupModuleResolver = cleanup
		return resolver
	}
	defer func() {
		if cleanupModuleResolver != nil {
			cleanupModuleResolver()
		}
	}()

	// Create the command line, potentially augmented with typing files
	commandLine := p.getCommandLineWithTypingsFiles()
	if p.dirtyFilePath != "" && p.Program != nil && p.Program.CommandLine() == commandLine {
		var dirtyFile *ast.SourceFile
		newProgram, dirtyFile, programCloned = p.Program.UpdateProgram(p.dirtyFilePath, p.host, createCheckerPool, createModuleResolver)
		if programCloned {
			updateKind = ProgramUpdateKindCloned
			for _, file := range newProgram.SourceFiles() {
				// Use pointer identity: dirtyFile is the exact instance UpdateProgram acquired,
				// and it is the only file whose refcount is already accounted for.
				if file != dirtyFile && !file.IsContentMapperFailureStub() && !file.IsContentMapperSupplemental() {
					// UpdateProgram acquired the changed file only, so we need to ref everything else
					if file.ContentMapper() != "" {
						p.host.builder.contentMappedParseCache.Ref(contentMappedParseCacheKeyForFile(file))
					} else {
						p.host.builder.parseCache.Ref(parseCacheKeyForFile(file))
					}
				}
			}
			for _, file := range newProgram.DuplicateSourceFiles() {
				if !file.IsContentMapperFailureStub {
					if file.ContentMapper != "" {
						p.host.builder.contentMappedParseCache.Ref(contentMappedParseCacheKeyForDuplicate(file))
					} else {
						p.host.builder.parseCache.Ref(parseCacheKeyForDuplicate(file))
					}
				}
			}
		} else if dirtyFile != nil {
			// UpdateProgram always acquires the dirty file before deciding whether it can
			// reuse the old program. If it falls back to a full rebuild, release that
			// speculative acquire so the rebuilt program is the only remaining owner.
			if dirtyFile.ContentMapper() != "" {
				p.host.builder.contentMappedParseCache.Deref(contentMappedParseCacheKeyForFile(dirtyFile))
			} else {
				p.host.builder.parseCache.Deref(parseCacheKeyForFile(dirtyFile))
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
				CreateCheckerPool:           createCheckerPool,
				CreateModuleResolver:        createModuleResolver,
			},
		)
	}

	if !programCloned && p.Program != nil && p.Program.HasSameFileNames(newProgram) {
		updateKind = ProgramUpdateKindSameFileNames
	}

	newProgram.BindSourceFiles()

	return CreateProgramResult{
		Program:    newProgram,
		UpdateKind: updateKind,
	}
}

func (p *Project) CloneWatchers() *WatchedFiles[*collections.SyncSet[tspath.Path]] {
	return p.programFilesWatch.Clone(p.host.sourceFS.seenFiles)
}

func (p *Project) log(msg string) {
	// !!!
}

func (p *Project) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, p.currentDirectory, p.host.FS().UseCaseSensitiveFileNames())
}

func (p *Project) print(writeFileNames bool, writeFileExplanation bool, builder *strings.Builder) string {
	builder.WriteString(fmt.Sprintf("\nProject '%s'\n", p.ID()))
	if p.Program == nil {
		builder.WriteString("\tFiles (0) NoProgram\n")
	} else {
		sourceFiles := p.Program.GetSourceFiles()
		builder.WriteString(fmt.Sprintf("\tFiles (%d)\n", len(sourceFiles)))
		if writeFileNames {
			for _, sourceFile := range sourceFiles {
				builder.WriteString("\t\t")
				builder.WriteString(sourceFile.FileName())
				builder.WriteString("\n")
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
	if p.Kind == KindInferred || p.Kind == KindSynthetic {
		// For inferred and synthetic projects, use default settings.
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
