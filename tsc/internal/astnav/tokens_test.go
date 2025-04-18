package astnav_test

import (
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/jstest"
	"gotest.tools/v3/assert"
)

var testFiles = []string{
	// !!! EOFToken JSDoc parsing is missing
	// filepath.Join(repo.TestDataPath, "fixtures/astnav/eofJSDoc.ts"),
	filepath.Join(repo.TypeScriptSubmodulePath, "src/services/mapCode.ts"),
}

func TestGetTokenAtPosition(t *testing.T) {
	t.Parallel()
	repo.SkipIfNoTypeScriptSubmodule(t)
	jstest.SkipIfNoNodeJS(t)

	t.Run("baseline", func(t *testing.T) {
		t.Parallel()
		baselineTokens(
			t,
			"GetTokenAtPosition",
			false, /*includeEOF*/
			func(fileText string, positions []int) []*tokenInfo {
				return tsGetTokensAtPositions(t, fileText, positions)
			},
			func(file *ast.SourceFile, pos int) *tokenInfo {
				return toTokenInfo(astnav.GetTokenAtPosition(file, pos))
			},
		)
	})

	t.Run("pointer equality", func(t *testing.T) {
		t.Parallel()
		fileText := `
			function foo() {
				return 0;
			}
		`
		file := parser.ParseSourceFile("/file.ts", "/file.ts", fileText, core.ScriptTargetLatest, scanner.JSDocParsingModeParseAll)
		assert.Equal(t, astnav.GetTokenAtPosition(file, 0), astnav.GetTokenAtPosition(file, 0))
	})
}

func TestGetTouchingPropertyName(t *testing.T) {
	t.Parallel()
	jstest.SkipIfNoNodeJS(t)
	repo.SkipIfNoTypeScriptSubmodule(t)

	baselineTokens(
		t,
		"GetTouchingPropertyName",
		false, /*includeEOF*/
		func(fileText string, positions []int) []*tokenInfo {
			return tsGetTouchingPropertyName(t, fileText, positions)
		},
		func(file *ast.SourceFile, pos int) *tokenInfo {
			return toTokenInfo(astnav.GetTouchingPropertyName(file, pos))
		},
	)
}

func baselineTokens(t *testing.T, testName string, includeEOF bool, getTSTokens func(fileText string, positions []int) []*tokenInfo, getGoToken func(file *ast.SourceFile, pos int) *tokenInfo) {
	for _, fileName := range testFiles {
		t.Run(filepath.Base(fileName), func(t *testing.T) {
			t.Parallel()
			fileText, err := os.ReadFile(fileName)
			assert.NilError(t, err)

			positions := make([]int, len(fileText))
			for i := range positions {
				positions[i] = i
			}
			tsTokens := getTSTokens(string(fileText), positions)
			file := parser.ParseSourceFile("/file.ts", "/file.ts", string(fileText), core.ScriptTargetLatest, scanner.JSDocParsingModeParseAll)

			var output strings.Builder
			currentRange := core.NewTextRange(0, 0)
			currentDiff := tokenDiff{}

			for pos, tsToken := range tsTokens {
				goToken := getGoToken(file, pos)
				diff := tokenDiff{goToken: goToken, tsToken: tsToken}

				if !diffEqual(currentDiff, diff) {
					if !tokensEqual(currentDiff.goToken, currentDiff.tsToken) {
						writeRangeDiff(&output, file, currentDiff, currentRange, pos)
					}
					currentDiff = diff
					currentRange = core.NewTextRange(pos, pos)
				}
				currentRange = currentRange.WithEnd(pos)
			}

			if !tokensEqual(currentDiff.goToken, currentDiff.tsToken) {
				writeRangeDiff(&output, file, currentDiff, currentRange, len(tsTokens)-1)
			}

			baseline.Run(
				t,
				fmt.Sprintf("%s.%s.baseline.txt", testName, filepath.Base(fileName)),
				core.IfElse(output.Len() > 0, output.String(), baseline.NoContent),
				baseline.Options{
					Subfolder: "astnav",
				},
			)
		})
	}
}

type tokenDiff struct {
	goToken *tokenInfo
	tsToken *tokenInfo
}

type tokenInfo struct {
	Kind string `json:"kind"`
	Pos  int    `json:"pos"`
	End  int    `json:"end"`
}

func toTokenInfo(node *ast.Node) *tokenInfo {
	if node == nil {
		return nil
	}
	kind := strings.Replace(node.Kind.String(), "Kind", "", 1)
	switch kind {
	case "EndOfFile":
		kind = "EndOfFileToken"
	}
	return &tokenInfo{
		Kind: kind,
		Pos:  node.Pos(),
		End:  node.End(),
	}
}

