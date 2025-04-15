package ls

import (
	"fmt"
	"net/url"
	"slices"
	"strings"
	"unicode/utf16"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

type ScriptInfo interface {
	Text() string
	LineMap() *LineMap
}

type Converters struct {
	getScriptInfo    func(fileName string) ScriptInfo
	positionEncoding lsproto.PositionEncodingKind
}

func NewConverters(positionEncoding lsproto.PositionEncodingKind, getScriptInfo func(fileName string) ScriptInfo) *Converters {
	return &Converters{
		getScriptInfo:    getScriptInfo,
		positionEncoding: positionEncoding,
	}
}

func (c *Converters) ToLSPRange(fileName string, textRange core.TextRange) (lsproto.Range, error) {
	scriptInfo := c.getScriptInfo(fileName)
	if scriptInfo == nil {
		return lsproto.Range{}, fmt.Errorf("no script info found for %s", fileName)
	}

	return lsproto.Range{
		Start: c.PositionToLineAndCharacter(scriptInfo, core.TextPos(textRange.Pos())),
		End:   c.PositionToLineAndCharacter(scriptInfo, core.TextPos(textRange.End())),
	}, nil
}

func (c *Converters) FromLSPRange(textRange lsproto.Range, fileName string) (core.TextRange, error) {
	scriptInfo := c.getScriptInfo(fileName)
	if scriptInfo == nil {
		return core.TextRange{}, fmt.Errorf("no script info found for %s", fileName)
	}
	return core.NewTextRange(
		int(c.LineAndCharacterToPosition(scriptInfo, textRange.Start)),
		int(c.LineAndCharacterToPosition(scriptInfo, textRange.End)),
	), nil
}

func (c *Converters) FromLSPTextChange(change *lsproto.TextDocumentContentChangePartial, fileName string) (TextChange, error) {
	textRange, err := c.FromLSPRange(change.Range, fileName)
	if err != nil {
		return TextChange{}, fmt.Errorf("error converting range: %w", err)
	}
	return TextChange{
		TextRange: textRange,
		NewText:   change.Text,
	}, nil
}

func (c *Converters) ToLSPLocation(location Location) (lsproto.Location, error) {
	rng, err := c.ToLSPRange(location.FileName, location.Range)
	if err != nil {
		return lsproto.Location{}, err
	}
	return lsproto.Location{
		Uri:   FileNameToDocumentURI(location.FileName),
		Range: rng,
	}, nil
}

func (c *Converters) FromLSPLocation(location lsproto.Location) (Location, error) {
	fileName := DocumentURIToFileName(location.Uri)
	rng, err := c.FromLSPRange(location.Range, fileName)
	if err != nil {
		return Location{}, err
	}
	return Location{
		FileName: fileName,
		Range:    rng,
	}, nil
}

func (c *Converters) ToLSPDiagnostic(diagnostic *ast.Diagnostic) (*lsproto.Diagnostic, error) {
	textRange, err := c.ToLSPRange(diagnostic.File().FileName(), diagnostic.Loc())
	if err != nil {
		return nil, fmt.Errorf("error converting diagnostic range: %w", err)
	}

	var severity lsproto.DiagnosticSeverity
	switch diagnostic.Category() {
	case diagnostics.CategorySuggestion:
		severity = lsproto.DiagnosticSeverityHint
	case diagnostics.CategoryMessage:
		severity = lsproto.DiagnosticSeverityInformation
	case diagnostics.CategoryWarning:
		severity = lsproto.DiagnosticSeverityWarning
	default:
		severity = lsproto.DiagnosticSeverityError
	}

	relatedInformation := make([]*lsproto.DiagnosticRelatedInformation, 0, len(diagnostic.RelatedInformation()))
	for _, related := range diagnostic.RelatedInformation() {
		relatedRange, err := c.ToLSPRange(related.File().FileName(), related.Loc())
		if err != nil {
			return nil, fmt.Errorf("error converting related info range: %w", err)
		}
		relatedInformation = append(relatedInformation, &lsproto.DiagnosticRelatedInformation{
			Location: lsproto.Location{
				Uri:   FileNameToDocumentURI(related.File().FileName()),
				Range: relatedRange,
			},
			Message: related.Message(),
		})
	}

	return &lsproto.Diagnostic{
		Range: textRange,
		Code: &lsproto.IntegerOrString{
			Integer: ptrTo(diagnostic.Code()),
		},
		Severity:           &severity,
		Message:            diagnostic.Message(),
		Source:             ptrTo("ts"),
		RelatedInformation: &relatedInformation,
	}, nil
}

func (c *Converters) LineAndCharacterToPositionForFile(lineAndCharacter lsproto.Position, fileName string) (int, error) {
	scriptInfo := c.getScriptInfo(fileName)
	if scriptInfo == nil {
		return 0, fmt.Errorf("no script info found for %s", fileName)
	}
	return int(c.LineAndCharacterToPosition(scriptInfo, lineAndCharacter)), nil
}

func LanguageKindToScriptKind(languageID lsproto.LanguageKind) core.ScriptKind {
	switch languageID {
	case "typescript":
		return core.ScriptKindTS
	case "typescriptreact":
		return core.ScriptKindTSX
	case "javascript":
		return core.ScriptKindJS
	case "javascriptreact":
		return core.ScriptKindJSX
	default:
		return core.ScriptKindUnknown
	}
}

func DocumentURIToFileName(uri lsproto.DocumentUri) string {
	uriStr := string(uri)
	if strings.HasPrefix(uriStr, "file:///") {
		path := uriStr[7:]
		if len(path) >= 4 {
			if nextSlash := strings.IndexByte(path[1:], '/'); nextSlash != -1 {
				if possibleDrive, _ := url.PathUnescape(path[1 : nextSlash+2]); strings.HasSuffix(possibleDrive, ":/") {
					return possibleDrive + path[len(possibleDrive)+1:]
				}
			}
		}
		return path
	}
	if strings.HasPrefix(uriStr, "file://") {
		// UNC path
		return uriStr[5:]
	}
	parsed := core.Must(url.Parse(uriStr))
	authority := parsed.Host
	if authority == "" {
		authority = "ts-nul-authority"
	}
	path := parsed.Path
	if path == "" {
		path = parsed.Opaque
	}
	if !strings.HasPrefix(path, "/") {
		path = "/" + path
	}
	fragment := parsed.Fragment
	if fragment != "" {
		fragment = "#" + fragment
	}
	return fmt.Sprintf("^/%s/%s%s%s", parsed.Scheme, authority, path, fragment)
}

func FileNameToDocumentURI(fileName string) lsproto.DocumentUri {
	if strings.HasPrefix(fileName, "^/") {
		return lsproto.DocumentUri(strings.Replace(fileName[2:], "/ts-nul-authority/", ":", 1))
	}
	if firstSlash := strings.IndexByte(fileName, '/'); firstSlash > 0 && fileName[firstSlash-1] == ':' {
		return lsproto.DocumentUri("file:///" + url.PathEscape(fileName[:firstSlash]) + fileName[firstSlash:])
	}
	return lsproto.DocumentUri("file://" + fileName)
}

func (c *Converters) LineAndCharacterToPosition(scriptInfo ScriptInfo, lineAndCharacter lsproto.Position) core.TextPos {
	// UTF-8/16 0-indexed line and character to UTF-8 offset

	lineMap := scriptInfo.LineMap()

	line := core.TextPos(lineAndCharacter.Line)
	char := core.TextPos(lineAndCharacter.Character)

	if line < 0 || int(line) >= len(lineMap.LineStarts) {
		panic(fmt.Sprintf("bad line number. Line: %d, lineMap length: %d", line, len(lineMap.LineStarts)))
	}

	start := lineMap.LineStarts[line]
	if lineMap.AsciiOnly || c.positionEncoding == lsproto.PositionEncodingKindUTF8 {
		return start + char
	}

	var utf8Char core.TextPos
	var utf16Char core.TextPos

	for i, r := range scriptInfo.Text()[start:] {
		u16Len := core.TextPos(utf16.RuneLen(r))
		if utf16Char+u16Len > char {
			break
		}
		utf16Char += u16Len
		utf8Char = core.TextPos(i + utf8.RuneLen(r))
	}

	return start + utf8Char
}

func (c *Converters) PositionToLineAndCharacter(scriptInfo ScriptInfo, position core.TextPos) lsproto.Position {
	// UTF-8 offset to UTF-8/16 0-indexed line and character

	lineMap := scriptInfo.LineMap()

	line, _ := slices.BinarySearch(lineMap.LineStarts, position)
	line = max(0, line-1)

	// The current line ranges from lineMap.LineStarts[line] (or 0) to lineMap.LineStarts[line+1] (or len(text)).

	start := lineMap.LineStarts[line]

	var character core.TextPos
	if lineMap.AsciiOnly || c.positionEncoding == lsproto.PositionEncodingKindUTF8 {
		character = position - start
	} else {
		// We need to rescan the text as UTF-16 to find the character offset.
		for _, r := range scriptInfo.Text()[start:position] {
			character += core.TextPos(utf16.RuneLen(r))
		}
	}

	return lsproto.Position{
		Line:      uint32(line),
		Character: uint32(character),
	}
}

func ptrTo[T any](v T) *T {
	return &v
}
