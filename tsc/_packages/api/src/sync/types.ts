//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: src/async/types.ts
// Regenerate: npm run generate (from _packages/api)
//
import type { ElementFlags } from "#enums/elementFlags";
import type { ObjectFlags } from "#enums/objectFlags";
import type { TypeFlags } from "#enums/typeFlags";
import type { Symbol } from "./api.ts";

/**
 * A TypeScript type.
 *
 * Use TypeFlags to determine the specific kind of type and access
 * kind-specific properties. For example:
 *
 * ```ts
 * if (type.flags & TypeFlags.StringLiteral) {
 *     console.log((type as LiteralType).value); // string
 * }
 * ```
 */
export interface Type {
    /** Unique identifier for this type */
    readonly id: string;
    /** Type flags — use to determine the specific kind of type */
    readonly flags: TypeFlags;

    /** Get the symbol associated with this type, if any */
    getSymbol(): Symbol | undefined;
}

/** Literal types: StringLiteral, NumberLiteral, BigIntLiteral, BooleanLiteral */
export interface LiteralType extends Type {
    /** The literal value */
    readonly value: string | number | boolean;
}

/** Object types (TypeFlags.Object) */
export interface ObjectType extends Type {
    /** Object flags — use to determine the specific kind of object type */
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
    getTypeParameters(): readonly Type[];
    /** Get outer type parameters from enclosing declarations */
    getOuterTypeParameters(): readonly Type[];
    /** Get local type parameters declared on this interface/class */
    getLocalTypeParameters(): readonly Type[];
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
