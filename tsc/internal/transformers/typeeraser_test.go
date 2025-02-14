package transformers

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
)

func TestTypeEraser(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
		jsx    bool
		vms    bool
	}{
		{title: "Modifiers", input: "class C { public x; private y }", output: "class C {\n    x;\n    y;\n}"},
		{title: "InterfaceDeclaration", input: "interface I { }", output: ""},
		{title: "TypeAliasDeclaration", input: "type T = U;", output: ""},
		{title: "NamespaceExportDeclaration", input: "export as namespace N;", output: ""},
		{title: "UninstantiatedNamespace1", input: "namespace N {}", output: ""},
		{title: "UninstantiatedNamespace2", input: "namespace N { export interface I {} }", output: ""},
		{title: "UninstantiatedNamespace3", input: "namespace N { export type T = U; }", output: ""},
		{title: "ExpressionWithTypeArguments", input: "F<T>", output: "F;"},
		{title: "PropertyDeclaration1", input: "class C { declare x; }", output: "class C {\n}"},
		{title: "PropertyDeclaration2", input: "class C { public x: number; }", output: "class C {\n    x;\n}"},
		{title: "PropertyDeclaration3", input: "class C { public static x: number; }", output: "class C {\n    static x;\n}"},
		{title: "ConstructorDeclaration1", input: "class C { constructor(); }", output: "class C {\n}"},
		{title: "ConstructorDeclaration2", input: "class C { public constructor() {} }", output: "class C {\n    constructor() { }\n}"},
		{title: "MethodDeclaration1", input: "class C { m(); }", output: "class C {\n}"},
		{title: "MethodDeclaration2", input: "class C { public m<T>(): U {} }", output: "class C {\n    m() { }\n}"},
		{title: "MethodDeclaration3", input: "class C { public static m<T>(): U {} }", output: "class C {\n    static m() { }\n}"},
		{title: "GetAccessorDeclaration1", input: "class C { get m(); }", output: "class C {\n}"},
		{title: "GetAccessorDeclaration2", input: "class C { public get m<T>(): U {} }", output: "class C {\n    get m() { }\n}"},
		{title: "GetAccessorDeclaration3", input: "class C { public static get m<T>(): U {} }", output: "class C {\n    static get m() { }\n}"},
		{title: "SetAccessorDeclaration1", input: "class C { set m(v); }", output: "class C {\n}"},
		{title: "SetAccessorDeclaration2", input: "class C { public set m<T>(v): U {} }", output: "class C {\n    set m(v) { }\n}"},
		{title: "SetAccessorDeclaration3", input: "class C { public static set m<T>(v): U {} }", output: "class C {\n    static set m(v) { }\n}"},
		{title: "IndexSignature", input: "class C { [key: string]: number; }", output: "class C {\n}"},
		{title: "VariableDeclaration1", input: "declare var a;", output: ""},
		{title: "VariableDeclaration2", input: "var a: number", output: "var a;"},
		{title: "HeritageClause", input: "class C implements I {}", output: "class C {\n}"},
		{title: "ClassDeclaration1", input: "declare class C {}", output: ""},
		{title: "ClassDeclaration2", input: "class C<T> {}", output: "class C {\n}"},
		{title: "ClassExpression", input: "(class C<T> {})", output: "(class C {\n});"},
		{title: "FunctionDeclaration1", input: "declare function f() {}", output: ""},
		{title: "FunctionDeclaration2", input: "function f();", output: ""},
		{title: "FunctionDeclaration3", input: "function f<T>(): U {}", output: "function f() { }"},
		{title: "FunctionExpression", input: "(function f<T>(): U {})", output: "(function f() { });"},
		{title: "ArrowFunction", input: "(<T>(): U => {})", output: "(() => { });"},
		{title: "ParameterDeclaration", input: "function f(this: x, a: number, b?: boolean) {}", output: "function f(a, b) { }"},
		{title: "CallExpression", input: "f<T>()", output: "f();"},
		{title: "NewExpression1", input: "new f<T>()", output: "new f();"},
		{title: "NewExpression2", input: "new f<T>", output: "new f;"},
		{title: "TaggedTemplateExpression", input: "f<T>``", output: "f ``;"},
		{title: "NonNullExpression", input: "x!", output: "x;"},
		{title: "TypeAssertionExpression", input: "<T>x", output: "x;"},
		{title: "AsExpression", input: "x as T", output: "x;"},
		{title: "SatisfiesExpression", input: "x satisfies T", output: "x;"},
		{title: "JsxSelfClosingElement", input: "<x<T> />", output: "<x />;", jsx: true},
		{title: "JsxOpeningElement", input: "<x<T>></x>", output: "<x></x>;", jsx: true},
		{title: "ImportEqualsDeclaration#1", input: "import x = require(\"m\");", output: "import x = require(\"m\");"},
		{title: "ImportEqualsDeclaration#2", input: "import type x = require(\"m\");", output: ""},
		{title: "ImportEqualsDeclaration#3", input: "import x = y;", output: "import x = y;"},
		{title: "ImportEqualsDeclaration#4", input: "import type x = y;", output: ""},
		{title: "ImportDeclaration#1", input: "import \"m\";", output: "import \"m\";"},
		{title: "ImportDeclaration#2", input: "import * as x from \"m\"; x;", output: "import * as x from \"m\";\nx;"},
		{title: "ImportDeclaration#3", input: "import x from \"m\"; x;", output: "import x from \"m\";\nx;"},
		{title: "ImportDeclaration#4", input: "import { x } from \"m\"; x;", output: "import { x } from \"m\";\nx;"},
		{title: "ImportDeclaration#5", input: "import type * as x from \"m\";", output: ""},
		{title: "ImportDeclaration#6", input: "import type x from \"m\";", output: ""},
		{title: "ImportDeclaration#7", input: "import type { x } from \"m\";", output: ""},
		{title: "ImportDeclaration#8", input: "import { type x } from \"m\";", output: ""},
		{title: "ImportDeclaration#9", input: "import { type x } from \"m\";", output: "import {} from \"m\";", vms: true},
		{title: "ExportDeclaration#1", input: "export * from \"m\";", output: "export * from \"m\";"},
		{title: "ExportDeclaration#2", input: "export * as x from \"m\";", output: "export * as x from \"m\";"},
		{title: "ExportDeclaration#3", input: "export { x } from \"m\";", output: "export { x } from \"m\";"},
		{title: "ExportDeclaration#4", input: "export type * from \"m\";", output: ""},
		{title: "ExportDeclaration#5", input: "export type * as x from \"m\";", output: ""},
		{title: "ExportDeclaration#6", input: "export type { x } from \"m\";", output: ""},
		{title: "ExportDeclaration#7", input: "export { type x } from \"m\";", output: ""},
		{title: "ExportDeclaration#7", input: "export { type x } from \"m\";", output: "export {} from \"m\";", vms: true},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(rec.input, rec.jsx)
			parsetestutil.CheckDiagnostics(t, file)
			compilerOptions := &core.CompilerOptions{}
			if rec.vms {
				compilerOptions.VerbatimModuleSyntax = core.TSTrue
			}
			emittestutil.CheckEmit(t, nil, NewTypeEraserTransformer(printer.NewEmitContext(), compilerOptions).TransformSourceFile(file), rec.output)
		})
	}
}
