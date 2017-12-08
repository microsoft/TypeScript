# Scripts and Modules { #scripts-and-modules }

TypeScript implements support for ECMAScript 2015 modules and supports down-level code generation targeting CommonJS, AMD, and other module systems.

## Programs and Source Files { #programs-and-source-files }

A TypeScript ***program*** consists of one or more source files.

&emsp;&emsp;*SourceFile:*
&emsp;&emsp;&emsp;*ImplementationSourceFile*
&emsp;&emsp;&emsp;*DeclarationSourceFile*

&emsp;&emsp;*ImplementationSourceFile:*
&emsp;&emsp;&emsp;*ImplementationScript*
&emsp;&emsp;&emsp;*ImplementationModule*

&emsp;&emsp;*DeclarationSourceFile:*
&emsp;&emsp;&emsp;*DeclarationScript*
&emsp;&emsp;&emsp;*DeclarationModule*

Source files with extension '.ts' are ***implementation source files*** containing statements and declarations, and source files with extension '.d.ts' are ***declaration source files*** containing declarations only.

Declaration source files are a strict subset of implementation source files and are used to declare the static type information associated with existing JavaScript code in an adjunct manner. They are entirely optional but enable the TypeScript compiler and tools to provide better verification and assistance when integrating existing JavaScript code and libraries in a TypeScript application.

When a TypeScript program is compiled, all of the program's source files are processed together. Statements and declarations in different source files can depend on each other, possibly in a circular fashion. By default, a JavaScript output file is generated for each implementation source file in a compilation, but no output is generated from declaration source files.

### Source Files Dependencies { #source-files-dependencies }

The TypeScript compiler automatically determines a source file's dependencies and includes those dependencies in the program being compiled. The determination is made from "reference comments" and module import declarations as follows:

