package lsconv_test

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"os/exec"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestDocumentURIToFileName(t *testing.T) {
	t.Parallel()

	tests := []struct {
		uri      lsproto.DocumentUri
		fileName tspath.RootedFilePath
	}{
		{"file:///path/to/file.ts", "/path/to/file.ts"},
		{"file://server/share/file.ts", "//server/share/file.ts"},
		{"file:///d%3A/work/tsgo932/lib/utils.ts", "d:/work/tsgo932/lib/utils.ts"},
		{"file:///D%3A/work/tsgo932/lib/utils.ts", "d:/work/tsgo932/lib/utils.ts"},
		{"file:///d%3A/work/tsgo932/app/%28test%29/comp/comp-test.tsx", "d:/work/tsgo932/app/(test)/comp/comp-test.tsx"},
		{"file:///path/to/file.ts#section", "/path/to/file.ts"},
		{"file:///c:/test/me", "c:/test/me"},
		{"file://shares/files/c%23/p.cs", "//shares/files/c#/p.cs"},
		{"file:///c:/Source/Z%C3%BCrich%20or%20Zurich%20(%CB%88zj%CA%8A%C9%99r%C9%AAk,/Code/resources/app/plugins/c%23/plugin.json", "c:/Source/Zürich or Zurich (ˈzjʊərɪk,/Code/resources/app/plugins/c#/plugin.json"},
		{"file:///c:/test %25/path", "c:/test %/path"},
		// {"file:?q", "/"},
		{"file:///_:/path", "/_:/path"},
		{"file:///users/me/c%23-projects/", "/users/me/c#-projects"},
		{"file:///a/../b.ts", "/b.ts"},
		{"file://localhost/c%24/GitDevelopment/express", "//localhost/c$/GitDevelopment/express"},
		{"file:///c%3A/test%20with%20%2525/c%23code", "c:/test with %25/c#code"},

		{"untitled:Untitled-1", "^/~ts-uri-v2~/untitled/ts-nul-authority/Untitled-1"},
		{"untitled:Untitled-1#fragment", "^/~ts-uri-v2~/untitled/ts-nul-authority/~ts-uri~v2~556e7469746c65642d310023667261676d656e74~"},
		{"untitled:c:/Users/jrieken/Code/abc.txt", "^/~ts-uri-v2~/untitled/ts-nul-authority/~ts-uri~v2~633a~/Users/jrieken/Code/abc.txt"},
		{"untitled:C:/Users/jrieken/Code/abc.txt", "^/~ts-uri-v2~/untitled/ts-nul-authority/~ts-uri~v2~433a~/Users/jrieken/Code/abc.txt"},
		{"untitled://wsl%2Bubuntu/home/jabaile/work/TypeScript/newfile.ts", "^/~ts-uri-v2~/untitled/wsl%2Bubuntu/home/jabaile/work/TypeScript/newfile.ts"},
	}

	for _, test := range tests {
		t.Run(string(test.uri), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, test.uri.FileName(), test.fileName)
		})
	}
}

