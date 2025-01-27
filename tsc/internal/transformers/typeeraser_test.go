package transformers

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"gotest.tools/v3/assert"
)

func TestTypeEraser(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
		jsx    bool
	}{
		{title: "Modifiers", input: "class C { public x; private y }", output: "class C {\n    x;\n    y;\n}\n"},
		{title: "InterfaceDeclaration", input: "interface I { }", output: ""},
		{title: "TypeAliasDeclaration", input: "type T = U;", output: ""},
		{title: "NamespaceExportDeclaration", input: "export as namespace N;", output: ""},
		{title: "ExpressionWithTypeArguments", input: "F<T>", output: "F;\n"},
		{title: "PropertyDeclaration1", input: "class C { declare x; }", output: "class C {\n}\n"},
		{title: "PropertyDeclaration2", input: "class C { public x: number; }", output: "class C {\n    x;\n}\n"},
		{title: "PropertyDeclaration3", input: "class C { public static x: number; }", output: "class C {\n    static x;\n}\n"},
		{title: "ConstructorDeclaration1", input: "class C { constructor(); }", output: "class C {\n}\n"},
		{title: "ConstructorDeclaration2", input: "class C { public constructor() {} }", output: "class C {\n    constructor() { }\n}\n"},
		{title: "MethodDeclaration1", input: "class C { m(); }", output: "class C {\n}\n"},
		{title: "MethodDeclaration2", input: "class C { public m<T>(): U {} }", output: "class C {\n    m() { }\n}\n"},
		{title: "MethodDeclaration3", input: "class C { public static m<T>(): U {} }", output: "class C {\n    static m() { }\n}\n"},
		{title: "GetAccessorDeclaration1", input: "class C { get m(); }", output: "class C {\n}\n"},
		{title: "GetAccessorDeclaration2", input: "class C { public get m<T>(): U {} }", output: "class C {\n    get m() { }\n}\n"},
		{title: "GetAccessorDeclaration3", input: "class C { public static get m<T>(): U {} }", output: "class C {\n    static get m() { }\n}\n"},
		{title: "SetAccessorDeclaration1", input: "class C { set m(v); }", output: "class C {\n}\n"},
		{title: "SetAccessorDeclaration2", input: "class C { public set m<T>(v): U {} }", output: "class C {\n    set m(v) { }\n}\n"},
		{title: "SetAccessorDeclaration3", input: "class C { public static set m<T>(v): U {} }", output: "class C {\n    static set m(v) { }\n}\n"},
		{title: "IndexSignature", input: "class C { [key: string]: number; }", output: "class C {\n}\n"},
		{title: "VariableDeclaration1", input: "declare var a;", output: ""},
		{title: "VariableDeclaration2", input: "var a: number", output: "var a;\n"},
		{title: "HeritageClause", input: "class C implements I {}", output: "class C {\n}\n"},
		{title: "ClassDeclaration1", input: "declare class C {}", output: ""},
		{title: "ClassDeclaration2", input: "class C<T> {}", output: "class C {\n}\n"},
		{title: "ClassExpression", input: "(class C<T> {})", output: "(class C {\n});\n"},
		{title: "FunctionDeclaration1", input: "declare function f() {}", output: ""},
		{title: "FunctionDeclaration2", input: "function f();", output: ""},
		{title: "FunctionDeclaration3", input: "function f<T>(): U {}", output: "function f() { }\n"},
		{title: "FunctionExpression", input: "(function f<T>(): U {})", output: "(function f() { });\n"},
		{title: "ArrowFunction", input: "(<T>(): U => {})", output: "(() => { });\n"},
		{title: "ParameterDeclaration", input: "function f(this: x, a: number, b?: boolean) {}", output: "function f(a, b) { }\n"},
		{title: "CallExpression", input: "f<T>()", output: "f();\n"},
		{title: "NewExpression1", input: "new f<T>()", output: "new f();\n"},
		{title: "NewExpression2", input: "new f<T>", output: "new f;\n"},
		{title: "TaggedTemplateExpression", input: "f<T>``", output: "f ``;\n"},
		{title: "NonNullExpression", input: "x!", output: "x;\n"},
		{title: "TypeAssertionExpression", input: "<T>x", output: "x;\n"},
		{title: "AsExpression", input: "x as T", output: "x;\n"},
		{title: "SatisfiesExpression", input: "x satisfies T", output: "x;\n"},
		{title: "JsxSelfClosingElement", input: "<x<T> />", output: "<x />;\n", jsx: true},
		{title: "JsxOpeningElement", input: "<x<T>></x>", output: "<x></x>;\n", jsx: true},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			file := parseTypeScript(rec.input, rec.jsx)
			checkDiagnostics(t, file)
			checkEmit(t, NewTypeEraserTransformer().VisitSourceFile(file), rec.output)
		})
	}
}

func checkDiagnostics(t *testing.T, file *ast.SourceFile) {
	t.Helper()
	if len(file.Diagnostics()) > 0 {
		t.Error(formatDiagnostics(file.Diagnostics()))
	}
}

func checkEmit(t *testing.T, file *ast.SourceFile, expected string) {
	t.Helper()
	printer := &printer.Printer{
		Options: printer.PrinterOptions{
			NewLine: core.NewLineKindLF,
		},
	}
	actual := printer.EmitSourceFile(file)
	assert.Equal(t, expected, actual)
}

func parseTypeScript(text string, jsx bool) *ast.SourceFile {
	file := parser.ParseSourceFile(core.IfElse(jsx, "main.tsx", "main.ts"), text, core.ScriptTargetESNext, scanner.JSDocParsingModeParseAll)
	ast.SetParentInChildren(file.AsNode())
	return file
}

func formatDiagnostics(diagnostics []*ast.Diagnostic) string {
	var b strings.Builder
	for _, d := range diagnostics {
		formatDiagnostic(&b, d, 0)
	}
	return b.String()
}

func formatDiagnostic(b *strings.Builder, d *ast.Diagnostic, level int) {
	file := d.File()
	if file != nil {
		line, character := scanner.GetLineAndCharacterOfPosition(file, d.Loc().Pos())
		b.WriteString(fmt.Sprintf("%v%v(%v,%v): error TS%v: %v\n", strings.Repeat(" ", level*2), file.FileName(), line+1, character+1, d.Code(), d.Message()))
	} else {
		b.WriteString(fmt.Sprintf("%verror TS%v: %v\n", strings.Repeat(" ", level*2), d.Code(), d.Message()))
	}
	formatMessageChain(b, d.MessageChain(), level+1)
	for _, r := range d.RelatedInformation() {
		formatDiagnostic(b, r, level+1)
	}
}

func formatMessageChain(b *strings.Builder, messageChain []*ast.Diagnostic, level int) {
	for _, c := range messageChain {
		b.WriteString(fmt.Sprintf("%v%v\n", strings.Repeat(" ", level*2), c.Message()))
		formatMessageChain(b, c.MessageChain(), level+1)
	}
}
