package compiler

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

const historyA = `const f: typeof victim = <U extends Box>(x: U, y: { b: string }) => x.b;`

const historyB = `interface Box { a: Box; b: string }
function victim<T extends Box>(
  x: T,
  y: T["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]
): string {
  return x.b;
}`

const historyLone = `interface Box { a: Box; b: string }
function ten<U extends Box>(
  y: U["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]["a"]
): string { return y.b; }`

const historyCycle = `function cycle<T extends T>(x: T) { return x; }`

type baseConstraintHistoryCheckerPool struct {
	checker *checker.Checker
	lock    *sync.Mutex
}

func (p *baseConstraintHistoryCheckerPool) GetChecker(_ context.Context, _ *ast.SourceFile) (*checker.Checker, func()) {
	p.lock.Lock()
	return p.checker, p.lock.Unlock
}

func TestBaseConstraintHistory(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name, a, b string
		code       int32
		token      string
	}{
		{"pair", historyA, historyB, 0, ""},
		{"pair-both", historyA, strings.ReplaceAll(historyB, "return x.b;", "return x.b + y.b;"), 0, ""},
		{"missing-property", historyA, strings.ReplaceAll(historyB, "return x.b;", "return x.missing;"), 2339, "missing"},
		{"lone-chain", "", historyLone, 0, ""},
		{"wrong-return", "", strings.ReplaceAll(historyLone, "): string", "): number"), 2322, "return"},
		{"exact-cycle", "", historyCycle, 2313, "T>("},
	}
	histories := []struct {
		name  string
		files []string
	}{
		{"a-then-b", []string{"a.ts", "b.ts"}},
		{"b-then-a", []string{"b.ts", "a.ts"}},
		{"b-alone", []string{"b.ts"}},
	}
	for _, test := range cases {
		test := test
		caseHistories := histories
		if test.a == "" {
			caseHistories = histories[2:]
		}
		for _, history := range caseHistories {
			history := history
			t.Run(test.name+"/"+history.name, func(t *testing.T) {
				roots := `"a.ts","b.ts"`
				if test.a == "" || history.name == "b-alone" {
					roots = `"b.ts"`
				}
				configText := fmt.Sprintf(`{"compilerOptions":{"strict":true,"noEmit":true,"target":"es2020","types":[]},"files":[%s]}`, roots)
				fs := bundled.WrapFS(vfstest.FromMap(map[string]any{
					"/src/tsconfig.json": configText,
					"/src/a.ts":          test.a,
					"/src/b.ts":          test.b,
				}, tspath.CaseSensitive))
				config, configDiagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/src/tsconfig.json", nil, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
				if len(configDiagnostics) != 0 {
					t.Fatalf("unexpected tsconfig diagnostics: %v", configDiagnostics)
				}
				program, err := NewProgram(t.Context(), ProgramOptions{
					Config:         config,
					Host:           NewCompilerHost(fs, "/", nil, nil, nil),
					SingleThreaded: core.TSTrue,
					CreateCheckerPool: func(program *Program) CheckerPool {
						checker, lock := checker.NewChecker(program, nil)
						return &baseConstraintHistoryCheckerPool{checker: checker, lock: lock}
					},
				})
				if err != nil {
					t.Fatal(err)
				}

				var observed []*ast.Diagnostic
				for _, fileName := range history.files {
					file := tspath.RootedFilePathFromNormalized("/src/" + fileName)
					sourceFile := program.GetSourceFile(file)
					if sourceFile == nil {
						t.Fatalf("missing fixture source: %s", file)
					}
					observed = append(observed, program.GetSemanticDiagnostics(t.Context(), sourceFile)...)
				}
				if test.code == 0 {
					if len(observed) != 0 {
						t.Errorf("expected no diagnostics, got %d: %v", len(observed), observed)
					}
					return
				}

				start := strings.Index(test.b, test.token)
				end := start + len(test.token)
				if test.name == "exact-cycle" {
					end = start + 1
				}
				if start < 0 || len(observed) != 1 || observed[0].Code() != test.code || observed[0].File().FileName() != "/src/b.ts" || observed[0].Pos() != start || observed[0].End() != end {
					t.Errorf("expected one TS%d at /src/b.ts:%d:%d, got %v", test.code, start, end, observed)
				}
			})
		}
	}
}
