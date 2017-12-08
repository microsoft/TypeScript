# Basic Concepts { #basic-concepts }

The remainder of this document is the formal specification of the TypeScript programming language and is intended to be read as an adjunct to the [ECMAScript 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/) (specifically, the ECMA-262 Standard, 6th Edition). This document describes the syntactic grammar added by TypeScript along with the compile-time processing and type checking performed by the TypeScript compiler, but it only minimally discusses the run-time behavior of programs since that is covered by the ECMAScript specification.

## Grammar Conventions { #grammar-conventions }

The syntactic grammar added by TypeScript language is specified throughout this document using the existing conventions and production names of the ECMAScript grammar. In places where TypeScript augments an existing grammar production it is so noted. For example:

&emsp;&emsp;*Declaration:*  *( Modified )*
&emsp;&emsp;&emsp;…
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*

The '*( Modified )*' annotation indicates that an existing grammar production is being replaced, and the '…' references the contents of the original grammar production.

Similar to the ECMAScript grammar, if the phrase "*[no LineTerminator here]*" appears in the right-hand side of a production of the syntactic grammar, it indicates that the production is not a match if a *LineTerminator* occurs in the input stream at the indicated position.

## Names { #names }

A core purpose of the TypeScript compiler is to track the named entities in a program and validate that they are used according to their designated meaning. Names in TypeScript can be written in several ways, depending on context. Specifically, a name can be written as

