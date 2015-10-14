import { SyntaxKind, Symbol, SymbolFlags, Map, } from "./typescript-internal";
import { hasProperty, getProperty } from "./utilities";
import { getType, getTypes, makeArrayType, resolveQualifiedName, annotation, EnumValue, Annotation, TypeInfo, PropertyInfo } from "./types";

export interface DiscoveryResult {
    createableNodes: SyntaxNode[];
    updateableNodes: SyntaxNode[];
    testableNodes: SyntaxNode[];
    testableTypes: SyntaxType[];
}

export interface SyntaxType {
    type: TypeInfo;
    typeName: string;
    superTypes: SyntaxType[];
    directSyntaxNodes: SyntaxNode[];
    syntaxNodes?: SyntaxNode[];
    testFunctionName?: string;
}

export interface SyntaxNode {
    kind: SyntaxKind;
    kindName: string;
    typeName: string;
    createFunctionName: string;
    createParameters: SyntaxMember[];
    updateFunctionName: string;
    updateParameters: SyntaxMember[];
    testFunctionName: string;
}

export interface SyntaxMember {
    propertyName?: string;
    parameterName?: string;
    parameterTypeName: string;
    isFactoryParameter?: boolean;
    isNodeArray?: boolean;
    isModifiersArray?: boolean;
    testFunctionName?: string;
    visitorFunctionName?: string;
}

/**
  * Discovers type information and symbols for various SyntaxNodes
  */
