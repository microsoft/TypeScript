package incremental

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func buildInfoToSnapshot(buildInfo *BuildInfo, config *tsoptions.ParsedCommandLine, host compiler.CompilerHost) *snapshot {
	to := &toSnapshot{
		buildInfo:          buildInfo,
		buildInfoDirectory: tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(config.GetBuildInfoFileName(), config.GetCurrentDirectory())),
		filePaths:          make([]tspath.Path, 0, len(buildInfo.FileNames)),
		filePathSet:        make([]*collections.Set[tspath.Path], 0, len(buildInfo.FileIdsList)),
	}
	to.filePaths = core.Map(buildInfo.FileNames, func(fileName string) tspath.Path {
		if !strings.HasPrefix(fileName, ".") {
			return tspath.ToPath(tspath.CombinePaths(host.DefaultLibraryPath(), fileName), host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames())
		}
		return tspath.ToPath(fileName, to.buildInfoDirectory, config.UseCaseSensitiveFileNames())
	})
	to.filePathSet = core.Map(buildInfo.FileIdsList, func(fileIdList []BuildInfoFileId) *collections.Set[tspath.Path] {
		fileSet := collections.NewSetWithSizeHint[tspath.Path](len(fileIdList))
		for _, fileId := range fileIdList {
			fileSet.Add(to.toFilePath(fileId))
		}
		return fileSet
	})
	to.setCompilerOptions()
	to.setFileInfoAndEmitSignatures()
	to.setReferencedMap()
	to.setChangeFileSet()
	to.setSemanticDiagnostics()
	to.setEmitDiagnostics()
	to.setAffectedFilesPendingEmit()
	if buildInfo.LatestChangedDtsFile != "" {
		to.snapshot.latestChangedDtsFile = to.toAbsolutePath(buildInfo.LatestChangedDtsFile)
	}
	to.snapshot.hasErrors = core.IfElse(buildInfo.Errors, core.TSTrue, core.TSFalse)
	to.snapshot.hasSemanticErrors = buildInfo.SemanticErrors
	to.snapshot.checkPending = buildInfo.CheckPending
	return &to.snapshot
}

type toSnapshot struct {
	buildInfo          *BuildInfo
	buildInfoDirectory string
	snapshot           snapshot
	filePaths          []tspath.Path
	filePathSet        []*collections.Set[tspath.Path]
}

func (t *toSnapshot) toAbsolutePath(path string) string {
	return tspath.GetNormalizedAbsolutePath(path, t.buildInfoDirectory)
}

func (t *toSnapshot) toFilePath(fileId BuildInfoFileId) tspath.Path {
	return t.filePaths[fileId-1]
}

func (t *toSnapshot) toFilePathSet(fileIdListId BuildInfoFileIdListId) *collections.Set[tspath.Path] {
	return t.filePathSet[fileIdListId-1]
}

func (t *toSnapshot) toBuildInfoDiagnosticsWithFileName(diagnostics []*BuildInfoDiagnostic) []*buildInfoDiagnosticWithFileName {
	return core.Map(diagnostics, func(d *BuildInfoDiagnostic) *buildInfoDiagnosticWithFileName {
		var file tspath.Path
		if d.File != 0 {
			file = t.toFilePath(d.File)
		}
		return &buildInfoDiagnosticWithFileName{
			file:               file,
			noFile:             d.NoFile,
			pos:                d.Pos,
			end:                d.End,
			code:               d.Code,
			category:           d.Category,
			message:            d.Message,
			messageChain:       t.toBuildInfoDiagnosticsWithFileName(d.MessageChain),
			relatedInformation: t.toBuildInfoDiagnosticsWithFileName(d.RelatedInformation),
			reportsUnnecessary: d.ReportsUnnecessary,
			reportsDeprecated:  d.ReportsDeprecated,
			skippedOnNoEmit:    d.SkippedOnNoEmit,
		}
	})
}