func TestFileNameToDocumentURI(t *testing.T) {
	t.Parallel()

	tests := []struct {
		fileName tspath.RootedFilePath
		uri      lsproto.DocumentUri
	}{
		{tspath.RootedFilePathFromAbsolute("/path/to/file.ts"), "file:///path/to/file.ts"},
		{tspath.RootedFilePathFromAbsolute("//server/share/file.ts"), "file://server/share/file.ts"},
		{tspath.RootedFilePathFromAbsolute("d:/work/tsgo932/lib/utils.ts"), "file:///d%3A/work/tsgo932/lib/utils.ts"},
		{tspath.RootedFilePathFromAbsolute("d:/work/tsgo932/lib/utils.ts"), "file:///d%3A/work/tsgo932/lib/utils.ts"},
		{tspath.RootedFilePathFromAbsolute("d:/work/tsgo932/app/(test)/comp/comp-test.tsx"), "file:///d%3A/work/tsgo932/app/%28test%29/comp/comp-test.tsx"},
		{tspath.RootedFilePathFromAbsolute("/path/to/file.ts"), "file:///path/to/file.ts"},
		{tspath.RootedFilePathFromAbsolute("c:/test/me"), "file:///c%3A/test/me"},
		{tspath.RootedFilePathFromAbsolute("//shares/files/c#/p.cs"), "file://shares/files/c%23/p.cs"},
		{tspath.RootedFilePathFromAbsolute("c:/Source/Zürich or Zurich (ˈzjʊərɪk,/Code/resources/app/plugins/c#/plugin.json"), "file:///c%3A/Source/Z%C3%BCrich%20or%20Zurich%20%28%CB%88zj%CA%8A%C9%99r%C9%AAk%2C/Code/resources/app/plugins/c%23/plugin.json"},
		{tspath.RootedFilePathFromAbsolute("c:/test %/path"), "file:///c%3A/test%20%25/path"},
		{tspath.RootedFilePathFromAbsolute("/"), "file:///"},
		{tspath.RootedFilePathFromAbsolute("/_:/path"), "file:///_%3A/path"},
		{tspath.RootedFilePathFromAbsolute("/users/me/c#-projects/"), "file:///users/me/c%23-projects"},
		{tspath.RootedFilePathFromAbsolute("//localhost/c$/GitDevelopment/express"), "file://localhost/c%24/GitDevelopment/express"},
		{tspath.RootedFilePathFromAbsolute("c:/test with %25/c#code"), "file:///c%3A/test%20with%20%2525/c%23code"},

		{tspath.RootedFilePathFromAbsolute("^/untitled/ts-nul-authority/Untitled-1"), "untitled:Untitled-1"},
		{tspath.RootedFilePathFromAbsolute("^/untitled/ts-nul-authority/c:/Users/jrieken/Code/abc.txt"), "untitled:c:/Users/jrieken/Code/abc.txt"},
		{tspath.RootedFilePathFromAbsolute("^/untitled/wsl%2Bubuntu/home/jabaile/work/TypeScript/newfile.ts"), "untitled://wsl%2Bubuntu/home/jabaile/work/TypeScript/newfile.ts"},
	}

	for _, test := range tests {
		t.Run(test.fileName.AsString(), func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, lsconv.FilePathToDocumentURI(test.fileName), test.uri)
		})
	}
}

