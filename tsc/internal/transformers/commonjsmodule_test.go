package transformers

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fakeSourceFileMetaDataProvider struct{}

func (p *fakeSourceFileMetaDataProvider) GetSourceFileMetaData(path tspath.Path) *ast.SourceFileMetaData {
	return nil
}

func TestCommonJSModuleTransformer(t *testing.T) {
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
			title: "ImportDeclaration#1",
			input: `import "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("other");`,
		},
		{
			title: "ImportDeclaration#2",
			input: `import * as a from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("other");`,
		},
		{
			title: "ImportDeclaration#3",
			input: `import { a } from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");`,
		},
		{
			title: "ImportDeclaration#4",
			input: `import a from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");`,
		},
		{
			title: "ImportDeclaration#5",
			input: `import a, * as b from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other"), b = other_1;`,
		},
		{
			title: "ImportDeclaration#6",
			input: `import { a } from "other"
export { a }`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const other_1 = require("other");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return other_1.a; } });`,
		},
		{
			title: "ImportDeclaration#7",
			input: `import * as a from "other"`,
			output: `"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const a = __importStar(require("other"));`,
			options: core.CompilerOptions{ESModuleInterop: core.TSTrue},
		},
		{
			title: "ImportDeclaration#8",
			input: `import * as a from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const a = tslib_1.__importStar(require("other"));`,
			options: core.CompilerOptions{ESModuleInterop: core.TSTrue, ImportHelpers: core.TSTrue},
		},

		// ImportEqualsDeclaration
		{
			title: "ImportEqualsDeclaration#1",
			input: `import a = require("other");`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("other");`,
		},
		{
			title: "ImportEqualsDeclaration#2",
			input: `export import a = require("other");`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = require("other");`,
		},

		// ExportDeclaration
		{
			title: "ExportDeclaration#1",
			input: `export { a } from "other";`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const other_1 = require("other");
Object.defineProperty(exports, "a", { enumerable: true, get: function () { return other_1.a; } });`,
		},
		{
			title: "ExportDeclaration#2",
			input: `export * as a from "other";`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = require("other");`,
		},
		{
			title: "ExportDeclaration#3",
			input: `export * from "other";`,
			output: `"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("other"), exports);`,
		},
		{
			title: "ExportDeclaration#4",
			input: `export * as a from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const tslib_1 = require("tslib");
exports.a = tslib_1.__importStar(require("other"));`,
			options: core.CompilerOptions{ESModuleInterop: core.TSTrue, ImportHelpers: core.TSTrue},
		},
		{
			title: "ExportDeclaration#5",
			input: `export * from "other"`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("other"), exports);`,
			options: core.CompilerOptions{ESModuleInterop: core.TSTrue, ImportHelpers: core.TSTrue},
		},

		// ExportAssignment
		{
			title: "ExportAssignment#1",
			input: `var a = 0;
export default a;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 0;
exports.default = a;`,
		},
		{
			title: "ExportAssignment#2",
			input: `var a = 0;
export = a;`,
			output: `"use strict";
var a = 0;
module.exports = a;`,
		},

		// FunctionDeclaration
		{
			title: "FunctionDeclaration#1",
			input: `export function f() {}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() { }`,
		},
		{
			title: "FunctionDeclaration#2",
			input: `export default function f() {}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function f() { }`,
		},
		{
			title: "FunctionDeclaration#3",
			input: `export default function () {}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1() { }`,
		},
		{
			title: "FunctionDeclaration#4",
			input: `function f() {}
export { f };`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() { }`,
		},

		// ClassDeclaration
		{
			title: "ClassDeclaration#1",
			input: `export class C {}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
}
exports.C = C;`,
		},
		{
			title: "ClassDeclaration#2",
			input: `export default class C {}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
}
exports.default = C;`,
		},
		{
			title: "ClassDeclaration#3",
			input: `export default class {}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
}
exports.default = default_1;`,
		},
		{
			title: "ClassDeclaration#4",
			input: `class C {}
export { C };`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
}
exports.C = C;`,
		},

		// VariableStatement
		{
			title: "VariableStatement#1",
			input: `export var x = y;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = y;`,
		},
		{
			title: "VariableStatement#2",
			input: `export var { x } = y;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
