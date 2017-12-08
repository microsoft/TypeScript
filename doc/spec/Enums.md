# Enums { #enums }

An enum type is a distinct subtype of the Number primitive type with an associated set of named constants that define the possible values of the enum type.

## Enum Declarations { #enum-declarations }

An enum declaration declares an ***enum type*** and an ***enum object***.

&emsp;&emsp;*EnumDeclaration:*
&emsp;&emsp;&emsp;`const`*<sub>opt</sub>*&emsp;`enum`&emsp;*BindingIdentifier*&emsp;`{`&emsp;*EnumBody<sub>opt</sub>*&emsp;`}`

An *EnumDeclaration* introduces a named type (the enum type) and a named value (the enum object) in the containing declaration space. The enum type is a distinct subtype of the Number primitive type. The enum object is a value of an anonymous object type containing a set of properties, all of the enum type, corresponding to the values declared for the enum type in the body of the declaration. The enum object's type furthermore includes a numeric index signature with the signature '[x: number]: string'.

The *BindingIdentifier* of an enum declaration may not be one of the predefined type names (section [#predefined-types]<!--3.8.1-->).

When an enum declaration includes a `const` modifier it is said to be a constant enum declaration. The members of a constant enum declaration must all have constant values that can be computed at compile time. Constant enum declarations are discussed in section [#constant-enum-declarations]<!--9.4-->.

The example

```TypeScript
enum Color { Red, Green, Blue }
```

declares a subtype of the Number primitive type called 'Color' and introduces a variable 'Color' with a type that corresponds to the declaration

```TypeScript
var Color: {
    [x: number]: string;
    Red: Color;
    Green: Color;
    Blue: Color;
};
```

The numeric index signature reflects a "reverse mapping" that is automatically generated in every enum object, as described in section [#code-generation]<!--9.5-->. The reverse mapping provides a convenient way to obtain the string representation of an enum value. For example

```TypeScript
var c = Color.Red;
console.log(Color[c]);  // Outputs "Red"
```

## Enum Members { #enum-members }

The body of an enum declaration defines zero or more enum members which are the named values of the enum type. Each enum member has an associated numeric value of the primitive type introduced by the enum declaration.

&emsp;&emsp;*EnumBody:*
&emsp;&emsp;&emsp;*EnumMemberList*&emsp;`,`*<sub>opt</sub>*

&emsp;&emsp;*EnumMemberList:*
&emsp;&emsp;&emsp;*EnumMember*
&emsp;&emsp;&emsp;*EnumMemberList*&emsp;`,`&emsp;*EnumMember*

&emsp;&emsp;*EnumMember:*
&emsp;&emsp;&emsp;*PropertyName*
&emsp;&emsp;&emsp;*PropertyName*&emsp;=&emsp;*EnumValue*

&emsp;&emsp;*EnumValue:*
&emsp;&emsp;&emsp;*AssignmentExpression*

The *PropertyName* of an enum member cannot be a computed property name ([#computed-property-names]<!--2.2.3-->).

Enum members are either ***constant members*** or ***computed members***. Constant members have known constant values that are substituted in place of references to the members in the generated JavaScript code. Computed members have values that are computed at run-time and not known at compile-time. No substitution is performed for references to computed members.

An enum member is classified as follows:

* If the member declaration specifies no value, the member is considered a constant enum member. If the member is the first member in the enum declaration, it is assigned the value zero. Otherwise, it is assigned the value of the immediately preceding member plus one, and an error occurs if the immediately preceding member is not a constant enum member.
* If the member declaration specifies a value that can be classified as a constant enum expression (as defined below), the member is considered a constant enum member.
* Otherwise, the member is considered a computed enum member.

Enum value expressions must be of type Any, the Number primitive type, or the enum type itself.

A ***constant enum expression*** is a subset of the expression grammar that can be evaluated fully at compile time. An expression is considered a constant enum expression if it is one of the following:

* A numeric literal.
* An identifier or property access that denotes a previously declared member in the same constant enum declaration.
* A parenthesized constant enum expression.
* A +, –, or ~ unary operator applied to a constant enum expression.
* A +, –, *, /, %, &lt;&lt;, >>, >>>, &, ^, or | operator applied to two constant enum expressions.

In the example

```TypeScript
enum Test {
    A,
    B,
    C = Math.floor(Math.random() * 1000),
    D = 10,
    E
}
```

'A', 'B', 'D', and 'E' are constant members with values 0, 1, 10, and 11 respectively, and 'C' is a computed member.

In the example

```TypeScript
enum Style {
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4,
    Emphasis = Bold | Italic,
    Hyperlink = Bold | Underline
}
```

all members are constant members. Note that enum member declarations can reference other enum members without qualification. Also, because enums are subtypes of the Number primitive type, numeric operators, such as the bitwise OR operator, can be used to compute enum values.

## Declaration Merging { #declaration-merging }

Enums are "open-ended" and enum declarations with the same qualified name relative to a common root (as defined in section [#declarations]<!--2.3-->) define a single enum type and contribute to a single enum object.

It isn't possible for one enum declaration to continue the automatic numbering sequence of another, and when an enum type has multiple declarations, only one declaration is permitted to omit a value for the first member.

When enum declarations are merged, they must either all specify a `const` modifier or all specify no `const` modifier.

## Constant Enum Declarations { #constant-enum-declarations }

An enum declaration that specifies a `const` modifier is a ***constant enum declaration***. In a constant enum declaration, all members must have constant values and it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.

Unlike regular enum declarations, constant enum declarations are completely erased in the emitted JavaScript code. For this reason, it is an error to reference a constant enum object in any other context than a property access that selects one of the enum's members. For example:

```TypeScript
const enum Comparison {
    LessThan = -1,
    EqualTo = 0,
    GreaterThan = 1
}

var x = Comparison.EqualTo;  // Ok, replaced with 0 in emitted code
var y = Comparison[Comparison.EqualTo];  // Error
var z = Comparison;  // Error
```

The entire const enum declaration is erased in the emitted JavaScript code. Thus, the only permitted references to the enum object are those that are replaced with an enum member value.

## Code Generation { #code-generation }

An enum declaration generates JavaScript equivalent to the following:

```TypeScript
var <EnumName>;
(function (<EnumName>) {
    <EnumMemberAssignments>
})(<EnumName>||(<EnumName>={}));
```

*EnumName* is the name of the enum.

*EnumMemberAssignments* is a sequence of assignments, one for each enum member, in order they are declared, of the form

```TypeScript
<EnumName>[<EnumName>["<MemberName>"] = <Value>] = "<MemberName>";
```

where *MemberName* is the name of the enum member and *Value* is the assigned constant value or the code generated for the computed value expression.

For example, the 'Color' enum example from section [#enum-declarations]<!--9.1--> generates the following JavaScript:

```TypeScript
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color||(Color={}));
```

<br/>
