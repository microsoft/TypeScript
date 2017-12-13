# Types { #types }

TypeScript adds optional static types to JavaScript. Types are used to place static constraints on program entities such as functions, variables, and properties so that compilers and development tools can offer better verification and assistance during software development. TypeScript's *static* compile-time type system closely models the *dynamic* run-time type system of JavaScript, allowing programmers to accurately express the type relationships that are expected to exist when their programs run and have those assumptions pre-validated by the TypeScript compiler. TypeScript's type analysis occurs entirely at compile-time and adds no run-time overhead to program execution.

All types in TypeScript are subtypes of a single top type called the Any type. The `any` keyword references this type. The Any type is the one type that can represent *any* JavaScript value with no constraints. All other types are categorized as ***primitive types***, ***object types***, ***union types***, ***intersection types***, or ***type parameters***. These types introduce various static constraints on their values.

The primitive types are the Number, Boolean, String, Symbol, Void, Null, and Undefined types along with user defined enum types. The `number`, `boolean`, `string`, `symbol`, and `void` keywords reference the Number, Boolean, String, Symbol, and Void primitive types respectively. The Void type exists purely to indicate the absence of a value, such as in a function with no return value. It is not possible to explicitly reference the Null and Undefined types—only *values* of those types can be referenced, using the `null` and `undefined` literals.

The object types are all class, interface, array, tuple, function, and constructor types. Class and interface types are introduced through class and interface declarations and are referenced by the name given to them in their declarations. Class and interface types may be ***generic types*** which have one or more type parameters.

Union types represent values that have one of multiple types, and intersection types represent values that simultaneously have more than one type.

Declarations of classes, properties, functions, variables and other language entities associate types with those entities. The mechanism by which a type is formed and associated with a language entity depends on the particular kind of entity. For example, a namespace declaration associates the namespace with an anonymous type containing a set of properties corresponding to the exported variables and functions in the namespace, and a function declaration associates the function with an anonymous type containing a call signature corresponding to the parameters and return type of the function. Types can be associated with variables through explicit ***type annotations***, such as

```TypeScript
var x: number;
```

or through implicit ***type inference***, as in

```TypeScript
var x = 1;
```

which infers the type of 'x' to be the Number primitive type because that is the type of the value used to initialize 'x'.

## The Any Type { #the-any-type }

The Any type is used to represent any JavaScript value. A value of the Any type supports the same operations as a value in JavaScript and minimal static type checking is performed for operations on Any values. Specifically, properties of any name can be accessed through an Any value and Any values can be called as functions or constructors with any argument list.

The `any` keyword references the Any type. In general, in places where a type is not explicitly provided and TypeScript cannot infer one, the Any type is assumed.

The Any type is a supertype of all types, and is assignable to and from all types.

Some examples:

```TypeScript
var x: any;             // Explicitly typed
var y;                  // Same as y: any
var z: { a; b; };       // Same as z: { a: any; b: any; }

function f(x) {         // Same as f(x: any): void
    console.log(x);
}
```

## Primitive Types { #primitive-types }

The primitive types are the Number, Boolean, String, Symbol, Void, Null, and Undefined types and all user defined enum types.

### The Number Type { #the-number-type }

The Number primitive type corresponds to the similarly named JavaScript primitive type and represents double-precision 64-bit format IEEE 754 floating point values.

The `number` keyword references the Number primitive type and numeric literals may be used to write values of the Number primitive type.

