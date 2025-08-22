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

type configAndTime struct {
	resolved *tsoptions.ParsedCommandLine
	time     time.Duration
}

type buildInfoAndConfig struct {
	buildInfo *incremental.BuildInfo
	config    tspath.Path
}

type host struct {
	builder             *Orchestrator
	host                compiler.CompilerHost
	extendedConfigCache tsc.ExtendedConfigCache
	sourceFiles         collections.SyncMap[ast.SourceFileParseOptions, *ast.SourceFile]
	resolvedReferences  collections.SyncMap[tspath.Path, *configAndTime]

	buildInfos            collections.SyncMap[tspath.Path, *buildInfoAndConfig]
	mTimes                collections.SyncMap[tspath.Path, time.Time]
	latestChangedDtsFiles collections.SyncMap[tspath.Path, time.Time]
}

var (
	_ vfs.FS                      = (*host)(nil)
	_ compiler.CompilerHost       = (*host)(nil)
	_ incremental.BuildInfoReader = (*host)(nil)
	_ incremental.BuildHost       = (*host)(nil)
)

func (h *host) FS() vfs.FS {
	return h
}

func (h *host) UseCaseSensitiveFileNames() bool {
	return h.host.FS().UseCaseSensitiveFileNames()
}

func (h *host) FileExists(path string) bool {
	return h.host.FS().FileExists(path)
}

func (h *host) ReadFile(path string) (string, bool) {
	return h.host.FS().ReadFile(path)
}

func (h *host) WriteFile(path string, data string, writeByteOrderMark bool) error {
	err := h.host.FS().WriteFile(path, data, writeByteOrderMark)
	if err == nil {
		filePath := h.builder.toPath(path)
		h.buildInfos.Delete(filePath)
		h.mTimes.Delete(filePath)
	}
	return err
}

func (h *host) Remove(path string) error {
	return h.host.FS().Remove(path)
}

func (h *host) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	return h.host.FS().Chtimes(path, aTime, mTime)
}

func (h *host) DirectoryExists(path string) bool {
	return h.host.FS().DirectoryExists(path)
}

func (h *host) GetAccessibleEntries(path string) vfs.Entries {
	return h.host.FS().GetAccessibleEntries(path)
}

func (h *host) Stat(path string) vfs.FileInfo {
	return h.host.FS().Stat(path)
}

func (h *host) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return h.host.FS().WalkDir(root, walkFn)
}

func (h *host) Realpath(path string) string {
	return h.host.FS().Realpath(path)
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
	if existing, loaded := h.sourceFiles.Load(opts); loaded {
		return existing
	}

	file := h.host.GetSourceFile(opts)
	// Cache dts and json files as they will be reused
	if file != nil && (tspath.IsDeclarationFileName(file.FileName()) || tspath.FileExtensionIs(file.FileName(), tspath.ExtensionJson)) {
		file, _ = h.sourceFiles.LoadOrStore(opts, file)
	}
	return file
}

func (h *host) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
	if existing, loaded := h.resolvedReferences.Load(path); loaded {
		return existing.resolved
	}
	configStart := h.builder.opts.Sys.Now()
	commandLine, _ := tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, h.builder.opts.Command.CompilerOptions, h, &h.extendedConfigCache)
	configTime := h.builder.opts.Sys.Now().Sub(configStart)
	configAndTime, _ := h.resolvedReferences.LoadOrStore(path, &configAndTime{resolved: commandLine, time: configTime})
	return configAndTime.resolved
}

func (h *host) ReadBuildInfo(buildInfoFileName string) *incremental.BuildInfo {
	path := h.builder.toPath(buildInfoFileName)
	if existing, loaded := h.buildInfos.Load(path); loaded {
		return existing.buildInfo
	}
	return nil
}

func (h *host) readOrStoreBuildInfo(configPath tspath.Path, buildInfoFileName string) *incremental.BuildInfo {
	if existing, loaded := h.buildInfos.Load(h.builder.toPath(buildInfoFileName)); loaded {
		return existing.buildInfo
	}

	buildInfo := incremental.NewBuildInfoReader(h).ReadBuildInfo(buildInfoFileName)
	entry := &buildInfoAndConfig{buildInfo, configPath}
	entry, _ = h.buildInfos.LoadOrStore(h.builder.toPath(buildInfoFileName), entry)
	return entry.buildInfo
}

func (h *host) hasConflictingBuildInfo(configPath tspath.Path) bool {
	if existing, loaded := h.buildInfos.Load(configPath); loaded {
		return existing.config != configPath
	}
	return false
}

func (h *host) GetMTime(file string) time.Time {
	path := h.builder.toPath(file)
	if existing, loaded := h.mTimes.Load(path); loaded {
		return existing
	}
	stat := h.host.FS().Stat(file)
	var mTime time.Time
	if stat != nil {
		mTime = stat.ModTime()
	}
	mTime, _ = h.mTimes.LoadOrStore(path, mTime)
	return mTime
}

func (h *host) SetMTime(file string, mTime time.Time) error {
	path := h.builder.toPath(file)
	err := h.host.FS().Chtimes(file, time.Time{}, mTime)
	if err == nil {
		h.mTimes.Store(path, mTime)
	}
	return err
}

func (h *host) getLatestChangedDtsMTime(config string) time.Time {
	path := h.builder.toPath(config)
	if existing, loaded := h.latestChangedDtsFiles.Load(path); loaded {
		return existing
	}

	var changedDtsMTime time.Time
	if configAndTime, loaded := h.resolvedReferences.Load(path); loaded {
		buildInfoPath := configAndTime.resolved.GetBuildInfoFileName()
		buildInfo := h.readOrStoreBuildInfo(path, buildInfoPath)
		if buildInfo != nil && buildInfo.LatestChangedDtsFile != "" {
			changedDtsMTime = h.GetMTime(
				tspath.GetNormalizedAbsolutePath(
					buildInfo.LatestChangedDtsFile,
					tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(buildInfoPath, h.GetCurrentDirectory())),
				),
			)
		}
	}

	changedDtsMTime, _ = h.mTimes.LoadOrStore(path, changedDtsMTime)
	return changedDtsMTime
}
