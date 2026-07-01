//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: src/api/async/types.ts
// Regenerate: npm run generate (from _packages/native-preview)
//
import type { CompletionItemKind } from "#enums/completionItemKind";
import type { DiagnosticCategory } from "#enums/diagnosticCategory";
import type { ElementFlags } from "#enums/elementFlags";
import type { ObjectFlags } from "#enums/objectFlags";
import type { TypeFlags } from "#enums/typeFlags";
import type { TypePredicateKind } from "#enums/typePredicateKind";
import type {
    NodeHandle,
    Symbol,
} from "./api.ts";

/**
 * A TypeScript type.
 *
 * Use TypeFlags to determine the specific kind of type and access
 * kind-specific properties. For example:
 *
 * ```ts
 * if (type.flags & TypeFlags.StringLiteral) {
 *     console.log((type as StringLiteralType).value); // string
 * }
 * ```
 */
export interface Type {
    /** Type flags — use to determine the specific kind of type. */
    readonly flags: TypeFlags;

    /** Unique identifier for this type */
    readonly id: number;

    /** Get the symbol associated with this type, if any */
    getSymbol(): Symbol | undefined;

    /** Get the type arguments of the type alias this type was instantiated from, if any */
    getAliasTypeArguments(): readonly Type[];

    /** Get the symbol of the type alias this type was instantiated from, if any */
    getAliasSymbol(): Symbol | undefined;

    /**
     * Get the base types of this type, or `undefined` if it is not a class or
     * interface type.
     */
    getBaseTypes(): readonly Type[] | undefined;

    /** Whether this type is a class or interface type */
    isClassOrInterface(): this is InterfaceType;
    /** Whether this type is a union type */
    isUnionType(): this is UnionType;
    /** Whether this type is an intersection type */
    isIntersectionType(): this is IntersectionType;
    /** Whether this type is an object type */
    isObjectType(): this is ObjectType;
    /** Whether this type is an intrinsic primitive type */
    isIntrinsicType(): this is IntrinsicType;
    /**
     * Whether this is the error type — the placeholder produced when a type
     * cannot be determined (e.g. an unresolved reference).
     */
    isErrorType(): boolean;
    /** Whether this type is a literal type */
    isLiteralType(): this is LiteralType;
    /** Whether this type is a string literal type */
    isStringLiteralType(): this is StringLiteralType;
    /** Whether this type is a number literal type */
    isNumberLiteralType(): this is NumberLiteralType;
    /** Whether this type is a bigint literal type */
    isBigIntLiteralType(): this is BigIntLiteralType;
    /** Whether this type is a boolean literal type */
    isBooleanLiteralType(): this is BooleanLiteralType;
    /** Whether this type is a type reference */
    isTypeReference(): this is TypeReference;
    /** Whether this type is a tuple type */
    isTupleType(): this is TupleType;
    /** Whether this type is an index type (`keyof T`) */
    isIndexType(): this is IndexType;
    /** Whether this type is an indexed access type (`T[K]`) */
    isIndexedAccessType(): this is IndexedAccessType;
    /** Whether this type is a conditional type */
    isConditionalType(): this is ConditionalType;
    /** Whether this type is a substitution type */
    isSubstitutionType(): this is SubstitutionType;
    /** Whether this type is a template literal type */
    isTemplateLiteralType(): this is TemplateLiteralType;
    /** Whether this type is a string mapping type */
    isStringMappingType(): this is StringMappingType;
    /** Whether this type is a type parameter */
    isTypeParameter(): this is TypeParameter;
}

/**
 * Freshable types (TypeFlags.Freshable) - literal types (TypeFlags.Literal) and computed enum types (TypeFlags.Enum).
 */
export interface FreshableType extends Type {
    /** Get the fresh version of this type, if any */
    getFreshType(): FreshableType | undefined;
    /** Get the regular (non-fresh) version of this type, if any */
    getRegularType(): FreshableType | undefined;
}

/** Literal types: StringLiteral, NumberLiteral, BigIntLiteral, BooleanLiteral */
export interface LiteralType extends FreshableType {
    /** The literal value. Use TypeFlags to narrow to a specific literal subtype with a concrete value type. */
    readonly value: string | number | boolean | bigint;
}

/** String literal types (TypeFlags.StringLiteral) */
export interface StringLiteralType extends LiteralType {
    /** The string value of the literal */
    readonly value: string;
}