For purposes of determining type relationships (section [#type-relationships]<!--3.11-->) and accessing properties (section [#property-access]<!--4.13-->), the Number primitive type behaves as an object type with the same properties as the global interface type 'Number'.

Some examples:

```TypeScript
var x: number;          // Explicitly typed
var y = 0;              // Same as y: number = 0
var z = 123.456;        // Same as z: number = 123.456
var s = z.toFixed(2);   // Property of Number interface
```

### The Boolean Type { #the-boolean-type }

The Boolean primitive type corresponds to the similarly named JavaScript primitive type and represents logical values that are either true or false.

The `boolean` keyword references the Boolean primitive type and the `true` and `false` literals reference the two Boolean truth values.

For purposes of determining type relationships (section [#type-relationships]<!--3.11-->) and accessing properties (section [#property-access]<!--4.13-->), the Boolean primitive type behaves as an object type with the same properties as the global interface type 'Boolean'.

Some examples:

```TypeScript
var b: boolean;         // Explicitly typed
var yes = true;         // Same as yes: boolean = true
var no = false;         // Same as no: boolean = false
```

### The String Type { #the-string-type }

The String primitive type corresponds to the similarly named JavaScript primitive type and represents sequences of characters stored as Unicode UTF-16 code units.

The `string` keyword references the String primitive type and string literals may be used to write values of the String primitive type.

For purposes of determining type relationships (section [#type-relationships]<!--3.11-->) and accessing properties (section [#property-access]<!--4.13-->), the String primitive type behaves as an object type with the same properties as the global interface type 'String'.

Some examples:

```TypeScript
var s: string;          // Explicitly typed
var empty = "";         // Same as empty: string = ""
var abc = 'abc';        // Same as abc: string = "abc"
var c = abc.charAt(2);  // Property of String interface
```

### The Symbol Type { #the-symbol-type }

The Symbol primitive type corresponds to the similarly named JavaScript primitive type and represents unique tokens that may be used as keys for object properties.

The `symbol` keyword references the Symbol primitive type. Symbol values are obtained using the global object 'Symbol' which has a number of methods and properties and can be invoked as a function. In particular, the global object 'Symbol' defines a number of well-known symbols ([#computed-property-names]<!--2.2.3-->) that can be used in a manner similar to identifiers. Note that the 'Symbol' object is available only in ECMAScript 2015 environments.

For purposes of determining type relationships (section [#type-relationships]<!--3.11-->) and accessing properties (section [#property-access]<!--4.13-->), the Symbol primitive type behaves as an object type with the same properties as the global interface type 'Symbol'.

Some examples:

```TypeScript
var secretKey = Symbol();
var obj = {};
obj[secretKey] = "secret message";  // Use symbol as property key
obj[Symbol.toStringTag] = "test";   // Use of well-known symbol
```

### The Void Type { #the-void-type }

The Void type, referenced by the `void` keyword, represents the absence of a value and is used as the return type of functions with no return value.

The only possible values for the Void type are `null` and `undefined`. The Void type is a subtype of the Any type and a supertype of the Null and Undefined types, but otherwise Void is unrelated to all other types.

*NOTE: We might consider disallowing declaring variables of type Void as they serve no useful purpose. However, because Void is permitted as a type argument to a generic type or function it is not feasible to disallow Void properties or parameters*.

### The Null Type { #the-null-type }

The Null type corresponds to the similarly named JavaScript primitive type and is the type of the `null` literal.

The `null` literal references the one and only value of the Null type. It is not possible to directly reference the Null type itself.

The Null type is a subtype of all types, except the Undefined type. This means that `null` is considered a valid value for all primitive types, object types, union types, intersection types, and type parameters, including even the Number and Boolean primitive types.

Some examples:

```TypeScript
var n: number = null;   // Primitives can be null
var x = null;           // Same as x: any = null
var e: Null;            // Error, can't reference Null type
```

### The Undefined Type { #the-undefined-type }

The Undefined type corresponds to the similarly named JavaScript primitive type and is the type of the `undefined` literal.

The `undefined` literal denotes the value given to all uninitialized variables and is the one and only value of the Undefined type. It is not possible to directly reference the Undefined type itself.

The undefined type is a subtype of all types. This means that `undefined` is considered a valid value for all primitive types, object types, union types, intersection types, and type parameters.

Some examples:

```TypeScript
var n: number;          // Same as n: number = undefined
var x = undefined;      // Same as x: any = undefined
var e: Undefined;       // Error, can't reference Undefined type
```

### Enum Types { #enum-types }

Enum types are distinct user defined subtypes of the Number primitive type. Enum types are declared using enum declarations (section [#enum-declarations]<!--9.1-->) and referenced using type references (section [#type-references]<!--3.8.2-->).

Enum types are assignable to the Number primitive type, and vice versa, but different enum types are not assignable to each other.

### String Literal Types { #string-literal-types }

Specialized signatures (section [#specialized-signatures]<!--3.9.2.4-->) permit string literals to be used as types in parameter type annotations. String literal types are permitted only in that context and nowhere else.

All string literal types are subtypes of the String primitive type.

*TODO: Update to reflect [expanded support for string literal types](https://github.com/Microsoft/TypeScript/pull/5185)*.

## Object Types { #object-types }

Object types are composed from properties, call signatures, construct signatures, and index signatures, collectively called members.

Class and interface type references, array types, tuple types, function types, and constructor types are all classified as object types. Multiple constructs in the TypeScript language create object types, including:

* Object type literals (section [#object-type-literals]<!--3.8.3-->).
* Array type literals (section [#array-type-literals]<!--3.8.4-->).
* Tuple type literals (section [#tuple-type-literals]<!--3.8.5-->).
* Function type literals (section [#function-type-literals]<!--3.8.8-->).
* Constructor type literals (section [#constructor-type-literals]<!--3.8.9-->).
* Object literals (section [#object-literals]<!--4.5-->).
* Array literals (section [#array-literals]<!--4.6-->).
* Function expressions (section [#function-expressions]<!--4.10-->) and function declarations ([#function-declarations]<!--6.1-->).
* Constructor function types created by class declarations (section [#constructor-function-types]<!--8.2.5-->).
* Namespace instance types created by namespace declarations (section [#import-alias-declarations]<!--10.3-->).

### Named Type References { #named-type-references }

Type references (section [#type-references]<!--3.8.2-->) to class and interface types are classified as object types. Type references to generic class and interface types include type arguments that are substituted for the type parameters of the class or interface to produce an actual object type.

### Array Types { #array-types }

***Array types*** represent JavaScript arrays with a common element type. Array types are named type references created from the generic interface type 'Array' in the global namespace with the array element type as a type argument. Array type literals (section [#array-type-literals]<!--3.8.4-->) provide a shorthand notation for creating such references.

The declaration of the 'Array' interface includes a property 'length' and a numeric index signature for the element type, along with other members:

```TypeScript
interface Array<T> {
    length: number;
    [x: number]: T;
    // Other members
}
```

Array literals (section [#array-literals]<!--4.6-->) may be used to create values of array types. For example

```TypeScript
var a: string[] = ["hello", "world"];
```

A type is said to be an ***array-like type*** if it is assignable (section [#assignment-compatibility]<!--3.11.4-->) to the type `any[]`.

### Tuple Types { #tuple-types }

***Tuple types*** represent JavaScript arrays with individually tracked element types. Tuple types are written using tuple type literals (section [#tuple-type-literals]<!--3.8.5-->). A tuple type combines a set of numerically named properties with the members of an array type. Specifically, a tuple type

```TypeScript
[ T0, T1, ..., Tn ]
```

combines the set of properties

```TypeScript
{
    0: T0;
    1: T1;
    ...
    n: Tn;
}
```

with the members of an array type whose element type is the union type (section [#union-types]<!--3.4-->) of the tuple element types.

Array literals (section [#array-literals]<!--4.6-->) may be used to create values of tuple types. For example:

```TypeScript
var t: [number, string] = [3, "three"];
var n = t[0];  // Type of n is number
var s = t[1];  // Type of s is string
var i: number;
var x = t[i];  // Type of x is number | string
```

Named tuple types can be created by declaring interfaces that derive from Array&lt;T> and introduce numerically named properties. For example:

```TypeScript
interface KeyValuePair<K, V> extends Array<K | V> { 0: K; 1: V; }

var x: KeyValuePair<number, string> = [10, "ten"];
```

A type is said to be a ***tuple-like type*** if it has a property with the numeric name '0'.

### Function Types { #function-types }

An object type containing one or more call signatures is said to be a ***function type***. Function types may be written using function type literals (section [#function-type-literals]<!--3.8.8-->) or by including call signatures in object type literals.

### Constructor Types { #constructor-types }

An object type containing one or more construct signatures is said to be a ***constructor type***. Constructor types may be written using constructor type literals (section [#constructor-type-literals]<!--3.8.9-->) or by including construct signatures in object type literals.

### Members { #members }

Every object type is composed from zero or more of the following kinds of members:

* ***Properties***, which define the names and types of the properties of objects of the given type. Property names are unique within their type.
* ***Call signatures***, which define the possible parameter lists and return types associated with applying call operations to objects of the given type.
* ***Construct signatures***, which define the possible parameter lists and return types associated with applying the `new` operator to objects of the given type.
* ***Index signatures***, which define type constraints for properties in the given type. An object type can have at most one string index signature and one numeric index signature.

Properties are either ***public***, ***private***, or ***protected*** and are either ***required*** or ***optional***:

* Properties in a class declaration may be designated public, private, or protected, while properties declared in other contexts are always considered public. Private members are only accessible within their declaring class, as described in section [#accessibility]<!--8.2.2-->, and private properties match only themselves in subtype and assignment compatibility checks, as described in section [#type-relationships]<!--3.11-->. Protected members are only accessible within their declaring class and classes derived from it, as described in section [#accessibility]<!--8.2.2-->, and protected properties match only themselves and overrides in subtype and assignment compatibility checks, as described in section [#type-relationships]<!--3.11-->.
* Properties in an object type literal or interface declaration may be designated required or optional, while properties declared in other contexts are always considered required. Properties that are optional in the target type of an assignment may be omitted from source objects, as described in section [#assignment-compatibility]<!--3.11.4-->.

Call and construct signatures may be ***specialized*** (section [#specialized-signatures]<!--3.9.2.4-->) by including parameters with string literal types. Specialized signatures are used to express patterns where specific string values for some parameters cause the types of other parameters or the function result to become further specialized.

## Union Types { #union-types }

***Union types*** represent values that may have one of several distinct representations. A value of a union type *A* | *B* is a value that is *either* of type *A* or type *B*. Union types are written using union type literals (section [#union-type-literals]<!--3.8.6-->).

A union type encompasses an ordered set of constituent types. While it is generally true that *A* | *B* is equivalent to *B* | *A*, the order of the constituent types may matter when determining the call and construct signatures of the union type.

Union types have the following subtype relationships:

* A union type *U* is a subtype of a type *T* if each type in *U* is a subtype of *T*.
* A type *T* is a subtype of a union type *U* if *T* is a subtype of any type in *U*.

Similarly, union types have the following assignability relationships:

* A union type *U* is assignable to a type *T* if each type in *U* is assignable to *T*.
* A type *T* is assignable to a union type *U* if *T* is assignable to any type in *U*.

The || and conditional operators (section [#the-||-operator]<!--4.19.7--> and [#the-conditional-operator]<!--4.20-->) may produce values of union types, and array literals (section [#array-literals]<!--4.6-->) may produce array values that have union types as their element types.

Type guards (section [#type-guards]<!--4.24-->) may be used to narrow a union type to a more specific type. In particular, type guards are useful for narrowing union type values to a non-union type values.

In the example

```TypeScript
var x: string | number;
var test: boolean;
x = "hello";            // Ok
x = 42;                 // Ok
x = test;               // Error, boolean not assignable
x = test ? 5 : "five";  // Ok
x = test ? 0 : false;   // Error, number | boolean not assignable
```

it is possible to assign 'x' a value of type `string`, `number`, or the union type `string | number`, but not any other type. To access a value in 'x', a type guard can be used to first narrow the type of 'x' to either `string` or `number`:

```TypeScript
var n = typeof x === "string" ? x.length : x;  // Type of n is number
```

For purposes of property access and function calls, the apparent members (section [#apparent-members]<!--3.11.1-->) of a union type are those that are present in every one of its constituent types, with types that are unions of the respective apparent members in the constituent types. The following example illustrates the merging of member types that occurs when union types are created from object types.

```TypeScript
interface A {
    a: string;
    b: number;
}

interface B {
    a: number;
    b: number;
    c: number;
}

var x: A | B;
var a = x.a;  // a has type string | number
var b = x.b;  // b has type number
var c = x.c;  // Error, no property c in union type
```

Note that 'x.a' has a union type because the type of 'a' is different in 'A' and 'B', whereas 'x.b' simply has type number because that is the type of 'b' in both 'A' and 'B'. Also note that there is no property 'x.c' because only 'B' has a property 'c'.

When used as a contextual type (section [#contextually-typed-expressions]<!--4.23-->), a union type has those members that are present in any of its constituent types, with types that are unions of the respective members in the constituent types. Specifically, a union type used as a contextual type has the apparent members defined in section [#apparent-members]<!--3.11.1-->, except that a particular member need only be present in one or more constituent types instead of all constituent types.

## Intersection Types { #intersection-types }

***Intersection types*** represent values that simultaneously have multiple types. A value of an intersection type *A* & *B* is a value that is *both* of type *A* and type *B*. Intersection types are written using intersection type literals (section [#intersection-type-literals]<!--3.8.7-->).

An intersection type encompasses an ordered set of constituent types. While it is generally true that *A* & *B* is equivalent to *B* & *A*, the order of the constituent types may matter when determining the call and construct signatures of the intersection type.

Intersection types have the following subtype relationships:

* An intersection type *I* is a subtype of a type *T* if any type in *I* is a subtype of *T*.
* A type *T* is a subtype of an intersection type *I* if *T* is a subtype of each type in *I*.

Similarly, intersection types have the following assignability relationships:

* An intersection type *I* is assignable to a type *T* if any type in *I* is assignable to *T*.
* A type *T* is assignable to an intersection type *I* if *T* is assignable to each type in *I*.

For purposes of property access and function calls, the apparent members (section [#apparent-members]<!--3.11.1-->) of an intersection type are those that are present in one or more of its constituent types, with types that are intersections of the respective apparent members in the constituent types. The following examples illustrate the merging of member types that occurs when intersection types are created from object types.

```TypeScript
interface A { a: number }
interface B { b: number }

var ab: A & B = { a: 1, b: 1 };
var a: A = ab;  // A & B assignable to A
var b: B = ab;  // A & B assignable to B

interface X { p: A }
interface Y { p: B }

var xy: X & Y = { p: ab };  // X & Y has property p of type A & B

type F1 = (a: string, b: string) => void;
type F2 = (a: number, b: number) => void;

var f: F1 & F2 = (a: string | number, b: string | number) => { };
f("hello", "world");  // Ok
f(1, 2);              // Ok
f(1, "test");         // Error
```

The union and intersection type operators can be applied to type parameters. This capability can for example be used to model functions that merge objects:

```TypeScript
function extend<T, U>(first: T, second: U): T & U {
    // Extend first with properties of second
}

var x = extend({ a: "hello" }, { b: 42 });
var s = x.a;
var n = x.b;
```

It is possible to create intersection types for which no values other than null or undefined are possible. For example, intersections of primitive types such as `string & number` fall into this category.

## Type Parameters { #type-parameters }

A type parameter represents an actual type that the parameter is bound to in a generic type reference or a generic function call. Type parameters have constraints that establish upper bounds for their actual type arguments.

Since a type parameter represents a multitude of different type arguments, type parameters have certain restrictions compared to other types. In particular, a type parameter cannot be used as a base class or interface.

### Type Parameter Lists { #type-parameter-lists }

Class, interface, type alias, and function declarations may optionally include lists of type parameters enclosed in &lt; and > brackets. Type parameters are also permitted in call signatures of object, function, and constructor type literals.

&emsp;&emsp;*TypeParameters:*
&emsp;&emsp;&emsp;`<`&emsp;*TypeParameterList*&emsp;`>`

&emsp;&emsp;*TypeParameterList:*
&emsp;&emsp;&emsp;*TypeParameter*
&emsp;&emsp;&emsp;*TypeParameterList*&emsp;`,`&emsp;*TypeParameter*

&emsp;&emsp;*TypeParameter:*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;*Constraint<sub>opt</sub>*

&emsp;&emsp;*Constraint:*
&emsp;&emsp;&emsp;`extends`&emsp;*Type*

Type parameter names must be unique. A compile-time error occurs if two or more type parameters in the same *TypeParameterList* have the same name.

The scope of a type parameter extends over the entire declaration with which the type parameter list is associated, with the exception of static member declarations in classes.

A type parameter may have an associated type parameter ***constraint*** that establishes an upper bound for type arguments. Type parameters may be referenced in type parameter constraints within the same type parameter list, including even constraint declarations that occur to the left of the type parameter.

The ***base constraint*** of a type parameter *T* is defined as follows:

* If *T* has no declared constraint, *T*'s base constraint is the empty object type `{}`.
* If *T*'s declared constraint is a type parameter, *T*'s base constraint is that of the type parameter.
* Otherwise, *T*'s base constraint is *T*'s declared constraint.

In the example

```TypeScript
interface G<T, U extends V, V extends Function> { }
```

the base constraint of 'T' is the empty object type and the base constraint of 'U' and 'V' is 'Function'.

For purposes of determining type relationships (section [#type-relationships]<!--3.11-->), type parameters appear to be subtypes of their base constraint. Likewise, in property accesses (section [#property-access]<!--4.13-->), `new` operations (section [#the-new-operator]<!--4.14-->), and function calls (section [#function-calls]<!--4.15-->), type parameters appear to have the members of their base constraint, but no other members.

It is an error for a type parameter to directly or indirectly be a constraint for itself. For example, both of the following declarations are invalid:

```TypeScript
interface A<T extends T> { }

interface B<T extends U, U extends T> { }
```

### Type Argument Lists { #type-argument-lists }

A type reference (section [#type-references]<!--3.8.2-->) to a generic type must include a list of type arguments enclosed in angle brackets and separated by commas. Similarly, a call (section [#function-calls]<!--4.15-->) to a generic function may explicitly include a type argument list instead of relying on type inference.

&emsp;&emsp;*TypeArguments:*
&emsp;&emsp;&emsp;`<`&emsp;*TypeArgumentList*&emsp;`>`

&emsp;&emsp;*TypeArgumentList:*
&emsp;&emsp;&emsp;*TypeArgument*
&emsp;&emsp;&emsp;*TypeArgumentList*&emsp;`,`&emsp;*TypeArgument*

&emsp;&emsp;*TypeArgument:*
&emsp;&emsp;&emsp;*Type*

Type arguments correspond one-to-one with type parameters of the generic type or function being referenced. A type argument list is required to specify exactly one type argument for each corresponding type parameter, and each type argument for a constrained type parameter is required to ***satisfy*** the constraint of that type parameter. A type argument satisfies a type parameter constraint if the type argument is assignable to (section [#assignment-compatibility]<!--3.11.4-->) the constraint type once type arguments are substituted for type parameters.

Given the declaration

```TypeScript
interface G<T, U extends Function> { }
```

a type reference of the form 'G&lt;A, B>' places no requirements on 'A' but requires 'B' to be assignable to 'Function'.

The process of substituting type arguments for type parameters in a generic type or generic signature is known as ***instantiating*** the generic type or signature. Instantiation of a generic type or signature can fail if the supplied type arguments do not satisfy the constraints of their corresponding type parameters.

### This-types { #this-types }

Every class and interface has a ***this-type*** that represents the actual type of instances of the class or interface within the declaration of the class or interface. The this-type is referenced using the keyword `this` in a type position. Within instance methods and constructors of a class, the type of the expression `this` (section [#the-this-keyword]<!--4.2-->) is the this-type of the class.

Classes and interfaces support inheritance and therefore the instance represented by `this` in a method isn't necessarily an instance of the containing class—it may in fact be an instance of a derived class or interface. To model this relationship, the this-type of a class or interface is classified as a type parameter. Unlike other type parameters, it is not possible to explicitly pass a type argument for a this-type. Instead, in a type reference to a class or interface type, the type reference *itself* is implicitly passed as a type argument for the this-type. For example:

```TypeScript
class A {
    foo() {
        return this;
    }
}

class B extends A {
    bar() {
        return this;
    }
}

let b: B;
let x = b.foo().bar();  // Fluent pattern works, type of x is B
```

In the declaration of `b` above, the type reference `B` is itself passed as a type argument for B's this-type. Thus, the referenced type is an instantiation of class `B` where all occurrences of the type `this` are replaced with `B`, and for that reason the `foo` method of `B` actually returns `B` (as opposed to `A`).

The this-type of a given class or interface type *C* implicitly has a constraint consisting of a type reference to *C* with *C*'s own type parameters passed as type arguments and with that type reference passed as the type argument for the this-type.

## Named Types { #named-types }

Classes, interfaces, enums, and type aliases are ***named types*** that are introduced through class declarations (section [#class-declarations]<!--8.1-->), interface declarations (section [#interface-declarations]<!--7.1-->), enum declarations ([#enum-declarations]<!--9.1-->), and type alias declarations (section [#type-aliases]<!--3.10-->). Classes, interfaces, and type aliases may have type parameters and are then called ***generic types***. Conversely, named types without type parameters are called ***non-generic types***.

Interface declarations only introduce named types, whereas class declarations introduce named types *and* constructor functions that create instances of implementations of those named types. The named types introduced by class and interface declarations have only minor differences (classes can't declare optional members and interfaces can't declare private or protected members) and are in most contexts interchangeable. In particular, class declarations with only public members introduce named types that function exactly like those created by interface declarations.

Named types are referenced through ***type references*** (section [#type-references]<!--3.8.2-->) that specify a type name and, if applicable, the type arguments to be substituted for the type parameters of the named type.

Named types are technically not types—only *references* to named types are. This distinction is particularly evident with generic types: Generic types are "templates" from which multiple *actual* types can be created by writing type references that supply type arguments to substitute in place of the generic type's type parameters. This substitution process is known as ***instantiating*** a generic type. Only once a generic type is instantiated does it denote an actual type.

TypeScript has a structural type system, and therefore an instantiation of a generic type is indistinguishable from an equivalent manually written expansion. For example, given the declaration

```TypeScript
interface Pair<T1, T2> { first: T1; second: T2; }
```

the type reference

```TypeScript
Pair<string, Entity>
```

is indistinguishable from the type

```TypeScript
{ first: string; second: Entity; }
```

## Specifying Types { #specifying-types }

Types are specified either by referencing their keyword or name, or by writing object type literals, array type literals, tuple type literals, function type literals, constructor type literals, or type queries.

&emsp;&emsp;*Type:*
&emsp;&emsp;&emsp;*UnionOrIntersectionOrPrimaryType*
&emsp;&emsp;&emsp;*FunctionType*
&emsp;&emsp;&emsp;*ConstructorType*

&emsp;&emsp;*UnionOrIntersectionOrPrimaryType:*
&emsp;&emsp;&emsp;*UnionType*
&emsp;&emsp;&emsp;*IntersectionOrPrimaryType*

&emsp;&emsp;*IntersectionOrPrimaryType:*
&emsp;&emsp;&emsp;*IntersectionType*
&emsp;&emsp;&emsp;*PrimaryType*

&emsp;&emsp;*PrimaryType:*
&emsp;&emsp;&emsp;*ParenthesizedType*
&emsp;&emsp;&emsp;*PredefinedType*
&emsp;&emsp;&emsp;*TypeReference*
&emsp;&emsp;&emsp;*ObjectType*
&emsp;&emsp;&emsp;*ArrayType*
&emsp;&emsp;&emsp;*TupleType*
&emsp;&emsp;&emsp;*TypeQuery*
&emsp;&emsp;&emsp;*ThisType*

&emsp;&emsp;*ParenthesizedType:*
&emsp;&emsp;&emsp;`(`&emsp;*Type*&emsp;`)`

Parentheses are required around union, intersection, function, or constructor types when they are used as array element types; around union, function, or constructor types in intersection types; and around function or constructor types in union types. For example:

```TypeScript
(string | number)[]
((x: string) => string) | ((x: number) => number)
(A | B) & (C | D)
```

The different forms of type notations are described in the following sections.

### Predefined Types { #predefined-types }

The `any`, `number`, `boolean`, `string`, `symbol` and `void` keywords reference the Any type and the Number, Boolean, String, Symbol, and Void primitive types respectively.

&emsp;&emsp;*PredefinedType:*
&emsp;&emsp;&emsp;`any`
&emsp;&emsp;&emsp;`number`
&emsp;&emsp;&emsp;`boolean`
&emsp;&emsp;&emsp;`string`
&emsp;&emsp;&emsp;`symbol`
&emsp;&emsp;&emsp;`void`

The predefined type keywords are reserved and cannot be used as names of user defined types.

### Type References { #type-references }

A type reference references a named type or type parameter through its name and, in the case of a generic type, supplies a type argument list.

&emsp;&emsp;*TypeReference:*
&emsp;&emsp;&emsp;*TypeName*&emsp;*[no LineTerminator here]*&emsp;*TypeArguments<sub>opt</sub>*

&emsp;&emsp;*TypeName:*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*NamespaceName*&emsp;`.`&emsp;*IdentifierReference*

&emsp;&emsp;*NamespaceName:*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*NamespaceName*&emsp;`.`&emsp;*IdentifierReference*

A *TypeReference* consists of a *TypeName* that a references a named type or type parameter. A reference to a generic type must be followed by a list of *TypeArguments* (section [#type-argument-lists]<!--3.6.2-->).

A *TypeName* is either a single identifier or a sequence of identifiers separated by dots. In a type name, all identifiers but the last one refer to namespaces and the last identifier refers to a named type.

Resolution of a *TypeName* consisting of a single identifier is described in section [#scopes]<!--2.4-->.

Resolution of a *TypeName* of the form *N.X*, where *N* is a *NamespaceName* and *X* is an *IdentifierReference*, proceeds by first resolving the namespace name *N*. If the resolution of *N* is successful and the export member set (sections [#export-declarations]<!--10.4--> and [#export-member-set]<!--11.3.4.4-->) of the resulting namespace contains a named type *X*, then *N.X* refers to that member. Otherwise, *N.X* is undefined.

Resolution of a *NamespaceName* consisting of a single identifier is described in section [#scopes]<!--2.4-->. Identifiers declared in namespace declarations (section [#namespace-declarations]<!--10.1-->) or import declarations (sections [#import-alias-declarations]<!--10.3-->, [#import-declarations]<!--11.3.2-->, and [#import-require-declarations]<!--11.3.3-->) may be classified as namespaces.

Resolution of a *NamespaceName* of the form *N.X*, where *N* is a *NamespaceName* and *X* is an *IdentifierReference*, proceeds by first resolving the namespace name *N*. If the resolution of *N* is successful and the export member set (sections [#export-declarations]<!--10.4--> and [#export-member-set]<!--11.3.4.4-->) of the resulting namespace contains an exported namespace member *X*, then *N.X* refers to that member. Otherwise, *N.X* is undefined.

A type reference to a generic type is required to specify exactly one type argument for each type parameter of the referenced generic type, and each type argument must be assignable to (section [#assignment-compatibility]<!--3.11.4-->) the constraint of the corresponding type parameter or otherwise an error occurs. An example:

```TypeScript
interface A { a: string; }

interface B extends A { b: string; }

interface C extends B { c: string; }

interface G<T, U extends B> {
    x: T;
    y: U;
}

var v1: G<A, C>;               // Ok
var v2: G<{ a: string }, C>;   // Ok, equivalent to G<A, C>
var v3: G<A, A>;               // Error, A not valid argument for U
var v4: G<G<A, B>, C>;         // Ok
var v5: G<any, any>;           // Ok
var v6: G<any>;                // Error, wrong number of arguments
var v7: G;                     // Error, no arguments
```

A type argument is simply a *Type* and may itself be a type reference to a generic type, as demonstrated by 'v4' in the example above.

As described in section [#named-types]<!--3.7-->, a type reference to a generic type *G* designates a type wherein all occurrences of *G*'s type parameters have been replaced with the actual type arguments supplied in the type reference. For example, the declaration of 'v1' above is equivalent to:

```TypeScript
var v1: {
    x: { a: string; }
    y: { a: string; b: string; c: string };
};
```

### Object Type Literals { #object-type-literals }

An object type literal defines an object type by specifying the set of members that are statically considered to be present in instances of the type. Object type literals can be given names using interface declarations but are otherwise anonymous.

&emsp;&emsp;*ObjectType:*
&emsp;&emsp;&emsp;`{`&emsp;*TypeBody<sub>opt</sub>*&emsp;`}`

&emsp;&emsp;*TypeBody:*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`;`*<sub>opt</sub>*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`,`*<sub>opt</sub>*

&emsp;&emsp;*TypeMemberList:*
&emsp;&emsp;&emsp;*TypeMember*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`;`&emsp;*TypeMember*
&emsp;&emsp;&emsp;*TypeMemberList*&emsp;`,`&emsp;*TypeMember*

&emsp;&emsp;*TypeMember:*
&emsp;&emsp;&emsp;*PropertySignature*
&emsp;&emsp;&emsp;*CallSignature*
&emsp;&emsp;&emsp;*ConstructSignature*
&emsp;&emsp;&emsp;*IndexSignature*
&emsp;&emsp;&emsp;*MethodSignature*

The members of an object type literal are specified as a combination of property, call, construct, index, and method signatures. Object type members are described in section [#specifying-members]<!--3.9-->.

### Array Type Literals { #array-type-literals }

An array type literal is written as an element type followed by an open and close square bracket.

&emsp;&emsp;*ArrayType:*
&emsp;&emsp;&emsp;*PrimaryType*&emsp;*[no LineTerminator here]*&emsp;`[`&emsp;`]`

An array type literal references an array type (section [#array-types]<!--3.3.2-->) with the given element type. An array type literal is simply shorthand notation for a reference to the generic interface type 'Array' in the global namespace with the element type as a type argument.

When union, intersection, function, or constructor types are used as array element types they must be enclosed in parentheses. For example:

```TypeScript
(string | number)[]
(() => string))[]
```

Alternatively, array types can be written using the 'Array&lt;T>' notation. For example, the types above are equivalent to

```TypeScript
Array<string | number>
Array<() => string>
```

### Tuple Type Literals { #tuple-type-literals }

A tuple type literal is written as a sequence of element types, separated by commas and enclosed in square brackets.

&emsp;&emsp;*TupleType:*
&emsp;&emsp;&emsp;`[`&emsp;*TupleElementTypes*&emsp;`]`

&emsp;&emsp;*TupleElementTypes:*
&emsp;&emsp;&emsp;*TupleElementType*
&emsp;&emsp;&emsp;*TupleElementTypes*&emsp;`,`&emsp;*TupleElementType*

&emsp;&emsp;*TupleElementType:*
&emsp;&emsp;&emsp;*Type*

A tuple type literal references a tuple type (section [#tuple-types]<!--3.3.3-->).

### Union Type Literals { #union-type-literals }

A union type literal is written as a sequence of types separated by vertical bars.

&emsp;&emsp;*UnionType:*
&emsp;&emsp;&emsp;*UnionOrIntersectionOrPrimaryType*&emsp;`|`&emsp;*IntersectionOrPrimaryType*

A union type literal references a union type (section [#union-types]<!--3.4-->).

### Intersection Type Literals { #intersection-type-literals }

An intersection type literal is written as a sequence of types separated by ampersands.

&emsp;&emsp;*IntersectionType:*
&emsp;&emsp;&emsp;*IntersectionOrPrimaryType*&emsp;`&`&emsp;*PrimaryType*

An intersection type literal references an intersection type (section [#intersection-types]<!--3.5-->).

### Function Type Literals { #function-type-literals }

A function type literal specifies the type parameters, regular parameters, and return type of a call signature.

&emsp;&emsp;*FunctionType:*
&emsp;&emsp;&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`=>`&emsp;*Type*

A function type literal is shorthand for an object type containing a single call signature. Specifically, a function type literal of the form

```TypeScript
< T1, T2, ... > ( p1, p2, ... ) => R
```

is exactly equivalent to the object type literal

```TypeScript
{ < T1, T2, ... > ( p1, p2, ... ) : R }
```

Note that function types with multiple call or construct signatures cannot be written as function type literals but must instead be written as object type literals.

### Constructor Type Literals { #constructor-type-literals }

A constructor type literal specifies the type parameters, regular parameters, and return type of a construct signature.

&emsp;&emsp;*ConstructorType:*
&emsp;&emsp;&emsp;`new`&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`=>`&emsp;*Type*

A constructor type literal is shorthand for an object type containing a single construct signature. Specifically, a constructor type literal of the form

```TypeScript
new < T1, T2, ... > ( p1, p2, ... ) => R
```

is exactly equivalent to the object type literal

```TypeScript
{ new < T1, T2, ... > ( p1, p2, ... ) : R }
```

Note that constructor types with multiple construct signatures cannot be written as constructor type literals but must instead be written as object type literals.

### Type Queries { #type-queries }

A type query obtains the type of an expression.

&emsp;&emsp;*TypeQuery:*
&emsp;&emsp;&emsp;`typeof`&emsp;*TypeQueryExpression*

&emsp;&emsp;*TypeQueryExpression:*
&emsp;&emsp;&emsp;*IdentifierReference*
&emsp;&emsp;&emsp;*TypeQueryExpression*&emsp;`.`&emsp;*IdentifierName*

A type query consists of the keyword `typeof` followed by an expression. The expression is restricted to a single identifier or a sequence of identifiers separated by periods. The expression is processed as an identifier expression (section [#identifiers]<!--4.3-->) or property access expression (section [#property-access]<!--4.13-->), the widened type (section [#widened-types]<!--3.12-->) of which becomes the result. Similar to other static typing constructs, type queries are erased from the generated JavaScript code and add no run-time overhead.

Type queries are useful for capturing anonymous types that are generated by various constructs such as object literals, function declarations, and namespace declarations. For example:

```TypeScript
var a = { x: 10, y: 20 };
var b: typeof a;
```

Above, 'b' is given the same type as 'a', namely `{ x: number; y: number; }`.

If a declaration includes a type annotation that references the entity being declared through a circular path of type queries or type references containing type queries, the resulting type is the Any type. For example, all of the following variables are given the type Any:

```TypeScript
var c: typeof c;
var d: typeof e;
var e: typeof d;
var f: Array<typeof f>;
```

However, if a circular path of type queries includes at least one *ObjectType*, *FunctionType* or *ConstructorType*, the construct denotes a recursive type:

```TypeScript
var g: { x: typeof g; };
var h: () => typeof h;
```

Here, 'g' and 'g.x' have the same recursive type, and likewise 'h' and 'h()' have the same recursive type.

### This-Type References { #this-type-references }

The `this` keyword is used to reference the this-type (section [#this-types]<!--3.6.3-->) of a class or interface.

&emsp;&emsp;*ThisType:*
&emsp;&emsp;&emsp;`this`

The meaning of a *ThisType* depends on the closest enclosing *FunctionDeclaration*, *FunctionExpression*, *PropertyDefinition*, *ClassElement*, or *TypeMember*, known as the root declaration of the *ThisType*, as follows:

* When the root declaration is an instance member or constructor of a class, the *ThisType* references the this-type of that class.
* When the root declaration is a member of an interface type, the *ThisType* references the this-type of that interface.
* Otherwise, the *ThisType* is an error.

Note that in order to avoid ambiguities it is not possible to reference the this-type of a class or interface in a nested object type literal. In the example

```TypeScript
interface ListItem {
    getHead(): this;
    getTail(): this;
    getHeadAndTail(): { head: this, tail: this };  // Error
}
```

the `this` references on the last line are in error because their root declarations are not members of a class or interface. The recommended way to reference the this-type of an outer class or interface in an object type literal is to declare an intermediate generic type and pass `this` as a type argument. For example:

```TypeScript
type HeadAndTail<T> = { head: T, tail: T };

interface ListItem {
    getHead(): this;
    getTail(): this;
    getHeadAndTail(): HeadAndTail<this>;
}
```

## Specifying Members { #specifying-members }

The members of an object type literal (section [#object-type-literals]<!--3.8.3-->) are specified as a combination of property, call, construct, index, and method signatures.

### Property Signatures { #property-signatures }

A property signature declares the name and type of a property member.

&emsp;&emsp;*PropertySignature:*
&emsp;&emsp;&emsp;*PropertyName*&emsp;`?`*<sub>opt</sub>*&emsp;*TypeAnnotation<sub>opt</sub>*

&emsp;&emsp;*TypeAnnotation:*
&emsp;&emsp;&emsp;`:`&emsp;*Type*

The *PropertyName* ([#property-names]<!--2.2.2-->) of a property signature must be unique within its containing type, and must denote a well-known symbol if it is a computed property name ([#computed-property-names]<!--2.2.3-->). If the property name is followed by a question mark, the property is optional. Otherwise, the property is required.

If a property signature omits a *TypeAnnotation*, the Any type is assumed.

### Call Signatures { #call-signatures }

A call signature defines the type parameters, parameter list, and return type associated with applying a call operation (section [#function-calls]<!--4.15-->) to an instance of the containing type. A type may ***overload*** call operations by defining multiple different call signatures.

&emsp;&emsp;*CallSignature:*
&emsp;&emsp;&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;*TypeAnnotation<sub>opt</sub>*

A call signature that includes *TypeParameters* (section [#type-parameter-lists]<!--3.6.1-->) is called a ***generic call signature***. Conversely, a call signature with no *TypeParameters* is called a non-generic call signature.

As well as being members of object type literals, call signatures occur in method signatures (section [#method-signatures]<!--3.9.5-->), function expressions (section [#function-expressions]<!--4.10-->), and function declarations (section [#function-declarations]<!--6.1-->).

An object type containing call signatures is said to be a ***function type***.

#### Type Parameters { #type-parameters }

Type parameters (section [#type-parameter-lists]<!--3.6.1-->) in call signatures provide a mechanism for expressing the relationships of parameter and return types in call operations. For example, a signature might introduce a type parameter and use it as both a parameter type and a return type, in effect describing a function that returns a value of the same type as its argument.

Type parameters may be referenced in parameter types and return type annotations, but not in type parameter constraints, of the call signature in which they are introduced.

Type arguments (section [#type-argument-lists]<!--3.6.2-->) for call signature type parameters may be explicitly specified in a call operation or may, when possible, be inferred (section [#type-argument-inference]<!--4.15.2-->) from the types of the regular arguments in the call. An ***instantiation*** of a generic call signature for a particular set of type arguments is the call signature formed by replacing each type parameter with its corresponding type argument.

Some examples of call signatures with type parameters follow below.

A function taking an argument of any type, returning a value of that same type:

```TypeScript
<T>(x: T): T
```

A function taking two values of the same type, returning an array of that type:

```TypeScript
<T>(x: T, y: T): T[]
```

A function taking two arguments of different types, returning an object with properties 'x' and 'y' of those types:

```TypeScript
<T, U>(x: T, y: U): { x: T; y: U; }
```

A function taking an array of one type and a function argument, returning an array of another type, where the function argument takes a value of the first array element type and returns a value of the second array element type:

```TypeScript
<T, U>(a: T[], f: (x: T) => U): U[]
```

#### Parameter List { #parameter-list }

A signature's parameter list consists of zero or more required parameters, followed by zero or more optional parameters, finally followed by an optional rest parameter.

&emsp;&emsp;*ParameterList:*
&emsp;&emsp;&emsp;*RequiredParameterList*
&emsp;&emsp;&emsp;*OptionalParameterList*
&emsp;&emsp;&emsp;*RestParameter*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*OptionalParameterList*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*RestParameter*
&emsp;&emsp;&emsp;*OptionalParameterList*&emsp;`,`&emsp;*RestParameter*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*OptionalParameterList*&emsp;`,`&emsp;*RestParameter*

&emsp;&emsp;*RequiredParameterList:*
&emsp;&emsp;&emsp;*RequiredParameter*
&emsp;&emsp;&emsp;*RequiredParameterList*&emsp;`,`&emsp;*RequiredParameter*

&emsp;&emsp;*RequiredParameter:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;*BindingIdentifierOrPattern*&emsp;*TypeAnnotation<sub>opt</sub>*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;`:`&emsp;*StringLiteral*

&emsp;&emsp;*AccessibilityModifier:*
&emsp;&emsp;&emsp;`public`
&emsp;&emsp;&emsp;`private`
&emsp;&emsp;&emsp;`protected`

&emsp;&emsp;*BindingIdentifierOrPattern:*
&emsp;&emsp;&emsp;*BindingIdentifier*
&emsp;&emsp;&emsp;*BindingPattern*

&emsp;&emsp;*OptionalParameterList:*
&emsp;&emsp;&emsp;*OptionalParameter*
&emsp;&emsp;&emsp;*OptionalParameterList*&emsp;`,`&emsp;*OptionalParameter*

&emsp;&emsp;*OptionalParameter:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;*BindingIdentifierOrPattern*&emsp;`?`&emsp;*TypeAnnotation<sub>opt</sub>*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;*BindingIdentifierOrPattern*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer*
&emsp;&emsp;&emsp;*BindingIdentifier*&emsp;`?`&emsp;`:`&emsp;*StringLiteral*

&emsp;&emsp;*RestParameter:*
&emsp;&emsp;&emsp;`...`&emsp;*BindingIdentifier*&emsp;*TypeAnnotation<sub>opt</sub>*

A parameter declaration may specify either an identifier or a binding pattern ([#destructuring-variable-declarations]<!--5.2.2-->). The identifiers specified in parameter declarations and binding patterns in a parameter list must be unique within that parameter list.

The type of a parameter in a signature is determined as follows:

* If the declaration includes a type annotation, the parameter is of that type.
* Otherwise, if the declaration includes an initializer expression (which is permitted only when the parameter list occurs in conjunction with a function body), the parameter type is the widened form (section [#widened-types]<!--3.12-->) of the type of the initializer expression.
* Otherwise, if the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section [#implied-type]<!--5.2.3-->).
* Otherwise, if the parameter is a rest parameter, the parameter type is `any[]`.
* Otherwise, the parameter type is `any`.

A parameter is permitted to include a `public`, `private`, or `protected` modifier only if it occurs in the parameter list of a *ConstructorImplementation* (section [#constructor-parameters]<!--8.3.1-->) and only if it doesn't specify a *BindingPattern*.

A type annotation for a rest parameter must denote an array type.

When a parameter type annotation specifies a string literal type, the containing signature is a specialized signature (section [#specialized-signatures]<!--3.9.2.4-->). Specialized signatures are not permitted in conjunction with a function body, i.e. the *FunctionExpression*, *FunctionImplementation*, *MemberFunctionImplementation*, and *ConstructorImplementation* grammar productions do not permit parameters with string literal types.

A parameter can be marked optional by following its name or binding pattern with a question mark (`?`) or by including an initializer. Initializers (including binding property or element initializers) are permitted only when the parameter list occurs in conjunction with a function body, i.e. only in a *FunctionExpression*, *FunctionImplementation*, *MemberFunctionImplementation*, or *ConstructorImplementation* grammar production.

*TODO: Update to reflect [binding parameter cannot be optional in implementation signature](https://github.com/Microsoft/TypeScript/issues/2797)*.

*TODO: Update to reflect [required parameters support initializers](https://github.com/Microsoft/TypeScript/pull/4022)*.

#### Return Type { #return-type }

If present, a call signature's return type annotation specifies the type of the value computed and returned by a call operation. A `void` return type annotation is used to indicate that a function has no return value.

When a call signature with no return type annotation occurs in a context without a function body, the return type is assumed to be the Any type.

When a call signature with no return type annotation occurs in a context that has a function body (specifically, a function implementation, a member function implementation, or a member accessor declaration), the return type is inferred from the function body as described in section [#function-implementations]<!--6.3-->.

#### Specialized Signatures { #specialized-signatures }

When a parameter type annotation specifies a string literal type (section [#string-literal-types]<!--3.2.9-->), the containing signature is considered a specialized signature. Specialized signatures are used to express patterns where specific string values for some parameters cause the types of other parameters or the function result to become further specialized. For example, the declaration

```TypeScript
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: string): HTMLElement;
}
```

states that calls to 'createElement' with the string literals "div", "span", and "canvas" return values of type 'HTMLDivElement', 'HTMLSpanElement', and 'HTMLCanvasElement' respectively, and that calls with all other string expressions return values of type 'HTMLElement'.

When writing overloaded declarations such as the one above it is important to list the non-specialized signature last. This is because overload resolution (section [#overload-resolution]<!--4.15.1-->) processes the candidates in declaration order and picks the first one that matches.

Every specialized call or construct signature in an object type must be assignable to at least one non-specialized call or construct signature in the same object type (where a call signature *A* is considered assignable to another call signature *B* if an object type containing only *A* would be assignable to an object type containing only *B*). For example, the 'createElement' property in the example above is of a type that contains three specialized signatures, all of which are assignable to the non-specialized signature in the type.

### Construct Signatures { #construct-signatures }

A construct signature defines the parameter list and return type associated with applying the `new` operator (section [#the-new-operator]<!--4.14-->) to an instance of the containing type. A type may overload `new` operations by defining multiple construct signatures with different parameter lists.

&emsp;&emsp;*ConstructSignature:*
&emsp;&emsp;&emsp;`new`&emsp;*TypeParameters<sub>opt</sub>*&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;*TypeAnnotation<sub>opt</sub>*

The type parameters, parameter list, and return type of a construct signature are subject to the same rules as a call signature.

A type containing construct signatures is said to be a ***constructor type***.

### Index Signatures { #index-signatures }

An index signature defines a type constraint for properties in the containing type.

&emsp;&emsp;*IndexSignature:*
&emsp;&emsp;&emsp;`[`&emsp;*BindingIdentifier*&emsp;`:`&emsp;`string`&emsp;`]`&emsp;*TypeAnnotation*
&emsp;&emsp;&emsp;`[`&emsp;*BindingIdentifier*&emsp;`:`&emsp;`number`&emsp;`]`&emsp;*TypeAnnotation*

There are two kinds of index signatures:

* ***String index signatures***, specified using index type `string`, define type constraints for all properties and numeric index signatures in the containing type. Specifically, in a type with a string index signature of type *T*, all properties and numeric index signatures must have types that are assignable to *T*.
* ***Numeric index signatures***, specified using index type `number`, define type constraints for all numerically named properties in the containing type. Specifically, in a type with a numeric index signature of type *T*, all numerically named properties must have types that are assignable to *T*.

A ***numerically named property*** is a property whose name is a valid numeric literal. Specifically, a property with a name *N* for which ToString(ToNumber(*N*)) is identical to *N*, where ToString and ToNumber are the abstract operations defined in ECMAScript specification.

An object type can contain at most one string index signature and one numeric index signature.

Index signatures affect the determination of the type that results from applying a bracket notation property access to an instance of the containing type, as described in section [#property-access]<!--4.13-->.

### Method Signatures { #method-signatures }

A method signature is shorthand for declaring a property of a function type.

&emsp;&emsp;*MethodSignature:*
&emsp;&emsp;&emsp;*PropertyName*&emsp;`?`*<sub>opt</sub>*&emsp;*CallSignature*

If the *PropertyName* is a computed property name ([#computed-property-names]<!--2.2.3-->), it must specify a well-known symbol. If the *PropertyName* is followed by a question mark, the property is optional. Otherwise, the property is required. Only object type literals and interfaces can declare optional properties.

A method signature of the form

```TypeScript
f < T1, T2, ... > ( p1, p2, ... ) : R
```

is equivalent to the property declaration

```TypeScript
f : { < T1, T2, ... > ( p1, p2, ... ) : R }
```

A literal type may ***overload*** a method by declaring multiple method signatures with the same name but differing parameter lists. Overloads must either all be required (question mark omitted) or all be optional (question mark included). A set of overloaded method signatures correspond to a declaration of a single property with a type composed from an equivalent set of call signatures. Specifically

```TypeScript
f < T1, T2, ... > ( p1, p2, ... ) : R ;
f < U1, U2, ... > ( q1, q2, ... ) : S ;
...
```

is equivalent to

```TypeScript
f : {
    < T1, T2, ... > ( p1, p2, ... ) : R ;
    < U1, U2, ... > ( q1, q2, ... ) : S ;
    ...
} ;
```

In the following example of an object type

```TypeScript
{
    func1(x: number): number;         // Method signature
    func2: (x: number) => number;     // Function type literal
    func3: { (x: number): number };   // Object type literal
}
```

the properties 'func1', 'func2', and 'func3' are all of the same type, namely an object type with a single call signature taking a number and returning a number. Likewise, in the object type

```TypeScript
{
    func4(x: number): number;
    func4(s: string): string;
    func5: {
        (x: number): number;
        (s: string): string;
    };
}
```

the properties 'func4' and 'func5' are of the same type, namely an object type with two call signatures taking and returning number and string respectively.

## Type Aliases { #type-aliases }

A type alias declaration introduces a ***type alias*** in the containing declaration space.

&emsp;&emsp;*TypeAliasDeclaration:*
&emsp;&emsp;&emsp;`type`&emsp;*BindingIdentifier*&emsp;*TypeParameters<sub>opt</sub>*&emsp;`=`&emsp;*Type*&emsp;`;`

A type alias serves as an alias for the type specified in the type alias declaration. Unlike an interface declaration, which always introduces a named object type, a type alias declaration can introduce a name for any kind of type, including primitive, union, and intersection types.

A type alias may optionally have type parameters (section [#type-parameter-lists]<!--3.6.1-->) that serve as placeholders for actual types to be provided when the type alias is referenced in type references. A type alias with type parameters is called a ***generic type alias***. The type parameters of a generic type alias declaration are in scope and may be referenced in the aliased *Type*.

Type aliases are referenced using type references ([#type-references]<!--3.8.2-->). Type references to generic type aliases produce instantiations of the aliased type with the given type arguments. Writing a reference to a non-generic type alias has exactly the same effect as writing the aliased type itself, and writing a reference to a generic type alias has exactly the same effect as writing the resulting instantiation of the aliased type.

The *BindingIdentifier* of a type alias declaration may not be one of the predefined type names (section [#predefined-types]<!--3.8.1-->).

It is an error for the type specified in a type alias to depend on that type alias. Types have the following dependencies:

* A type alias *directly depends on* the type it aliases.
* A type reference *directly depends on* the referenced type and each of the type arguments, if any.
* A union or intersection type *directly depends on* each of the constituent types.
* An array type *directly depends on* its element type.
* A tuple type *directly depends on* each of its element types.
* A type query *directly depends on* the type of the referenced entity.

Given this definition, the complete set of types upon which a type depends is the transitive closure of the *directly depends on* relationship. Note that object type literals, function type literals, and constructor type literals do not depend on types referenced within them and are therefore permitted to circularly reference themselves through type aliases.

Some examples of type alias declarations:

```TypeScript
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type ObjectStatics = typeof Object;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

Interface types have many similarities to type aliases for object type literals, but since interface types offer more capabilities they are generally preferred to type aliases. For example, the interface type

```TypeScript
interface Point {
    x: number;
    y: number;
}
```

could be written as the type alias

```TypeScript
type Point = {
    x: number;
    y: number;
};
```

However, doing so means the following capabilities are lost:

* An interface can be named in an extends or implements clause, but a type alias for an object type literal cannot.
* An interface can have multiple merged declarations, but a type alias for an object type literal cannot.

## Type Relationships { #type-relationships }

Types in TypeScript have identity, subtype, supertype, and assignment compatibility relationships as defined in the following sections.

### Apparent Members { #apparent-members }

The ***apparent members*** of a type are the members observed in subtype, supertype, and assignment compatibility relationships, as well as in the type checking of property accesses (section [#property-access]<!--4.13-->), `new` operations (section [#the-new-operator]<!--4.14-->), and function calls (section [#function-calls]<!--4.15-->). The apparent members of a type are determined as follows:

* The apparent members of the primitive type Number and all enum types are the apparent members of the global interface type 'Number'.
* The apparent members of the primitive type Boolean are the apparent members of the global interface type 'Boolean'.
* The apparent members of the primitive type String and all string literal types are the apparent members of the global interface type 'String'.
* The apparent members of a type parameter are the apparent members of the constraint (section [#type-parameter-lists]<!--3.6.1-->) of that type parameter.
* The apparent members of an object type *T* are the combination of the following:
  * The declared and/or inherited members of *T*.
  * The properties of the global interface type 'Object' that aren't hidden by properties with the same name in *T*.
  * If *T* has one or more call or construct signatures, the properties of the global interface type 'Function' that aren't hidden by properties with the same name in *T*.
* The apparent members of a union type *U* are determined as follows:
  * When all constituent types of *U* have an apparent property named *N*, *U* has an apparent property named *N* of a union type of the respective property types.
  * When all constituent types of *U* have an apparent call signature with a parameter list *P*, *U* has an apparent call signature with the parameter list *P* and a return type that is a union of the respective return types. The call signatures appear in the same order as in the first constituent type.
  * When all constituent types of *U* have an apparent construct signature with a parameter list *P*, *U* has an apparent construct signature with the parameter list *P* and a return type that is a union of the respective return types. The construct signatures appear in the same order as in the first constituent type.
  * When all constituent types of *U* have an apparent string index signature, *U* has an apparent string index signature of a union type of the respective string index signature types.
  * When all constituent types of *U* have an apparent numeric index signature, *U* has an apparent numeric index signature of a union type of the respective numeric index signature types.
* The apparent members of an intersection type *I* are determined as follows:
  * When one of more constituent types of *I* have an apparent property named *N*, *I* has an apparent property named *N* of an intersection type of the respective property types.
  * When one or more constituent types of *I* have a call signature *S*, *I* has the apparent call signature *S*. The signatures are ordered as a concatenation of the signatures of each constituent type in the order of the constituent types within *I*.
  * When one or more constituent types of *I* have a construct signature *S*, *I* has the apparent construct signature *S*. The signatures are ordered as a concatenation of the signatures of each constituent type in the order of the constituent types within *I*.
  * When one or more constituent types of *I* have an apparent string index signature, *I* has an apparent string index signature of an intersection type of the respective string index signature types.
  * When one or more constituent types of *I* have an apparent numeric index signature, *I* has an apparent numeric index signature of an intersection type of the respective numeric index signature types.

If a type is not one of the above, it is considered to have no apparent members.

In effect, a type's apparent members make it a subtype of the 'Object' or 'Function' interface unless the type defines members that are incompatible with those of the 'Object' or 'Function' interface—which, for example, occurs if the type defines a property with the same name as a property in the 'Object' or 'Function' interface but with a type that isn't a subtype of that in the 'Object' or 'Function' interface.

Some examples:

```TypeScript
var o: Object = { x: 10, y: 20 };         // Ok
var f: Function = (x: number) => x * x;   // Ok
var err: Object = { toString: 0 };        // Error
```

The last assignment is an error because the object literal has a 'toString' method that isn't compatible with that of 'Object'.

### Type and Member Identity { #type-and-member-identity }

Two types are considered ***identical*** when

* they are both the Any type,
* they are the same primitive type,
* they are the same type parameter,
* they are union types with identical sets of constituent types, or
* they are intersection types with identical sets of constituent types, or
* they are object types with identical sets of members.

Two members are considered identical when

* they are public properties with identical names, optionality, and types,
* they are private or protected properties originating in the same declaration and having identical types,
* they are identical call signatures,
* they are identical construct signatures, or
* they are index signatures of identical kind with identical types.

Two call or construct signatures are considered identical when they have the same number of type parameters with identical type parameter constraints and, after substituting type Any for the type parameters introduced by the signatures, identical number of parameters with identical kind (required, optional or rest) and types, and identical return types.

Note that, except for primitive types and classes with private or protected members, it is structure, not naming, of types that determines identity. Also, note that parameter names are not significant when determining identity of signatures.

Private and protected properties match only if they originate in the same declaration and have identical types. Two distinct types might contain properties that originate in the same declaration if the types are separate parameterized references to the same generic class. In the example

```TypeScript
class C<T> { private x: T; }

interface X { f(): string; }

interface Y { f(): string; }

var a: C<X>;
var b: C<Y>;
```

the variables 'a' and 'b' are of identical types because the two type references to 'C' create types with a private member 'x' that originates in the same declaration, and because the two private 'x' members have types with identical sets of members once the type arguments 'X' and 'Y' are substituted.

### Subtypes and Supertypes { #subtypes-and-supertypes }

*S* is a ***subtype*** of a type *T*, and *T* is a ***supertype*** of *S*, if *S* has no excess properties with respect to *T* ([#excess-properties]<!--3.11.5-->) and one of the following is true:

* *S* and *T* are identical types.
* *T* is the Any type.
* *S* is the Never type.
* *S* is the Undefined type and *T* is the Void type.
* *S* is either the Undefined or Null type, and strict null checks ([#strict-null-checks]) are disabled.
* *S* is an object type and *T* is the non-primitive `object` type.
* *S* is a numeric enum or numeric enum member type and *T* is the primitive type Number.
* *S* and *T* are both enum member types with respective containing enum types *E* and *F* and
    * *E* is a subtype of *F*.
* *S* and *T* are both non-const enum types with the same declared name, and
  * for each enum member *M* in *E*, there exists an enum member declaration *N* in *F* such that *M* and *N* have the same declared name and value.
* *S* is an enum member type, *T* is a literal type, and the literal values of *S* and *T* are identical.
* *S* is a string literal type and *T* is the primitive type String.
* *S* is a union type and each constituent type of *S* is a subtype of *T*.
* *S* is an intersection type and at least one constituent type of *S* is a subtype of *T*.
* *T* is a union type and *S* is a subtype of at least one constituent type of *T*.
* *T* is an intersection type and *S* is a subtype of each constituent type of *T*.
* *T* is a type parameter and *S* is a mapped type *{ [P in keyof X]: Y }*, and *Y* is a subtype of *X[P]*.
* *T* is a key query type *keyof T'* and
  * *S* is a key query type *keyof S'* and *T'* is a subtype of *S'*.
  * *S* is a subtype of *keyof C* where *C* is the constraint of *S*.
* *T* is an indexed access type *T'[K]* and *S* is a subtype of *C[K]* where *C* is the constraint of *T'*.
* *T* is a mapped type *{ [P in K]: X }*, *S* is not a mapped type, *keyof S* is identical to *K*, and *S[K]* is a subtype of *X*.
* *S* is a type parameter and the constraint of *S* is a subtype of *T*.
* *S* is an object type, an intersection type, an enum type, or the Number, Boolean, or String primitive type, *T* is an object type, and for each member *M* in *T*, one of the following is true:
  * *M* is a property and *S* has an apparent property *N* where
    * *M* and *N* have the same name,
    * the type of *N* is a subtype of that of *M*,
    * if *M* is a required property, *N* is also a required property, and
    * *M* and *N* are both public, *M* and *N* are both private and originate in the same declaration, *M* and *N* are both protected and originate in the same declaration, or *M* is protected and *N* is declared in a class derived from the class in which *M* is declared.
  * *M* is a non-specialized call or construct signature and *S* has an apparent call or construct signature *N* where, when *M* and *N* are instantiated using type Any as the type argument for all type parameters declared by *M* and *N* (if any),
    * the signatures are of the same kind (call or construct),
    * *M* has a rest parameter or the number of non-optional parameters in *N* is less than or equal to the total number of parameters in *M*,
    * for parameter positions that are present in both signatures, each parameter type in *N* is a subtype or supertype of the corresponding parameter type in *M*, and
    * the result type of *M* is Void, or the result type of *N* is a subtype of that of *M*.
  * *M* is a string index signature of type *U*, and *U* is the Any type or *S* has an apparent string index signature of a type that is a subtype of *U*.
  * *M* is a numeric index signature of type *U*, and *U* is the Any type or *S* has an apparent string or numeric index signature of a type that is a subtype of *U*.

When relating call or construct signatures, parameter names are ignored and rest parameters correspond to an unbounded expansion of optional parameters of the rest parameter element type.

Note that specialized call and construct signatures (section [#specialized-signatures]<!--3.9.2.4-->) are not significant when determining subtype and supertype relationships.

Also note that type parameters are not considered object types. Thus, the only subtypes of a type parameter *T* are *T* itself and other type parameters that are directly or indirectly constrained to *T*.

### Assignment Compatibility { #assignment-compatibility }

*TODO: Document weak type checks.*

*TODO: Document signature instantiation*

Types are required to be assignment compatible in certain circumstances, such as expression and variable types in assignment statements and argument and parameter types in function calls.

*S* is ***assignable to*** a type *T*, and *T* is ***assignable from*** *S*, if *S* has no excess properties with respect to *T* ([#excess-properties]<!--3.11.5-->) and one of the following is true:

* *S* and *T* are identical types.
* *S* or *T* is the Any type.
* *S* is the Never type.
* *S* is the Undefined type and *T* is the Void type.
* *S* is either the Undefined or Null type, and strict null checks ([#strict-null-checks]) are disabled.
* *S* is an object type and *T* is the non-primitive `object` type.
* *S* or *T* is a numeric enum or numeric enum member type and the other is the primitive type Number.
* *S* and *T* are both enum member types with respective containing enum types *E* and *F* and
    * *E* is assignable to *F*.
* *S* and *T* are both non-const enum types with the same declared name, and
  * for each enum member *M* in *E*, there exists an enum member declaration *N* in *F* such that *M* and *N* have the same declared name and value.
* *S* is an enum member type, *T* is a literal type, and the literal values of *S* and *T* are identical.
* *S* is a string literal type and *T* is the primitive type String.
* *S* is a union type and each constituent type of *S* is assignable to *T*.
* *S* is an intersection type and at least one constituent type of *S* is assignable to *T*.
* *T* is a union type and *S* is assignable to at least one constituent type of *T*.
* *T* is an intersection type and *S* is assignable to each constituent type of *T*.
* *T* is a type parameter and *S* is a mapped type *{ [P in keyof X]: Y }*, and *Y* is assignable to *X[P]*.
* *T* is a key query type *keyof T'* and
  * *S* is a key query type *keyof S'* and *T'* is assignable to *S'*.
  * *S* is assignable to *keyof C* where *C* is the constraint of *S*.
* *T* is an indexed access type *T'[K]* and *S* is assignable to *C[K]* where *C* is the constraint of *T'*.
* *T* is a mapped type *{ [P in K]: X }*, *S* is not a mapped type, *keyof S* is identical to *K*, and *S[K]* is assignable to *X*.
* *S* is a type parameter and the constraint of *S* is assignable to *T*.
* *S* is an object type, an intersection type, an enum type, or the Number, Boolean, or String primitive type, *T* is an object type, and for each member *M* in *T*, one of the following is true:
  * *M* is a property and *S* has an apparent property *N* where
    * *M* and *N* have the same name,
    * the type of *N* is assignable to that of *M*,
    * if *M* is a required property, *N* is also a required property, and
    * *M* and *N* are both public, *M* and *N* are both private and originate in the same declaration, *M* and *N* are both protected and originate in the same declaration, or *M* is protected and *N* is declared in a class derived from the class in which *M* is declared.
  * *M* is an optional property and *S* has no apparent property of the same name as *M*.
  * *M* is a non-specialized call or construct signature and *S* has an apparent call or construct signature *N* where, when *M* and *N* are instantiated using type Any as the type argument for all type parameters declared by *M* and *N* (if any),
    * the signatures are of the same kind (call or construct),
    * *M* has a rest parameter or the number of non-optional parameters in *N* is less than or equal to the total number of parameters in *M*,
    * for parameter positions that are present in both signatures, each parameter type in *N* is assignable to or from the corresponding parameter type in *M*, and
    * the result type of *M* is Void, or the result type of *N* is assignable to that of *M*.
  * *M* is a string index signature of type *U*, and *U* is the Any type or *S* has an apparent string index signature of a type that is assignable to *U*.
  * *M* is a numeric index signature of type *U*, and *U* is the Any type or *S* has an apparent string or numeric index signature of a type that is assignable to *U*.

When relating call or construct signatures, parameter names are ignored and rest parameters correspond to an unbounded expansion of optional parameters of the rest parameter element type.

Note that specialized call and construct signatures (section [#specialized-signatures]<!--3.9.2.4-->) are not significant when determining assignment compatibility.

The assignment compatibility and subtyping rules differ only in that

* the Any type is assignable to, but not a subtype of, all types,
* the primitive type Number is assignable to, but not a subtype of, all enum types, and
* an object type without a particular property is assignable to an object type in which that property is optional.

The assignment compatibility rules imply that, when assigning values or passing parameters, optional properties must either be present and of a compatible type, or not be present at all. For example:

```TypeScript
function foo(x: { id: number; name?: string; }) { }

foo({ id: 1234 });                 // Ok
foo({ id: 1234, name: "hello" });  // Ok
foo({ id: 1234, name: false });    // Error, name of wrong type
foo({ name: "hello" });            // Error, id required but missing
```

### Comparability

*TODO: Document the base primitive type.*

Types are required to be *comparable* in certain circumstances, such as part of when checking whether two values of given types might be equal at runtime using operators like '===', or when using a type assertion.

*S* is ***comparable to*** a type *T*, and *T* is ***comparable from*** *S*, if *S* has no excess properties with respect to *T* ([#excess-properties]<!--3.11.5-->) and one of the following is true:

* *S* and *T* are identical types.
* *S* or *T* is the Any type.
* *S* is the Never type.
* *S* is the Undefined type and *T* is the Void type.
* *T* is the Undefined type and *S* is the Void type.
* *S* is either the Undefined or Null type, and strict null checks ([#strict-null-checks]) are disabled.
* *S* is an object type and *T* is the non-primitive `object` type.
* *T* is an object type and *S* is the non-primitive `object` type.
* *S* or *T* is a numeric enum or numeric enum member type and the other is the primitive type Number.
* *S* and *T* are both enum member types with respective containing enum types *E* and *F*, and
    * *E* is comparable to *F*.
    * *F* is comparable to *E*.
* *S* and *T* are both non-const enum types with the same declared name, and
  * for each enum member *M* in *E*, there exists an enum member declaration *N* in *F* such that *M* and *N* have the same declared name and value.
  * for each enum member *N* in *F*, there exists an enum member declaration *M* in *E* such that *N* and *M* have the same declared name and value.
* *S* is an enum member type, *T* is a literal type, and the literal values of *S* and *T* are identical.
* *T* is an enum member type, *S* is a literal type, and the literal values of *S* and *T* are identical.
* *S* is a literal type and *T* is the base primitive type of *S*.
* *T* is a literal type and *S* is the base primitive type of *T*.
* *S* is a union type and some constituent type of *S* is comparable to *T*.
* *S* is an intersection type and at least one constituent type of *S* is comparable to *T*.
* *T* is a union type and *S* is comparable to at least one constituent type of *T*.
* *T* is an intersection type and *S* is comparable to each constituent type of *T*.
* *T* is a type parameter and *S* is a mapped type *{ [P in keyof X]: Y }*, and *Y* is comparable to *X[P]*.
* *T* is a key query type *keyof T'* and
  * *S* is a key query type *keyof S'* and *T'* is comparable to *S'*.
  * *S* is comparable to *keyof C* where *C* is the constraint of *S*.
* *T* is an indexed access type *T'[K]* and *S* is comparable to *C[K]* where *C* is the constraint of *T'*.
* *T* is a mapped type *{ [P in K]: X }*, *S* is not a mapped type, *keyof S* is identical to *K*, and *S[K]* is comparable to *X*.
* *S* is a type parameter and the constraint of *S* is comparable to *T*.
* *S* is an object type, an intersection type, an enum type, or the Number, Boolean, or String primitive type, *T* is an object type, and for each member *M* in *T*, one of the following is true:
  * *M* is a property and *S* has an apparent property *N* where
    * *M* and *N* have the same name,
    * the type of *N* is comparable to that of *M*,
    * *M* and *N* are both public, *M* and *N* are both private and originate in the same declaration, *M* and *N* are both protected and originate in the same declaration, or *M* is protected and *N* is declared in a class derived from the class in which *M* is declared.
  * *M* is an optional property and *S* has no apparent property of the same name as *M*.
  * *M* is a non-specialized call or construct signature and *S* has an apparent call or construct signature *N* where, when *M* and *N* are instantiated using type Any as the type argument for all type parameters declared by *M* and *N* (if any),
    * the signatures are of the same kind (call or construct),
    * *M* has a rest parameter or the number of non-optional parameters in *N* is less than or equal to the total number of parameters in *M*,
    * for parameter positions that are present in both signatures, each parameter type in *N* is comparable to or from the corresponding parameter type in *M*, and
    * the result type of *M* is Void, or the result type of *N* is comparable to that of *M*.
  * *M* is a string index signature of type *U*, and *U* is the Any type or *S* has an apparent string index signature of a type that is comparable to *U*.
  * *M* is a numeric index signature of type *U*, and *U* is the Any type or *S* has an apparent string or numeric index signature of a type that is comparable to *U*.

*TODO: Cover this-parameters.*
*TODO: Cover relatability of spreads to non-spread parameters.*
*TODO: Cover stricter variance checks.*

When relating call or construct signatures, parameter names are ignored and rest parameters correspond to an unbounded expansion of optional parameters of the rest parameter element type.

Note that specialized call and construct signatures (section [#specialized-signatures]<!--3.9.2.4-->) are not significant when determining comparability.

The comparability and assignment compatibility rules differ only in that

* a union type is comparable to a target type if any of its constituents, rather than all of its constituents, are comparable to that target type,
* whether a type is considered weak ([#type-inference]<!--#3.11.7-->) has no bearing on whether two types are comparable,
* an object type with some optional property is comparable to an object type containing a property of the same name if it has a compatible type, regardless of whether that property is optional,
* literal types and enum member types are comparable both to and from their base primitive types,
* a literal type and an enum member type are comparable to and from each other, provided that they have the same literal value,
* the Undefined type is comparable to and from the Void type,
* the non-primitive object type is comparable to and from any other object type, and
* when relating any two signatures, each signature is always instantiated using type Any for all type arguments.

While the comparable relation is often applied bidirectionally on a pair of types, it is not a symmetric relationship.

*TODO: Give an example of the comparable relation.*

### Excess Properties { #excess-properties }

The subtype and assignment compatibility relationships require that source types have no excess properties with respect to their target types. The purpose of this check is to detect excess or misspelled properties in object literals.

A source type *S* is considered to have excess properties with respect to a target type *T* if

* *S* is a fresh object literal type, as defined below, and
* *S* has one or more properties that aren't expected in *T*.

A property *P* is said to be expected in a type *T* if one of the following is true:

* *T* is not an object, union, or intersection type.
* *T* is an object type and
  * *T* has a property with the same name as *P*,
  * *T* has a string or numeric index signature,
  * *T* has no properties, or
  * *T* is the global type 'Object'.
* *T* is a union or intersection type and *P* is expected in at least one of the constituent types of *T*.

The type inferred for an object literal (as described in section [#object-literals]<!--4.5-->) is considered a ***fresh object literal type***. The freshness disappears when an object literal type is widened ([#widened-types]<!--3.12-->) or is the type of the expression in a type assertion ([#type-assertions]<!--4.16-->).

Consider the following example:

```TypeScript
interface CompilerOptions {
    strict?: boolean;
    sourcePath?: string;
    targetPath?: string;
}

var options: CompilerOptions = {
    strict: true,
    sourcepath: "./src",  // Error, excess or misspelled property
    targetpath: "./bin"   // Error, excess or misspelled property
};
```

The 'CompilerOptions' type contains only optional properties, so without the excess property check, *any* object literal would be assignable to the 'options' variable (because a misspelled property would just be considered an excess property of a different name).

In cases where excess properties are expected, an index signature can be added to the target type as an indicator of intent:

```TypeScript
interface InputElement {
    name: string;
    visible?: boolean;
    [x: string]: any;            // Allow additional properties of any type
}

var address: InputElement = {
    name: "Address",
    visible: true,
    help: "Enter address here",  // Allowed because of index signature
    shortcut: "Alt-A"            // Allowed because of index signature
};
```

### Contextual Signature Instantiation { #contextual-signature-instantiation }

During type argument inference in a function call (section [#type-argument-inference]<!--4.15.2-->) it is in certain circumstances necessary to instantiate a generic call signature of an argument expression in the context of a non-generic call signature of a parameter such that further inferences can be made. A generic call signature *A* is ***instantiated in the context of*** non-generic call signature *B* as follows:

* Using the process described in [#type-inference]<!--3.11.7-->, inferences for *A*'s type parameters are made from each parameter type in *B* to the corresponding parameter type in *A* for those parameter positions that are present in both signatures, where rest parameters correspond to an unbounded expansion of optional parameters of the rest parameter element type.
* The inferred type argument for each type parameter is the union type of the set of inferences made for that type parameter. However, if the union type does not satisfy the constraint of the type parameter, the inferred type argument is instead the constraint.

### Type Inference { #type-inference }

In certain contexts, inferences for a given set of type parameters are made *from* a type *S*, in which those type parameters do not occur, *to* another type *T*, in which those type parameters do occur. Inferences consist of a set of candidate type arguments collected for each of the type parameters. The inference process recursively relates *S* and *T* to gather as many inferences as possible:

* If *T* is one of the type parameters for which inferences are being made, *S* is added to the set of inferences for that type parameter.
* Otherwise, if *S* and *T* are references to the same generic type, inferences are made from each type argument in *S* to each corresponding type argument in *T*.
* Otherwise, if *S* and *T* are tuple types with the same number of elements, inferences are made from each element type in *S* to each corresponding element type in *T*.
* Otherwise, if *T* is a union or intersection type:
  * First, inferences are made from *S* to each constituent type in *T* that isn't simply one of the type parameters for which inferences are being made.
  * If the first step produced no inferences then if T is a union type and exactly one constituent type in *T* is simply a type parameter for which inferences are being made, inferences are made from *S* to that type parameter.
* Otherwise, if *S* is a union or intersection type, inferences are made from each constituent type in *S* to *T*.
* Otherwise, if *S* and *T* are object types, then for each member *M* in *T*:
  * If *M* is a property and *S* contains a property *N* with the same name as *M*, inferences are made from the type of *N* to the type of *M*.
  * If *M* is a call signature and a corresponding call signature *N* exists in *S*, *N* is instantiated with the Any type as an argument for each type parameter (if any) and inferences are made from parameter types in *N* to the corresponding parameter types in *M* for positions that are present in both signatures, and from the return type of *N* to the return type of *M*.
  * If *M* is a construct signature and a corresponding construct signature *N* exists in *S*, *N* is instantiated with the Any type as an argument for each type parameter (if any) and inferences are made from parameter types in *N* to the corresponding parameter types in *M* for positions that are present in both signatures, and from the return type of *N* to the return type of *M*.
  * If *M* is a string index signature and *S* contains a string index signature *N*, inferences are made from the type of *N* to the type of *M*.
  * If *M* is a numeric index signature and *S* contains a numeric index signature *N*, inferences are made from the type of *N* to the type of *M*.
  * If *M* is a numeric index signature and *S* contains a string index signature *N*, inferences are made from the type of *N* to the type of *M*.

When relating call or construct signatures, signatures in *S* correspond to signatures of the same kind in *T* pairwise in declaration order. If *S* and *T* have different numbers of a given kind of signature, the excess *first* signatures in declaration order of the longer list are ignored.

*TODO: Update to reflect [improved union and intersection type inference](https://github.com/Microsoft/TypeScript/pull/5738)*.

### Recursive Types { #recursive-types }

Classes and interfaces can reference themselves in their internal structure, in effect creating recursive types with infinite nesting. For example, the type

```TypeScript
interface A { next: A; }
```

contains an infinitely nested sequence of 'next' properties. Types such as this are perfectly valid but require special treatment when determining type relationships. Specifically, when relating types *S* and *T* for a given relationship (identity, subtype, or assignability), the relationship in question is assumed to be true for every directly or indirectly nested occurrence of the same *S* and the same *T* (where same means originating in the same declaration and, if applicable, having identical type arguments). For example, consider the identity relationship between 'A' above and 'B' below:

```TypeScript
interface B { next: C; }

interface C { next: D; }

interface D { next: B; }
```

To determine whether 'A' and 'B' are identical, first the 'next' properties of type 'A' and 'C' are related. That leads to relating the 'next' properties of type 'A' and 'D', which leads to relating the 'next' properties of type 'A' and 'B'. Since 'A' and 'B' are already being related this relationship is by definition true. That in turn causes the other relations to be true, and therefore the final result is true.

When this same technique is used to relate generic type references, two type references are considered the same when they originate in the same declaration and have identical type arguments.

In certain circumstances, generic types that directly or indirectly reference themselves in a recursive fashion can lead to infinite series of distinct instantiations. For example, in the type

```TypeScript
interface List<T> {
    data: T;
    next: List<T>;
    owner: List<List<T>>;
}
```

'List&lt;T>' has a member 'owner' of type 'List&lt;List&lt;T>>', which has a member 'owner' of type 'List&lt;List&lt;List&lt;T>>>', which has a member 'owner' of type 'List&lt;List&lt;List&lt;List&lt;T>>>>' and so on, ad infinitum. Since type relationships are determined structurally, possibly exploring the constituent types to their full depth, in order to determine type relationships involving infinitely expanding generic types it may be necessary for the compiler to terminate the recursion at some point with the assumption that no further exploration will change the outcome.

## Widened Types { #widened-types }

In several situations TypeScript infers types from context, alleviating the need for the programmer to explicitly specify types that appear obvious. For example

```TypeScript
var name = "Steve";
```

infers the type of 'name' to be the String primitive type since that is the type of the value used to initialize it. When inferring the type of a variable, property or function result from an expression, the ***widened*** form of the source type is used as the inferred type of the target. The widened form of a type is the type in which all occurrences of the Null and Undefined types have been replaced with the type `any`.

The following example shows the results of widening types to produce inferred variable types.

```TypeScript
var a = null;                 // var a: any
var b = undefined;            // var b: any
var c = { x: 0, y: null };    // var c: { x: number, y: any }
var d = [ null, undefined ];  // var d: any[]
```

<br/>

