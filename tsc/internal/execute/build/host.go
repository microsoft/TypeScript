package build

import (
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type host struct {
	orchestrator *Orchestrator
	host         compiler.CompilerHost

	// Caches that last only for build cycle and then cleared out
	extendedConfigCache tsc.ExtendedConfigCache
	sourceFiles         parseCache[ast.SourceFileParseOptions, *ast.SourceFile]
	configTimes         collections.SyncMap[tspath.PathKey, time.Duration]

	// caches that stay as long as they are needed
	resolvedReferences parseCache[tspath.PathKey, *tsoptions.ParsedCommandLine]
	mTimes             *collections.SyncMap[tspath.PathKey, time.Time]
}

var (
	_ compiler.CompilerHost       = (*host)(nil)
	_ incremental.BuildInfoReader = (*host)(nil)
	_ incremental.Host            = (*host)(nil)
)

func (h *host) FS() vfs.FS {
	return h.host.FS()
}

func (h *host) DefaultLibraryPath() tspath.RootedDirectoryPath {
	return h.host.DefaultLibraryPath()
}

func (h *host) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return h.orchestrator.currentDirectory
}

func (h *host) Trace(msg *diagnostics.Message, args ...any) {
	panic("build.Orchestrator.host does not support tracing; use a different host for tracing")
}

func (h *host) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	if opts.FileName.IsDeclarationFile() || opts.FileName.ExtensionIs(tspath.ExtensionJson) {
		// Cache dts and json files as they will be reused
		return h.sourceFiles.loadOrStore(opts, h.host.GetSourceFile, false /* allowZero */)
	}
	return h.host.GetSourceFile(opts)
}

func (h *host) GetContentMappedSourceFiles(parseOptions ast.SourceFileParseOptions, mapper *contentmapper.Mapper) (contentmapper.SourceFiles, error) {
	return contentmapper.SourceFiles{}, contentmapper.ErrProjectUnavailable
}

func (h *host) ContentMapperProject() contentmapper.Project {
	panic("build.Orchestrator.host does not support content mapper project; use an individual project's compiler host instead")
}

func (h *host) GetResolvedProjectReference(fileName tspath.RootedFilePath, path tspath.PathKey) *tsoptions.ParsedCommandLine {
	return h.resolvedReferences.loadOrStore(path, func(path tspath.PathKey) *tsoptions.ParsedCommandLine {
		configStart := h.orchestrator.opts.Sys.Now()
		// Wrap command line options in "compilerOptions" key to match tsconfig.json structure
		var commandLineRaw *collections.OrderedMap[string, any]
		if raw, ok := h.orchestrator.opts.Command.Raw.(*collections.OrderedMap[string, any]); ok {
			wrapped := &collections.OrderedMap[string, any]{}
			wrapped.Set("compilerOptions", raw)
			commandLineRaw = wrapped
		}
		commandLine, _ := tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, h.orchestrator.opts.Command.CompilerOptions, commandLineRaw, h, &h.extendedConfigCache)
		configTime := h.orchestrator.opts.Sys.Now().Sub(configStart)
		h.configTimes.Store(path, configTime)
		return commandLine
	}, true /* allowZero */)
}

func (h *host) ReadBuildInfo(config *tsoptions.ParsedCommandLine) *incremental.BuildInfo {
	configPath := h.orchestrator.caseSensitivity.PathKey(tspath.RootedPath(config.ConfigName()))
	task := h.orchestrator.getTask(configPath)
	buildInfo, _ := task.loadOrStoreBuildInfo(h.orchestrator, config.GetBuildInfoFileName())
	return buildInfo
}

func (h *host) GetMTime(file tspath.RootedFilePath) time.Time {
	return h.loadOrStoreMTime(file, nil, true)
}

func (h *host) SetMTime(file tspath.RootedFilePath, mTime time.Time) error {
	return h.FS().Chtimes(file.AsPath(), time.Time{}, mTime)
}

func (h *host) loadOrStoreMTime(file tspath.RootedFilePath, oldCache *collections.SyncMap[tspath.PathKey, time.Time], store bool) time.Time {
	path := h.orchestrator.caseSensitivity.PathKey(tspath.RootedPath(file))
	if existing, loaded := h.mTimes.Load(path); loaded {
		return existing
	}
	var found bool
	var mTime time.Time
	if oldCache != nil {
		mTime, found = oldCache.Load(path)
	}
	if !found {
		mTime = incremental.GetMTime(h.host, file)
	}
	if store {
		mTime, _ = h.mTimes.LoadOrStore(path, mTime)
	}
	return mTime
}

func (h *host) storeMTime(file tspath.RootedFilePath, mTime time.Time) {
	path := h.orchestrator.caseSensitivity.PathKey(tspath.RootedPath(file))
	h.mTimes.Store(path, mTime)
}

func (h *host) storeMTimeFromOldCache(file tspath.RootedFilePath, oldCache *collections.SyncMap[tspath.PathKey, time.Time]) {
	path := h.orchestrator.caseSensitivity.PathKey(tspath.RootedPath(file))
	if mTime, found := oldCache.Load(path); found {
		h.mTimes.Store(path, mTime)
	}
}
