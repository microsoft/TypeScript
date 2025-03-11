package printer_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
)

func TestEmit(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
		jsx    bool
	}{
		{title: "StringLiteral#1", input: `;"test"`, output: ";\n\"test\";"},
		{title: "StringLiteral#2", input: `;'test'`, output: ";\n'test';"},
		{title: "NumericLiteral", input: `0`, output: `0;`},
		{title: "BigIntLiteral", input: `0n`, output: `0n;`},
		{title: "BooleanLiteral#1", input: `true`, output: `true;`},
		{title: "BooleanLiteral#2", input: `false`, output: `false;`},
		{title: "NoSubstitutionTemplateLiteral", input: "``", output: "``;"},
		{title: "RegularExpressionLiteral#1", input: `/a/`, output: `/a/;`},
		{title: "RegularExpressionLiteral#2", input: `/a/g`, output: `/a/g;`},
		{title: "NullLiteral", input: `null`, output: `null;`},
		{title: "ThisExpression", input: `this`, output: `this;`},
		{title: "SuperExpression", input: `super()`, output: `super();`},
		{title: "ImportExpression", input: `import()`, output: `import();`},
		{title: "PropertyAccess#1", input: `a.b`, output: `a.b;`},
		{title: "PropertyAccess#2", input: `a.#b`, output: `a.#b;`},
		{title: "PropertyAccess#3", input: `a?.b`, output: `a?.b;`},
		{title: "PropertyAccess#4", input: `a?.b.c`, output: `a?.b.c;`},
		{title: "PropertyAccess#5", input: `1..b`, output: `1..b;`},
		{title: "PropertyAccess#6", input: `1.0.b`, output: `1.0.b;`},
		{title: "PropertyAccess#7", input: `0x1.b`, output: `0x1.b;`},
		{title: "PropertyAccess#8", input: `0b1.b`, output: `0b1.b;`},
		{title: "PropertyAccess#9", input: `0o1.b`, output: `0o1.b;`},
		{title: "PropertyAccess#10", input: `10e1.b`, output: `10e1.b;`},
		{title: "PropertyAccess#11", input: `10E1.b`, output: `10E1.b;`},
		{title: "PropertyAccess#12", input: `a.b?.c`, output: `a.b?.c;`},
		{title: "PropertyAccess#13", input: "a\n.b", output: "a\n    .b;"},
		{title: "PropertyAccess#14", input: "a.\nb", output: "a.\n    b;"},
		{title: "ElementAccess#1", input: `a[b]`, output: `a[b];`},
		{title: "ElementAccess#2", input: `a?.[b]`, output: `a?.[b];`},
		{title: "ElementAccess#3", input: `a?.[b].c`, output: `a?.[b].c;`},
		{title: "CallExpression#1", input: `a()`, output: `a();`},
		{title: "CallExpression#2", input: `a<T>()`, output: `a<T>();`},
		{title: "CallExpression#3", input: `a(b)`, output: `a(b);`},
		{title: "CallExpression#4", input: `a<T>(b)`, output: `a<T>(b);`},
		{title: "CallExpression#5", input: `a(b).c`, output: `a(b).c;`},
		{title: "CallExpression#6", input: `a<T>(b).c`, output: `a<T>(b).c;`},
		{title: "CallExpression#7", input: `a?.(b)`, output: `a?.(b);`},
		{title: "CallExpression#8", input: `a?.<T>(b)`, output: `a?.<T>(b);`},
		{title: "CallExpression#9", input: `a?.(b).c`, output: `a?.(b).c;`},
		{title: "CallExpression#10", input: `a?.<T>(b).c`, output: `a?.<T>(b).c;`},
		{title: "CallExpression#11", input: `a<T, U>()`, output: `a<T, U>();`},
		// {title: "CallExpression#12", input: `a<T,>()`, output: `a<T,>();`}, // TODO: preserve trailing comma after Strada migration
		{title: "CallExpression#13", input: `a?.b()`, output: `a?.b();`},
		{title: "NewExpression#1", input: `new a`, output: `new a;`},
		{title: "NewExpression#2", input: `new a.b`, output: `new a.b;`},
		{title: "NewExpression#3", input: `new a()`, output: `new a();`},
		{title: "NewExpression#4", input: `new a.b()`, output: `new a.b();`},
		{title: "NewExpression#5", input: `new a<T>()`, output: `new a<T>();`},
		{title: "NewExpression#6", input: `new a.b<T>()`, output: `new a.b<T>();`},
		{title: "NewExpression#7", input: `new a(b)`, output: `new a(b);`},
		{title: "NewExpression#8", input: `new a.b(c)`, output: `new a.b(c);`},
		{title: "NewExpression#9", input: `new a<T>(b)`, output: `new a<T>(b);`},
		{title: "NewExpression#10", input: `new a.b<T>(c)`, output: `new a.b<T>(c);`},
		{title: "NewExpression#11", input: `new a(b).c`, output: `new a(b).c;`},
		{title: "NewExpression#12", input: `new a<T>(b).c`, output: `new a<T>(b).c;`},
		{title: "TaggedTemplateExpression#1", input: "tag``", output: "tag ``;"},
		{title: "TaggedTemplateExpression#2", input: "tag<T>``", output: "tag<T> ``;"},
		{title: "TypeAssertionExpression#1", input: `<T>a`, output: `<T>a;`},
		{title: "FunctionExpression#1", input: `(function(){})`, output: `(function () { });`},
		{title: "FunctionExpression#2", input: `(function f(){})`, output: `(function f() { });`},
		{title: "FunctionExpression#3", input: `(function*f(){})`, output: `(function* f() { });`},
		{title: "FunctionExpression#4", input: `(async function f(){})`, output: `(async function f() { });`},
		{title: "FunctionExpression#5", input: `(async function*f(){})`, output: `(async function* f() { });`},
		{title: "FunctionExpression#6", input: `(function<T>(){})`, output: `(function <T>() { });`},
		{title: "FunctionExpression#7", input: `(function(a){})`, output: `(function (a) { });`},
		{title: "FunctionExpression#8", input: `(function():T{})`, output: `(function (): T { });`},
		{title: "ArrowFunction#1", input: `a=>{}`, output: `a => { };`},
		{title: "ArrowFunction#2", input: `()=>{}`, output: `() => { };`},
		{title: "ArrowFunction#3", input: `(a)=>{}`, output: `(a) => { };`},
		{title: "ArrowFunction#4", input: `<T>(a)=>{}`, output: `<T>(a) => { };`},
		{title: "ArrowFunction#5", input: `async a=>{}`, output: `async a => { };`},
		{title: "ArrowFunction#6", input: `async()=>{}`, output: `async () => { };`},
		{title: "ArrowFunction#7", input: `async<T>()=>{}`, output: `async <T>() => { };`},
		{title: "ArrowFunction#8", input: `():T=>{}`, output: `(): T => { };`},
		{title: "ArrowFunction#9", input: `()=>a`, output: `() => a;`},
		{title: "DeleteExpression", input: `delete a`, output: `delete a;`},
		{title: "TypeOfExpression", input: `typeof a`, output: `typeof a;`},
		{title: "VoidExpression", input: `void a`, output: `void a;`},
		{title: "AwaitExpression", input: `await a`, output: `await a;`},
		{title: "PrefixUnaryExpression#1", input: `+a`, output: `+a;`},
		{title: "PrefixUnaryExpression#2", input: `++a`, output: `++a;`},
		{title: "PrefixUnaryExpression#3", input: `+ +a`, output: `+ +a;`},
		{title: "PrefixUnaryExpression#4", input: `+ ++a`, output: `+ ++a;`},
		{title: "PrefixUnaryExpression#5", input: `-a`, output: `-a;`},
		{title: "PrefixUnaryExpression#6", input: `--a`, output: `--a;`},
		{title: "PrefixUnaryExpression#7", input: `- -a`, output: `- -a;`},
		{title: "PrefixUnaryExpression#8", input: `- --a`, output: `- --a;`},
		{title: "PrefixUnaryExpression#9", input: `+-a`, output: `+-a;`},
		{title: "PrefixUnaryExpression#10", input: `+--a`, output: `+--a;`},
		{title: "PrefixUnaryExpression#11", input: `-+a`, output: `-+a;`},
		{title: "PrefixUnaryExpression#12", input: `-++a`, output: `-++a;`},
		{title: "PrefixUnaryExpression#13", input: `~a`, output: `~a;`},
		{title: "PrefixUnaryExpression#14", input: `!a`, output: `!a;`},
		{title: "PostfixUnaryExpression#1", input: `a++`, output: `a++;`},
		{title: "PostfixUnaryExpression#2", input: `a--`, output: `a--;`},
		{title: "BinaryExpression#1", input: `a,b`, output: `a, b;`},
		{title: "BinaryExpression#2", input: `a+b`, output: `a + b;`},
		{title: "BinaryExpression#3", input: `a**b`, output: `a ** b;`},
		{title: "BinaryExpression#4", input: `a instanceof b`, output: `a instanceof b;`},
		{title: "BinaryExpression#5", input: `a in b`, output: `a in b;`},
		{title: "BinaryExpression#6", input: "a\n&& b", output: "a\n    && b;"},
		{title: "BinaryExpression#7", input: "a &&\nb", output: "a &&\n    b;"},
		{title: "ConditionalExpression#1", input: `a?b:c`, output: `a ? b : c;`},
		{title: "ConditionalExpression#2", input: "a\n?b:c", output: "a\n    ? b : c;"},
		{title: "ConditionalExpression#3", input: "a?\nb:c", output: "a ?\n    b : c;"},
		{title: "ConditionalExpression#4", input: "a?b\n:c", output: "a ? b\n    : c;"},
		{title: "ConditionalExpression#5", input: "a?b:\nc", output: "a ? b :\n    c;"},
		{title: "TemplateExpression#1", input: "`a${b}c`", output: "`a${b}c`;"},
		{title: "TemplateExpression#2", input: "`a${b}c${d}e`", output: "`a${b}c${d}e`;"},
		{title: "YieldExpression#1", input: `(function*() { yield })`, output: `(function* () { yield; });`},
		{title: "YieldExpression#2", input: `(function*() { yield a })`, output: `(function* () { yield a; });`},
		{title: "YieldExpression#3", input: `(function*() { yield*a })`, output: `(function* () { yield* a; });`},
		{title: "SpreadElement", input: `[...a]`, output: `[...a];`},
		{title: "ClassExpression#1", input: `(class {})`, output: "(class {\n});"},
		{title: "ClassExpression#2", input: `(class a {})`, output: "(class a {\n});"},
		{title: "ClassExpression#3", input: `(class<T>{})`, output: "(class<T> {\n});"},
		{title: "ClassExpression#4", input: `(class a<T>{})`, output: "(class a<T> {\n});"},
		{title: "ClassExpression#5", input: `(class extends b {})`, output: "(class extends b {\n});"},
		{title: "ClassExpression#6", input: `(class a extends b {})`, output: "(class a extends b {\n});"},
		{title: "ClassExpression#7", input: `(class implements b {})`, output: "(class implements b {\n});"},
		{title: "ClassExpression#8", input: `(class a implements b {})`, output: "(class a implements b {\n});"},
		{title: "ClassExpression#9", input: `(class implements b, c {})`, output: "(class implements b, c {\n});"},
		{title: "ClassExpression#10", input: `(class a implements b, c {})`, output: "(class a implements b, c {\n});"},
		{title: "ClassExpression#11", input: `(class extends b implements c, d {})`, output: "(class extends b implements c, d {\n});"},
		{title: "ClassExpression#12", input: `(class a extends b implements c, d {})`, output: "(class a extends b implements c, d {\n});"},
		{title: "ClassExpression#13", input: `(@a class {})`, output: "(\n@a\nclass {\n});"},
		{title: "OmittedExpression", input: `[,]`, output: `[,];`},
		{title: "ExpressionWithTypeArguments", input: `a<T>`, output: `a<T>;`},
		{title: "AsExpression", input: `a as T`, output: `a as T;`},
		{title: "SatisfiesExpression", input: `a satisfies T`, output: `a satisfies T;`},
		{title: "NonNullExpression", input: `a!`, output: `a!;`},
		{title: "MetaProperty#1", input: `new.target`, output: `new.target;`},
		{title: "MetaProperty#2", input: `import.meta`, output: `import.meta;`},
		{title: "ArrayLiteralExpression#1", input: `[]`, output: `[];`},
		{title: "ArrayLiteralExpression#2", input: `[a]`, output: `[a];`},
		{title: "ArrayLiteralExpression#3", input: `[a,]`, output: `[a,];`},
		{title: "ArrayLiteralExpression#4", input: `[,a]`, output: `[, a];`},
		{title: "ArrayLiteralExpression#5", input: `[...a]`, output: `[...a];`},
		{title: "ObjectLiteralExpression#1", input: `({})`, output: `({});`},
		{title: "ObjectLiteralExpression#2", input: `({a,})`, output: `({ a, });`},
		{title: "ShorthandPropertyAssignment", input: `({a})`, output: `({ a });`},
		{title: "PropertyAssignment", input: `({a:b})`, output: `({ a: b });`},
		{title: "SpreadAssignment", input: `({...a})`, output: `({ ...a });`},
		{title: "Block", input: `{}`, output: `{ }`},
		{title: "VariableStatement#1", input: `var a`, output: `var a;`},
		{title: "VariableStatement#2", input: `let a`, output: `let a;`},
		{title: "VariableStatement#3", input: `const a = b`, output: `const a = b;`},
		{title: "VariableStatement#4", input: `using a = b`, output: `using a = b;`},
		{title: "VariableStatement#5", input: `await using a = b`, output: `await using a = b;`},
		{title: "EmptyStatement", input: `;`, output: `;`},
		{title: "IfStatement#1", input: `if(a);`, output: "if (a)\n    ;"},
		{title: "IfStatement#2", input: `if(a);else;`, output: "if (a)\n    ;\nelse\n    ;"},
		{title: "IfStatement#3", input: `if(a);else{}`, output: "if (a)\n    ;\nelse { }"},
		{title: "IfStatement#4", input: `if(a);else if(b);`, output: "if (a)\n    ;\nelse if (b)\n    ;"},
		{title: "IfStatement#5", input: `if(a);else if(b) {}`, output: "if (a)\n    ;\nelse if (b) { }"},
		{title: "IfStatement#6", input: `if(a) {}`, output: "if (a) { }"},
		{title: "IfStatement#7", input: `if(a) {} else;`, output: "if (a) { }\nelse\n    ;"},
		{title: "IfStatement#8", input: `if(a) {} else {}`, output: "if (a) { }\nelse { }"},
		{title: "IfStatement#9", input: `if(a) {} else if(b);`, output: "if (a) { }\nelse if (b)\n    ;"},
		{title: "IfStatement#10", input: `if(a) {} else if(b){}`, output: "if (a) { }\nelse if (b) { }"},
		{title: "DoStatement#1", input: `do;while(a);`, output: "do\n    ;\nwhile (a);"},
		{title: "DoStatement#2", input: `do {} while(a);`, output: "do { } while (a);"},
		{title: "WhileStatement#1", input: `while(a);`, output: "while (a)\n    ;"},
		{title: "WhileStatement#2", input: `while(a) {}`, output: "while (a) { }"},
		{title: "ForStatement#1", input: `for(;;);`, output: "for (;;)\n    ;"},
		{title: "ForStatement#2", input: `for(a;;);`, output: "for (a;;)\n    ;"},
		{title: "ForStatement#3", input: `for(var a;;);`, output: "for (var a;;)\n    ;"},
		{title: "ForStatement#4", input: `for(;a;);`, output: "for (; a;)\n    ;"},
		{title: "ForStatement#5", input: `for(;;a);`, output: "for (;; a)\n    ;"},
		{title: "ForStatement#6", input: `for(;;){}`, output: "for (;;) { }"},
		{title: "ForInStatement#1", input: `for(a in b);`, output: "for (a in b)\n    ;"},
		{title: "ForInStatement#2", input: `for(var a in b);`, output: "for (var a in b)\n    ;"},
		{title: "ForInStatement#3", input: `for(a in b){}`, output: "for (a in b) { }"},
		{title: "ForOfStatement#1", input: `for(a of b);`, output: "for (a of b)\n    ;"},
		{title: "ForOfStatement#2", input: `for(var a of b);`, output: "for (var a of b)\n    ;"},
		{title: "ForOfStatement#3", input: `for(a of b){}`, output: "for (a of b) { }"},
		{title: "ForOfStatement#4", input: `for await(a of b);`, output: "for await (a of b)\n    ;"},
		{title: "ForOfStatement#5", input: `for await(var a of b);`, output: "for await (var a of b)\n    ;"},
		{title: "ForOfStatement#6", input: `for await(a of b){}`, output: "for await (a of b) { }"},
		{title: "ContinueStatement#1", input: `continue`, output: "continue;"},
		{title: "ContinueStatement#2", input: `continue a`, output: "continue a;"},
		{title: "BreakStatement#1", input: `break`, output: "break;"},
		{title: "BreakStatement#2", input: `break a`, output: "break a;"},
		{title: "ReturnStatement#1", input: `return`, output: "return;"},
		{title: "ReturnStatement#2", input: `return a`, output: "return a;"},
		{title: "WithStatement#1", input: `with(a);`, output: "with (a)\n    ;"},
		{title: "WithStatement#2", input: `with(a){}`, output: "with (a) { }"},
		{title: "SwitchStatement", input: `switch (a) {}`, output: "switch (a) {\n}"},
		{title: "CaseClause#1", input: `switch (a) {case b:}`, output: "switch (a) {\n    case b:\n}"},
		{title: "CaseClause#2", input: `switch (a) {case b:;}`, output: "switch (a) {\n    case b: ;\n}"},
		{title: "DefaultClause#1", input: `switch (a) {default:}`, output: "switch (a) {\n    default:\n}"},
		{title: "DefaultClause#2", input: `switch (a) {default:;}`, output: "switch (a) {\n    default: ;\n}"},
		{title: "LabeledStatement", input: `a:;`, output: "a:\n    ;"},
		{title: "ThrowStatement", input: `throw a`, output: "throw a;"},
		{title: "TryStatement#1", input: `try {} catch {}`, output: "try { }\ncatch { }"},
		{title: "TryStatement#2", input: `try {} finally {}`, output: "try { }\nfinally { }"},
		{title: "TryStatement#3", input: `try {} catch {} finally {}`, output: "try { }\ncatch { }\nfinally { }"},
		{title: "DebuggerStatement", input: `debugger`, output: "debugger;"},
		{title: "FunctionDeclaration#1", input: `export default function(){}`, output: `export default function () { }`},
		{title: "FunctionDeclaration#2", input: `function f(){}`, output: `function f() { }`},
		{title: "FunctionDeclaration#3", input: `function*f(){}`, output: `function* f() { }`},
		{title: "FunctionDeclaration#4", input: `async function f(){}`, output: `async function f() { }`},
		{title: "FunctionDeclaration#5", input: `async function*f(){}`, output: `async function* f() { }`},
		{title: "FunctionDeclaration#6", input: `function f<T>(){}`, output: `function f<T>() { }`},
		{title: "FunctionDeclaration#7", input: `function f(a){}`, output: `function f(a) { }`},
		{title: "FunctionDeclaration#8", input: `function f():T{}`, output: `function f(): T { }`},
		{title: "FunctionDeclaration#9", input: `function f();`, output: `function f();`},
		{title: "ClassDeclaration#1", input: `class a {}`, output: "class a {\n}"},
		{title: "ClassDeclaration#2", input: `class a<T>{}`, output: "class a<T> {\n}"},
		{title: "ClassDeclaration#3", input: `class a extends b {}`, output: "class a extends b {\n}"},
		{title: "ClassDeclaration#4", input: `class a implements b {}`, output: "class a implements b {\n}"},
		{title: "ClassDeclaration#5", input: `class a implements b, c {}`, output: "class a implements b, c {\n}"},
		{title: "ClassDeclaration#6", input: `class a extends b implements c, d {}`, output: "class a extends b implements c, d {\n}"},
		{title: "ClassDeclaration#7", input: `export default class {}`, output: "export default class {\n}"},
		{title: "ClassDeclaration#8", input: `export default class<T>{}`, output: "export default class<T> {\n}"},
		{title: "ClassDeclaration#9", input: `export default class extends b {}`, output: "export default class extends b {\n}"},
		{title: "ClassDeclaration#10", input: `export default class implements b {}`, output: "export default class implements b {\n}"},
		{title: "ClassDeclaration#11", input: `export default class implements b, c {}`, output: "export default class implements b, c {\n}"},
		{title: "ClassDeclaration#12", input: `export default class extends b implements c, d {}`, output: "export default class extends b implements c, d {\n}"},
		{title: "ClassDeclaration#13", input: `@a class b {}`, output: "@a\nclass b {\n}"},
		{title: "ClassDeclaration#14", input: `@a export class b {}`, output: "@a\nexport class b {\n}"},
		{title: "ClassDeclaration#15", input: `export @a class b {}`, output: "export \n@a\nclass b {\n}"},
		{title: "InterfaceDeclaration#1", input: `interface a {}`, output: "interface a {\n}"},
		{title: "InterfaceDeclaration#2", input: `interface a<T>{}`, output: "interface a<T> {\n}"},
		{title: "InterfaceDeclaration#3", input: `interface a extends b {}`, output: "interface a extends b {\n}"},
		{title: "InterfaceDeclaration#4", input: `interface a extends b, c {}`, output: "interface a extends b, c {\n}"},
		{title: "TypeAliasDeclaration#1", input: `type a = b`, output: "type a = b;"},
		{title: "TypeAliasDeclaration#2", input: `type a<T> = b`, output: "type a<T> = b;"},
		{title: "EnumDeclaration#1", input: `enum a{}`, output: "enum a {\n}"},
		{title: "EnumDeclaration#2", input: `enum a{b}`, output: "enum a {\n    b\n}"},
		{title: "EnumDeclaration#3", input: `enum a{b=c}`, output: "enum a {\n    b = c\n}"},
		{title: "ModuleDeclaration#1", input: `module a{}`, output: "module a { }"},
		{title: "ModuleDeclaration#2", input: `module a.b{}`, output: "module a.b { }"},
		{title: "ModuleDeclaration#3", input: `module "a";`, output: "module \"a\";"},
		{title: "ModuleDeclaration#4", input: `module "a"{}`, output: "module \"a\" { }"},
		{title: "ModuleDeclaration#5", input: `namespace a{}`, output: "namespace a { }"},
		{title: "ModuleDeclaration#6", input: `namespace a.b{}`, output: "namespace a.b { }"},
		{title: "ModuleDeclaration#7", input: `global;`, output: "global;"},
		{title: "ModuleDeclaration#8", input: `global{}`, output: "global { }"},
		{title: "ImportEqualsDeclaration#1", input: `import a = b`, output: "import a = b;"},
		{title: "ImportEqualsDeclaration#2", input: `import a = b.c`, output: "import a = b.c;"},
		{title: "ImportEqualsDeclaration#3", input: `import a = require("b")`, output: "import a = require(\"b\");"},
		{title: "ImportEqualsDeclaration#4", input: `export import a = b`, output: "export import a = b;"},
		{title: "ImportEqualsDeclaration#5", input: `export import a = require("b")`, output: "export import a = require(\"b\");"},
		{title: "ImportEqualsDeclaration#6", input: `import type a = b`, output: "import type a = b;"},
		{title: "ImportEqualsDeclaration#7", input: `import type a = b.c`, output: "import type a = b.c;"},
		{title: "ImportEqualsDeclaration#8", input: `import type a = require("b")`, output: "import type a = require(\"b\");"},
		{title: "ImportDeclaration#1", input: `import "a"`, output: "import \"a\";"},
		{title: "ImportDeclaration#2", input: `import a from "b"`, output: "import a from \"b\";"},
		{title: "ImportDeclaration#3", input: `import type a from "b"`, output: "import type a from \"b\";"},
		{title: "ImportDeclaration#4", input: `import * as a from "b"`, output: "import * as a from \"b\";"},
		{title: "ImportDeclaration#5", input: `import type * as a from "b"`, output: "import type * as a from \"b\";"},
		{title: "ImportDeclaration#6", input: `import {} from "b"`, output: "import {} from \"b\";"},
		{title: "ImportDeclaration#7", input: `import type {} from "b"`, output: "import type {} from \"b\";"},
		{title: "ImportDeclaration#8", input: `import { a } from "b"`, output: "import { a } from \"b\";"},
		{title: "ImportDeclaration#9", input: `import type { a } from "b"`, output: "import type { a } from \"b\";"},
		{title: "ImportDeclaration#8", input: `import { a as b } from "c"`, output: "import { a as b } from \"c\";"},
		{title: "ImportDeclaration#9", input: `import type { a as b } from "c"`, output: "import type { a as b } from \"c\";"},
		{title: "ImportDeclaration#10", input: `import { "a" as b } from "c"`, output: "import { \"a\" as b } from \"c\";"},
		{title: "ImportDeclaration#11", input: `import type { "a" as b } from "c"`, output: "import type { \"a\" as b } from \"c\";"},
		{title: "ImportDeclaration#12", input: `import a, {} from "b"`, output: "import a, {} from \"b\";"},
		{title: "ImportDeclaration#13", input: `import a, * as b from "c"`, output: "import a, * as b from \"c\";"},
		{title: "ImportDeclaration#14", input: `import {} from "a" with {}`, output: "import {} from \"a\" with {};"},
		{title: "ImportDeclaration#15", input: `import {} from "a" with { b: "c" }`, output: "import {} from \"a\" with { b: \"c\" };"},
		{title: "ImportDeclaration#16", input: `import {} from "a" with { "b": "c" }`, output: "import {} from \"a\" with { \"b\": \"c\" };"},
		{title: "ExportAssignment#1", input: `export = a`, output: "export = a;"},
		{title: "ExportAssignment#2", input: `export default a`, output: "export default a;"},
		{title: "NamespaceExportDeclaration", input: `export as namespace a`, output: "export as namespace a;"},
		{title: "ExportDeclaration#1", input: `export * from "a"`, output: "export * from \"a\";"},
		{title: "ExportDeclaration#2", input: `export type * from "a"`, output: "export type * from \"a\";"},
		{title: "ExportDeclaration#3", input: `export * as a from "b"`, output: "export * as a from \"b\";"},
		{title: "ExportDeclaration#4", input: `export type * as a from "b"`, output: "export type * as a from \"b\";"},
		{title: "ExportDeclaration#5", input: `export { } from "a"`, output: "export {} from \"a\";"},
		{title: "ExportDeclaration#6", input: `export type { } from "a"`, output: "export type {} from \"a\";"},
		{title: "ExportDeclaration#7", input: `export { a } from "b"`, output: "export { a } from \"b\";"},
		{title: "ExportDeclaration#8", input: `export { type a } from "b"`, output: "export { type a } from \"b\";"},
		{title: "ExportDeclaration#9", input: `export type { a } from "b"`, output: "export type { a } from \"b\";"},
		{title: "ExportDeclaration#10", input: `export { a as b } from "c"`, output: "export { a as b } from \"c\";"},
		{title: "ExportDeclaration#11", input: `export { type a as b } from "c"`, output: "export { type a as b } from \"c\";"},
		{title: "ExportDeclaration#12", input: `export type { a as b } from "c"`, output: "export type { a as b } from \"c\";"},
		{title: "ExportDeclaration#13", input: `export { a as "b" } from "c"`, output: "export { a as \"b\" } from \"c\";"},
		{title: "ExportDeclaration#14", input: `export { type a as "b" } from "c"`, output: "export { type a as \"b\" } from \"c\";"},
		{title: "ExportDeclaration#15", input: `export type { a as "b" } from "c"`, output: "export type { a as \"b\" } from \"c\";"},
		{title: "ExportDeclaration#16", input: `export { "a" } from "b"`, output: "export { \"a\" } from \"b\";"},
		{title: "ExportDeclaration#17", input: `export { type "a" } from "b"`, output: "export { type \"a\" } from \"b\";"},
		{title: "ExportDeclaration#18", input: `export type { "a" } from "b"`, output: "export type { \"a\" } from \"b\";"},
		{title: "ExportDeclaration#19", input: `export { "a" as b } from "c"`, output: "export { \"a\" as b } from \"c\";"},
		{title: "ExportDeclaration#20", input: `export { type "a" as b } from "c"`, output: "export { type \"a\" as b } from \"c\";"},
		{title: "ExportDeclaration#21", input: `export type { "a" as b } from "c"`, output: "export type { \"a\" as b } from \"c\";"},
		{title: "ExportDeclaration#22", input: `export { "a" as "b" } from "c"`, output: "export { \"a\" as \"b\" } from \"c\";"},
		{title: "ExportDeclaration#23", input: `export { type "a" as "b" } from "c"`, output: "export { type \"a\" as \"b\" } from \"c\";"},
		{title: "ExportDeclaration#24", input: `export type { "a" as "b" } from "c"`, output: "export type { \"a\" as \"b\" } from \"c\";"},
		{title: "ExportDeclaration#25", input: `export { }`, output: "export {};"},
		{title: "ExportDeclaration#26", input: `export type { }`, output: "export type {};"},
		{title: "ExportDeclaration#27", input: `export { a }`, output: "export { a };"},
		{title: "ExportDeclaration#28", input: `export { type a }`, output: "export { type a };"},
		{title: "ExportDeclaration#29", input: `export type { a }`, output: "export type { a };"},
		{title: "ExportDeclaration#30", input: `export { a as b }`, output: "export { a as b };"},
		{title: "ExportDeclaration#31", input: `export { type a as b }`, output: "export { type a as b };"},
		{title: "ExportDeclaration#32", input: `export type { a as b }`, output: "export type { a as b };"},
		{title: "ExportDeclaration#33", input: `export { a as "b" }`, output: "export { a as \"b\" };"},
		{title: "ExportDeclaration#34", input: `export { type a as "b" }`, output: "export { type a as \"b\" };"},
		{title: "ExportDeclaration#35", input: `export type { a as "b" }`, output: "export type { a as \"b\" };"},
		{title: "ExportDeclaration#36", input: `export {} from "a" with {}`, output: "export {} from \"a\" with {};"},
		{title: "ExportDeclaration#37", input: `export {} from "a" with { b: "c" }`, output: "export {} from \"a\" with { b: \"c\" };"},
		{title: "ExportDeclaration#38", input: `export {} from "a" with { "b": "c" }`, output: "export {} from \"a\" with { \"b\": \"c\" };"},
		{title: "KeywordTypeNode#1", input: `type T = any`, output: `type T = any;`},
		{title: "KeywordTypeNode#2", input: `type T = unknown`, output: `type T = unknown;`},
		{title: "KeywordTypeNode#3", input: `type T = never`, output: `type T = never;`},
		{title: "KeywordTypeNode#4", input: `type T = void`, output: `type T = void;`},
		{title: "KeywordTypeNode#5", input: `type T = undefined`, output: `type T = undefined;`},
		{title: "KeywordTypeNode#6", input: `type T = null`, output: `type T = null;`},
		{title: "KeywordTypeNode#7", input: `type T = object`, output: `type T = object;`},
		{title: "KeywordTypeNode#8", input: `type T = string`, output: `type T = string;`},
		{title: "KeywordTypeNode#9", input: `type T = symbol`, output: `type T = symbol;`},
		{title: "KeywordTypeNode#10", input: `type T = number`, output: `type T = number;`},
		{title: "KeywordTypeNode#11", input: `type T = bigint`, output: `type T = bigint;`},
		{title: "KeywordTypeNode#12", input: `type T = boolean`, output: `type T = boolean;`},
		{title: "KeywordTypeNode#13", input: `type T = intrinsic`, output: `type T = intrinsic;`},
		{title: "TypePredicateNode#1", input: `function f(): asserts a`, output: `function f(): asserts a;`},
		{title: "TypePredicateNode#2", input: `function f(): asserts a is b`, output: `function f(): asserts a is b;`},
		{title: "TypePredicateNode#3", input: `function f(): asserts this`, output: `function f(): asserts this;`},
		{title: "TypePredicateNode#4", input: `function f(): asserts this is b`, output: `function f(): asserts this is b;`},
		{title: "TypeReferenceNode#1", input: `type T = a`, output: `type T = a;`},
		{title: "TypeReferenceNode#2", input: `type T = a.b`, output: `type T = a.b;`},
		{title: "TypeReferenceNode#3", input: `type T = a<U>`, output: `type T = a<U>;`},
		{title: "TypeReferenceNode#4", input: `type T = a.b<U>`, output: `type T = a.b<U>;`},
		{title: "FunctionTypeNode#1", input: `type T = () => a`, output: `type T = () => a;`},
		{title: "FunctionTypeNode#2", input: `type T = <T>() => a`, output: `type T = <T>() => a;`},
		{title: "FunctionTypeNode#3", input: `type T = (a) => b`, output: `type T = (a) => b;`},
		{title: "ConstructorTypeNode#1", input: `type T = new () => a`, output: `type T = new () => a;`},
		{title: "ConstructorTypeNode#2", input: `type T = new <T>() => a`, output: `type T = new <T>() => a;`},
		{title: "ConstructorTypeNode#3", input: `type T = new (a) => b`, output: `type T = new (a) => b;`},
		{title: "ConstructorTypeNode#4", input: `type T = abstract new () => a`, output: `type T = abstract new () => a;`},
		{title: "TypeQueryNode#1", input: `type T = typeof a`, output: `type T = typeof a;`},
		{title: "TypeQueryNode#2", input: `type T = typeof a.b`, output: `type T = typeof a.b;`},
		{title: "TypeQueryNode#3", input: `type T = typeof a<U>`, output: `type T = typeof a<U>;`},
		{title: "TypeLiteralNode#1", input: `type T = {}`, output: `type T = {};`},
		{title: "TypeLiteralNode#2", input: `type T = {a}`, output: "type T = {\n    a;\n};"},
		{title: "ArrayTypeNode", input: `type T = a[]`, output: "type T = a[];"},
		{title: "TupleTypeNode#1", input: `type T = []`, output: "type T = [\n];"},
		{title: "TupleTypeNode#2", input: `type T = [a]`, output: "type T = [\n    a\n];"},
		{title: "TupleTypeNode#3", input: `type T = [a,]`, output: "type T = [\n    a\n];"},
		{title: "RestTypeNode", input: `type T = [...a]`, output: "type T = [\n    ...a\n];"},
		{title: "OptionalTypeNode", input: `type T = [a?]`, output: "type T = [\n    a?\n];"},
		{title: "NamedTupleMember#1", input: `type T = [a: b]`, output: "type T = [\n    a: b\n];"},
		{title: "NamedTupleMember#2", input: `type T = [a?: b]`, output: "type T = [\n    a?: b\n];"},
		{title: "NamedTupleMember#3", input: `type T = [...a: b]`, output: "type T = [\n    ...a: b\n];"},
		{title: "UnionTypeNode#1", input: `type T = a | b`, output: "type T = a | b;"},
		{title: "UnionTypeNode#2", input: `type T = a | b | c`, output: "type T = a | b | c;"},
		{title: "UnionTypeNode#3", input: `type T = | a | b`, output: "type T = a | b;"},
		{title: "IntersectionTypeNode#1", input: `type T = a & b`, output: "type T = a & b;"},
		{title: "IntersectionTypeNode#2", input: `type T = a & b & c`, output: "type T = a & b & c;"},
		{title: "IntersectionTypeNode#3", input: `type T = & a & b`, output: "type T = a & b;"},
		{title: "ConditionalTypeNode", input: `type T = a extends b ? c : d`, output: "type T = a extends b ? c : d;"},
		{title: "InferTypeNode#1", input: `type T = a extends infer b ? c : d`, output: "type T = a extends infer b ? c : d;"},
		{title: "InferTypeNode#2", input: `type T = a extends infer b extends c ? d : e`, output: "type T = a extends infer b extends c ? d : e;"},
		{title: "ParenthesizedTypeNode", input: `type T = (U)`, output: "type T = (U);"},
		{title: "ThisTypeNode", input: `type T = this`, output: "type T = this;"},
		{title: "TypeOperatorNode#1", input: `type T = keyof U`, output: "type T = keyof U;"},
		{title: "TypeOperatorNode#2", input: `type T = readonly U[]`, output: "type T = readonly U[];"},
		{title: "TypeOperatorNode#3", input: `type T = unique symbol`, output: "type T = unique symbol;"},
		{title: "IndexedAccessTypeNode", input: `type T = a[b]`, output: "type T = a[b];"},
		{title: "MappedTypeNode#1", input: `type T = { [a in b]: c }`, output: "type T = {\n    [a in b]: c;\n};"},
		{title: "MappedTypeNode#2", input: `type T = { [a in b as c]: d }`, output: "type T = {\n    [a in b as c]: d;\n};"},
		{title: "MappedTypeNode#3", input: `type T = { readonly [a in b]: c }`, output: "type T = {\n    readonly [a in b]: c;\n};"},
		{title: "MappedTypeNode#4", input: `type T = { +readonly [a in b]: c }`, output: "type T = {\n    +readonly [a in b]: c;\n};"},
		{title: "MappedTypeNode#5", input: `type T = { -readonly [a in b]: c }`, output: "type T = {\n    -readonly [a in b]: c;\n};"},
		{title: "MappedTypeNode#6", input: `type T = { [a in b]?: c }`, output: "type T = {\n    [a in b]?: c;\n};"},
		{title: "MappedTypeNode#7", input: `type T = { [a in b]+?: c }`, output: "type T = {\n    [a in b]+?: c;\n};"},
		{title: "MappedTypeNode#8", input: `type T = { [a in b]-?: c }`, output: "type T = {\n    [a in b]-?: c;\n};"},
		{title: "MappedTypeNode#9", input: `type T = { [a in b]: c; d }`, output: "type T = {\n    [a in b]: c;\n    d;\n};"},
		{title: "LiteralTypeNode#1", input: `type T = null`, output: "type T = null;"},
		{title: "LiteralTypeNode#2", input: `type T = true`, output: "type T = true;"},
		{title: "LiteralTypeNode#3", input: `type T = false`, output: "type T = false;"},
		{title: "LiteralTypeNode#4", input: `type T = ""`, output: "type T = \"\";"},
		{title: "LiteralTypeNode#5", input: "type T = ''", output: "type T = '';"},
		{title: "LiteralTypeNode#6", input: "type T = ``", output: "type T = ``;"},
		{title: "LiteralTypeNode#7", input: `type T = 0`, output: "type T = 0;"},
		{title: "LiteralTypeNode#8", input: `type T = 0n`, output: "type T = 0n;"},
		{title: "LiteralTypeNode#9", input: `type T = -0`, output: "type T = -0;"},
		{title: "LiteralTypeNode#10", input: `type T = -0n`, output: "type T = -0n;"},
		{title: "TemplateTypeNode#1", input: "type T = `a${b}c`", output: "type T = `a${b}c`;"},
		{title: "TemplateTypeNode#2", input: "type T = `a${b}c${d}e`", output: "type T = `a${b}c${d}e`;"},
		{title: "ImportTypeNode#1", input: `type T = import(a)`, output: "type T = import(a);"},
		{title: "ImportTypeNode#2", input: `type T = import(a).b`, output: "type T = import(a).b;"},
		{title: "ImportTypeNode#3", input: `type T = import(a).b<U>`, output: "type T = import(a).b<U>;"},
		{title: "ImportTypeNode#4", input: `type T = typeof import(a)`, output: "type T = typeof import(a);"},
		{title: "ImportTypeNode#5", input: `type T = typeof import(a).b`, output: "type T = typeof import(a).b;"},
		{title: "ImportTypeNode#6", input: `type T = import(a, { with: { } })`, output: "type T = import(a, { with: {} });"},
		{title: "ImportTypeNode#6", input: `type T = import(a, { with: { b: "c" } })`, output: "type T = import(a, { with: { b: \"c\" } });"},
		{title: "ImportTypeNode#7", input: `type T = import(a, { with: { "b": "c" } })`, output: "type T = import(a, { with: { \"b\": \"c\" } });"},
		{title: "PropertySignature#1", input: "interface I {a}", output: "interface I {\n    a;\n}"},
		{title: "PropertySignature#2", input: "interface I {readonly a}", output: "interface I {\n    readonly a;\n}"},
		{title: "PropertySignature#3", input: "interface I {\"a\"}", output: "interface I {\n    \"a\";\n}"},
		{title: "PropertySignature#4", input: "interface I {'a'}", output: "interface I {\n    'a';\n}"},
		{title: "PropertySignature#5", input: "interface I {0}", output: "interface I {\n    0;\n}"},
		{title: "PropertySignature#6", input: "interface I {0n}", output: "interface I {\n    0n;\n}"},
		{title: "PropertySignature#7", input: "interface I {[a]}", output: "interface I {\n    [a];\n}"},
		{title: "PropertySignature#8", input: "interface I {a?}", output: "interface I {\n    a?;\n}"},
		{title: "PropertySignature#9", input: "interface I {a: b}", output: "interface I {\n    a: b;\n}"},
		{title: "MethodSignature#1", input: "interface I {a()}", output: "interface I {\n    a();\n}"},
		{title: "MethodSignature#2", input: "interface I {\"a\"()}", output: "interface I {\n    \"a\"();\n}"},
		{title: "MethodSignature#3", input: "interface I {'a'()}", output: "interface I {\n    'a'();\n}"},
		{title: "MethodSignature#4", input: "interface I {0()}", output: "interface I {\n    0();\n}"},
		{title: "MethodSignature#5", input: "interface I {0n()}", output: "interface I {\n    0n();\n}"},
		{title: "MethodSignature#6", input: "interface I {[a]()}", output: "interface I {\n    [a]();\n}"},
		{title: "MethodSignature#7", input: "interface I {a?()}", output: "interface I {\n    a?();\n}"},
		{title: "MethodSignature#8", input: "interface I {a<T>()}", output: "interface I {\n    a<T>();\n}"},
		{title: "MethodSignature#9", input: "interface I {a(): b}", output: "interface I {\n    a(): b;\n}"},
		{title: "MethodSignature#10", input: "interface I {a(b): c}", output: "interface I {\n    a(b): c;\n}"},
		{title: "CallSignature#1", input: "interface I {()}", output: "interface I {\n    ();\n}"},
		{title: "CallSignature#2", input: "interface I {():a}", output: "interface I {\n    (): a;\n}"},
		{title: "CallSignature#3", input: "interface I {(p)}", output: "interface I {\n    (p);\n}"},
		{title: "CallSignature#4", input: "interface I {<T>()}", output: "interface I {\n    <T>();\n}"},
		{title: "ConstructSignature#1", input: "interface I {new ()}", output: "interface I {\n    new ();\n}"},
		{title: "ConstructSignature#2", input: "interface I {new ():a}", output: "interface I {\n    new (): a;\n}"},
		{title: "ConstructSignature#3", input: "interface I {new (p)}", output: "interface I {\n    new (p);\n}"},
		{title: "ConstructSignature#4", input: "interface I {new <T>()}", output: "interface I {\n    new <T>();\n}"},
		{title: "IndexSignatureDeclaration#1", input: "interface I {[a]}", output: "interface I {\n    [a];\n}"},
		{title: "IndexSignatureDeclaration#2", input: "interface I {[a: b]}", output: "interface I {\n    [a: b];\n}"},
		{title: "IndexSignatureDeclaration#3", input: "interface I {[a: b]: c}", output: "interface I {\n    [a: b]: c;\n}"},
		{title: "PropertyDeclaration#1", input: "class C {a}", output: "class C {\n    a;\n}"},
		{title: "PropertyDeclaration#2", input: "class C {readonly a}", output: "class C {\n    readonly a;\n}"},
		{title: "PropertyDeclaration#3", input: "class C {static a}", output: "class C {\n    static a;\n}"},
		{title: "PropertyDeclaration#4", input: "class C {accessor a}", output: "class C {\n    accessor a;\n}"},
		{title: "PropertyDeclaration#5", input: "class C {\"a\"}", output: "class C {\n    \"a\";\n}"},
		{title: "PropertyDeclaration#6", input: "class C {'a'}", output: "class C {\n    'a';\n}"},
		{title: "PropertyDeclaration#7", input: "class C {0}", output: "class C {\n    0;\n}"},
		{title: "PropertyDeclaration#8", input: "class C {0n}", output: "class C {\n    0n;\n}"},
		{title: "PropertyDeclaration#9", input: "class C {[a]}", output: "class C {\n    [a];\n}"},
		{title: "PropertyDeclaration#10", input: "class C {#a}", output: "class C {\n    #a;\n}"},
		{title: "PropertyDeclaration#11", input: "class C {a?}", output: "class C {\n    a?;\n}"},
		{title: "PropertyDeclaration#12", input: "class C {a!}", output: "class C {\n    a!;\n}"},
		{title: "PropertyDeclaration#13", input: "class C {a: b}", output: "class C {\n    a: b;\n}"},
		{title: "PropertyDeclaration#14", input: "class C {a = b}", output: "class C {\n    a = b;\n}"},
		{title: "PropertyDeclaration#15", input: "class C {@a b}", output: "class C {\n    @a\n    b;\n}"},
		{title: "MethodDeclaration#1", input: "class C {a()}", output: "class C {\n    a();\n}"},
		{title: "MethodDeclaration#2", input: "class C {\"a\"()}", output: "class C {\n    \"a\"();\n}"},
		{title: "MethodDeclaration#3", input: "class C {'a'()}", output: "class C {\n    'a'();\n}"},
		{title: "MethodDeclaration#4", input: "class C {0()}", output: "class C {\n    0();\n}"},
		{title: "MethodDeclaration#5", input: "class C {0n()}", output: "class C {\n    0n();\n}"},
		{title: "MethodDeclaration#6", input: "class C {[a]()}", output: "class C {\n    [a]();\n}"},
		{title: "MethodDeclaration#7", input: "class C {#a()}", output: "class C {\n    #a();\n}"},
		{title: "MethodDeclaration#8", input: "class C {a?()}", output: "class C {\n    a?();\n}"},
		{title: "MethodDeclaration#9", input: "class C {a<T>()}", output: "class C {\n    a<T>();\n}"},
		{title: "MethodDeclaration#10", input: "class C {a(): b}", output: "class C {\n    a(): b;\n}"},
		{title: "MethodDeclaration#11", input: "class C {a(b): c}", output: "class C {\n    a(b): c;\n}"},
		{title: "MethodDeclaration#12", input: "class C {a() {} }", output: "class C {\n    a() { }\n}"},
		{title: "MethodDeclaration#13", input: "class C {@a b() {} }", output: "class C {\n    @a\n    b() { }\n}"},
		{title: "MethodDeclaration#14", input: "class C {static a() {} }", output: "class C {\n    static a() { }\n}"},
		{title: "MethodDeclaration#15", input: "class C {async a() {} }", output: "class C {\n    async a() { }\n}"},
		{title: "GetAccessorDeclaration#1", input: "class C {get a()}", output: "class C {\n    get a();\n}"},
		{title: "GetAccessorDeclaration#2", input: "class C {get \"a\"()}", output: "class C {\n    get \"a\"();\n}"},
		{title: "GetAccessorDeclaration#3", input: "class C {get 'a'()}", output: "class C {\n    get 'a'();\n}"},
		{title: "GetAccessorDeclaration#4", input: "class C {get 0()}", output: "class C {\n    get 0();\n}"},
		{title: "GetAccessorDeclaration#5", input: "class C {get 0n()}", output: "class C {\n    get 0n();\n}"},
		{title: "GetAccessorDeclaration#6", input: "class C {get [a]()}", output: "class C {\n    get [a]();\n}"},
		{title: "GetAccessorDeclaration#7", input: "class C {get #a()}", output: "class C {\n    get #a();\n}"},
		{title: "GetAccessorDeclaration#8", input: "class C {get a(): b}", output: "class C {\n    get a(): b;\n}"},
		{title: "GetAccessorDeclaration#9", input: "class C {get a(b): c}", output: "class C {\n    get a(b): c;\n}"},
		{title: "GetAccessorDeclaration#10", input: "class C {get a() {} }", output: "class C {\n    get a() { }\n}"},
		{title: "GetAccessorDeclaration#11", input: "class C {@a get b() {} }", output: "class C {\n    @a\n    get b() { }\n}"},
		{title: "GetAccessorDeclaration#12", input: "class C {static get a() {} }", output: "class C {\n    static get a() { }\n}"},
		{title: "SetAccessorDeclaration#1", input: "class C {set a()}", output: "class C {\n    set a();\n}"},
		{title: "SetAccessorDeclaration#2", input: "class C {set \"a\"()}", output: "class C {\n    set \"a\"();\n}"},
		{title: "SetAccessorDeclaration#3", input: "class C {set 'a'()}", output: "class C {\n    set 'a'();\n}"},
		{title: "SetAccessorDeclaration#4", input: "class C {set 0()}", output: "class C {\n    set 0();\n}"},
		{title: "SetAccessorDeclaration#5", input: "class C {set 0n()}", output: "class C {\n    set 0n();\n}"},
		{title: "SetAccessorDeclaration#6", input: "class C {set [a]()}", output: "class C {\n    set [a]();\n}"},
		{title: "SetAccessorDeclaration#7", input: "class C {set #a()}", output: "class C {\n    set #a();\n}"},
		{title: "SetAccessorDeclaration#8", input: "class C {set a(): b}", output: "class C {\n    set a(): b;\n}"},
		{title: "SetAccessorDeclaration#9", input: "class C {set a(b): c}", output: "class C {\n    set a(b): c;\n}"},
		{title: "SetAccessorDeclaration#10", input: "class C {set a() {} }", output: "class C {\n    set a() { }\n}"},
		{title: "SetAccessorDeclaration#11", input: "class C {@a set b() {} }", output: "class C {\n    @a\n    set b() { }\n}"},
		{title: "SetAccessorDeclaration#12", input: "class C {static set a() {} }", output: "class C {\n    static set a() { }\n}"},
		{title: "ConstructorDeclaration#1", input: "class C {constructor()}", output: "class C {\n    constructor();\n}"},
		{title: "ConstructorDeclaration#2", input: "class C {constructor(): b}", output: "class C {\n    constructor(): b;\n}"},
		{title: "ConstructorDeclaration#3", input: "class C {constructor(b): c}", output: "class C {\n    constructor(b): c;\n}"},
		{title: "ConstructorDeclaration#4", input: "class C {constructor() {} }", output: "class C {\n    constructor() { }\n}"},
		{title: "ConstructorDeclaration#5", input: "class C {@a constructor() {} }", output: "class C {\n    constructor() { }\n}"},
		{title: "ConstructorDeclaration#6", input: "class C {private constructor() {} }", output: "class C {\n    private constructor() { }\n}"},
		{title: "ClassStaticBlockDeclaration", input: "class C {static { }}", output: "class C {\n    static { }\n}"},
		{title: "SemicolonClassElement#1", input: "class C {;}", output: "class C {\n    ;\n}"},
		{title: "ParameterDeclaration#1", input: "function f(a)", output: "function f(a);"},
		{title: "ParameterDeclaration#2", input: "function f(a: b)", output: "function f(a: b);"},
		{title: "ParameterDeclaration#3", input: "function f(a = b)", output: "function f(a = b);"},
		{title: "ParameterDeclaration#4", input: "function f(a?)", output: "function f(a?);"},
		{title: "ParameterDeclaration#5", input: "function f(...a)", output: "function f(...a);"},
		{title: "ParameterDeclaration#6", input: "function f(this)", output: "function f(this);"},
		// {title: "ParameterDeclaration#7", input: "function f(a,)", output: "function f(a,);"}, // TODO: preserve trailing comma after Strada migration
		{title: "ObjectBindingPattern#1", input: "function f({})", output: "function f({});"},
		{title: "ObjectBindingPattern#2", input: "function f({a})", output: "function f({ a });"},
		{title: "ObjectBindingPattern#3", input: "function f({a = b})", output: "function f({ a = b });"},
		{title: "ObjectBindingPattern#4", input: "function f({a: b})", output: "function f({ a: b });"},
		{title: "ObjectBindingPattern#5", input: "function f({a: b = c})", output: "function f({ a: b = c });"},
		{title: "ObjectBindingPattern#6", input: "function f({\"a\": b})", output: "function f({ \"a\": b });"},
		{title: "ObjectBindingPattern#7", input: "function f({'a': b})", output: "function f({ 'a': b });"},
		{title: "ObjectBindingPattern#8", input: "function f({0: b})", output: "function f({ 0: b });"},
		{title: "ObjectBindingPattern#9", input: "function f({[a]: b})", output: "function f({ [a]: b });"},
		{title: "ObjectBindingPattern#10", input: "function f({...a})", output: "function f({ ...a });"},
		{title: "ObjectBindingPattern#11", input: "function f({a: {}})", output: "function f({ a: {} });"},
		{title: "ObjectBindingPattern#12", input: "function f({a: []})", output: "function f({ a: [] });"},
		{title: "ArrayBindingPattern#1", input: "function f([])", output: "function f([]);"},
		{title: "ArrayBindingPattern#2", input: "function f([,])", output: "function f([,]);"},
		{title: "ArrayBindingPattern#3", input: "function f([a])", output: "function f([a]);"},
		{title: "ArrayBindingPattern#4", input: "function f([a, b])", output: "function f([a, b]);"},
		{title: "ArrayBindingPattern#5", input: "function f([a, , b])", output: "function f([a, , b]);"},
		{title: "ArrayBindingPattern#6", input: "function f([a = b])", output: "function f([a = b]);"},
		{title: "ArrayBindingPattern#7", input: "function f([...a])", output: "function f([...a]);"},
		{title: "ArrayBindingPattern#8", input: "function f([{}])", output: "function f([{}]);"},
		{title: "ArrayBindingPattern#9", input: "function f([[]])", output: "function f([[]]);"},
		{title: "TypeParameterDeclaration#1", input: "function f<T>();", output: "function f<T>();"},
		{title: "TypeParameterDeclaration#2", input: "function f<in T>();", output: "function f<in T>();"},
		{title: "TypeParameterDeclaration#3", input: "function f<T extends U>();", output: "function f<T extends U>();"},
		{title: "TypeParameterDeclaration#4", input: "function f<T = U>();", output: "function f<T = U>();"},
		{title: "TypeParameterDeclaration#5", input: "function f<T extends U = V>();", output: "function f<T extends U = V>();"},
		{title: "TypeParameterDeclaration#6", input: "function f<T, U>();", output: "function f<T, U>();"},
		// {title: "TypeParameterDeclaration#7", input: "function f<T,>();", output: "function f<T,>();"}, // TODO: preserve trailing comma after Strada migration
		{title: "JsxElement1", input: "<a></a>", output: "<a></a>;", jsx: true},
		{title: "JsxElement2", input: "<this></this>", output: "<this></this>;", jsx: true},
		{title: "JsxElement3", input: "<a:b></a:b>", output: "<a:b></a:b>;", jsx: true},
		{title: "JsxElement4", input: "<a.b></a.b>", output: "<a.b></a.b>;", jsx: true},
		{title: "JsxElement5", input: "<a<b>></a>", output: "<a<b>></a>;", jsx: true},
		{title: "JsxElement6", input: "<a b></a>", output: "<a b></a>;", jsx: true},
		{title: "JsxElement7", input: "<a>b</a>", output: "<a>b</a>;", jsx: true},
		{title: "JsxElement8", input: "<a>{b}</a>", output: "<a>{b}</a>;", jsx: true},
		{title: "JsxElement9", input: "<a><b></b></a>", output: "<a><b></b></a>;", jsx: true},
		{title: "JsxElement10", input: "<a><b /></a>", output: "<a><b /></a>;", jsx: true},
		{title: "JsxElement11", input: "<a><></></a>", output: "<a><></></a>;", jsx: true},
		{title: "JsxSelfClosingElement1", input: "<a />", output: "<a />;", jsx: true},
		{title: "JsxSelfClosingElement2", input: "<this />", output: "<this />;", jsx: true},
		{title: "JsxSelfClosingElement3", input: "<a:b />", output: "<a:b />;", jsx: true},
		{title: "JsxSelfClosingElement4", input: "<a.b />", output: "<a.b />;", jsx: true},
		{title: "JsxSelfClosingElement5", input: "<a<b> />", output: "<a<b> />;", jsx: true},
		{title: "JsxSelfClosingElement6", input: "<a b/>", output: "<a b/>;", jsx: true},
		{title: "JsxFragment1", input: "<></>", output: "<></>;", jsx: true},
		{title: "JsxFragment2", input: "<>b</>", output: "<>b</>;", jsx: true},
		{title: "JsxFragment3", input: "<>{b}</>", output: "<>{b}</>;", jsx: true},
		{title: "JsxFragment4", input: "<><b></b></>", output: "<><b></b></>;", jsx: true},
		{title: "JsxFragment5", input: "<><b /></>", output: "<><b /></>;", jsx: true},
		{title: "JsxFragment6", input: "<><></></>", output: "<><></></>;", jsx: true},
		{title: "JsxAttribute1", input: "<a b/>", output: "<a b/>;", jsx: true},
		{title: "JsxAttribute2", input: "<a b:c/>", output: "<a b:c/>;", jsx: true},
		{title: "JsxAttribute3", input: "<a b=\"c\"/>", output: "<a b=\"c\"/>;", jsx: true},
		{title: "JsxAttribute4", input: "<a b='c'/>", output: "<a b='c'/>;", jsx: true},
		{title: "JsxAttribute5", input: "<a b={c}/>", output: "<a b={c}/>;", jsx: true},
		{title: "JsxAttribute6", input: "<a b=<c></c>/>", output: "<a b=<c></c>/>;", jsx: true},
		{title: "JsxAttribute7", input: "<a b=<c />/>", output: "<a b=<c />/>;", jsx: true},
		{title: "JsxAttribute8", input: "<a b=<></>/>", output: "<a b=<></>/>;", jsx: true},
		{title: "JsxSpreadAttribute", input: "<a {...b}/>", output: "<a {...b}/>;", jsx: true},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(rec.input, rec.jsx)
			parsetestutil.CheckDiagnostics(t, file)
			emittestutil.CheckEmit(t, nil, file, rec.output)
		})
	}
}

