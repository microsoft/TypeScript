import * as ts from "./typescript-internal"
import { Map, SyntaxKind, Node, Symbol, SymbolFlags, getSymbolId } from "./typescript-internal";
import { hasProperty, getProperty } from "./utilities";

const typeInfoForSymbol: TypeInfo[] = [];
const typeInfoForName: Map<TypeInfo> = {};
const typeInfoForUnion: Map<UnionTypeInfo> = {};
const typeInfoForTypeReference: Map<GenericTypeInfo> = {};
const subTypeRelationships: TypeInfo[][] = [];
const aliasRelationships: TypeInfo[][] = [];
const unionRelationships: TypeInfo[][] = [];
const propertyInfoForSymbol: PropertyInfo[] = [];
const annotationPattern = /@(\w+\s*[^\r\n]*)/g;
const symbolToAnnotations: Annotation[][] = [];
const annotationConstructors: Map<AnnotationConstructorEntry> = {};
const options = getCompilerOptions();
const host = ts.createCompilerHost(options);

let globalArrayType: TypeInfo;
let checker: ts.TypeChecker;
let program: ts.Program;

export const enum AnnotationTargets {
    Class = 1 << 0,
    Interface = 1 << 1,
    TypeAlias = 1 << 2,
    Property = 1 << 3,
    All = Class | Interface | TypeAlias | Property,
}

interface AnnotationConstructorEntry {
    name: string;
    constructor: typeof Annotation;
    inherited: boolean;
    allowMultiple: boolean;
    targets: AnnotationTargets;
}

export interface EnumValue<T extends number> {
    symbol: Symbol;
    value: T;
}

export interface Annotated {
    getAnnotations(inherited: boolean): Annotation[];
    findAllAnnotations<T extends Annotation>(inherited: boolean, match: (annotation: Annotation) => annotation is T): T[];
    findFirstAnnotation<T extends Annotation>(inherited: boolean, match: (annotation: Annotation) => annotation is T): T;
}

export abstract class TypeInfo implements Annotated {
    private static nextId = 1;
    private annotations: Annotation[];
    private allAnnotations: Annotation[];

    public id = TypeInfo.nextId++;
    public symbol: Symbol;
    public name: string;
    public members: PropertyInfo[] = [];

    constructor(symbol: Symbol, name: string) {
        this.symbol = symbol;
        this.name = name;
    }

    public get isInterface() { return false; }
    public get isTypeAlias() { return false; }
    public get isOtherType() { return false; }
    public get isUnionType() { return false; }
    public get isGenericTypeParameter() { return false; }
    public get hasGenericTypeParameters() { return false; }
    public get isConstructedGenericType() { return false; }

    public getGenericTypeDefinition(): TypeInfo {
        throw new TypeError();
    }

    public getGenericTypeParameters(): TypeInfo[] {
        throw new TypeError();
    }

    public getGenericTypeArguments(): TypeInfo[] {
        return [];
    }

    public getSuperTypes(): TypeInfo[] {
        return [];
    }

    public getSubTypes(): TypeInfo[] {
        return subTypeRelationships[this.id] || [];
    }

    public getAliases(): TypeInfo[] {
        return aliasRelationships[this.id] || [];
    }

    public getRelatedUnionTypes(): TypeInfo[] {
        return unionRelationships[this.id] || [];
    }

    public getAliasedType(): TypeInfo {
        return undefined;
    }

    public getConstituentTypes(): TypeInfo[] {
        return [];
    }

    public makeGenericType(typeArguments: TypeInfo[]): TypeInfo {
        throw new TypeError();
    }

    public isAssignableFrom(type: TypeInfo): boolean {
        if (type === undefined) {
            return false;
        }

        if (this === type) {
            return true;
        }

        if (type.isUnionType) {
            for (let constituentType of type.getConstituentTypes()) {
                if (!this.isAssignableFrom(constituentType)) {
                    return false;
                }
            }

            return true;
        }

        if (type.isTypeAlias) {
            return this.isAssignableFrom(type.getAliasedType());
        }

        if (type.isConstructedGenericType) {
            return this.isAssignableFrom(type.getGenericTypeDefinition());
        }

        if (this.isConstructedGenericType) {
            return this.getGenericTypeDefinition().isAssignableFrom(type);
        }

        if (this.isUnionType) {
            if (type.isConstituentOf(this)) {
                return true;
            }
        }

        if (this.isTypeAlias) {
            if (this.getAliasedType().isAssignableFrom(type)) {
                return true;
            }
        }

        if (this.isInterface) {
            if (type.isSubTypeOf(this)) {
                return true;
            }
        }

        if (this.isGenericTypeParameter) {
            return true;
        }

        return false;
    }

    public isConstituentOf(type: TypeInfo): boolean {
        if (type === undefined) {
            return false;
        }

        if (type === this) {
            return true;
        }

        if (type.isTypeAlias) {
            return this.isConstituentOf(type.getAliasedType());
        }

        if (type.isUnionType) {
            for (let constituentType of type.getConstituentTypes()) {
                if (constituentType.isAssignableFrom(this)) {
                    return true;
                }
            }
        }

        return false;
    }

    public isSuperTypeOf(type: TypeInfo) {
        if (type === undefined) {
            return false;
        }

        return type.isSubTypeOf(this);
    }

