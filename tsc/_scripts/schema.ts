/** Shared type definitions and utilities for ast.json schema, used by both Go and TS generators. */

import * as fs from "node:fs";
import * as path from "node:path";

// ────────────────────────────────────────────────────────────────────────────
// Schema type definitions
// ────────────────────────────────────────────────────────────────────────────

export interface Member {
    name: string;
    type: string | string[];
    optional?: boolean;
    list?: "NodeList" | "ModifierList" | "raw";
    visit?: string;
    typeGuard?: string;
    private?: boolean;
    inherited?: boolean;
    goOnly?: boolean;
    noGo?: boolean;
    noTS?: boolean;
    noFactory?: boolean;
    bitmask?: string;
}

export interface NodeDef {
    kind?: string | string[];
    extends: string[];
    members?: Member[];
    generateSubtreeFacts?: boolean;
    arena?: boolean;
    handWritten?: boolean;
    handWrittenVisitor?: boolean;
    typeParameters?: { name: string; constraint: string; default?: string; }[];
    instantiationAliases?: Record<string, string>;
}

export interface BaseField {
    type: string | string[];
    list?: "NodeList" | "ModifierList" | "raw";
    visit?: string;
    typeGuard?: string;
    optional?: boolean;
    private?: boolean;
    goOnly?: boolean;
    noGo?: boolean;
    noTS?: boolean;
    noFactory?: boolean;
}

export interface BaseEntry {
    brand?: string;
    extends?: string[];
    fields?: Record<string, BaseField>;
}

export interface KindElement {
    name?: string;
    comment?: string;
}

export type ListKind = "NodeList" | "ModifierList" | "raw";
export type BaseTypeKind = "list" | "primitive" | "kind" | "node";
export type TypeKind = "alias" | "list" | "primitive" | "kind" | "node" | "typeParameter" | "union";

abstract class TypeBase {
    protected readonly api: SchemaAPI;

    constructor(api: SchemaAPI) {
        this.api = api;
    }

    abstract readonly kind: TypeKind;
    abstract formatGoDeclaration(): string;
    abstract formatGoReference(): string;

    abstract formatTypeScript(): string;
    abstract baseKind(): BaseTypeKind;
}

export class PrimitiveType extends TypeBase {
    readonly kind = "primitive" as const;
    readonly name: string;

    constructor(api: SchemaAPI, name: string) {
        super(api);
        this.name = name;
    }

    formatGoDeclaration(): string {
        throw new Error(`Primitive type ${this.name} has no Go declaration form`);
    }

    formatGoReference(): string {
        return this.name;
    }

    formatTypeScript(): string {
        const typeMap: Record<string, string> = {
            bool: "boolean",
            int: "number",
        };
        return typeMap[this.name] || this.name;
    }

    baseKind(): BaseTypeKind {
        return "primitive";
    }
}

export class KindType extends TypeBase {
    readonly kind = "kind" as const;
    readonly value: string;

    constructor(api: SchemaAPI, value: string) {
        super(api);
        this.value = value;
    }

    formatGoDeclaration(): string {
        return "Kind";
    }

    formatGoReference(): string {
        return "Kind";
    }

    formatTypeScript(): string {
        return this.value === "Kind" ? "SyntaxKind" : this.value;
    }

    baseKind(): BaseTypeKind {
        return "kind";
    }

    get name(): string {
        return this.value.startsWith("SyntaxKind.") ? this.value.slice("SyntaxKind.".length) : this.value;
    }

    formatGoConstant(): string {
        return this.value === "Kind" ? "Kind" : `Kind${this.name}`;
    }
}

export class NodeType extends TypeBase {
    readonly kind = "node" as const;
    readonly name: string;
    private membersCache?: MemberInfo[];
    private fieldsCache?: MemberInfo[];
    private inheritedFieldCache?: Map<string, MemberInfo | null>;

    constructor(api: SchemaAPI, name: string) {
        super(api);
        this.name = name;
    }

    formatGoDeclaration(): string {
        return this.name;
    }

    formatGoReference(): string {
        return this.api.hasNode(this.name) ? `*${this.name}Node` : `*${this.name}`;
    }

    formatTypeScript(): string {
        return this.name;
    }

    baseKind(): BaseTypeKind {
        return "node";
    }

    concreteNodeName(): string {
        if (!this.isConcrete) {
            throw new Error(`${this.name} is not a concrete node`);
        }
        return this.name;
    }

    get key(): string {
        return this.name;
    }

    get isConcrete(): boolean {
        return !!this.def;
    }

    get isBase(): boolean {
        return !!this.entry;
    }

    get def(): NodeDef | undefined {
        return this.api.getNodeDef(this.name);
    }

    get entry(): BaseEntry | undefined {
        return this.api.schema.bases[this.name];
    }

    get syntaxKindName(): string {
        const kind = this.def?.kind;
        if (Array.isArray(kind)) return kind[0];
        return kind || this.name;
    }

    get extendsKeys(): string[] {
        return this.def?.extends || this.entry?.extends || [];
    }