func diffEqual(a, b tokenDiff) bool {
	return tokensEqual(a.goToken, b.goToken) && tokensEqual(a.tsToken, b.tsToken)
}

func tokensEqual(t1, t2 *tokenInfo) bool {
	if t1 == nil || t2 == nil {
		return t1 == t2
	}
	return *t1 == *t2
}

func tsGetTokensAtPositions(t testing.TB, fileText string, positions []int) []*tokenInfo {
	dir := t.TempDir()
	err := os.WriteFile(filepath.Join(dir, "file.ts"), []byte(fileText), 0o644)
	assert.NilError(t, err)

	err = os.WriteFile(filepath.Join(dir, "positions.json"), []byte(core.Must(core.StringifyJson(positions, "", ""))), 0o644)
	assert.NilError(t, err)

	script := `
		import fs from "fs";
		export default (ts) => {
			const positions = JSON.parse(fs.readFileSync("positions.json", "utf8"));
			const fileText = fs.readFileSync("file.ts", "utf8");
			const file = ts.createSourceFile(
				"file.ts",
				fileText,
				{ languageVersion: ts.ScriptTarget.Latest, jsDocParsingMode: ts.JSDocParsingMode.ParseAll },
				/*setParentNodes*/ true
			);
			return positions.map(position => {
				let token = ts.getTokenAtPosition(file, position);
				if (token.kind === ts.SyntaxKind.SyntaxList) {
					token = token.parent;
				}
				return {
					kind: ts.Debug.formatSyntaxKind(token.kind),
					pos: token.pos,
					end: token.end,
				};
			});
		};`

	info, err := jstest.EvalNodeScriptWithTS[[]*tokenInfo](t, script, dir, "")
	assert.NilError(t, err)
	return info
}

func tsGetTouchingPropertyName(t testing.TB, fileText string, positions []int) []*tokenInfo {
	dir := t.TempDir()
	err := os.WriteFile(filepath.Join(dir, "file.ts"), []byte(fileText), 0o644)
	assert.NilError(t, err)

	err = os.WriteFile(filepath.Join(dir, "positions.json"), []byte(core.Must(core.StringifyJson(positions, "", ""))), 0o644)
	assert.NilError(t, err)

	script := `
		import fs from "fs";
		export default (ts) => {
			const positions = JSON.parse(fs.readFileSync("positions.json", "utf8"));
			const fileText = fs.readFileSync("file.ts", "utf8");
			const file = ts.createSourceFile(
				"file.ts",
				fileText,
				{ languageVersion: ts.ScriptTarget.Latest, jsDocParsingMode: ts.JSDocParsingMode.ParseAll },
				/*setParentNodes*/ true
			);
			return positions.map(position => {
				let token = ts.getTouchingPropertyName(file, position);
				if (token.kind === ts.SyntaxKind.SyntaxList) {
					token = token.parent;
				}
				return {
					kind: ts.Debug.formatSyntaxKind(token.kind),
					pos: token.pos,
					end: token.end,
				};
			});
		};`

	info, err := jstest.EvalNodeScriptWithTS[[]*tokenInfo](t, script, dir, "")
	assert.NilError(t, err)
	return info
}