    public isSubTypeOf(type: TypeInfo): boolean {
        if (type === undefined) {
            return false;
        }

        if (type.isTypeAlias) {
            return this.isSubTypeOf(type.getAliasedType());
        }

        if (this.isTypeAlias) {
            return this.getAliasedType().isSubTypeOf(type);
        }

        for (let superType of this.getSuperTypes()) {
            if (superType === type) {
                return true;
            }
        }

        for (let superType of this.getSuperTypes()) {
            if (superType.isSubTypeOf(type)) {
                return true;
            }
        }

        return false;
    }

    public getProperty(propertyName: string, inherited: boolean) {
        let properties = this.getProperties(inherited);
        for (let property of properties) {
            if (property.name === propertyName) {
                return property;
            }
        }

        return undefined;
    }

    public getProperties(inherited: boolean) {
        let properties: PropertyInfo[];
        if (inherited) {
            properties = this.members.slice(0);
        }
        else {
            properties = [];
            for (let member of this.members) {
                if (member.containingType === this) {
                    properties.push(member);
                }
            }
        }

        return properties;
    }

    public getAnnotations(inherited: boolean) {
        return inherited ? this.getInheritedAnnotations() : this.getOwnAnnotations();
    }

    public findAllAnnotations<T extends Annotation>(inherited: boolean, match: (annotation: Annotation) => annotation is T): T[] {
        return findAllAnnotationsOf(this, inherited, match);
    }

    public findFirstAnnotation<T extends Annotation>(inherited: boolean, match: (annotation: Annotation) => annotation is T): T {
        return findFirstAnnotationOf(this, inherited, match);
    }

    public toString(): string {
        return this.name ? this.name : "any";
    }

    private getOwnAnnotations() {
        if (!this.annotations) {
            this.annotations = [];
            if (this.symbol) {
                for (let annotation of getAnnotations(this.symbol)) {
                    this.annotations.push(annotation);
                }
            }
        }

        return this.annotations;
    }

    private getInheritedAnnotations() {
        if (!this.allAnnotations) {
            this.allAnnotations = [];
            let inheritedTypes = [this as TypeInfo];
            let seen: Map<boolean> = {};
            while (inheritedTypes.length > 0) {
                inheritedTypes = this.fillBreadthFirstInheritedAnnotations(inheritedTypes, seen);
            }
        }
        return this.allAnnotations;
    }

    private fillBreadthFirstInheritedAnnotations(types: TypeInfo[], seen: Map<boolean>) {
        let inheritedTypes: TypeInfo[] = [];
        for (let type of types) {
            if (type.isInterface) {
                inheritedTypes = inheritedTypes.concat(type.getSuperTypes());
            }
            else if (type.isTypeAlias) {
                inheritedTypes.push(type.getAliasedType());
            }
            else if (type.isUnionType) {
                inheritedTypes = inheritedTypes.concat(type.getConstituentTypes());
            }

            for (let annotation of type.getOwnAnnotations()) {
                if (type === this || annotationMayBeInherited(annotation)) {
                    if (!annotationAllowsMultiple(annotation)) {
                        if (hasProperty(seen, annotation.name)) {
                            continue;
                        }

                        seen[annotation.name] = true;
                    }

                    this.allAnnotations.push(annotation);
                }
            }
        }

        return inheritedTypes;
    }
}

abstract class GenericTypeInfo extends TypeInfo {
    private typeParameters: TypeInfo[];
    private typeArguments: TypeInfo[];
    private target: TypeInfo;

    constructor(symbol: Symbol, name: string) {
        super(symbol, name);
    }

    public get hasGenericTypeParameters() { return this.typeParameters && this.typeParameters.length > 0; }
    public get isConstructedGenericType() { return this.typeArguments && this.typeArguments.length > 0; }

    public setGenericTypeParameters(typeParameters: TypeInfo[]) {
        this.typeParameters = typeParameters;
    }

    public getGenericTypeParameters() {
        return this.typeParameters || [];
    }

    public getGenericTypeDefinition() {
        if (this.target) {
            return this.target;
        }

        return super.getGenericTypeDefinition();
    }

    public getGenericTypeArguments() {
        if (this.isConstructedGenericType) {
            return this.typeArguments;
        }

        return [];
    }

    public makeGenericType(typeArguments: TypeInfo[]) {
        let typeParameters = this.getGenericTypeParameters();
        if (typeParameters.length === 0 || typeParameters.length !== typeArguments.length) {
            throw new TypeError();
        }

        let target: TypeInfo = this.target || this;
        let key = formatTypeInfoKey([target, ...typeArguments]);
        let typeInfo = getProperty(typeInfoForTypeReference, key);
        if (!typeInfo) {
            typeInfo = this.createType();
            typeInfo.members = target.members;
            typeInfo.target = target;
            typeInfo.typeArguments = typeArguments;
            typeInfoForTypeReference[key] = typeInfo;
        }
        return typeInfo;
    }

    public toString(): string {
        let text = this.name;
        if (this.isConstructedGenericType) {
            text += "<" + this.typeArguments.join(", ") + ">";
        }

        return text;
    }

    protected abstract createType(): GenericTypeInfo;
}

class InterfaceInfo extends GenericTypeInfo {
    private superTypes: TypeInfo[];