    get extends(): NodeType[] {
        return this.extendsKeys.map(key => this.api.getBase(key)).filter((base): base is NodeType => !!base);
    }

    get members(): MemberInfo[] {
        if (!this.membersCache) {
            this.membersCache = (this.def?.members || []).map(member => new MemberInfo(this.api, member.name, member, this));
        }
        return this.membersCache;
    }

    get kindAliases(): string[] {
        const kind = this.def?.kind;
        if (Array.isArray(kind)) return kind.slice(1);
        return [];
    }

    get brand(): string | undefined {
        return this.entry?.brand;
    }

    get fields(): MemberInfo[] {
        if (!this.fieldsCache) {
            this.fieldsCache = Object.entries(this.entry?.fields || {}).map(([name, field]) => new MemberInfo(this.api, name, field));
        }
        return this.fieldsCache;
    }

    get arena(): boolean {
        return this.def?.arena || false;
    }

    get handWritten(): boolean {
        return this.def?.handWritten || false;
    }

    get handWrittenVisitor(): boolean {
        return this.def?.handWrittenVisitor || false;
    }

    get generateSubtreeFacts(): boolean {
        return this.def?.generateSubtreeFacts || false;
    }

    get typeParameters(): TypeParameterInfo[] {
        return this.def?.typeParameters || [];
    }

    get instantiationAliases(): InstantiationAliasInfo[] {
        return Object.entries(this.def?.instantiationAliases || {}).map(([name, typeArg]) => ({ name, typeArg }));
    }

    get kindType(): Type {
        return this.kindMember()?.declaredType ?? this.api.kindType(`SyntaxKind.${this.syntaxKindName}`);
    }

    kindMember(): MemberInfo | undefined {
        return this.members.find(member => member.name === "Kind" || member.name === "kind");
    }

    field(name: string): MemberInfo | undefined {
        return this.fields.find(field => field.name === name);
    }

    inheritedField(name: string): MemberInfo | undefined {
        if (!this.inheritedFieldCache) {
            this.inheritedFieldCache = new Map();
        }
        const cached = this.inheritedFieldCache.get(name);
        if (cached !== undefined) {
            return cached || undefined;
        }

        for (const base of this.extends) {
            const direct = base.field(name);
            if (direct) {
                this.inheritedFieldCache.set(name, direct);
                return direct;
            }

            const inherited = base.inheritedField(name);
            if (inherited) {
                this.inheritedFieldCache.set(name, inherited);
                return inherited;
            }
        }

        this.inheritedFieldCache.set(name, null);
        return undefined;
    }

    isMultiKind(): boolean {
        return this.kindTypes().length > 1;
    }

    kindTypes(): KindType[] {
        const collect = (type: Type): KindType[] => {
            switch (type.kind) {
                case "kind":
                    return type.value === "Kind" ? [] : [type];
                case "union":
                    return type.types.flatMap(collect);
                case "alias":
                    return collect(type.resolved);
                case "typeParameter":
                    return collect(type.constraint);
                default:
                    return [];
            }
        };

        const kindTypes = collect(this.kindType);
        if (kindTypes.length === 0) {
            return [this.api.kindType(`SyntaxKind.${this.syntaxKindName}`)];
        }
        return [...new Map(kindTypes.map(type => [type.value, type])).values()];
    }

    /**
     * All SyntaxKind types for this node, including kindAliases.
     * For multi-kind nodes, returns all instantiated kind types.
     * For single-kind nodes, returns the primary kind plus any kindAliases.
     */
    allKinds(): KindType[] {
        return [
            ...this.kindTypes(),
            ...this.kindAliases.map(a => this.api.kindType(`SyntaxKind.${a}`)),
        ];
    }

    isGoOnly(): boolean {
        return this.api.isGoOnlyBase(this.name);
    }
}

export class TypeParameterType extends TypeBase {
    readonly kind = "typeParameter" as const;
    readonly name: string;
    readonly constraint: Type;

    constructor(api: SchemaAPI, name: string, constraint: Type) {
        super(api);
        this.name = name;
        this.constraint = constraint;
    }

    formatGoDeclaration(): string {
        return this.constraint.formatGoDeclaration();
    }

    formatGoReference(): string {
        return this.constraint.formatGoReference();
    }

    formatTypeScript(): string {
        return this.name;
    }

    baseKind(): BaseTypeKind {
        return this.constraint.baseKind();
    }

    concreteNodeName(): string | undefined {
        switch (this.constraint.kind) {
            case "node":
            case "alias":
            case "typeParameter":
                return this.constraint.concreteNodeName();
        }
        return undefined;
    }
}

export class AliasType extends TypeBase {
    readonly kind = "alias" as const;
    readonly name: string;
    readonly resolved: Type;
    readonly resolveAs?: "node";

    constructor(api: SchemaAPI, name: string, resolved: Type, resolveAs?: "node") {
        super(api);
        this.name = name;
        this.resolved = resolved;
        this.resolveAs = resolveAs;
    }

