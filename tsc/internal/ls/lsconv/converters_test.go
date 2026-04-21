package lsconv_test

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"os/exec"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestDocumentURIToFileName(t *testing.T) {
	t.Parallel()

	tests := []struct {
		uri      lsproto.DocumentUri
		fileName string
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
		{"file:///users/me/c%23-projects/", "/users/me/c#-projects/"},
		{"file://localhost/c%24/GitDevelopment/express", "//localhost/c$/GitDevelopment/express"},
		{"file:///c%3A/test%20with%20%2525/c%23code", "c:/test with %25/c#code"},

		{"untitled:Untitled-1", "^/untitled/ts-nul-authority/Untitled-1"},
		{"untitled:Untitled-1#fragment", "^/untitled/ts-nul-authority/Untitled-1#fragment"},
		{"untitled:c:/Users/jrieken/Code/abc.txt", "^/untitled/ts-nul-authority/c:/Users/jrieken/Code/abc.txt"},
		{"untitled:C:/Users/jrieken/Code/abc.txt", "^/untitled/ts-nul-authority/C:/Users/jrieken/Code/abc.txt"},
		{"untitled://wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts", "^/untitled/wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts"},
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
		fileName string
		uri      lsproto.DocumentUri
	}{
		{"/path/to/file.ts", "file:///path/to/file.ts"},
		{"//server/share/file.ts", "file://server/share/file.ts"},
		{"d:/work/tsgo932/lib/utils.ts", "file:///d%3A/work/tsgo932/lib/utils.ts"},
		{"d:/work/tsgo932/lib/utils.ts", "file:///d%3A/work/tsgo932/lib/utils.ts"},
		{"d:/work/tsgo932/app/(test)/comp/comp-test.tsx", "file:///d%3A/work/tsgo932/app/%28test%29/comp/comp-test.tsx"},
		{"/path/to/file.ts", "file:///path/to/file.ts"},
		{"c:/test/me", "file:///c%3A/test/me"},
		{"//shares/files/c#/p.cs", "file://shares/files/c%23/p.cs"},
		{"c:/Source/Zürich or Zurich (ˈzjʊərɪk,/Code/resources/app/plugins/c#/plugin.json", "file:///c%3A/Source/Z%C3%BCrich%20or%20Zurich%20%28%CB%88zj%CA%8A%C9%99r%C9%AAk%2C/Code/resources/app/plugins/c%23/plugin.json"},
		{"c:/test %/path", "file:///c%3A/test%20%25/path"},
		{"/", "file:///"},
		{"/_:/path", "file:///_%3A/path"},
		{"/users/me/c#-projects/", "file:///users/me/c%23-projects/"},
		{"//localhost/c$/GitDevelopment/express", "file://localhost/c%24/GitDevelopment/express"},
		{"c:/test with %25/c#code", "file:///c%3A/test%20with%20%2525/c%23code"},

		{"^/untitled/ts-nul-authority/Untitled-1", "untitled:Untitled-1"},
		{"^/untitled/ts-nul-authority/c:/Users/jrieken/Code/abc.txt", "untitled:c:/Users/jrieken/Code/abc.txt"},
		{"^/untitled/ts-nul-authority///wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts", "untitled://wsl%2Bubuntu/home/jabaile/work/TypeScript-go/newfile.ts"},
	}

	for _, test := range tests {
		t.Run(test.fileName, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, lsconv.FileNameToDocumentURI(test.fileName), test.uri)
		})
	}
}

type testScript struct {
	name string
	text string
}

func (s *testScript) FileName() string { return s.name }
func (s *testScript) Text() string     { return s.text }

func newTestConverters(text string) (*lsconv.Converters, *testScript) {
	script := &testScript{name: "test.ts", text: text}
	lineMap := lsconv.ComputeLSPLineStarts(text)
	conv := lsconv.NewConverters(lsproto.PositionEncodingKindUTF16, func(_ string) *lsconv.LSPLineMap {
		return lineMap
	})
	return conv, script
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
		assert.Equal(t, conv.LineAndCharacterToPosition(script, lc), m.bytePos,
			fmt.Sprintf("LineAndCharacterToPosition(%d,%d)", m.line, m.char))
		assert.Equal(t, conv.PositionToLineAndCharacter(script, m.bytePos), lc,
			fmt.Sprintf("PositionToLineAndCharacter(%d)", m.bytePos))
	}

	// Byte-by-byte round-trip across the entire text.
	for bytePos := core.TextPos(0); bytePos <= core.TextPos(len(text)); bytePos++ {
		lc := conv.PositionToLineAndCharacter(script, bytePos)
		rt := conv.LineAndCharacterToPosition(script, lc)
		assert.Equal(t, rt, bytePos, fmt.Sprintf("round-trip byte %d", bytePos))
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

				gotLC := conv.PositionToLineAndCharacter(script, bytePos)
				assert.Equal(t, gotLC, expectedLC,
					fmt.Sprintf("PositionToLineAndCharacter(%d) mismatch in %q", bytePos, c.text))

				gotPos := conv.LineAndCharacterToPosition(script, expectedLC)
				assert.Equal(t, gotPos, bytePos,
					fmt.Sprintf("LineAndCharacterToPosition(%d,%d) mismatch in %q", tup.Line, tup.Char, c.text))
			}
		})
	}
}