    public subTypes: TypeInfo[] = [];

    constructor(symbol: Symbol, name: string) {
        super(symbol, name);
    }

    public get isInterface() { return true; }

    public setSuperTypes(superTypes: TypeInfo[]) {
        this.superTypes = superTypes || [];

        for (let superType of this.superTypes) {
            recordSubTypeRelationship(this, superType);
        }
    }

    public getSuperTypes() {
        return this.superTypes || [];
    }

    protected createType() {
        let type = new InterfaceInfo(this.symbol, this.name);
        type.setGenericTypeParameters(this.getGenericTypeParameters());
        type.setSuperTypes(this.getSuperTypes());
        return type;
    }
}

class TypeAliasInfo extends GenericTypeInfo {
    private aliasedType: TypeInfo;

    constructor(symbol: Symbol, name: string) {
        super(symbol, name);
    }

    public get isTypeAlias() { return true; }

    public setAliasedType(aliasedType: TypeInfo) {
        this.aliasedType = aliasedType;
        recordAliasRelationship(this, aliasedType);
    }

    public getAliasedType() {
        return this.aliasedType;
    }

    protected createType() {
        let type = new TypeAliasInfo(this.symbol, this.name);
        type.setGenericTypeParameters(this.getGenericTypeParameters());
        type.setAliasedType(this.getAliasedType());
        return type;
    }
}

class TypeParameterInfo extends TypeInfo {
    private constraint: TypeInfo;

    constructor(symbol: Symbol, name: string) {
        super(symbol, name);
    }

    public get isGenericTypeParameter() { return true; }

    public setConstraint(constraint: TypeInfo) {
        this.constraint = constraint;
    }

    public getConstraint() {
        return this.constraint;
    }
}

class UnionTypeInfo extends TypeInfo {
    private constituentTypes: TypeInfo[];

    constructor() {
        super(/*symbol*/ undefined, /*name*/ undefined);
    }

    public get isUnionType() { return true; }

    public setConstituentTypes(constituentTypes: TypeInfo[]) {
        this.constituentTypes = constituentTypes || [];

        for (let constituentType of this.constituentTypes) {
            recordUnionRelationship(this, constituentType);
        }
    }

    public getConstituentTypes() {
        return this.constituentTypes ? this.constituentTypes.slice(0) : [];
    }

    public toString() {
        return this.getConstituentTypes().join(" | ");
    }
}

class OtherTypeInfo extends TypeInfo {
    constructor(name: string) {
        super(/*symbol*/ undefined, name);
    }

    public get isOtherType() { return true; }
}

export class PropertyInfo implements Annotated {
    private annotations: Annotation[];
    private allAnnotations: Annotation[];

    public containingType: TypeInfo;
    public symbol: Symbol;
    public name: string;
    public propertyType: TypeInfo;

    constructor(containingType: TypeInfo, symbol: Symbol, name: string) {
        this.containingType = containingType;
        this.symbol = symbol;
        this.name = name;
    }

    public getOverriddenProperties() {
        let overriddenProperties: PropertyInfo[] = [];
        for (let superType of this.containingType.getSuperTypes()) {
            let overriddenProperty = superType.getProperty(this.name, /*inherited*/ true);
            if (overriddenProperty) {
                overriddenProperties.push(overriddenProperty);
            }
        }

        return overriddenProperties;
    }

    public getAnnotations(inherited: boolean) {
        return inherited ? this.getInheritedAnnotations() : this.getOwnAnnotations();
    }

    public findAllAnnotations<T extends Annotation>(inherited: boolean, match: (annotation: Annotation) => annotation is T): T[] {
        return findAllAnnotationsOf(this, inherited, match);
    }

    public findFirstAnnotation<T extends Annotation>(inherited: boolean, match: (annotation: Annotation) => annotation is T): T {
        return findFirstAnnotationOf(this, inherited, match);
    }

    private getOwnAnnotations() {
        if (!this.annotations) {
            let seen: Map<boolean> = {};
            this.annotations = [];
            for (let annotation of getAnnotations(this.symbol)) {
                if (!annotationAllowsMultiple(annotation)) {
                    if (hasProperty(seen, annotation.name)) {
                        continue;
                    }

                    seen[annotation.name] = true;
                }

                this.annotations.push(annotation);
            }
        }

        return this.annotations;
    }

    private getInheritedAnnotations() {
        if (!this.allAnnotations) {
            let seen: Map<boolean> = {};
            this.allAnnotations = [];
            for (let annotation of this.getOwnAnnotations()) {
                if (!annotationAllowsMultiple(annotation)) {
                    seen[annotation.name] = true;
                }

                this.allAnnotations.push(annotation);
            }

            for (let overriddenProperty of this.getOverriddenProperties()) {
                for (let annotation of overriddenProperty.getInheritedAnnotations()) {
                    if (annotationMayBeInherited(annotation)) {
                        if (!annotationAllowsMultiple(annotation)) {
                            if (hasProperty(seen, annotation.name)) {
                                continue;
                            }

                            seen[annotation.name] = true;
                        }

                        this.allAnnotations.push(annotation);
                    }
                }
            }
        }

        return this.allAnnotations;
    }
}