func TestParenthesizeDecorator(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewClassDeclaration(
				factory.NewModifierList(
					[]*ast.Node{
						factory.NewDecorator(
							factory.NewBinaryExpression(
								factory.NewIdentifier("a"),
								factory.NewToken(ast.KindPlusToken),
								factory.NewIdentifier("b"),
							),
						),
					},
				),
				factory.NewIdentifier("C"),
				nil,
				nil,
				factory.NewNodeList([]*ast.Node{}),
			),
		},
	))

	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "@(a + b)\nclass C {\n}")
}

func TestParenthesizeComputedPropertyName(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewClassDeclaration(
				nil, /*modifiers*/
				factory.NewIdentifier("C"),
				nil, /*typeParameters*/
				nil, /*heritageClauses*/
				factory.NewNodeList([]*ast.Node{
					factory.NewPropertyDeclaration(
						nil, /*modifiers*/
						factory.NewComputedPropertyName(
							// will be parenthesized on emit:
							factory.NewBinaryExpression(
								factory.NewIdentifier("a"),
								factory.NewToken(ast.KindCommaToken),
								factory.NewIdentifier("b"),
							),
						),
						nil, /*postfixToken*/
						nil, /*typeNode*/
						nil, /*initializer*/
					),
				}),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "class C {\n    [(a, b)];\n}")
}