    formatGoDeclaration(): string {
        return this.name;
    }

    formatGoReference(): string {
        return this.baseKind() === "node" || (this.baseKind() === "list" && (this.resolved as ListType).listKind !== "raw") ? `*${this.name}` : this.name;
    }

    formatTypeScript(): string {
        return this.name;
    }

    baseKind(): BaseTypeKind {
        return this.resolved.baseKind();
    }

    concreteNodeName(): string | undefined {
        return this.api.getInstantiationNodeName(this.name);
    }

    get isUnion(): boolean {
        const alias = this.api.schema.nodes.aliases[this.name];
        return Array.isArray(alias);
    }

    get isBaseAlias(): boolean {
        const alias = this.api.schema.nodes.aliases[this.name];
        return !!alias && !Array.isArray(alias);
    }

    get unionMemberNames(): string[] {
        const alias = this.api.schema.nodes.aliases[this.name];
        return Array.isArray(alias) ? alias : [];
    }

    get unionMemberTypes(): Type[] {
        return this.unionMemberNames.map(name => this.api.resolveType(name, undefined, this.resolveAs));
    }

    get baseKey(): string | undefined {
        const alias = this.api.schema.nodes.aliases[this.name];
        return alias && !Array.isArray(alias) ? alias.base : undefined;
    }

    get base(): NodeType | undefined {
        return this.baseKey ? this.api.getBase(this.baseKey) : undefined;
    }

    get elementTypeName(): string | undefined {
        return this.api.schema.nodes.listAliases?.[this.name];
    }

    get elementType(): Type | undefined {
        return this.elementTypeName ? this.api.resolveType(this.elementTypeName) : undefined;
    }
}

export class UnionType extends TypeBase {
    readonly kind = "union" as const;
    readonly types: Type[];

    constructor(api: SchemaAPI, types: Type[]) {
        super(api);
        this.types = types;
    }

    formatGoDeclaration(): string {
        throw new Error("Cannot declare Go type for union");
    }

    formatGoReference(): string {
        const concreteNodes = new Set<string>();
        let allConcreteNodes = true;
        for (const type of this.types) {
            const nodeName = this.concreteNodeNameOf(type);
            if (!nodeName) {
                allConcreteNodes = false;
                break;
            }
            concreteNodes.add(nodeName);
        }
        if (allConcreteNodes && concreteNodes.size === 1) {
            return `*${[...concreteNodes][0]}Node`;
        }

        if (this.types.some(type => type.baseKind() === "node" || type.baseKind() === "list")) {
            return "*Node";
        }

        if (this.types.every(type => type.baseKind() === "kind")) {
            return "Kind";
        }

        const references = [...new Set(this.types.map(type => type.formatGoReference()))];
        if (references.length === 1) return references[0];
        throw new Error(`Cannot resolve Go reference form for union ${references.join(" | ")}`);
    }

    formatTypeScript(): string {
        return this.types.map(type => type.formatTypeScript()).join(" | ");
    }

    baseKind(): BaseTypeKind {
        const baseKinds = new Set(this.types.map(type => type.baseKind()));
        if (baseKinds.size === 1) return this.types[0].baseKind();
        if (this.types.some(type => type.baseKind() === "list" || type.baseKind() === "node")) {
            return "node";
        }
        if (this.types.some(type => type.baseKind() === "kind")) {
            return "kind";
        }
        return "primitive";
    }

    private concreteNodeNameOf(type: Type): string | undefined {
        switch (type.kind) {
            case "node":
            case "alias":
            case "typeParameter":
                return type.concreteNodeName();
            default:
                return undefined;
        }
    }
}

export class ListType extends TypeBase {
    readonly kind = "list" as const;
    readonly elementType: Type;
    readonly listKind: ListKind;

    constructor(api: SchemaAPI, elementType: Type, listKind: ListKind) {
        super(api);
        this.elementType = elementType;
        this.listKind = listKind;
    }

    formatGoDeclaration(): string {
        throw new Error(`List type ${this.listKind} has no generated Go declaration form`);
    }

    formatGoReference(): string {
        if (this.listKind === "raw") {
            return this.elementType.baseKind() === "node" ? "[]*Node" : `[]${this.elementType.formatGoReference()}`;
        }
        if (this.listKind === "ModifierList") {
            return "*ModifierList";
        }
        return `*${this.api.listAliasName(this.elementType) || "NodeList"}`;
    }

    formatTypeScript(): string {
        const elementType = this.elementType.formatTypeScript();
        if (this.listKind === "raw") {
            return `readonly ${elementType}[]`;
        }
        return `NodeArray<${elementType}>`;
    }

    baseKind(): BaseTypeKind {
        return this.elementType.baseKind() === "node" ? "list" : this.elementType.baseKind();
    }

    raw(): ListType {
        if (this.listKind === "raw") {
            return this;
        }
        return this.api.listType(this.elementType, "raw");
    }
}