export class Annotation {
    public static inherited = true;
    public static allowMultiple = true;
    public static targets = AnnotationTargets.All;
    public name: string;
    public arguments: any[];
    constructor(_arguments: any[]) {
        this.arguments = _arguments;
    }

    public static match(annotation: Annotation): boolean {
        return annotation instanceof this;
    }
}

function getCompilerOptions() {
    let options = ts.getDefaultCompilerOptions();
    options.noResolve = true;
    options.noLib = true;
    return options;
}

export function loadSourceFiles(names: string[]) {
    symbolToAnnotations.length = 0;
    program = ts.createProgram(names, options, host, program);
    program.getSourceFile(names[0]);
    checker = program.getTypeChecker();
}

export function getType(name: string) {
    let symbol = resolveQualifiedName(name, SymbolFlags.Type);
    return symbol && getDeclaredTypeOfSymbol(symbol);
}

export function getTypes(ns: string) {
    let namespaceSymbol = resolveQualifiedName(ns, SymbolFlags.Namespace);
    let typeSymbols = getSymbols(namespaceSymbol.exports, SymbolFlags.Type);
    return typeSymbols.map(getDeclaredTypeOfSymbol);
}

function getGlobalArrayType() {
    if (!globalArrayType) {
        let type = new InterfaceInfo(/*symbol*/ undefined, "Array");
        type.setGenericTypeParameters([new TypeParameterInfo(/*symbol*/ undefined, "T")]);
        globalArrayType = type;
    }
    return globalArrayType;
}

export function makeArrayType(elementType: TypeInfo) {
    return getGlobalArrayType().makeGenericType([elementType]);
}

function getDeclaredTypeOfSymbol(symbol: Symbol) {
    if (symbol.flags & SymbolFlags.Type) {
        let decl = symbol.declarations[0];
        if (isInterfaceDeclaration(decl)) {
            return getDeclaredTypeInfoOfInterface(symbol, decl);
        }
        else if (isTypeAliasDeclaration(decl)) {
            return getDeclaredTypeInfoOfTypeAlias(symbol, decl);
        }
        else if (isTypeParameterDeclaration(decl)) {
            return getDeclaredTypeInfoOfTypeParameter(symbol, decl);
        }
        else {
            return getDeclaredTypeInfoOfOtherType(symbol);
        }
    }

    return undefined;
}

function getInterfaceExtendsClause(decl: ts.InterfaceDeclaration): ts.ExpressionWithTypeArguments[] {
    if (decl.heritageClauses && decl.heritageClauses.length > 0) {
        return decl.heritageClauses[0].types;
    }

    return [];
}

function getDeclaredTypeInfoOfInterface(symbol: Symbol, decl: ts.InterfaceDeclaration) {
    let typeInfo = <InterfaceInfo>typeInfoForSymbol[getSymbolId(symbol)];
    if (!typeInfo) {
        typeInfo = typeInfoForSymbol[getSymbolId(symbol)] = new InterfaceInfo(symbol, symbol.name);
        typeInfo.setGenericTypeParameters(decl.typeParameters ? decl.typeParameters.map(getTypeInfoOfTypeParameter) : undefined);
        typeInfo.setSuperTypes(getInterfaceExtendsClause(decl).map(getTypeInfoOfTypeNode));
        fillTypeInfoFromType(typeInfo, checker.getDeclaredTypeOfSymbol(symbol), symbol);
    }
    return typeInfo;
}

function getDeclaredTypeInfoOfTypeAlias(symbol: Symbol, decl: ts.TypeAliasDeclaration) {
    let typeInfo = <TypeAliasInfo>typeInfoForSymbol[getSymbolId(symbol)];
    if (!typeInfo) {
        typeInfo = typeInfoForSymbol[getSymbolId(symbol)] = new TypeAliasInfo(symbol, symbol.name);
        typeInfo.setGenericTypeParameters(decl.typeParameters ? decl.typeParameters.map(getTypeInfoOfTypeParameter) : undefined);
        typeInfo.setAliasedType(getTypeInfoOfTypeNode(decl.type));
        fillTypeInfoFromType(typeInfo, checker.getDeclaredTypeOfSymbol(symbol), symbol);
    }
    return typeInfo;
}

function getDeclaredTypeInfoOfTypeParameter(symbol: Symbol, decl: ts.TypeParameterDeclaration) {
    let typeInfo = <TypeParameterInfo>typeInfoForSymbol[getSymbolId(symbol)];
    if (!typeInfo) {
        typeInfo = typeInfoForSymbol[getSymbolId(symbol)] = new TypeParameterInfo(symbol, symbol.name);
        typeInfo.setConstraint(decl.constraint ? getTypeInfoOfTypeNode(decl.constraint) : undefined);
    }
    return typeInfo;
}

function getDeclaredTypeInfoOfOtherType(symbol: Symbol) {
    let typeInfo = typeInfoForSymbol[getSymbolId(symbol)];
    if (!typeInfo) {
        typeInfo = typeInfoForSymbol[getSymbolId(symbol)] = new OtherTypeInfo(symbol.name);
        fillTypeInfoFromType(typeInfo, checker.getDeclaredTypeOfSymbol(symbol), symbol);
    }
    return typeInfo;
}

