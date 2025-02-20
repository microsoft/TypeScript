package ls

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/jstest"
	"gotest.tools/v3/assert"
)

func FuzzTokens(f *testing.F) {
	jstest.SkipIfNoNodeJS(f)
	repo.SkipIfNoTypeScriptSubmodule(f)
	files := []string{
		filepath.Join(repo.TypeScriptSubmodulePath, "src/server/project.ts"),
	}
	for _, file := range files {
		fileText, err := os.ReadFile(file)
		assert.NilError(f, err)
		if isFuzzing() {
			f.Add(0)
			f.Add(len(fileText) / 2)
			f.Add(len(fileText) - 1)
		}

		f.Fuzz(func(t *testing.T, pos int) {
			t.Parallel()
			if pos < 0 {
				pos = -pos
			}
			pos %= len(fileText)
			tsKind, tsPos := tsGetTokenAtPosition(t, string(fileText), pos)
			goKind, goPos := goGetTokenAtPosition(t, string(fileText), pos)
			assert.Equal(t, tsKind, goKind, fmt.Sprintf("pos: %d", pos))
			assert.Equal(t, tsPos, goPos, fmt.Sprintf("pos: %d", pos))
		})
	}
}

func goGetTokenAtPosition(t *testing.T, fileText string, position int) (kind string, pos int) {
	file := parser.ParseSourceFile("file.ts", "file.ts", fileText, core.ScriptTargetLatest, scanner.JSDocParsingModeParseAll)
	token := getTokenAtPosition(file, position, true /*allowPositionInLeadingTrvia*/, false /*includeEndPosition*/, nil)
	kind = strings.Replace(token.Kind.String(), "Kind", "", 1)
	switch kind {
	case "EndOfFile":
		kind = "EndOfFileToken"
	}
	return kind, token.Pos()
}

func tsGetTokenAtPosition(t *testing.T, fileText string, position int) (kind string, pos int) {
	dir := t.TempDir()
	err := os.WriteFile(filepath.Join(dir, "file.ts"), []byte(fileText), 0o644)
	assert.NilError(t, err)
	script := `
		import fs from "fs";
		export default (ts, position) => {
			const fileText = fs.readFileSync("file.ts", "utf8");
			const file = ts.createSourceFile(
				"file.ts",
				fileText,
				{ languageVersion: ts.ScriptTarget.Latest, jsDocParsingMode: ts.JSDocParsingMode.ParseAll },
				/*setParentNodes*/ true
			);
			const token = ts.getTokenAtPosition(file, +position);
			return {
				kind: ts.Debug.formatSyntaxKind(token.kind),
				pos: token.pos,
			};
		};`

	type tokenInfo struct {
		Kind string `json:"kind"`
		Pos  int    `json:"pos"`
	}

	info, err := jstest.EvalNodeScriptWithTS[tokenInfo](t, script, dir, strconv.Itoa(position))
	assert.NilError(t, err)
	return info.Kind, info.Pos
}

func isFuzzing() bool {
	return flag.CommandLine.Lookup("test.fuzz").Value.String() != ""
}
