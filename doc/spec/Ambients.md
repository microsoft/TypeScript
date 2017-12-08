# Ambients { #ambients }

Ambient declarations are used to provide static typing over existing JavaScript code. Ambient declarations differ from regular declarations in that no JavaScript code is emitted for them. Instead of introducing new variables, functions, classes, enums, or namespaces, ambient declarations provide type information for entities that exist "ambiently" and are included in a program by external means, for example by referencing a JavaScript library in a &lt;script/> tag.

## Ambient Declarations { #ambients-ambient-declarations }

Ambient declarations are written using the `declare` keyword and can declare variables, functions, classes, enums, namespaces, or modules.

&emsp;&emsp;*AmbientDeclaration:*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientVariableDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientFunctionDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientClassDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientEnumDeclaration*
&emsp;&emsp;&emsp;`declare`&emsp;*AmbientNamespaceDeclaration*

### Ambient Variable Declarations { #ambient-variable-declarations }

An ambient variable declaration introduces a variable in the containing declaration space.

&emsp;&emsp;*AmbientVariableDeclaration:*
&emsp;&emsp;&emsp;`var`&emsp;*AmbientBindingList*&emsp;`;`
&emsp;&emsp;&emsp;`let`&emsp;*AmbientBindingList*&emsp;`;`
&emsp;&emsp;&emsp;`const`&emsp;*AmbientBindingList*&emsp;`;`

&emsp;&emsp;*AmbientBindingList:*
&emsp;&emsp;&emsp;*AmbientBinding*
&emsp;&emsp;&emsp;*AmbientBindingList*&emsp;`,`&emsp;*AmbientBinding*

&emsp;&emsp;*AmbientBinding:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*

An ambient variable declaration may optionally include a type annotation. If no type annotation is present, the variable is assumed to have type Any.

An ambient variable declaration does not permit an initializer expression to be present.

### Ambient Function Declarations { #ambient-function-declarations }

An ambient function declaration introduces a function in the containing declaration space.

&emsp;&emsp;*AmbientFunctionDeclaration:*
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier*&emsp;*CallSignature*&emsp;`;`

Ambient functions may be overloaded by specifying multiple ambient function declarations with the same name, but it is an error to declare multiple overloads that are considered identical (section [#type-and-member-identity]<!--3.11.2-->) or differ only in their return types.

Ambient function declarations cannot specify a function bodies and do not permit default parameter values.

### Ambient Class Declarations { #ambient-class-declarations }

An ambient class declaration declares a class type and a constructor function in the containing declaration space.

&emsp;&emsp;*AmbientClassDeclaration:*
&emsp;&emsp;&emsp;`class`&emsp;*BindingIdentifier*&emsp;*TypeParameters<sub>opt</sub>*&emsp;*ClassHeritage*&emsp;`{`&emsp;*AmbientClassBody*&emsp;`}`

&emsp;&emsp;*AmbientClassBody:*
&emsp;&emsp;&emsp;*AmbientClassBodyElements<sub>opt</sub>*

&emsp;&emsp;*AmbientClassBodyElements:*
&emsp;&emsp;&emsp;*AmbientClassBodyElement*
&emsp;&emsp;&emsp;*AmbientClassBodyElements*&emsp;*AmbientClassBodyElement*

&emsp;&emsp;*AmbientClassBodyElement:*
&emsp;&emsp;&emsp;*AmbientConstructorDeclaration*
&emsp;&emsp;&emsp;*AmbientPropertyMemberDeclaration*
&emsp;&emsp;&emsp;*IndexSignature*

&emsp;&emsp;*AmbientConstructorDeclaration:*
&emsp;&emsp;&emsp;`constructor`&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`;`

&emsp;&emsp;*AmbientPropertyMemberDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;`;`
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`;`

### Ambient Enum Declarations { #ambient-enum-declarations }

An ambient enum is grammatically equivalent to a non-ambient enum declaration.

&emsp;&emsp;*AmbientEnumDeclaration:*
&emsp;&emsp;&emsp;*EnumDeclaration*

Ambient enum declarations differ from non-ambient enum declarations in two ways:

* In ambient enum declarations, all values specified in enum member declarations must be classified as constant enum expressions.
* In ambient enum declarations that specify no `const` modifier, enum member declarations that omit a value are considered computed members (as opposed to having auto-incremented values assigned).

Ambient enum declarations are otherwise processed in the same manner as non-ambient enum declarations.

### Ambient Namespace Declarations { #ambient-namespace-declarations }

An ambient namespace declaration declares a namespace.

&emsp;&emsp;*AmbientNamespaceDeclaration:*
&emsp;&emsp;&emsp;`namespace`&emsp;*IdentifierPath*&emsp;`{`&emsp;*AmbientNamespaceBody*&emsp;`}`

&emsp;&emsp;*AmbientNamespaceBody:*
&emsp;&emsp;&emsp;*AmbientNamespaceElements<sub>opt</sub>*

&emsp;&emsp;*AmbientNamespaceElements:*
&emsp;&emsp;&emsp;*AmbientNamespaceElement*
&emsp;&emsp;&emsp;*AmbientNamespaceElements*&emsp;*AmbientNamespaceElement*

&emsp;&emsp;*AmbientNamespaceElement:*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientVariableDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientLexicalDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientFunctionDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientClassDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientEnumDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*AmbientNamespaceDeclaration*
&emsp;&emsp;&emsp;`export`*<sub>opt</sub>*&emsp;*ImportAliasDeclaration*

Except for *ImportAliasDeclarations*, *AmbientNamespaceElements* always declare exported entities regardless of whether they include the optional `export` modifier.

## Ambient Module Declarations { #ambient-module-declarations }

An *AmbientModuleDeclaration* declares a module. This type of declaration is permitted only at the top level in a source file that contributes to the global namespace (section [#programs-and-source-files]<!--11.1-->). The *StringLiteral* must specify a top-level module name. Relative module names are not permitted.

&emsp;&emsp;*AmbientModuleDeclaration:*
&emsp;&emsp;&emsp;`declare`&emsp;`module`&emsp;*StringLiteral*&emsp;`{`&emsp; *DeclarationModule*&emsp;`}`

An *ImportRequireDeclaration* in an *AmbientModuleDeclaration* may reference other modules only through top-level module names. Relative module names are not permitted.

If an ambient module declaration includes an export assignment, it is an error for any of the declarations within the module to specify an `export` modifier. If an ambient module declaration contains no export assignment, entities declared in the module are exported regardless of whether their declarations include the optional `export` modifier.

Ambient modules are "open-ended" and ambient module declarations with the same string literal name contribute to a single module. For example, the following two declarations of a module 'io' might be located in separate source files.

```TypeScript
declare module "io" {
    export function readFile(filename: string): string;
}

declare module "io" {
    export function writeFile(filename: string, data: string): void;
}
```

This has the same effect as a single combined declaration:

```TypeScript
declare module "io" {
    export function readFile(filename: string): string;
    export function writeFile(filename: string, data: string): void;
}
```

<br/>