({ x: exports.x } = y);`,
		},
		{
			title: "VariableStatement#3",
			input: `export var [x] = y;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
[exports.x] = y;`,
		},
		{
			title: "VariableStatement#4",
			input: `var x;
export { x };
x || (x = 1);`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
x || (exports.x = x = 1);`,
		},
		{
			title: "VariableStatement#5 (from enum)",
			input: `export enum E { A }`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = void 0;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (exports.E = E = {}));`,
		},

		// ForStatement
		{
			title: "ForStatement#1",
			input: `export { x };
for (var x = 0; ; ) ;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x = 0;
exports.x = x;
for (;;)
    ;`,
		},

		// ForInStatement
		{
			title: "ForInStatement#1",
			input: `export { x };
for (var x in {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
for (var x in {}) {
    exports.x = x;
    ;
}`,
		},

		// ForOfStatement
		{
			title: "ForOfStatement#1",
			input: `export { x };
for (var x of {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
for (var x of {}) {
    exports.x = x;
    ;
}`,
		},

		// DoStatement
		{
			title: "DoStatement#1",
			input: `export { x };
do {
    var x = 0;
} while (false);`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
do {
    var x = 0;
    exports.x = x;
} while (false);`,
		},

		// WhileStatement
		{
			title: "WhileStatement#1",
			input: `export { x };
while (true) {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
while (true) {
    var x = 0;
    exports.x = x;
}`,
		},

		// LabeledStatement
		{
			title: "LabeledStatement#1",
			input: `export { x };
label: {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
label: {
    var x = 0;
    exports.x = x;
}`,
		},

		// WithStatement
		{
			title: "WithStatement#1",
			input: `export { x };
with ({}) {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
with ({}) {
    var x = 0;
    exports.x = x;
}`,
		},

		// IfStatement
		{
			title: "IfStatement#1",
			input: `export { x };
if (y) {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
if (y) {
    var x = 0;
    exports.x = x;
}`,
		},
		{
			title: "IfStatement#2",
			input: `export { x };
if (y) {
}
else {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
if (y) {
}
else {
    var x = 0;
    exports.x = x;
}`,
		},

		// SwitchStatement
		{
			title: "SwitchStatement#1",
			input: `export { x };
switch (y) {
    case 0:
        var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
switch (y) {
    case 0:
        var x = 0;
        exports.x = x;
}`,
		},
		{
			title: "SwitchStatement#2",
			input: `export { x };
switch (y) {
    default:
        var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
switch (y) {
    default:
        var x = 0;
        exports.x = x;
}`,
		},

		// TryStatement
		{
			title: "TryStatement#1",
			input: `export { x };
try {
    var x = 0;
}
catch {
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
try {
    var x = 0;
    exports.x = x;
}
catch {
}`,
		},
		{
			title: "TryStatement#2",
			input: `export { x };
try {
}
catch {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
try {
}
catch {
    var x = 0;
    exports.x = x;
}`,
		},
		{
			title: "TryStatement#3",
			input: `export { x };
try {
}
finally {
    var x = 0;
}`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
try {
}
finally {
    var x = 0;
    exports.x = x;
}`,
		},

		// DestructuringAssignment
		{
			title: "DestructuringAssignment#1",
			input: `var x;
export { x };
({ x: x } = {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
({ x: { set value(value) { exports.x = x = value; } }.value } = {});`,
		},
		{
			title: "DestructuringAssignment#2",
			input: `var x;
export { x };
({ x: x = 1 } = {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
({ x: { set value(value) { exports.x = x = value; } }.value = 1 } = {});`,
		},
		{
			title: "DestructuringAssignment#3",
			input: `var x;
export { x };
({ x } = {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
({ x: { set value(value) { exports.x = x = value; } }.value } = {});`,
		},
		{
			title: "DestructuringAssignment#4",
			input: `var x;
export { x };
({ x = 1 } = {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
({ x: { set value(value) { exports.x = x = value; } }.value = 1 } = {});`,
		},
		{
			title: "DestructuringAssignment#5",
			input: `var x;
export { x };
({ ...x } = {});`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
({ ...{ set value(value) { exports.x = x = value; } }.value } = {});`,
		},
		{
			title: "DestructuringAssignment#6",
			input: `var x;
export { x };
[x] = [];`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
[{ set value(value) { exports.x = x = value; } }.value] = [];`,
		},
		{
			title: "DestructuringAssignment#7",
			input: `var x;
export { x };
[x = 1] = [];`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
[{ set value(value) { exports.x = x = value; } }.value = 1] = [];`,
		},
		{
			title: "DestructuringAssignment#8",
			input: `var x;
export { x };
[...x] = [];`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
[...{ set value(value) { exports.x = x = value; } }.value] = [];`,
		},
		{
			title: "DestructuringAssignment#9",
			input: `var x;
export { x };
[{ x: x }] = [];`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var x;
[{ x: { set value(value) { exports.x = x = value; } }.value }] = [];`,
		},

		// AssignmentExpression
		{
			title: "AssignmentExpression#1",
			input: `export var a;
a = 1;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;`,
		},
		{
			title: "AssignmentExpression#2",
			input: `var a;
export { a };
a = 1;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a;
exports.a = a = 1;`,
		},
		{
			title: "AssignmentExpression#3",
			input: `var a;
export { a, a as b };
a = 1;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
var a;
exports.b = exports.a = a = 1;`,
		},

		// PrefixUnaryExpression
		{
			title: "PrefixUnaryExpression#1",
			input: `export var a = 0;
++a;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 0;
++exports.a;`,
		},
		{
			title: "PrefixUnaryExpression#2",
			input: `var a = 0;
export { a }
++a;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0;
exports.a = a;
exports.a = ++a;`,
		},

		// PostfixUnaryExpression
		{
			title: "PostfixUnaryExpression#1",
			input: `export var a = 0;
a++;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 0;
exports.a++;`,
		},
		{
			title: "PostfixUnaryExpression#2",
			input: `var a = 0;
export { a }
a++;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0;
exports.a = a;
exports.a = (a++, a);`,
		},
		{
			title: "PostfixUnaryExpression#3",
			input: `var a = 0, b;
export { a }
b = a++;`,
			output: `"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0, b;
exports.a = a;
b = (exports.a = (_a = a++, a), _a);`,
		},
		{
			title: "PostfixUnaryExpression#4",
			input: `var a = 0;
export { a }
(a++);`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0;
exports.a = a;
(exports.a = (a++, a));`,
		},
		{
			title: "PostfixUnaryExpression#5",
			input: `var a = 0;
export { a }
a++, 0;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0;
exports.a = a;
exports.a = (a++, a), 0;`,
		},
		{
			title: "PostfixUnaryExpression#6",
			input: `var a = 0, b;
export { a }
b = (a++, 0);`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0, b;
exports.a = a;
b = (exports.a = (a++, a), 0);`,
		},
		{
			title: "PostfixUnaryExpression#7",
			input: `var a = 0, b;
export { a }
b = (0, a++);`,
			output: `"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var a = 0, b;
exports.a = a;
b = (0, exports.a = (_a = a++, a), _a);`,
		},

		// ShortHandPropertyAssignment
		{
			title: "ShorthandPropertyAssignment#1",
			input: `import { a } from "other"
({ a })`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");
({ a: other_1.a });`,
		},
		{
			title: "ShorthandPropertyAssignment#2",
			input: `import { a } from "other"
({
    a,
})`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");
({
    a: other_1.a,
});`,
		},

		// CallExpression
		{
			title: "CallExpression#1",
			input: `import { a } from "other"
a()`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");
(0, other_1.a)();`,
		},
		{
			title: "CallExpression#2",
			input: `export var a = (0, function() {});
a()`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = (0, function () { });
(0, exports.a)();`,
		},
		{
			title: "CallExpression#3",
			input: `export{};
import("./other.ts");`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(() => require("./other.js"));`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title: "CallExpression#4",
			input: `export{};
import(x);`,
			output: `"use strict";
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve(` + "`" + `${__rewriteRelativeImportExtension(x)}` + "`" + `).then(s => require(s));`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue},
		},
		{
			title: "CallExpression#5",
			input: `export{};
import(x);`,
			output: `"use strict";
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve(` + "`" + `${__rewriteRelativeImportExtension(x, true)}` + "`" + `).then(s => require(s));`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue, Jsx: core.JsxEmitPreserve},
		},
		{
			title: "CallExpression#6",
			input: `export{};
import(x);`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
Promise.resolve(` + "`" + `${tslib_1.__rewriteRelativeImportExtension(x)}` + "`" + `).then(s => require(s));`,
			options: core.CompilerOptions{RewriteRelativeImportExtensions: core.TSTrue, ImportHelpers: core.TSTrue},
		},
		{
			title: "CallExpression#7",
			input: `export {};
a?.()`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
a?.();`,
		},

		// TaggedTemplateExpression
		{
			title: "TaggedTemplateExpression#1",
			input: "import { a } from \"other\"\n" +
				"a``",
			output: "\"use strict\";\n" +
				"Object.defineProperty(exports, \"__esModule\", { value: true });\n" +
				"const other_1 = require(\"other\");\n" +
				"(0, other_1.a) ``;",
		},
		{
			title: "TaggedTemplateExpression#1",
			input: "export var a = (0, function() {});" +
				"a``",
			output: "\"use strict\";\n" +
				"Object.defineProperty(exports, \"__esModule\", { value: true });\n" +
				"exports.a = void 0;\n" +
				"exports.a = (0, function () { });\n" +
				"(0, exports.a) ``;",
		},

		// Identifier
		{
			title: "Identifier#1",
			input: `import { a } from "other"
a;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");
other_1.a;`,
		},
		{
			title: "Identifier#2",
			input: `export var a = 0;
a;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 0;
exports.a;`,
		},
		{
			title: "Identifier#3 (from enum)",
			input: `export enum E { A }
E.A`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = void 0;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (exports.E = E = {}));
E.A;`,
		},
		{
			title: "Identifier#4 (preserve location)",
			input: `import { a } from "other";
x ||
  a`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("other");
x ||
    other_1.a;`,
		},
		{
			title: "Identifier#5 (from import specifier)",
			input: `import { and } from "./_namespaces/ts.js";
const isNotOverloadAndNotAccessor = and(isNotOverload, isNotAccessor);
`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_js_1 = require("./_namespaces/ts.js");
const isNotOverloadAndNotAccessor = (0, ts_js_1.and)(isNotOverload, isNotAccessor);`,
		},

		{
			title: "Identifier#6 (in template literal)",
			input: `export var x = 1;
` + "`" + `${x}` + "`" + `;`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
` + "`" + `${exports.x}` + "`" + `;`,
		},

		{
			title: "Other",
			input: `export const a = class {
    p = 10;
};`,
			output: `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;`,
		},
	}
	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()

			compilerOptions := rec.options
			compilerOptions.ModuleKind = core.ModuleKindCommonJS
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
			file = NewCommonJSModuleTransformer(emitContext, &compilerOptions, resolver, program).TransformSourceFile(file)
			emittestutil.CheckEmit(t, emitContext, file, rec.output)
		})
	}
}
