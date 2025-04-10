package transformers

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
)

func TestEnumTransformer(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
	}{
		{title: "empty enum", input: "enum E {}", output: `var E;
(function (E) {
})(E || (E = {}));`},

		{title: "simple enum", input: "enum E {A}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));`},

		{title: "autonumber enum #1", input: "enum E {A,B}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));`},

		{title: "autonumber enum #2", input: "enum E {A = 1,B}", output: `var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
})(E || (E = {}));`},

		{title: "autonumber enum #3", input: "enum E {A = 1,B,C}", output: `var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #4", input: "enum E {A = x,B,C}", output: `var E;
(function (E) {
    var auto;
    E[E["A"] = auto = x] = "A";
    E[E["B"] = ++auto] = "B";
    E[E["C"] = ++auto] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #5", input: "enum E {A = x,B,C = y}", output: `var E;
(function (E) {
    var auto;
    E[E["A"] = auto = x] = "A";
    E[E["B"] = ++auto] = "B";
    E["C"] = y;
    if (typeof E.C !== "string") E[E.C] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #6", input: "enum E {A = x,B = y,C = z}", output: `var E;
(function (E) {
    E["A"] = x;
    if (typeof E.A !== "string") E[E.A] = "A";
    E["B"] = y;
    if (typeof E.B !== "string") E[E.B] = "B";
    E["C"] = z;
    if (typeof E.C !== "string") E[E.C] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #7", input: "enum E {A = 1,B,C,D='x'}", output: `var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
    E["D"] = "x";
})(E || (E = {}));`},

		{title: "autonumber enum #8", input: "enum E {A,B=2,C}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #9", input: "enum E {A='x',B=2,C}", output: `var E;
(function (E) {
    E["A"] = "x";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #10", input: "enum E {A='x',B=y,C}", output: `var E;
(function (E) {
    var auto;
    E["A"] = "x";
    E[E["B"] = auto = y] = "B";
    E[E["C"] = ++auto] = "C";
})(E || (E = {}));`},

		{title: "autonumber enum #11", input: "enum E {A='x',B=1,C,D=y,E,F=3,G}", output: `var E;
(function (E) {
    var auto;
    E["A"] = "x";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = auto = y] = "D";
    E[E["E"] = ++auto] = "E";
    E[E["F"] = 3] = "F";
    E[E["G"] = 4] = "G";
})(E || (E = {}));`},

		{title: "autonumber enum #12", input: "enum E {A=-1,B}", output: `var E;
(function (E) {
    E[E["A"] = -1] = "A";
    E[E["B"] = 0] = "B";
})(E || (E = {}));`},

		{title: "autonumber enum #13", input: "enum E {A='x',B}", output: `var E;
(function (E) {
    E["A"] = "x";
    E["B"] = void 0;
})(E || (E = {}));`},

		{title: "autonumber enum #14", input: "enum E {A,B,C=A|B,D}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 1] = "C";
    E[E["D"] = 2] = "D";
})(E || (E = {}));`},

		{title: "string enum #1", input: "enum E {A = 'x',B = 'y',C = 'z'}", output: `var E;
(function (E) {
    E["A"] = "x";
    E["B"] = "y";
    E["C"] = "z";
})(E || (E = {}));`},

		{title: "string enum #2", input: "enum E {A = 'x',B = 'y',C = `a${A}b${B}c`}", output: `var E;
(function (E) {
    E["A"] = "x";
    E["B"] = "y";
    E["C"] = "axbyc";
})(E || (E = {}));`},

		{title: "number enum", input: "enum E {A = 0,B = 1,C = 2}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));`},

		{title: "enum self reference #1", input: "enum E {A,B=A}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 0] = "B";
})(E || (E = {}));`},

		{title: "enum self reference #2", input: "enum E {A=x,B=A}", output: `var E;
(function (E) {
    E["A"] = x;
    if (typeof E.A !== "string") E[E.A] = "A";
    E["B"] = E.A;
    if (typeof E.B !== "string") E[E.B] = "B";
})(E || (E = {}));`},

		{title: "enum self reference #3", input: "enum E {'A'=x,B=A}", output: `var E;
(function (E) {
    E["A"] = x;
    if (typeof E["A"] !== "string") E[E["A"]] = "A";
    E["B"] = E.A;
    if (typeof E.B !== "string") E[E.B] = "B";
})(E || (E = {}));`},

		{title: "enum self reference #4", input: "enum E {'A'=x,'B '=A}", output: `var E;
(function (E) {
    E["A"] = x;
    if (typeof E["A"] !== "string") E[E["A"]] = "A";
    E["B "] = E.A;
    if (typeof E["B "] !== "string") E[E["B "]] = "B ";
})(E || (E = {}));`},

		{title: "enum self reference #5", input: "enum E {A,B=E.A}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 0] = "B";
})(E || (E = {}));`},

		{title: "export enum", input: "export enum E {A, B}", output: `export { E };
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));`},

		{title: "const enum", input: "const enum E {A, B}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));`},

		{title: "merged enum", input: "enum E {A} enum E {B=A}", output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
(function (E) {
    E["B"] = A;
    if (typeof E.B !== "string") E[E.B] = "B";
})(E || (E = {}));`},

		{title: "reverse map enum", input: `enum E {
    A = 0,
    B = 1 << 0,
    C = 1 << 1,
    D,
}`, output: `var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = 3] = "D";
})(E || (E = {}));`},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			options := &core.CompilerOptions{}
			file := parsetestutil.ParseTypeScript(rec.input, false /*jsx*/)
			parsetestutil.CheckDiagnostics(t, file)
			binder.BindSourceFile(file, options.SourceFileAffecting())
			emitContext := printer.NewEmitContext()
			resolver := binder.NewReferenceResolver(options, binder.ReferenceResolverHooks{})
			emittestutil.CheckEmit(t, emitContext, NewRuntimeSyntaxTransformer(emitContext, options, resolver).TransformSourceFile(file), rec.output)
		})
	}
}

func TestNamespaceTransformer(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
	}{
		{title: "empty namespace", input: "namespace N {}", output: `var N;
(function (N) {
})(N || (N = {}));`},

		{title: "export var", input: "namespace N { export var x = 1; }", output: `var N;
(function (N) {
    N.x = 1;
})(N || (N = {}));`},

		{title: "export uninitialized var", input: "namespace N { export var x; }", output: `var N;
(function (N) {
})(N || (N = {}));`},

		{title: "exported var reference", input: "namespace N { export var x = 1; x; }", output: `var N;
(function (N) {
    N.x = 1;
    N.x;
})(N || (N = {}));`},

		{title: "exported var reference across namespaces", input: "namespace N { export var x = 1; } namespace N { x; }", output: `var N;
(function (N) {
    N.x = 1;
})(N || (N = {}));
(function (N) {
    x;
})(N || (N = {}));`},

		{title: "exported array binding pattern", input: "namespace N { export var [x] = [1]; }", output: `var N;
(function (N) {
    [N.x] = [1];
})(N || (N = {}));`},

		{title: "exported array binding pattern + initializer", input: "namespace N { export var [x = 2] = [1]; }", output: `var N;
(function (N) {
    [N.x = 2] = [1];
})(N || (N = {}));`},

		{title: "exported array binding pattern + elision", input: "namespace N { export var [, x] = [1]; }", output: `var N;
(function (N) {
    [, N.x] = [1];
})(N || (N = {}));`},

		{title: "exported array binding pattern + rest", input: "namespace N { export var [, ...x] = [1]; }", output: `var N;
(function (N) {
    [, ...N.x] = [1];
})(N || (N = {}));`},

		{title: "exported array binding pattern + nested array pattern", input: "namespace N { export var [[x]] = [[1]]; }", output: `var N;
(function (N) {
    [[N.x]] = [[1]];
})(N || (N = {}));`},

		{title: "exported array binding pattern + nested object pattern", input: "namespace N { export var [{x}] = [{x: 1}]; }", output: `var N;
(function (N) {
    [{ x: N.x }] = [{ x: 1 }];
})(N || (N = {}));`},

		{title: "exported object binding pattern", input: "namespace N { export var {x: x} = {x: 1}; }", output: `var N;
(function (N) {
    ({ x: N.x } = { x: 1 });
})(N || (N = {}));`},

		{title: "exported object binding pattern + shorthand assignment", input: "namespace N { export var {x} = {x: 1}; }", output: `var N;
(function (N) {
    ({ x: N.x } = { x: 1 });
})(N || (N = {}));`},

		{title: "exported object binding pattern + initializer", input: "namespace N { export var {x: x = 2} = {x: 1}; }", output: `var N;
(function (N) {
    ({ x: N.x = 2 } = { x: 1 });
})(N || (N = {}));`},

		{title: "exported object binding pattern + shorthand assignment + initializer", input: "namespace N { export var {x = 2} = {x: 1}; }", output: `var N;
(function (N) {
    ({ x: N.x = 2 } = { x: 1 });
})(N || (N = {}));`},

		{title: "exported object binding pattern + rest", input: "namespace N { export var {...x} = {x: 1}; }", output: `var N;
(function (N) {
    ({ ...N.x } = { x: 1 });
})(N || (N = {}));`},

		{title: "exported object binding pattern + nested object pattern", input: "namespace N { export var {y:{x}} = {y: {x: 1}}; }", output: `var N;
(function (N) {
    ({ y: { x: N.x } } = { y: { x: 1 } });
})(N || (N = {}));`},

		{title: "exported object binding pattern + nested array pattern", input: "namespace N { export var {y:[x]} = {y: [1]}; }", output: `var N;
(function (N) {
    ({ y: [N.x] } = { y: [1] });
})(N || (N = {}));`},

		{title: "export function", input: "namespace N { export function f() {} }", output: `var N;
(function (N) {
    function f() { }
    N.f = f;
})(N || (N = {}));`},

		{title: "export class", input: "namespace N { export class C {} }", output: `var N;
(function (N) {
    class C {
    }
    N.C = C;
})(N || (N = {}));`},

		{title: "export enum", input: "namespace N { export enum E {A} }", output: `var N;
(function (N) {
    let E;
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E = N.E || (N.E = {}));
})(N || (N = {}));`},

		{title: "export namespace", input: "namespace N { export namespace N2 {} }", output: `var N;
(function (N) {
    let N2;
    (function (N2) {
    })(N2 = N.N2 || (N.N2 = {}));
})(N || (N = {}));`},

		{title: "nested namespace", input: "namespace N.N2 { }", output: `var N;
(function (N) {
    let N2;
    (function (N2) {
    })(N2 = N.N2 || (N.N2 = {}));
})(N || (N = {}));`},

		{title: "import=", input: "import X = Y.X;", output: `var X = Y.X;`},

		{title: "export import= at top-level", input: "export import X = Y.X;", output: `export var X = Y.X;`},

		{title: "export import= in namespace", input: "namespace N { export import X = Y.X; }", output: `var N;
(function (N) {
    N.X = Y.X;
})(N || (N = {}));`},

		{title: "shorthand property assignment", input: "namespace N { export var x = 1; var y = { x }; }", output: `var N;
(function (N) {
    N.x = 1;
    var y = { x: N.x };
})(N || (N = {}));`},

		{title: "shorthand property assignment pattern", input: "namespace N { export var x; ({x} = {x: 1}); }", output: `var N;
(function (N) {
    ({ x: N.x } = { x: 1 });
})(N || (N = {}));`},

		{title: "identifier reference in template", input: `namespace N {
    export var x = 1;
    ` + "`" + `${x}` + "`" + `
}`, output: `var N;
(function (N) {
    N.x = 1;
    ` + "`" + `${N.x}` + "`" + `;
})(N || (N = {}));`},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			options := &core.CompilerOptions{}
			file := parsetestutil.ParseTypeScript(rec.input, false /*jsx*/)
			parsetestutil.CheckDiagnostics(t, file)
			binder.BindSourceFile(file, options.SourceFileAffecting())
			emitContext := printer.NewEmitContext()
			resolver := binder.NewReferenceResolver(options, binder.ReferenceResolverHooks{})
			emittestutil.CheckEmit(t, emitContext, NewRuntimeSyntaxTransformer(emitContext, options, resolver).TransformSourceFile(file), rec.output)
		})
	}
}

func TestParameterPropertyTransformer(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
	}{
		{title: "parameter properties", input: "class C { constructor(public x) { } }", output: `class C {
    x;
    constructor(x) {
        this.x = x;
    }
}`},
		{title: "parameter properties #2", input: "class C extends B { constructor(public x) { super(); } }", output: `class C extends B {
    x;
    constructor(x) {
        super();
        this.x = x;
    }
}`},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			options := &core.CompilerOptions{}
			file := parsetestutil.ParseTypeScript(rec.input, false /*jsx*/)
			parsetestutil.CheckDiagnostics(t, file)
			binder.BindSourceFile(file, options.SourceFileAffecting())
			emitContext := printer.NewEmitContext()
			resolver := binder.NewReferenceResolver(options, binder.ReferenceResolverHooks{})
			file = NewTypeEraserTransformer(emitContext, options).TransformSourceFile(file)
			file = NewRuntimeSyntaxTransformer(emitContext, options, resolver).TransformSourceFile(file)
			emittestutil.CheckEmit(t, emitContext, file, rec.output)
		})
	}
}
