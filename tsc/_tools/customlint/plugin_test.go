package customlint

import (
	"bytes"
	"cmp"
	"fmt"
	"go/token"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"testing"

	"golang.org/x/tools/go/analysis/checker"
	"golang.org/x/tools/go/packages"
	"gotest.tools/v3/assert"
	"gotest.tools/v3/golden"
)

func must[T any](t T, err error) T {
	if err != nil {
		panic(err)
	}
	return t
}

var testdataDir = must(filepath.Abs("testdata"))

func TestPlugin(t *testing.T) {
	t.Parallel()

	var plugin plugin

	config := &packages.Config{
		Mode: packages.LoadSyntax,
		Dir:  testdataDir,
		Env:  append(os.Environ(), "GO111MODULE=on", "GOPROXY=off", "GOWORK=off"),
	}

	pkgs, err := packages.Load(config, "./...")
	assert.NilError(t, err)

	var allFiles []string
	for _, pkg := range pkgs {
		allFiles = append(allFiles, pkg.GoFiles...)
	}

	for _, pkg := range pkgs {
		assert.Assert(t, pkg.Name != "", "%s failed to load: %v", pkg.PkgPath, pkg.Errors)
		for _, err := range pkg.Errors {
			t.Error(err)
		}
	}

	analyzers, err := plugin.BuildAnalyzers()
	assert.NilError(t, err)

	graph, err := checker.Analyze(analyzers, pkgs, nil)
	assert.NilError(t, err)

	diagsByPath := make(map[string]map[diagnostic]struct{})

	for act := range graph.All() {
		assert.NilError(t, act.Err)
		if !act.IsRoot {
			continue
		}

		diags := act.Diagnostics
		for _, diag := range diags {
			pos := act.Package.Fset.Position(diag.Pos)
			end := act.Package.Fset.Position(diag.End)
			if !end.IsValid() {
				end = pos
			}

			d := diagnostic{
				analyzerName: act.Analyzer.Name,
				pos:          pos,
				end:          end,
				message:      diag.Message,
			}

			path := act.Package.Fset.File(diag.Pos).Name()
			m := diagsByPath[path]
			if m == nil {
				m = make(map[diagnostic]struct{})
				diagsByPath[path] = m
			}

			m[d] = struct{}{}
		}
	}

	for _, p := range allFiles {
		rel, err := filepath.Rel(testdataDir, p)
		assert.NilError(t, err)
		prettyPath := filepath.ToSlash(rel)

		t.Run(prettyPath, func(t *testing.T) {
			t.Parallel()
			diagsMap := diagsByPath[p]
			diags := make([]*diagnostic, 0, len(diagsMap))
			for diag := range diagsMap {
				diags = append(diags, &diag)
			}

			slices.SortFunc(diags, func(a *diagnostic, b *diagnostic) int {
				if r := cmp.Compare(a.pos.Offset, b.pos.Offset); r != 0 {
					return r
				}
				if r := cmp.Compare(a.end.Offset, b.end.Offset); r != 0 {
					return r
				}
				if r := cmp.Compare(a.analyzerName, b.analyzerName); r != 0 {
					return r
				}
				if r := cmp.Compare(a.message, b.message); r != 0 {
					return r
				}
				return 0
			})

			fileContents, readErr := os.ReadFile(p)
			assert.NilError(t, readErr)

			goldenPath, relErr := filepath.Rel(testdataDir, p+".golden")
			assert.NilError(t, relErr)

			expected := toGolden(fileContents, diags)

			golden.Assert(t, expected, goldenPath)
		})
	}
}

type diagnostic struct {
	pos          token.Position
	end          token.Position
	analyzerName string
	message      string
}

func toGolden(fileContents []byte, diags []*diagnostic) string {
	// Similar to https://github.com/microsoft/DefinitelyTyped-tools/blob/b6d59be5f3235825ff2e3a3ef564c4091c9daa55/packages/eslint-plugin/test/eslint.test.ts#L63

	var buf bytes.Buffer
	lines := bytes.Split(fileContents, []byte("\n"))

	for i, line := range lines {
		fmt.Fprintf(&buf, "\t%s\n", line)

		for _, d := range diags {
			startLine := d.pos.Line - 1
			endLine := d.end.Line - 1
			startColumn := d.pos.Column - 1
			endColumn := d.end.Column - 1

			if i < startLine || i > endLine {
				continue
			}
			if i == startLine {
				leadingSpaces := toWhitespace(line[:startColumn])
				squiggle := strings.Repeat("~", max(1, endColumn-startColumn))
				fmt.Fprintf(&buf, "\t%s%s\n", leadingSpaces, squiggle)

				for i, mLine := range strings.Split(d.message, "\n") {
					prefix := d.analyzerName
					if i != 0 {
						prefix = strings.Repeat(" ", len(prefix))
					}
					fmt.Fprintf(&buf, "!!! %s: %s\n", prefix, mLine)
				}
			} else {
				squiggle := strings.Repeat("~", max(1, len(line)-startColumn))
				fmt.Fprintf(&buf, "\t%s\n", squiggle)
			}
		}
	}

	return buf.String()
}

func toWhitespace(linePrefix []byte) string {
	var b strings.Builder
	b.Grow(len(linePrefix))
	for _, c := range linePrefix {
		if c == '\t' {
			b.WriteByte('\t')
		} else {
			b.WriteByte(' ')
		}
	}
	return b.String()
}
