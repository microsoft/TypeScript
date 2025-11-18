package lsconv

import (
	"context"
	"fmt"
	"net/url"
	"slices"
	"strings"
	"unicode/utf16"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type Converters struct {
	getLineMap       func(fileName string) *LSPLineMap
	positionEncoding lsproto.PositionEncodingKind
}

type Script interface {
	FileName() string
	Text() string
}

func NewConverters(positionEncoding lsproto.PositionEncodingKind, getLineMap func(fileName string) *LSPLineMap) *Converters {
	return &Converters{
		getLineMap:       getLineMap,
		positionEncoding: positionEncoding,
	}
}

func (c *Converters) ToLSPRange(script Script, textRange core.TextRange) lsproto.Range {
	return lsproto.Range{
		Start: c.PositionToLineAndCharacter(script, core.TextPos(textRange.Pos())),
		End:   c.PositionToLineAndCharacter(script, core.TextPos(textRange.End())),
	}
}

func (c *Converters) FromLSPRange(script Script, textRange lsproto.Range) core.TextRange {
	return core.NewTextRange(
		int(c.LineAndCharacterToPosition(script, textRange.Start)),
		int(c.LineAndCharacterToPosition(script, textRange.End)),
	)
}

func (c *Converters) FromLSPTextChange(script Script, change *lsproto.TextDocumentContentChangePartial) core.TextChange {
	return core.TextChange{
		TextRange: c.FromLSPRange(script, change.Range),
		NewText:   change.Text,
	}
}

func (c *Converters) ToLSPLocation(script Script, rng core.TextRange) lsproto.Location {
	return lsproto.Location{
		Uri:   FileNameToDocumentURI(script.FileName()),
		Range: c.ToLSPRange(script, rng),
	}
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
	case "json":
		return core.ScriptKindJSON
	default:
		return core.ScriptKindUnknown
	}
}

// https://github.com/microsoft/vscode-uri/blob/edfdccd976efaf4bb8fdeca87e97c47257721729/src/uri.ts#L455
var extraEscapeReplacer = strings.NewReplacer(
	":", "%3A",
	"/", "%2F",
	"?", "%3F",
	"#", "%23",
	"[", "%5B",
	"]", "%5D",
	"@", "%40",

	"!", "%21",
	"$", "%24",
	"&", "%26",
	"'", "%27",
	"(", "%28",
	")", "%29",
	"*", "%2A",
	"+", "%2B",
	",", "%2C",
	";", "%3B",
	"=", "%3D",

	" ", "%20",
)

func FileNameToDocumentURI(fileName string) lsproto.DocumentUri {
	if strings.HasPrefix(fileName, "^/") {
		scheme, rest, ok := strings.Cut(fileName[2:], "/")
		if !ok {
			panic("invalid file name: " + fileName)
		}
		authority, path, ok := strings.Cut(rest, "/")
		if !ok {
			panic("invalid file name: " + fileName)
		}
		if authority == "ts-nul-authority" {
			return lsproto.DocumentUri(scheme + ":" + path)
		}
		return lsproto.DocumentUri(scheme + "://" + authority + "/" + path)
	}

	volume, fileName, _ := tspath.SplitVolumePath(fileName)
	if volume != "" {
		volume = "/" + extraEscapeReplacer.Replace(volume)
	}

	fileName = strings.TrimPrefix(fileName, "//")

	parts := strings.Split(fileName, "/")
	for i, part := range parts {
		parts[i] = extraEscapeReplacer.Replace(url.PathEscape(part))
	}

	return lsproto.DocumentUri("file://" + volume + strings.Join(parts, "/"))
}

func (c *Converters) LineAndCharacterToPosition(script Script, lineAndCharacter lsproto.Position) core.TextPos {
	// UTF-8/16 0-indexed line and character to UTF-8 offset

	lineMap := c.getLineMap(script.FileName())

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

	for i, r := range script.Text()[start:] {
		u16Len := core.TextPos(utf16.RuneLen(r))
		if utf16Char+u16Len > char {
			break
		}
		utf16Char += u16Len
		utf8Char = core.TextPos(i + utf8.RuneLen(r))
	}

	return start + utf8Char
}