export function discover(): DiscoveryResult {
    const typesReferencedByProperties: boolean[] = [];
    const syntaxTypeForTypeInfo: SyntaxType[] = [];
    const createableNodes: SyntaxNode[] = [];
    const updateableNodes: SyntaxNode[] = [];
    const testableNodes: SyntaxNode[] = [];
    const syntaxTypes: SyntaxType[] = [];
    const testableTypes: SyntaxType[] = [];
    const localNames: Map<string> = {};

    let types = getTypes("ts");
    let nodeType = getType("ts.Node");
    let modifierType = getType("ts.Modifier");
    let statementType = getType("ts.Statement");
    let conciseBodyType = getType("ts.ConciseBody");
    let functionBodyType = getType("ts.FunctionBody");
    let moduleBodyType = getType("ts.ModuleBody");
    let sourceFileType = getType("ts.SourceFile");
    let nodeArrayType = getType("ts.NodeArray");
    let modifiersArrayType = getType("ts.ModifiersArray");

    for (let type of types) {
        discoverType(type);
    }

    for (let type of syntaxTypes) {
        discoverTestableType(type);
    }

    createableNodes.sort((a, b) => a.kind - b.kind);
    updateableNodes.sort((a, b) => a.kind - b.kind);
    testableNodes.sort((a, b) => a.kind - b.kind);
    testableTypes.sort((a, b) => a.toString().localeCompare(b.toString()));

    return { createableNodes, updateableNodes, testableNodes, testableTypes };

    function discoverType(type: TypeInfo) {
        let syntaxType = syntaxTypeForTypeInfo[type.id];
        if (!syntaxType) {
            if (nodeType.isAssignableFrom(type)) {
                let superTypes: SyntaxType[] = [];
                let directSyntaxNodes: SyntaxNode[] = [];
                let typeName = type.toString();

                syntaxType = {
                    type,
                    typeName,
                    superTypes,
                    directSyntaxNodes
                };

                syntaxTypes.push(syntaxType);
                syntaxTypeForTypeInfo[type.id] = syntaxType;

                for (let superType of type.getSuperTypes()) {
                    let superSyntaxType = discoverType(superType);
                    if (superSyntaxType) {
                        superTypes.push(superSyntaxType);
                    }
                }

                for (let kind of type.findAllAnnotations(/*inherited*/ false, KindAnnotation.match)) {
                    directSyntaxNodes.push(discoverKind(type, kind));
                }
            }
        }
        return syntaxType;
    }

    function discoverKind(type: TypeInfo, kind: KindAnnotation) {
        let kindName = kind.kindSymbol.name;
        let typeName = type.toString();
        let createFunctionName = discoverFunctionName(kindName, "create", kind.create);
        let createParameters: SyntaxMember[] = createFunctionName ? [] : undefined;
        let updateFunctionName = discoverFunctionName(kindName, "update", kind.update);
        let updateParameters: SyntaxMember[] = updateFunctionName ? [] : undefined;
        let testFunctionName = discoverFunctionName(kindName, "is", kind.test);
        if (type.name === "StringLiteral") {
            debugger;
        }
        for (let property of type.getProperties(/*inherited*/ true)) {
            if (FactoryHiddenAnnotation.getState(type, property.name) === FactoryHiddenState.Hidden) {
                continue;
            }

            let isFactoryParameter = property.findFirstAnnotation(/*inherited*/ true, FactoryParamAnnotation.match) !== undefined;
            let isNode = nodeType.isAssignableFrom(property.propertyType);
            let isModifiersArray = modifiersArrayType.isAssignableFrom(property.propertyType);
            let isNodeArray = !isModifiersArray && nodeArrayType.isAssignableFrom(property.propertyType);
            if (isFactoryParameter || isNode || isNodeArray || isModifiersArray) {
                let propertyName = property.name;
                let parameterName = property.name === "arguments" ? "_arguments" : property.name;
                let parameterType: TypeInfo;
                let nodeType: TypeInfo;
                if (isModifiersArray) {
                    nodeType = modifierType;
                    parameterType = makeArrayType(nodeType);
                }
                else if (isNodeArray) {
                    nodeType = property.propertyType.getGenericTypeArguments()[0];
                    parameterType = makeArrayType(nodeType);
                }
                else if (isNode) {
                    nodeType = property.propertyType;
                    parameterType = nodeType;
                }
                else {
                    parameterType = property.propertyType;
                }

                if (nodeType) {
                    typesReferencedByProperties[nodeType.id] = true;
                    discoverType(nodeType);
                }

                let parameterTypeName = parameterType.toString();
                let testFunctionName: string;
                let visitorFunctionName: string;
                if (!isFactoryParameter) {
                    switch (property.propertyType) {
                        case nodeType: break;
                        case statementType: visitorFunctionName = "transformer.visitStatement"; break;
                        case conciseBodyType: visitorFunctionName = "transformer.visitConciseBody"; break;
                        case functionBodyType: visitorFunctionName = "transformer.visitFunctionBody"; break;
                        case moduleBodyType: visitorFunctionName = "transformer.visitModuleBody"; break;
                        case sourceFileType: visitorFunctionName = "transformer.visitSourceFile"; break;
                        default:
                            if (isModifiersArray || isNodeArray) {
                                visitorFunctionName = "transformer.visitNodes";
                                visitorFunctionName = "transformer.visitNodes";
                            }
                            else if (isNode) {
                                visitorFunctionName = "transformer.visitNode";
                            }

                            if (isModifiersArray) {
                                testFunctionName = "isModifier";
                            }
                            else if (isNodeArray || isNode) {
                                testFunctionName = getIsAnyNodeFunctionName(nodeType);
                            }
                            break;
                    }
                }

                let syntaxMember = {
                    propertyName,
                    parameterName,
                    parameterTypeName,
                    isFactoryParameter,
                    isNodeArray,
                    isModifiersArray,
                    testFunctionName,
                    visitorFunctionName
                };

                if (createFunctionName) {
                    createParameters.push(syntaxMember);
                }

                if (updateFunctionName && !isFactoryParameter) {
                    updateParameters.push(syntaxMember);
                }
            }
        }

        let factoryOrder = type.findFirstAnnotation(/*inherited*/ true, FactoryOrderAnnotation.match);
        if (factoryOrder) {
            if (createFunctionName) {
                createParameters = sortMembers(createParameters, factoryOrder.propertyNames);
            }

            if (updateFunctionName) {
                updateParameters = sortMembers(updateParameters, factoryOrder.propertyNames);
            }
        }

        let syntaxNode = {
            kind: kind.kind,
            kindName,
            typeName,
            createFunctionName,
            createParameters,
            updateFunctionName,
            updateParameters,
            testFunctionName
        };

        if (createFunctionName) {
            createableNodes.push(syntaxNode);
            localNames[createFunctionName] = createFunctionName;
        }

        if (updateFunctionName && updateParameters.length > 0) {
            updateableNodes.push(syntaxNode);
            localNames[updateFunctionName] = updateFunctionName;
        }

        if (testFunctionName) {
            testableNodes.push(syntaxNode);
            localNames[testFunctionName] = testFunctionName;
        }

        return syntaxNode;
    }

    function sortMembers(members: SyntaxMember[], order: string[]) {
        let indices = members.map((_, i) => i);
        indices.sort((a, b) => {
            let aOverride = order.indexOf(members[a].propertyName);
            let bOverride = order.indexOf(members[b].propertyName);
            if (aOverride >= 0) {
                if (bOverride >= 0) {
                    return aOverride - bOverride;
                }

                return -1;
            }
            else if (bOverride >= 0) {
                return +1;
            }

            return a - b;
        });

        return indices.map(i => members[i]);
    }

    function discoverFunctionName(kindName: string, prefix: string, option: boolean | string) {
        if (typeof option === "string") {
            return option;
        }
        else if (option) {
            let functionName = prefix + kindName;
            if (!hasProperty(localNames, functionName)) {
                let symbol = resolveQualifiedName("ts." + functionName, SymbolFlags.Function);
                if (!symbol) {
                    return functionName;
                }
            }
        }

        return undefined;
    }

    function getIsAnyNodeFunctionName(type: TypeInfo) {
        if (type !== nodeType) {
            let functionName: string;
            let nodeTest = type.findFirstAnnotation(/*inherited*/ false, NodeTestAnnotation.match);
            if (nodeTest) {
                return nodeTest.functionName;
            }
            else if (type.isTypeAlias || type.isInterface) {
                return "is" + getKindOrTypeNameForType(type);
            }
            else if (type.isUnionType) {
                return "is" + type.getConstituentTypes().map(getKindOrTypeNameForType).join("Or");
            }
        }
        return undefined;
    }

    function discoverTestableType(syntaxType: SyntaxType) {
        if (syntaxType.type !== nodeType && !syntaxType.syntaxNodes) {
            syntaxType.syntaxNodes = [];

            let includeAliasAndUnionConstituents = !syntaxType.type.findFirstAnnotation(/*inherited*/ false, KindAnnotation.match);

            discoverSyntaxNodes(syntaxType.type, syntaxType.syntaxNodes, [], includeAliasAndUnionConstituents);
            if (syntaxType.syntaxNodes.length > 0) {
                let testFunctionName = discoverIsAnyNodeFunctionName(syntaxType.type);
                if (testFunctionName) {
                    syntaxType.testFunctionName = testFunctionName;
                    testableTypes.push(syntaxType);
                }
            }
        }
    }

    function discoverSyntaxNodes(type: TypeInfo, syntaxNodes: SyntaxNode[], seen: boolean[], includeAliasAndUnionConstituents?: boolean) {
        copySyntaxNodes(type, syntaxNodes, seen);

        for (let aliasType of type.getAliases()) {
            copySyntaxNodes(aliasType, syntaxNodes, seen);
        }

        if (type.isInterface) {
            for (let subType of type.getSubTypes()) {
                discoverSyntaxNodes(subType, syntaxNodes, seen);
            }
        }

        if (includeAliasAndUnionConstituents) {
            if (type.isTypeAlias) {
                discoverSyntaxNodes(type.getAliasedType(), syntaxNodes, seen);
            }

            if (type.isUnionType) {
                for (let constituentType of type.getConstituentTypes()) {
                    discoverSyntaxNodes(constituentType, syntaxNodes, seen);
                }
            }
        }
    }

    function copySyntaxNodes(type: TypeInfo, syntaxNodes: SyntaxNode[], seen: boolean[]) {
        let syntaxType = syntaxTypeForTypeInfo[type.id];
        if (syntaxType) {
            for (let syntaxNode of syntaxType.directSyntaxNodes) {
                if (!seen[syntaxNode.kind]) {
                    seen[syntaxNode.kind] = true;
                    syntaxNodes.push(syntaxNode);
                }
            }
        }
    }

    function discoverIsAnyNodeFunctionName(type: TypeInfo) {
        if (typesReferencedByProperties[type.id]) {
            let functionName = getIsAnyNodeFunctionName(type);
            if (functionName && !hasProperty(localNames, functionName)) {
                let symbol = resolveQualifiedName("ts." + functionName, SymbolFlags.Function);
                if (!symbol) {
                    localNames[functionName] = functionName;
                    return functionName;
                }
            }
        }
        return undefined;
    }

    function getKindOrTypeNameForType(type: TypeInfo) {
        let kinds = type.findAllAnnotations(/*inherited*/ false, KindAnnotation.match);
        if (kinds.length === 1) {
            return kinds[0].kindSymbol.name;
        }

        return type.name;
    }
}

