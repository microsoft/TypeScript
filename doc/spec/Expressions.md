
# Expressions { #expressions }

This chapter describes the manner in which TypeScript provides type inference and type checking for JavaScript expressions. TypeScript's type analysis occurs entirely at compile-time and adds no run-time overhead to expression evaluation.

TypeScript's typing rules define a type for every expression construct. For example, the type of the literal 123 is the Number primitive type, and the type of the object literal { a: 10, b: "hello" } is { a: number; b: string; }. The sections in this chapter describe these rules in detail.

In addition to type inference and type checking, TypeScript augments JavaScript expressions with the following constructs:

* Optional parameter and return type annotations in function expressions and arrow functions.
* Type arguments in function calls.
* Type assertions.

Unless otherwise noted in the sections that follow, TypeScript expressions and the JavaScript expressions generated from them are identical.

## Values and References { #values-and-references }

Expressions are classified as ***values*** or ***references***. References are the subset of expressions that are permitted as the target of an assignment. Specifically, references are combinations of identifiers (section [#identifiers]<!--4.3-->), parentheses (section [#parentheses]<!--4.8-->), and property accesses (section [#property-access]<!--4.13-->). All other expression constructs described in this chapter are classified as values.

## The this Keyword { #the-this-keyword }

The type of `this` in an expression depends on the location in which the reference takes place:

* In a constructor, instance member function, instance member accessor, or instance member variable initializer, `this` is of the this-type (section [#this-types]<!--3.6.3-->) of the containing class.
* In a static member function or static member accessor, the type of `this` is the constructor function type of the containing class.
* In a function declaration or a function expression, `this` is of type Any.
* In the global namespace, `this` is of type Any.

In all other contexts it is a compile-time error to reference `this`.

Note that an arrow function (section [#arrow-functions]<!--4.11-->) has no `this` parameter but rather preserves the `this` of its enclosing context.

## Identifiers { #identifiers }

When an expression is an *IdentifierReference*, the expression refers to the most nested namespace, class, enum, function, variable, or parameter with that name whose scope (section [#scopes]<!--2.4-->) includes the location of the reference. The type of such an expression is the type associated with the referenced entity:

* For a namespace, the object type associated with the namespace instance.
* For a class, the constructor type associated with the constructor function object.
* For an enum, the object type associated with the enum object.
* For a function, the function type associated with the function object.
* For a variable, the type of the variable.
* For a parameter, the type of the parameter.

An identifier expression that references a variable or parameter is classified as a reference. An identifier expression that references any other kind of entity is classified as a value (and therefore cannot be the target of an assignment).

## Literals { #literals }

Literals are typed as follows:

* The type of the `null` literal is the Null primitive type.
* The type of the literals `true` and `false` is the Boolean primitive type.
* The type of numeric literals is the Number primitive type.
* The type of string literals is the String primitive type.
* The type of regular expression literals is the global interface type 'RegExp'.

## Object Literals { #object-literals }

Object literals are extended to support type annotations in methods and get and set accessors.

&emsp;&emsp;*PropertyDefinition:*  *( Modified )*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*CoverInitializedName*
&emsp;&emsp;&emsp;*PropertyName*&emsp;`:`&emsp;*AssignmentExpression*
&emsp;&emsp;&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;*GetAccessor*
&emsp;&emsp;&emsp;*SetAccessor*

&emsp;&emsp;*GetAccessor:*
&emsp;&emsp;&emsp;`get`&emsp;*PropertyName*&emsp;`(`&emsp;`)`&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`

&emsp;&emsp;*SetAccessor:*
&emsp;&emsp;&emsp;`set`&emsp;*PropertyName*&emsp;`(`&emsp;*BindingIdentifierOrPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;`)`&emsp;`{`&emsp;*FunctionBody*&emsp;`}`

The type of an object literal is an object type with the set of properties specified by the property assignments in the object literal. A get and set accessor may specify the same property name, but otherwise it is an error to specify multiple property assignments for the same property.

A shorthand property assignment of the form

```TypeScript
prop
```

is equivalent to

```TypeScript
prop : prop
```

Likewise, a property assignment of the form

```TypeScript
f ( ... ) { ... }
```

is equivalent to

```TypeScript
f : function ( ... ) { ... }
```

Each property assignment in an object literal is processed as follows:

* If the object literal is contextually typed and the contextual type contains a property with a matching name, the property assignment is contextually typed by the type of that property.
* Otherwise, if the object literal is contextually typed, if the contextual type contains a numeric index signature, and if the property assignment specifies a numeric property name, the property assignment is contextually typed by the type of the numeric index signature.
* Otherwise, if the object literal is contextually typed and the contextual type contains a string index signature, the property assignment is contextually typed by the type of the string index signature.
* Otherwise, the property assignment is processed without a contextual type.

The type of a property introduced by a property assignment of the form *Name* `:` *Expr* is the type of *Expr*.

A get accessor declaration is processed in the same manner as an ordinary function declaration (section [#function-declarations]<!--6.1-->) with no parameters. A set accessor declaration is processed in the same manner as an ordinary function declaration with a single parameter and a Void return type. When both a get and set accessor is declared for a property:

* If both accessors include type annotations, the specified types must be identical.
* If only one accessor includes a type annotation, the other behaves as if it had the same type annotation.
* If neither accessor includes a type annotation, the inferred return type of the get accessor becomes the parameter type of the set accessor.

If a get accessor is declared for a property, the return type of the get accessor becomes the type of the property. If only a set accessor is declared for a property, the parameter type (which may be type Any if no type annotation is present) of the set accessor becomes the type of the property.

When an object literal is contextually typed by a type that includes a string index signature, the resulting type of the object literal includes a string index signature with the union type of the types of the properties declared in the object literal, or the Undefined type if the object literal is empty. Likewise, when an object literal is contextually typed by a type that includes a numeric index signature, the resulting type of the object literal includes a numeric index signature with the union type of the types of the numerically named properties (section [#index-signatures]<!--3.9.4-->) declared in the object literal, or the Undefined type if the object literal declares no numerically named properties.

If the *PropertyName* of a property assignment is a computed property name that doesn't denote a well-known symbol ([#computed-property-names]<!--2.2.3-->), the construct is considered a ***dynamic property assignment***. The following rules apply to dynamic property assignments:

* A dynamic property assignment does not introduce a property in the type of the object literal.
* The property name expression of a dynamic property assignment must be of type Any or the String, Number, or Symbol primitive type.
* The name associated with a dynamic property assignment is considered to be a numeric property name if the property name expression is of type Any or the Number primitive type.

## Array Literals { #array-literals }

An array literal

```TypeScript
[ expr1, expr2, ..., exprN ]
```

denotes a value of an array type (section [#array-types]<!--3.3.2-->) or a tuple type (section [#tuple-types]<!--3.3.3-->) depending on context.

Each element expression in a non-empty array literal is processed as follows:

* If the array literal contains no spread elements, and if the array literal is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by a type *T* and *T* has a property with the numeric name *N*, where *N* is the index of the element expression in the array literal, the element expression is contextually typed by the type of that property.
* Otherwise, if the array literal is contextually typed by a type *T* with a numeric index signature, the element expression is contextually typed by the type of the numeric index signature.
* Otherwise, the element expression is not contextually typed.

The resulting type an array literal expression is determined as follows:

* If the array literal is empty, the resulting type is an array type with the element type Undefined.
* Otherwise, if the array literal contains no spread elements and is contextually typed by a tuple-like type (section [#tuple-types]<!--3.3.3-->), the resulting type is a tuple type constructed from the types of the element expressions.
* Otherwise, if the array literal contains no spread elements and is an array assignment pattern in a destructuring assignment (section [#destructuring-assignment]<!--4.21.1-->), the resulting type is a tuple type constructed from the types of the element expressions.
* Otherwise, the resulting type is an array type with an element type that is the union of the types of the non-spread element expressions and the numeric index signature types of the spread element expressions.

A spread element must specify an expression of an array-like type (section [#array-types]<!--3.3.2-->), or otherwise an error occurs.

*TODO: The compiler currently doesn't support applying the spread operator to a string (to spread the individual characters of a string into a string array). This will eventually be allowed, but only when the code generation target is ECMAScript 2015 or later*.

*TODO: Document spreading an [iterator](https://github.com/Microsoft/TypeScript/pull/2498) into an array literal*.

The rules above mean that an array literal is always of an array type, unless it is contextually typed by a tuple-like type. For example

```TypeScript
var a = [1, 2];                          // number[]
var b = ["hello", true];                 // (string | boolean)[]
var c: [number, string] = [3, "three"];  // [number, string]
```

When the output target is ECMAScript 3 or 5, array literals containing spread elements are rewritten to invocations of the `concat` method. For example, the assignments

```TypeScript
var a = [2, 3, 4];
var b = [0, 1, ...a, 5, 6];
```

are rewritten to

```TypeScript
var a = [2, 3, 4];
var b = [0, 1].concat(a, [5, 6]);
```

## Template Literals { #template-literals }

*TODO: [Template literals](https://github.com/Microsoft/TypeScript/pull/960)*.

## Parentheses { #parentheses }

A parenthesized expression

```TypeScript
( expr )
```

has the same type and classification as the contained expression itself. Specifically, if the contained expression is classified as a reference, so is the parenthesized expression.

## The super Keyword { #the-super-keyword }

The `super` keyword can be used in expressions to reference base class properties and the base class constructor.

### Super Calls { #super-calls }

Super calls consist of the keyword `super` followed by an argument list enclosed in parentheses. Super calls are only permitted in constructors of derived classes, as described in section [#super-calls]<!--8.3.2-->.

A super call invokes the constructor of the base class on the instance referenced by `this`. A super call is processed as a function call (section [#function-calls]<!--4.15-->) using the construct signatures of the base class constructor function type as the initial set of candidate signatures for overload resolution. Type arguments cannot be explicitly specified in a super call. If the base class is a generic class, the type arguments used to process a super call are always those specified in the `extends` clause that references the base class.

The type of a super call expression is Void.

The JavaScript code generated for a super call is specified in section [#classes-with-extends-clauses]<!--8.7.2-->.

### Super Property Access { #super-property-access }

A super property access consists of the keyword `super` followed by a dot and an identifier. Super property accesses are used to access base class member functions from derived classes and are permitted in contexts where `this` (section [#the-this-keyword]<!--4.2-->) references a derived class instance or a derived class constructor function. Specifically:

* In a constructor, instance member function, instance member accessor, or instance member variable initializer where `this` references a derived class instance, a super property access is permitted and must specify a public instance member function of the base class.
* In a static member function or static member accessor where `this` references the constructor function object of a derived class, a super property access is permitted and must specify a public static member function of the base class.

Super property accesses are not permitted in other contexts, and it is not possible to access other kinds of base class members in a super property access. Note that super property accesses are not permitted inside function expressions nested in the above constructs because `this` is of type Any in such function expressions.

Super property accesses are typically used to access overridden base class member functions from derived class member functions. For an example of this, see section [#member-function-declarations]<!--8.4.2-->.

The JavaScript code generated for a super property access is specified in section [#classes-with-extends-clauses]<!--8.7.2-->.

*TODO: Update section to include [bracket notation in super property access](https://github.com/Microsoft/TypeScript/issues/3970)*.

## Function Expressions { #function-expressions }

Function expressions are extended from JavaScript to optionally include parameter and return type annotations.

&emsp;&emsp;*FunctionExpression:*  *( Modified )*
&emsp;&emsp;&emsp;`function`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`

The descriptions of function declarations provided in chapter [#functions]<!--6--> apply to function expressions as well, except that function expressions do not support overloading.

The type of a function expression is an object type containing a single call signature with parameter and return types inferred from the function expression's signature and body.

When a function expression with no type parameters and no parameter type annotations is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by a type *T* and a contextual signature *S* can be extracted from *T*, the function expression is processed as if it had explicitly specified parameter type annotations as they exist in *S*. Parameters are matched by position and need not have matching names. If the function expression has fewer parameters than *S*, the additional parameters in *S* are ignored. If the function expression has more parameters than *S*, the additional parameters are all considered to have type Any.

Likewise, when a function expression with no return type annotation is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by a function type *T* and a contextual signature *S* can be extracted from *T*, expressions in contained return statements (section [#return-statements]<!--5.10-->) are contextually typed by the return type of *S*.

A contextual signature *S* is extracted from a function type *T* as follows:

* If *T* is a function type with exactly one call signature, and if that call signature is non-generic, *S* is that signature.
* If *T* is a union type, let *U* be the set of element types in *T* that have call signatures. If each type in *U* has exactly one call signature and that call signature is non-generic, and if all of the signatures are identical ignoring return types, then *S* is a signature with the same parameters and a union of the return types.
* Otherwise, no contextual signature can be extracted from *T*.

In the example

```TypeScript
var f: (s: string) => string = function (s) {
    return s.toLowerCase();
};
```

the function expression is contextually typed by the type of 'f', and since the function expression has no type parameters or type annotations its parameter type information is extracted from the contextual type, thus inferring the type of 's' to be the String primitive type.

## Arrow Functions { #arrow-functions }

Arrow functions are extended from JavaScript to optionally include parameter and return type annotations.

&emsp;&emsp;*ArrowFormalParameters:*  *( Modified )*
&emsp;&emsp;&emsp;*CallSignature*

The descriptions of function declarations provided in chapter [#functions]<!--6--> apply to arrow functions as well, except that arrow functions do not support overloading.

The type of an arrow function is determined in the same manner as a function expression (section [#function-expressions]<!--4.10-->). Likewise, parameters of an arrow function and return statements in the body of an arrow function are contextually typed in the same manner as for function expressions.

When an arrow function with an expression body and no return type annotation is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by a function type *T* and a contextual signature *S* can be extracted from *T*, the expression body is contextually typed by the return type of *S*.

An arrow function expression of the form

```TypeScript
( ... ) => expr
```

is exactly equivalent to

```TypeScript
( ... ) => { return expr ; }
```

Furthermore, arrow function expressions of the forms

```TypeScript
id => { ... }
id => expr
```

are exactly equivalent to

```TypeScript
( id ) => { ... }
( id ) => expr
```

Thus, the following examples are all equivalent:

```TypeScript
(x) => { return Math.sin(x); }
(x) => Math.sin(x)
x => { return Math.sin(x); }
x => Math.sin(x)
```

A function expression introduces a new dynamically bound `this`, whereas an arrow function expression preserves the `this` of its enclosing context. Arrow function expressions are particularly useful for writing callbacks, which otherwise often have an undefined or unexpected `this`.

In the example

```TypeScript
class Messenger {
    message = "Hello World";
    start() {
        setTimeout(() => alert(this.message), 3000);
    }
};

var messenger = new Messenger();
messenger.start();
```

the use of an arrow function expression causes the callback to have the same `this` as the surrounding 'start' method. Writing the callback as a standard function expression it becomes necessary to manually arrange access to the surrounding `this`, for example by copying it into a local variable:

```TypeScript
class Messenger {
    message = "Hello World";
    start() {
        var _this = this;
        setTimeout(function() { alert(_this.message); }, 3000);
    }
};

var messenger = new Messenger();
messenger.start();
```

The TypeScript compiler applies this type of transformation to rewrite arrow function expressions into standard function expressions.

A construct of the form

```TypeScript
< T > ( ... ) => { ... }
```

could be parsed as an arrow function expression with a type parameter or a type assertion applied to an arrow function with no type parameter. It is resolved as the former, but parentheses can be used to select the latter meaning:

```TypeScript
< T > ( ( ... ) => { ... } )
```

## Class Expressions { #class-expressions }

*TODO: Document [class expressions](https://github.com/Microsoft/TypeScript/issues/497)*.

## Property Access { #property-access }

A property access uses either dot notation or bracket notation. A property access expression is always classified as a reference.

A dot notation property access of the form

```TypeScript
object . name
```

where *object* is an expression and *name* is an identifier (including, possibly, a reserved word), is used to access the property with the given name on the given object. A dot notation property access is processed as follows at compile-time:

* If *object* is of type Any, any *name* is permitted and the property access is of type Any.
* Otherwise, if *name* denotes an accessible apparent property (section [#apparent-members]<!--3.11.1-->) in the widened type (section [#widened-types]<!--3.12-->) of *object*, the property access is of the type of that property. Public members are always accessible, but private and protected members of a class have restricted accessibility, as described in [#accessibility]<!--8.2.2-->.
* Otherwise, the property access is invalid and a compile-time error occurs.

A bracket notation property access of the form

```TypeScript
object [ index ]
```

where *object* and *index* are expressions, is used to access the property with the name computed by the index expression on the given object. A bracket notation property access is processed as follows at compile-time:

* If *index* is a string literal or a numeric literal and *object* has an apparent property (section [#apparent-members]<!--3.11.1-->) with the name given by that literal (converted to its string representation in the case of a numeric literal), the property access is of the type of that property.
* Otherwise, if *object* has an apparent numeric index signature and *index* is of type Any, the Number primitive type, or an enum type, the property access is of the type of that index signature.
* Otherwise, if *object* has an apparent string index signature and *index* is of type Any, the String or Number primitive type, or an enum type, the property access is of the type of that index signature.
* Otherwise, if *index* is of type Any, the String or Number primitive type, or an enum type, the property access is of type Any.
* Otherwise, the property access is invalid and a compile-time error occurs.

*TODO: Indexing with [symbols](https://github.com/Microsoft/TypeScript/pull/1978)*.

The rules above mean that properties are strongly typed when accessed using bracket notation with the literal representation of their name. For example:

```TypeScript
var type = {
    name: "boolean",
    primitive: true
};

var s = type["name"];       // string
var b = type["primitive"];  // boolean
```

Tuple types assign numeric names to each of their elements and elements are therefore strongly typed when accessed using bracket notation with a numeric literal:

```TypeScript
var data: [string, number] = ["five", 5];
var s = data[0];  // string
var n = data[1];  // number
```

## The new Operator { #the-new-operator }

A `new` operation has one of the following forms:

```TypeScript
new C
new C ( ... )
new C < ... > ( ... )
```

where *C* is an expression. The first form is equivalent to supplying an empty argument list. *C* must be of type Any or of an object type with one or more construct or call signatures. The operation is processed as follows at compile-time:

* If *C* is of type Any, any argument list is permitted and the result of the operation is of type Any.
* If *C* has one or more apparent construct signatures (section [#apparent-members]<!--3.11.1-->), the expression is processed in the same manner as a function call, but using the construct signatures as the initial set of candidate signatures for overload resolution. The result type of the function call becomes the result type of the operation.
* If *C* has no apparent construct signatures but one or more apparent call signatures, the expression is processed as a function call. A compile-time error occurs if the result of the function call is not Void. The type of the result of the operation is Any.

## Function Calls { #function-calls }

Function calls are extended from JavaScript to support optional type arguments.

&emsp;&emsp;*Arguments:*  *( Modified )*
&emsp;&emsp;&emsp;*TypeArguments<sub>opt</sub>*&emsp;`(`&emsp;*ArgumentList<sub>opt</sub>*&emsp;`)`

A function call takes one of the forms

```TypeScript
func ( ... )
func < ... > ( ... )
```

where *func* is an expression of a function type or of type Any. The function expression is followed by an optional type argument list (section [#type-argument-lists]<!--3.6.2-->) and an argument list.

If *func* is of type Any, or of an object type that has no call or construct signatures but is a subtype of the Function interface, the call is an ***untyped function call***. In an untyped function call no type arguments are permitted, argument expressions can be of any type and number, no contextual types are provided for the argument expressions, and the result is always of type Any.

If *func* has apparent call signatures (section [#apparent-members]<!--3.11.1-->) the call is a ***typed function call***. TypeScript employs ***overload resolution*** in typed function calls in order to support functions with multiple call signatures. Furthermore, TypeScript may perform ***type argument inference*** to automatically determine type arguments in generic function calls.

### Overload Resolution { #overload-resolution }

The purpose of overload resolution in a function call is to ensure that at least one signature is applicable, to provide contextual types for the arguments, and to determine the result type of the function call, which could differ between the multiple applicable signatures.
Overload resolution has no impact on the run-time behavior of a function call.
Since JavaScript doesn't support function overloading, all that matters at run-time is the name of the function.

*TODO: Describe use of [wildcard function types](https://github.com/Microsoft/TypeScript/issues/3970) in overload resolution, as well as progressive inference of contextually typed arguments generally*.

Processing a typed function call consists of the following steps:

* A list of signatures is constructed from the call signatures in the function type in declaration order. For classes and interfaces, inherited signatures are considered to follow explicitly declared signatures in `extends` clause order. Signatures that contain literal types always come before signatures that do not.
* Signatures that are not applicable are removed.
* If the list of signatures is empty, the function call is an error.
* Otherwise, if the list contains one or more signatures for which the type of each argument expression is a subtype of each corresponding parameter type after type arguments are substituted for their associated type parameters, the return type of the first of those signatures becomes the type of the function call.
* Otherwise, the return type of the first signature in the list becomes the type of the function call.

A signature is said to be an ***applicable signature*** with respect to an argument list when

* the number of arguments is not less than the number of required parameters,
* the number of arguments is not greater than the number of parameters, or the last parameter is a rest parameter.
* the number of type arguments, if provided, is not less than the number of required type parameters,
* the number of type arguments, if provided, is not greater than the number of type parameters,
* for each argument expression *e* and its corresponding parameter *p,* when *e* is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by the *T*, no errors ensue and the type of *e* is assignable to (section [#assignment-compatibility]<!--3.11.4-->) *T*, where *T* is the type of *p* for signatures without type parameters, and the type of *p* after type arguments are substituted for their associated type parameters otherwise.

### Type Argument Inference { #type-argument-inference }

Given a signature &lt; *T<sub>1</sub>* , *T<sub>2</sub>* , … , *T<sub>n</sub>* > ( *p<sub>1</sub>* : *P<sub>1</sub>* , *p<sub>2</sub>* : *P<sub>2</sub>* , … , *p<sub>m</sub>* : *P<sub>m</sub>* ), where each parameter type *P* references zero or more of the type parameters *T*, and an argument list ( *e<sub>1</sub>* , *e<sub>2</sub>* , … , *e<sub>m</sub>* ), the task of type argument inference is to find a set of type arguments *A<sub>1</sub>*…*A<sub>n</sub>* to substitute for *T<sub>1</sub>*…*T<sub>n</sub>* such that the argument list becomes an applicable signature.

*TODO: Update [type argument inference and overload resolution rules](https://github.com/Microsoft/TypeScript/issues/1186)*.

Type argument inference produces a set of candidate types for each type parameter. Given a type parameter *T* and set of candidate types, the actual inferred type argument is determined as follows:

* If the set of candidate argument types is empty, the inferred type argument for *T* is *T*'s constraint.
* Otherwise, if at least one of the candidate types is a supertype of all of the other candidate types, let *C* denote the widened form (section [#widened-types]<!--3.12-->) of the first such candidate type. If *C* satisfies *T*'s constraint, the inferred type argument for *T* is *C*. Otherwise, the inferred type argument for *T* is *T*'s constraint.
* Otherwise, if no candidate type is a supertype of all of the other candidate types, type inference has fails and no type argument is inferred for *T*.

In order to compute candidate types, the argument list is processed as follows:

* Initially all inferred type arguments are considered ***unfixed*** with an empty set of candidate types.
* Proceeding from left to right, each argument expression *e* is ***inferentially typed*** by its corresponding parameter type *P*, possibly causing some inferred type arguments to become ***fixed***, and candidate type inferences (section [#type-inference]<!--3.11.7-->) are made for unfixed inferred type arguments from the type computed for *e* to *P*.

The process of inferentially typing an expression *e* by a type *T* is the same as that of contextually typing *e* by *T*, with the following exceptions:

* Where expressions contained within *e* would be contextually typed, they are instead inferentially typed.
* When a function expression is inferentially typed (section [#function-expressions]<!--4.10-->) and a type assigned to a parameter in that expression references type parameters for which inferences are being made, the corresponding inferred type arguments to become ***fixed*** and no further candidate inferences are made for them.
* If *e* is an expression of a function type that contains exactly one generic call signature and no other members, and *T* is a function type with exactly one non-generic call signature and no other members, then any inferences made for type parameters referenced by the parameters of *T*'s call signature are ***fixed***, and *e*'s type is changed to a function type with *e*'s call signature instantiated in the context of *T*'s call signature (section [#contextual-signature-instantiation]<!--3.11.6-->).

An example:

```TypeScript
function choose<T>(x: T, y: T): T {
    return Math.random() < 0.5 ? x : y;
}

var x = choose(10, 20);     // Ok, x of type number
var y = choose("Five", 5);  // Error
```

In the first call to 'choose', two inferences are made from 'number' to 'T', one for each parameter. Thus, 'number' is inferred for 'T' and the call is equivalent to

```TypeScript
var x = choose<number>(10, 20);
```

In the second call to 'choose', an inference is made from type 'string' to 'T' for the first parameter and an inference is made from type 'number' to 'T' for the second parameter. Since neither 'string' nor 'number' is a supertype of the other, type inference fails. That in turn means there are no applicable signatures and the function call is an error.

In the example

```TypeScript
function map<T, U>(a: T[], f: (x: T) => U): U[] {
    var result: U[] = [];
    for (var i = 0; i < a.length; i++) result.push(f(a[i]));
    return result;
}

var names = ["Peter", "Paul", "Mary"];
var lengths = map(names, s => s.length);
```

inferences for 'T' and 'U' in the call to 'map' are made as follows: For the first parameter, inferences are made from the type 'string[]' (the type of 'names') to the type 'T[]', inferring 'string' for 'T'. For the second parameter, inferential typing of the arrow expression 's => s.length' causes 'T' to become fixed such that the inferred type 'string' can be used for the parameter 's'. The return type of the arrow expression can then be determined, and inferences are made from the type '(s: string) => number' to the type '(x: T) => U', inferring 'number' for 'U'. Thus the call to 'map' is equivalent to

```TypeScript
var lengths = map<string, number>(names, s => s.length);
```

and the resulting type of 'lengths' is therefore 'number[]'.

In the example

```TypeScript
function zip<S, T, U>(x: S[], y: T[], combine: (x: S) => (y: T) => U): U[] {
    var len = Math.max(x.length, y.length);
    var result: U[] = [];
    for (var i = 0; i < len; i++) result.push(combine(x[i])(y[i]));
    return result;
}

var names = ["Peter", "Paul", "Mary"];
var ages = [7, 9, 12];
var pairs = zip(names, ages, s => n => ({ name: s, age: n }));
```

inferences for 'S', 'T' and 'U' in the call to 'zip' are made as follows: Using the first two parameters, inferences of 'string' for 'S' and 'number' for 'T' are made. For the third parameter, inferential typing of the outer arrow expression causes 'S' to become fixed such that the inferred type 'string' can be used for the parameter 's'. When a function expression is inferentially typed, its return expression(s) are also inferentially typed. Thus, the inner arrow function is inferentially typed, causing 'T' to become fixed such that the inferred type 'number' can be used for the parameter 'n'. The return type of the inner arrow function can then be determined, which in turn determines the return type of the function returned from the outer arrow function, and inferences are made from the type '(s: string) => (n: number) => { name: string; age: number }' to the type '(x: S) => (y: T) => R', inferring '{ name: string; age: number }' for 'R'. Thus the call to 'zip' is equivalent to

```TypeScript
var pairs = zip<string, number, { name: string; age: number }>(
    names, ages, s => n => ({ name: s, age: n }));
```

and the resulting type of 'pairs' is therefore '{ name: string; age: number }[]'.

### Grammar Ambiguities { #grammar-ambiguities }

The inclusion of type arguments in the *Arguments* production (section [#function-calls]<!--4.15-->) gives rise to certain ambiguities in the grammar for expressions. For example, the statement

```TypeScript
f(g<A, B>(7));
```

could be interpreted as  a call to 'f' with two arguments, 'g &lt; A' and 'B > (7)'. Alternatively, it could be interpreted as a call to 'f' with one argument, which is a call to a generic function 'g' with two type arguments and one regular argument.

The grammar ambiguity is resolved as follows: In a context where one possible interpretation of a sequence of tokens is an *Arguments* production, if the initial sequence of tokens forms a syntactically correct *TypeArguments* production and is followed by a '`(`' token, then the sequence of tokens is processed an *Arguments* production, and any other possible interpretation is discarded. Otherwise, the sequence of tokens is not considered an *Arguments* production.

This rule means that the call to 'f' above is interpreted as a call with one argument, which is a call to a generic function 'g' with two type arguments and one regular argument. However, the statements

```TypeScript
f(g < A, B > 7);
f(g < A, B > +(7));
```

are both interpreted as calls to 'f' with two arguments.

## Type Assertions { #type-assertions }

TypeScript extends the JavaScript expression grammar with the ability to assert a type for an expression:

&emsp;&emsp;*UnaryExpression:*  *( Modified )*
&emsp;&emsp;&emsp;…
&emsp;&emsp;&emsp;`<`&emsp;*Type*&emsp;`>`&emsp;*UnaryExpression*

A type assertion expression consists of a type enclosed in `<` and `>` followed by a unary expression. Type assertion expressions are purely a compile-time construct. Type assertions are *not* checked at run-time and have no impact on the emitted JavaScript (and therefore no run-time cost). The type and the enclosing `<` and `>` are simply removed from the generated code.

In a type assertion expression of the form &lt; *T* > *e*, *e* is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by *T* and the resulting type of* e* is required to be assignable to *T*, or *T* is required to be assignable to the widened form of the resulting type of *e*, or otherwise a compile-time error occurs. The type of the result is *T*.

Type assertions check for assignment compatibility in both directions. Thus, type assertions allow type conversions that *might* be correct, but aren't *known* to be correct. In the example

```TypeScript
class Shape { ... }

class Circle extends Shape { ... }

function createShape(kind: string): Shape {
    if (kind === "circle") return new Circle();
    ...
}

var circle = <Circle> createShape("circle");
```

the type annotations indicate that the 'createShape' function *might* return a 'Circle' (because 'Circle' is a subtype of 'Shape'), but isn't *known* to do so (because its return type is 'Shape'). Therefore, a type assertion is needed to treat the result as a 'Circle'.

As mentioned above, type assertions are not checked at run-time and it is up to the programmer to guard against errors, for example using the `instanceof` operator:

```TypeScript
var shape = createShape(shapeKind);
if (shape instanceof Circle) {
    var circle = <Circle> shape;
    ...
}
```

*TODO: Document [as operator](https://github.com/Microsoft/TypeScript/pull/3564)*.

## JSX Expressions { #jsx-expressions }

*TODO: Document [JSX expressions](https://github.com/Microsoft/TypeScript/issues/3203)*.

## Unary Operators { #unary-operators }

The subsections that follow specify the compile-time processing rules of the unary operators. In general, if the operand of a unary operator does not meet the stated requirements, a compile-time error occurs and the result of the operation defaults to type Any in further processing.

### The ++ and -- operators { #the-plusplus-and-minusminus-operators }

These operators, in prefix or postfix form, require their operand to be of type Any, the Number primitive type, or an enum type, and classified as a reference (section [#values-and-references]<!--4.1-->). They produce a result of the Number primitive type.

### The +, –, and ~ operators { #the-plus-minus-and-tilde-operators }

These operators permit their operand to be of any type and produce a result of the Number primitive type.

The unary + operator can conveniently be used to convert a value of any type to the Number primitive type:

```TypeScript
function getValue() { ... }

var n = +getValue();
```

The example above converts the result of 'getValue()' to a number if it isn't a number already. The type inferred for 'n' is the Number primitive type regardless of the return type of 'getValue'.

### The ! operator { #the-logical-not-operator }

The ! operator permits its operand to be of any type and produces a result of the Boolean primitive type.

Two unary ! operators in sequence can conveniently be used to convert a value of any type to the Boolean primitive type:

```TypeScript
function getValue() { ... }

var b = !!getValue();
```

The example above converts the result of 'getValue()' to a Boolean if it isn't a Boolean already. The type inferred for 'b' is the Boolean primitive type regardless of the return type of 'getValue'.

### The delete Operator { #the-delete-operator }

The 'delete' operator takes an operand of any type and produces a result of the Boolean primitive type.

### The void Operator { #the-void-operator }

The 'void' operator takes an operand of any type and produces the value 'undefined'. The type of the result is the Undefined type ([#the-undefined-type]<!--3.2.7-->).

### The typeof Operator { #the-typeof-operator }

The 'typeof' operator takes an operand of any type and produces a value of the String primitive type. In positions where a type is expected, 'typeof' can also be used in a type query (section [#type-queries]<!--3.8.10-->) to produce the type of an expression.

```TypeScript
var x = 5;
var y = typeof x;  // Use in an expression
var z: typeof x;   // Use in a type query
```

In the example above, 'x' is of type 'number', 'y' is of type 'string' because when used in an expression, 'typeof' produces a value of type string (in this case the string "number"), and 'z' is of type 'number' because when used in a type query, 'typeof' obtains the type of an expression.

## Binary Operators { #binary-operators }

The subsections that follow specify the compile-time processing rules of the binary operators. In general, if the operands of a binary operator do not meet the stated requirements, a compile-time error occurs and the result of the operation defaults to type any in further processing. Tables that summarize the compile-time processing rules for operands of the Any type, the Boolean, Number, and String primitive types, and all other types (the Other column in the tables) are provided.

### The *, /, %, –, &lt;&lt;, >>, >>>, &, ^, and | operators { #the-binary-arithmetic-logical-and-bitwise-operators }

These operators require their operands to be of type Any, the Number primitive type, or an enum type. Operands of an enum type are treated as having the primitive type Number. If one operand is the `null` or `undefined` value, it is treated as having the type of the other operand. The result is always of the Number primitive type.

||Any|Boolean|Number|String|Other|
|:---:|:---:|:---:|:---:|:---:|:---:|
|Any|Number||Number|||
|Boolean||||||
|Number|Number||Number|||
|String||||||
|Other||||||

*TODO: Document the [exponentation operator](https://github.com/Microsoft/TypeScript/issues/4812)*.

### The + operator { #the-binary-plus-operator }

The binary + operator requires both operands to be of the Number primitive type or an enum type, or at least one of the operands to be of type Any or the String primitive type. Operands of an enum type are treated as having the primitive type Number. If one operand is the `null` or `undefined` value, it is treated as having the type of the other operand. If both operands are of the Number primitive type, the result is of the Number primitive type. If one or both operands are of the String primitive type, the result is of the String primitive type. Otherwise, the result is of type Any.

||Any|Boolean|Number|String|Other|
|:---:|:---:|:---:|:---:|:---:|:---:|
|Any|Any|Any|Any|String|Any|
|Boolean|Any|||String||
|Number|Any||Number|String||
|String|String|String|String|String|String|
|Other|Any|||String||

A value of any type can converted to the String primitive type by adding an empty string:

```TypeScript
function getValue() { ... }

var s = getValue() + "";
```

The example above converts the result of 'getValue()' to a string if it isn't a string already. The type inferred for 's' is the String primitive type regardless of the return type of 'getValue'.

### The &lt;, >, &lt;=, >=, ==, !=, ===, and !== operators { #the-comparison-operators }

These operators require one or both of the operand types to be assignable to the other. The result is always of the Boolean primitive type.

||Any|Boolean|Number|String|Other|
|:---:|:---:|:---:|:---:|:---:|:---:|
|Any|Boolean|Boolean|Boolean|Boolean|Boolean|
|Boolean|Boolean|Boolean||||
|Number|Boolean||Boolean|||
|String|Boolean|||Boolean||
|Other|Boolean||||Boolean|

### The instanceof operator { #the-instanceof-operator }

The `instanceof` operator requires the left operand to be of type Any, an object type, or a type parameter type, and the right operand to be of type Any or a subtype of the 'Function' interface type. The result is always of the Boolean primitive type.

Note that object types containing one or more call or construct signatures are automatically subtypes of the 'Function' interface type, as described in section [#object-types]<!--3.3-->.

### The in operator { #the-in-operator }

The `in` operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type, and the right operand to be of type Any, an object type, or a type parameter type. The result is always of the Boolean primitive type.

### The && operator { #the-ampersandampersand-operator }

The && operator permits the operands to be of any type and produces a result of the same type as the second operand.

||Any|Boolean|Number|String|Other|
|:---:|:---:|:---:|:---:|:---:|:---:|
|Any|Any|Boolean|Number|String|Other|
|Boolean|Any|Boolean|Number|String|Other|
|Number|Any|Boolean|Number|String|Other|
|String|Any|Boolean|Number|String|Other|
|Other|Any|Boolean|Number|String|Other|

### The || operator { #the-barbar-operator }

The || operator permits the operands to be of any type.

If the || expression is contextually typed (section [#contextually-typed-expressions]<!--4.23-->), the operands are contextually typed by the same type. Otherwise, the left operand is not contextually typed and the right operand is contextually typed by the type of the left operand.

The type of the result is the union type of the two operand types.

||Any|Boolean|Number|String|Other|
|:---:|:---:|:---:|:---:|:---:|:---:|
|Any|Any|Any|Any|Any|Any|
|Boolean|Any|Boolean|N | B|S | B|B | O|
|Number|Any|N | B|Number|S | N|N | O|
|String|Any|S | B|S | N|String|S | O|
|Other|Any|B | O|N | O|S | O|Other|

## The Conditional Operator { #the-conditional-operator }

In a conditional expression of the form

```TypeScript
test ? expr1 : expr2
```

the *test* expression may be of any type.

If the conditional expression is contextually typed (section [#contextually-typed-expressions]<!--4.23-->), *expr1* and *expr2* are contextually typed by the same type. Otherwise, *expr1* and *expr2* are not contextually typed.

The type of the result is the union type of the types of *expr1* and *expr2*.

## Assignment Operators { #assignment-operators }

An assignment of the form

```TypeScript
v = expr
```

requires *v* to be classified as a reference (section [#values-and-references]<!--4.1-->) or as an assignment pattern (section [#destructuring-assignment]<!--4.21.1-->). The *expr* expression is contextually typed (section [#contextually-typed-expressions]<!--4.23-->) by the type of *v*, and the type of *expr* must be assignable to (section [#assignment-compatibility]<!--3.11.4-->) the type of *v*, or otherwise a compile-time error occurs. The result is a value with the type of *expr*.

A compound assignment of the form

```TypeScript
v ??= expr
```

where ??= is one of the compound assignment operators

```TypeScript
*=   /=   %=   +=   -=   <<=   >>=   >>>=   &=   ^=   |=
```

is subject to the same requirements, and produces a value of the same type, as the corresponding non-compound operation. A compound assignment furthermore requires *v* to be classified as a reference (section [#values-and-references]<!--4.1-->) and the type of the non-compound operation to be assignable to the type of *v*. Note that *v* is not permitted to be an assignment pattern in a compound assignment.

### Destructuring Assignment { #destructuring-assignment }

A ***destructuring assignment*** is an assignment operation in which the left hand operand is a destructuring assignment pattern as defined by the *AssignmentPattern* production in the ECMAScript 2015 specification.

In a destructuring assignment expression, the type of the expression on the right must be assignable to the assignment target on the left. An expression of type *S* is considered assignable to an assignment target *V* if one of the following is true:

* *V* is variable and *S* is assignable to the type of *V*.
* *V* is an object assignment pattern and, for each assignment property *P* in *V*,
  * *S* is the type Any, or
  * *S* has an apparent property with the property name specified in *P* of a type that is assignable to the target given in *P*, or
  * *P* specifies a numeric property name and *S* has a numeric index signature of a type that is assignable to the target given in *P*, or
  * *S* has a string index signature of a type that is assignable to the target given in *P*.
* *V* is an array assignment pattern, *S* is the type Any or an array-like type (section [#array-types]<!--3.3.2-->), and, for each assignment element *E* in *V*,
  * *S* is the type Any, or
  * *S* is a tuple-like type (section [#tuple-types]<!--3.3.3-->) with a property named *N* of a type that is assignable to the target given in *E*, where *N* is the numeric index of *E* in the array assignment pattern, or
  * *S* is not a tuple-like type and the numeric index signature type of *S* is assignable to the target given in *E*.

*TODO: [Update to specify behavior when assignment element E is a rest element](https://github.com/Microsoft/TypeScript/issues/2713)*.

In an assignment property or element that includes a default value, the type of the default value must be assignable to the target given in the assignment property or element.

When the output target is ECMAScript 2015 or higher, destructuring variable assignments remain unchanged in the emitted JavaScript code. When the output target is ECMAScript 3 or 5, destructuring variable assignments are rewritten to series of simple assignments. For example, the destructuring assignment

```TypeScript
var x = 1;
var y = 2;
[x, y] = [y, x];
```

is rewritten to the simple variable assignments

```TypeScript
var x = 1;
var y = 2;
_a = [y, x], x = _a[0], y = _a[1];
var _a;
```

## The Comma Operator { #the-comma-operator }

The comma operator permits the operands to be of any type and produces a result that is of the same type as the second operand.

## Contextually Typed Expressions { #contextually-typed-expressions }

Type checking of an expression is improved in several contexts by factoring in the type of the destination of the value computed by the expression. In such situations, the expression is said to be ***contextually typed*** by the type of the destination. An expression is contextually typed in the following circumstances:

* In a variable, parameter, binding property, binding element, or member declaration, an initializer expression is contextually typed by
  * the type given in the declaration's type annotation, if any, or otherwise
  * for a parameter, the type provided by a contextual signature (section [#function-expressions]<!--4.10-->), if any, or otherwise
  * the type implied by the binding pattern in the declaration (section [#implied-type]<!--5.2.3-->), if any.
* In the body of a function declaration, function expression, arrow function, method declaration, or get accessor declaration that has a return type annotation, return expressions are contextually typed by the type given in the return type annotation.
* In the body of a function expression or arrow function that has no return type annotation, if the function expression or arrow function is contextually typed by a function type with exactly one call signature, and if that call signature is non-generic, return expressions are contextually typed by the return type of that call signature.
* In the body of a constructor declaration, return expressions are contextually typed by the containing class type.
* In the body of a get accessor with no return type annotation, if a matching set accessor exists and that set accessor has a parameter type annotation, return expressions are contextually typed by the type given in the set accessor's parameter type annotation.
* In a typed function call, argument expressions are contextually typed by their corresponding parameter types.
* In a contextually typed object literal, each property value expression is contextually typed by
  * the type of the property with a matching name in the contextual type, if any, or otherwise
  * for a numerically named property, the numeric index type of the contextual type, if any, or otherwise
  * the string index type of the contextual type, if any.
* In a contextually typed array literal expression containing no spread elements, an element expression at index *N* is contextually typed by
  * the type of the property with the numeric name *N* in the contextual type, if any, or otherwise
  * the numeric index type of the contextual type, if any.
* In a contextually typed array literal expression containing one or more spread elements, an element expression at index *N* is contextually typed by the numeric index type of the contextual type, if any.
* In a contextually typed parenthesized expression, the contained expression is contextually typed by the same type.
* In a type assertion, the expression is contextually typed by the indicated type.
* In a || operator expression, if the expression is contextually typed, the operands are contextually typed by the same type. Otherwise, the right expression is contextually typed by the type of the left expression.
* In a contextually typed conditional operator expression, the operands are contextually typed by the same type.
* In an assignment expression, the right hand expression is contextually typed by the type of the left hand expression.

In the following example

```TypeScript
interface EventObject {
    x: number;
    y: number;
}

interface EventHandlers {
    mousedown?: (event: EventObject) => void;
    mouseup?: (event: EventObject) => void;
    mousemove?: (event: EventObject) => void;
}

function setEventHandlers(handlers: EventHandlers) { ... }

setEventHandlers({
    mousedown: e => { startTracking(e.x, e.y); },
    mouseup: e => { endTracking(); }
});
```

the object literal passed to 'setEventHandlers' is contextually typed to the 'EventHandlers' type. This causes the two property assignments to be contextually typed to the unnamed function type '(event: EventObject) => void', which in turn causes the 'e' parameters in the arrow function expressions to automatically be typed as 'EventObject'.

## Type Guards { #type-guards }

Type guards are particular expression patterns involving the 'typeof' and 'instanceof' operators that cause the types of variables or parameters to be ***narrowed*** to more specific types. For example, in the code below, knowledge of the static type of 'x' in combination with a 'typeof' check makes it safe to narrow the type of 'x' to string in the first branch of the 'if' statement and number in the second branch of the 'if' statement.

```TypeScript
function foo(x: number | string) {
    if (typeof x === "string") {
        return x.length;  // x has type string here
    }
    else {
        return x + 1;     // x has type number here
    }
}
```

The type of a variable or parameter is narrowed in the following situations:

* In the true branch statement of an 'if' statement, the type of a variable or parameter is *narrowed* by a type guard in the 'if' condition *when true*, provided no part of the 'if' statement contains assignments to the variable or parameter.
* In the false branch statement of an 'if' statement, the type of a variable or parameter is *narrowed* by a type guard in the 'if' condition *when false*, provided no part of the 'if' statement contains assignments to the variable or parameter.
* In the true expression of a conditional expression, the type of a variable or parameter is *narrowed* by a type guard in the condition *when true*, provided no part of the conditional expression contains assignments to the variable or parameter.
* In the false expression of a conditional expression, the type of a variable or parameter is *narrowed* by a type guard in the condition *when false*, provided no part of the conditional expression contains assignments to the variable or parameter.
* In the right operand of a && operation, the type of a variable or parameter is *narrowed* by a type guard in the left operand *when true*, provided neither operand contains assignments to the variable or parameter.
* In the right operand of a || operation, the type of a variable or parameter is *narrowed* by a type guard in the left operand *when false*, provided neither operand contains assignments to the variable or parameter.

A type guard is simply an expression that follows a particular pattern. The process of narrowing the type of a variable *x* by a type guard *when true* or *when false* depends on the type guard as follows:

* A type guard of the form `x instanceof C`, where *x* is not of type Any, *C* is of a subtype of the global type 'Function', and *C* has a property named 'prototype'
  * *when true*, narrows the type of *x* to the type of the 'prototype' property in *C* provided it is a subtype of the type of *x*, or, if the type of *x* is a union type, removes from the type of *x* all constituent types that aren't subtypes of the type of the 'prototype' property in *C*, or
  * *when false*, has no effect on the type of *x*.
* A type guard of the form `typeof x === s`, where *s* is a string literal with the value 'string', 'number', or 'boolean',
  * *when true*, narrows the type of *x* to the given primitive type provided it is a subtype of the type of *x*, or, if the type of *x* is a union type, removes from the type of *x* all constituent types that aren't subtypes of the given primitive type, or
  * *when false*, removes the primitive type from the type of *x*.
* A type guard of the form `typeof x === s`, where *s* is a string literal with any value but 'string', 'number', or 'boolean',
  * *when true*, if *x* is a union type, removes from the type of *x* all constituent types that are subtypes of the string, number, or boolean primitive type, or
  * *when false*, has no effect on the type of *x*.
* A type guard of the form `typeof x !== s`, where *s* is a string literal,
  * *when true*, narrows the type of x by `typeof x === s` *when false*, or
  * *when false*, narrows the type of x by `typeof x === s` *when true*.
* A type guard of the form `!expr`
  * *when true*, narrows the type of *x* by *expr* *when false*, or
  * *when false*, narrows the type of *x* by *expr* *when true*.
* A type guard of the form `expr1 && expr2`
  * *when true*, narrows the type of *x* by *expr<sub>1</sub>* *when true* and then by *expr<sub>2</sub>* *when true*, or
  * *when false*, narrows the type of *x* to *T<sub>1</sub>* | *T<sub>2</sub>*, where *T<sub>1</sub>* is the type of *x* narrowed by *expr<sub>1</sub>* *when false*, and *T<sub>2</sub>* is the type of *x* narrowed by *expr<sub>1</sub>* *when true* and then by *expr<sub>2</sub>* *when false*.
* A type guard of the form `expr1 || expr2`
  * *when true*, narrows the type of *x* to *T<sub>1</sub>* | *T<sub>2</sub>*, where *T<sub>1</sub>* is the type of *x* narrowed by *expr<sub>1</sub>* *when true*, and *T<sub>2</sub>* is the type of *x* narrowed by *expr<sub>1</sub>* *when false* and then by *expr<sub>2</sub>* *when true*, or
  * *when false*, narrows the type of *x* by *expr<sub>1</sub>* *when false* and then by *expr<sub>2</sub>* *when false*.
* A type guard of any other form has no effect on the type of *x*.

In the rules above, when a narrowing operation would remove all constituent types from a union type, the operation has no effect on the union type.

Note that type guards affect types of variables and parameters only and have no effect on members of objects such as properties. Also note that it is possible to defeat a type guard by calling a function that changes the type of the guarded variable.

*TODO: Document [user defined type guard functions](https://github.com/Microsoft/TypeScript/issues/1007)*.

In the example

```TypeScript
function isLongString(obj: any) {
    return typeof obj === "string" && obj.length > 100;
}
```

the `obj` parameter has type `string` in the right operand of the && operator.

In the example

```TypeScript
function processValue(value: number | (() => number)) {
    var x = typeof value !== "number" ? value() : value;
    // Process number in x
}
```

the value parameter has type `() => number` in the first conditional expression and type `number` in the second conditional expression, and the inferred type of x is `number`.

In the example

```TypeScript
function f(x: string | number | boolean) {
    if (typeof x === "string" || typeof x === "number") {
        var y = x;  // Type of y is string | number
    }
    else {
        var z = x;  // Type of z is boolean
    }
}
```

the type of x is `string | number | boolean` in the left operand of the || operator, `number | boolean` in the right operand of the || operator, `string | number` in the first branch of the if statement, and `boolean` in the second branch of the if statement.

In the example

```TypeScript
class C {
    data: string | string[];
    getData() {
        var data = this.data;
        return typeof data === "string" ? data : data.join(" ");
    }
}
```

the type of the `data` variable is `string` in the first conditional expression and `string[]` in the second conditional expression, and the inferred type of `getData` is `string`. Note that the `data` property must be copied to a local variable for the type guard to have an effect.

In the example

```TypeScript
class NamedItem {
    name: string;
}

function getName(obj: Object) {
    return obj instanceof NamedItem ? obj.name : "unknown";
}
```

the type of `obj` is narrowed to `NamedItem` in the first conditional expression, and the inferred type of the `getName` function is `string`.

<br/>