func TestParenthesizeArrayLiteral(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewArrayLiteralExpression(
					factory.NewNodeList(
						[]*ast.Node{
							// will be parenthesized on emit:
							factory.NewBinaryExpression(
								factory.NewIdentifier("a"),
								factory.NewToken(ast.KindCommaToken),
								factory.NewIdentifier("b"),
							),
						},
					),
					false, /*multiLine*/
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "[(a, b)];")
}

func TestParenthesizePropertyAccess1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewPropertyAccessExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					nil, /*questionDotToken*/
					factory.NewIdentifier("c"),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b).c;")
}

func TestParenthesizePropertyAccess2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewPropertyAccessExpression(
					// will be parenthesized on emit:
					factory.NewPropertyAccessExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindQuestionDotToken),
						factory.NewIdentifier("b"),
						ast.NodeFlagsOptionalChain,
					),
					nil, /*questionDotToken*/
					factory.NewIdentifier("c"),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a?.b).c;")
}

func TestParenthesizePropertyAccess3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewPropertyAccessExpression(
					// will be parenthesized on emit:
					factory.NewNewExpression(
						factory.NewIdentifier("a"),
						nil, /*typeArguments*/
						nil, /*arguments*/
					),
					nil, /*questionDotToken*/
					factory.NewIdentifier("b"),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(new a).b;")
}

