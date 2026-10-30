package incremental

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func buildInfoToSnapshot(buildInfo *BuildInfo, config *tsoptions.ParsedCommandLine, host compiler.CompilerHost) *snapshot {
	to := &toSnapshot{
		buildInfo:          buildInfo,
		buildInfoDirectory: config.GetBuildInfoFileName().Directory(),
		filePaths:          make([]tspath.PathKey, 0, len(buildInfo.FileNames)),
		filePathSet:        make([]*collections.Set[tspath.PathKey], 0, len(buildInfo.FileIdsList)),
	}
	to.filePaths = core.Map(buildInfo.FileNames, func(fileName BuildInfoPath) tspath.PathKey {
		return config.CaseSensitivity().PathKey(tspath.RootedPath(ResolveBuildInfoFileName(fileName, to.buildInfoDirectory, host.DefaultLibraryPath())))
	})
	to.filePathSet = core.Map(buildInfo.FileIdsList, func(fileIdList []BuildInfoFileId) *collections.Set[tspath.PathKey] {
		fileSet := collections.NewSetWithSizeHint[tspath.PathKey](len(fileIdList))
		for _, fileId := range fileIdList {
			fileSet.Add(to.filePathKey(fileId))
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
		to.snapshot.latestChangedDtsFile = to.toAbsoluteFileName(buildInfo.LatestChangedDtsFile)
	}
	to.snapshot.hasErrors = core.IfElse(buildInfo.Errors, core.TSTrue, core.TSFalse)
	to.snapshot.hasSemanticErrors = buildInfo.SemanticErrors
	to.snapshot.checkPending = buildInfo.CheckPending
	to.setPackageJsons()
	return &to.snapshot
}

type toSnapshot struct {
	buildInfo          *BuildInfo
	buildInfoDirectory tspath.RootedDirectoryPath
	snapshot           snapshot
	filePaths          []tspath.PathKey
	filePathSet        []*collections.Set[tspath.PathKey]
}

func (t *toSnapshot) toAbsoluteFileName(path BuildInfoPath) tspath.RootedFilePath {
	return t.buildInfoDirectory.ResolveFile(path.AsString())
}

func (t *toSnapshot) filePathKey(fileId BuildInfoFileId) tspath.PathKey {
	return t.filePaths[fileId-1]
}

func (t *toSnapshot) toFilePathSet(fileIdListId BuildInfoFileIdListId) *collections.Set[tspath.PathKey] {
	return t.filePathSet[fileIdListId-1]
}

func (t *toSnapshot) toBuildInfoDiagnosticsWithFileName(diagnostics []*BuildInfoDiagnostic) []*buildInfoDiagnosticWithFileName {
	return core.Map(diagnostics, func(d *BuildInfoDiagnostic) *buildInfoDiagnosticWithFileName {
		var file tspath.PathKey
		if d.File != 0 {
			file = t.filePathKey(d.File)
		}
		return &buildInfoDiagnosticWithFileName{
			file:               file,
			noFile:             d.NoFile,
			pos:                d.Pos,
			end:                d.End,
			code:               d.Code,
			category:           d.Category,
			source:             d.Source,
			messageText:        d.MessageText,
			messageKey:         d.MessageKey,
			messageArgs:        d.MessageArgs,
			messageChain:       t.toBuildInfoDiagnosticsWithFileName(d.MessageChain),
			relatedInformation: t.toBuildInfoDiagnosticsWithFileName(d.RelatedInformation),
			reportsUnnecessary: d.ReportsUnnecessary,
			reportsDeprecated:  d.ReportsDeprecated,
			skippedOnNoEmit:    d.SkippedOnNoEmit,
			repopulateInfo:     fromBuildInfoRepopulateInfo(d.RepopulateInfo),
		}
	})
}

func (t *toSnapshot) toDiagnosticsOrBuildInfoDiagnosticsWithFileName(dig *BuildInfoDiagnosticsOfFile) *DiagnosticsOrBuildInfoDiagnosticsWithFileName {
	return &DiagnosticsOrBuildInfoDiagnosticsWithFileName{
		buildInfoDiagnostics: t.toBuildInfoDiagnosticsWithFileName(dig.Diagnostics),
	}
}

func fromBuildInfoRepopulateInfo(info *BuildInfoRepopulateInfo) *ast.RepopulateDiagnosticInfo {
	if info == nil {
		return nil
	}
	return &ast.RepopulateDiagnosticInfo{
		Kind:            info.Kind,
		ModuleReference: info.ModuleReference,
		Mode:            info.Mode,
		PackageName:     info.PackageName,
	}
}

func (t *toSnapshot) setCompilerOptions() {
	t.snapshot.options = t.buildInfo.GetCompilerOptions(t.buildInfoDirectory)
}

func (t *toSnapshot) setFileInfoAndEmitSignatures() {
	isComposite := t.snapshot.options.Composite.IsTrue()
	for index, buildInfoFileInfo := range t.buildInfo.FileInfos {
		path := t.filePathKey(BuildInfoFileId(index + 1))
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
			t.snapshot.emitSignatures.Delete(t.filePathKey(value.FileId))
		} else {
			path := t.filePathKey(value.FileId)
			t.snapshot.emitSignatures.Store(path, value.toEmitSignature(path, &t.snapshot.emitSignatures))
		}
	}
}

func (t *toSnapshot) setReferencedMap() {
	for _, entry := range t.buildInfo.ReferencedMap {
		t.snapshot.referencedMap.storeReferences(t.filePathKey(entry.FileId), t.toFilePathSet(entry.FileIdListId))
	}
}

func (t *toSnapshot) setChangeFileSet() {
	for _, fileId := range t.buildInfo.ChangeFileSet {
		filePath := t.filePathKey(fileId)
		t.snapshot.changedFilesSet.Add(filePath)
	}
}

func (t *toSnapshot) setSemanticDiagnostics() {
	t.snapshot.fileInfos.Range(func(path tspath.PathKey, info *FileInfo) bool {
		// Initialize to have no diagnostics if its not changed file
		if !t.snapshot.changedFilesSet.Has(path) {
			t.snapshot.semanticDiagnosticsPerFile.Store(path, &DiagnosticsOrBuildInfoDiagnosticsWithFileName{})
		}
		return true
	})
	for _, diagnostic := range t.buildInfo.SemanticDiagnosticsPerFile {
		if diagnostic.FileId != 0 {
			filePath := t.filePathKey(diagnostic.FileId)
			t.snapshot.semanticDiagnosticsPerFile.Delete(filePath) // does not have cached diagnostics
		} else {
			filePath := t.filePathKey(diagnostic.Diagnostics.FileId)
			t.snapshot.semanticDiagnosticsPerFile.Store(filePath, t.toDiagnosticsOrBuildInfoDiagnosticsWithFileName(diagnostic.Diagnostics))
		}
	}
}

func (t *toSnapshot) setEmitDiagnostics() {
	for _, diagnostic := range t.buildInfo.EmitDiagnosticsPerFile {
		filePath := t.filePathKey(diagnostic.FileId)
		t.snapshot.emitDiagnosticsPerFile.Store(filePath, t.toDiagnosticsOrBuildInfoDiagnosticsWithFileName(diagnostic))
	}
}

func (t *toSnapshot) setAffectedFilesPendingEmit() {
	if len(t.buildInfo.AffectedFilesPendingEmit) == 0 {
		return
	}
	ownOptionsEmitKind := GetFileEmitKind(t.snapshot.options)
	for _, pendingEmit := range t.buildInfo.AffectedFilesPendingEmit {
		t.snapshot.affectedFilesPendingEmit.Store(t.filePathKey(pendingEmit.FileId), core.IfElse(pendingEmit.EmitKind == 0, ownOptionsEmitKind, pendingEmit.EmitKind))
	}
}

func (t *toSnapshot) setPackageJsons() {
	if t.buildInfo.PackageJsons != nil {
		t.snapshot.packageJsons = core.Map(t.buildInfo.PackageJsons, t.toAbsoluteFileName)
	} else {
		t.snapshot.packageJsons = make([]tspath.RootedFilePath, 0)
	}
	if t.buildInfo.MissingPackageJsons != nil {
		t.snapshot.missingPackageJsons = core.Map(t.buildInfo.MissingPackageJsons, t.toAbsoluteFileName)
	} else {
		t.snapshot.missingPackageJsons = make([]tspath.RootedFilePath, 0)
	}
}