func TestNonFileDocumentURIRoundTripsThroughNormalizedFileName(t *testing.T) {
	t.Parallel()

	assert.Equal(
		t,
		lsproto.DocumentUri(`custom:folder/../~ts-uri~/café\file.ts`).FileName(),
		tspath.RootedFilePathFromNormalized(`^/~ts-uri-v2~/custom/ts-nul-authority/folder/~ts-uri~v2~2e2e~/~ts-uri~/~ts-uri~v2~636166c3a95c66696c65~.ts`),
	)
	assert.Equal(
		t,
		lsproto.DocumentUri("custom:.git/file.ts").FileName(),
		tspath.RootedFilePathFromNormalized("^/~ts-uri-v2~/custom/ts-nul-authority/.git/file.ts"),
	)
	assert.Equal(
		t,
		lsproto.DocumentUri("custom:~ts-uri~v2~dir.js/file.ts?x=1").FileName(),
		tspath.RootedFilePathFromNormalized(
			"^/~ts-uri-v2~/custom/ts-nul-authority/~ts-uri~v2~7e74732d7572697e76327e6469722e6a73~/~ts-uri~v2~66696c65003f783d31~.ts",
		),
	)
	assert.Equal(
		t,
		lsproto.DocumentUri("custom:c:/dir/file.ts?x=1").FileName().Directory(),
		lsproto.DocumentUri("custom:c:/dir/other.ts").FileName().Directory(),
	)

	for _, uri := range []lsproto.DocumentUri{
		"untitled:folder/../file.ts",
		"vscode-vfs://github/path//file.ts",
		"custom:/path/./file.ts/",
		"custom:",
		"custom:///path",
		"custom://authority",
		"custom://authority/",
		"custom:path/file.ts?rev=a/b#frag/c",
		"custom://authority/path/file.ts#frag/a",
		`custom:path\file.ts`,
		"custom:.git/file.ts",
		"custom:..hidden/file.ts",
		"custom://~ts-uri~/path",
		"custom://ts-nul-authority/path",
		"custom:~ts-uri-v1~file.ts",
		"custom:~ts-uri~v1~file.ts",
		"custom:~ts-uri~v1~no-path",
		"custom:~ts-uri~v2~file.ts",
		"custom:~ts-uri~v2~no-path",
		"custom://authority/~ts-uri-no-path~v2~~",
		"custom:~ts-uri-spec~v2~666f6f~/file.ts?x=1",
		`custom:folder/../~ts-uri~/café\file.ts`,
		`custom:name.ts\`,
		"custom:name..ts",
	} {
		t.Run(string(uri), func(t *testing.T) {
			t.Parallel()

			fileName := uri.FileName()
			assert.Equal(t, tspath.RootedFilePathFromNormalized(fileName.AsString()), fileName)
			assert.Equal(t, lsconv.FilePathToDocumentURI(fileName), uri)
		})
	}

	for _, uri := range []lsproto.DocumentUri{
		`custom:path\file.ts`,
		"custom:~ts-uri~file.ts",
		"custom:~ts-uri-v1~file.ts",
		"custom:~ts-uri~v1~file.ts",
		"custom:~ts-uri~v2~file.ts",
	} {
		assert.Equal(t, uri.FileName().Extension(), tspath.ExtensionTs)
	}
	for _, uri := range []lsproto.DocumentUri{
		"custom:~ts-uri~v2~types.d.ts",
		"custom:~ts-uri~v2~types.d.mts",
		"custom:~ts-uri~v2~types.d.css.ts",
	} {
		assert.Equal(t, uri.FileName().IsDeclarationFile(), true)
	}
	assert.Equal(t, lsproto.DocumentUri("custom:~ts-uri~v2~types.d.ts").FileName().Extension(), tspath.ExtensionDts)
	assert.Equal(t, lsproto.DocumentUri("custom:~ts-uri~v2~types.d.mts").FileName().Extension(), tspath.ExtensionDmts)
	assert.Equal(t, strings.HasSuffix(lsproto.DocumentUri("custom:~ts-uri~v2~types.d.css.ts").FileName().AsString(), ".d.css.ts"), true)

	exceptionalSibling := lsproto.DocumentUri(`custom:folder/main\file.ts`).FileName()
	ordinarySibling := lsproto.DocumentUri("custom:folder/dep.ts").FileName()
	assert.Equal(t, exceptionalSibling.Directory(), ordinarySibling.Directory())

	authorityFile := lsproto.DocumentUri("custom://a/main.ts").FileName()
	authoritySibling := lsproto.DocumentUri("custom://a/b/dep.ts").FileName()
	assert.Equal(t, authorityFile.Directory().ResolveFile("../b/dep.ts"), authoritySibling)
	authorityOnly := lsproto.DocumentUri("custom://a").FileName()
	assert.Equal(t, authorityOnly.Directory().ResolveFile("dep.ts"), lsproto.DocumentUri("custom://a/dep.ts").FileName())
	queryFile := lsproto.DocumentUri("custom:path/file.ts?rev=a/b").FileName()
	assert.Equal(t, queryFile.Extension(), tspath.ExtensionTs)
	assert.Equal(t, queryFile.Directory(), lsproto.DocumentUri("custom:path/other.ts").FileName().Directory())
	assert.Assert(
		t,
		lsproto.DocumentUri("custom:~ts-uri~v2~Foo.ts").PathKey(tspath.CaseInsensitive) !=
			lsproto.DocumentUri("custom:~ts-uri~v2~foo.ts").PathKey(tspath.CaseInsensitive),
	)

	legacyFileName := tspath.RootedFilePathFromNormalized("^/custom/ts-nul-authority/~ts-uri~2e2e")
	assert.Equal(t, lsconv.FilePathToDocumentURI(legacyFileName), lsproto.DocumentUri("custom:~ts-uri~2e2e"))

	previousVersionFileName := tspath.RootedFilePathFromNormalized("^/custom/ts-nul-authority/~ts-uri~v1~466f6f~.ts")
	assert.Equal(t, lsconv.FilePathToDocumentURI(previousVersionFileName), lsproto.DocumentUri("custom:~ts-uri~v1~466f6f~.ts"))

	invalidUTF8FileName := tspath.RootedFilePathFromNormalized(
		"^/~ts-uri-v2~/custom/ts-nul-authority/~ts-uri~v2~ff~",
	)
	assert.Equal(t, lsconv.FilePathToDocumentURI(invalidUTF8FileName), lsproto.DocumentUri("custom:~ts-uri~v2~ff~"))

	assert.Assert(
		t,
		lsproto.DocumentUri(`custom:name.ts\`).FileName() != lsproto.DocumentUri("custom:name..ts").FileName(),
	)
}

type testScript struct {
	name         string
	text         string
	originalText string
	spanMap      *spanmap.SpanMap
}

func (s *testScript) FileName() tspath.RootedFilePath { return tspath.ToRootedFilePath(s.name, "/") }

func (s *testScript) OriginalFileName() tspath.RootedFilePath {
	return tspath.ToRootedFilePath(s.name, "/")
}
func (s *testScript) Text() string { return s.text }
func (s *testScript) OriginalText() string {
	if s.originalText != "" {
		return s.originalText
	}
	return s.text
}
func (s *testScript) SpanMap() *spanmap.SpanMap { return s.spanMap }

func newTestConverters(text string) (*lsconv.Converters, *testScript) {
	script := &testScript{name: "test.ts", text: text}
	lineMap := lsconv.ComputeLSPLineStarts(text)
	conv := lsconv.NewConverters(lsproto.PositionEncodingKindUTF16, func(_ tspath.RootedFilePath) *lsconv.LSPLineMap {
		return lineMap
	})
	return conv, script
}

func TestConvertersSourceFileProjectionExpansion(t *testing.T) {
	t.Parallel()
	original := "x"
	parseOptions := ast.SourceFileParseOptions{FileName: "/component.vue", PathKey: "/component.vue"}
	canonical := parser.ParseSourceFile(parseOptions, " x", core.ScriptKindTS)
	supplementalOptions := parseOptions
	supplementalOptions.PathKey = "/component.vue::supplemental"
	supplemental := parser.ParseSourceFile(supplementalOptions, "  x", core.ScriptKindTS)
	canonical.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
		OriginalText:            original,
		ContentMapper:           "mapper",
		SpanMap:                 spanmap.New([]spanmap.Segment{{VirtualStart: 1, VirtualEnd: 2, OriginalEnd: 1, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll}}),
		SupplementalSourceFiles: []*ast.SourceFile{supplemental},
	})
	supplemental.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
		OriginalText:        original,
		ContentMapper:       "mapper",
		SpanMap:             spanmap.New([]spanmap.Segment{{VirtualStart: 2, VirtualEnd: 3, OriginalEnd: 1, Kind: spanmap.KindVerbatim, Features: spanmap.FeatureAll}}),
		CanonicalSourceFile: canonical,
	})
	lineMap := lsconv.ComputeLSPLineStarts(original)
	converters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF16, func(_ tspath.RootedFilePath) *lsconv.LSPLineMap { return lineMap })

	positions := lsconv.FromLSPPositionForSourceFile(converters, canonical, lsproto.Position{}, spanmap.FeatureHover)
	assert.Equal(t, len(positions), 2)
	var projectedFile *ast.SourceFile = positions[0].Script
	assert.Assert(t, projectedFile == canonical)
	assert.Assert(t, positions[0].Script == canonical)
	assert.Equal(t, positions[0].Position, core.TextPos(1))
	assert.Assert(t, positions[1].Script == supplemental)
	assert.Equal(t, positions[1].Position, core.TextPos(2))
}

// TestConvertersInvalidUTF8 verifies behavior on text containing invalid UTF-8
// sequences (e.g. lone continuation bytes). Node's TextDecoder substitutes such
// bytes with U+FFFD, so the JS-reference test cannot cover this; we assert the
// expected Go-side behavior directly. Each invalid byte advances the byte
// position by 1 and the UTF-16 character by 1 (RuneError = 1 code unit).
func TestConvertersInvalidUTF8(t *testing.T) {
	t.Parallel()

	// Text with invalid UTF-8 byte 0x80 (continuation byte without start byte).
	// Old code used utf8.RuneLen(RuneError)==3, overshooting the byte offset.
	text := "a\x80b\ncd"
	conv, script := newTestConverters(text)

	// (line, char) → byte position. Each row asserts both directions where the
	// position lies on a character boundary.
	mappings := []struct {
		line, char uint32
		bytePos    core.TextPos
	}{
		{0, 0, 0}, // 'a'
		{0, 1, 1}, // invalid byte 0x80
		{0, 2, 2}, // 'b'
		{0, 3, 3}, // newline (line end)
		{1, 0, 4}, // 'c'
		{1, 1, 5}, // 'd'
		{1, 2, 6}, // EOF
	}
	for _, m := range mappings {
		lc := lsproto.Position{Line: m.line, Character: m.char}
		positions := lsconv.FromLSPPosition(conv, script, lc, spanmap.FeatureAll)
		assert.Equal(t, len(positions), 1)
		assert.Equal(t, positions[0].Position, m.bytePos,
			fmt.Sprintf("LineAndCharacterToPosition(%d,%d)", m.line, m.char))
		lspPosition, _ := conv.ToLSPPosition(script, m.bytePos)
		assert.Equal(t, lspPosition, lc,
			fmt.Sprintf("PositionToLineAndCharacter(%d)", m.bytePos))
	}

	// Byte-by-byte round-trip across the entire text.
	for bytePos := core.TextPos(0); bytePos <= core.TextPos(len(text)); bytePos++ {
		lc, _ := conv.ToLSPPosition(script, bytePos)
		positions := lsconv.FromLSPPosition(conv, script, lc, spanmap.FeatureAll)
		assert.Equal(t, len(positions), 1)
		assert.Equal(t, positions[0].Position, bytePos, fmt.Sprintf("round-trip byte %d", bytePos))
	}
}

// jsReferenceScript is a Node.js script that, given a list of UTF-8 byte buffers,
// computes the authoritative mapping between (line, character in UTF-16 code units)
// and UTF-8 byte offsets.
//
// To avoid any string round-tripping at the protocol boundary, the inputs are sent
// as raw bytes: the test writes a length-prefixed binary stream to stdin
// ([uint32 little-endian count][uint32 LE len][bytes]...[uint32 LE len][bytes]).
// Node reads the buffers and decodes each with TextDecoder('utf-8') — which is
// essentially what tsserver / sys.ts does when reading file contents from disk
// (read as Buffer, decode as UTF-8 to a JS string with real UTF-16 semantics).
//
// For each input buffer, Node walks the underlying UTF-8 bytes (NOT the decoded
// string) to identify codepoint boundaries: every byte is the start of a codepoint
// unless it's a UTF-8 continuation byte (0b10xxxxxx). At each boundary it records
// the UTF-8 byte offset and the corresponding UTF-16 code unit offset (in the
// decoded JS string) and (line, char) using the LSP line-break rules
// (\n, \r, \r\n only).
//
// Output is JSON on stdout: [ [ { bytePos, line, char }, ... ], ... ]
const jsReferenceScript = `
const inChunks = [];
process.stdin.on('data', c => inChunks.push(c));
process.stdin.on('end', () => {
  const buf = Buffer.concat(inChunks);
  let off = 0;
  const readU32 = () => { const v = buf.readUInt32LE(off); off += 4; return v; };
  const n = readU32();
  const buffers = [];
  for (let i = 0; i < n; i++) {
    const len = readU32();
    buffers.push(buf.subarray(off, off + len));
    off += len;
  }

  const decoder = new TextDecoder('utf-8', { fatal: true });
  const out = buffers.map(bytes => {
    // Decode the raw UTF-8 bytes to a JS string (this is what sys.ts does with file contents).
    const text = decoder.decode(bytes);

    // LSP line starts in the *decoded* JS string: \\n, \\r, \\r\\n only.
    const lineStartsJs = [0];
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      if (c === 13) {
        if (i + 1 < text.length && text.charCodeAt(i + 1) === 10) i++;
        lineStartsJs.push(i + 1);
      } else if (c === 10) {
        lineStartsJs.push(i + 1);
      }
    }

    // Walk the original UTF-8 byte buffer to find codepoint boundaries. Inputs are
    // valid UTF-8, so we advance bytePos by the sequence length of each lead byte
    // and jsIdx by the corresponding UTF-16 code unit count (1 for BMP, 2 for
    // surrogate pair) of the codepoint at jsIdx in the decoded string.
    const boundaries = [{ bytePos: 0, jsIdx: 0 }];
    let bytePos = 0, jsIdx = 0;
    while (bytePos < bytes.length) {
      const seq = utf8SeqLen(bytes[bytePos]);
      const cp = text.codePointAt(jsIdx);
      bytePos += seq;
      jsIdx += cp > 0xFFFF ? 2 : 1;
      boundaries.push({ bytePos, jsIdx });
    }

    return boundaries.map(({ bytePos, jsIdx }) => {
      let lo = 0, hi = lineStartsJs.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (lineStartsJs[mid] <= jsIdx) lo = mid;
        else hi = mid - 1;
      }
      return { bytePos, line: lo, char: jsIdx - lineStartsJs[lo] };
    });
  });

  process.stdout.write(JSON.stringify(out));
});

