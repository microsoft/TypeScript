package build

import (
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type host struct {
	orchestrator *Orchestrator
	host         compiler.CompilerHost

	// Caches that last only for build cycle and then cleared out
	extendedConfigCache tsc.ExtendedConfigCache
	sourceFiles         parseCache[ast.SourceFileParseOptions, *ast.SourceFile]
	configTimes         collections.SyncMap[tspath.Path, time.Duration]

	// caches that stay as long as they are needed
	resolvedReferences parseCache[tspath.Path, *tsoptions.ParsedCommandLine]
	mTimes             *collections.SyncMap[tspath.Path, time.Time]
}

var (
	_ compiler.CompilerHost       = (*host)(nil)
	_ incremental.BuildInfoReader = (*host)(nil)
	_ incremental.Host            = (*host)(nil)
)

func (h *host) FS() vfs.FS {
	return h.host.FS()
}

func (h *host) DefaultLibraryPath() string {
	return h.host.DefaultLibraryPath()
}

func (h *host) GetCurrentDirectory() string {
	return h.host.GetCurrentDirectory()
}

func (h *host) Trace(msg string) {
	panic("build.Orchestrator.host does not support tracing, use a different host for tracing")
}

func (h *host) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	// Cache dts and json files as they will be reused
	return h.sourceFiles.loadOrStoreNewIf(opts, h.host.GetSourceFile, func(value *ast.SourceFile) bool {
		return value != nil && (tspath.IsDeclarationFileName(opts.FileName) || tspath.FileExtensionIs(opts.FileName, tspath.ExtensionJson))
	})
}

func (h *host) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
	return h.resolvedReferences.loadOrStoreNew(path, func(path tspath.Path) *tsoptions.ParsedCommandLine {
		configStart := h.orchestrator.opts.Sys.Now()
		commandLine, _ := tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, h.orchestrator.opts.Command.CompilerOptions, h, &h.extendedConfigCache)
		configTime := h.orchestrator.opts.Sys.Now().Sub(configStart)
		h.configTimes.Store(path, configTime)
		return commandLine
	})
}

func (h *host) ReadBuildInfo(config *tsoptions.ParsedCommandLine) *incremental.BuildInfo {
	configPath := h.orchestrator.toPath(config.ConfigName())
	task := h.orchestrator.getTask(configPath)
	buildInfo, _ := task.loadOrStoreBuildInfo(h.orchestrator, h.orchestrator.toPath(config.ConfigName()), config.GetBuildInfoFileName())
	return buildInfo
}

func (h *host) GetMTime(file string) time.Time {
	return h.loadOrStoreMTime(file, nil, true)
}

func (h *host) SetMTime(file string, mTime time.Time) error {
	return h.FS().Chtimes(file, time.Time{}, mTime)
}

func (h *host) loadOrStoreMTime(file string, oldCache *collections.SyncMap[tspath.Path, time.Time], store bool) time.Time {
	path := h.orchestrator.toPath(file)
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

func (h *host) storeMTime(file string, mTime time.Time) {
	path := h.orchestrator.toPath(file)
	h.mTimes.Store(path, mTime)
}

func (h *host) storeMTimeFromOldCache(file string, oldCache *collections.SyncMap[tspath.Path, time.Time]) {
	path := h.orchestrator.toPath(file)
	if mTime, found := oldCache.Load(path); found {
		h.mTimes.Store(path, mTime)
	}
}
