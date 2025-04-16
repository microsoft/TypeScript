/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

export type BaseTypes = 'URI' | 'DocumentUri' | 'integer' | 'uinteger' | 'decimal' | 'RegExp' | 'string' | 'boolean' | 'null';

export type TypeKind = 'base' | 'reference' | 'array' | 'map' | 'and' | 'or' | 'tuple' | 'literal' | 'stringLiteral' | 'integerLiteral' | 'booleanLiteral';

/**
 * Indicates in which direction a message is sent in the protocol.
 */
export type MessageDirection = 'clientToServer' | 'serverToClient' | 'both';

/**
 * Represents a base type like `string` or `DocumentUri`.
 */
export type BaseType = {
	kind: 'base';
	name: BaseTypes;
};

/**
 * Represents a reference to another type (e.g. `TextDocument`).
 * This is either a `Structure`, a `Enumeration` or a `TypeAlias`
 * in the same meta model.
 */
export type ReferenceType = {
	kind: 'reference';
	name: string;
};

/**
 * Represents an array type (e.g. `TextDocument[]`).
 */
export type ArrayType = {
	kind: 'array';
	element: Type;
};

/**
 * Represents a type that can be used as a key in a
 * map type. If a reference type is used then the
 * type must either resolve to a `string` or `integer`
 * type. (e.g. `type ChangeAnnotationIdentifier === string`).
 */
export type MapKeyType = { kind: 'base'; name: 'URI' | 'DocumentUri' | 'string' | 'integer' } | ReferenceType;

/**
 * Represents a JSON object map
 * (e.g. `interface Map<K extends string | integer, V> { [key: K] => V; }`).
 */
export type MapType = {
	kind: 'map';
	key: MapKeyType;
	value: Type;
};

/**
 * Represents an `and`type
 * (e.g. TextDocumentParams & WorkDoneProgressParams`).
 */
export type AndType = {
	kind: 'and';
	items: Type[];
};

/**
 * Represents an `or` type
 * (e.g. `Location | LocationLink`).
 */
export type OrType = {
	kind: 'or';
	items: Type[];
};

/**
 * Represents a `tuple` type
 * (e.g. `[integer, integer]`).
 */
export type TupleType = {
	kind: 'tuple';
	items: Type[];
};

/**
 * Represents a literal structure
 * (e.g. `property: { start: uinteger; end: uinteger; }`).
 */
export type StructureLiteralType =  {
	kind: 'literal';
	value: StructureLiteral;
};

/**
 * Represents a string literal type
 * (e.g. `kind: 'rename'`).
 */
export type StringLiteralType = {
	kind: 'stringLiteral';
	value: string;
};

export type IntegerLiteralType = {
	/**
	 * Represents an integer literal type
	 * (e.g. `kind: 1`).
	 */
	kind: 'integerLiteral';
	value: number;
};

/**
 * Represents a boolean literal type
 * (e.g. `kind: true`).
 */
export type BooleanLiteralType = {
	kind: 'booleanLiteral';
	value: boolean;
};

export type Type = BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType;

/**
 * Represents a LSP request
 */