function utf8SeqLen(b) {
  if (b < 0x80) return 1;
  if ((b & 0xE0) === 0xC0) return 2;
  if ((b & 0xF0) === 0xE0) return 3;
  if ((b & 0xF8) === 0xF0) return 4;
  throw new Error('invalid UTF-8 lead byte 0x' + b.toString(16));
}
`

type jsTuple struct {
	BytePos int `json:"bytePos"`
	Line    int `json:"line"`
	Char    int `json:"char"`
}

func runJSReference(t *testing.T, texts []string) [][]jsTuple {
	t.Helper()
	if _, err := exec.LookPath("node"); err != nil {
		t.Skipf("node not available: %v", err)
	}

	// Build a length-prefixed binary stream of the raw UTF-8 bytes:
	// [uint32 LE count] then for each: [uint32 LE length][bytes].
	var in bytes.Buffer
	var u32 [4]byte
	binary.LittleEndian.PutUint32(u32[:], uint32(len(texts)))
	in.Write(u32[:])
	for _, s := range texts {
		binary.LittleEndian.PutUint32(u32[:], uint32(len(s)))
		in.Write(u32[:])
		in.WriteString(s)
	}

	cmd := exec.Command("node", "-e", jsReferenceScript)
	cmd.Stdin = &in
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		t.Fatalf("node failed: %v\nstderr: %s", err, stderr.String())
	}

	var out [][]jsTuple
	assert.NilError(t, json.Unmarshal(stdout.Bytes(), &out))
	return out
}

// TestConvertersAgainstJSReference cross-checks the Go UTF-16 conversions against
// authoritative results computed by Node.js using real UTF-16 string semantics.
func TestConvertersAgainstJSReference(t *testing.T) {
	t.Parallel()

	cases := []struct {
		name string
		text string
	}{
		{"empty", ""},
		{"ascii", "hello\nworld"},
		{"ascii_crlf", "hello\r\nworld\r\n!"},
		{"ascii_cr_only", "a\rb\rc"},
		{"trailing_newline", "abc\n"},
		{"bmp_em_dash", "ab\u2014cd\nef"},
		{"bmp_multi", "α\nβ\nγδε\nzz"},
		{"supplementary_emoji", "x\U0001F600y\nz"}, // 😀 is 4 UTF-8 bytes, 2 UTF-16 units
		{"supplementary_at_lineend", "ab\U0001F600\ncd\U0001F60A"},
		{"supplementary_only", "\U0001F600\U0001F601\U0001F602"},
		{"mixed", "α — \U0001F600\r\nβ\nγ\r"},
		{"long_mixed_ws", "  \tαβ\n\t\U0001F600  end\n"},
		{"zwj_emoji", "\U0001F468\u200D\U0001F4BB\nnext"},
		{"only_newlines", "\n\n\r\n\r"},
	}

	texts := make([]string, len(cases))
	for i, c := range cases {
		texts[i] = c.text
	}
	refs := runJSReference(t, texts)
	assert.Equal(t, len(refs), len(cases))

	for i, c := range cases {
		ref := refs[i]
		t.Run(c.name, func(t *testing.T) {
			t.Parallel()

			conv, script := newTestConverters(c.text)
			for _, tup := range ref {
				bytePos := core.TextPos(tup.BytePos)
				expectedLC := lsproto.Position{Line: uint32(tup.Line), Character: uint32(tup.Char)}

				gotLC, _ := conv.ToLSPPosition(script, bytePos)
				assert.Equal(t, gotLC, expectedLC,
					fmt.Sprintf("PositionToLineAndCharacter(%d) mismatch in %q", bytePos, c.text))

				positions := lsconv.FromLSPPosition(conv, script, expectedLC, spanmap.FeatureAll)
				assert.Equal(t, len(positions), 1)
				assert.Equal(t, positions[0].Position, bytePos,
					fmt.Sprintf("LineAndCharacterToPosition(%d,%d) mismatch in %q", tup.Line, tup.Char, c.text))
			}
		})
	}
}