func TestParenthesizeElementAccess1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewElementAccessExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					nil, /*questionDotToken*/
					factory.NewIdentifier("c"),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b)[c];")
}

func TestParenthesizeElementAccess2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewElementAccessExpression(
					// will be parenthesized on emit:
					factory.NewPropertyAccessExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindQuestionDotToken),
						factory.NewIdentifier("b"),
						ast.NodeFlagsOptionalChain,
					),
					nil, /*questionDotToken*/
					factory.NewIdentifier("c"),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a?.b)[c];")
}

func TestParenthesizeElementAccess3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewElementAccessExpression(
					// will be parenthesized on emit:
					factory.NewNewExpression(
						factory.NewIdentifier("a"),
						nil, /*typeArguments*/
						nil, /*arguments*/
					),
					nil, /*questionDotToken*/
					factory.NewIdentifier("b"),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(new a)[b];")
}

func TestParenthesizeCall1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewCallExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNodeList([]*ast.Node{}),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b)();")
}

func TestParenthesizeCall2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewCallExpression(
					// will be parenthesized on emit:
					factory.NewPropertyAccessExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindQuestionDotToken),
						factory.NewIdentifier("b"),
						ast.NodeFlagsOptionalChain,
					),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNodeList([]*ast.Node{}),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a?.b)();")
}

