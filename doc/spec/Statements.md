
# Statements { #statements }

This chapter describes the static type checking TypeScript provides for JavaScript statements. TypeScript itself does not introduce any new statement constructs, but it does extend the grammar for local declarations to include interface, type alias, and enum declarations.

## Blocks { #blocks }

Blocks are extended to include local interface, type alias, and enum declarations (classes are already included by the ECMAScript 2015 grammar).

&emsp;&emsp;*Declaration:*  *( Modified )*
&emsp;&emsp;&emsp;…
&emsp;&emsp;&emsp;*InterfaceDeclaration*
&emsp;&emsp;&emsp;*TypeAliasDeclaration*
&emsp;&emsp;&emsp;*EnumDeclaration*

Local class, interface, type alias, and enum declarations are block scoped, similar to let and const declarations.

## Variable Statements { #variable-statements }

Variable statements are extended to include optional type annotations.

&emsp;&emsp;*VariableDeclaration:*  *( Modified )*
&emsp;&emsp;&emsp;*SimpleVariableDeclaration*
&emsp;&emsp;&emsp;*DestructuringVariableDeclaration*

A variable declaration is either a simple variable declaration or a destructuring variable declaration.

### Simple Variable Declarations { #simple-variable-declarations }

A ***simple variable declaration*** introduces a single named variable and optionally assigns it an initial value.

&emsp;&emsp;*SimpleVariableDeclaration:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*

The type *T* of a variable introduced by a simple variable declaration is determined as follows:

* If the declaration includes a type annotation, *T* is that type.
* Otherwise, if the declaration includes an initializer expression, *T* is the widened form (section [#widened-types]<!--3.12-->) of the type of the initializer expression.
* Otherwise, *T* is the Any type.

When a variable declaration specifies both a type annotation and an initializer expression, the type of the initializer expression is required to be assignable to (section [#assignment-compatibility]<!--3.11.4-->) the type given in the type annotation.

Multiple declarations for the same variable name in the same declaration space are permitted, provided that each declaration associates the same type with the variable.

When a variable declaration has a type annotation, it is an error for that type annotation to use the `typeof` operator to reference the variable being declared.

Below are some examples of simple variable declarations and their associated types.

```TypeScript
var a;                          // any
var b: number;                  // number
var c = 1;                      // number
var d = { x: 1, y: "hello" };   // { x: number; y: string; }
var e: any = "test";            // any
```

The following is permitted because all declarations of the single variable 'x' associate the same type (Number) with 'x'.

```TypeScript
var x = 1;
var x: number;
if (x == 1) {
    var x = 2;
}
```

In the following example, all five variables are of the same type, '{ x: number; y: number; }'.

```TypeScript
interface Point { x: number; y: number; }

var a = { x: 0, y: <number> undefined };
var b: Point = { x: 0, y: undefined };
var c = <Point> { x: 0, y: undefined };
var d: { x: number; y: number; } = { x: 0, y: undefined };
var e = <{ x: number; y: number; }> { x: 0, y: undefined };
```

### Destructuring Variable Declarations { #destructuring-variable-declarations }

A ***destructuring variable declaration*** introduces zero or more named variables and initializes them with values extracted from properties of an object or elements of an array.

&emsp;&emsp;*DestructuringVariableDeclaration:*
&emsp;&emsp;&emsp;*BindingPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer*

Each binding property or element that specifies an identifier introduces a variable by that name. The type of the variable is the widened form (section [#widened-types]<!--3.12-->) of the type associated with the binding property or element, as defined in the following.

*TODO: Document destructuring an [iterator](https://github.com/Microsoft/TypeScript/pull/2498) into an array*.

The type *T* associated with a destructuring variable declaration is determined as follows:

* If the declaration includes a type annotation, *T* is that type.
* Otherwise, if the declaration includes an initializer expression, *T* is the type of that initializer expression.
* Otherwise, *T* is the Any type.

The type *T* associated with a binding property is determined as follows:

* Let *S* be the type associated with the immediately containing destructuring variable declaration, binding property, or binding element.
* If *S* is the Any type:
  * If the binding property specifies an initializer expression, *T* is the type of that initializer expression.
  * Otherwise, *T* is the Any type.
* Let *P* be the property name specified in the binding property.
* If *S* has an apparent property with the name *P*, *T* is the type of that property.
* Otherwise, if *S* has a numeric index signature and *P* is a numerical name, *T* is the type of the numeric index signature.
* Otherwise, if *S* has a string index signature, *T* is the type of the string index signature.
* Otherwise, no type is associated with the binding property and an error occurs.

The type *T* associated with a binding element is determined as follows:

* Let *S* be the type associated with the immediately containing destructuring variable declaration, binding property, or binding element.
* If *S* is the Any type:
  * If the binding element specifies an initializer expression, *T* is the type of that initializer expression.
  * Otherwise, *T* is the Any type.
* If *S* is not an array-like type (section [#array-types]<!--3.3.2-->), no type is associated with the binding property and an error occurs.
* If the binding element is a rest element, *T* is an array type with an element type *E*, where *E* is the type of the numeric index signature of *S*.
* Otherwise, if *S* is a tuple-like type (section [#tuple-types]<!--3.3.3-->):
  * Let *N* be the zero-based index of the binding element in the array binding pattern.
  * If *S* has a property with the numerical name *N*, *T* is the type of that property.
  * Otherwise, no type is associated with the binding element and an error occurs.
* Otherwise, if *S* has a numeric index signature, *T* is the type of the numeric index signature.
* Otherwise, no type is associated with the binding element and an error occurs.

When a destructuring variable declaration, binding property, or binding element specifies an initializer expression, the type of the initializer expression is required to be assignable to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.

*TODO: Update rules to reflect [improved checking of destructuring with literal initializers](https://github.com/Microsoft/TypeScript/pull/4598)*.

When the output target is ECMAScript 2015 or higher, except for removing the optional type annotation, destructuring variable declarations remain unchanged in the emitted JavaScript code.

When the output target is ECMAScript 3 or 5, destructuring variable declarations are rewritten to simple variable declarations. For example, an object destructuring declaration of the form

```TypeScript
var { x, p: y, q: z = false } = getSomeObject();
```

is rewritten to the simple variable declarations

```TypeScript
var _a = getSomeObject(),
    x = _a.x,
    y = _a.p,
    _b = _a.q,
    z = _b === void 0 ? false : _b;
```

The '_a' and '_b' temporary variables exist to ensure the assigned expression is evaluated only once, and the expression 'void 0' simply denotes the JavaScript value 'undefined'.

Similarly, an array destructuring declaration of the form

```TypeScript
var [x, y, z = 10] = getSomeArray();
```

is rewritten to the simple variable declarations

```TypeScript
var _a = getSomeArray(),
    x = _a[0],
    y = _a[1],
    _b = _a[2],
    z = _b === void 0 ? 10 : _b;
```

Combining both forms of destructuring, the example

```TypeScript
var { x, p: [y, z = 10] = getSomeArray() } = getSomeObject();
```

is rewritten to

```TypeScript
var _a = getSomeObject(),
    x = _a.x,
    _b = _a.p,
    _c = _b === void 0 ? getSomeArray() : _b,
    y = _c[0],
    _d = _c[1],
    z = _d === void 0 ? 10 : _d;
```

### Implied Type { #implied-type }

A variable, parameter, binding property, or binding element declaration that specifies a binding pattern has an ***implied type*** which is determined as follows:

* If the declaration specifies an object binding pattern, the implied type is an object type with a set of properties corresponding to the specified binding property declarations. The type of each property is the type implied by its binding property declaration, and a property is optional when its binding property declaration specifies an initializer expression.
* If the declaration specifies an array binding pattern without a rest element, the implied type is a tuple type with elements corresponding to the specified binding element declarations. The type of each element is the type implied by its binding element declaration.
* If the declaration specifies an array binding pattern with a rest element, the implied type is an array type with an element type of Any.

The implied type of a binding property or binding element declaration is

* the type of the declaration's initializer expression, if any, or otherwise
* the implied type of the binding pattern specified in the declaration, if any, or otherwise
* the type Any.

In the example

```TypeScript
function f({ a, b = "hello", c = 1 }) { ... }
```

the implied type of the binding pattern in the function's parameter is '{ a: any; b?: string; c?: number; }'. Since the parameter has no type annotation, this becomes the type of the parameter.

In the example

```TypeScript
var [a, b, c] = [1, "hello", true];
```

the array literal initializer expression is contextually typed by the implied type of the binding pattern, specifically the tuple type '[any, any, any]'. Because the contextual type is a tuple type, the resulting type of the array literal is the tuple type '[number, string, boolean]', and the destructuring declaration thus gives the types number, string, and boolean to a, b, and c respectively.

## Let and Const Declarations { #let-and-const-declarations }

Let and const declarations are exended to include optional type annotations.

&emsp;&emsp;*LexicalBinding:*  *( Modified )*
&emsp;&emsp;&emsp;*SimpleLexicalBinding*
&emsp;&emsp;&emsp;*DestructuringLexicalBinding*

&emsp;&emsp;*SimpleLexicalBinding:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*

&emsp;&emsp;*DestructuringLexicalBinding:*
&emsp;&emsp;&emsp;*BindingPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*

*TODO: Document scoping and types of [let and const declarations](https://github.com/Microsoft/TypeScript/pull/904)*.

## If, Do, and While Statements { #if-do-and-while-statements }

Expressions controlling 'if', 'do', and 'while' statements can be of any type (and not just type Boolean).

## For Statements { #for-statements }

Variable declarations in 'for' statements are extended in the same manner as variable declarations in variable statements (section [#variable-statements]<!--5.2-->).

## For-In Statements { #for-in-statements }

In a 'for-in' statement of the form

```TypeScript
for (v in expr) statement
```

*v* must be an expression classified as a reference of type Any or the String primitive type, and *expr* must be an expression of type Any, an object type, or a type parameter type.

In a 'for-in' statement of the form

```TypeScript
for (var v in expr) statement
```

*v* must be a variable declaration without a type annotation that declares a variable of type Any, and *expr* must be an expression of type Any, an object type, or a type parameter type.

## For-Of Statements { #for-of-statements }

*TODO: Document [for-of statements](https://github.com/Microsoft/TypeScript/issues/7)*.

## Continue Statements { #continue-statements }

A 'continue' statement is required to be nested, directly or indirectly (but not crossing function boundaries), within an iteration ('do', 'while', 'for', or 'for-in') statement. When a 'continue' statement includes a target label, that target label must appear in the label set of an enclosing (but not crossing function boundaries) iteration statement.

## Break Statements { #break-statements }

A 'break' statement is required to be nested, directly or indirectly (but not crossing function boundaries), within an iteration ('do', 'while', 'for', or 'for-in') or 'switch' statement. When a 'break' statement includes a target label, that target label must appear in the label set of an enclosing (but not crossing function boundaries) statement.

## Return Statements { #return-statements }

It is an error for a 'return' statement to occur outside a function body. Specifically, 'return' statements are not permitted at the global level or in namespace bodies.

A 'return' statement without an expression returns the value 'undefined' and is permitted in the body of any function, regardless of the return type of the function.

When a 'return' statement includes an expression, if the containing function includes a return type annotation, the return expression is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by that return type and must be of a type that is assignable to the return type. Otherwise, if the containing function is contextually typed by a type *T*, *Expr* is contextually typed by *T*'s return type.

In a function implementation without a return type annotation, the return type is inferred from the 'return' statements in the function body, as described in section [#function-implementations]<!--6.3-->.

In the example

```TypeScript
function f(): (x: string) => number {
    return s => s.length;
}
```

the arrow expression in the 'return' statement is contextually typed by the return type of 'f', thus giving type 'string' to 's'.

## With Statements { #with-statements }

Use of the 'with' statement in TypeScript is an error, as is the case in ECMAScript 5's strict mode. Furthermore, within the body of a 'with' statement, TypeScript considers every identifier occurring in an expression (section [#identifiers]<!--4.3-->) to be of the Any type regardless of its declared type. Because the 'with' statement puts a statically unknown set of identifiers in scope in front of those that are statically known, it is not possible to meaningfully assign a static type to any identifier.

## Switch Statements { #switch-statements }

In a 'switch' statement, each 'case' expression must be the Null type, the Undefined type, or a type that is comparable to or from (section [#comarability]) the type of the 'switch' expression.

## Throw Statements { #throw-statements }

The expression specified in a 'throw' statement can be of any type.

## Try Statements { #try-statements }

The variable introduced by a 'catch' clause of a 'try' statement is always of type Any. It is not possible to include a type annotation in a 'catch' clause.

<br/>
