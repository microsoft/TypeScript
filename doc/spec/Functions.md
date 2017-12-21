
# Functions { #functions }

TypeScript extends JavaScript functions to include type parameters, parameter and return type annotations, overloads, default parameter values, and rest parameters.

## Function Declarations { #function-declarations }

Function declarations are extended to permit the function body to be omitted in overload declarations.

&emsp;&emsp;*FunctionDeclaration:*  *( Modified )*
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*CallSignature*&emsp;`;`

A *FunctionDeclaration* introduces a named value of a function type in the containing declaration space. The *BindingIdentifier* is optional only when the function declaration occurs in an export default declaration (section [#export-default-declarations]<!--11.3.4.2-->).

Function declarations that specify a body are called ***function implementations*** and function declarations without a body are called ***function overloads***. It is possible to specify multiple overloads for the same function (i.e. for the same name in the same declaration space), but a function can have at most one implementation. All declarations for the same function must specify the same set of modifiers (i.e. the same combination of `declare`, `export`, and `default`).

When a function has overload declarations, the overloads determine the call signatures of the type given to the function object and the function implementation signature (if any) must be assignable to that type. Otherwise, the function implementation itself determines the call signature.

When a function has both overloads and an implementation, the overloads must precede the implementation and all of the declarations must be consecutive with no intervening grammatical elements.

## Function Overloads { #function-overloads }

Function overloads allow a more accurate specification of the patterns of invocation supported by a function than is possible with a single signature.
A call to an overloaded function chooses the best overload for the provided arguments and the return type of that overload becomes the type of the function call expression.
Thus, using overloads, it is possible to statically describe the way a function's return type varies based on its arguments.
Overload resolution in function calls is described further in section [#function-calls]<!--4.15-->.

Function overloads are purely a compile-time construct.
They have no impact on the emitted JavaScript and thus no run-time cost.

The parameter list of a function overload cannot specify default values for parameters.
In other words, an overload may use only the `?` form when specifying optional parameters.

The following is an example of a function with overloads.

```TypeScript
function attr(name: string): string;
function attr(name: string, value: string): Accessor;
function attr(map: any): Accessor;
function attr(nameOrMap: any, value?: string): any {
    if (nameOrMap && typeof nameOrMap === "string") {
        // handle string case
    }
    else {
        // handle map case
    }
}
```

Each overload and the final implementation specify the same identifier.
The type of the local variable 'attr' introduced by this declaration is

```TypeScript
var attr: {
    (name: string): string;
    (name: string, value: string): Accessor;
    (map: any): Accessor;
};
```

The signature of the function implementation is not included in the type.

## Function Implementations { #function-implementations }

A function implementation without a return type annotation is said to be an ***implicitly typed function***. The return type of an implicitly typed function *f* is inferred from its function body as follows:

* If there are no return statements with expressions in *f*'s function body, the inferred return type is Void.
* Otherwise, if *f*'s function body directly references *f* or references any implicitly typed functions that through this same analysis reference *f*, the inferred return type is Any.
* Otherwise, if *f* is a contextually typed function expression (section [#function-expressions]<!--4.10-->), the inferred return type is the union type (section [#union-types]<!--3.4-->) of the types of the return statement expressions in the function body, ignoring return statements with no expressions.
* Otherwise, the inferred return type is the first of the types of the return statement expressions in the function body that is a supertype (section [#subtypes-and-supertypes]<!--3.11.3-->) of each of the others, ignoring return statements with no expressions. A compile-time error occurs if no return statement expression has a type that is a supertype of each of the others.

In the example

```TypeScript
function f(x: number) {
    if (x <= 0) return x;
    return g(x);
}

function g(x: number) {
    return f(x - 1);
}
```

the inferred return type for 'f' and 'g' is Any because the functions reference themselves through a cycle with no return type annotations. Adding an explicit return type 'number' to either breaks the cycle and causes the return type 'number' to be inferred for the other.

An explicitly typed function whose return type isn't the Void type, the Any type, or a union type containing the Void or Any type as a constituent must have at least one return statement somewhere in its body. An exception to this rule is if the function implementation consists of a single 'throw' statement.

The type of 'this' in a function implementation is the Any type.

In the signature of a function implementation, a parameter can be marked optional by following it with an initializer. When a parameter declaration includes both a type annotation and an initializer, the initializer expression is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by the stated type and must be assignable to the stated type, or otherwise a compile-time error occurs. When a parameter declaration has no type annotation but includes an initializer, the type of the parameter is the widened form (section [#widened-types]<!--3.12-->) of the type of the initializer expression.

Initializer expressions are evaluated in the scope of the function body but are not permitted to reference local variables and are only permitted to access parameters that are declared to the left of the parameter they initialize, unless the parameter reference occurs in a nested function expression.

When the output target is ECMAScript 3 or 5, for each parameter with an initializer, a statement that substitutes the default value for an omitted argument is included in the generated JavaScript, as described in section [#code-generation]<!--6.6-->. The example

```TypeScript
function strange(x: number, y = x * 2, z = x + y) {
    return z;
}
```

generates JavaScript that is equivalent to

```TypeScript
function strange(x, y, z) {
    if (y === void 0) { y = x * 2; }
    if (z === void 0) { z = x + y; }
    return z;
}
```

In the example

```TypeScript
var x = 1;
function f(a = x) {
    var x = "hello";
}
```

the local variable 'x' is in scope in the parameter initializer (thus hiding the outer 'x'), but it is an error to reference it because it will always be uninitialized at the time the parameter initializer is evaluated.

## Destructuring Parameter Declarations { #destructuring-parameter-declarations }

Parameter declarations can specify binding patterns (section [#parameter-list]<!--3.9.2.2-->) and are then called ***destructuring parameter declarations***. Similar to a destructuring variable declaration (section [#destructuring-variable-declarations]<!--5.2.2-->), a destructuring parameter declaration introduces zero or more named locals and initializes them with values extracted from properties or elements of the object or array passed as an argument for the parameter.

The type of local introduced in a destructuring parameter declaration is determined in the same manner as a local introduced by a destructuring variable declaration, except the type *T* associated with a destructuring parameter declaration is determined as follows:

* If the declaration includes a type annotation, *T* is that type.
* If the declaration occurs in a function expression for which a contextual signature is available (section [#function-expressions]<!--4.10-->), *T* is the type obtained from the contextual signature.
* Otherwise, if the declaration includes an initializer expression, *T* is the widened form (section [#widened-types]<!--3.12-->) of the type of the initializer expression.
* Otherwise, if the declaration specifies a binding pattern, *T* is the implied type of that binding pattern (section [#implied-type]<!--5.2.3-->).
* Otherwise, if the parameter is a rest parameter, *T* is `any[]`.
* Otherwise, *T* is `any`.

When the output target is ECMAScript 2015 or higher, except for removing the optional type annotation, destructuring parameter declarations remain unchanged in the emitted JavaScript code. When the output target is ECMAScript 3 or 5, destructuring parameter declarations are rewritten to local variable declarations.

The example

```TypeScript
function drawText({ text = "", location: [x, y] = [0, 0], bold = false }) {
    // Draw text
}
```

declares a function `drawText` that takes a single parameter of the type

```TypeScript
{ text?: string; location?: [number, number]; bold?: boolean; }
```

When the output target is ECMAScript 3 or 5, the function is rewritten to

```TypeScript
function drawText(_a) {
    var _b = _a.text,
        text = _b === void 0 ? "" : _b,
        _c = _a.location,
        _d = _c === void 0 ? [0, 0] : _c,
        x = _d[0],
        y = _d[1],
        _e = _a.bold,
        bold = _e === void 0 ? false : _e;
    // Draw text
}
```

Destructuring parameter declarations do not permit type annotations on the individual binding patterns, as such annotations would conflict with the already established meaning of colons in object literals. Type annotations must instead be written on the top-level parameter declaration. For example

```TypeScript
interface DrawTextInfo {
    text?: string;
    location?: [number, number];
    bold?: boolean;
}

function drawText({ text, location: [x, y], bold }: DrawTextInfo) {
    // Draw text
}
```

## Generic Functions { #generic-functions }

A function implementation may include type parameters in its signature (section [#type-parameters]<!--3.9.2.1-->) and is then called a ***generic function***. Type parameters provide a mechanism for expressing relationships between parameter and return types in call operations. Type parameters have no run-time representation—they are purely a compile-time construct.

Type parameters declared in the signature of a function implementation are in scope in the signature and body of that function implementation.

The following is an example of a generic function:

```TypeScript
interface Comparable {
    localeCompare(other: any): number;
}

function compare<T extends Comparable>(x: T, y: T): number {
    if (x == null) return y == null ? 0 : -1;
    if (y == null) return 1;
    return x.localeCompare(y);
}
```

Note that the 'x' and 'y' parameters are known to be subtypes of the constraint 'Comparable' and therefore have a 'compareTo' member. This is described further in section [#type-parameter-lists]<!--3.6.1-->.

The type arguments of a call to a generic function may be explicitly specified in a call operation or may, when possible, be inferred (section [#type-argument-inference]<!--4.15.2-->) from the types of the regular arguments in the call. In the example

```TypeScript
class Person {
    name: string;
    localeCompare(other: Person) {
        return compare(this.name, other.name);
    }
}
```

the type argument to 'compare' is automatically inferred to be the String type because the two arguments are strings.

## Code Generation { #code-generation }

A function declaration generates JavaScript code that is equivalent to:

```TypeScript
function <FunctionName>(<FunctionParameters>) {
    <DefaultValueAssignments>
    <FunctionStatements>
}
```

*FunctionName* is the name of the function (or nothing in the case of a function expression).

*FunctionParameters* is a comma separated list of the function's parameter names.

*DefaultValueAssignments* is a sequence of default property value assignments, one for each parameter with a default value, in the order they are declared, of the form

```TypeScript
if (<Parameter> === void 0) { <Parameter> = <Default>; }
```

where *Parameter* is the parameter name and *Default* is the default value expression.

*FunctionStatements* is the code generated for the statements specified in the function body.

## Generator Functions { #generator-functions }

*TODO: Document [generator functions](https://github.com/Microsoft/TypeScript/issues/2873)*.

## Asynchronous Functions { #asynchronous-functions }

*TODO: Document [asynchronous functions](https://github.com/Microsoft/TypeScript/issues/1664)*.

## Type Guard Functions { #type-guard-functions }

*TODO: Document [type guard functions](https://github.com/Microsoft/TypeScript/issues/1007), including [this type predicates](https://github.com/Microsoft/TypeScript/pull/5906)*.

<br/>