export interface KindOptions {
    create: boolean | string;
    update: boolean | string;
    test: boolean | string;
}

@annotation("kind", { inherited: false })
export class KindAnnotation extends Annotation {
    public kind: SyntaxKind;
    public kindSymbol: Symbol;
    public create: boolean | string;
    public update: boolean | string;
    public test: boolean | string;

    constructor([{ value, symbol }, { create = true, update = true, test = true } = <KindOptions>{}, ..._arguments]: [EnumValue<SyntaxKind>, KindOptions, any]) {
        super(_arguments);
        this.kind = value;
        this.kindSymbol = symbol;
        this.create = create;
        this.update = update;
        this.test = test;
    }

    public static match(annotation: Annotation): annotation is KindAnnotation {
        return annotation instanceof KindAnnotation;
    }
}

export const enum FactoryHiddenState {
    None,
    Hidden,
    Visible
}

@annotation("factoryhidden", { inherited: true, allowMultiple: true })
export class FactoryHiddenAnnotation extends Annotation {
    public propertyName: string;
    public hidden: boolean;
    constructor([ propertyName, hidden, ..._arguments]: [string | boolean, boolean, any]) {
        super(_arguments);
        if (typeof propertyName === "boolean") {
            this.hidden = propertyName;
        }
        else if (typeof propertyName === "string") {
            this.propertyName = propertyName;
            if (typeof hidden === "boolean") {
                this.hidden = hidden;
            }
            else {
                this.hidden = true;
            }
        }
        else {
            this.hidden = true;
        }
    }