export type Type =
    | AliasType
    | KindType
    | ListType
    | NodeType
    | PrimitiveType
    | TypeParameterType
    | UnionType;

export interface TypeParameterInfo {
    name: string;
    constraint: string;
    default?: string;
}

export interface InstantiationAliasInfo {
    name: string;
    typeArg: string;
}

export class MemberInfo {
    private readonly api: SchemaAPI;
    private readonly nameValue: string;
    private readonly member?: Member;
    private readonly field?: BaseField;
    private inheritedFieldCache?: MemberInfo | null;
    readonly node?: NodeType;

    constructor(api: SchemaAPI, name: string, source: Member | BaseField, node?: NodeType) {
        this.api = api;
        this.nameValue = name;
        if (node) {
            this.member = source as Member;
        }
        else {
            this.field = source as BaseField;
        }
        this.node = node;
    }

    get name(): string {
        return this.nameValue;
    }

    get declaredType(): Type {
        return this.api.resolveType(this.rawType, this.node?.def);
    }

    get type(): Type {
        return this.listKind ? this.api.listType(this.declaredType, this.listKind) : this.declaredType;
    }

    get rawType(): string | string[] {
        if (this.field) return this.field.type;
        if (this.member && !this.member.inherited) return this.member.type;
        // Inherited member with an explicit type override narrows the base type
        if (this.member?.inherited && this.member.type) return this.member.type;
        if (this.inheritedField) return this.inheritedField.rawType;
        if (this.member) return this.member.type;
        throw new Error(`Member ${this.name} has no raw type source`);
    }

    get listKind(): ListKind | undefined {
        if (this.field) return this.field.list;
        if (this.member && !this.member.inherited) return this.member.list;
        return this.inheritedField?.listKind;
    }

    get optional(): boolean {
        return this.field?.optional ?? this.member?.optional ?? this.inheritedField?.optional ?? false;
    }

    get inherited(): boolean {
        return this.member?.inherited ?? false;
    }

    get private(): boolean {
        if (this.field?.private) return true;
        if (this.member?.private) return true;
        return this.inheritedField?.private ?? false;
    }

    get goOnly(): boolean {
        return this.field?.goOnly ?? this.member?.goOnly ?? false;
    }

    /** Absent from Go structs, encoding, and factory. noGo implies noFactory. */
    get noGo(): boolean {
        return this.field?.noGo ?? this.member?.noGo ?? false;
    }

    /** Absent from encoding and all TS files. goOnly implies noTS. */
    get noTS(): boolean {
        return this.goOnly || (this.field?.noTS ?? this.member?.noTS ?? false);
    }

    /** Absent from factory functions, visitor, and clone. goOnly implies noFactory. */
    get noFactory(): boolean {
        return this.goOnly || this.field?.noFactory || this.member?.noFactory || false;
    }

    get visit(): string | undefined {
        if (this.member?.visit) return this.member.visit;
        if (this.field?.visit) return this.field.visit;
        return this.inheritedField?.visit;
    }

    get typeGuard(): string | undefined {
        if (this.member?.typeGuard) return this.member.typeGuard;
        if (this.field?.typeGuard) return this.field.typeGuard;
        return this.inheritedField?.typeGuard;
    }

    get bitmask(): string | undefined {
        return this.member?.bitmask;
    }

    get inheritedField(): MemberInfo | undefined {
        if (!this.member?.inherited || !this.node) return undefined;
        if (this.inheritedFieldCache !== undefined) {
            return this.inheritedFieldCache || undefined;
        }
        this.inheritedFieldCache = this.node.inheritedField(this.name) || null;
        return this.inheritedFieldCache || undefined;
    }

    isKindParam(): boolean {
        if (!this.member || !this.node) return false;
        if (this.name !== "Kind" && this.name !== "kind") return false;
        return this.declaredType.baseKind() === "kind";
    }

    isChild(): boolean {
        if (!this.member || !this.node) return false;
        return this.type.baseKind() === "list" || this.type.baseKind() === "node";
    }

    /**
     * True when this inherited member carries an explicit type or optionality
     * override relative to its base field.  Such members need their own
     * property declaration in a TS interface even though they are inherited.
     */
    hasTypeScriptOverride(): boolean {
        if (!this.member?.inherited || !this.inheritedField) return false;
        // Explicit type override on the member narrows the base type.
        if (this.member.type && this.type.formatTypeScript() !== this.inheritedField.type.formatTypeScript()) return true;
        // Explicit optionality override (e.g. base is required but this member is optional, or vice-versa).
        if (this.member.optional !== undefined && this.optional !== this.inheritedField.optional) return true;
        return false;
    }

    /** Go parameter name: uncapitalized, with Go keyword avoidance. */
    goParamName(): string {
        const name = this.api.uncapitalize(this.name);
        if (name === "type") return "typeNode";
        if (name === "default") return "defaultNode";
        if (name === "case") return "caseNode";
        return name;
    }
}

export interface KindElementInfo {
    name?: string;
    comment?: string;
}

