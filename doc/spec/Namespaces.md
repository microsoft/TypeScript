# Namespaces { #namespaces }

Namespaces provide a mechanism for organizing code and declarations in hierarchies of named containers. Namespaces have named members that each denote a value, a type, or a namespace, or some combination thereof, and those members may be local or exported. The body of a namespace corresponds to a function that is executed once, thereby providing a mechanism for maintaining local state with assured isolation. Namespaces can be thought of as a formalization of the [immediately-invoked function expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE) pattern.

## Namespace Declarations { #namespace-declarations }

A namespace declaration introduces a name with a namespace meaning and, in the case of an instantiated namespace, a value meaning in the containing declaration space.

&emsp;&emsp;*NamespaceDeclaration:*
&emsp;&emsp;&emsp;`namespace`&emsp;*IdentifierPath*&emsp;`{`&emsp;*NamespaceBody*&emsp;`}`

&emsp;&emsp;*IdentifierPath:*
&emsp;&emsp;&emsp;*BindingIdentifier*
&emsp;&emsp;&emsp;*IdentifierPath*&emsp;`.`&emsp;*BindingIdentifier*

Namespaces are declared using the `namespace` keyword, but for backward compatibility of earlier versions of TypeScript a `module` keyword can also be used.

Namespaces are either ***instantiated*** or ***non-instantiated***. A non-instantiated namespace is a namespace containing only interface types, type aliases, and other non-instantiated namespace. An instantiated namespace is a namespace that doesn't meet this definition. In intuitive terms, an instantiated namespace is one for which a namespace instance is created, whereas a non-instantiated namespace is one for which no code is generated.