* an *IdentifierName*,
* a *StringLiteral* in a property name,
* a *NumericLiteral* in a property name, or
* a *ComputedPropertyName* that denotes a well-known symbol ([#computed-property-names]<!--2.2.3-->).

Most commonly, names are written to conform with the *Identifier* production, which is any *IdentifierName* that isn't a reserved word.

### Reserved Words { #reserved-words }

The following keywords are reserved and cannot be used as an *Identifier*:

```TypeScript
break             case              catch             class
const             continue          debugger          default
delete            do                else              enum
export            extends           false             finally
for               function          if                import
in                instanceof        new               null
return            super             switch            this
throw             true              try               typeof
var               void              while             with
```

The following keywords cannot be used as identifiers in strict mode code, but are otherwise not restricted:

```TypeScript
implements        interface         let               package
private           protected         public            static
yield
```

The following keywords cannot be used as user defined type names, but are otherwise not restricted:

```TypeScript
any               boolean           number            string
symbol
```

The following keywords have special meaning in certain contexts, but are valid identifiers:

```TypeScript
abstract          as                async             await
constructor       declare           from              get
is                module            namespace         of
require           set               type
```

### Property Names { #property-names }

The *PropertyName* production from the ECMAScript grammar is reproduced below:

&emsp;&emsp;*PropertyName:*
&emsp;&emsp;&emsp;*LiteralPropertyName*
&emsp;&emsp;&emsp;*ComputedPropertyName*

&emsp;&emsp;*LiteralPropertyName:*
&emsp;&emsp;&emsp;*IdentifierName*
&emsp;&emsp;&emsp;*StringLiteral*
&emsp;&emsp;&emsp;*NumericLiteral*

&emsp;&emsp;*ComputedPropertyName:*
&emsp;&emsp;&emsp;`[`&emsp;*AssignmentExpression*&emsp;`]`

A property name can be any identifier (including a reserved word), a string literal, a numeric literal, or a computed property name. String literals may be used to give properties names that are not valid identifiers, such as names containing blanks. Numeric literal property names are equivalent to string literal property names with the string representation of the numeric literal, as defined in the ECMAScript specification.

### Computed Property Names { #computed-property-names }

ECMAScript 2015 permits object literals and classes to declare members with computed property names. A computed property name specifies an expression that computes the actual property name at run-time. Because the final property name isn't known at compile-time, TypeScript can only perform limited checks for entities declared with computed property names. However, a subset of computed property names known as ***well-known symbols*** can be used anywhere a *PropertyName* is expected, including property names within types. A computed property name is a well-known symbol if it is of the form

```TypeScript
[ Symbol . xxx ]
```

In a well-known symbol, the identifier to the right of the dot must denote a property of the primitive type `symbol` in the type of the global variable 'Symbol', or otherwise an error occurs.

In a *PropertyName* that specifies a *ComputedPropertyName*, the computed property name is required to denote a well-known symbol unless the property name occurs in a property assignment of an object literal ([#object-literals]<!--4.5-->) or a property member declaration in a non-ambient class ([#property-member-declarations]<!--8.4-->).

Below is an example of an interface that declares a property with a well-known symbol name:

```TypeScript
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
```

*TODO: Update to reflect treatment of [computed property names with literal expressions](https://github.com/Microsoft/TypeScript/pull/5535)*.

## Declarations { #declarations }

Declarations introduce names in their associated ***declaration spaces***. A name must be unique in its declaration space and can denote a ***value***, a ***type***, or a ***namespace***, or some combination thereof. Effectively, a single name can have as many as three distinct meanings. For example:

```TypeScript
var X: string;    // Value named X

type X = number;  // Type named X

namespace X {     // Namespace named X
    type Y = string;
}
```

A name that denotes a value has an associated type (section [#types]<!--3-->) and can be referenced in expressions (section [#identifiers]<!--4.3-->). A name that denotes a type can be used by itself in a type reference or on the right hand side of a dot in a type reference ([#type-references]<!--3.8.2-->). A name that denotes a namespace can be used one the left hand side of a dot in a type reference.

When a name with multiple meanings is referenced, the context in which the reference occurs determines the meaning. For example:

```TypeScript
var n: X;        // X references type
var s: X.Y = X;  // First X references namespace, second X references value
```

In the first line, X references the type X because it occurs in a type position. In the second line, the first X references the namespace X because it occurs before a dot in a type name, and the second X references the variable X because it occurs in an expression.

Declarations introduce the following meanings for the name they declare:

* A variable, parameter, function, generator, member variable, member function, member accessor, or enum member declaration introduces a value meaning.
* An interface, type alias, or type parameter declaration introduces a type meaning.
* A class declaration introduces a value meaning (the constructor function) and a type meaning (the class type).
* An enum declaration introduces a value meaning (the enum instance) and a type meaning (the enum type).
* A namespace declaration introduces a namespace meaning (the type and namespace container) and, if the namespace is instantiated (section [#namespace-declarations]<!--10.1-->), a value meaning (the namespace instance).
* An import or export declaration introduces the meaning(s) of the imported or exported entity.

Below are some examples of declarations that introduce multiple meanings for a name:

```TypeScript
class C {      // Value and type named C
    x: string;
}

namespace N {  // Value and namespace named N
    export var x: string;
}
```

Declaration spaces exist as follows:

* The global namespace, each module, and each declared namespace has a declaration space for its contained entities (whether local or exported).
* Each module has a declaration space for its exported entities. All export declarations in the module contribute to this declaration space.
* Each declared namespace has a declaration space for its exported entities. All export declarations in the namespace contribute to this declaration space. A declared namespace’s declaration space is shared with other declared namespaces that have the same root container and the same qualified name starting from that root container.
* Each class declaration has a declaration space for instance members and type parameters, and a declaration space for static members.
* Each interface declaration has a declaration space for members and type parameters. An interface's declaration space is shared with other interfaces that have the same root container and the same qualified name starting from that root container.
* Each enum declaration has a declaration space for its enum members. An enum's declaration space is shared with other enums that have the same root container and the same qualified name starting from that root container.
* Each type alias declaration has a declaration space for its type parameters.
* Each function-like declaration (including function declarations, constructor declarations, member function declarations, member accessor declarations, function expressions, and arrow functions) has a declaration space for locals and type parameters. This declaration space includes parameter declarations, all local var and function declarations, and local let, const, class, interface, type alias, and enum declarations that occur immediately within the function body and are not further nested in blocks.
* Each statement block has a declaration space for local let, const, class, interface, type alias, and enum declarations that occur immediately within that block.
* Each object literal has a declaration space for its properties.
* Each object type literal has a declaration space for its members.

Top-level declarations in a source file with no top-level import or export declarations belong to the ***global namespace***. Top-level declarations in a source file with one or more top-level import or export declarations belong to the ***module*** represented by that source file.

The ***container*** of an entity is defined as follows:

* The container of an entity declared in a namespace declaration is that namespace declaration.
* The container of an entity declared in a module is that module.
* The container of an entity declared in the global namespace is the global namespace.
* The container of a module is the global namespace.

The ***root container*** of an entity is defined as follows:

* The root container of a non-exported entity is the entity’s container.
* The root container of an exported entity is the root container of the entity's container.

Intuitively, the root container of an entity is the outermost module or namespace body from within which the entity is reachable.

Interfaces, enums, and namespaces are "open ended," meaning that interface, enum, and namespace declarations with the same qualified name relative to a common root are automatically merged. For further details, see sections [#declaration-merging]<!--7.2-->, [#declaration-merging]<!--9.3-->, and [#declaration-merging]<!--10.5-->.

Instance and static members in a class are in separate declaration spaces. Thus the following is permitted:

```TypeScript
class C {
    x: number;          // Instance member
    static x: string;   // Static member
}
```

## Scopes { #scopes }

The ***scope*** of a name is the region of program text within which it is possible to refer to the entity declared by that name without qualification of the name. The scope of a name depends on the context in which the name is declared. The contexts are listed below in order from outermost to innermost:

* The scope of a name declared in the global namespace is the entire program text.
* The scope of a name declared in a module is the source file of that module.
* The scope of an exported name declared within a namespace declaration is the body of that namespace declaration and every namespace declaration with the same root and the same qualified name relative to that root.
* The scope of a non-exported name declared within a namespace declaration is the body of that namespace declaration.
* The scope of a type parameter name declared in a class or interface declaration is that entire declaration, including constraints, extends clause, implements clause, and declaration body, but not including static member declarations.
* The scope of a type parameter name declared in a type alias declaration is that entire type alias declaration.
* The scope of a member name declared in an enum declaration is the body of that declaration and every enum declaration with the same root and the same qualified name relative to that root.
* The scope of a type parameter name declared in a call or construct signature is that entire signature declaration, including constraints, parameter list, and return type. If the signature is part of a function implementation, the scope includes the function body.
* The scope of a parameter name declared in a call or construct signature is the remainder of the signature declaration. If the signature is part of a function-like declaration with a body (including a function declaration, constructor declaration, member function declaration, member accessor declaration, function expression, or arrow function), the scope includes the body of that function-like declaration.
* The scope of a local var or function name declared anywhere in the body of a function-like declaration is the body of that function-like declaration.
* The scope of a local let, const, class, interface, type alias, or enum declaration declared immediately within the body of a function-like declaration is the body of that function-like declaration.
* The scope of a local let, const, class, interface, type alias, or enum declaration declared immediately within a statement block is the body of that statement block.

Scopes may overlap, for example through nesting of namespaces and functions. When the scopes of two names overlap, the name with the innermost declaration takes precedence and access to the outer name is either not possible or only possible by qualification.

When an identifier is resolved as a *PrimaryExpression* (section [#identifiers]<!--4.3-->), only names in scope with a value meaning are considered and other names are ignored.

When an identifier is resolved as a *TypeName* (section [#type-references]<!--3.8.2-->), only names in scope with a type meaning are considered and other names are ignored.

When an identifier is resolved as a *NamespaceName* (section [#type-references]<!--3.8.2-->), only names in scope with a namespace meaning are considered and other names are ignored.

*TODO: [Include specific rules for alias resolution](https://github.com/Microsoft/TypeScript/issues/3158)*.

Note that class and interface members are never directly in scope—they can only be accessed by applying the dot ('.') operator to a class or interface instance. This even includes members of the current instance in a constructor or member function, which are accessed by applying the dot operator to `this`.

As the rules above imply, locally declared entities in a namespace are closer in scope than exported entities declared in other namespace declarations for the same namespace. For example:

```TypeScript
var x = 1;
namespace M {
    export var x = 2;
    console.log(x);     // 2
}
namespace M {
    console.log(x);     // 2
}
namespace M {
    var x = 3;
    console.log(x);     // 3
}
```

<br/>

