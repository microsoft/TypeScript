package compiler_test

import (
	"strings"
	"testing"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

// TS4094 for unique-symbol private names must print the escaped "__@…" form, not the "\xFE" sentinel.
func TestTS4094EscapesInternalUniqueSymbolName(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	fs := vfstest.FromMap(map[string]string{
		"/dev/src/helper.ts": `declare const brand: unique symbol;
class Foo {
  private [brand]: number = 1;
}
export function makeFoo() {
  return new Foo();
}
`,
		"/dev/src/index.ts": `import { makeFoo } from "./helper";
export const f = () => makeFoo();
`,
	}, true /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)

	opts := core.CompilerOptions{
		Target:              core.ScriptTargetESNext,
		Module:              core.ModuleKindESNext,
		Declaration:         core.TSTrue,
		EmitDeclarationOnly: core.TSTrue,
		Strict:              core.TSTrue,
	}
	host := compiler.NewCompilerHost("/dev/src", fs, bundled.LibPath(), nil, nil, nil)
	p := compiler.NewProgram(compiler.ProgramOptions{
		Config: &tsoptions.ParsedCommandLine{
			ParsedConfig: &tsoptions.ParsedOptions{
				FileNames:       []string{"/dev/src/helper.ts", "/dev/src/index.ts"},
				CompilerOptions: &opts,
			},
		},
		Host: host,
	})

	result := p.Emit(t.Context(), compiler.EmitOptions{
		WriteFile: func(string, string, *compiler.WriteFileData) error { return nil },
	})
	if result == nil {
		t.Fatal("expected emit result")
	}

	var found4094 bool
	for _, d := range result.Diagnostics {
		if d.Code() != 4094 {
			continue
		}
		found4094 = true
		msg := d.String()
		if strings.Contains(msg, "\xFE") || !utf8.ValidString(msg) {
			t.Fatalf("TS4094 leaked internal sentinel: %q", msg)
		}
		if strings.ContainsRune(msg, '\uFFFD') {
			t.Fatalf("TS4094 used replacement character: %q", msg)
		}
		if !strings.Contains(msg, "__@brand@") {
			t.Fatalf("TS4094 should name the escaped unique symbol, got %q", msg)
		}
	}
	if !found4094 {
		var msgs []string
		for _, d := range result.Diagnostics {
			msgs = append(msgs, d.MessageText())
		}
		t.Fatalf("expected TS4094; diagnostics: %v", msgs)
	}
}