/** Numeric literal types (TypeFlags.NumberLiteral) */
export interface NumberLiteralType extends LiteralType {
    /** The numeric value of the literal */
    readonly value: number;
}

/** BigInt literal types (TypeFlags.BigIntLiteral) */
export interface BigIntLiteralType extends LiteralType {
    /** The bigint value of the literal */
    readonly value: bigint;
}

/** Boolean literal types (TypeFlags.BooleanLiteral) */
export interface BooleanLiteralType extends LiteralType {
    /** The boolean value of the literal */
    readonly value: boolean;
}

/** Object types (TypeFlags.Object) */
export interface ObjectType extends Type {
    /** Object flags — use to determine the specific kind of object type. */
    readonly objectFlags: ObjectFlags;
}

/** Type references (ObjectFlags.Reference) — e.g. Array<string>, Map<K, V> */
export interface TypeReference extends ObjectType {
    /** Get the generic target type (e.g. Array for Array<string>) */
    getTarget(): Type;
}

/** Interface types — classes and interfaces (ObjectFlags.ClassOrInterface) */
export interface InterfaceType extends TypeReference {
    /** Get all type parameters (outer + local, excluding thisType) */
    getTypeParameters(): readonly TypeParameter[];
    /** Get outer type parameters from enclosing declarations */
    getOuterTypeParameters(): readonly TypeParameter[];
    /** Get local type parameters declared on this interface/class */
    getLocalTypeParameters(): readonly TypeParameter[];
}

/** Tuple types (ObjectFlags.Tuple) */
export interface TupleType extends InterfaceType {
    /** Per-element flags (Required, Optional, Rest, Variadic) */
    readonly elementFlags: readonly ElementFlags[];
    /** Number of initial required or optional elements */
    readonly fixedLength: number;
    /** Whether the tuple is readonly */
    readonly readonly: boolean;
}

/** Union or intersection types (TypeFlags.Union | TypeFlags.Intersection) */
export interface UnionOrIntersectionType extends Type {
    /** Get the constituent types */
    getTypes(): readonly Type[];
}

/** Union types (TypeFlags.Union) */
export interface UnionType extends UnionOrIntersectionType {
}

/** Intersection types (TypeFlags.Intersection) */
export interface IntersectionType extends UnionOrIntersectionType {
}

/** Type parameters (TypeFlags.TypeParameter) */
export interface TypeParameter extends Type {
    /** True if this is the synthetic `this` type of an interface, class, or tuple */
    readonly isThisType?: boolean | undefined;
}

/** Index types — keyof T (TypeFlags.Index) */
export interface IndexType extends Type {
    /** Get the target type T in `keyof T` */
    getTarget(): Type;
}

/** Indexed access types — T[K] (TypeFlags.IndexedAccess) */
export interface IndexedAccessType extends Type {
    /** Get the object type T in `T[K]` */
    getObjectType(): Type;
    /** Get the index type K in `T[K]` */
    getIndexType(): Type;
}

/** Conditional types — T extends U ? X : Y (TypeFlags.Conditional) */
export interface ConditionalType extends Type {
    /** Get the check type T in `T extends U ? X : Y` */
    getCheckType(): Type;
    /** Get the extends type U in `T extends U ? X : Y` */
    getExtendsType(): Type;
    /** Get the true type X in `T extends U ? X : Y` */
    getTrueType(): Type;
    /** Get the false type Y in `T extends U ? X : Y` */
    getFalseType(): Type;
}

/** Substitution types (TypeFlags.Substitution) */
export interface SubstitutionType extends Type {
    getBaseType(): Type;
    getConstraint(): Type;
}

/** Template literal types (TypeFlags.TemplateLiteral) */
export interface TemplateLiteralType extends Type {
    /** Text segments (always one more than the number of type spans) */
    readonly texts: readonly string[];
    /** Get the types interspersed between text segments */
    getTypes(): readonly Type[];
}

/** String mapping types — Uppercase<T>, Lowercase<T>, etc. (TypeFlags.StringMapping) */
export interface StringMappingType extends Type {
    /** Get the mapped type */
    getTarget(): Type;
}

/** Intrinsic types — any, unknown, string, number, bigint, symbol, void, undefined, null, never, object (TypeFlags.Intrinsic) */
export interface IntrinsicType extends Type {
    /** The intrinsic type name (e.g. "any", "string", "never") */
    readonly intrinsicName: string;
}