func (t *toSnapshot) toDiagnosticsOrBuildInfoDiagnosticsWithFileName(dig *BuildInfoDiagnosticsOfFile) *diagnosticsOrBuildInfoDiagnosticsWithFileName {
	return &diagnosticsOrBuildInfoDiagnosticsWithFileName{
		buildInfoDiagnostics: t.toBuildInfoDiagnosticsWithFileName(dig.Diagnostics),
	}
}

func (t *toSnapshot) setCompilerOptions() {
	t.snapshot.options = t.buildInfo.GetCompilerOptions(t.buildInfoDirectory)
}

func (t *toSnapshot) setFileInfoAndEmitSignatures() {
	isComposite := t.snapshot.options.Composite.IsTrue()
	for index, buildInfoFileInfo := range t.buildInfo.FileInfos {
		path := t.toFilePath(BuildInfoFileId(index + 1))
		info := buildInfoFileInfo.GetFileInfo()
		t.snapshot.fileInfos.Store(path, info)
		// Add default emit signature as file's signature
		if info.signature != "" && isComposite {
			t.snapshot.emitSignatures.Store(path, &emitSignature{signature: info.signature})
		}
	}
	// Fix up emit signatures
	for _, value := range t.buildInfo.EmitSignatures {
		if value.noEmitSignature() {
			t.snapshot.emitSignatures.Delete(t.toFilePath(value.FileId))
		} else {
			path := t.toFilePath(value.FileId)
			t.snapshot.emitSignatures.Store(path, value.toEmitSignature(path, &t.snapshot.emitSignatures))
		}
	}
}

func (t *toSnapshot) setReferencedMap() {
	for _, entry := range t.buildInfo.ReferencedMap {
		t.snapshot.referencedMap.storeReferences(t.toFilePath(entry.FileId), t.toFilePathSet(entry.FileIdListId))
	}
}

func (t *toSnapshot) setChangeFileSet() {
	for _, fileId := range t.buildInfo.ChangeFileSet {
		filePath := t.toFilePath(fileId)
		t.snapshot.changedFilesSet.Add(filePath)
	}
}

func (t *toSnapshot) setSemanticDiagnostics() {
	t.snapshot.fileInfos.Range(func(path tspath.Path, info *fileInfo) bool {
		// Initialize to have no diagnostics if its not changed file
		if !t.snapshot.changedFilesSet.Has(path) {
			t.snapshot.semanticDiagnosticsPerFile.Store(path, &diagnosticsOrBuildInfoDiagnosticsWithFileName{})
		}
		return true
	})
	for _, diagnostic := range t.buildInfo.SemanticDiagnosticsPerFile {
		if diagnostic.FileId != 0 {
			filePath := t.toFilePath(diagnostic.FileId)
			t.snapshot.semanticDiagnosticsPerFile.Delete(filePath) // does not have cached diagnostics
		} else {
			filePath := t.toFilePath(diagnostic.Diagnostics.FileId)
			t.snapshot.semanticDiagnosticsPerFile.Store(filePath, t.toDiagnosticsOrBuildInfoDiagnosticsWithFileName(diagnostic.Diagnostics))
		}
	}
}

func (t *toSnapshot) setEmitDiagnostics() {
	for _, diagnostic := range t.buildInfo.EmitDiagnosticsPerFile {
		filePath := t.toFilePath(diagnostic.FileId)
		t.snapshot.emitDiagnosticsPerFile.Store(filePath, t.toDiagnosticsOrBuildInfoDiagnosticsWithFileName(diagnostic))
	}
}

func (t *toSnapshot) setAffectedFilesPendingEmit() {
	if len(t.buildInfo.AffectedFilesPendingEmit) == 0 {
		return
	}
	ownOptionsEmitKind := GetFileEmitKind(t.snapshot.options)
	for _, pendingEmit := range t.buildInfo.AffectedFilesPendingEmit {
		t.snapshot.affectedFilesPendingEmit.Store(t.toFilePath(pendingEmit.FileId), core.IfElse(pendingEmit.EmitKind == 0, ownOptionsEmitKind, pendingEmit.EmitKind))
	}
}
