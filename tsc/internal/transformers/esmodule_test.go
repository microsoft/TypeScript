package transformers

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
)

func TestESModuleTransformer(t *testing.T) {
	t.Parallel()
	data := []struct {
		title   string
		input   string
		output  string
		other   string
		jsx     bool
		options core.CompilerOptions
	}{
		// ImportDeclaration
		{
			title:  "ImportDeclaration#1",
			input:  `import "other"`,
			output: `import "other";`,
		},
		{
			title:   "ImportDeclaration#2",
			input:   `import "./other.ts"`,
			output:  `import "./other.js";`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title:   "ImportDeclaration#3",
			input:   `import "./other.tsx"`,
			output:  `import "./other.js";`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title:   "ImportDeclaration#4",
			input:   `import "./other.tsx"`,
			output:  `import "./other.jsx";`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue, Jsx: core.JsxEmitPreserve},
		},

		// ImportEqualsDeclaration
		{
			title:  "ImportEqualsDeclaration#1",
			input:  `import x = require("other")`,
			output: `export {};`,
		},
		{
			title: "ImportEqualsDeclaration#2",
			input: `import x = require("other")`,
			output: `import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("other");`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindNode16},
		},
		{
			title: "ImportEqualsDeclaration#3",
			input: `import x = require("./other.ts")`,
			output: `import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("./other.js");`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindNode16, RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title: "ImportEqualsDeclaration#4",
			input: `import x = require("./other.tsx")`,
			output: `import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("./other.js");`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindNode16, RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title: "ImportEqualsDeclaration#5",
			input: `import x = require("./other.tsx")`,
			output: `import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("./other.jsx");`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindNode16, RewriteRelativeImportExtensions: core.TSTrue, Jsx: core.JsxEmitPreserve},
		},
		{
			title: "ImportEqualsDeclaration#6",
			input: `export import x = require("other")`,
			output: `import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("other");
export { x };`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindNode16},
		},

		// ExportAssignment
		{
			title:  "ExportAssignment#1",
			input:  `export = x`,
			output: `export {};`,
		},
		{
			title:   "ExportAssignment#2",
			input:   `export = x`,
			output:  `module.exports = x;`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindPreserve},
		},

		// ExportDeclaration
		{
			title:  "ExportDeclaration#1",
			input:  `export * from "other";`,
			output: `export * from "other";`,
		},
		{
			title:   "ExportDeclaration#2",
			input:   `export * from "./other.ts";`,
			output:  `export * from "./other.js";`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title:   "ExportDeclaration#3",
			input:   `export * as x from "other";`,
			output:  `export * as x from "other";`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindESNext},
		},
		{
			title:  "ExportDeclaration#4",
			input:  `export { x } from "other";`,
			output: `export { x } from "other";`,
		},
		{
			title: "ExportDeclaration#5",
			input: `export * as x from "other";`,
			output: `import * as x_1 from "other";
export { x_1 as x };`,
		},
		{
			title: "ExportDeclaration#6",
			input: `export * as default from "other";`,
			output: `import * as default_1 from "other";
export default default_1;`,
		},

		// CallExpression
		{
			title:  "CallExpression#1",
			input:  `import("other");`,
			output: `import("other");`,
		},
		{
			title:  "CallExpression#2",
			input:  `import(x);`,
			output: `import(x);`,
		},
		{
			title: "CallExpression#3",
			input: `export {};
import("./other.ts");`,
			output: `export {};
import("./other.js");`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title: "CallExpression#4",
			input: `export {};
import(x);`,
			output: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
export {};
import(__rewriteRelativeImportExtension(x));`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title: "CallExpression#5",
			input: `export {};
import(x);`,
			output: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
export {};
import(__rewriteRelativeImportExtension(x, true));`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue, Jsx: core.JsxEmitPreserve},
		},
		{
			title: "CallExpression#6",
			input: `export {};
import(x);`,
			output: `import { __rewriteRelativeImportExtension } from "tslib";
export {};
import(__rewriteRelativeImportExtension(x));`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindESNext, RewriteRelativeImportExtensions: core.TSTrue, ImportHelpers: core.TSTrue},
		},
		{
			title: "CallExpression#7",
			input: `export {};
import(x);
var __rewriteRelativeImportExtension;`,
			output: `import { __rewriteRelativeImportExtension as __rewriteRelativeImportExtension_1 } from "tslib";
export {};
import(__rewriteRelativeImportExtension_1(x));
var __rewriteRelativeImportExtension;`,
			options: core.CompilerOptions{ModuleKind: core.ModuleKindESNext, RewriteRelativeImportExtensions: core.TSTrue, ImportHelpers: core.TSTrue},
		},
	}
	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()

			compilerOptions := rec.options
			sourceFileAffecting := compilerOptions.SourceFileAffecting()
			file := parsetestutil.ParseTypeScript(rec.input, rec.jsx)
			parsetestutil.CheckDiagnostics(t, file)
			binder.BindSourceFile(file, sourceFileAffecting)

			var other *ast.SourceFile
			if len(rec.other) > 0 {
				other = parsetestutil.ParseTypeScript(rec.other, rec.jsx)
				parsetestutil.CheckDiagnostics(t, other)
				binder.BindSourceFile(other, sourceFileAffecting)
			}

			emitContext := printer.NewEmitContext()
			resolver := binder.NewReferenceResolver(&compilerOptions, binder.ReferenceResolverHooks{})
			program := &fakeSourceFileMetaDataProvider{}

			file = NewRuntimeSyntaxTransformer(emitContext, &compilerOptions, resolver).TransformSourceFile(file)
			file = NewESModuleTransformer(emitContext, &compilerOptions, resolver, program).TransformSourceFile(file)
			emittestutil.CheckEmit(t, emitContext, file, rec.output)
		})
	}
}