function getTypeInfoOfProperty(symbol: Symbol): TypeInfo {
    if (symbol.flags & SymbolFlags.Property) {
        let typeInfo = typeInfoForSymbol[getSymbolId(symbol)];
        if (!typeInfo) {
            let decl = symbol.valueDeclaration;
            if (isPropertySignature(decl)) {
                return getTypeInfoOfTypeNode(decl.type);
            }
        }
        return typeInfo;
    }
    return undefined;
}

function getTypeInfoOfTypeParameter(node: ts.TypeParameterDeclaration): TypeInfo {
    let symbol = checker.getSymbolAtLocation(node.name);
    return getDeclaredTypeOfSymbol(symbol);
}

function getTypeInfoOfTypeNode(typeNode: ts.TypeNode): TypeInfo {
    if (isTypeReferenceNode(typeNode)) {
        let symbol = checker.getSymbolAtLocation(typeNode.typeName);
        let typeInfo = getDeclaredTypeOfSymbol(symbol);
        if (typeNode.typeArguments && typeNode.typeArguments.length) {
            let typeArguments = typeNode.typeArguments.map(getTypeInfoOfTypeNode);
            typeInfo = typeInfo.makeGenericType(typeArguments);
        }
        return typeInfo;
    }
    else if (isExpressionWithTypeArguments(typeNode)) {
        let symbol = checker.getSymbolAtLocation(typeNode.expression);
        let typeInfo = symbol ? getDeclaredTypeOfSymbol(symbol) : undefined;
        if (!typeInfo) {
            if (isIdentifier(typeNode.expression) && (<ts.Identifier>typeNode.expression).text === "Array") {
                typeInfo = getGlobalArrayType();
            }
            else {
                typeInfo = getTypeInfoOfOtherType(typeNode.expression.getText().trim());
            }
        }
        if (typeNode.typeArguments && typeNode.typeArguments.length) {
            let typeArguments = typeNode.typeArguments.map(getTypeInfoOfTypeNode);
            typeInfo = typeInfo.makeGenericType(typeArguments);
        }
        return typeInfo;
    }
    else if (isUnionTypeNode(typeNode)) {
        return getTypeInfoOfUnionTypeNode(typeNode);
    }
    else if (isArrayTypeNode(typeNode)) {
        return getTypeInfoOfArrayTypeNode(typeNode);
    }
    else {
        return getTypeInfoOfOtherType(typeNode ? typeNode.getText().trim() : "UNKNOWN_TYPE");
    }
}

function getTypeInfoOfOtherType(name: string): TypeInfo {
    let typeInfo = getProperty(typeInfoForName, name);
    if (!typeInfo) {
        typeInfo = new OtherTypeInfo(name);
        typeInfoForName[name] = typeInfo;
    }
    return typeInfo;
}

function getTypeInfoOfArrayTypeNode(typeNode: ts.ArrayTypeNode): TypeInfo {
    let elementType = getTypeInfoOfTypeNode(typeNode.elementType);
    return makeArrayType(elementType);
}

function getTypeInfoOfUnionTypeNode(typeNode: ts.UnionTypeNode): TypeInfo {
    let constituentTypes = typeNode.types.map(getTypeInfoOfTypeNode);
    constituentTypes.sort((a, b) => a.toString().localeCompare(b.toString()));
    let key = formatTypeInfoKey(constituentTypes);
    let typeInfo = getProperty(typeInfoForUnion, key);
    if (!typeInfo) {
        typeInfo = typeInfoForUnion[key] = new UnionTypeInfo();
        typeInfo.setConstituentTypes(constituentTypes);

        let type = checker.getTypeAtLocation(typeNode);
        fillTypeInfoFromType(typeInfo, type, getSymbolOfType(type));
    }
    return typeInfo;
}

function fillTypeInfoFromType(typeInfo: TypeInfo, type: ts.Type, symbol: Symbol) {
    for (let member of checker.getPropertiesOfType(type)) {
        let propertyInfo: PropertyInfo;
        if (member.flags & SymbolFlags.Property) {
            if (getSymbolParent(member) === symbol) {
                propertyInfo = new PropertyInfo(typeInfo, member, member.name);
                propertyInfo.propertyType = getTypeInfoOfProperty(member);
                propertyInfoForSymbol[getSymbolId(member)] = propertyInfo;
            }
            else {
                propertyInfo = propertyInfoForSymbol[getSymbolId(member)];
            }
        }

        if (propertyInfo) {
            typeInfo.members.push(propertyInfo);
        }
    }
}

/**
 * Gets a symbol with the specified name and meaning from the provided symbol table.
 * @param symbols The symbol table from which to retrieve a named symbol.
 * @param name The name of the symbol to retrieve.
 * @param meaning The meaning of the symbol.
 */
export function getSymbol(symbols: ts.SymbolTable, name: string, meaning: SymbolFlags): Symbol {
    if (symbols && meaning && hasProperty(symbols, name)) {
        let symbol = symbols[name];
        if (symbol.flags & meaning) {
            return symbol;
        }
    }

    return undefined;
}

/**
 * Gets al symbols with the specified meaning from the provided symbol table.
 * @param symbols The symbol table from which to retrieve symbols.
 * @param meaning The meaning of each symbol.
 */