func TestParenthesizeCall3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewCallExpression(
					// will be parenthesized on emit:
					factory.NewNewExpression(
						factory.NewIdentifier("C"),
						nil, /*typeArguments*/
						nil, /*arguments*/
					),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNodeList([]*ast.Node{}),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(new C)();")
}

func TestParenthesizeCall4(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewCallExpression(
					factory.NewIdentifier("a"),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNodeList([]*ast.Node{
						factory.NewBinaryExpression(
							factory.NewIdentifier("b"),
							factory.NewToken(ast.KindCommaToken),
							factory.NewIdentifier("c"),
						),
					}),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "a((b, c));")
}

func TestParenthesizeNew1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewNewExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					nil, /*typeArguments*/
					factory.NewNodeList([]*ast.Node{}),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "new (a, b)();")
}

func TestParenthesizeNew2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewNewExpression(
					// will be parenthesized on emit:
					factory.NewCallExpression(
						factory.NewIdentifier("C"),
						nil, /*questionDotToken*/
						nil, /*typeArguments*/
						factory.NewNodeList([]*ast.Node{}),
						ast.NodeFlagsNone,
					),
					nil, /*typeArguments*/
					nil, /*arguments*/
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "new (C());")
}

func TestParenthesizeNew3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewNewExpression(
					factory.NewIdentifier("C"),
					nil, /*typeArguments*/
					factory.NewNodeList([]*ast.Node{
						factory.NewBinaryExpression(
							factory.NewIdentifier("a"),
							factory.NewToken(ast.KindCommaToken),
							factory.NewIdentifier("b"),
						),
					}),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "new C((a, b));")
}