* A comment of the form /// &lt;reference path="…"/> that occurs before the first token in a source file adds a dependency on the source file specified in the path argument. The path is resolved relative to the directory of the containing source file.
* A module import declaration that specifies a relative module name (section [#module-names]<!--11.3.1-->) resolves the name relative to the directory of the containing source file. If a source file with the resulting path and file extension '.ts' exists, that file is added as a dependency. Otherwise, if a source file with the resulting path and file extension '.d.ts' exists, that file is added as a dependency.
* A module import declaration that specifies a top-level module name (section [#module-names]<!--11.3.1-->) resolves the name in a host dependent manner (typically by resolving the name relative to a module name space root or searching for the name in a series of directories). If a source file with extension '.ts' or '.d.ts' corresponding to the reference is located, that file is added as a dependency.

Any files included as dependencies in turn have their references analyzed in a transitive manner until all dependencies have been determined.

## Scripts { #scripts }

Source files that contain no module import or export declarations are classified as ***scripts***. Scripts form the single ***global namespace*** and entities declared in scripts are in scope everywhere in a program.

&emsp;&emsp;*ImplementationScript:*
&emsp;&emsp;&emsp;*ImplementationScriptElements<sub>opt</sub>*

&emsp;&emsp;*ImplementationScriptElements:*
&emsp;&emsp;&emsp;*ImplementationScriptElement*
&emsp;&emsp;&emsp;*ImplementationScriptElements*&emsp;*ImplementationScriptElement*

&emsp;&emsp;*ImplementationScriptElement:*
&emsp;&emsp;&emsp;*ImplementationElement*
&emsp;&emsp;&emsp;*AmbientModuleDeclaration*

&emsp;&emsp;*ImplementationElement:*
&emsp;&emsp;&emsp;*Statement*
&emsp;&emsp;&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*DeclarationScript:*
&emsp;&emsp;&emsp;*DeclarationScriptElements<sub>opt</sub>*

&emsp;&emsp;*DeclarationScriptElements:*
&emsp;&emsp;&emsp;*DeclarationScriptElement*
&emsp;&emsp;&emsp;*DeclarationScriptElements*&emsp;*DeclarationScriptElement*

&emsp;&emsp;*DeclarationScriptElement:*
&emsp;&emsp;&emsp;*DeclarationElement*
&emsp;&emsp;&emsp;*AmbientModuleDeclaration*

&emsp;&emsp;*DeclarationElement:*
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*

The initialization order of the scripts that make up the global namespace ultimately depends on the order in which the generated JavaScript files are loaded at run-time (which, for example, may be controlled by &lt;script/> tags that reference the generated JavaScript files).

## Modules { #modules }

Source files that contain at least one module import or export declaration are considered separate ***modules***. Non-exported entities declared in a module are in scope only in that module, but exported entities can be imported into other modules using import declarations.

&emsp;&emsp;*ImplementationModule:*
&emsp;&emsp;&emsp;*ImplementationModuleElements<sub>opt</sub>*

&emsp;&emsp;*ImplementationModuleElements:*
&emsp;&emsp;&emsp;*ImplementationModuleElement*
&emsp;&emsp;&emsp;*ImplementationModuleElements*&emsp;*ImplementationModuleElement*

&emsp;&emsp;*ImplementationModuleElement:*
&emsp;&emsp;&emsp;*ImplementationElement*
&emsp;&emsp;&emsp;*ImportDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*
&emsp;&emsp;&emsp;*ImportRequireDeclaration*
&emsp;&emsp;&emsp;*ExportImplementationElement*
&emsp;&emsp;&emsp;*ExportDefaultImplementationElement*
&emsp;&emsp;&emsp;*ExportListDeclaration*
&emsp;&emsp;&emsp;*ExportAssignment*

&emsp;&emsp;*DeclarationModule:*
&emsp;&emsp;&emsp;*DeclarationModuleElements<sub>opt</sub>*

&emsp;&emsp;*DeclarationModuleElements:*
&emsp;&emsp;&emsp;*DeclarationModuleElement*
&emsp;&emsp;&emsp;*DeclarationModuleElements*&emsp;*DeclarationModuleElement*

&emsp;&emsp;*DeclarationModuleElement:*
&emsp;&emsp;&emsp;*DeclarationElement*
&emsp;&emsp;&emsp;*ImportDeclaration*
&emsp;&emsp;&emsp;*ImportAliasDeclaration*
&emsp;&emsp;&emsp;*ExportDeclarationElement*
&emsp;&emsp;&emsp;*ExportDefaultDeclarationElement*
&emsp;&emsp;&emsp;*ExportListDeclaration*
&emsp;&emsp;&emsp;*ExportAssignment*

Initialization order of modules is determined by the module loader being used and is not specified by the TypeScript language. However, it is generally the case that non-circularly dependent modules are automatically loaded and initialized in the correct order.

Modules can additionally be declared using *AmbientModuleDeclarations* in declaration scripts that directly specify the module names as string literals. This is described further in section [#ambient-module-declarations]<!--12.2-->.

Below is an example of two modules written in separate source files:

```TypeScript
// -------- main.ts --------
import { message } from "./log";
message("hello");

// -------- log.ts --------
export function message(s: string) {
    console.log(s);
}
```

The import declaration in the 'main' module references the 'log' module and compiling the 'main.ts' file causes the 'log.ts' file to also be compiled as part of the program.

TypeScript supports multiple patterns of JavaScript code generation for modules:

* CommonJS. This format is used by server frameworks such as node.js.
* AMD (Asynchronous Module Definition). This format is used by asynchronous module loaders such as RequireJS.
* UMD (Universal Module Definition). A variation of the AMD format that allows modules to also be loaded by CommonJS loaders.
* System. This format is used to represent ECMAScript 2015 semantics with high fidelity in down-level environments.

The desired module code generation pattern is selected through a compiler option and does not affect the TypeScript source code. Indeed, it is possible to author modules that can be compiled for use both on the server side (e.g. using node.js) and on the client side (using an AMD compliant loader) with no changes to the TypeScript source code.

### Module Names { #module-names }

Modules are identified and referenced using module names. The following definition is aligned with that provided in the [CommonJS Modules](http://www.commonjs.org/specs/modules/1.0/) 1.0 specification.

* A module name is a string of terms delimited by forward slashes.
* Module names may not have file-name extensions like ".js".
* Module names may be relative or top-level. A module name is relative if the first term is "." or "..".
* Top-level names are resolved off the conceptual module name space root.
* Relative names are resolved relative to the name of the module in which they occur.

For purposes of resolving module references, TypeScript associates a file path with every module. The file path is simply the path of the module's source file without the file extension. For example, a module contained in the source file 'C:\src\lib\io.ts' has the file path 'C:/src/lib/io' and a module contained in the source file 'C:\src\ui\editor.d.ts' has the file path 'C:/src/ui/editor'.

A module name in an import declaration is resolved as follows:

* If the import declaration specifies a relative module name, the name is resolved relative to the directory of the referencing module's file path. The program must contain a module with the resulting file path or otherwise an error occurs. For example, in a module with the file path 'C:/src/ui/main', the module names './editor' and '../lib/io' reference modules with the file paths 'C:/src/ui/editor' and 'C:/src/lib/io'.
* If the import declaration specifies a top-level module name and the program contains an *AmbientModuleDeclaration* (section [#ambient-module-declarations]<!--12.2-->) with a string literal that specifies that exact name, then the import declaration references that ambient module.
* If the import declaration specifies a top-level module name and the program contains no *AmbientModuleDeclaration* (section [#ambient-module-declarations]<!--12.2-->) with a string literal that specifies that exact name, the name is resolved in a host dependent manner (for example by considering the name relative to a module name space root). If a matching module cannot be found an error occurs.

### Import Declarations { #import-declarations }

Import declarations are used to import entities from other modules and provide bindings for them in the current module.

An import declaration of the form

```TypeScript
import * as m from "mod";
```

imports the module with the given name and creates a local binding for the module itself. The local binding is classified as a value (representing the module instance) and a namespace (representing a container of types and namespaces).

An import declaration of the form

```TypeScript
import { x, y, z } from "mod";
```

imports a given module and creates local bindings for a specified list of exported members of the module. The specified names must each reference an entity in the export member set ([#export-member-set]<!--11.3.4.4-->) of the given module. The local bindings have the same names and classifications as the entities they represent unless `as` clauses are used to that specify different local names:

```TypeScript
import { x as a, y as b } from "mod";
```

An import declaration of the form

```TypeScript
import d from "mod";
```

is exactly equivalent to the import declaration

```TypeScript
import { default as d } from "mod";
```

An import declaration of the form

```TypeScript
import "mod";
```

imports the given module without creating any local bindings (this is useful only if the imported module has side effects).

### Import Require Declarations { #import-require-declarations }

Import require declarations exist for backward compatibility with earlier versions of TypeScript.

&emsp;&emsp;*ImportRequireDeclaration:*
&emsp;&emsp;&emsp;`import`&emsp;*BindingIdentifier*&emsp;`=`&emsp;`require`&emsp;`(`&emsp;*StringLiteral*&emsp;`)`&emsp;`;`

An import require declaration introduces a local identifier that references a given module. The string literal specified in an import require declaration is interpreted as a module name (section [#module-names]<!--11.3.1-->). The local identifier introduced by the declaration becomes an alias for, and is classified exactly like, the entity exported from the referenced module. Specifically, if the referenced module contains no export assignment the identifier is classified as a value and a namespace, and if the referenced module contains an export assignment the identifier is classified exactly like the entity named in the export assignment.

An import require declaration of the form

```TypeScript
import m = require("mod");
```

is equivalent to the ECMAScript 2015 import declaration

```TypeScript
import * as m from "mod";
```

provided the referenced module contains no export assignment.

### Export Declarations { #export-declarations }

An export declaration declares one or more exported module members. The exported members of a module can be imported in other modules using import declarations ([#import-declarations]<!--11.3.2-->).

#### Export Modifiers { #export-modifiers }

In the body of a module, a declaration can export the declared entity by including an `export` modifier.

&emsp;&emsp;*ExportImplementationElement:*
&emsp;&emsp;&emsp;`export`&emsp;*VariableStatement*
&emsp;&emsp;&emsp;`export`&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*NamespaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ImportAliasDeclaration*

&emsp;&emsp;*ExportDeclarationElement:*
&emsp;&emsp;&emsp;`export`&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*AmbientDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;*ImportAliasDeclaration*

In addition to introducing a name in the local declaration space of the module, an exported declaration introduces the same name with the same classification in the module's export declaration space. For example, the declaration

```TypeScript
export function point(x: number, y: number) {
    return { x, y };
}
```

introduces a local name `point` and an exported name `point` that both reference the function.

#### Export Default Declarations { #export-default-declarations }

Export default declarations provide short-hand syntax for exporting an entity named `default`.

&emsp;&emsp;*ExportDefaultImplementationElement:*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*AssignmentExpression*&emsp;`;`

&emsp;&emsp;*ExportDefaultDeclarationElement:*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*AmbientFunctionDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*AmbientClassDeclaration*
&emsp;&emsp;&emsp;`export`&emsp;`default`&emsp;*IdentifierReference*&emsp;`;`

An *ExportDefaultImplementationElement* or *ExportDefaultDeclarationElement* for a function, generator, or class introduces a value named `default`, and in the case of a class, a type named `default`, in the containing module's export declaration space. The declaration may optionally specify a local name for the exported function, generator, or class. For example, the declaration

```TypeScript
export default function point(x: number, y: number) {
    return { x, y };
}
```

introduces a local name `point` and an exported name `default` that both reference the function. The declaration is effectively equivalent to

```TypeScript
function point(x: number, y: number) {
    return { x, y };
}

export default point;
```

which again is equivalent to

```TypeScript
function point(x: number, y: number) {
    return { x, y };
}

export { point as default };
```

An *ExportDefaultImplementationElement* or *ExportDefaultDeclarationElement* for an expression consisting of a single identifier must name an entity declared in the current module or the global namespace. The declaration introduces an entity named `default`, with the same classification as the referenced entity, in the containing module's export declaration space. For example, the declarations

```TypeScript
interface Point {
    x: number;
    y: number;
}

function Point(x: number, y: number): Point {
    return { x, y };
}

export default Point;
```

introduce a local name `Point` and an exported name `default`, both with a value and a type meaning.

An *ExportDefaultImplementationElement* for any expression but a single identifier introduces a value named `default` in the containing module's export declaration space. For example, the declaration

```TypeScript
export default "hello";
```

introduces an exported value named `default` of type string.

#### Export List Declarations { #export-list-declarations }

An export list declaration exports one or more entities from the current module or a specified module.

&emsp;&emsp;*ExportListDeclaration:*
&emsp;&emsp;&emsp;`export`&emsp;`*`&emsp;*FromClause*&emsp;`;`
&emsp;&emsp;&emsp;`export`&emsp;*ExportClause*&emsp;*FromClause*&emsp;`;`
&emsp;&emsp;&emsp;`export`&emsp;*ExportClause*&emsp;`;`

An *ExportListDeclaration* without a *FromClause* exports entities from the current module. In a declaration of the form

```TypeScript
export { x };
```

the name `x` must reference an entity declared in the current module or the global namespace, and the declaration introduces an entity with the same name and meaning in the containing module's export declaration space.

An *ExportListDeclaration* with a *FromClause* re-exports entities from a specified module. In a declaration of the form

```TypeScript
export { x } from "mod";
```

the name `x` must reference an entity in the export member set of the specified module, and the declaration introduces an entity with the same name and meaning in the containing module's export declaration space. No local bindings are created for `x`.

The *ExportClause* of an *ExportListDeclaration* can specify multiple entities and may optionally specify different names to be used for the exported entities. For example, the declaration

```TypeScript
export { x, y as b, z as c };
```

introduces entities named `x`, `b`, and `c` in the containing module's export declaration space with the same meaning as the local entities named `x`, `y`, and `z` respectively.

An *ExportListDeclaration* that specifies `*` instead of an *ExportClause* is called an ***export star*** declaration. An export star declaration re-exports all members of a specified module.

```TypeScript
export * from "mod";
```

Explicitly exported members take precedence over members re-exported using export star declarations, as described in the following section.

#### Export Member Set { #export-member-set }

The ***export member set*** of a particular module is determined by starting with an empty set of members *E* and an empty set of processed modules *P*, and then processing the module as described below to form the full set of exported members in *E*. Processing a module *M* consists of these steps:

* Add *M* to *P*.
* Add to *E* each member in the export declaration space of *M* with a name that isn't already in *E*.
* For each export star declaration in *M*, in order of declaration, process the referenced module if it is not already in *P*.

A module's ***instance type*** is an object type with a property for each member in the module's export member set that denotes a value.

If a module contains an export assignment it is an error for the module to also contain export declarations. The two types of exports are mutually exclusive.

### Export Assignments { #export-assignments }

Export assignments exist for backward compatibility with earlier versions of TypeScript. An export assignment designates a module member as the entity to be exported in place of the module itself.

&emsp;&emsp;*ExportAssignment:*
&emsp;&emsp;&emsp;`export`&emsp;`=`&emsp;*IdentifierReference*&emsp;`;`

A module containing an export assignment can be imported using an import require declaration ([#import-require-declarations]<!--11.3.3-->), and the local alias introduced by the import require declaration then takes on all meanings of the identifier named in the export assignment.

A module containing an export assignment can also be imported using a regular import declaration ([#import-declarations]<!--11.3.2-->) provided the entity referenced in the export assignment is declared as a namespace or as a variable with a type annotation.

Assume the following example resides in the file 'point.ts':

```TypeScript
export = Point;

class Point {
    constructor(public x: number, public y: number) { }
    static origin = new Point(0, 0);
}
```

When 'point.ts' is imported in another module, the import alias references the exported class and can be used both as a type and as a constructor function:

```TypeScript
import Pt = require("./point");

var p1 = new Pt(10, 20);
var p2 = Pt.origin;
```

Note that there is no requirement that the import alias use the same name as the exported entity.

### CommonJS Modules { #commonjs-modules }

The [CommonJS Modules](http://www.commonjs.org/specs/modules/1.0/) definition specifies a methodology for writing JavaScript modules with implied privacy, the ability to import other modules, and the ability to explicitly export members. A CommonJS compliant system provides a 'require' function that can be used to synchronously load other modules to obtain their singleton module instance, as well as an 'exports' variable to which a module can add properties to define its external API.

The 'main' and 'log' example from section [#modules]<!--11.3--> above generates the following JavaScript code when compiled for the CommonJS Modules pattern:

File main.js:

```TypeScript
var log_1 = require("./log");
log_1.message("hello");
```

File log.js:

```TypeScript
function message(s) {
    console.log(s);
}
exports.message = message;
```

A module import declaration is represented in the generated JavaScript as a variable initialized by a call to the 'require' function provided by the module system host. A variable declaration and 'require' call is emitted for a particular imported module only if the imported module, or a local alias (section [#import-alias-declarations]<!--10.3-->) that references the imported module, is referenced as a *PrimaryExpression* somewhere in the body of the importing module. If an imported module is referenced only as a *NamespaceName* or *TypeQueryExpression*, nothing is emitted.

An example:

File geometry.ts:

```TypeScript
export interface Point { x: number; y: number };

export function point(x: number, y: number): Point {
    return { x, y };
}
```

File game.ts:

```TypeScript
import * as g from "./geometry";
let p = g.point(10, 20);
```

The 'game' module references the imported 'geometry' module in an expression (through its alias 'g') and a 'require' call is therefore included in the emitted JavaScript:

```TypeScript
var g = require("./geometry");
var p = g.point(10, 20);
```

Had the 'game' module instead been written to only reference 'geometry' in a type position

```TypeScript
import * as g from "./geometry";
let p: g.Point = { x: 10, y: 20 };
```

the emitted JavaScript would have no dependency on the 'geometry' module and would simply be

```TypeScript
var p = { x: 10, y: 20 };
```

### AMD Modules { #amd-modules }

The [Asynchronous Module Definition](https://github.com/amdjs/amdjs-api/wiki/AMD) (AMD) specification extends the CommonJS Modules specification with a pattern for authoring asynchronously loadable modules with associated dependencies. Using the AMD pattern, modules are emitted as calls to a global 'define' function taking an array of dependencies, specified as module names, and a callback function containing the module body. The global 'define' function is provided by including an AMD compliant loader in the application. The loader arranges to asynchronously load the module's dependencies and, upon completion, calls the callback function passing resolved module instances as arguments in the order they were listed in the dependency array.

The "main" and "log" example from above generates the following JavaScript code when compiled for the AMD pattern.

File main.js:

```TypeScript
define(["require", "exports", "./log"], function(require, exports, log_1) {
    log_1.message("hello");
}
```

File log.js:

```TypeScript
define(["require", "exports"], function(require, exports) {
    function message(s) {
        console.log(s);
    }
    exports.message = message;
}
```

The special 'require' and 'exports' dependencies are always present. Additional entries are added to the dependencies array and the parameter list as required to represent imported modules. Similar to the code generation for CommonJS Modules, a dependency entry is generated for a particular imported module only if the imported module is referenced as a *PrimaryExpression* somewhere in the body of the importing module. If an imported module is referenced only as a *NamespaceName*, no dependency is generated for that module.

<br/>

