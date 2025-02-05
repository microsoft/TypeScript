export type Type = (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
export type BaseTypes = ("URI" | "DocumentUri" | "integer" | "uinteger" | "decimal" | "RegExp" | "string" | "boolean" | "null")
/**
 * Represents a type that can be used as a key in a map type. If a reference type is used then the type must either resolve to a `string` or `integer` type. (e.g. `type ChangeAnnotationIdentifier === string`).
 */
export type MapKeyType = ({
  kind: "base"
  name: ("URI" | "DocumentUri" | "string" | "integer")
} | ReferenceType)

/**
 * The actual meta model.
 */
export interface MetaModel {
  /**
   * The enumerations.
   */
  enumerations: Enumeration[]
  metaData: MetaData
  /**
   * The notifications.
   */
  notifications: Notification[]
  /**
   * The requests.
   */
  requests: Request[]
  /**
   * The structures.
   */
  structures: Structure[]
  /**
   * The type aliases.
   */
  typeAliases: TypeAlias[]
}
/**
 * Defines an enumeration.
 */
export interface Enumeration {
  /**
   * Whether the enumeration is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation.
   */
  documentation?: string
  /**
   * The name of the enumeration.
   */
  name: string
  /**
   * Whether this is a proposed enumeration. If omitted, the enumeration is final.
   */
  proposed?: boolean
  /**
   * Since when (release number) this enumeration is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
  /**
   * Whether the enumeration supports custom values (e.g. values which are not part of the set defined in `values`). If omitted no custom values are supported.
   */
  supportsCustomValues?: boolean
  type: EnumerationType
  /**
   * The enum values.
   */
  values: EnumerationEntry[]
}
/**
 * The type of the elements.
 */
export interface EnumerationType {
  kind: "base"
  name: ("string" | "integer" | "uinteger")
}
/**
 * Defines an enumeration entry.
 */
export interface EnumerationEntry {
  /**
   * Whether the enum entry is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation.
   */
  documentation?: string
  /**
   * The name of the enum item.
   */
  name: string
  /**
   * Whether this is a proposed enumeration entry. If omitted, the enumeration entry is final.
   */
  proposed?: boolean
  /**
   * Since when (release number) this enumeration entry is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
  /**
   * The value.
   */
  value: (string | number)
}
/**
 * Additional meta data.
 */
export interface MetaData {
  /**
   * The protocol version.
   */
  version: string
}
/**
 * Represents a LSP notification
 */
export interface Notification {
  /**
   * Whether the notification is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation;
   */
  documentation?: string
  /**
   * The direction in which this notification is sent in the protocol.
   */
  messageDirection: ("clientToServer" | "serverToClient" | "both")
  /**
   * The notifications's method name.
   */
  method: string
  /**
   * The parameter type(s) if any.
   */
  params?: (Type | Type[])
  /**
   * Whether this is a proposed notification. If omitted the notification is final.
   */
  proposed?: boolean
  /**
   * Optional a dynamic registration method if it different from the notifications's method.
   */
  registrationMethod?: string
  /**
   * Optional registration options if the notification supports dynamic registration.
   */
  registrationOptions?: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
  /**
   * Since when (release number) this notification is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
  /**
   * The type name of the notifications if any.
   */
  typeName?: string
}
/**
 * Represents a base type like `string` or `DocumentUri`.
 */
export interface BaseType {
  kind: "base"
  name: BaseTypes
}
/**
 * Represents a reference to another type (e.g. `TextDocument`). This is either a `Structure`, a `Enumeration` or a `TypeAlias` in the same meta model.
 */
export interface ReferenceType {
  kind: "reference"
  name: string
}
/**
 * Represents an array type (e.g. `TextDocument[]`).
 */
export interface ArrayType {
  element: Type
  kind: "array"
}
/**
 * Represents a JSON object map (e.g. `interface Map<K extends string | integer, V> { [key: K] => V; }`).
 */
export interface MapType {
  key: MapKeyType
  kind: "map"
  value: Type
}
/**
 * Represents an `and`type (e.g. TextDocumentParams & WorkDoneProgressParams`).
 */
export interface AndType {
  items: Type[]
  kind: "and"
}
/**
 * Represents an `or` type (e.g. `Location | LocationLink`).
 */
export interface OrType {
  items: Type[]
  kind: "or"
}
/**
 * Represents a `tuple` type (e.g. `[integer, integer]`).
 */
export interface TupleType {
  items: Type[]
  kind: "tuple"
}
/**
 * Represents a literal structure (e.g. `property: { start: uinteger; end: uinteger; }`).
 */
export interface StructureLiteralType {
  kind: "literal"
  value: StructureLiteral
}
/**
 * Defines an unnamed structure of an object literal.
 */
export interface StructureLiteral {
  /**
   * Whether the literal is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation.
   */
  documentation?: string
  /**
   * The properties.
   */
  properties: Property[]
  /**
   * Whether this is a proposed structure. If omitted, the structure is final.
   */
  proposed?: boolean
  /**
   * Since when (release number) this structure is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
}
/**
 * Represents an object property.
 */
export interface Property {
  /**
   * Whether the property is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation.
   */
  documentation?: string
  /**
   * The property name;
   */
  name: string
  /**
   * Whether the property is optional. If omitted, the property is mandatory.
   */
  optional?: boolean
  /**
   * Whether this is a proposed property. If omitted, the structure is final.
   */
  proposed?: boolean
  /**
   * Since when (release number) this property is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
  /**
   * The type of the property
   */
  type: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
}
/**
 * Represents a string literal type (e.g. `kind: 'rename'`).
 */
export interface StringLiteralType {
  kind: "stringLiteral"
  value: string
}
export interface IntegerLiteralType {
  /**
   * Represents an integer literal type (e.g. `kind: 1`).
   */
  kind: "integerLiteral"
  value: number
}
/**
 * Represents a boolean literal type (e.g. `kind: true`).
 */
export interface BooleanLiteralType {
  kind: "booleanLiteral"
  value: boolean
}
/**
 * Represents a LSP request
 */
export interface Request {
  /**
   * Whether the request is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation;
   */
  documentation?: string
  /**
   * An optional error data type.
   */
  errorData?: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
  /**
   * The direction in which this request is sent in the protocol.
   */
  messageDirection: ("clientToServer" | "serverToClient" | "both")
  /**
   * The request's method name.
   */
  method: string
  /**
   * The parameter type(s) if any.
   */
  params?: (Type | Type[])
  /**
   * Optional partial result type if the request supports partial result reporting.
   */
  partialResult?: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
  /**
   * Whether this is a proposed feature. If omitted the feature is final.
   */
  proposed?: boolean
  /**
   * Optional a dynamic registration method if it different from the request's method.
   */
  registrationMethod?: string
  /**
   * Optional registration options if the request supports dynamic registration.
   */
  registrationOptions?: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
  /**
   * The result type.
   */
  result: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
  /**
   * Since when (release number) this request is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
  /**
   * The type name of the request if any.
   */
  typeName?: string
}
/**
 * Defines the structure of an object literal.
 */
export interface Structure {
  /**
   * Whether the structure is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation;
   */
  documentation?: string
  /**
   * Structures extended from. This structures form a polymorphic type hierarchy.
   */
  extends?: Type[]
  /**
   * Structures to mix in. The properties of these structures are `copied` into this structure. Mixins don't form a polymorphic type hierarchy in LSP.
   */
  mixins?: Type[]
  /**
   * The name of the structure.
   */
  name: string
  /**
   * The properties.
   */
  properties: Property[]
  /**
   * Whether this is a proposed structure. If omitted, the structure is final.
   */
  proposed?: boolean
  /**
   * Since when (release number) this structure is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
}
/**
 * Defines a type alias. (e.g. `type Definition = Location | LocationLink`)
 */
export interface TypeAlias {
  /**
   * Whether the type alias is deprecated or not. If deprecated the property contains the deprecation message.
   */
  deprecated?: string
  /**
   * An optional documentation.
   */
  documentation?: string
  /**
   * The name of the type alias.
   */
  name: string
  /**
   * Whether this is a proposed type alias. If omitted, the type alias is final.
   */
  proposed?: boolean
  /**
   * Since when (release number) this structure is available. Is undefined if not known.
   */
  since?: string
  /**
   * All since tags in case there was more than one tag. Is undefined if not known.
   */
  sinceTags?: string[]
  /**
   * The aliased type.
   */
  type: (BaseType | ReferenceType | ArrayType | MapType | AndType | OrType | TupleType | StructureLiteralType | StringLiteralType | IntegerLiteralType | BooleanLiteralType)
}
