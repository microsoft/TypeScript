package lsp

import (
	"fmt"
	"net/url"
	"sort"
	"strings"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func languageKindToScriptKind(languageID lsproto.LanguageKind) core.ScriptKind {
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

func lineAndCharacterToPosition(lineAndCharacter lsproto.Position, lineMap []core.TextPos) int {
	line := int(lineAndCharacter.Line)
	offset := int(lineAndCharacter.Character)

	if line < 0 || line >= len(lineMap) {
		panic(fmt.Sprintf("Bad line number. Line: %d, lineMap length: %d", line, len(lineMap)))
	}

	res := int(lineMap[line]) + offset
	if line < len(lineMap)-1 && res >= int(lineMap[line+1]) {
		panic("resulting position is out of bounds")
	}
	return res
}

func positionToLineAndCharacter(position int, lineMap []core.TextPos) lsproto.Position {
	line := sort.Search(len(lineMap), func(i int) bool {
		return int(lineMap[i]) > position
	}) - 1
	if line < 0 {
		line = 0
	}
	return lsproto.Position{
		Line:      uint32(line),
		Character: uint32(position - int(lineMap[line])),
	}
}

func documentUriToFileName(uri lsproto.DocumentUri) string {
	uriStr := string(uri)
	if strings.HasPrefix(uriStr, "file:///") {
		path := uriStr[7:]
		if len(path) >= 4 {
			if nextSlash := strings.IndexByte(path[1:], '/'); nextSlash != -1 {
				if possibleDrive, _ := url.PathUnescape(path[1 : nextSlash+2]); strings.HasSuffix(possibleDrive, ":/") {
					return possibleDrive + path[len(possibleDrive)+3:]
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

func fileNameToDocumentUri(fileName string) lsproto.DocumentUri {
	if strings.HasPrefix(fileName, "^/") {
		return lsproto.DocumentUri(strings.Replace(fileName[2:], "/ts-nul-authority/", ":", 1))
	}
	if firstSlash := strings.IndexByte(fileName, '/'); firstSlash > 0 && fileName[firstSlash-1] == ':' {
		return lsproto.DocumentUri("file:///" + url.PathEscape(fileName[:firstSlash]) + fileName[firstSlash:])
	}
	return lsproto.DocumentUri("file://" + fileName)
}

func toLspLocation(location ls.Location, lineMap []core.TextPos) lsproto.Location {
	return lsproto.Location{
		Uri: fileNameToDocumentUri(location.FileName),
		Range: lsproto.Range{
			Start: positionToLineAndCharacter(location.Range.Pos(), lineMap),
			End:   positionToLineAndCharacter(location.Range.End(), lineMap),
		},
	}
}