func TestParenthesizeTaggedTemplate1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewTaggedTemplateExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNoSubstitutionTemplateLiteral(""),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b) ``;")
}

func TestParenthesizeTaggedTemplate2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewTaggedTemplateExpression(
					// will be parenthesized on emit:
					factory.NewPropertyAccessExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindQuestionDotToken),
						factory.NewIdentifier("b"),
						ast.NodeFlagsOptionalChain,
					),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNoSubstitutionTemplateLiteral(""),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a?.b) ``;")
}

func TestParenthesizeTypeAssertion1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewTypeAssertion(
					factory.NewTypeReferenceNode(
						factory.NewIdentifier("T"),
						nil, /*typeArguments*/
					),
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindPlusToken),
						factory.NewIdentifier("b"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "<T>(a + b);")
}

func TestParenthesizeArrowFunction1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewArrowFunction(
					nil, /*modifiers*/
					nil, /*typeParameters*/
					factory.NewNodeList([]*ast.Node{}),
					nil, /*returnType*/
					factory.NewToken(ast.KindEqualsGreaterThanToken),
					// will be parenthesized on emit:
					factory.NewObjectLiteralExpression(
						factory.NewNodeList([]*ast.Node{}),
						false, /*multiLine*/
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "() => ({});")
}

func TestParenthesizeArrowFunction2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewArrowFunction(
					nil, /*modifiers*/
					nil, /*typeParameters*/
					factory.NewNodeList([]*ast.Node{}),
					nil, /*returnType*/
					factory.NewToken(ast.KindEqualsGreaterThanToken),
					// will be parenthesized on emit:
					factory.NewPropertyAccessExpression(
						factory.NewObjectLiteralExpression(
							factory.NewNodeList([]*ast.Node{}),
							false, /*multiLine*/
						),
						nil, /*questionDotToken*/
						factory.NewIdentifier("a"),
						ast.NodeFlagsNone,
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "() => ({}.a);")
}

func TestParenthesizeDelete(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewDeleteExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindPlusToken),
						factory.NewIdentifier("b"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "delete (a + b);")
}

func TestParenthesizeVoid(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewVoidExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindPlusToken),
						factory.NewIdentifier("b"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "void (a + b);")
}

func TestParenthesizeTypeOf(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewTypeOfExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindPlusToken),
						factory.NewIdentifier("b"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "typeof (a + b);")
}