export interface KindMarkerInfo {
    name: string;
    value: string;
}

export interface KindAliasInfo {
    name: string;
    members: string[];
    range?: [string, string];
}

/** A kind guard is either range-based (kind >= First && kind <= Last) or enumerated (switch/conditions). */
export type KindGuardInfo =
    & {
        /** The alias name from the schema, e.g. "TokenSyntaxKind". */
        aliasName: string;
        /** The guard function name, e.g. "isTokenKind". Drops "Syntax" from the alias name. */
        guardName: string;
    }
    & (
        | { type: "range"; first: string; last: string; }
        | { type: "enumerated"; members: string[]; }
    );

/** Compute a guard function name from a kind alias name. Drops "Syntax" from the name. */
export function kindGuardName(aliasName: string): string {
    return `is${aliasName.replace("Syntax", "")}`;
}

export interface Schema {
    $schema: string;
    bases: Record<string, BaseEntry>;
    nodes: {
        definitions: Record<string, NodeDef>;
        aliases: Record<string, { base: string; } | string[]>;
        listAliases?: Record<string, string>;
    };
    kinds?: {
        elements: (string | KindElement)[];
        markers: { name: string; value: string; }[];
        aliases?: Record<string, string[] | { range: [string, string]; }>;
    };
}

// ────────────────────────────────────────────────────────────────────────────
// SchemaAPI — shared logic for both Go and TS generators
// ────────────────────────────────────────────────────────────────────────────

/**
 * Wraps the parsed ast.json schema and provides common query/resolution
 * methods used by both the Go and TS code generators.
 */
export class SchemaAPI {
    readonly schema: Schema;
    private readonly listAliasNameMap = new Map<string, string>();
    private readonly instantiationAliasMap = new Map<string, string>();
    /** Maps syntax kind names to (aliasName, nodeName) for instantiation aliases, or (undefined, nodeName) for direct nodes. */
    private readonly syntaxKindToNodeInfo = new Map<string, { aliasName?: string; nodeName: string; }>();
    private readonly primitiveTypeMap = new Map<string, PrimitiveType>();
    private readonly kindTypeMap = new Map<string, KindType>();
    private readonly nodeTypeMap = new Map<string, NodeType>();
    private readonly listTypeMapByKey = new Map<string, ListType>();
    private readonly unionTypeMap = new Map<string, UnionType>();
    private readonly aliasTypeMap = new Map<string, AliasType>();
    private readonly typeParameterTypeMap = new Map<string, TypeParameterType>();
    private readonly primitiveTypes = new Set([
        "any",
        "bool",
        "boolean",
        "int",
        "ModifierFlags",
        "NodeFlags",
        "string",
        "TokenFlags",
    ]);

    constructor(schema: Schema) {
        this.schema = schema;
        const listAliases = schema.nodes.listAliases || {};
        for (const [aliasName, elementType] of Object.entries(listAliases)) {
            this.listAliasNameMap.set(this.typeCacheKey(this.resolveType(elementType)), aliasName);
        }
        for (const [nodeName, nodeDef] of Object.entries(schema.nodes.definitions)) {
            for (const aliasName of Object.keys(nodeDef.instantiationAliases || {})) {
                this.instantiationAliasMap.set(aliasName, nodeName);
            }
            // Map syntax kind names to instantiation aliases
            for (const [aliasName, typeArg] of Object.entries(nodeDef.instantiationAliases || {})) {
                // typeArg is a syntax kind name or a kind alias name
                if (this.hasKindAlias(typeArg)) {
                    // Multi-kind instantiation alias (e.g. BinaryOperatorToken) — expand the kind alias
                    for (const kindType of this.expandKindAliasMembers(typeArg)) {
                        if (!this.syntaxKindToNodeInfo.has(kindType.name)) {
                            this.syntaxKindToNodeInfo.set(kindType.name, { aliasName, nodeName });
                        }
                    }
                }
                else {
                    if (!this.syntaxKindToNodeInfo.has(typeArg)) {
                        this.syntaxKindToNodeInfo.set(typeArg, { aliasName, nodeName });
                    }
                }
            }
            // Map the node's own syntax kind(s) to itself
            const primaryKind = Array.isArray(nodeDef.kind) ? nodeDef.kind[0] : (nodeDef.kind || nodeName);
            if (!this.syntaxKindToNodeInfo.has(primaryKind)) {
                this.syntaxKindToNodeInfo.set(primaryKind, { nodeName });
            }
            if (Array.isArray(nodeDef.kind)) {
                for (const k of nodeDef.kind.slice(1)) {
                    if (!this.syntaxKindToNodeInfo.has(k)) {
                        this.syntaxKindToNodeInfo.set(k, { nodeName });
                    }
                }
            }
        }
    }

    // ── String helpers ──────────────────────────────────────────────────────