export function getSymbols(symbols: ts.SymbolTable, meaning: SymbolFlags) {
    let results: Symbol[];
    if (symbols && meaning) {
        for (let name in symbols) {
            let symbol = getProperty(symbols, name);
            if (symbol && symbol.flags & meaning) {
                if (!results) {
                    results = [];
                }
                results.push(symbol);
            }
        }
    }
    return results || [];
}

export function getQualifiedSymbol(symbolTable: ts.SymbolTable, qualifiedName: string, meaning: SymbolFlags): Symbol {
    return getQualifiedSymbolParts(symbolTable, qualifiedName.split("."), meaning);
}

function getQualifiedSymbolParts(symbolTable: ts.SymbolTable, qualifiedName: string[], meaning: SymbolFlags): Symbol {
    if (qualifiedName.length === 1) {
        return getSymbol(symbolTable, qualifiedName[0], meaning);
    }

    let ns = getSymbol(symbolTable, qualifiedName[0], SymbolFlags.Namespace);
    if (ns === undefined) {
        return undefined;
    }

    for (let i = 1; i < qualifiedName.length - 1; i++) {
        ns = getSymbol(ns.exports, qualifiedName[i], SymbolFlags.Namespace);
        if (ns === undefined) {
            return undefined;
        }
    }

    return getSymbol(ns.exports, qualifiedName[qualifiedName.length - 1], meaning);
}

function getSymbolOfType(type: ts.Type): Symbol {
    return (<any>type).symbol;
}

function getSymbolParent(symbol: Symbol): Symbol {
    return (<any>symbol).parent;
}

function getTypeId(type: ts.Type): number {
    return (<any>type).id;
}

function resolveName(location: Node, name: string, meaning: SymbolFlags): Symbol {
    let symbols = checker.getSymbolsInScope(location, meaning);
    for (let symbol of symbols) {
        if (symbol.name === name) {
            return symbol;
        }
    }

    return undefined;
}

export function resolveQualifiedName(qualifiedName: string, meaning: SymbolFlags): Symbol {
    return resolveQualifiedNameParts(/*location*/ undefined, qualifiedName.split("."), meaning);
}

function resolveEntityName(name: ts.EntityName | ts.Expression): Symbol {
    let qualifiedName: string[] = [];
    return fillQualifiedName(name, qualifiedName)
        ? resolveQualifiedNameParts(name, qualifiedName, SymbolFlags.Type)
        : undefined;
}

function fillQualifiedName(name: ts.EntityName | ts.Expression, qualifiedName: string[]): boolean {
    if (isIdentifier(name)) {
        qualifiedName.push(name.text);
        return true;
    }
    else if (isQualifiedName(name)) {
        return fillQualifiedName(name.left, qualifiedName)
            && fillQualifiedName(name.right, qualifiedName);
    }
    else if (isPropertyAccessExpression(name)) {
        return fillQualifiedName(name.expression, qualifiedName)
            && fillQualifiedName(name.name, qualifiedName);
    }
    return false;
}


function resolveQualifiedNameParts(location: Node, qualifiedName: string[], meaning: SymbolFlags): Symbol {
    if (qualifiedName.length === 1) {
        return resolveName(location, qualifiedName[0], meaning);
    }

    let ns = resolveName(location, qualifiedName[0], SymbolFlags.Namespace);
    if (ns === undefined) {
        return undefined;
    }

    for (let i = 1; i < qualifiedName.length - 1; i++) {
        ns = getSymbol(ns.exports, qualifiedName[i], SymbolFlags.Namespace);
        if (ns === undefined) {
            return undefined;
        }
    }

    return getSymbol(ns.exports, qualifiedName[qualifiedName.length - 1], meaning);
}

export function getLiteralValue(location: Node, expr: ts.Expression): any {
    switch (expr.kind) {
        case SyntaxKind.TrueKeyword:
            return true;

        case SyntaxKind.FalseKeyword:
            return false;

        case SyntaxKind.NullKeyword:
            return null;

        case SyntaxKind.VoidExpression:
            return undefined;

        case SyntaxKind.StringLiteral:
            return (<ts.LiteralExpression>expr).text;

        case SyntaxKind.NoSubstitutionTemplateLiteral:
            return (<ts.LiteralExpression>expr).text;

        case SyntaxKind.NumericLiteral:
            return Number((<ts.LiteralExpression>expr).text);

        case SyntaxKind.PropertyAccessExpression:
            return getEnumLiteralValue(location, expr.getText());

        case SyntaxKind.ArrayLiteralExpression:
            return getArrayLiteralValue(location, <ts.ArrayLiteralExpression>expr);

        case SyntaxKind.ObjectLiteralExpression:
            return getObjectLiteralValue(location, <ts.ObjectLiteralExpression>expr);
    }
}

/**
 * Gets the value of the specified enum.
 * @param location The node at which to resolve the name.
 * @param name The name of the enum member.
 */
function getEnumLiteralValue(location: Node, name: string): EnumValue<number> {
    let qn = name.split(".");
    if (qn.length === 1) {
        return undefined;
    }

    let container = resolveQualifiedNameParts(location, qn.slice(0, qn.length - 1), SymbolFlags.Enum);
    if (!container) {
        return undefined;
    }

    let symbol = getSymbol(container.exports, qn[qn.length - 1], SymbolFlags.EnumMember);
    if (!symbol) {
        return undefined;
    }

    let value = checker.getConstantValue(<ts.EnumMember>symbol.declarations[0]);
    return { symbol, value };
}