func (c *Converters) PositionToLineAndCharacter(script Script, position core.TextPos) lsproto.Position {
	// UTF-8 offset to UTF-8/16 0-indexed line and character

	position = min(position, core.TextPos(len(script.Text())))

	lineMap := c.getLineMap(script.FileName())

	line, isLineStart := slices.BinarySearch(lineMap.LineStarts, position)
	if !isLineStart {
		line--
	}
	line = max(0, line)

	// The current line ranges from lineMap.LineStarts[line] (or 0) to lineMap.LineStarts[line+1] (or len(text)).

	start := lineMap.LineStarts[line]

	var character core.TextPos
	if lineMap.AsciiOnly || c.positionEncoding == lsproto.PositionEncodingKindUTF8 {
		character = position - start
	} else {
		// We need to rescan the text as UTF-16 to find the character offset.
		for _, r := range script.Text()[start:position] {
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

type diagnosticCapabilities struct {
	relatedInformation bool
	tagValueSet        []lsproto.DiagnosticTag
}

// DiagnosticToLSPPull converts a diagnostic for pull diagnostics (textDocument/diagnostic)
func DiagnosticToLSPPull(ctx context.Context, converters *Converters, diagnostic *ast.Diagnostic) *lsproto.Diagnostic {
	clientCaps := lsproto.GetClientCapabilities(ctx).TextDocument.Diagnostic
	return diagnosticToLSP(converters, diagnostic, diagnosticCapabilities{
		relatedInformation: clientCaps.RelatedInformation,
		tagValueSet:        clientCaps.TagSupport.ValueSet,
	})
}

// DiagnosticToLSPPush converts a diagnostic for push diagnostics (textDocument/publishDiagnostics)
func DiagnosticToLSPPush(ctx context.Context, converters *Converters, diagnostic *ast.Diagnostic) *lsproto.Diagnostic {
	clientCaps := lsproto.GetClientCapabilities(ctx).TextDocument.PublishDiagnostics
	return diagnosticToLSP(converters, diagnostic, diagnosticCapabilities{
		relatedInformation: clientCaps.RelatedInformation,
		tagValueSet:        clientCaps.TagSupport.ValueSet,
	})
}

func diagnosticToLSP(converters *Converters, diagnostic *ast.Diagnostic, caps diagnosticCapabilities) *lsproto.Diagnostic {
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

	var relatedInformation []*lsproto.DiagnosticRelatedInformation
	if caps.relatedInformation {
		relatedInformation = make([]*lsproto.DiagnosticRelatedInformation, 0, len(diagnostic.RelatedInformation()))
		for _, related := range diagnostic.RelatedInformation() {
			relatedInformation = append(relatedInformation, &lsproto.DiagnosticRelatedInformation{
				Location: lsproto.Location{
					Uri:   FileNameToDocumentURI(related.File().FileName()),
					Range: converters.ToLSPRange(related.File(), related.Loc()),
				},
				Message: related.Message(),
			})
		}
	}

	var tags []lsproto.DiagnosticTag
	if len(caps.tagValueSet) > 0 && (diagnostic.ReportsUnnecessary() || diagnostic.ReportsDeprecated()) {
		tags = make([]lsproto.DiagnosticTag, 0, 2)
		if diagnostic.ReportsUnnecessary() && slices.Contains(caps.tagValueSet, lsproto.DiagnosticTagUnnecessary) {
			tags = append(tags, lsproto.DiagnosticTagUnnecessary)
		}
		if diagnostic.ReportsDeprecated() && slices.Contains(caps.tagValueSet, lsproto.DiagnosticTagDeprecated) {
			tags = append(tags, lsproto.DiagnosticTagDeprecated)
		}
	}

	// For diagnostics without a file (e.g., program diagnostics), use a zero range
	var lspRange lsproto.Range
	if diagnostic.File() != nil {
		lspRange = converters.ToLSPRange(diagnostic.File(), diagnostic.Loc())
	}

	return &lsproto.Diagnostic{
		Range: lspRange,
		Code: &lsproto.IntegerOrString{
			Integer: ptrTo(diagnostic.Code()),
		},
		Severity:           &severity,
		Message:            messageChainToString(diagnostic),
		Source:             ptrTo("ts"),
		RelatedInformation: ptrToSliceIfNonEmpty(relatedInformation),
		Tags:               ptrToSliceIfNonEmpty(tags),
	}
}

func messageChainToString(diagnostic *ast.Diagnostic) string {
	if len(diagnostic.MessageChain()) == 0 {
		return diagnostic.Message()
	}
	var b strings.Builder
	diagnosticwriter.WriteFlattenedASTDiagnosticMessage(&b, diagnostic, "\n")
	return b.String()
}

func ptrToSliceIfNonEmpty[T any](s []T) *[]T {
	if len(s) == 0 {
		return nil
	}
	return &s
}