When a namespace identifier is referenced as a *NamespaceName* (section [#type-references]<!--3.8.2-->) it denotes a container of namespace and type names, and when a namespace identifier is referenced as a *PrimaryExpression* (section [#identifiers]<!--4.3-->) it denotes the singleton namespace instance. For example:

```TypeScript
namespace M {
    export interface P { x: number; y: number; }
    export var a = 1;
}

var p: M.P;             // M used as NamespaceName
var m = M;              // M used as PrimaryExpression
var x1 = M.a;           // M used as PrimaryExpression
var x2 = m.a;           // Same as M.a
var q: m.P;             // Error
```

Above, when 'M' is used as a *PrimaryExpression* it denotes an object instance with a single member 'a' and when 'M' is used as a *NamespaceName* it denotes a container with a single type member 'P'. The final line in the example is an error because 'm' is a variable which cannot be referenced in a type name.

If the declaration of 'M' above had excluded the exported variable 'a', 'M' would be a non-instantiated namespace and it would be an error to reference 'M' as a *PrimaryExpression*.

A namespace declaration that specifies an *IdentifierPath* with more than one identifier is equivalent to a series of nested single-identifier namespace declarations where all but the outermost are automatically exported. For example:

```TypeScript
namespace A.B.C {
    export var x = 1;
}
```

corresponds to

```TypeScript
namespace A {
    export namespace B {
        export namespace C {
            export var x = 1;
        }
    }
}
```

The hierarchy formed by namespace and named type names partially mirrors that formed by namespace instances and members. The example

```TypeScript
namespace A {
    export namespace B {
        export class C { }
    }
}
```

introduces a named type with the qualified name 'A.B.C' and also introduces a constructor function that can be accessed using the expression 'A.B.C'. Thus, in the example

```TypeScript
var c: A.B.C = new A.B.C();
```

the two occurrences of 'A.B.C' in fact refer to different entities. It is the context of the occurrences that determines whether 'A.B.C' is processed as a type name or an expression.

## Namespace Body { #namespace-body }

The body of a namespace corresponds to a function that is executed once to initialize the namespace instance.

&emsp;&emsp;*NamespaceBody:*
&emsp;&emsp;&emsp;*NamespaceElements<sub>opt</sub>*

&emsp;&emsp;*NamespaceElements:*
&emsp;&emsp;&emsp;*NamespaceElement*
&emsp;&emsp;&emsp;*NamespaceElements*&emsp;*NamespaceElement*

&emsp;&emsp;*NamespaceElement:*
&emsp;&emsp;&emsp;*Statement*
&emsp;&emsp;&emsp;*LexicalDeclaration*
&emsp;&emsp;&emsp;*FunctionDeclaration*
&emsp;&emsp;&emsp;*GeneratorDeclaration*
&emsp;&emsp;&emsp;*ClassDeclaration*
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*
&emsp;&emsp;&emsp;*NamespaceDeclaration
&emsp;&emsp;&emsp;AmbientDeclaration
&emsp;&emsp;&emsp;ImportAliasDeclaration
&emsp;&emsp;&emsp;ExportNamespaceElement*

&emsp;&emsp;*ExportNamespaceElement:*
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

## Import Alias Declarations { #import-alias-declarations }

Import alias declarations are used to create local aliases for entities in other namespaces.

&emsp;&emsp;*ImportAliasDeclaration:*
&emsp;&emsp;&emsp;`import`&emsp;*BindingIdentifier*&emsp;`=`&emsp;*EntityName*&emsp;`;`

&emsp;&emsp;*EntityName:*
&emsp;&emsp;&emsp;*NamespaceName*
&emsp;&emsp;&emsp;*NamespaceName*&emsp;`.`&emsp;*IdentifierReference*

An *EntityName* consisting of a single identifier is resolved as a *NamespaceName* and is thus required to reference a namespace. The resulting local alias references the given namespace and is itself classified as a namespace.

An *EntityName* consisting of more than one identifier is resolved as a *NamespaceName* followed by an identifier that names an exported entity in the given namespace. The resulting local alias has all the meanings of the referenced entity. (As many as three distinct meanings are possible for an entity name—value, type, and namespace.) In effect, it is as if the imported entity was declared locally with the local alias name.

In the example

```TypeScript
namespace A {
    export interface X { s: string }
    export var X: X;
}

namespace B {
    interface A { n: number }
    import Y = A;    // Alias for namespace A
    import Z = A.X;  // Alias for type and value A.X
    var v: Z = Z;
}
```

within 'B', 'Y' is an alias only for namespace 'A' and not the local interface 'A', whereas 'Z' is an alias for all exported meanings of 'A.X', thus denoting both an interface type and a variable.

If the *NamespaceName* portion of an *EntityName* references an instantiated namespace, the *NamespaceName* is required to reference the namespace instance when evaluated as an expression. In the example

```TypeScript
namespace A {
    export interface X { s: string }
}

namespace B {
    var A = 1;
    import Y = A;
}
```

'Y' is a local alias for the non-instantiated namespace 'A'. If the declaration of 'A' is changed such that 'A' becomes an instantiated namespace, for example by including a variable declaration in 'A', the import statement in 'B' above would be an error because the expression 'A' doesn't reference the namespace instance of namespace 'A'.

When an import statement includes an export modifier, all meanings of the local alias are exported.

## Export Declarations { #export-declarations }

An export declaration declares an externally accessible namespace member. An export declaration is simply a regular declaration prefixed with the keyword `export`.

The members of a namespace's export declaration space (section [#declarations]<!--2.3-->) constitute the namespace's ***export member set***. A namespace's ***instance type*** is an object type with a property for each member in the namespace's export member set that denotes a value.

An exported member depends on a (possibly empty) set of named types (section [#named-types]<!--3.7-->). Those named types must be at least as accessible as the exported member, or otherwise an error occurs.

The named types upon which a member depends are the named types occurring in the transitive closure of the ***directly depends on*** relationship defined as follows:

* A variable directly depends on the *Type* specified in its type annotation.
* A function directly depends on each *Type* specified in a parameter or return type annotation.
* A class directly depends on each *Type* specified as a type parameter constraint, each *TypeReference* specified as a base class or implemented interface, and each *Type* specified in a constructor parameter type annotation, public member variable type annotation, public member function parameter or return type annotation, public member accessor parameter or return type annotation, or index signature type annotation.
* An interface directly depends on each *Type* specified as a type parameter constraint, each *TypeReference* specified as a base interface, and the *ObjectType* specified as its body.
* A namespace directly depends on its exported members.
* A *Type* or *ObjectType* directly depends on every *TypeReference* that occurs within the type at any level of nesting.
* A *TypeReference* directly depends on the type it references and on each *Type* specified as a type argument.

A named type *T* having a root namespace *R* (section [#declarations]<!--2.3-->) is said to be ***at least as accessible as*** a member *M* if

* *R* is the global namespace or a module, or
* *R* is a namespace in the parent namespace chain of *M*.

In the example

```TypeScript
interface A { x: string; }

namespace M {
    export interface B { x: A; }
    export interface C { x: B; }
    export function foo(c: C) { … }
}
```

the 'foo' function depends upon the named types 'A', 'B', and 'C'. In order to export 'foo' it is necessary to also export 'B' and 'C' as they otherwise would not be at least as accessible as 'foo'. The 'A' interface is already at least as accessible as 'foo' because I t is declared in a parent namespace of foo's namespace.

## Declaration Merging { #declaration-merging }

Namespaces are "open-ended" and namespace declarations with the same qualified name relative to a common root (as defined in section [#declarations]<!--2.3-->) contribute to a single namespace. For example, the following two declarations of a namespace 'outer' might be located in separate source files.

File a.ts:

```TypeScript
namespace outer {
    var local = 1;           // Non-exported local variable
    export var a = local;    // outer.a
    export namespace inner {
        export var x = 10;   // outer.inner.x
    }
}
```

File b.ts:

```TypeScript
namespace outer {
    var local = 2;           // Non-exported local variable
    export var b = local;    // outer.b
    export namespace inner {
        export var y = 20;   // outer.inner.y
    }
}
```

Assuming the two source files are part of the same program, the two declarations will have the global namespace as their common root and will therefore contribute to the same namespace instance, the instance type of which will be:

```TypeScript
{
    a: number;
    b: number;
    inner: {
        x: number;
        y: number;
    };
}
```

Declaration merging does not apply to local aliases created by import alias declarations. In other words, it is not possible have an import alias declaration and a namespace declaration for the same name within the same namespace body.

*TODO: Clarify rules for [alias resolution](https://github.com/Microsoft/TypeScript/issues/3158)*.

Declaration merging also extends to namespace declarations with the same qualified name relative to a common root as a function, class, or enum declaration:

* When merging a function and a namespace, the type of the function object is merged with the instance type of the namespace. In effect, the overloads or implementation of the function provide the call signatures and the exported members of the namespace provide the properties of the combined type.
* When merging a class and a namespace, the type of the constructor function object is merged with the instance type of the namespace. In effect, the overloads or implementation of the class constructor provide the construct signatures, and the static members of the class and exported members of the namespace provide the properties of the combined type. It is an error to have static class members and exported namespace members with the same name.
* When merging an enum and a namespace, the type of the enum object is merged with the instance type of the namespace. In effect, the members of the enum and the exported members of the namespace provide the properties of the combined type. It is an error to have enum members and exported namespace members with the same name.

When merging a non-ambient function or class declaration and a non-ambient namespace declaration, the function or class declaration must be located prior to the namespace declaration in the same source file. This ensures that the shared object instance is created as a function object. (While it is possible to add properties to an object after its creation, it is not possible to make an object "callable" after the fact.)

The example

```TypeScript
interface Point {
    x: number;
    y: number;
}

function point(x: number, y: number): Point {
    return { x: x, y: y };
}

namespace point {
    export var origin = point(0, 0);
    export function equals(p1: Point, p2: Point) {
        return p1.x == p2.x && p1.y == p2.y;
    }
}

var p1 = point(0, 0);
var p2 = point.origin;
var b = point.equals(p1, p2);
```

declares 'point' as a function object with two properties, 'origin' and 'equals'. Note that the namespace declaration for 'point' is located after the function declaration.

## Code Generation { #code-generation }

A namespace generates JavaScript code that is equivalent to the following:

```TypeScript
var <NamespaceName>;
(function(<NamespaceName>) {
    <NamespaceStatements>
})(<NamespaceName>||(<NamespaceName>={}));
```

where *NamespaceName* is the name of the namespace and *NamespaceStatements* is the code generated for the statements in the namespace body. The *NamespaceName* function parameter may be prefixed with one or more underscore characters to ensure the name is unique within the function body. Note that the entire namespace is emitted as an anonymous function that is immediately executed. This ensures that local variables are in their own lexical environment isolated from the surrounding context. Also note that the generated function doesn't create and return a namespace instance, but rather it extends the existing instance (which may have just been created in the function call). This ensures that namespaces can extend each other.

An import statement generates code of the form

```TypeScript
var <Alias> = <EntityName>;
```

This code is emitted only if the imported entity is referenced as a *PrimaryExpression* somewhere in the body of the importing namespace. If an imported entity is referenced only as a *TypeName* or *NamespaceName*, nothing is emitted. This ensures that types declared in one namespace can be referenced through an import alias in another namespace with no run-time overhead.

When a variable is exported, all references to the variable in the body of the namespace are replaced with

```TypeScript
<NamespaceName>.<VariableName>
```

This effectively promotes the variable to be a property on the namespace instance and ensures that all references to the variable become references to the property.

When a function, class, enum, or namespace is exported, the code generated for the entity is followed by an assignment statement of the form

```TypeScript
<NamespaceName>.<EntityName> = <EntityName>;
```

This copies a reference to the entity into a property on the namespace instance.

<br/>

