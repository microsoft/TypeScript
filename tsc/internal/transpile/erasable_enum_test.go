package transpile

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func TestEnumAnnotationErasesWithOrdinaryObjectSyntax(t *testing.T) {
	t.Parallel()
	input := `const E: enum = { __proto__: {}, ...other, ["foo"]: 1, method() {}, get value() { return 1; }, shorthand, Value: true };`
	options := Options{
		CompilerOptions:   &core.CompilerOptions{Target: core.ScriptTargetESNext, ErasableSyntaxOnly: core.TSTrue},
		ReportDiagnostics: true,
	}
	result := TranspileModule(t.Context(), input, options)
	ordinary := TranspileModule(t.Context(), strings.Replace(input, ": enum", "", 1), options)
	if len(result.Diagnostics) != 0 || len(ordinary.Diagnostics) != 0 {
		t.Fatalf("unexpected diagnostics: annotated=%v, ordinary=%v", result.Diagnostics, ordinary.Diagnostics)
	}
	if result.OutputText != ordinary.OutputText {
		t.Fatalf("enum annotation changed runtime output:\n%s\nordinary object:\n%s", result.OutputText, ordinary.OutputText)
	}
}

func TestErasableEnumDeclarationRoundTrip(t *testing.T) {
	t.Parallel()
	input := `const Local: enum = { Value: 1 };
export const alias: typeof Local = Local;
export const E: enum = (({ __proto__: null, A: 1, B: "b", Shifted: 1 << 2 }));`
	result := TranspileDeclaration(t.Context(), input, Options{})
	if len(result.Diagnostics) != 0 {
		t.Fatal(result.Diagnostics)
	}
	fs := vfstest.FromMap(map[string]string{
		"/enum.d.ts": result.OutputText,
		"/consumer.ts": `import { E, alias } from "./enum";
let local: typeof alias.Value = alias.Value;
let value: E = E.A;
value = E.B;
let member: E.Shifted = 4;
E[1];`,
		"/tsconfig.json": `{"compilerOptions":{"noLib":true,"strict":true},"files":["consumer.ts","enum.d.ts"]}`,
	}, tspath.CaseSensitive)
	config, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	if len(errors) != 0 {
		t.Fatal(errors)
	}
	program := compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: compiler.NewCompilerHost(fs, "/", nil, nil, nil)})
	for _, filename := range []tspath.RootedFilePath{"/enum.d.ts", "/consumer.ts"} {
		file := program.GetSourceFile(filename)
		if diagnostics := program.GetSyntacticDiagnostics(t.Context(), file); len(diagnostics) != 0 {
			t.Fatalf("%s syntax: %v", filename, diagnostics)
		}
		diagnostics := program.GetSemanticDiagnostics(t.Context(), file)
		if filename == "/enum.d.ts" {
			if len(diagnostics) != 0 {
				t.Fatalf("declaration diagnostics: %v\n%s", diagnostics, result.OutputText)
			}
		} else if len(diagnostics) != 1 || diagnostics[0].Code() != 7053 {
			t.Fatalf("expected only numeric index diagnostic 7053, got %v\n%s", diagnostics, result.OutputText)
		}
	}
}

func TestErasableEnumIsolatedDeclarationReferences(t *testing.T) {
	t.Parallel()
	input := `import { imported } from "./values";
const local = 1;
export const E: enum = { Local: local, Imported: imported };`
	result := TranspileDeclaration(t.Context(), input, Options{})
	if len(result.Diagnostics) != 2 {
		t.Fatalf("expected isolated declaration errors for both references, got %v\n%s", result.Diagnostics, result.OutputText)
	}
	for _, diagnostic := range result.Diagnostics {
		if diagnostic.Code() != 9020 {
			t.Fatalf("expected isolated declaration diagnostic 9020, got %v", diagnostic)
		}
	}
}

func TestErasableEnumExportReferences(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name   string
		input  string
		module core.ModuleKind
		want   string
	}{
		{"commonjs", `export const E: enum = { A: 1 }; export const x = E;`, core.ModuleKindCommonJS, "exports.x = exports.E;"},
		{"namespace", `namespace N { export const E: enum = { A: 1 }; export const x = E; }`, core.ModuleKindESNext, "N.x = N.E;"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			result := TranspileModule(t.Context(), test.input, Options{CompilerOptions: &core.CompilerOptions{Target: core.ScriptTargetESNext, Module: test.module}})
			if !strings.Contains(result.OutputText, test.want) {
				t.Fatalf("output missing %q:\n%s", test.want, result.OutputText)
			}
		})
	}
}