function getArrayLiteralValue(location: Node, expr: ts.ArrayLiteralExpression) {
    let values: any[] = [];
    for (let element of expr.elements) {
        let value = getLiteralValue(location, element);
        values.push(value);
    }
    return values;
}

function getObjectLiteralValue(location: Node, expr: ts.ObjectLiteralExpression) {
    let obj: Map<any> = {};
    for (let element of expr.properties) {
        if (isPropertyAssignment(element)) {
            let name = element.name;
            if (isIdentifier(name)) {
                obj[name.text] = getLiteralValue(location, element.initializer);
            }
        }
    }
    return obj;
}

function formatTypeInfoKey(types: TypeInfo[]) {
    return types.map(type => type.id).join("-");
}

function recordSubTypeRelationship(subType: TypeInfo, superType: TypeInfo) {
    let subTypes = subTypeRelationships[superType.id] || (subTypeRelationships[superType.id] = []);
    subTypes.push(subType);
}

function recordAliasRelationship(aliasType: TypeInfo, aliasedType: TypeInfo) {
    let aliasTypes = aliasRelationships[aliasedType.id] || (aliasRelationships[aliasedType.id] = []);
    aliasTypes.push(aliasType);
}

function recordUnionRelationship(unionType: TypeInfo, constituentType: TypeInfo) {
    let unionTypes = unionRelationships[constituentType.id] || (unionRelationships[constituentType.id] = []);
    unionTypes.push(unionType);
}

export function annotation(name: string, options?: { inherited?: boolean; allowMultiple?: boolean; targets?: AnnotationTargets; }) {
    return function<T extends typeof Annotation>(constructor: T) {
        symbolToAnnotations.length = 0;
        let inherited = options && "inherited" in options ? options.inherited : false;
        let allowMultiple = options && "allowMultiple" in options ? options.allowMultiple : true;
        let targets = options && "targets" in options ? options.targets : AnnotationTargets.All;
        annotationConstructors[name] = { name, constructor, inherited, allowMultiple, targets };
        return constructor;
    }
}

function annotationMayBeInherited(annotation: Annotation) {
    let entry = getProperty(annotationConstructors, annotation.name);
    return entry ? entry.inherited : true;
}

function annotationAllowsMultiple(annotation: Annotation) {
    let entry = getProperty(annotationConstructors, annotation.name);
    return entry ? entry.allowMultiple : true;
}

export function getAnnotations(symbol: Symbol): Annotation[] {
    let annotations = symbolToAnnotations[getSymbolId(symbol)];
    if (annotations) {
        return annotations;
    }

    let seen: Map<boolean> = {};
    annotations = [];
    for (let decl of symbol.declarations) {
        let sourceFile = getSourceFileOfNode(decl);
        let leadingCommentRanges = ts.getLeadingCommentRanges(sourceFile.text, decl.pos);
        if (leadingCommentRanges) {
            for (let range of leadingCommentRanges) {
                parseAnnotations(decl, range, annotations, seen);
            }
        }
    }
    return symbolToAnnotations[getSymbolId(symbol)] = annotations;
}

export function findFirstAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => annotation is TAnnotation): TAnnotation;
export function findFirstAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation;
export function findFirstAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation {
    for (let annotation of getAnnotations(symbol)) {
        if (match(annotation)) {
            return <TAnnotation>annotation;
        }
    }
    return undefined;
}

export function findAllAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => annotation is TAnnotation): TAnnotation[];
export function findAllAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation[];
export function findAllAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation[] {
    let annotations: TAnnotation[];
    for (let annotation of getAnnotations(symbol)) {
        if (match(annotation)) {
            if (!annotations) {
                annotations = [];
            }
            annotations.push(<TAnnotation>annotation);
        }
    }
    return annotations || [];
}

function findFirstAnnotationOf<T extends Annotation>(info: Annotated, inherited: boolean, match: (annotation: Annotation) => annotation is T): T {
    for (let annotation of info.getAnnotations(inherited)) {
        if (match(annotation)) {
            return <T>annotation;
        }
    }
    return undefined;
}

function findAllAnnotationsOf<T extends Annotation>(info: Annotated, inherited: boolean, match: (annotation: Annotation) => annotation is T): T[] {
    let annotations: T[] = [];
    for (let annotation of info.getAnnotations(inherited)) {
        if (match(annotation)) {
            annotations.push(<T>annotation);
        }
    }
    return annotations;
}

function parseAnnotations(declaration: Node, range: ts.CommentRange, annotations: Annotation[], seen: Map<boolean>) {
    let sourceFile = getSourceFileOfNode(declaration);
    let text = sourceFile.text;
    let comment = text.substring(range.pos, range.end);
    let annotationMatch: RegExpExecArray;
    while (annotationMatch = annotationPattern.exec(comment)) {
        let pos = range.pos + annotationMatch.index;
        let annotation = parseAnnotation(declaration, annotationMatch[1], pos);
        if (annotation) {
            let entry = getProperty(annotationConstructors, annotation.name);
            if (entry && !entry.allowMultiple && hasProperty(seen, annotation.name)) {
                continue;
            }

            if (annotation) {
                annotations.push(annotation);
            }
        }
    }
}

