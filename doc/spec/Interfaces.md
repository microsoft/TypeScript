# Interfaces { #interfaces }

Interfaces provide the ability to name and parameterize object types and to compose existing named object types into new ones.

Interfaces have no run-time representation—they are purely a compile-time construct. Interfaces are particularly useful for documenting and validating the required shape of properties, objects passed as parameters, and objects returned from functions.

Because TypeScript has a structural type system, an interface type with a particular set of members is considered identical to, and can be substituted for, another interface type or object type literal with an identical set of members (see section [#type-and-member-identity]<!--3.11.2-->).

Class declarations may reference interfaces in their implements clause to validate that they provide an implementation of the interfaces.

## Interface Declarations { #interface-declarations }

An interface declaration declares an ***interface type***.

&emsp;&emsp;*InterfaceDeclaration:*
&emsp;&emsp;&emsp;`interface`&emsp;*BindingIdentifier*&emsp;*TypeParameters<sub>opt</sub>*&emsp;*InterfaceExtendsClause<sub>opt</sub>*&emsp;*ObjectType*

&emsp;&emsp;*InterfaceExtendsClause:*
&emsp;&emsp;&emsp;`extends`&emsp;*ClassOrInterfaceTypeList*

&emsp;&emsp;*ClassOrInterfaceTypeList:*
&emsp;&emsp;&emsp;*ClassOrInterfaceType*
&emsp;&emsp;&emsp;*ClassOrInterfaceTypeList*&emsp;`,`&emsp;*ClassOrInterfaceType*

&emsp;&emsp;*ClassOrInterfaceType:*
&emsp;&emsp;&emsp;*Expression*&emsp;*ClassOrInterfaceType*

An *InterfaceDeclaration* introduces a named type (section [#named-types]<!--3.7-->) in the containing declaration space. The *BindingIdentifier* of an interface declaration may not be one of the predefined type names (section [#predefined-types]<!--3.8.1-->).

An interface may optionally have type parameters (section [#type-parameter-lists]<!--3.6.1-->) that serve as placeholders for actual types to be provided when the interface is referenced in type references. An interface with type parameters is called a ***generic interface***. The type parameters of a generic interface declaration are in scope in the entire declaration and may be referenced in the *InterfaceExtendsClause* and *ObjectType* body.

An interface can inherit from zero or more ***base types*** which are specified in the *InterfaceExtendsClause*. The base types must be type references to class or interface types.

An interface has the members specified in the *ObjectType* of its declaration and furthermore inherits all base type members that aren't hidden by declarations in the interface:

* A property declaration hides a public base type property with the same name.
* A string index signature declaration hides a base type string index signature.
* A numeric index signature declaration hides a base type numeric index signature.

The following constraints must be satisfied by an interface declaration or otherwise a compile-time error occurs:

* An interface declaration may not, directly or indirectly, specify a base type that originates in the same declaration. In other words an interface cannot, directly or indirectly, be a base type of itself, regardless of type arguments.
* An interface cannot declare a property with the same name as an inherited private or protected property.
* Inherited properties with the same name must be identical (section [#type-and-member-identity]<!--3.11.2-->).
* All properties of the interface must satisfy the constraints implied by the index signatures of the interface as specified in section [#index-signatures]<!--3.9.4-->.
* The this-type (section [#this-types]<!--3.6.3-->) of the declared interface must be assignable (section [#assignment-compatibility]<!--3.11.4-->) to each of the base type references.

An interface is permitted to inherit identical members from multiple base types and will in that case only contain one occurrence of each particular member.

Below is an example of two interfaces that contain properties with the same name but different types:

```TypeScript
interface Mover {
    move(): void;
    getStatus(): { speed: number; };
}

interface Shaker {
    shake(): void;
    getStatus(): { frequency: number; };
}
```

An interface that extends 'Mover' and 'Shaker' must declare a new 'getStatus' property as it would otherwise inherit two 'getStatus' properties with different types. The new 'getStatus' property must be declared such that the resulting 'MoverShaker' is a subtype of both 'Mover' and 'Shaker':

```TypeScript
interface MoverShaker extends Mover, Shaker {
    getStatus(): { speed: number; frequency: number; };
}
```

Since function and constructor types are just object types containing call and construct signatures, interfaces can be used to declare named function and constructor types. For example:

```TypeScript
interface StringComparer { (a: string, b: string): number; }
```

This declares type 'StringComparer' to be a function type taking two strings and returning a number.

## Declaration Merging { #declaration-merging }

Interfaces are "open-ended" and interface declarations with the same qualified name relative to a common root (as defined in section [#declarations]<!--2.3-->) contribute to a single interface.

When a generic interface has multiple declarations, all declarations must have identical type parameter lists, i.e. identical type parameter names with identical constraints in identical order.

In an interface with multiple declarations, the `extends` clauses are merged into a single set of base types and the bodies of the interface declarations are merged into a single object type. Declaration merging produces a declaration order that corresponds to *prepending* the members of each interface declaration, in the order the members are written, to the combined list of members in the order of the interface declarations. Thus, members declared in the last interface declaration will appear first in the declaration order of the merged type.

For example, a sequence of declarations in this order:

```TypeScript
interface Document {
    createElement(tagName: any): Element;
}

interface Document {
    createElement(tagName: string): HTMLElement;
}

interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}
```

is equivalent to the following single declaration:

```TypeScript
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}
```

Note that the members of the last interface declaration appear first in the merged declaration. Also note that the relative order of members declared in the same interface body is preserved.

*TODO: Document [class and interface declaration merging](https://github.com/Microsoft/TypeScript/pull/3333)*.

## Interfaces Extending Classes { #interfaces-extending-classes }

When an interface type extends a class type it inherits the members of the class but not their implementations. It is as if the interface had declared all of the members of the class without providing an implementation. Interfaces inherit even the private and protected members of a base class. When a class containing private or protected members is the base type of an interface type, that interface type can only be implemented by that class or a descendant class. For example:

```TypeScript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control {
    select() { }
}

class TextBox extends Control {
    select() { }
}

class Image extends Control {
}

class Location {
    select() { }
}
```

In the above example, 'SelectableControl' contains all of the members of 'Control', including the private 'state' property. Since 'state' is a private member it is only possible for descendants of 'Control' to implement 'SelectableControl'. This is because only descendants of 'Control' will have a 'state' private member that originates in the same declaration, which is a requirement for private members to be compatible (section [#type-relationships]<!--3.11-->).

Within the 'Control' class it is possible to access the 'state' private member through an instance of 'SelectableControl'. Effectively, a 'SelectableControl' acts like a 'Control' that is known to have a 'select' method. The 'Button' and 'TextBox' classes are subtypes of 'SelectableControl' (because they both inherit from 'Control' and have a 'select' method), but the 'Image' and 'Location' classes are not.

## Dynamic Type Checks { #dynamic-type-checks }

TypeScript does not provide a direct mechanism for dynamically testing whether an object implements a particular interface. Instead, TypeScript code can use the JavaScript technique of checking whether an appropriate set of members are present on the object. For example, given the declarations in section [#interface-declarations]<!--7.1-->, the following is a dynamic check for the 'MoverShaker' interface:

```TypeScript
var obj: any = getSomeObject();
if (obj && obj.move && obj.shake && obj.getStatus) {
    var moverShaker = <MoverShaker> obj;
    ...
}
```

If such a check is used often it can be abstracted into a function:

```TypeScript
function asMoverShaker(obj: any): MoverShaker {
    return obj && obj.move && obj.shake && obj.getStatus ? obj : null;
}
```

<br/>