func writeRangeDiff(output *strings.Builder, file *ast.SourceFile, diff tokenDiff, rng core.TextRange, position int) {
	lines := file.LineMap()

	tsTokenPos := position
	goTokenPos := position
	tsTokenEnd := position
	goTokenEnd := position
	if diff.tsToken != nil {
		tsTokenPos = diff.tsToken.Pos
		tsTokenEnd = diff.tsToken.End
	}
	if diff.goToken != nil {
		goTokenPos = diff.goToken.Pos
		goTokenEnd = diff.goToken.End
	}
	tsStartLine, _ := core.PositionToLineAndCharacter(tsTokenPos, lines)
	tsEndLine, _ := core.PositionToLineAndCharacter(tsTokenEnd, lines)
	goStartLine, _ := core.PositionToLineAndCharacter(goTokenPos, lines)
	goEndLine, _ := core.PositionToLineAndCharacter(goTokenEnd, lines)

	contextLines := 2
	startLine := min(tsStartLine, goStartLine)
	endLine := max(tsEndLine, goEndLine)
	markerLines := []int{tsStartLine, tsEndLine, goStartLine, goEndLine}
	slices.Sort(markerLines)
	contextStart := max(0, startLine-contextLines)
	contextEnd := min(len(lines)-1, endLine+contextLines)
	digits := len(strconv.Itoa(contextEnd))

	shouldTruncate := func(line int) (result bool, skipTo int) {
		index, _ := slices.BinarySearch(markerLines, line)
		if index == 0 || index == len(markerLines) {
			return false, 0
		}
		low := markerLines[index-1]
		high := markerLines[index]
		if line-low > 5 && high-line > 5 {
			return true, high - 5
		}
		return false, 0
	}

	if output.Len() > 0 {
		output.WriteString("\n\n")
	}

	output.WriteString(fmt.Sprintf("〚Positions: [%d, %d]〛\n", rng.Pos(), rng.End()))
	if diff.tsToken != nil {
		output.WriteString(fmt.Sprintf("【TS: %s [%d, %d)】\n", diff.tsToken.Kind, tsTokenPos, tsTokenEnd))
	} else {
		output.WriteString("【TS: nil】\n")
	}
	if diff.goToken != nil {
		output.WriteString(fmt.Sprintf("《Go: %s [%d, %d)》\n", diff.goToken.Kind, goTokenPos, goTokenEnd))
	} else {
		output.WriteString("《Go: nil》\n")
	}
	for line := contextStart; line <= contextEnd; line++ {
		if truncate, skipTo := shouldTruncate(line); truncate {
			output.WriteString(fmt.Sprintf("%s │........ %d lines omitted ........\n", strings.Repeat(" ", digits), skipTo-line+1))
			line = skipTo
		}
		output.WriteString(fmt.Sprintf("%*d │", digits, line+1))
		end := len(file.Text()) + 1
		if line < len(lines)-1 {
			end = int(lines[line+1])
		}
		for pos := int(lines[line]); pos < end; pos++ {
			if pos == rng.End()+1 {
				output.WriteString("〛")
			}
			if diff.tsToken != nil && pos == tsTokenEnd {
				output.WriteString("】")
			}
			if diff.goToken != nil && pos == goTokenEnd {
				output.WriteString("》")
			}

			if diff.goToken != nil && pos == goTokenPos {
				output.WriteString("《")
			}
			if diff.tsToken != nil && pos == tsTokenPos {
				output.WriteString("【")
			}
			if pos == rng.Pos() {
				output.WriteString("〚")
			}

			if pos < len(file.Text()) {
				output.WriteByte(file.Text()[pos])
			}
		}
	}
}

func TestFindPrecedingToken(t *testing.T) {
	t.Parallel()
	repo.SkipIfNoTypeScriptSubmodule(t)
	jstest.SkipIfNoNodeJS(t)

	t.Run("baseline", func(t *testing.T) {
		t.Parallel()
		baselineTokens(
			t,
			"FindPrecedingToken",
			true, /*includeEOF*/
			func(fileText string, positions []int) []*tokenInfo {
				return tsFindPrecedingTokens(t, fileText, positions)
			},
			func(file *ast.SourceFile, pos int) *tokenInfo {
				return toTokenInfo(astnav.FindPrecedingToken(file, pos))
			},
		)
	})
}

func tsFindPrecedingTokens(t *testing.T, fileText string, positions []int) []*tokenInfo {
	dir := t.TempDir()
	err := os.WriteFile(filepath.Join(dir, "file.ts"), []byte(fileText), 0o644)
	assert.NilError(t, err)

	err = os.WriteFile(filepath.Join(dir, "positions.json"), []byte(core.Must(core.StringifyJson(positions, "", ""))), 0o644)
	assert.NilError(t, err)

	script := `
		import fs from "fs";
		export default (ts) => {
			const positions = JSON.parse(fs.readFileSync("positions.json", "utf8"));
			const fileText = fs.readFileSync("file.ts", "utf8");
			const file = ts.createSourceFile(
				"file.ts",
				fileText,
				{ languageVersion: ts.ScriptTarget.Latest, jsDocParsingMode: ts.JSDocParsingMode.ParseAll },
				/*setParentNodes*/ true
			);
			return positions.map(position => {
				let token = ts.findPrecedingToken(position, file);
				if (token === undefined) {
					return undefined;
				}
				if (token.kind === ts.SyntaxKind.SyntaxList) {
					token = token.parent;
				}
				return {
					kind: ts.Debug.formatSyntaxKind(token.kind),
					pos: token.pos,
					end: token.end,
				};
			});
		};`
	info, err := jstest.EvalNodeScriptWithTS[[]*tokenInfo](t, script, dir, "")
	assert.NilError(t, err)
	return info
}