func TestParenthesizeAwait(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewAwaitExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindPlusToken),
						factory.NewIdentifier("b"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "await (a + b);")
}

func isBinaryOperator(token ast.Kind) bool {
	switch token {
	case ast.KindCommaToken,
		ast.KindLessThanToken,
		ast.KindGreaterThanToken,
		ast.KindLessThanEqualsToken,
		ast.KindGreaterThanEqualsToken,
		ast.KindEqualsEqualsToken,
		ast.KindEqualsEqualsEqualsToken,
		ast.KindExclamationEqualsToken,
		ast.KindExclamationEqualsEqualsToken,
		ast.KindPlusToken,
		ast.KindMinusToken,
		ast.KindAsteriskToken,
		ast.KindAsteriskAsteriskToken,
		ast.KindSlashToken,
		ast.KindPercentToken,
		ast.KindLessThanLessThanToken,
		ast.KindGreaterThanGreaterThanToken,
		ast.KindGreaterThanGreaterThanGreaterThanToken,
		ast.KindAmpersandToken,
		ast.KindBarToken,
		ast.KindCaretToken,
		ast.KindAmpersandAmpersandToken,
		ast.KindBarBarToken,
		ast.KindQuestionQuestionToken,
		ast.KindEqualsToken,
		ast.KindPlusEqualsToken,
		ast.KindMinusEqualsToken,
		ast.KindAsteriskEqualsToken,
		ast.KindAsteriskAsteriskEqualsToken,
		ast.KindSlashEqualsToken,
		ast.KindPercentEqualsToken,
		ast.KindLessThanLessThanEqualsToken,
		ast.KindGreaterThanGreaterThanEqualsToken,
		ast.KindGreaterThanGreaterThanGreaterThanEqualsToken,
		ast.KindAmpersandEqualsToken,
		ast.KindBarEqualsToken,
		ast.KindBarBarEqualsToken,
		ast.KindAmpersandAmpersandEqualsToken,
		ast.KindQuestionQuestionEqualsToken,
		ast.KindCaretEqualsToken,
		ast.KindInKeyword,
		ast.KindInstanceOfKeyword:
		return true
	}
	return false
}

func makeSide(label string, kind ast.Kind, factory *ast.NodeFactory) *ast.Node {
	switch {
	case kind == ast.KindIdentifier || kind == ast.KindUnknown:
		return factory.NewIdentifier(label)
	case kind == ast.KindArrowFunction:
		return factory.NewArrowFunction(
			nil, /*modifiers*/
			nil, /*typeParameters*/
			factory.NewNodeList([]*ast.Node{}),
			nil, /*returnType*/
			factory.NewToken(ast.KindEqualsGreaterThanToken),
			factory.NewBlock(factory.NewNodeList([]*ast.Node{}), false /*multiLine*/),
		)
	case isBinaryOperator(kind):
		return factory.NewBinaryExpression(
			factory.NewIdentifier(label+"l"),
			factory.NewToken(kind),
			factory.NewIdentifier(label+"r"),
		)
	default:
		panic("unsupported kind")
	}
}

func TestParenthesizeBinary(t *testing.T) {
	t.Parallel()

	data := []struct {
		left     ast.Kind
		operator ast.Kind
		right    ast.Kind
		output   string
	}{
		{operator: ast.KindCommaToken, output: "l, r"},
		{operator: ast.KindCommaToken, left: ast.KindPlusToken, output: "ll + lr, r"},
		{operator: ast.KindAsteriskToken, left: ast.KindPlusToken, output: "(ll + lr) * r"},
		{operator: ast.KindAsteriskToken, right: ast.KindPlusToken, output: "l * (rl + rr)"},
		{operator: ast.KindPlusToken, left: ast.KindAsteriskToken, output: "ll * lr + r"},
		{operator: ast.KindPlusToken, right: ast.KindAsteriskToken, output: "l + rl * rr"},
		{operator: ast.KindSlashToken, left: ast.KindAsteriskToken, output: "ll * lr / r"},
		{operator: ast.KindSlashToken, left: ast.KindAsteriskAsteriskToken, output: "ll ** lr / r"},
		{operator: ast.KindAsteriskAsteriskToken, left: ast.KindAsteriskToken, output: "(ll * lr) ** r"},
		{operator: ast.KindAsteriskAsteriskToken, left: ast.KindAsteriskAsteriskToken, output: "(ll ** lr) ** r"},
		{operator: ast.KindAsteriskToken, right: ast.KindAsteriskToken, output: "l * rl * rr"},
		{operator: ast.KindBarToken, right: ast.KindBarToken, output: "l | rl | rr"},
		{operator: ast.KindAmpersandToken, right: ast.KindAmpersandToken, output: "l & rl & rr"},
		{operator: ast.KindCaretToken, right: ast.KindCaretToken, output: "l ^ rl ^ rr"},
		{operator: ast.KindAmpersandAmpersandToken, right: ast.KindArrowFunction, output: "l && (() => { })"},
	}
	for _, rec := range data {
		t.Run(rec.output, func(t *testing.T) {
			t.Parallel()

			var factory ast.NodeFactory
			file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
				[]*ast.Node{
					factory.NewExpressionStatement(
						factory.NewBinaryExpression(
							makeSide("l", rec.left, &factory),
							factory.NewToken(rec.operator),
							makeSide("r", rec.right, &factory),
						),
					),
				},
			))
			ast.SetParentInChildren(file)
			parsetestutil.MarkSyntheticRecursive(file)
			emittestutil.CheckEmit(t, nil, file.AsSourceFile(), rec.output+";")
		})
	}
}

func TestParenthesizeConditional1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewConditionalExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					factory.NewToken(ast.KindQuestionToken),
					factory.NewIdentifier("c"),
					factory.NewToken(ast.KindColonToken),
					factory.NewIdentifier("d"),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b) ? c : d;")
}

func TestParenthesizeConditional2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewConditionalExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindEqualsToken),
						factory.NewIdentifier("b"),
					),
					factory.NewToken(ast.KindQuestionToken),
					factory.NewIdentifier("c"),
					factory.NewToken(ast.KindColonToken),
					factory.NewIdentifier("d"),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a = b) ? c : d;")
}

func TestParenthesizeConditional3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewConditionalExpression(
					// will be parenthesized on emit:
					factory.NewArrowFunction(
						nil, /*modifiers*/
						nil, /*typeParameters*/
						factory.NewNodeList([]*ast.Node{}),
						nil, /*returnType*/
						factory.NewToken(ast.KindEqualsGreaterThanToken),
						factory.NewBlock(
							factory.NewNodeList([]*ast.Node{}),
							false, /*multiLine*/
						),
					),
					factory.NewToken(ast.KindQuestionToken),
					factory.NewIdentifier("a"),
					factory.NewToken(ast.KindColonToken),
					factory.NewIdentifier("b"),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(() => { }) ? a : b;")
}

func TestParenthesizeConditional4(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewConditionalExpression(
					// will be parenthesized on emit:
					factory.NewYieldExpression(nil, nil),
					factory.NewToken(ast.KindQuestionToken),
					factory.NewIdentifier("a"),
					factory.NewToken(ast.KindColonToken),
					factory.NewIdentifier("b"),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(yield) ? a : b;")
}

func TestParenthesizeConditional5(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewConditionalExpression(
					factory.NewIdentifier("a"),
					factory.NewToken(ast.KindQuestionToken),
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("b"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("c"),
					),
					factory.NewToken(ast.KindColonToken),
					factory.NewIdentifier("d"),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "a ? (b, c) : d;")
}

func TestParenthesizeConditional6(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewConditionalExpression(
					factory.NewIdentifier("a"),
					factory.NewToken(ast.KindQuestionToken),
					factory.NewIdentifier("b"),
					factory.NewToken(ast.KindColonToken),
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("c"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("d"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "a ? b : (c, d);")
}

func TestParenthesizeYield1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewYieldExpression(
					nil, /*asteriskToken*/
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "yield (a, b);")
}

// !!! test ASI avoidance from emitExpressionNoASI
////func TestParenthesizeYield2(t *testing.T) {
////}

func TestParenthesizeSpreadElement1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewArrayLiteralExpression(
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewSpreadElement(
								// will be parenthesized on emit:
								factory.NewBinaryExpression(
									factory.NewIdentifier("a"),
									factory.NewToken(ast.KindCommaToken),
									factory.NewIdentifier("b"),
								),
							),
						},
					),
					false, /*multiLine*/
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "[...(a, b)];")
}

func TestParenthesizeSpreadElement2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewCallExpression(
					factory.NewIdentifier("a"),
					nil, /*questionDotToken*/
					nil, /*typeArguments*/
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewSpreadElement(
								// will be parenthesized on emit:
								factory.NewBinaryExpression(
									factory.NewIdentifier("b"),
									factory.NewToken(ast.KindCommaToken),
									factory.NewIdentifier("c"),
								),
							),
						},
					),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "a(...(b, c));")
}

func TestParenthesizeSpreadElement3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewNewExpression(
					factory.NewIdentifier("a"),
					nil, /*typeArguments*/
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewSpreadElement(
								// will be parenthesized on emit:
								factory.NewBinaryExpression(
									factory.NewIdentifier("b"),
									factory.NewToken(ast.KindCommaToken),
									factory.NewIdentifier("c"),
								),
							),
						},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "new a(...(b, c));")
}

func TestParenthesizeExpressionWithTypeArguments(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewExpressionWithTypeArguments(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewTypeReferenceNode(
								factory.NewIdentifier("c"),
								nil,
							),
						},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b)<c>;")
}

func TestParenthesizeAsExpression(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewAsExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					factory.NewTypeReferenceNode(
						factory.NewIdentifier("c"),
						nil,
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b) as c;")
}

func TestParenthesizeSatisfiesExpression(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewSatisfiesExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					factory.NewTypeReferenceNode(
						factory.NewIdentifier("c"),
						nil,
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b) satisfies c;")
}

func TestParenthesizeNonNullExpression(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewNonNullExpression(
					// will be parenthesized on emit:
					factory.NewBinaryExpression(
						factory.NewIdentifier("a"),
						factory.NewToken(ast.KindCommaToken),
						factory.NewIdentifier("b"),
					),
					ast.NodeFlagsNone,
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(a, b)!;")
}

func TestParenthesizeExpressionStatement1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewObjectLiteralExpression(
					factory.NewNodeList(
						[]*ast.Node{},
					),
					false, /*multiLine*/
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "({});")
}

