package compiler_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func checkCircularIndexFile(t *testing.T, src string) (typeStr string, diags []*ast.Diagnostic) {
	t.Helper()
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/test.ts":       src,
		"/tsconfig.json": `{"compilerOptions":{"strict":true},"files":["test.ts"]}`,
	}, tspath.CaseInsensitive))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	n := 1
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{Checkers: &n}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(t, len(errors), 0)
	program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	program.BindSourceFiles()
	file := program.GetSourceFile("/test.ts")
	c, done := program.GetTypeCheckerForFileExclusive(t.Context(), file)
	defer done()
	// Force-resolve T (and thus deferred index value types) before collecting diagnostics.
	for _, stmt := range file.Statements.Nodes {
		if stmt.Kind == ast.KindTypeAliasDeclaration && stmt.Name() != nil && stmt.Name().Text() == "T" {
			typeStr = c.TypeToString(c.GetTypeAtLocation(stmt.Name()))
		}
	}
	diags = c.GetDiagnostics(t.Context(), file)
	return
}

func hasDiagnosticCode(diags []*ast.Diagnostic, code int32) bool {
	for _, d := range diags {
		if d.Code() == code {
			return true
		}
	}
	return false
}

// Negative regressions for #64998 review: recursive index-signature value types
// must report circularity (TS2577) instead of silently becoming any via an
// in-progress unresolved sentinel. Covers direct recursion and recursion through
// a type alias, with both index-first and alias-first declaration order.
func TestCircularIndexValueTypeDiagnostics64998(t *testing.T) {
	t.Parallel()

	const ts2577 = int32(2577) // Return_type_annotation_circularly_references_itself
	const ts2456 = int32(2456) // Type_alias_0_circularly_references_itself

	t.Run("direct_indexed", func(t *testing.T) {
		t.Parallel()
		_, diags := checkCircularIndexFile(t, `interface I { [k: string]: I[string] }
export type T = I[string];`)
		assert.Assert(t, hasDiagnosticCode(diags, ts2577), "expected TS2577, diags=%v", diags)
	})

	t.Run("alias_first", func(t *testing.T) {
		t.Parallel()
		// Type alias resolved before the interface's index infos.
		_, diags := checkCircularIndexFile(t, `type Alias = Box[string];
interface Box { [k: string]: Alias }
export type T = Alias;`)
		assert.Assert(t, hasDiagnosticCode(diags, ts2577) || hasDiagnosticCode(diags, ts2456),
			"expected TS2577 or TS2456, diags=%v", diags)
	})

	t.Run("index_first", func(t *testing.T) {
		t.Parallel()
		// Interface appears first so index infos are built before the alias.
		_, diags := checkCircularIndexFile(t, `interface Box { [k: string]: Alias }
type Alias = Box[string];
export type T = Alias;`)
		assert.Assert(t, hasDiagnosticCode(diags, ts2577) || hasDiagnosticCode(diags, ts2456),
			"expected TS2577 or TS2456, diags=%v", diags)
	})

	t.Run("recursive_interface_ok", func(t *testing.T) {
		t.Parallel()
		// Referring to the interface itself (not through an indexed access) is a
		// normal recursive type and must not error.
		typ, diags := checkCircularIndexFile(t, `interface Rec { [k: string]: Rec }
export type T = Rec[string];`)
		assert.Equal(t, typ, "Rec")
		assert.Equal(t, len(diags), 0, "diags=%v", diags)
	})
}