/** Base for all type predicates */
export interface TypePredicateBase {
    readonly kind: TypePredicateKind;
    readonly type: Type | undefined;
}

/** `this is T` */
export interface ThisTypePredicate extends TypePredicateBase {
    readonly kind: TypePredicateKind.This;
    readonly parameterName: undefined;
    readonly parameterIndex: undefined;
    readonly type: Type;
}

/** `x is T` */
export interface IdentifierTypePredicate extends TypePredicateBase {
    readonly kind: TypePredicateKind.Identifier;
    readonly parameterName: string;
    readonly parameterIndex: number;
    readonly type: Type;
}

/** `asserts this is T` */
export interface AssertsThisTypePredicate extends TypePredicateBase {
    readonly kind: TypePredicateKind.AssertsThis;
    readonly parameterName: undefined;
    readonly parameterIndex: undefined;
    readonly type: Type | undefined;
}

/** `asserts x is T` */
export interface AssertsIdentifierTypePredicate extends TypePredicateBase {
    readonly kind: TypePredicateKind.AssertsIdentifier;
    readonly parameterName: string;
    readonly parameterIndex: number;
    readonly type: Type | undefined;
}

/** A type predicate — e.g. `x is T` or `asserts x is T` */
export type TypePredicate = ThisTypePredicate | IdentifierTypePredicate | AssertsThisTypePredicate | AssertsIdentifierTypePredicate;

/** An index signature — e.g. `[key: string]: T` */
export interface IndexInfo {
    /** The index key type (e.g. string or number) */
    readonly keyType: Type;
    /** The index value type */
    readonly valueType: Type;
    /** Whether the index signature is readonly */
    readonly isReadonly: boolean;
    /** The index signature declaration, if any */
    readonly declaration?: NodeHandle | undefined;
}

/**
 * A single JSDoc tag attached to a symbol — e.g. `@param`, `@returns`.
 */
export interface JSDocTagInfo {
    /** The tag name, without the leading `@` — e.g. `"param"`. */
    readonly name: string;
    /** The rendered tag text, if any — e.g. `"a the first number"` for `@param a the first number`. */
    readonly text?: string | undefined;
}

export interface CompletionEntryLabelDetails {
    detail?: string | undefined;
    description?: string | undefined;
}

/** Options for {@link Checker.getCompletionsAtPosition}. */
export interface CompletionOptions {
    triggerCharacter?: string | undefined;
    /** Include a `symbol` property on each completion entry. Only populated for symbol-based completions (not keywords or literals). */
    includeSymbol?: boolean | undefined;
}

/** A single completion item returned by {@link Checker.getCompletionsAtPosition}. */
export interface CompletionEntry {
    readonly name: string;
    readonly kind?: CompletionItemKind | undefined;
    readonly sortText?: string | undefined;
    readonly insertText?: string | undefined;
    readonly filterText?: string | undefined;
    readonly detail?: string | undefined;
    readonly labelDetails?: CompletionEntryLabelDetails | undefined;
    /** The symbol associated with this completion entry. Only set when `includeSymbol: true` is passed and a symbol is available. */
    readonly symbol?: Symbol | undefined;
}

/** The result of {@link Checker.getCompletionsAtPosition}. */
export interface CompletionInfo {
    readonly isIncomplete: boolean;
    readonly entries: readonly CompletionEntry[];
}

/**
 * A diagnostic message from the TypeScript compiler.
 */
export interface Diagnostic {
    /** File name of the source file this diagnostic belongs to, if any */
    readonly fileName?: string | undefined;
    /** Start position of the diagnostic */
    readonly pos: number;
    /** End position of the diagnostic */
    readonly end: number;
    /** Diagnostic error code */
    readonly code: number;
    /** Diagnostic category (error, warning, suggestion, message) */
    readonly category: DiagnosticCategory;
    /** Localized diagnostic message text */
    readonly text: string;
    /** Whether this diagnostic highlights unnecessary code */
    readonly reportsUnnecessary?: boolean | undefined;
    /** Whether this diagnostic highlights deprecated code */
    readonly reportsDeprecated?: boolean | undefined;
    /** Chained diagnostic messages */
    readonly messageChain?: readonly Diagnostic[] | undefined;
    /** Related diagnostic information */
    readonly relatedInformation?: readonly Diagnostic[] | undefined;
}
