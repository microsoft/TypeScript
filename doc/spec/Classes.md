# Classes { #classes }

TypeScript extends JavaScript classes to include type parameters, implements clauses, accessibility modifiers, member variable declarations, and parameter property declarations in constructors.

*TODO: Document [abstract classes](https://github.com/Microsoft/TypeScript/issues/3578)*.

## Class Declarations { #class-declarations }

A class declaration declares a ***class type*** and a ***constructor function***.

&emsp;&emsp;*ClassDeclaration:*  *( Modified )*
&emsp;&emsp;&emsp;`class`&emsp;*BindingIdentifier<sub>opt</sub>*&emsp;*TypeParameters<sub>opt</sub>*&emsp;*ClassHeritage*&emsp;`{`&emsp;*ClassBody*&emsp;`}`

A *ClassDeclaration* introduces a named type (the class type) and a named value (the constructor function) in the containing declaration space. The class type is formed from the instance members declared in the class body and the instance members inherited from the base class. The constructor function is given an anonymous type formed from the constructor declaration, the static member declarations in the class body, and the static members inherited from the base class. The constructor function initializes and returns an instance of the class type.

The *BindingIdentifier* of a class declaration may not be one of the predefined type names (section [#predefined-types]<!--3.8.1-->). The *BindingIdentifier* is optional only when the class declaration occurs in an export default declaration (section [#export-default-declarations]<!--11.3.4.2-->).

A class may optionally have type parameters (section [#type-parameter-lists]<!--3.6.1-->) that serve as placeholders for actual types to be provided when the class is referenced in type references. A class with type parameters is called a ***generic class***. The type parameters of a generic class declaration are in scope in the entire declaration and may be referenced in the *ClassHeritage* and *ClassBody*.

The following example introduces both a named type called 'Point' (the class type) and a named value called 'Point' (the constructor function) in the containing declaration space.

```TypeScript
class Point {
    constructor(public x: number, public y: number) { }
    public length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    static origin = new Point(0, 0);
}
```

The named type 'Point' is exactly equivalent to

```TypeScript
interface Point {
    x: number;
    y: number;
    length(): number;
}
```

The named value 'Point' is a constructor function whose type corresponds to the declaration

```TypeScript
var Point: {
    new(x: number, y: number): Point;
    origin: Point;
};
```

The context in which a class is referenced distinguishes between the class type and the constructor function. For example, in the assignment statement

```TypeScript
var p: Point = new Point(10, 20);
```

the identifier 'Point' in the type annotation refers to the class type, whereas the identifier 'Point' in the `new` expression refers to the constructor function object.

### Class Heritage Specification { #class-heritage-specification }

*TODO: Update this section to reflect [expressions in class extends clauses](https://github.com/Microsoft/TypeScript/pull/3516)*.

The heritage specification of a class consists of optional `extends` and `implements` clauses. The `extends` clause specifies the base class of the class and the `implements` clause specifies a set of interfaces for which to validate the class provides an implementation.

&emsp;&emsp;*ClassHeritage:*  *( Modified )*
&emsp;&emsp;&emsp;*ClassExtendsClause<sub>opt</sub>*&emsp;*ImplementsClause<sub>opt</sub>*

&emsp;&emsp;*ClassExtendsClause:*
&emsp;&emsp;&emsp;`extends`&emsp; *ClassType*

&emsp;&emsp;*ClassType:*
&emsp;&emsp;&emsp;*Expression*&emsp*TypeArguments*

&emsp;&emsp;*ImplementsClause:*
&emsp;&emsp;&emsp;`implements`&emsp;*ClassOrInterfaceTypeList*

A class that includes an `extends` clause is called a ***derived class***, and the class specified in the `extends` clause is called the ***base class*** of the derived class. When a class heritage specification omits the `extends` clause, the class does not have a base class. However, as is the case with every object type, type references (section [#named-type-references]<!--3.3.1-->) to the class will appear to have the members of the global interface type named 'Object' unless those members are hidden by members with the same name in the class.

The following constraints must be satisfied by the class heritage specification or otherwise a compile-time error occurs:

* If present, the type reference specified in the `extends` clause must denote a class type. Furthermore, the *TypeName* part of the type reference is required to be a reference to the class constructor function when evaluated as an expression.
* A class declaration may not, directly or indirectly, specify a base class that originates in the same declaration. In other words a class cannot, directly or indirectly, be a base class of itself, regardless of type arguments.
* The this-type (section [#this-types]<!--3.6.3-->) of the declared class must be assignable (section [#assignment-compatibility]<!--3.11.4-->) to the base type reference and each of the type references listed in the `implements` clause.
* The constructor function type created by the class declaration must be assignable to the base class constructor function type, ignoring construct signatures.

The following example illustrates a situation in which the first rule above would be violated:

```TypeScript
class A { a: number; }

namespace Foo {
    var A = 1;
    class B extends A { b: string; }
}
```

When evaluated as an expression, the type reference 'A' in the `extends` clause doesn't reference the class constructor function of 'A' (instead it references the local variable 'A').

The only situation in which the last two constraints above are violated is when a class overrides one or more base class members with incompatible new members.

Note that because TypeScript has a structural type system, a class doesn't need to explicitly state that it implements an interface—it suffices for the class to simply contain the appropriate set of instance members. The `implements` clause of a class provides a mechanism to assert and validate that the class contains the appropriate sets of instance members, but otherwise it has no effect on the class type.

### Class Body { #class-body }

The class body consists of zero or more constructor or member declarations. Statements are not allowed in the body of a class—they must be placed in the constructor or in members.

&emsp;&emsp;*ClassElement:*  *( Modified )*
&emsp;&emsp;&emsp;*ConstructorDeclaration*
&emsp;&emsp;&emsp;*PropertyMemberDeclaration*
&emsp;&emsp;&emsp;*IndexMemberDeclaration*

The body of class may optionally contain a single constructor declaration. Constructor declarations are described in section [#constructor-declarations]<!--8.3-->.

Member declarations are used to declare instance and static members of the class. Property member declarations are described in section [#property-member-declarations]<!--8.4--> and index member declarations are described in section [#index-member-declarations]<!--8.5-->.

## Members { #members }

The members of a class consist of the members introduced through member declarations in the class body and the members inherited from the base class.

### Instance and Static Members { #instance-and-static-members }

Members are either ***instance members*** or ***static members***.

Instance members are members of the class type (section [#class-types]<!--8.2.4-->) and its associated this-type. Within constructors, instance member functions, and instance member accessors, the type of `this` is the this-type (section [#this-types]<!--3.6.3-->) of the class.

Static members are declared using the `static` modifier and are members of the constructor function type (section [#constructor-function-types]<!--8.2.5-->). Within static member functions and static member accessors, the type of `this` is the constructor function type.

Class type parameters cannot be referenced in static member declarations.

### Accessibility { #accessibility }

Property members have either ***public***, ***private***, or ***protected*** accessibility. The default is public accessibility, but property member declarations may include a `public`, `private`, or `protected` modifier to explicitly specify the desired accessibility.

Public property members can be accessed everywhere without restrictions.

Private property members can be accessed only within their declaring class. Specifically, a private member *M* declared in a class *C* can be accessed only within the class body of *C*.

Protected property members can be accessed only within their declaring class and classes derived from their declaring class, and a protected instance property member must be accessed *through* an instance of the enclosing class or a subclass thereof. Specifically, a protected member *M* declared in a class *C* can be accessed only within the class body of *C* or the class body of a class derived from *C*. Furthermore, when a protected instance member *M* is accessed in a property access *E*`.`*M* within the body of a class *D*, the type of *E* is required to be *D* or a type that directly or indirectly has *D* as a base type, regardless of type arguments.

Private and protected accessibility is enforced only at compile-time and serves as no more than an *indication of intent*. Since JavaScript provides no mechanism to create private and protected properties on an object, it is not possible to enforce the private and protected modifiers in dynamic code at run-time. For example, private and protected accessibility can be defeated by changing an object's static type to Any and accessing the member dynamically.

The following example demonstrates private and protected accessibility:

```TypeScript
class A {
    private x: number;
    protected y: number;
    static f(a: A, b: B) {
        a.x = 1;  // Ok
        b.x = 1;  // Ok
        a.y = 1;  // Ok
        b.y = 1;  // Ok
    }
}

class B extends A {
    static f(a: A, b: B) {
        a.x = 1;  // Error, x only accessible within A
        b.x = 1;  // Error, x only accessible within A
        a.y = 1;  // Error, y must be accessed through instance of B
        b.y = 1;  // Ok
    }
}
```

In class 'A', the accesses to 'x' are permitted because 'x' is declared in 'A', and the accesses to 'y' are permitted because both take place through an instance of 'A' or a type derived from 'A'. In class 'B', access to 'x' is not permitted, and the first access to 'y' is an error because it takes place through an instance of 'A', which is not derived from the enclosing class 'B'.

### Inheritance and Overriding { #inheritance-and-overriding }

A derived class ***inherits*** all members from its base class it doesn't ***override***. Inheritance means that a derived class implicitly contains all non-overridden members of the base class. Only public and protected property members can be overridden.

A property member in a derived class is said to override a property member in a base class when the derived class property member has the same name and kind (instance or static) as the base class property member. The type of an overriding property member must be assignable (section [#assignment-compatibility]<!--3.11.4-->) to the type of the overridden property member, or otherwise a compile-time error occurs.

Base class instance member functions can be overridden by derived class instance member functions, but not by other kinds of members.

Base class instance member variables and accessors can be overridden by derived class instance member variables and accessors, but not by other kinds of members.

Base class static property members can be overridden by derived class static property members of any kind as long as the types are compatible, as described above.

An index member in a derived class is said to override an index member in a base class when the derived class index member is of the same index kind (string or numeric) as the base class index member. The type of an overriding index member must be assignable (section [#assignment-compatibility]<!--3.11.4-->) to the type of the overridden index member, or otherwise a compile-time error occurs.

### Class Types { #class-types }

A class declaration declares a new named type (section [#named-types]<!--3.7-->) called a class type. Within the constructor and instance member functions of a class, the type of `this` is the this-type (section [#this-types]<!--3.6.3-->) of that class type. The class type has the following members:

* A property for each instance member variable declaration in the class body.
* A property of a function type for each instance member function declaration in the class body.
* A property for each uniquely named instance member accessor declaration in the class body.
* A property for each constructor parameter declared with a `public`, `private`, or `protected` modifier.
* An index signature for each instance index member declaration in the class body.
* All base class instance property or index members that are not overridden in the class.

All instance property members (including those that are private or protected) of a class must satisfy the constraints implied by the index members of the class as specified in section [#index-signatures]<!--3.9.4-->.

In the example

```TypeScript
class A {
    public x: number;
    public f() { }
    public g(a: any) { return undefined; }
    static s: string;
}

class B extends A {
    public y: number;
    public g(b: boolean) { return false; }
}
```

the class type of 'A' is equivalent to

```TypeScript
interface A {
    x: number;
    f: () => void;
    g: (a: any) => any;
}
```

and the class type of 'B' is equivalent to

```TypeScript
interface B {
    x: number;
    y: number;
    f: () => void;
    g: (b: boolean) => boolean;
}
```

Note that static declarations in a class do not contribute to the class type—rather, static declarations introduce properties on the constructor function object. Also note that the declaration of 'g' in 'B' overrides the member inherited from 'A'.

#### Mixin Class Types { #mixin-class-types }

A mixin class is class declaration or expression that `extends` an expression whose type is a type parameter. The following rules apply to mixin class declarations:

* The type parameter type of the `extends` expression must be constrained to a mixin constructor type (see [#mixin-constructor-types]).
* If a mixin class has a constructor, it must have a mixin constructor type.

Given an expression `Base` of type *T*, a type parameter constrained to *typeof X*, the mixin class `class C extends Base { ... }` is processed as if *Base* had type *typeof X*, where *X* is some object type.
Then *C* has a constructor function whose return type is the intersection of *C* and *X*.
That is, a mixin class is represented as an intersection between the mixin class constructor type and the parametric base class constructor type.

Mixin classes can be used as in the following example:

```ts
class Person {
    constructor(public name: string) {}
}

type Constructor<T> = new(...args: any[]) => T;

function Mixer<T extends Constructor<{}>>(Base: T) {
    return class extends Base {
        mix: string;
        constructor(...args: any[]) {
            super(...args);
            this.mix = "";
        }
    }
}

const MixPerson = Mixer(Person);

let person = new MixPerson("Alice");
person.mix = "string";
person.name = "Bob";
```

### Constructor Function Types { #constructor-function-types }

The type of the constructor function introduced by a class declaration is called the constructor function type. The constructor function type has the following members:

* If the class contains no constructor declaration and has no base class, a single construct signature with no parameters, having the same type parameters as the class (if any) and returning an instantiation of the class type with those type parameters passed as type arguments.
* If the class contains no constructor declaration and has a base class, a set of construct signatures with the same parameters as those of the base class constructor function type following substitution of type parameters with the type arguments specified in the base class type reference, all having the same type parameters as the class (if any) and returning an instantiation of the class type with those type parameters passed as type arguments.
* If the class contains a constructor declaration with no overloads, a construct signature with the parameter list of the constructor implementation, having the same type parameters as the class (if any) and returning an instantiation of the class type with those type parameters passed as type arguments.
* If the class contains a constructor declaration with overloads, a set of construct signatures with the parameter lists of the overloads, all having the same type parameters as the class (if any) and returning an instantiation of the class type with those type parameters passed as type arguments.
* A property for each static member variable declaration in the class body.
* A property of a function type for each static member function declaration in the class body.
* A property for each uniquely named static member accessor declaration in the class body.
* A property named 'prototype', the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
* All base class constructor function type properties that are not overridden in the class.

Every class automatically contains a static property member named 'prototype', the type of which is the containing class with type Any substituted for each type parameter.

The example

```TypeScript
class Pair<T1, T2> {
    constructor(public item1: T1, public item2: T2) { }
}

class TwoArrays<T> extends Pair<T[], T[]> { }
```

introduces two named types corresponding to

```TypeScript
interface Pair<T1, T2> {
    item1: T1;
    item2: T2;
}

interface TwoArrays<T> {
    item1: T[];
    item2: T[];
}
```

and two constructor functions corresponding to

```TypeScript
var Pair: {
    new <T1, T2>(item1: T1, item2: T2): Pair<T1, T2>;
}

var TwoArrays: {
    new <T>(item1: T[], item2: T[]): TwoArrays<T>;
}
```

Note that each construct signature in the constructor function types has the same type parameters as its class and returns an instantiation of its class with those type parameters passed as type arguments. Also note that when a derived class doesn't declare a constructor, type arguments from the base class reference are substituted before construct signatures are propagated from the base constructor function type to the derived constructor function type.

## Constructor Declarations { #constructor-declarations }

A constructor declaration declares the constructor function of a class.

&emsp;&emsp;*ConstructorDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`constructor`&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`constructor`&emsp;`(`&emsp;*ParameterList<sub>opt</sub>*&emsp;`)`&emsp;`;`

Constructor declarations that specify a body are called ***constructor implementations*** and constructor declarations without a body are called ***constructor overloads***. It is possible to specify multiple constructor overloads in a class, but a class can have at most one constructor implementation. All constructor declarations in a class must specify the same set of modifiers. Only public constructors are supported and private or protected constructors result in an error.

In a class with no constructor declaration, an automatic constructor is provided, as described in section [#automatic-constructors]<!--8.3.3-->.

When a class has constructor overloads, the overloads determine the construct signatures of the type given to the constructor function object, and the constructor implementation signature (if any) must be assignable to that type. Otherwise, the constructor implementation itself determines the construct signature. This exactly parallels the way overloads are processed in a function declaration (section [#function-overloads]<!--6.2-->).

When a class has both constructor overloads and a constructor implementation, the overloads must precede the implementation and all of the declarations must be consecutive with no intervening grammatical elements.

The function body of a constructor is permitted to contain return statements. If return statements specify expressions, those expressions must be of types that are assignable to the this-type (section [#this-types]<!--3.6.3-->) of the class.

The type parameters of a generic class are in scope and accessible in a constructor declaration.

### Constructor Parameters { #constructor-parameters }

Similar to functions, only the constructor implementation (and not constructor overloads) can specify default value expressions for optional parameters. It is a compile-time error for such default value expressions to reference `this`. When the output target is ECMAScript 3 or 5, for each parameter with a default value, a statement that substitutes the default value for an omitted argument is included in the JavaScript generated for the constructor function.

A parameter of a *ConstructorImplementation* may be prefixed with a `public`, `private`, or `protected` modifier. This is called a ***parameter property declaration*** and is shorthand for declaring a property with the same name as the parameter and initializing it with the value of the parameter. For example, the declaration

```TypeScript
class Point {
    constructor(public x: number, public y: number) {
        // Constructor body
    }
}
```

is equivalent to writing

```TypeScript
class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Constructor body
    }
}
```

A parameter property declaration may declare an optional parameter (by including a question mark or a default value), but the property introduced by such a declaration is always considered a required property (section [#members]<!--3.3.6-->).

### Super Calls { #super-calls }

Super calls (section [#super-calls]<!--4.9.1-->) are used to call the constructor of the base class. A super call consists of the keyword `super` followed by an argument list enclosed in parentheses. For example:

```TypeScript
class ColoredPoint extends Point {
    constructor(x: number, y: number, public color: string) {
        super(x, y);
    }
}
```

Constructors of classes with no `extends` clause may not contain super calls, whereas constructors of derived classes must contain at least one super call somewhere in their function body. Super calls are not permitted outside constructors or in local functions inside constructors.

The first statement in the body of a constructor *must* be a super call if both of the following are true:

* The containing class is a derived class.
* The constructor declares parameter properties or the containing class declares instance member variables with initializers.

In such a required super call, it is a compile-time error for argument expressions to reference `this`.

Initialization of parameter properties and instance member variables with initializers takes place immediately at the beginning of the constructor body if the class has no base class, or immediately following the super call if the class is a derived class.

### Automatic Constructors { #automatic-constructors }

If a class omits a constructor declaration, an ***automatic constructor*** is provided.

In a class with no `extends` clause, the automatic constructor has no parameters and performs no action other than executing the instance member variable initializers (section [#member-variable-declarations]<!--8.4.1-->), if any.

In a derived class, the automatic constructor has the same parameter list (and possibly overloads) as the base class constructor. The automatically provided constructor first forwards the call to the base class constructor using a call equivalent to

```TypeScript
BaseClass.apply(this, arguments);
```

and then executes the instance member variable initializers, if any.

## Property Member Declarations { #property-member-declarations }

Property member declarations can be member variable declarations, member function declarations, or member accessor declarations.

&emsp;&emsp;*PropertyMemberDeclaration:*
&emsp;&emsp;&emsp;*MemberVariableDeclaration*
&emsp;&emsp;&emsp;*MemberFunctionDeclaration*
&emsp;&emsp;&emsp;*MemberAccessorDeclaration*

Member declarations without a `static` modifier are called instance member declarations. Instance property member declarations declare properties in the class type (section [#class-types]<!--8.2.4-->), and must specify names that are unique among all instance property member and parameter property declarations in the containing class, with the exception that instance get and set accessor declarations may pairwise specify the same name.

Member declarations with a `static` modifier are called static member declarations. Static property member declarations declare properties in the constructor function type (section [#constructor-function-types]<!--8.2.5-->), and must specify names that are unique among all static property member declarations in the containing class, with the exception that static get and set accessor declarations may pairwise specify the same name.

Note that the declaration spaces of instance and static property members are separate. Thus, it is possible to have instance and static property members with the same name.

Except for overrides, as described in section [#inheritance-and-overriding]<!--8.2.3-->, it is an error for a derived class to declare a property member with the same name and kind (instance or static) as a base class member.

Every class automatically contains a static property member named 'prototype', the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter. It is an error to explicitly declare a static property member with the name 'prototype'.

Below is an example of a class containing both instance and static property member declarations:

```TypeScript
class Point {
    constructor(public x: number, public y: number) { }
    public distance(p: Point) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    static origin = new Point(0, 0);
    static distance(p1: Point, p2: Point) { return p1.distance(p2); }
}
```

The class type 'Point' has the members:

```TypeScript
interface Point {
    x: number;
    y: number;
    distance(p: Point);
}
```

and the constructor function 'Point' has a type corresponding to the declaration:

```TypeScript
var Point: {
    new(x: number, y: number): Point;
    origin: Point;
    distance(p1: Point, p2: Point): number;
}
```

### Member Variable Declarations { #member-variable-declarations }

A member variable declaration declares an instance member variable or a static member variable.

&emsp;&emsp;*MemberVariableDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*TypeAnnotation<sub>opt</sub>*&emsp;*Initializer<sub>opt</sub>*&emsp;`;`

The type associated with a member variable declaration is determined in the same manner as an ordinary variable declaration (see section [#variable-statements]<!--5.2-->).

An instance member variable declaration introduces a member in the class type and optionally initializes a property on instances of the class. Initializers in instance member variable declarations are executed once for every new instance of the class and are equivalent to assignments to properties of `this` in the constructor. In an initializer expression for an instance member variable, `this` is of the this-type (section [#this-types]<!--3.6.3-->) of the class.

A static member variable declaration introduces a property in the constructor function type and optionally initializes a property on the constructor function object. Initializers in static member variable declarations are executed once when the containing script or module is loaded.

Initializer expressions for instance member variables are evaluated in the scope of the class constructor body but are not permitted to reference parameters or local variables of the constructor. This effectively means that entities from outer scopes by the same name as a constructor parameter or local variable are inaccessible in initializer expressions for instance member variables.

Since instance member variable initializers are equivalent to assignments to properties of `this` in the constructor, the example

```TypeScript
class Employee {
    public name: string;
    public address: string;
    public retired = false;
    public manager: Employee = null;
    public reports: Employee[] = [];
}
```

is equivalent to

```TypeScript
class Employee {
    public name: string;
    public address: string;
    public retired: boolean;
    public manager: Employee;
    public reports: Employee[];
    constructor() {
        this.retired = false;
        this.manager = null;
        this.reports = [];
    }
}
```

### Member Function Declarations { #member-function-declarations }

A member function declaration declares an instance member function or a static member function.

&emsp;&emsp;*MemberFunctionDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`{`&emsp;*FunctionBody*&emsp;`}`
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*PropertyName*&emsp;*CallSignature*&emsp;`;`

A member function declaration is processed in the same manner as an ordinary function declaration (section [#functions]<!--6-->), except that in a member function `this` has a known type.

All declarations for the same member function must specify the same accessibility (public, private, or protected) and kind (instance or static).

An instance member function declaration declares a property in the class type and assigns a function object to a property on the prototype object of the class. In the body of an instance member function declaration, `this` is of the this-type (section [#this-types]<!--3.6.3-->) of the class.

A static member function declaration declares a property in the constructor function type and assigns a function object to a property on the constructor function object. In the body of a static member function declaration, the type of `this` is the constructor function type.

A member function can access overridden base class members using a super property access (section [#super-property-access]<!--4.9.2-->). For example

```TypeScript
class Point {
    constructor(public x: number, public y: number) { }
    public toString() {
        return "x=" + this.x + " y=" + this.y;
    }
}

class ColoredPoint extends Point {
    constructor(x: number, y: number, public color: string) {
        super(x, y);
    }
    public toString() {
        return super.toString() + " color=" + this.color;
    }
}
```

In a static member function, `this` represents the constructor function object on which the static member function was invoked. Thus, a call to 'new this()' may actually invoke a derived class constructor:

```TypeScript
class A {
    a = 1;
    static create() {
        return new this();
    }
}

class B extends A {
    b = 2;
}

var x = A.create();  // new A()
var y = B.create();  // new B()
```

Note that TypeScript doesn't require or verify that derived constructor functions are subtypes of base constructor functions. In other words, changing the declaration of 'B' to

```TypeScript
class B extends A {
    constructor(public b: number) {
        super();
    }
}
```

does not cause errors in the example, even though the call to the constructor from the 'create' function doesn't specify an argument (thus giving the value 'undefined' to 'b').

### Member Accessor Declarations { #member-accessor-declarations }

A member accessor declaration declares an instance member accessor or a static member accessor.

&emsp;&emsp;*MemberAccessorDeclaration:*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*GetAccessor*
&emsp;&emsp;&emsp;*AccessibilityModifier<sub>opt</sub>*&emsp;`static`*<sub>opt</sub>*&emsp;*SetAccessor*

Get and set accessors are processed in the same manner as in an object literal (section [#object-literals]<!--4.5-->), except that a contextual type is never available in a member accessor declaration.

Accessors for the same member name must specify the same accessibility.

An instance member accessor declaration declares a property in the class type and defines a property on the prototype object of the class with a get or set accessor. In the body of an instance member accessor declaration, `this` is of the this-type (section [#this-types]<!--3.6.3-->) of the class.

A static member accessor declaration declares a property in the constructor function type and defines a property on the constructor function object of the class with a get or set accessor. In the body of a static member accessor declaration, the type of `this` is the constructor function type.

Get and set accessors are emitted as calls to 'Object.defineProperty' in the generated JavaScript, as described in section [#classes-without-extends-clauses]<!--8.7.1-->.

### Dynamic Property Declarations { #dynamic-property-declarations }

If the *PropertyName* of a property member declaration is a computed property name that doesn't denote a well-known symbol ([#computed-property-names]<!--2.2.3-->), the construct is considered a ***dynamic property declaration***. The following rules apply to dynamic property declarations:

* A dynamic property declaration does not introduce a property in the class type or constructor function type.
* The property name expression of a dynamic property assignment must be of type Any or the String, Number, or Symbol primitive type.
* The name associated with a dynamic property declarations is considered to be a numeric property name if the property name expression is of type Any or the Number primitive type.

## Index Member Declarations { #index-member-declarations }

An index member declaration introduces an index signature (section [#index-signatures]<!--3.9.4-->) in the class type.

&emsp;&emsp;*IndexMemberDeclaration:*
&emsp;&emsp;&emsp;*IndexSignature*&emsp;`;`

Index member declarations have no body and cannot specify an accessibility modifier.

A class declaration can have at most one string index member declaration and one numeric index member declaration. All instance property members of a class must satisfy the constraints implied by the index members of the class as specified in section [#index-signatures]<!--3.9.4-->.

It is not possible to declare index members for the static side of a class.

Note that it is seldom meaningful to include a string index signature in a class because it constrains all instance properties of the class. However, numeric index signatures can be useful to control the element type when a class is used in an array-like manner.

## Decorators { #decorators }

*TODO: Document [decorators](https://github.com/Microsoft/TypeScript/issues/2249)*.

## Code Generation { #code-generation }

When the output target is ECMAScript 2015 or higher, type parameters, implements clauses, accessibility modifiers, and member variable declarations are removed in the emitted code, but otherwise class declarations are emitted as written. When the output target is ECMAScript 3 or 5, more comprehensive rewrites are performed, as described in this section.

### Classes Without Extends Clauses { #classes-without-extends-clauses }

A class with no `extends` clause generates JavaScript equivalent to the following:

```TypeScript
var <ClassName> = (function () {
    function <ClassName>(<ConstructorParameters>) {
        <DefaultValueAssignments>
        <ParameterPropertyAssignments>
        <MemberVariableAssignments>
        <ConstructorStatements>
    }
    <MemberFunctionStatements>
    <StaticVariableAssignments>
    return <ClassName>;
})();
```

*ClassName* is the name of the class.

*ConstructorParameters* is a comma separated list of the constructor's parameter names.

*DefaultValueAssignments* is a sequence of default property value assignments corresponding to those generated for a regular function declaration, as described in section [#code-generation]<!--6.6-->.

*ParameterPropertyAssignments* is a sequence of assignments, one for each parameter property declaration in the constructor, in order they are declared, of the form

```TypeScript
this.<ParameterName> = <ParameterName>;
```

where *ParameterName* is the name of a parameter property.

*MemberVariableAssignments* is a sequence of assignments, one for each instance member variable declaration with an initializer, in the order they are declared, of the form

```TypeScript
this.<MemberName> = <InitializerExpression>;
```

where *MemberName* is the name of the member variable and *InitializerExpression* is the code generated for the initializer expression.

*ConstructorStatements* is the code generated for the statements specified in the constructor body.

*MemberFunctionStatements* is a sequence of statements, one for each member function declaration or member accessor declaration, in the order they are declared.

An instance member function declaration generates a statement of the form

```TypeScript
<ClassName>.prototype.<MemberName> = function (<FunctionParameters>) {
    <DefaultValueAssignments>
    <FunctionStatements>
}
```

and static member function declaration generates a statement of the form

```TypeScript
<ClassName>.<MemberName> = function (<FunctionParameters>) {
    <DefaultValueAssignments>
    <FunctionStatements>
}
```

where *MemberName* is the name of the member function, and *FunctionParameters*, *DefaultValueAssignments*, and *FunctionStatements* correspond to those generated for a regular function declaration, as described in section [#code-generation]<!--6.6-->.

A get or set instance member accessor declaration, or a pair of get and set instance member accessor declarations with the same name, generates a statement of the form

```TypeScript
Object.defineProperty(<ClassName>.prototype, "<MemberName>", {
    get: function () {
        <GetAccessorStatements>
    },
    set: function (<ParameterName>) {
        <SetAccessorStatements>
    },
    enumerable: true,
    configurable: true
};
```

and a get or set static member accessor declaration, or a pair of get and set static member accessor declarations with the same name, generates a statement of the form

```TypeScript
Object.defineProperty(<ClassName>, "<MemberName>", {
    get: function () {
        <GetAccessorStatements>
    },
    set: function (<ParameterName>) {
        <SetAccessorStatements>
    },
    enumerable: true,
    configurable: true
};
```

where *MemberName* is the name of the member accessor, *GetAccessorStatements* is the code generated for the statements in the get acessor's function body, *ParameterName* is the name of the set accessor parameter, and *SetAccessorStatements* is the code generated for the statements in the set accessor's function body. The 'get' property is included only if a get accessor is declared and the 'set' property is included only if a set accessor is declared.

*StaticVariableAssignments* is a sequence of statements, one for each static member variable declaration with an initializer, in the order they are declared, of the form

```TypeScript
<ClassName>.<MemberName> = <InitializerExpression>;
```

where *MemberName* is the name of the static variable, and *InitializerExpression* is the code generated for the initializer expression.

### Classes With Extends Clauses { #classes-with-extends-clauses }

A class with an `extends` clause generates JavaScript equivalent to the following:

```TypeScript
var <ClassName> = (function (_super) {
    __extends(<ClassName>, _super);
    function <ClassName>(<ConstructorParameters>) {
        <DefaultValueAssignments>
        <SuperCallStatement>
        <ParameterPropertyAssignments>
        <MemberVariableAssignments>
        <ConstructorStatements>
    }
    <MemberFunctionStatements>
    <StaticVariableAssignments>
    return <ClassName>;
})(<BaseClassName>);
```

In addition, the '__extends' function below is emitted at the beginning of the JavaScript source file. It copies all properties from the base constructor function object to the derived constructor function object (in order to inherit static members), and appropriately establishes the 'prototype' property of the derived constructor function object.

```TypeScript
var __extends = this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function f() { this.constructor = d; }
    f.prototype = b.prototype;
    d.prototype = new f();
}
```

*BaseClassName* is the class name specified in the `extends` clause.

If the class has no explicitly declared constructor, the *SuperCallStatement* takes the form

```TypeScript
_super.apply(this, arguments);
```

Otherwise the *SuperCallStatement* is present if the constructor function is required to start with a super call, as discussed in section [#super-calls]<!--8.3.2-->, and takes the form

```TypeScript
_super.call(this, <SuperCallArguments>)
```

where *SuperCallArguments* is the argument list specified in the super call. Note that this call precedes the code generated for parameter properties and member variables with initializers. Super calls elsewhere in the constructor generate similar code, but the code generated for such calls will be part of the *ConstructorStatements* section.

A super property access in the constructor, an instance member function, or an instance member accessor generates JavaScript equivalent to

```TypeScript
_super.prototype.<PropertyName>
```

where *PropertyName* is the name of the referenced base class property. When the super property access appears in a function call, the generated JavaScript is equivalent to

```TypeScript
_super.prototype.<PropertyName>.call(this, <Arguments>)
```

where Arguments is the code generated for the argument list specified in the function call.

A super property access in a static member function or a static member accessor generates JavaScript equivalent to

```TypeScript
_super.<PropertyName>
```

where *PropertyName* is the name of the referenced base class property. When the super property access appears in a function call, the generated JavaScript is equivalent to

```TypeScript
_super.<PropertyName>.call(this, <Arguments>)
```

where Arguments is the code generated for the argument list specified in the function call.

<br/>

