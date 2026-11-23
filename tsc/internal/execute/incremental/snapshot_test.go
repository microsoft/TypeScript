package incremental

import (
	"errors"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDiagnosticToStringBuilderWithFilelessDiagnostic(t *testing.T) {
	t.Parallel()

	// A failed output write is reported as a compiler diagnostic that has no
	// source file (see #64875). When computing a declaration file's signature,
	// that diagnostic is included alongside diagnostics that do have a file, so
	// the formatter must not assume every diagnostic has one.
	diagnostic := ast.NewCompilerDiagnostic(diagnostics.Could_not_write_file_0_Colon_1, "dist/a.js", "is a directory")
	currentFile := &ast.SourceFile{}

	var builder strings.Builder
	diagnosticToStringBuilder(diagnostic, currentFile, &builder)

	assert.Equal(t, builder.String(), "\nerror5033: Could_not_write_file_0_Colon_1_5033\ndist/a.js\nis a directory\n")
}

func TestEmitWithFailingWriteFileDoesNotPanic(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/tsconfig.json": `{"compilerOptions":{"incremental":true,"declaration":true,"outDir":"dist","rootDir":"."}}`,
		"/a.ts":          `export const a = 1;`,
	}, tspath.CaseSensitive))
	program := buildTestProgram(t, fs)
	result := program.Emit(t.Context(), compiler.EmitOptions{
		WriteFile: func(fileName tspath.RootedFilePath, text string, data *compiler.WriteFileData) error {
			return errors.New("write failed")
		},
	})

	assert.Assert(t, result != nil)
	assert.Assert(t, core.Some(result.Diagnostics, func(diagnostic *ast.Diagnostic) bool {
		return diagnostic.Code() == diagnostics.Could_not_write_file_0_Colon_1.Code()
	}), "expected a Could not write file diagnostic")
}
