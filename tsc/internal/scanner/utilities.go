package scanner

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

const (
	surr1    = 0xd800
	surr2    = 0xdc00
	surr3    = 0xe000
	surrSelf = 0x10000
)

func codePointIsHighSurrogate(r rune) bool {
	return surr1 <= r && r < surr2
}

func codePointIsLowSurrogate(r rune) bool {
	return surr2 <= r && r < surr3
}

func surrogatePairToCodepoint(r1, r2 rune) rune {
	return (r1-surr1)<<10 | (r2 - surr2) + surrSelf
}

// encodeSurrogate encodes a surrogate code unit (0xD800–0xDFFF) as a 3-byte
// CESU-8 sequence. Standard UTF-8 decoders reject this range, so it acts as a
// sentinel that decodeClassAtomRune can identify when comparing class ranges in
// non-unicode regex mode (where surrogates are valid individual characters).
func encodeSurrogate(r rune) string {
	return string([]byte{
		0xED,
		byte(0x80 | ((r >> 6) & 0x3F)),
		byte(0x80 | (r & 0x3F)),
	})
}

// decodeClassAtomRune is like utf8.DecodeRuneInString but also handles
// surrogate code units encoded by encodeSurrogate.
func decodeClassAtomRune(s string) (rune, int) {
	if len(s) >= 3 && s[0] == 0xED && s[1] >= 0xA0 && s[1] <= 0xBF && s[2] >= 0x80 && s[2] <= 0xBF {
		r := rune(0xD000) | rune(s[1]&0x3F)<<6 | rune(s[2]&0x3F)
		return r, 3
	}
	return utf8.DecodeRuneInString(s)
}

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func IdentifierToKeywordKind(node *ast.Identifier) ast.Kind {
	return textToKeyword[node.Text]
}

func GetSourceTextOfNodeFromSourceFile(sourceFile *ast.SourceFile, node *ast.Node, includeTrivia bool) string {
	return GetTextOfNodeFromSourceText(sourceFile.Text(), node, includeTrivia)
}

func GetTextOfNodeFromSourceText(sourceText string, node *ast.Node, includeTrivia bool) string {
	if ast.NodeIsMissing(node) {
		return ""
	}
	pos := node.Pos()
	if !includeTrivia {
		pos = SkipTrivia(sourceText, pos)
	}
	text := sourceText[pos:node.End()]
	// if (isJSDocTypeExpressionOrChild(node)) {
	//     // strip space + asterisk at line start
	//     text = text.split(/\r\n|\n|\r/).map(line => line.replace(/^\s*\*/, "").trimStart()).join("\n");
	// }
	return text
}

func GetTextOfNode(node *ast.Node) string {
	return GetSourceTextOfNodeFromSourceFile(ast.GetSourceFileOfNode(node), node, false /*includeTrivia*/)
}

func DeclarationNameToString(name *ast.Node) string {
	if name == nil || name.Pos() == name.End() {
		return "(Missing)"
	}
	return GetTextOfNode(name)
}

func IsIdentifierText(name string, languageVariant core.LanguageVariant) bool {
	ch, size := utf8.DecodeRuneInString(name)
	if !IsIdentifierStart(ch) {
		return false
	}
	for i := size; i < len(name); {
		ch, size = utf8.DecodeRuneInString(name[i:])
		if !IsIdentifierPartEx(ch, languageVariant) {
			return false
		}
		i += size
	}
	return true
}

func IsIntrinsicJsxName(name string) bool {
	return len(name) != 0 && (name[0] >= 'a' && name[0] <= 'z' || strings.ContainsRune(name, '-'))
}