    public static getState(type: TypeInfo, propertyName?: string) {
        if (propertyName) {
            return this.getStateForProperty(type, propertyName);
        }
        else {
            return this.getStateForType(type);
        }
    }

    private static getStateForProperty(type: TypeInfo, propertyName: string) {
        let factoryHiddenState = FactoryHiddenState.None;
        let inheritedTypes: TypeInfo[] = [type];
        while (factoryHiddenState === FactoryHiddenState.None && inheritedTypes.length) {
            [factoryHiddenState, inheritedTypes] = this.getStateForPropertyBreadthFirst(inheritedTypes, propertyName);
        }
        return factoryHiddenState;
    }

    private static getStateForPropertyBreadthFirst(types: TypeInfo[], propertyName: string): [FactoryHiddenState, TypeInfo[]] {
        let inheritedTypes: TypeInfo[] = [];
        let factoryHidden: FactoryHiddenAnnotation;
        let factoryHiddenState: FactoryHiddenState = FactoryHiddenState.None;
        for (let type of types) {
            let property = type.getProperty(propertyName, /*inherited*/ false);
            if (property) {
                if (factoryHidden = property.findFirstAnnotation(/*inherited*/ false, FactoryHiddenAnnotation.match)) {
                    factoryHiddenState = factoryHidden.hidden ? FactoryHiddenState.Hidden : FactoryHiddenState.Visible;
                    break;
                }
            }

            if (factoryHidden = type.findFirstAnnotation(/*inherited*/ false, FactoryHiddenAnnotation.matchProperty(propertyName))) {
                factoryHiddenState = factoryHidden.hidden ? FactoryHiddenState.Hidden : FactoryHiddenState.Visible;
                break;
            }

            if (property) {
                factoryHiddenState = FactoryHiddenState.Visible;
                break;
            }

            if (type.isInterface) {
                inheritedTypes = inheritedTypes.concat(type.getSuperTypes());
            }
            else if (type.isTypeAlias) {
                inheritedTypes.push(type.getAliasedType());
            }
            else if (type.isUnionType) {
                inheritedTypes = inheritedTypes.concat(type.getConstituentTypes());
            }
        }

        return [factoryHiddenState, inheritedTypes];
    }

    private static getStateForType(type: TypeInfo) {
        let annotation = type.findFirstAnnotation(/*inherited*/ false, this.matchProperty(undefined));
        return annotation ? annotation.hidden ? FactoryHiddenState.Hidden : FactoryHiddenState.Visible : FactoryHiddenState.None;
    }

    public static matchProperty(propertyName: string): (annotation: Annotation) => annotation is FactoryHiddenAnnotation {
        return (annotation): annotation is FactoryHiddenAnnotation => this.match(annotation) && annotation.propertyName === propertyName;
    }

    public static match(annotation: Annotation): annotation is FactoryHiddenAnnotation {
        return annotation instanceof FactoryHiddenAnnotation;
    }
}

@annotation("factoryorder", { inherited: true })
export class FactoryOrderAnnotation extends Annotation {
    public propertyNames: string[];
    constructor(propertyNames: string[]) {
        super([]);
        this.propertyNames = propertyNames;
    }

    public static match(annotation: Annotation): annotation is FactoryOrderAnnotation {
        return annotation instanceof FactoryOrderAnnotation;
    }
}

@annotation("factoryparam", { inherited: true, allowMultiple: true })
export class FactoryParamAnnotation extends Annotation {
    public propertyName: string;
    constructor([propertyName, ..._arguments]: [string, any]) {
        super(_arguments);
        this.propertyName = propertyName;
    }

    public static matchProperty(propertyName: string): (annotation: Annotation) => annotation is FactoryParamAnnotation {
        return (annotation): annotation is FactoryParamAnnotation => this.match(annotation) && annotation.propertyName === propertyName;
    }

    public static match(annotation: Annotation): annotation is FactoryParamAnnotation {
        return annotation instanceof FactoryParamAnnotation;
    }
}

@annotation("nodetest", { inherited: false, allowMultiple: false })
export class NodeTestAnnotation extends Annotation {
    public functionName: string;
    constructor([functionName, ..._arguments]: [string, any]) {
        super(_arguments);
        this.functionName = functionName
    }

    public static match(annotation: Annotation): annotation is NodeTestAnnotation {
        return annotation instanceof NodeTestAnnotation;
    }
}