export type Request = {
	/**
	 * The request's method name.
	 */
	method: string;

	/**
	 * The type name of the request if any.
	 */
	typeName?: string;

	/**
	 * The parameter type(s) if any.
	 */
	params?: Type | Type[];

	/**
	 * The result type.
	 */
	result: Type;

	/**
	 * Optional partial result type if the request
	 * supports partial result reporting.
	 */
	partialResult?: Type;

	/**
	 * An optional error data type.
	 */
	errorData?: Type;

	/**
	 * Optional a dynamic registration method if it
	 * different from the request's method.
	 */
	registrationMethod?: string;

	/**
	 * Optional registration options if the request
	 * supports dynamic registration.
	 */
	registrationOptions?: Type;

	/**
	 * The direction in which this request is sent
	 * in the protocol.
	 */
	messageDirection: MessageDirection;

	/**
	 * An optional documentation;
	 */
	documentation?: string;

	/**
	 * Since when (release number) this request is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	/**
	 * Whether this is a proposed feature. If omitted
	 * the feature is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the request is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

/**
 * Represents a LSP notification
 */
export type Notification = {
	/**
	 * The notifications's method name.
	 */
	method: string;

	/**
	 * The type name of the notifications if any.
	 */
	typeName?: string;

	/**
	 * The parameter type(s) if any.
	 */
	params?: Type | Type[];

	/**
	 * Optional a dynamic registration method if it
	 * different from the notifications's method.
	 */
	registrationMethod?: string;

	/**
	 * Optional registration options if the notification
	 * supports dynamic registration.
	 */
	registrationOptions?: Type;

	/**
	 * The direction in which this notification is sent
	 * in the protocol.
	 */
	messageDirection: MessageDirection;

	/**
	 * An optional documentation;
	 */
	documentation?: string;

	/**
	 * Since when (release number) this notification is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	/**
	 * Whether this is a proposed notification. If omitted
	 * the notification is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the notification is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

/**
 * Represents an object property.
 */
export type Property = {
	/**
	 * The property name;
	 */
	name: string;

	/**
	 * The type of the property
	 */
	type: Type;

	/**
	 * Whether the property is optional. If
	 * omitted, the property is mandatory.
	 */
	optional?: boolean;

	/**
	 * An optional documentation.
	 */
	documentation?: string;

	/**
	 * Since when (release number) this property is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	/**
	 * Whether this is a proposed property. If omitted,
	 * the structure is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the property is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

/**
 * Defines the structure of an object literal.
 */
export type Structure = {
	/**
	 * The name of the structure.
	 */
	name: string;

	/**
	 * Structures extended from. This structures form
	 * a polymorphic type hierarchy.
	 */
	extends?: Type[];

	/**
	 * Structures to mix in. The properties of these
	 * structures are `copied` into this structure.
	 * Mixins don't form a polymorphic type hierarchy in
	 * LSP.
	 */
	mixins?: Type[];

	/**
	 * The properties.
	 */
	properties: Property[];

	/**
	 * An optional documentation;
	 */
	documentation?: string;

	/**
	 * Since when (release number) this structure is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	/**
	 * Whether this is a proposed structure. If omitted,
	 * the structure is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the structure is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

/**
 * Defines an unnamed structure of an object literal.
 */
export type StructureLiteral = {

	/**
	 * The properties.
	 */
	properties: Property[];

	/**
	 * An optional documentation.
	 */
	documentation?: string;

	/**
	 * Since when (release number) this structure is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	/**
	 * Whether this is a proposed structure. If omitted,
	 * the structure is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the literal is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

/**
 * Defines a type alias.
 * (e.g. `type Definition = Location | LocationLink`)
 */
export type TypeAlias = {
	/**
	 * The name of the type alias.
	 */
	name: string;

	/**
	 * The aliased type.
	 */
	type: Type;

	/**
	 * An optional documentation.
	 */
	 documentation?: string;

	/**
	 * Since when (release number) this structure is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	 /**
	 * Whether this is a proposed type alias. If omitted,
	 * the type alias is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the type alias is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

/**
 * Defines an enumeration entry.
 */
export type EnumerationEntry = {
	/**
	 * The name of the enum item.
	 */
	name: string;

	/**
	 * The value.
	 */
	value: string | number;

	/**
	 * An optional documentation.
	 */
	 documentation?: string;

	/**
	 * Since when (release number) this enumeration entry is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	 /**
	 * Whether this is a proposed enumeration entry. If omitted,
	 * the enumeration entry is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the enum entry is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

export type EnumerationType = { kind: 'base'; name: 'string' | 'integer' | 'uinteger' };

/**
 * Defines an enumeration.
 */
export type Enumeration = {
	/**
	 * The name of the enumeration.
	 */
	name: string;

	/**
	 * The type of the elements.
	 */
	type: EnumerationType;

	/**
	 * The enum values.
	 */
	values: EnumerationEntry[];

	/**
	 * Whether the enumeration supports custom values (e.g. values which are not
	 * part of the set defined in `values`). If omitted no custom values are
	 * supported.
	 */
	supportsCustomValues?: boolean;

	/**
	 * An optional documentation.
	 */
	 documentation?: string;

	/**
	 * Since when (release number) this enumeration is
	 * available. Is undefined if not known.
	 */
	since?: string;

	/**
	 * All since tags in case there was more than one tag.
	 * Is undefined if not known.
	 */
	sinceTags?: string[];

	 /**
	 * Whether this is a proposed enumeration. If omitted,
	 * the enumeration is final.
	 */
	proposed?: boolean;

	/**
	 * Whether the enumeration is deprecated or not. If deprecated
	 * the property contains the deprecation message.
	 */
	deprecated?: string;
};

export type MetaData = {
	/**
	 * The protocol version.
	 */
	version: string;
};

/**
 * The actual meta model.
 */
export type MetaModel = {
	/**
	 * Additional meta data.
	 */
	metaData: MetaData;

	/**
	 * The requests.
	 */
	requests: Request[];

	/**
	 * The notifications.
	 */
	notifications: Notification[];

	/**
	 * The structures.
	 */
	structures: Structure[];

	/**
	 * The enumerations.
	 */
	enumerations: Enumeration[];

	/**
	 * The type aliases.
	 */
	typeAliases: TypeAlias[];
};
