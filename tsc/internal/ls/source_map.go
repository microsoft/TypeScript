package ls

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func (l *LanguageService) getMappedLocation(fileName string, fileRange core.TextRange) lsproto.Location {
	startPos := l.tryGetSourcePosition(fileName, core.TextPos(fileRange.Pos()))
	if startPos == nil {
		lspRange := l.createLspRangeFromRange(fileRange, l.getScript(fileName))
		return lsproto.Location{
			Uri:   FileNameToDocumentURI(fileName),
			Range: *lspRange,
		}
	}
	endPos := l.tryGetSourcePosition(fileName, core.TextPos(fileRange.End()))
	debug.Assert(endPos.FileName == startPos.FileName, "start and end should be in same file")
	newRange := core.NewTextRange(startPos.Pos, endPos.Pos)
	lspRange := l.createLspRangeFromRange(newRange, l.getScript(startPos.FileName))
	return lsproto.Location{
		Uri:   FileNameToDocumentURI(startPos.FileName),
		Range: *lspRange,
	}
}

type script struct {
	fileName string
	text     string
}

func (s *script) FileName() string {
	return s.fileName
}

func (s *script) Text() string {
	return s.text
}

func (l *LanguageService) getScript(fileName string) *script {
	text, ok := l.host.ReadFile(fileName)
	if !ok {
		return nil
	}
	return &script{fileName: fileName, text: text}
}

func (l *LanguageService) tryGetSourcePosition(
	fileName string,
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
	fileName string,
	position core.TextPos,
) *sourcemap.DocumentPosition {
	if !tspath.IsDeclarationFileName(fileName) {
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
