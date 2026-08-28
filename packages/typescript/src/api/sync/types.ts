//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: src/api/async/types.ts
// Regenerate: npm run generate (from packages/typescript)
//
import type {
    APIRequest as ProtocolRequest,
    APIResponse as ProtocolResponse,
} from "../proto.ts";

import type { CompletionItemKind } from "#enums/completionItemKind";
import type { ElementFlags } from "#enums/elementFlags";
import type { ObjectFlags } from "#enums/objectFlags";
import type { TypeFlags } from "#enums/typeFlags";
import type { TypePredicateKind } from "#enums/typePredicateKind";
import type { IndexSignatureDeclaration } from "../../ast/ast.ts";
import type { Diagnostic } from "../proto.ts";
import type {
    NodeHandle,
    Signature,
    Symbol,
} from "./api.ts";

export type { Diagnostic } from "../proto.ts";

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
    getSymbol: {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    };

    /** Get the properties of this type. */
    getProperties: {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    };

    /** Get a named property of this type, if present. */
    getProperty: {
        (propertyName: string): Symbol | undefined;
        gen(propertyName: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    };

    /** Get the properties of the apparent type of this type. */
    getApparentProperties: {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    };

    /** Get the apparent type of this type. */
    getApparentType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };

    /** Get the reduced type of this type. */
    getReducedType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };

    /** Get the call signatures of this type. */
    getCallSignatures: {
        (): readonly Signature[];
        gen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    };

    /** Get the construct signatures of this type. */
    getConstructSignatures: {
        (): readonly Signature[];
        gen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    };

    /** Get this type with `null` and `undefined` removed. */
    getNonNullableType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };

    /** Get this type's string index value type, if present. */
    getStringIndexType: {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    };

    /** Get this type's number index value type, if present. */
    getNumberIndexType: {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    };

    /** Get all index information for this type. */
    getIndexInfos: {
        (): readonly IndexInfo[];
        gen(): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    };

    /** Get the type arguments of the type alias this type was instantiated from, if any */
    getAliasTypeArguments: {
        (): readonly Type[];
        gen(): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    };

    /** Get the symbol of the type alias this type was instantiated from, if any */
    getAliasSymbol: {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    };

    /**
     * Get the base types of this type, or `undefined` if it is not a class or
     * interface type.
     */
    getBaseTypes: {
        (): readonly Type[] | undefined;
        gen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]>;
    };

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
    /** Whether this type is a reference to a tuple type */
    isTupleTypeReference(): this is TupleTypeReference;
    /** Whether this type owns tuple metadata */
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
    getFreshType: {
        (): FreshableType | undefined;
        gen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]>;
    };
    /** Get the regular (non-fresh) version of this type, if any */
    getRegularType: {
        (): FreshableType | undefined;
        gen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]>;
    };
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
    getTarget: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
}

/** References to tuple types */
export interface TupleTypeReference extends TypeReference {
    /** Get the tuple type that describes this reference's shape */
    getTarget(): TupleType;
}

/** Interface types — classes and interfaces (ObjectFlags.ClassOrInterface) */
export interface InterfaceType extends TypeReference {
    /** Get all type parameters (outer + local, excluding thisType) */
    getTypeParameters: {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    };
    /** Get outer type parameters from enclosing declarations */
    getOuterTypeParameters: {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    };
    /** Get local type parameters declared on this interface/class */
    getLocalTypeParameters: {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    };
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
    getTypes: {
        (): readonly Type[];
        gen(): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    };
}

/** Union types (TypeFlags.Union) */
export interface UnionType extends UnionOrIntersectionType {
}

/** Intersection types (TypeFlags.Intersection) */
export interface IntersectionType extends UnionOrIntersectionType {
}

/** Structured types (TypeFlags.StructuredType) */
export type StructuredType = ObjectType | UnionType | IntersectionType;

/** Type parameters (TypeFlags.TypeParameter) */
export interface TypeParameter extends Type {
    /** True if this is the synthetic `this` type of an interface, class, or tuple */
    readonly isThisType?: boolean | undefined;
    /** Get the constraint (the `T` in `<U extends T>`), or undefined if it has none */
    getConstraint: {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    };
    /** Get the default type (the `T` in `<U = T>`), or undefined if it has none */
    getDefault: {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    };
}

/** Index types — keyof T (TypeFlags.Index) */
export interface IndexType extends Type {
    /** Get the target type T in `keyof T` */
    getTarget: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
}

/** Indexed access types — T[K] (TypeFlags.IndexedAccess) */
export interface IndexedAccessType extends Type {
    /** Get the object type T in `T[K]` */
    getObjectType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
    /** Get the index type K in `T[K]` */
    getIndexType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
}

/** Conditional types — T extends U ? X : Y (TypeFlags.Conditional) */
export interface ConditionalType extends Type {
    /** Get the check type T in `T extends U ? X : Y` */
    getCheckType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
    /** Get the extends type U in `T extends U ? X : Y` */
    getExtendsType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
    /** Get the true type X in `T extends U ? X : Y` */
    getTrueType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
    /** Get the false type Y in `T extends U ? X : Y` */
    getFalseType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
}

/** Substitution types (TypeFlags.Substitution) */
export interface SubstitutionType extends Type {
    getBaseType: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
    getConstraint: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
}

/** Template literal types (TypeFlags.TemplateLiteral) */
export interface TemplateLiteralType extends Type {
    /** Text segments (always one more than the number of type spans) */
    readonly texts: readonly string[];
    /** Get the types interspersed between text segments */
    getTypes: {
        (): readonly Type[];
        gen(): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    };
}

/** String mapping types — Uppercase<T>, Lowercase<T>, etc. (TypeFlags.StringMapping) */
export interface StringMappingType extends Type {
    /** Get the mapped type */
    getTarget: {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    };
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
    readonly declaration?: NodeHandle<IndexSignatureDeclaration> | undefined;
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

/** Options for {@link LanguageService.getCompletionsAtPosition}. */
export interface CompletionOptions {
    triggerCharacter?: string | undefined;
    /** Include a `symbol` property on each completion entry. Only populated for symbol-based completions (not keywords or literals). */
    includeSymbol?: boolean | undefined;
}

/** A single completion item returned by {@link LanguageService.getCompletionsAtPosition}. */
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

/** The result of {@link LanguageService.getCompletionsAtPosition}. */
export interface CompletionInfo {
    readonly isIncomplete: boolean;
    readonly entries: readonly CompletionEntry[];
}

export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}

export interface EmitOutputFile {
    readonly text: string;
    readonly sourceFileName?: string | undefined;
}

export interface EmitResult {
    readonly emitSkipped: boolean;
    readonly diagnostics: readonly Diagnostic[];
    readonly emittedFiles: readonly string[];
}

export interface EmitOutput {
    readonly emitSkipped: boolean;
    readonly diagnostics: readonly Diagnostic[];
    readonly outputFiles: ReadonlyMap<string, EmitOutputFile>;
}

export interface ImportSymbolAction {
    readonly kind: "importSymbol";
    readonly symbol: Symbol;
    readonly isValidTypeOnlyUseSite?: boolean;
}

export type ImportAdderAction = ImportSymbolAction;

export interface GetImportEditsForSymbolsOptions {
    readonly isValidTypeOnlyUseSite?: boolean;
}