    /** Capitalize the first character: "foo" → "Foo". */
    capitalize(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    /** Uncapitalize, with special handling for "JSDoc" prefix. */
    uncapitalize(s: string): string {
        if (s.startsWith("JSDoc")) return "jsdoc" + s.slice(5);
        return s.charAt(0).toLowerCase() + s.slice(1);
    }

    bases(): NodeType[] {
        return Object.keys(this.schema.bases).map(key => this.getBase(key)).filter((base): base is NodeType => !!base);
    }

    getBase(key: string): NodeType | undefined {
        if (!(key in this.schema.bases)) return undefined;
        return this.nodeType(key);
    }

    nodes(): NodeType[] {
        return Object.keys(this.schema.nodes.definitions).map(key => this.getNode(key)).filter((node): node is NodeType => !!node);
    }

    getNode(key: string): NodeType | undefined {
        if (!(key in this.schema.nodes.definitions)) return undefined;
        return this.nodeType(key);
    }

    hasNode(key: string): boolean {
        return key in this.schema.nodes.definitions;
    }

    getNodeDef(key: string): NodeDef | undefined {
        return this.schema.nodes.definitions[key];
    }

    nodeAliases(): AliasType[] {
        return Object.keys(this.schema.nodes.aliases).map(name => this.getNodeAlias(name)).filter((alias): alias is AliasType => !!alias);
    }

    getNodeAlias(name: string): AliasType | undefined {
        if (!(name in this.schema.nodes.aliases)) return undefined;
        const type = this.resolveType(name);
        return type.kind === "alias" ? type : undefined;
    }

    listAliases(): AliasType[] {
        return Object.keys(this.schema.nodes.listAliases || {}).map(name => this.resolveType(name)).filter((type): type is AliasType => type.kind === "alias");
    }

    kindElements(): KindElementInfo[] {
        return (this.schema.kinds?.elements || []).map(element => {
            if (typeof element === "string") {
                return { name: element };
            }
            return { name: element.name, comment: element.comment };
        });
    }

    kindMarkers(): KindMarkerInfo[] {
        return this.schema.kinds?.markers || [];
    }

    /** Resolve a marker name to its concrete kind value. If the name is already a kind element, returns itself. */
    resolveKindMarkerValue(name: string): string {
        // If it's a marker, resolve to its value (recursively since markers can reference other markers)
        const marker = this.kindMarkers().find(m => m.name === name);
        if (marker) return this.resolveKindMarkerValue(marker.value);
        return name;
    }

    kindAliases(): KindAliasInfo[] {
        return Object.entries(this.schema.kinds?.aliases || {}).map(([name, value]) => {
            if (Array.isArray(value)) {
                return { name, members: value };
            }
            // Range format: { range: ["FirstX", "LastX"] }
            const [first, last] = value.range;
            const elements = this.kindElements().filter(e => e.name).map(e => e.name!);
            const firstIdx = elements.indexOf(this.resolveKindMarkerValue(first));
            const lastIdx = elements.indexOf(this.resolveKindMarkerValue(last));
            if (firstIdx === -1 || lastIdx === -1) {
                throw new Error(`Range alias ${name}: could not resolve range [${first}, ${last}]`);
            }
            const members = elements.slice(firstIdx, lastIdx + 1);
            return { name, members, range: value.range as [string, string] };
        });
    }

    hasKindAlias(name: string): boolean {
        return this.kindAliases().some(alias => alias.name === name);
    }

    getKindAlias(name: string): KindAliasInfo | undefined {
        return this.kindAliases().find(alias => alias.name === name);
    }

    /**
     * Returns kind guard info for each kind alias. Range-based aliases produce range guards;
     * enumerated aliases produce guards whose members reference either sub-alias guard calls
     * or concrete kind names.
     */
    kindGuards(): KindGuardInfo[] {
        return this.kindAliases().map(({ name, members, range }): KindGuardInfo => {
            const guardName = kindGuardName(name);
            if (range) {
                return { aliasName: name, guardName, type: "range", first: range[0], last: range[1] };
            }
            return { aliasName: name, guardName, type: "enumerated", members };
        });
    }

    hasKindElement(name: string): boolean {
        return this.kindElements().some(element => element.name === name);
    }

    expandKindAliasMembers(name: string): KindType[] {
        const alias = this.getKindAlias(name);
        if (!alias) return [this.kindType(`SyntaxKind.${name}`)];
        const result: KindType[] = [];
        for (const member of alias.members) {
            if (this.hasKindAlias(member)) {
                result.push(...this.expandKindAliasMembers(member));
            }
            else {
                result.push(this.kindType(`SyntaxKind.${member}`));
            }
        }
        return result;
    }

    /** A base is "Go-only" if it has no brand AND all its fields are both noTS and noFactory. */
    isGoOnlyBase(key: string): boolean {
        const base = this.schema.bases[key];
        if (!base) return false;
        if (base.brand) return false;
        if (!base.fields) return true;
        return Object.values(base.fields).every(f => f.goOnly || (f.noTS && f.noFactory));
    }

    /**
     * Given a syntax kind name (e.g. "AbstractKeyword"), returns the node type
     * that has that syntax kind. For instantiation aliases, returns the alias type
     * (e.g. `AliasType("AbstractKeyword", NodeType("Token"))`). For direct nodes,
     * returns the node type itself.
     */
    resolveNodeTypeForSyntaxKind(syntaxKindName: string): Type | undefined {
        const info = this.syntaxKindToNodeInfo.get(syntaxKindName);
        if (!info) return undefined;
        if (info.aliasName) {
            return this.aliasType(info.aliasName, this.nodeType(info.nodeName));
        }
        return this.nodeType(info.nodeName);
    }

    resolveType(typeName: string | string[], node?: NodeDef, resolveAs?: "node"): Type {
        if (Array.isArray(typeName)) {
            return this.unionType(typeName.map(type => this.resolveType(type, node, resolveAs)));
        }

        if (node?.typeParameters) {
            for (const tp of node.typeParameters) {
                if (tp.name === typeName) {
                    const nodeKey = this.nodeKeyFor(node);
                    if (!nodeKey) {
                        throw new Error(`Type parameter ${typeName} requires a node context`);
                    }
                    const constraint = tp.constraint === typeName
                        ? this.primitiveType(typeName)
                        : this.resolveType(tp.constraint, node);
                    return this.typeParameterType(nodeKey, typeName, constraint);
                }
            }
        }

        const kindAliases = this.schema.kinds?.aliases || {};
        if (typeName in kindAliases) {
            if (resolveAs === "node") {
                // Resolve each kind in the alias to its corresponding node type
                const kindMembers = this.expandKindAliasMembers(typeName);
                return this.unionType(kindMembers.map(kindType => {
                    const resolved = this.resolveNodeTypeForSyntaxKind(kindType.name);
                    if (!resolved) {
                        throw new Error(`Kind alias member "${kindType.name}" (from "${typeName}") does not resolve to a node type`);
                    }
                    return resolved;
                }));
            }
            return this.aliasType(
                typeName,
                this.unionType(this.expandKindAliasMembers(typeName)),
            );
        }

        if (typeName === "Kind" || typeName.startsWith("SyntaxKind.")) {
            return this.kindType(typeName);
        }

        if (typeName === "Node") {
            return this.nodeType(typeName);
        }

        if (this.primitiveTypes.has(typeName)) {
            return this.primitiveType(typeName);
        }

        const listAliasTarget = this.schema.nodes.listAliases?.[typeName];
        if (listAliasTarget) {
            return this.aliasType(typeName, this.listType(this.resolveType(listAliasTarget, node), "NodeList"));
        }

        const instantiationNode = this.instantiationAliasMap.get(typeName);
        if (instantiationNode) {
            return this.aliasType(typeName, this.nodeType(instantiationNode));
        }

        if (typeName in this.schema.nodes.aliases) {
            const alias = this.schema.nodes.aliases[typeName];
            if (Array.isArray(alias)) {
                return this.aliasType(typeName, this.unionType(alias.map(type => this.resolveType(type, node, "node"))), "node");
            }
            return this.aliasType(typeName, this.nodeType(alias.base));
        }

        if (typeName in this.schema.nodes.definitions) {
            return this.nodeType(typeName);
        }

        if (typeName in this.schema.bases) {
            return this.nodeType(typeName);
        }

        return this.primitiveType(typeName);
    }

    validate(): void {
        for (const base of this.bases()) {
            if (base !== this.resolveType(base.key)) {
                throw new Error(`Base type cache mismatch for ${base.key}`);
            }
            for (const ext of base.extendsKeys) {
                if (!this.getBase(ext)) {
                    throw new Error(`Unknown base extends target ${ext} from ${base.key}`);
                }
            }
            for (const field of base.fields) {
                if (field.type !== field.type) {
                    throw new Error(`Base field type cache mismatch for ${base.key}.${field.name}`);
                }
            }
        }

        for (const node of this.nodes()) {
            if (this.resolveType(node.key) !== this.nodeType(node.key)) {
                throw new Error(`Node type cache mismatch for ${node.key}`);
            }
            for (const ext of node.extendsKeys) {
                if (!this.getBase(ext)) {
                    throw new Error(`Unknown node extends target ${ext} from ${node.key}`);
                }
            }
            for (const member of node.members) {
                if (member.type !== member.type) {
                    throw new Error(`Member type cache mismatch for ${node.key}.${member.name}`);
                }
                if (member.declaredType !== member.declaredType) {
                    throw new Error(`Declared member type cache mismatch for ${node.key}.${member.name}`);
                }
                if (member.inheritedField && member.inheritedField.type !== member.inheritedField.type) {
                    throw new Error(`Inherited field type cache mismatch for ${node.key}.${member.name}`);
                }
            }
        }

        for (const alias of this.nodeAliases()) {
            if (alias !== this.resolveType(alias.name)) {
                throw new Error(`Alias type cache mismatch for ${alias.name}`);
            }
            if (alias.baseKey && !this.getBase(alias.baseKey)) {
                throw new Error(`Unknown alias base ${alias.baseKey} from ${alias.name}`);
            }
            for (const [index, memberName] of alias.unionMemberNames.entries()) {
                if (alias.unionMemberTypes[index] !== this.resolveType(memberName, undefined, alias.resolveAs)) {
                    // Force member types to be reachable and cached via their names.
                    throw new Error(`Alias union member cache mismatch for ${alias.name}`);
                }
            }
        }

        for (const listAlias of this.listAliases()) {
            const resolved = this.resolveType(listAlias.name);
            if (resolved.kind !== "alias" || resolved.resolved.kind !== "list") {
                throw new Error(`List alias ${listAlias.name} did not resolve to an alias of a list type`);
            }
            if (!listAlias.elementTypeName) {
                throw new Error(`List alias ${listAlias.name} is missing an element type`);
            }
            if (listAlias.elementType !== this.resolveType(listAlias.elementTypeName)) {
                throw new Error(`List alias element type cache mismatch for ${listAlias.name}`);
            }
        }

        for (const marker of this.kindMarkers()) {
            if (!this.hasKindElement(marker.value) && !this.kindMarkers().some(candidate => candidate.name === marker.value)) {
                throw new Error(`Kind marker ${marker.name} references undefined kind or marker ${marker.value}`);
            }
        }

        for (const alias of this.kindAliases()) {
            for (const member of alias.members) {
                if (!this.hasKindAlias(member) && !this.hasKindElement(member)) {
                    throw new Error(`Unknown kind alias member ${member} in ${alias.name}`);
                }
            }
        }
    }

    primitiveType(name: string): PrimitiveType {
        const existing = this.primitiveTypeMap.get(name);
        if (existing) return existing;
        const type = new PrimitiveType(this, name);
        this.primitiveTypeMap.set(name, type);
        return type;
    }

    kindType(value: string): KindType {
        const existing = this.kindTypeMap.get(value);
        if (existing) return existing;
        const type = new KindType(this, value);
        this.kindTypeMap.set(value, type);
        return type;
    }

    nodeType(name: string): NodeType {
        const existing = this.nodeTypeMap.get(name);
        if (existing) return existing;
        const type = new NodeType(this, name);
        this.nodeTypeMap.set(name, type);
        return type;
    }

    listType(elementType: Type, listKind: ListKind): ListType {
        const key = `${listKind}:${this.typeCacheKey(elementType)}`;
        const existing = this.listTypeMapByKey.get(key);
        if (existing) return existing;
        const type = new ListType(this, elementType, listKind);
        this.listTypeMapByKey.set(key, type);
        return type;
    }

    unionType(types: Type[]): UnionType {
        const key = types.map(type => this.typeCacheKey(type)).join("|");
        const existing = this.unionTypeMap.get(key);
        if (existing) return existing;
        const type = new UnionType(this, types);
        this.unionTypeMap.set(key, type);
        return type;
    }

    aliasType(name: string, resolved: Type, resolveAs?: "node"): AliasType {
        const key = `${name}:${this.typeCacheKey(resolved)}`;
        const existing = this.aliasTypeMap.get(key);
        if (existing) return existing;
        const type = new AliasType(this, name, resolved, resolveAs);
        this.aliasTypeMap.set(key, type);
        return type;
    }

    typeParameterType(nodeKey: string, name: string, constraint: Type): TypeParameterType {
        const key = `${nodeKey}:${name}:${this.typeCacheKey(constraint)}`;
        const existing = this.typeParameterTypeMap.get(key);
        if (existing) return existing;
        const type = new TypeParameterType(this, name, constraint);
        this.typeParameterTypeMap.set(key, type);
        return type;
    }

    getInstantiationNodeName(name: string): string | undefined {
        return this.instantiationAliasMap.get(name);
    }

    listAliasName(elementType: Type): string | undefined {
        return this.listAliasNameMap.get(this.typeCacheKey(elementType));
    }

    private nodeKeyFor(node: NodeDef): string | undefined {
        return Object.entries(this.schema.nodes.definitions).find(([, def]) => def === node)?.[0];
    }

    private typeCacheKey(type: Type): string {
        switch (type.kind) {
            case "primitive":
                return `primitive:${type.name}`;
            case "kind":
                return `kind:${type.value}`;
            case "node":
                return `node:${type.name}`;
            case "alias":
                return `alias:${type.name}:${this.typeCacheKey(type.resolved)}`;
            case "list":
                return `list:${type.listKind}:${this.typeCacheKey(type.elementType)}`;
            case "typeParameter":
                return `typeParameter:${type.name}:${this.typeCacheKey(type.constraint)}`;
            case "union":
                return `union:${type.types.map(member => this.typeCacheKey(member)).join("|")}`;
        }
    }
}

const ROOT = path.resolve(import.meta.dirname!, "..");
export const api = new SchemaAPI(JSON.parse(
    fs.readFileSync(path.join(ROOT, "_scripts/ast.json"), "utf-8"),
) as Schema);
api.validate();
