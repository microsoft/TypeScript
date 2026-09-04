package ls

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/outputpaths"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// sourceFileRangeToLSPLocation maps a range from an arbitrary program SourceFile to an LSP location,
// composing content-mapper span maps and declaration source maps as needed. LS features should use this
// for cross-file results instead of calling getMappedLocation or lsconv.ToLSPLocation directly.
// This unfiltered form is appropriate for diagnostics and text edits.
func (l *LanguageService) sourceFileRangeToLSPLocation(file *ast.SourceFile, fileRange core.TextRange) (lsproto.Location, spanmap.Fidelity) {
	if file.ContentMapper() != "" {
		return l.converters.ToLSPLocation(file, fileRange)
	}
	return l.getMappedLocation(file.FileName(), fileRange)
}

// sourceFileRangeToLSPLocationForFeature is the preferred conversion for visible LS results that may
// come from another file. It applies content-mapper feature filtering and follows declaration source maps.
// Do not use it for diagnostics or text edits.
func (l *LanguageService) sourceFileRangeToLSPLocationForFeature(file *ast.SourceFile, fileRange core.TextRange, feature spanmap.Feature) (lsproto.Location, spanmap.Fidelity) {
	if file.ContentMapper() != "" {
		return l.converters.ToLSPLocationForFeature(file, fileRange, feature)
	}
	return l.getMappedLocation(file.FileName(), fileRange)
}

// getMappedLocation follows declaration source maps from a .d.ts range to its source location.
// It is an implementation detail of sourceFileRangeToLSPLocation; LS features should not call it directly,
// because it does not preserve a content-mapper projection or apply span-map feature filtering.
func (l *LanguageService) getMappedLocation(fileName tspath.RootedFilePath, fileRange core.TextRange) (lsproto.Location, spanmap.Fidelity) {
	startPos := l.tryGetSourcePosition(fileName, core.TextPos(fileRange.Pos()))
	if startPos == nil {
		lspRange, fidelity := l.createLspRangeFromRange(fileRange, l.getScript(fileName))
		return lsproto.Location{
			Uri:   lsconv.FilePathToDocumentURI(fileName),
			Range: lspRange,
		}, fidelity
	}
	endPos := l.tryGetSourcePosition(fileName, core.TextPos(fileRange.End()))
	if endPos == nil || endPos.FileName != startPos.FileName || endPos.Pos < startPos.Pos {
		// When end doesn't map, maps to a different source file (e.g. in a .d.ts with a
		// multi-source source map from --outFile compilation), or maps to a position before
		// start (non-monotonic source map mappings), approximate the end position.
		endPos = &sourcemap.DocumentPosition{
			FileName: startPos.FileName,
			Pos:      startPos.Pos + fileRange.Len(),
		}
	}
	newRange := core.NewTextRange(startPos.Pos, endPos.Pos)
	lspRange, fidelity := l.createLspRangeFromRange(newRange, l.getScript(startPos.FileName))
	return lsproto.Location{
		Uri:   lsconv.FilePathToDocumentURI(startPos.FileName),
		Range: lspRange,
	}, fidelity
}

type script struct {
	fileName tspath.RootedFilePath
	text     string
}

func (s *script) FileName() tspath.RootedFilePath {
	return s.fileName
}

func (s *script) OriginalFileName() tspath.RootedFilePath { return s.fileName }

func (s *script) Text() string {
	return s.text
}

func (s *script) OriginalText() string      { return s.text }
func (s *script) SpanMap() *spanmap.SpanMap { return nil }

var _ lsconv.Script = (*script)(nil)

func (l *LanguageService) getScript(fileName tspath.RootedFilePath) *script {
	text, ok := l.host.ReadFile(fileName)
	if !ok {
		return nil
	}
	return &script{fileName: fileName, text: text}
}

func (l *LanguageService) tryGetSourcePosition(
	fileName tspath.RootedFilePath,
	position core.TextPos,
) *sourcemap.DocumentPosition {
	newPos := l.tryGetSourcePositionWorker(fileName, position)
	if newPos != nil {
		if _, ok := l.ReadFile(newPos.FileName); !ok { // File doesn't exist
			return nil
		}
	}
	return newPos
}

func (l *LanguageService) tryGetSourcePositionWorker(
	fileName tspath.RootedFilePath,
	position core.TextPos,
) *sourcemap.DocumentPosition {
	if !fileName.IsDeclarationFile() {
		return nil
	}

	positionMapper := l.GetDocumentPositionMapper(fileName)
	documentPos := positionMapper.GetSourcePosition(&sourcemap.DocumentPosition{FileName: fileName, Pos: int(position)})
	if documentPos == nil {
		return nil
	}
	if newPos := l.tryGetSourcePositionWorker(documentPos.FileName, core.TextPos(documentPos.Pos)); newPos != nil {
		return newPos
	}
	return documentPos
}

func (l *LanguageService) tryGetGeneratedPosition(
	fileName tspath.RootedFilePath,
	position core.TextPos,
) *sourcemap.DocumentPosition {
	newPos := l.tryGetGeneratedPositionWorker(fileName, position)
	if newPos != nil {
		if _, ok := l.ReadFile(newPos.FileName); !ok { // File doesn't exist
			return nil
		}
	}
	return newPos
}

func (l *LanguageService) tryGetGeneratedPositionWorker(
	fileName tspath.RootedFilePath,
	position core.TextPos,
) *sourcemap.DocumentPosition {
	if fileName.IsDeclarationFile() {
		return nil
	}

	program := l.GetProgram()
	if program == nil || program.GetSourceFile(fileName) == nil {
		return nil
	}

	path := program.PathKeyForFileName(fileName)
	// If this is source file of project reference source (instead of redirect) there is no generated position
	if program.IsSourceFromProjectReference(path) {
		return nil
	}

	declarationFileName := outputpaths.GetOutputDeclarationFileNameWorker(fileName, program.Options(), program)
	positionMapper := l.GetDocumentPositionMapper(declarationFileName)
	documentPos := positionMapper.GetGeneratedPosition(&sourcemap.DocumentPosition{FileName: fileName, Pos: int(position)})
	if documentPos == nil {
		return nil
	}
	if newPos := l.tryGetGeneratedPositionWorker(documentPos.FileName, core.TextPos(documentPos.Pos)); newPos != nil {
		return newPos
	}
	return documentPos
}