func TestParenthesizeExpressionStatement2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewFunctionExpression(
					nil, /*modifiers*/
					nil, /*asteriskToken*/
					nil, /*name*/
					nil, /*typeParameters*/
					factory.NewNodeList(
						[]*ast.Node{},
					),
					nil, /*returnType*/
					factory.NewBlock(
						factory.NewNodeList([]*ast.Node{}),
						false, /*multiLine*/
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(function () { });")
}

func TestParenthesizeExpressionStatement3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExpressionStatement(
				factory.NewClassExpression(
					nil, /*modifiers*/
					nil, /*name*/
					nil, /*typeParameters*/
					nil, /*heritageClauses*/
					factory.NewNodeList(
						[]*ast.Node{},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "(class {\n});")
}

func TestParenthesizeExpressionDefault1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExportAssignment(
				nil,   /*modifiers*/
				false, /*isExportEquals*/
				// will be parenthesized on emit:
				factory.NewClassExpression(
					nil, /*modifiers*/
					nil, /*name*/
					nil, /*typeParameters*/
					nil, /*heritageClauses*/
					factory.NewNodeList(
						[]*ast.Node{},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "export default (class {\n});")
}

func TestParenthesizeExpressionDefault2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExportAssignment(
				nil,   /*modifiers*/
				false, /*isExportEquals*/
				// will be parenthesized on emit:
				factory.NewFunctionExpression(
					nil, /*modifiers*/
					nil, /*asteriskToken*/
					nil, /*name*/
					nil, /*typeParameters*/
					factory.NewNodeList(
						[]*ast.Node{},
					),
					nil, /*returnType*/
					factory.NewBlock(
						factory.NewNodeList(
							[]*ast.Node{},
						),
						false, /*multiLine*/
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "export default (function () { });")
}

func TestParenthesizeExpressionDefault3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewExportAssignment(
				nil,   /*modifiers*/
				false, /*isExportEquals*/
				// will be parenthesized on emit:
				factory.NewBinaryExpression(
					factory.NewIdentifier("a"),
					factory.NewToken(ast.KindCommaToken),
					factory.NewIdentifier("b"),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "export default (a, b);")
}

func TestParenthesizeArrayType(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewArrayTypeNode(
					// will be parenthesized on emit:
					factory.NewUnionTypeNode(
						factory.NewNodeList(
							[]*ast.Node{
								factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
								factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
							},
						),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = (a | b)[];")
}

func TestParenthesizeOptionalType(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewTupleTypeNode(
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewOptionalTypeNode(
								// will be parenthesized on emit:
								factory.NewUnionTypeNode(
									factory.NewNodeList(
										[]*ast.Node{
											factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
											factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
										},
									),
								),
							),
						},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = [\n    (a | b)?\n];")
}

func TestParenthesizeUnionType1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewUnionTypeNode(
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
							// will be parenthesized on emit:
							factory.NewFunctionTypeNode(
								nil, /*typeParameters*/
								factory.NewNodeList(
									[]*ast.Node{},
								),
								factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
							),
						},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = a | (() => b);")
}

func TestParenthesizeUnionType2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewUnionTypeNode(
					factory.NewNodeList(
						[]*ast.Node{
							// will be parenthesized on emit:
							factory.NewInferTypeNode(
								factory.NewTypeParameterDeclaration(
									nil,
									factory.NewIdentifier("a"),
									factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
									nil, /*defaultType*/
								),
							),
							factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
						},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = (infer a extends b) | c;")
}

func TestParenthesizeIntersectionType(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewIntersectionTypeNode(
					factory.NewNodeList(
						[]*ast.Node{
							factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
							// will be parenthesized on emit:
							factory.NewUnionTypeNode(
								factory.NewNodeList(
									[]*ast.Node{
										factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
										factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
									},
								),
							),
						},
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = a & (b | c);")
}

func TestParenthesizeReadonlyTypeOperator1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewTypeOperatorNode(
					ast.KindReadonlyKeyword,
					// will be parenthesized on emit:
					factory.NewUnionTypeNode(
						factory.NewNodeList(
							[]*ast.Node{
								factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
								factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
							},
						),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = readonly (a | b);")
}

func TestParenthesizeReadonlyTypeOperator2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewTypeOperatorNode(
					ast.KindReadonlyKeyword,
					// will be parenthesized on emit:
					factory.NewTypeOperatorNode(
						ast.KindKeyOfKeyword,
						factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = readonly (keyof a);")
}

func TestParenthesizeKeyofTypeOperator(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewTypeOperatorNode(
					ast.KindKeyOfKeyword,
					// will be parenthesized on emit:
					factory.NewUnionTypeNode(
						factory.NewNodeList(
							[]*ast.Node{
								factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
								factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
							},
						),
					),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = keyof (a | b);")
}

func TestParenthesizeIndexedAccessType(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewIndexedAccessTypeNode(
					// will be parenthesized on emit:
					factory.NewUnionTypeNode(
						factory.NewNodeList(
							[]*ast.Node{
								factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
								factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
							},
						),
					),
					factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = (a | b)[c];")
}

func TestParenthesizeConditionalType1(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewConditionalTypeNode(
					// will be parenthesized on emit:
					factory.NewFunctionTypeNode(
						nil, /*typeParameters*/
						factory.NewNodeList(
							[]*ast.Node{},
						),
						factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
					),
					factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
					factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
					factory.NewTypeReferenceNode(factory.NewIdentifier("d"), nil /*typeArguments*/),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = (() => a) extends b ? c : d;")
}

func TestParenthesizeConditionalType2(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewConditionalTypeNode(
					factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
					// will be parenthesized on emit:
					factory.NewConditionalTypeNode(
						factory.NewTypeReferenceNode(factory.NewIdentifier("b"), nil /*typeArguments*/),
						factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
						factory.NewTypeReferenceNode(factory.NewIdentifier("d"), nil /*typeArguments*/),
						factory.NewTypeReferenceNode(factory.NewIdentifier("e"), nil /*typeArguments*/),
					),
					factory.NewTypeReferenceNode(factory.NewIdentifier("f"), nil /*typeArguments*/),
					factory.NewTypeReferenceNode(factory.NewIdentifier("g"), nil /*typeArguments*/),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = a extends (b extends c ? d : e) ? f : g;")
}

func TestParenthesizeConditionalType3(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList(
		[]*ast.Node{
			factory.NewTypeAliasDeclaration(
				nil,                        /*modifiers*/
				factory.NewIdentifier("_"), /*name*/
				nil,                        /*typeParameters*/
				factory.NewConditionalTypeNode(
					factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
					factory.NewFunctionTypeNode(
						nil, /*typeParameters*/
						factory.NewNodeList(
							[]*ast.Node{},
						),
						// will be parenthesized on emit:
						factory.NewInferTypeNode(
							factory.NewTypeParameterDeclaration(
								nil,
								factory.NewIdentifier("b"),
								factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
								nil, /*defaultType*/
							),
						),
					),
					factory.NewTypeReferenceNode(factory.NewIdentifier("d"), nil /*typeArguments*/),
					factory.NewTypeReferenceNode(factory.NewIdentifier("e"), nil /*typeArguments*/),
				),
			),
		},
	))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = a extends () => (infer b extends c) ? d : e;")
}

func TestParenthesizeConditionalType4(t *testing.T) {
	t.Parallel()

	var factory ast.NodeFactory
	file := factory.NewSourceFile("", "/file.ts", "/file.ts", factory.NewNodeList([]*ast.Node{
		factory.NewTypeAliasDeclaration(
			nil,                        /*modifiers*/
			factory.NewIdentifier("_"), /*name*/
			nil,                        /*typeParameters*/
			factory.NewConditionalTypeNode(
				factory.NewTypeReferenceNode(factory.NewIdentifier("a"), nil /*typeArguments*/),
				factory.NewFunctionTypeNode(
					nil, /*typeParameters*/
					factory.NewNodeList(
						[]*ast.Node{},
					),
					// will be parenthesized on emit:
					factory.NewUnionTypeNode(
						factory.NewNodeList(
							[]*ast.Node{
								factory.NewInferTypeNode(
									factory.NewTypeParameterDeclaration(
										nil,
										factory.NewIdentifier("b"),
										factory.NewTypeReferenceNode(factory.NewIdentifier("c"), nil /*typeArguments*/),
										nil, /*defaultType*/
									),
								),
								factory.NewTypeReferenceNode(factory.NewIdentifier("d"), nil /*typeArguments*/),
							},
						),
					),
				),
				factory.NewTypeReferenceNode(factory.NewIdentifier("e"), nil /*typeArguments*/),
				factory.NewTypeReferenceNode(factory.NewIdentifier("f"), nil /*typeArguments*/),
			),
		),
	}))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, nil, file.AsSourceFile(), "type _ = a extends () => (infer b extends c) | d ? e : f;")
}

func TestNameGeneration(t *testing.T) {
	t.Parallel()
	ec := printer.NewEmitContext()
	file := ec.Factory.NewSourceFile("", "/file.ts", "/file.ts", ec.Factory.NewNodeList([]*ast.Node{
		ec.Factory.NewVariableStatement(nil, ec.Factory.NewVariableDeclarationList(
			ast.NodeFlagsNone,
			ec.Factory.NewNodeList([]*ast.Node{
				ec.Factory.NewVariableDeclaration(ec.NewTempVariable(printer.AutoGenerateOptions{}), nil, nil, nil),
			}),
		)),
		ec.Factory.NewFunctionDeclaration(
			nil,
			nil,
			ec.Factory.NewIdentifier("f"),
			nil,
			ec.Factory.NewNodeList([]*ast.Node{}),
			nil,
			ec.Factory.NewBlock(ec.Factory.NewNodeList([]*ast.Node{
				ec.Factory.NewVariableStatement(nil, ec.Factory.NewVariableDeclarationList(
					ast.NodeFlagsNone,
					ec.Factory.NewNodeList([]*ast.Node{
						ec.Factory.NewVariableDeclaration(ec.NewTempVariable(printer.AutoGenerateOptions{}), nil, nil, nil),
					}),
				)),
			}), true),
		),
	}))
	ast.SetParentInChildren(file)
	parsetestutil.MarkSyntheticRecursive(file)
	emittestutil.CheckEmit(t, ec, file.AsSourceFile(), "var _a;\nfunction f() {\n    var _a;\n}")
}

func TestNoTrailingCommaAfterTransform(t *testing.T) {
	t.Parallel()

	file := parsetestutil.ParseTypeScript("[a!]", false /*jsx*/)
	emitContext := printer.NewEmitContext()

	var visitor *ast.NodeVisitor
	visitor = emitContext.NewNodeVisitor(func(node *ast.Node) *ast.Node {
		switch node.Kind {
		case ast.KindNonNullExpression:
			node = node.AsNonNullExpression().Expression
		default:
			node = node.VisitEachChild(visitor)
		}
		return node
	})
	file = visitor.VisitSourceFile(file)

	emittestutil.CheckEmit(t, emitContext, file.AsSourceFile(), "[a];")
}

func TestTrailingCommaAfterTransform(t *testing.T) {
	t.Parallel()

	file := parsetestutil.ParseTypeScript("[a!,]", false /*jsx*/)
	emitContext := printer.NewEmitContext()

	var visitor *ast.NodeVisitor
	visitor = emitContext.NewNodeVisitor(func(node *ast.Node) *ast.Node {
		switch node.Kind {
		case ast.KindNonNullExpression:
			node = node.AsNonNullExpression().Expression
		default:
			node = node.VisitEachChild(visitor)
		}
		return node
	})
	file = visitor.VisitSourceFile(file)

	emittestutil.CheckEmit(t, emitContext, file.AsSourceFile(), "[a,];")
}