function parseAnnotation(annotatedDeclaration: Node, annotationSource: string, annotationPos: number) {
    let evalSourceFile = ts.createSourceFile("eval.ts", annotationSource, ts.ScriptTarget.Latest, true);
    let statements = evalSourceFile.statements;
    if (statements.length === 0) {
        return undefined;
    }

    let stmt = statements[0];
    if (stmt.kind !== SyntaxKind.ExpressionStatement) {
        return undefined;
    }

    let expr = (<ts.ExpressionStatement>stmt).expression;
    if (isIdentifier(expr)) {
        return createAnnotation(annotatedDeclaration, expr.text, [], annotationPos);
    }
    else if (isCallExpression(expr)) {
        if (expr.expression.kind !== SyntaxKind.Identifier) {
            return undefined;
        }

        let _arguments: any[] = [];
        for (let argument of expr.arguments) {
            _arguments.push(getLiteralValue(annotatedDeclaration, argument));
        }

        return createAnnotation(annotatedDeclaration, (<ts.Identifier>expr.expression).text, _arguments, annotationPos);
    }
    else {
        return undefined;
    }
}

function syntaxKindToString(kind: SyntaxKind) {
    let syntaxKind = resolveQualifiedName("ts.SyntaxKind", SymbolFlags.Enum);
    let syntaxKindEnum = <ts.EnumDeclaration>syntaxKind.valueDeclaration;
    for (let symbol of getSymbols(syntaxKind.exports, SymbolFlags.EnumMember)) {
        if (checker.getConstantValue(<ts.EnumMember>symbol.valueDeclaration) === kind) {
            return symbol.name;
        }
    }
    return "";
}

function createAnnotation(annotatedDeclaration: Node, name: string, _arguments: any[], annotationPos: number): Annotation {
    let entry = getProperty(annotationConstructors, name);
    if (entry && !isValidAnnotationTarget(annotatedDeclaration, entry)) {
        let sourceFile = getSourceFileOfNode(annotatedDeclaration);
        let lineAndCharacter = ts.getLineAndCharacterOfPosition(sourceFile, annotationPos);
        let kindName = syntaxKindToString(annotatedDeclaration.kind);
        console.error(`${sourceFile.fileName}(${lineAndCharacter.line}, ${lineAndCharacter.character}): @${name} is not supported on a(n) ${kindName}.`);
        return undefined;
    }

    let annotation = entry ? new entry.constructor(_arguments) : new Annotation(_arguments);
    annotation.name = name;
    return annotation;
}

function isValidAnnotationTarget({ kind }: Node, { name, targets }: AnnotationConstructorEntry) {
    if (targets) {
        return (targets & AnnotationTargets.Class && kind === SyntaxKind.ClassDeclaration)
            || (targets & AnnotationTargets.Interface && kind === SyntaxKind.InterfaceDeclaration)
            || (targets & AnnotationTargets.TypeAlias && kind === SyntaxKind.TypeAliasDeclaration)
            || (targets & AnnotationTargets.Property && kind === SyntaxKind.PropertySignature);
    }

    return true;
}

function isTypeReferenceNode(node: Node): node is ts.TypeReferenceNode {
    return node ? node.kind === SyntaxKind.TypeReference : false;
}

function isUnionTypeNode(node: Node): node is ts.UnionTypeNode {
    return node ? node.kind === SyntaxKind.UnionType : false;
}

function isArrayTypeNode(node: Node): node is ts.ArrayTypeNode {
    return node ? node.kind === SyntaxKind.ArrayType : false;
}

function isInterfaceDeclaration(node: Node): node is ts.InterfaceDeclaration {
    return node ? node.kind === SyntaxKind.InterfaceDeclaration : false;
}

function isTypeAliasDeclaration(node: Node): node is ts.TypeAliasDeclaration {
    return node ? node.kind === SyntaxKind.TypeAliasDeclaration : false;
}

function isTypeParameterDeclaration(node: Node): node is ts.TypeParameterDeclaration {
    return node ? node.kind === SyntaxKind.TypeParameter : false;
}

function isExpressionWithTypeArguments(node: Node): node is ts.ExpressionWithTypeArguments {
    return node ? node.kind === SyntaxKind.ExpressionWithTypeArguments : false;
}

function isPropertySignature(node: Node): node is ts.PropertyDeclaration {
    return node && node.kind === SyntaxKind.PropertySignature;
}

function isPropertyAssignment(node: Node): node is ts.PropertyAssignment {
    return node && node.kind === SyntaxKind.PropertyAssignment;
}

function isIdentifier(node: Node): node is ts.Identifier {
    return node && node.kind === SyntaxKind.Identifier;
}

function isCallExpression(node: Node): node is ts.CallExpression {
    return node && node.kind === SyntaxKind.CallExpression;
}

function isQualifiedName(node: Node): node is ts.QualifiedName {
    return node && node.kind === SyntaxKind.QualifiedName;
}

function isPropertyAccessExpression(node: Node): node is ts.PropertyAccessExpression {
    return node && node.kind === SyntaxKind.PropertyAccessExpression;
}

function getSourceFileOfNode(node: Node): ts.SourceFile {
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    }
    return <ts.SourceFile>node;
}