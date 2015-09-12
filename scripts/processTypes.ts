import { 
    sys, 
    getDefaultCompilerOptions, 
    createProgram, 
    createCompilerHost, 
    forEachChild, 
    getLeadingCommentRanges,
    computeLineStarts,
    createTextWriter,
    combinePaths,
    getNodeId,
    getSymbolId,
    getProperty,
    hasProperty,
    createSourceFile,
    map,
    SyntaxKind,
    CompilerOptions,
    CompilerHost,
    Program,
    TypeChecker,
    CommentRange,
    EmitTextWriter,
    Node,
    SourceFile,
    Declaration,
    ModuleDeclaration,
    ModuleBlock,
    InterfaceDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    EnumMember,
    PropertyDeclaration,
    TypeNode,
    TypeReferenceNode,
    UnionTypeNode,
    ExpressionWithTypeArguments,
    ExpressionStatement,
    Expression,
    CallExpression,
    PropertyAccessExpression,
    ObjectLiteralExpression,
    ArrayLiteralExpression,
    PropertyAssignment,
    LiteralExpression,
    Identifier,
    SymbolFlags,
    Symbol,
    SymbolTable,
    TypeFlags,
    Type,
    TypeReference,
    InterfaceType,
    Map,
} from "./typescript-internal";

interface SyntaxNode {
    kind?: SyntaxKind;
    kindName?: string;
    typeName?: string;
    members?: SyntaxMember[];
    options?: KindOptions;
}

interface SyntaxMember {
    paramName?: string;
    propertyName?: string;
    typeName?: string;
    elementTypeName?: string;
    visitorFunction?: string;
    isFactoryParam?: boolean;
    isNode?: boolean;
    isNodeArray?: boolean;
    isModifiersArray?: boolean;
    startsNewLexicalEnvironment?: boolean;
}

interface EnumValue<T extends number> {
    symbol: Symbol;
    value: T;
}

const enum FactoryHiddenState {
    None,
    Hidden,
    Visible
}

interface KindOptions {
    create: boolean;
    update: boolean;
    test: boolean;
}

const columnWrap = 150;
const emptyArray: any[] = [];
const annotationPattern = /@(\w+\s*[^\r\n]*)/g;

let options: CompilerOptions;
let host: CompilerHost;
let program: Program;
let checker: TypeChecker;
let typesSourceFile: SourceFile;
let factorySourceFile: SourceFile;
let transformSourceFile: SourceFile;
let utilitiesSourceFile: SourceFile;
let tsModuleSymbol: Symbol;
let nodeSymbol: Symbol;
let nodeArraySymbol: Symbol;
let modifiersArraySymbol: Symbol;
let syntaxKindSymbol: Symbol;
let syntaxNodes: SyntaxNode[] = [];

let annotationConstructors: Map<typeof Annotation> = {};

/**
  * A one-to-many map of one Symbol to the many Annotations that are attached to its declarations.
  */
let symbolToAnnotations: Annotation[][] = [];

/**
  * A one-to-many map of one node type Symbol to the many SyntaxKind Symbols it directly describes.
  */
let typeToSyntaxKinds: Symbol[][] = [];

/**
  * A one-to-one map of one SyntaxKind Symbol to the one node type Symbol that directly describes it.
  */
let syntaxKindToType: Symbol[] = [];

let syntaxKindToSyntaxNode: SyntaxNode[] = [];

let nodeArrayTypeUsages: Map<boolean> = {};

let superTypeSymbolsForTypeSymbol: Symbol[][] = [];
let ancestorTypeSymbolsForTypeSymbol: Symbol[][] = [];
let descendantTypeSymbolsForTypeSymbol: Symbol[][] = [];
let descendantSyntaxKindSymbolsForTypeSymbol: Symbol[][] = [];
let typeSymbolsById: Symbol[] = [];

let syntaxKindTypeUsages: Map<Symbol[]> = {};
let memberTypeUsages: Map<boolean> = {};
let memberTypeUsageRedirects: Map<string> = {};

function main() {
    if (sys.args.length < 3) {
        sys.write("Usage:" + sys.newLine)
        sys.write("\tnode processTypes.js <types-ts-input-file> <factory-ts-input-file> <transform-ts-input-file> <utilities-ts-input-file>" + sys.newLine);
        return;
    }
    
    options = getCompilerOptions();
    host = createCompilerHost(options);
    
    let typesTsFileName = host.getCanonicalFileName(sys.resolvePath(sys.args[0]));
    let factoryTsFileName = host.getCanonicalFileName(sys.resolvePath(sys.args[1]));
    let transformTsFileName = host.getCanonicalFileName(sys.resolvePath(sys.args[2]));
    let utilitiesTsFileName = host.getCanonicalFileName(sys.resolvePath(sys.args[3]));
    program = createProgram([typesTsFileName, factoryTsFileName, transformTsFileName, utilitiesTsFileName], options, host);
    checker = program.getTypeChecker();

    typesSourceFile = program.getSourceFile(typesTsFileName);
    factorySourceFile = program.getSourceFile(factoryTsFileName);
    transformSourceFile = program.getSourceFile(transformTsFileName);
    utilitiesSourceFile = program.getSourceFile(utilitiesTsFileName);
    
    // Resolve common symbols
    tsModuleSymbol = resolveQualifiedName(typesSourceFile, "ts", SymbolFlags.Module);
    nodeSymbol = resolveQualifiedName(typesSourceFile, "ts.Node", SymbolFlags.Type);
    nodeArraySymbol = resolveQualifiedName(typesSourceFile, "ts.NodeArray", SymbolFlags.Type);
    modifiersArraySymbol = resolveQualifiedName(typesSourceFile, "ts.ModifiersArray", SymbolFlags.Type);
    syntaxKindSymbol = resolveQualifiedName(typesSourceFile, "ts.SyntaxKind", SymbolFlags.Enum);

    discover();
    
    let factoryDirectory = sys.resolvePath(combinePaths(factoryTsFileName, ".."));
    let factoryOutputFile = combinePaths(factoryDirectory, "factory.generated.ts");
    generateFactory(factoryOutputFile);
    
    let transformDirectory = sys.resolvePath(combinePaths(transformTsFileName, ".."));
    let transformOutputFile = combinePaths(transformDirectory, "transform.generated.ts");
    generateTransform(transformOutputFile);
}

/**
  * Discovers type information and symbols for various SyntaxNodes
  */
function discover() {
    
    // Discover each interface and type alias
    let typeSymbols = getSymbols(tsModuleSymbol.exports, SymbolFlags.Interface | SymbolFlags.TypeAlias);
    for (let typeSymbol of typeSymbols) {
        let kindAnnotations = findAllAnnotations<KindAnnotation>(typeSymbol, KindAnnotation.match);
        if (kindAnnotations.length) {
            discoverSyntaxNodes(typeSymbol, kindAnnotations);
        }
    }
    
    // Sort the syntax nodes by SyntaxKind
    syntaxNodes.sort((a, b) => {
        return a.kind - b.kind;
    });
    
    // Set up member type usage redirects for types with a single kind
    for (let typeName in syntaxKindTypeUsages) {
        if (syntaxKindTypeUsages[typeName].length === 1) {
            memberTypeUsageRedirects[typeName] = syntaxKindTypeUsages[typeName][0].name;
        }
    }
    
    function discoverTypeHierarchy(typeSymbol: Symbol) {
        discoverTypeHierarchyWorker(typeSymbol, /*ancestorOrSelfTypeSymbol*/ typeSymbol);
    }
    
    function discoverTypeHierarchyWorker(typeSymbol: Symbol, ancestorOrSelfTypeSymbol: Symbol) {
        let superTypeSymbols = getSuperTypeSymbols(ancestorOrSelfTypeSymbol);
        for (let ancestorTypeSymbol of superTypeSymbols) {
            let descendantTypeSymbols = descendantTypeSymbolsForTypeSymbol[getSymbolId(ancestorTypeSymbol)];
            if (!descendantTypeSymbols) {
                descendantTypeSymbols = descendantTypeSymbolsForTypeSymbol[getSymbolId(ancestorTypeSymbol)] = [];
                discoverTypeHierarchyWorker(ancestorTypeSymbol, /*ancestorOrSelfTypeSymbol*/ ancestorTypeSymbol);
            }
            if (descendantTypeSymbols.indexOf(typeSymbol) === -1) {
                descendantTypeSymbols.push(typeSymbol);
            }
        }
    }
    
    /**
      * Discovers syntax nodes associated with a type and one or more syntax kinds.
      */
    function discoverSyntaxNodes(typeSymbol: Symbol, kindAnnotations: KindAnnotation[]) {
        // Skip this node if it is marked with @factoryhidden(true)
        if (getFactoryHiddenStateForSymbol(typeSymbol) === FactoryHiddenState.Hidden) {
            return;
        }
        
        getSuperTypeSymbols(typeSymbol, /*flattenHierarchy*/ true);
        
        let symbolOrder: string[];
        for (let kindAnnotation of kindAnnotations) {
            let kind = kindAnnotation.kind;
            let kindSymbol = kindAnnotation.kindSymbol;
            let type = checker.getDeclaredTypeOfSymbol(typeSymbol);
            
            recordTypeToSyntaxKindRelationships(typeSymbol, kindSymbol);
            
            // Discover the members of the node type
            var members: SyntaxMember[] = [];
            for (let property of checker.getPropertiesOfType(type)) {
                // Skip any hidden properties
                if (getFactoryHiddenStateForProperty(typeSymbol, property.name) === FactoryHiddenState.Hidden) {
                    continue;
                }
                
                let visitorAnnotation = findFirstAnnotation<MemberVisitorAnnotation>(property, MemberVisitorAnnotation.match);
                let visitorFunction = visitorAnnotation ? visitorAnnotation.functionName : undefined;
                
                // Collect information about the type
                let typeNode = getTypeNodeForProperty(property);
                let propertyIsFactoryParam = isFactoryParamProperty(typeSymbol, property.name);
                let propertyIsNode = typeNode && isSubtypeOf(typeNode, nodeSymbol);
                let propertyIsNodeArray = typeNode && isNodeArray(typeNode);
                let propertyIsModifiersArray = typeNode && isModifiersArray(typeNode);
                if (propertyIsFactoryParam || propertyIsNodeArray || propertyIsModifiersArray || propertyIsNode) {
                    let typeName = typeNode ? normalizeTypeName(typeNode.getText()) : "any";
                    let elementTypeName = 
                        propertyIsNodeArray ? normalizeTypeName((<TypeReferenceNode>typeNode).typeArguments[0].getText()) : 
                        propertyIsModifiersArray ? "Modifier" :
                        undefined; 
                    
                    let propertyStartsNewLexicalEnvironment = propertyIsNode && startsNewLexicalEnvironment(property);
                
                    members.push({
                        propertyName: property.name,
                        paramName: property.name === "arguments" ? "_arguments" : property.name,
                        typeName: typeName,
                        elementTypeName: elementTypeName,
                        visitorFunction: visitorFunction,
                        isFactoryParam: propertyIsFactoryParam,
                        isNodeArray: propertyIsNodeArray,
                        isModifiersArray: propertyIsModifiersArray,
                        isNode: propertyIsNode,
                        startsNewLexicalEnvironment: propertyStartsNewLexicalEnvironment
                    });

                    if (!propertyIsFactoryParam) {
                        let typeNames = splitTypeName(propertyIsNode ? typeName : elementTypeName);
                        for (let typeName of typeNames) {
                            let typeSymbol = getSymbol(tsModuleSymbol.exports, typeName, SymbolFlags.Type);
                            if (typeSymbol) {
                                getSuperTypeSymbols(typeSymbol, /*flattenHierarchy*/ true);
                            }
                        }
                        
                        recordTypeUsageForMember(propertyIsNode ? typeName : elementTypeName);
                    }
                    
                    if (elementTypeName) {
                        nodeArrayTypeUsages[elementTypeName] = true;
                    }
                }
            }
            
            // Sort the members of the type in the correct order for create and update methods
            let kindOrder = getFactoryOrder(kindSymbol, /*inherited*/ false);
            var overrides = kindOrder || symbolOrder || (symbolOrder = getFactoryOrder(typeSymbol, /*inherited*/ true));
            if (overrides) {
                let indices = members.map((_, i) => i);
                indices.sort((a, b) => {
                    let aOverride = overrides.indexOf(members[a].propertyName);
                    let bOverride = overrides.indexOf(members[b].propertyName);
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
                
                members = indices.map(i => members[i]);
            }
            
            // Add the syntax node
            let syntaxNode: SyntaxNode = { 
                kind,
                kindName: kindSymbol.name,
                typeName: typeSymbol.name,
                members,
                options: kindAnnotation.options
            };
            
            syntaxNodes.push(syntaxNode);
            syntaxKindToSyntaxNode[getSymbolId(kindSymbol)] = syntaxNode; 
        }
    }

    /**
      * Records the various relationships between a node type Symbol and a SyntaxKind symbol.
      */
    function recordTypeToSyntaxKindRelationships(typeSymbol: Symbol, kindSymbol: Symbol): void {
        // Add the SyntaxKind Symbol to the set of SyntaxKind Symbols for the node type Symbol.
        // NOTE: This could also be retrieved by reading its @kind annotations.
        let syntaxKindsForType = getSyntaxKindSymbolsForTypeSymbol(typeSymbol, /*ensureExists*/ true);
        if (syntaxKindsForType.indexOf(kindSymbol) === -1) {
            syntaxKindsForType.push(kindSymbol);
        }
        
        // Set the node type Symbol for this SyntaxKind Symbol
        syntaxKindToType[getSymbolId(kindSymbol)] = typeSymbol;
        
        // Record the supertypes associated with this SyntaxKind Symbol
        recordTypeUsagesForKind(kindSymbol, typeSymbol);
    }
    
    function recordTypeUsagesForKind(kindSymbol: Symbol, typeSymbol: Symbol) {
        //memberTypeUsages[kindSymbol.name] = false;
        recordTypeUsagesForKindWorker(kindSymbol, typeSymbol);
    }
    
    function recordTypeUsagesForKindWorker(kindSymbol: Symbol, typeSymbol: Symbol) {
        let usages = syntaxKindTypeUsages[typeSymbol.name];
        if (!usages) {
            syntaxKindTypeUsages[typeSymbol.name] = usages = [];
        }
        
        if (usages.indexOf(kindSymbol) === -1) {
            usages.push(kindSymbol);
        }
        
        for (let superType of getSuperTypeSymbols(typeSymbol)) {
            recordTypeUsagesForKindWorker(kindSymbol, superType);
        }
    }
    
    function recordTypeUsageForMember(typeName: string) {
        if (!hasProperty(memberTypeUsages, typeName)) {
            memberTypeUsages[typeName] = true;
        }
    }
    
    function normalizeTypeName(typeName: string) {
        let parts = typeName.split(/\s*\|\s*/g);
        if (parts.length === 0) {
            return parts[0];
        }
        
        parts.sort();
        return parts.join(" | ");
    }
    
    function getTypeNodeForProperty(property: Symbol) {
        return (<PropertyDeclaration>property.declarations[0]).type;
    }
}

function generateFactory(outputFile: string) {
    let writer = createLineWrappingTextWriter(host.getNewLine(), columnWrap);
    writer.write(`// <auto-generated />`);
    writer.writeLine();
    writer.write(`/// <reference path="factory.ts" />`);
    writer.writeLine();
    writer.write(`namespace ts {`);
    writer.writeLine();
    writer.increaseIndent();
    writer.write(`export namespace factory {`);
    writer.writeLine();
    writer.increaseIndent();
    writeCreateAndUpdateFunctions();
    writeCloneFunction();
    writer.decreaseIndent();
    writer.write(`}`);
    writer.writeLine();
    writeIsNodeFunctions();
    writer.decreaseIndent();
    writer.write(`}`);
    writer.writeLine();
    
    sys.writeFile(outputFile, writer.getText());

    function writeCreateAndUpdateFunctions() {
        for (let syntaxNode of syntaxNodes) {
            writeCreateFunction(syntaxNode);
            writeUpdateFunction(syntaxNode);
        }
    }
    
    function writeIsNodeFunctions() {
        for (let syntaxNode of syntaxNodes) {
            writeIsNodeFunction(syntaxNode);
        }
        
        for (let typeName in memberTypeUsages) {
            if (getProperty(memberTypeUsages, typeName) && !hasProperty(memberTypeUsageRedirects, typeName)) {
                writeIsAnyNodeFunction(typeName);
            }
        }
    }
    
    function writeCreateFunction(syntaxNode: SyntaxNode) {
        if (!syntaxNode.options.create) {
            return;
        }

        // Skip the create function for this node if it is already defined in factory.ts
        if (resolveQualifiedName(factorySourceFile, `ts.factory.create${syntaxNode.kindName}`, SymbolFlags.Function)) {
            return;
        }
        
        writer.write(`export function create${syntaxNode.kindName}(`);
        
        for (let member of syntaxNode.members) {
            let type = 
                member.isNodeArray ? `Array<${member.elementTypeName}>` :
                member.isModifiersArray ? `Array<Node>` :
                member.typeName; 
            
            writer.write(`${member.paramName}?: ${type}, `);
        }
        
        writer.write(`location?: TextRange, flags?: NodeFlags): ${syntaxNode.typeName} {`);
        writer.writeLine();
        
        writer.increaseIndent();
        if (syntaxNode.members.length) {
            writer.write(`let node = createNode<${syntaxNode.typeName}>(SyntaxKind.${syntaxNode.kindName}, location, flags);`);
            writer.writeLine();
            if (syntaxNode.members.length > 1) {
                writer.write(`if (`);
                
                let first = true;
                for (let member of syntaxNode.members) {
                    if (first) {
                        first = false;
                    }
                    else {
                        writer.write(` || `);
                    }
                    
                    writer.write(member.paramName);
                }
                writer.write(`) {`);
                writer.writeLine();
                writer.increaseIndent();
            }
            
            for (let member of syntaxNode.members) {
                if (member.isModifiersArray) {
                    writer.write(`setModifiers(node, modifiers);`);
                }
                else if (member.isNodeArray) {
                    writer.write(`node.${member.propertyName} = ${member.paramName} && createNodeArray(${member.paramName})`);
                }
                else {
                    writer.write(`node.${member.propertyName} = ${member.paramName};`);
                }
                
                writer.writeLine();
            }
            
            if (syntaxNode.members.length > 1) {
                writer.decreaseIndent();
                writer.write(`}`);
                writer.writeLine();
            }
        
            writer.write(`return node;`);
            writer.writeLine();
        }
        else {
            writer.write(`return createNode<${syntaxNode.typeName}>(SyntaxKind.${syntaxNode.kindName}, location, flags);`);
            writer.writeLine();
        }
    
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeIsNodeFunction(syntaxNode: SyntaxNode) {
        if (syntaxNode.typeName === "Node") {
            return;
        }
        
        if (!syntaxNode.options.test) {
            return;
        }

        // Skip the is function for this node if it is already defined
        if (resolveQualifiedName(factorySourceFile, `ts.is${syntaxNode.kindName}`, SymbolFlags.Function)) {
            return;
        }
        
        writer.write(`export function is${syntaxNode.kindName}(node: Node): node is ${syntaxNode.typeName} {`);
        writer.writeLine();
        writer.increaseIndent();
        writer.write(`return node && node.kind === SyntaxKind.${syntaxNode.kindName};`);
        writer.writeLine();
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeIsAnyNodeFunction(typeName: string) {
        if (typeName === "Node") {
            return;
        }
        
        let typeNames = splitTypeName(typeName);
        let nodeTestFunction: string;
        if (typeNames.length === 1) {
            let typeSymbol = resolveExportedQualifiedName(tsModuleSymbol, typeName, SymbolFlags.Type);
            if (typeSymbol) {
                let nodeTestAnnotation = findFirstAnnotation(typeSymbol, NodeTestAnnotation.match);
                if (nodeTestAnnotation) {
                    nodeTestFunction = nodeTestAnnotation.functionName;
                }
            }
        }
        
        if (!nodeTestFunction) {
            nodeTestFunction = `is${typeNameToMethodNameSuffix(typeName)}`;
        }
        
        // Skip the is function for this type if it is already defined in factory.ts
        if (resolveQualifiedName(factorySourceFile, `ts.${nodeTestFunction}`, SymbolFlags.Function)) {
            return;
        }
        
        // Skip the is function for this type if has the same name as a SyntaxKind
        if (getSymbol(syntaxKindSymbol.exports, typeName, SymbolFlags.EnumMember)) {
            return;
        }
        
        writer.write(`export function ${nodeTestFunction}(node: Node): node is ${typeName} {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`if (node) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`switch (node.kind) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        let kinds = getDescendantSyntaxKindSymbolsForTypeName(typeName);
        for (let kind of kinds) {
            writer.write(`case SyntaxKind.${kind.name}:`);
            writer.writeLine();
        }
        
        if (kinds.length > 0) {
            writer.increaseIndent();
            writer.write(`return true;`);
            writer.writeLine();
            writer.decreaseIndent();
        }
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.write(`return false; `);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeCloneFunction() {
        writer.write(`export function cloneNode<TNode extends Node>(node: TNode, location?: TextRange, flags?: NodeFlags): TNode;`);
        writer.writeLine();

        writer.write(`export function cloneNode(node: Node, location?: TextRange, flags: NodeFlags = node.flags): Node {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`if (!node) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`return node;`);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.write(`switch (node.kind) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        for (let syntaxNode of syntaxNodes) {
            if (!syntaxNode.options.create) {
                continue;
            }
            
            writer.write(`case SyntaxKind.${syntaxNode.kindName}:`);
            writer.writeLine();
            writer.increaseIndent();
            
            writer.write(`return factory.create${syntaxNode.kindName}(`);
            for (let member of syntaxNode.members) {
                writer.write(`(<${syntaxNode.typeName}>node).${member.propertyName}, `);
            }
            
            writer.write(`location, flags);`);
            writer.writeLine();

            writer.decreaseIndent();
        }
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeUpdateFunction(syntaxNode: SyntaxNode) {
        if (!syntaxNode.options.update || !hasChildNodes(syntaxNode)) {
            return;
        }

        // Skip the update function for this node if it is defined in factory.ts
        if (resolveQualifiedName(factorySourceFile, `ts.factory.update${syntaxNode.kindName}`, SymbolFlags.Function)) {
            return;
        }
        
        writer.write(`export function update${syntaxNode.kindName}(node: ${syntaxNode.typeName}`);
    
        for (let i = 0; i < syntaxNode.members.length; ++i) {
            let member = syntaxNode.members[i];
            if (member.isFactoryParam) {
                continue;
            }
            
        
            let type = 
                member.isNodeArray ? `Array<${member.elementTypeName}>` :
                member.isModifiersArray ? `Array<Node>` :
                member.typeName;

            writer.write(`, ${member.paramName}: ${type}`);
        }
        
        writer.write(`): ${syntaxNode.typeName} {`);
        writer.writeLine();
        
        writer.increaseIndent();
        
        writer.write(`if (`);
        let first = true;
        for (let member of syntaxNode.members) {
            if (member.isFactoryParam) {
                continue;
            }
            
            if (first) {
                first = false;
            }
            else {
                writer.write(` || `);
            }
            
            writer.write(`${member.paramName} !== node.${member.propertyName}`);
        }
    

        writer.write(`) {`);
        writer.writeLine();
    
        writer.increaseIndent();
        
        writer.write(`let newNode = create${syntaxNode.kindName}(`);
        
        for (let i = 0; i < syntaxNode.members.length; ++i) {
            if (i > 0) {
                writer.write(`, `);
            }
            
            let member = syntaxNode.members[i];
            if (member.isFactoryParam) {
                writer.write(`node.${member.propertyName}`);
            }
            else {
                writer.write(member.paramName);
            }
        }
    
        writer.write(`);`);
        writer.writeLine();
        
        writer.write(`return updateFrom(node, newNode);`);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.write(`return node;`);
        writer.writeLine();
    
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
}

function generateTransform(outputFile: string) {
    let writer = createTextWriter(host.getNewLine());
    writer.write(`// <auto-generated />`);
    writer.writeLine();
    writer.write(`/// <reference path="factory.ts" />`);
    writer.writeLine();
    writer.write(`/// <reference path="transform.ts" />`);
    writer.writeLine();
    writer.write(`/* @internal */`);
    writer.writeLine();
    writer.write(`namespace ts.transform {`);
    writer.writeLine();
    writer.increaseIndent();
    writeAcceptFunction();
    writer.decreaseIndent();
    writer.write(`}`);
    writer.writeLine();
   
    sys.writeFile(outputFile, writer.getText());
    
    function writeAcceptFunction() {
        writer.write(`export function accept(node: Node, visitor: (input: Node, write: (node: Node) => void) => void, write: (node: Node) => void): void {`);
        writer.writeLine();
        writer.increaseIndent();
    
        writer.write(`if (!node) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`return;`);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.write(`switch (node.kind) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        for (let syntaxNode of syntaxNodes) {
            if (!hasChildNodes(syntaxNode)) {
                continue;
            }
            
            writer.write(`case SyntaxKind.${syntaxNode.kindName}:`);
            writer.writeLine();
            writer.increaseIndent();
            
            writer.write(`return write(factory.update${syntaxNode.kindName}(`);
            writer.writeLine();
            writer.increaseIndent();
            writer.write(`<${syntaxNode.typeName}>node`);
            
            for (let member of syntaxNode.members) {
                if (member.isFactoryParam) {
                    continue;
                }
                
                writer.write(`, `);
                writer.writeLine();
                
                if (member.typeName === "Node") {
                    writer.write(`(<${syntaxNode.typeName}>node).${member.propertyName}`);
                }
                else {
                    let visitorFunction =
                        member.visitorFunction ? member.visitorFunction :
                        member.isNodeArray || member.isModifiersArray ? `<NodeArray<${member.elementTypeName}>>visitNodes` :
                        member.startsNewLexicalEnvironment ? `<${member.typeName}>visitNewLexicalEnvironment` :
                        `<${member.typeName}>visitNode`;
                        
                    writer.write(`${visitorFunction}((<${syntaxNode.typeName}>node).${member.propertyName}, visitor)`);
                }
            }
            
            writer.write(`));`);
            writer.writeLine();
            writer.decreaseIndent();
            writer.decreaseIndent();
        }
        
        writer.write(`default:`);
        writer.writeLine();
        writer.increaseIndent();
        writer.write(`return write(node);`);
        writer.writeLine();
        writer.decreaseIndent();
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
        
        writer.decreaseIndent();
        writer.write('}');
        writer.writeLine();
    }
}

//
// Utilities
//

function splitTypeName(typeName: string) {
    return typeName.split(/\s*\|\s*/g);
}

function typeNameToMethodNameSuffix(typeName: string) {
    let typeNames = splitTypeName(typeName);
    typeNames = typeNames.map(typeNameToSyntaxKindOrTypeName);
    return typeNames.join("Or");
}

function typeNameToSyntaxKindOrTypeName(typeName: string) {
    let typeSymbol = getSymbol(tsModuleSymbol.exports, typeName, SymbolFlags.Type);
    let syntaxKindSymbols = getDescendantSyntaxKindSymbolsForTypeSymbol(typeSymbol);
    if (syntaxKindSymbols && syntaxKindSymbols.length === 1) {
        return syntaxKindSymbols[0].name;
    }
    return typeName;
}

function fillKindsForType(typeSymbol: Symbol, kinds: Symbol[]) {
    let usages = getProperty(syntaxKindTypeUsages, typeSymbol.name);
    if (usages) {
        for (let usage of usages) {
            if (kinds.indexOf(usage) === -1) {
                kinds.push(usage);
            }
        }
    }
    else if (typeSymbol.declarations[0].kind === SyntaxKind.TypeAliasDeclaration) {
        for (let superType of getSuperTypeSymbols(typeSymbol)) {
            fillKindsForType(superType, kinds);
        }
    }
}

/**
  * Resolves a symbol with the specified name and meaning starting at the provided location.
  * @param location The node at which to resolve the name.
  * @param name The name of a symbol to resolve.
  * @param meaning The meaning of the symbol.
  */
function resolveName(location: Node, name: string, meaning: SymbolFlags): Symbol {
    let symbols = checker.getSymbolsInScope(location, meaning);
    for (let symbol of symbols) {
        if (symbol.name === name) {
            return symbol;
        }
    }
    
    return undefined;
}

/**
  * Gets a symbol with the specified name and meaning from the provided symbol table.
  * @param symbols The symbol table from which to retrieve a named symbol.
  * @param name The name of the symbol to retrieve.
  * @param meaning The meaning of the symbol.
  */
function getSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags): Symbol {
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
function getSymbols(symbols: SymbolTable, meaning: SymbolFlags): Symbol[] {
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
    
    return results || emptyArray;
}

/**
  * Resolves a symbol with the specified fully qualified name and meaning starting at the provided location.
  * @param location The node at which to resolve the name.
  * @param name A dot-seperated name for the symbol to retrieve.
  * @param meaning The meaning of the symbol.
  */
function resolveQualifiedName(location: Node, name: string, meaning: SymbolFlags): Symbol {
    return resolveQualifiedNameParts(location, name.split("."), meaning);
}

function resolveExportedQualifiedName(symbol: Symbol, name: string, meaning: SymbolFlags): Symbol {
    return resolveExportedQualifiedNameParts(symbol, name.split("."), meaning);
}

function resolveExportedQualifiedNameParts(symbol: Symbol, qn: string[], meaning: SymbolFlags): Symbol {
    if (qn.length === 1) {
        return getSymbol(symbol.exports, qn[0], meaning);
    }
    
    let namespace = getSymbol(symbol.exports, qn[0], SymbolFlags.Namespace); 
    if (namespace === undefined) {
        return undefined;
    }
    
    for (let i = 1; i < qn.length - 1; i++) {
        namespace = getSymbol(namespace.exports, qn[i], SymbolFlags.Namespace);
        if (namespace === undefined) {
            return undefined;
        }
    }
    
    return getSymbol(namespace.exports, qn[qn.length - 1], meaning);
}

/**
  * Resolves a symbol with the specified fully qualified name and meaning starting at the provided location.
  * @param location The node at which to resolve the name.
  * @param qn An array of qualified name segments.
  * @param meaning The meaning of the symbol.
  */
function resolveQualifiedNameParts(location: Node, qn: string[], meaning: SymbolFlags): Symbol {
    if (qn.length === 1) {
        return resolveName(location, qn[0], meaning);
    }
    
    let namespace = resolveName(location, qn[0], SymbolFlags.Namespace); 
    if (namespace === undefined) {
        return undefined;
    }
    
    for (let i = 1; i < qn.length - 1; i++) {
        namespace = getSymbol(namespace.exports, qn[i], SymbolFlags.Namespace);
        if (namespace === undefined) {
            return undefined;
        }
    }
    
    return getSymbol(namespace.exports, qn[qn.length - 1], meaning);
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
    
    let value = checker.getConstantValue(<EnumMember>symbol.declarations[0]);
    return { symbol, value };
}

function symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string {
    return symbol ? checker.symbolToString(symbol, enclosingDeclaration, meaning) : undefined;
}

function hasChildNodes(syntaxNode: SyntaxNode) {
    for (let member of syntaxNode.members) {
        if (member.isFactoryParam) {
            continue;
        }

        if (member.isNode || member.isNodeArray || member.isModifiersArray) {
            return true;
        }
    }
    
    return false;
}

function isTypeReferenceNode(node: Node): node is TypeReferenceNode {
    return node ? node.kind === SyntaxKind.TypeReference : false;
}

function isUnionTypeNode(node: Node): node is UnionTypeNode {
    return node ? node.kind === SyntaxKind.UnionType : false;
}

function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration {
    return node ? node.kind === SyntaxKind.InterfaceDeclaration : false;
}

function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration {
    return node ? node.kind === SyntaxKind.TypeAliasDeclaration : false;
}

function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments {
    return node ? node.kind === SyntaxKind.ExpressionWithTypeArguments : false;
}

function isNodeArray(typeNode: TypeNode): boolean {
    return isTypeReferenceNode(typeNode) ? checker.getSymbolAtLocation(typeNode.typeName) === nodeArraySymbol : false;
}

function isModifiersArray(typeNode: TypeNode): boolean {
    return isTypeReferenceNode(typeNode) ? checker.getSymbolAtLocation(typeNode.typeName) === modifiersArraySymbol : false;
}

function isPropertyAssignment(node: Node): node is PropertyAssignment {
    return node && node.kind === SyntaxKind.PropertyAssignment;
}

function isIdentifier(node: Node): node is Identifier {
    return node && node.kind === SyntaxKind.Identifier;
}

function isSubtypeOf(node: TypeNode | Declaration, superTypeSymbol: Symbol): boolean {
    if (isInterfaceDeclaration(node)) {
        if (node.heritageClauses) {
            for (let superType of node.heritageClauses[0].types) {
                if (isSubtypeOf(superType, superTypeSymbol)) {
                    return true;
                }
            }
        }
    }
    else if (isTypeAliasDeclaration(node)) {
        return isSubtypeOf(node.type, superTypeSymbol);
    }
    else if (isUnionTypeNode(node)) {
        for (let constituentType of node.types) {
            if (isSubtypeOf(constituentType, superTypeSymbol)) {
                return true;
            }
        }
    }
    else {
        let typeSymbol = isTypeReferenceNode(node) ? checker.getSymbolAtLocation(node.typeName) 
            : isExpressionWithTypeArguments(node) ? checker.getSymbolAtLocation(node.expression) 
            : undefined;
            
        if (!typeSymbol) {
            return false;
        }
        else if (typeSymbol === superTypeSymbol) {
            return true;
        }
        
        return isSubtypeOf(typeSymbol.declarations[0], superTypeSymbol);
    }
    
    return false;
}

function getSuperTypeSymbols(typeSymbol: Symbol, flattenHierarchy?: boolean) {
    if (flattenHierarchy) {
        let superTypeSymbolsFlat = ancestorTypeSymbolsForTypeSymbol[getSymbolId(typeSymbol)];
        if (superTypeSymbolsFlat) {
            return superTypeSymbolsFlat;
        }
        
        superTypeSymbolsFlat = [];
        
        let superTypeSymbols = getSuperTypeSymbols(typeSymbol, /*flattenHierarchy*/ false).slice(0);
        for (let superTypeSymbol of superTypeSymbols) {
            if (superTypeSymbolsFlat.indexOf(superTypeSymbol) !== -1) {
                continue;
            }
            
            superTypeSymbolsFlat.push(superTypeSymbol);
            if (superTypeSymbol === nodeSymbol) {
                continue;
            }
            
            let ancestorTypeSymbols = getSuperTypeSymbols(superTypeSymbol, /*flattenHierarch*/ true);
            for (let ancestorTypeSymbol of ancestorTypeSymbols) {
                if (superTypeSymbolsFlat.indexOf(ancestorTypeSymbol) === -1) {
                    superTypeSymbolsFlat.push(ancestorTypeSymbol);
                }
            }
        }

        return ancestorTypeSymbolsForTypeSymbol[getSymbolId(typeSymbol)] = superTypeSymbolsFlat;
    }
    else {
        let superTypeSymbols = superTypeSymbolsForTypeSymbol[getSymbolId(typeSymbol)];
        if (superTypeSymbols) {
            return superTypeSymbols;
        }
        
        superTypeSymbols = [];
        
        typeSymbolsById[getSymbolId(typeSymbol)] = typeSymbol;
        
        let decl = typeSymbol.declarations[0];
        if (isTypeAliasDeclaration(decl)) {
            fillSuperTypes(decl.type, superTypeSymbols);
        }
        else if (isInterfaceDeclaration(decl) && decl.heritageClauses) {
            for (let superType of decl.heritageClauses[0].types) {
                fillSuperTypes(superType, superTypeSymbols);
            }
        }
    
        return superTypeSymbolsForTypeSymbol[getSymbolId(typeSymbol)] = superTypeSymbols;
    }
}

function fillSuperTypes(node: TypeNode, superTypeSymbols: Symbol[]) {
    if (isUnionTypeNode(node)) {
        // Flatten union types
        for (let constituentType of node.types) {
            fillSuperTypes(constituentType, superTypeSymbols);
        }
    }
    else {
        // Add type references
        let symbol = 
            isTypeReferenceNode(node) ? checker.getSymbolAtLocation(node.typeName) :
            isExpressionWithTypeArguments(node) ? checker.getSymbolAtLocation(node.expression) :
            undefined;
            
        if (symbol && superTypeSymbols.indexOf(symbol) === -1) {
            superTypeSymbols.push(symbol);
        }
    }
}

function getDescendantTypeSymbols(typeSymbol: Symbol) {
    let descendantTypeSymbols = descendantTypeSymbolsForTypeSymbol[getSymbolId(typeSymbol)];
    if (descendantTypeSymbols) {
        return descendantTypeSymbols;
    }
    
    descendantTypeSymbols = [];
    for (let symbolId in ancestorTypeSymbolsForTypeSymbol) {
        let ancestorTypeSymbols = ancestorTypeSymbolsForTypeSymbol[symbolId];
        if (!Array.isArray(ancestorTypeSymbols) || ancestorTypeSymbols.indexOf(typeSymbol) === -1) {
            continue;
        }
        
        let ancestorTypeSymbol = typeSymbolsById[symbolId];
        if (descendantTypeSymbols.indexOf(ancestorTypeSymbol) === -1) {
            descendantTypeSymbols.push(ancestorTypeSymbol);
        }
    }
    
    return descendantTypeSymbolsForTypeSymbol[getSymbolId(typeSymbol)] = descendantTypeSymbols;
}

/**
  * Get the SyntaxKind Symbols associated with a node type Symbol.
  */
function getSyntaxKindSymbolsForTypeSymbol(typeSymbol: Symbol, ensureExists?: boolean): Symbol[] {
    let syntaxKindsForType = typeToSyntaxKinds[getSymbolId(typeSymbol)];
    if (!syntaxKindsForType && ensureExists) {
        syntaxKindsForType = [];
        typeToSyntaxKinds[getSymbolId(typeSymbol)] = syntaxKindsForType;
    }
    
    return syntaxKindsForType;
}

function getDescendantSyntaxKindSymbolsForTypeName(typeName: string): Symbol[] {
    let symbols: Symbol[] = [];
    let typeNames = splitTypeName(typeName);
    for (let typeName of typeNames) {
        let typeSymbol = resolveExportedQualifiedName(tsModuleSymbol, typeName, SymbolFlags.Type);
        if (typeSymbol) {
            let kindSymbols = getDescendantSyntaxKindSymbolsForTypeSymbol(typeSymbol);
            for (let kindSymbol of kindSymbols) {
                if (symbols.indexOf(kindSymbol) === -1) {
                    symbols.push(kindSymbol);
                }
            }
        }
    }
    
    return symbols;
}

function getDescendantSyntaxKindSymbolsForTypeSymbol(typeSymbol: Symbol): Symbol[] {
    let descendantSyntaxKindSymbols = descendantSyntaxKindSymbolsForTypeSymbol[getSymbolId(typeSymbol)];
    if (descendantSyntaxKindSymbols) {
        return descendantSyntaxKindSymbols;
    }
    
    descendantSyntaxKindSymbols = [];
    for (let descendantOrSelfTypeSymbol of [typeSymbol, ...getDescendantTypeSymbols(typeSymbol)]) {
        let kindSymbols = getSyntaxKindSymbolsForTypeSymbol(descendantOrSelfTypeSymbol) || emptyArray;
        for (let kindSymbol of kindSymbols) {
            if (descendantSyntaxKindSymbols.indexOf(kindSymbol) === -1) {
                descendantSyntaxKindSymbols.push(kindSymbol);
            }
        }
    }
    
    let decl = typeSymbol.declarations[0];
    if (isTypeAliasDeclaration(decl)) {
        let superTypes = getSuperTypeSymbols(typeSymbol);
        for (let typeSymbol of superTypes) {
            let kindSymbols = getDescendantSyntaxKindSymbolsForTypeSymbol(typeSymbol);
            for (let kindSymbol of kindSymbols) {
                if (descendantSyntaxKindSymbols.indexOf(kindSymbol) === -1) {
                    descendantSyntaxKindSymbols.push(kindSymbol);
                }
            }
        }
    }
    
    return descendantSyntaxKindSymbolsForTypeSymbol[getSymbolId(typeSymbol)] = descendantSyntaxKindSymbols;
}

function getCompilerOptions() {
    let options = getDefaultCompilerOptions();
    options.noResolve = true;
    options.noLib = true;
    return options;
}

function createLineWrappingTextWriter(newLine: string, maxWidth: number): EmitTextWriter {
    let writer = createTextWriter(newLine);
    let noWrap = false;
    let baseWrite = writer.write;
    writer.write = writeWrap;
    return writer;
    
    function writeWrap(text: string) {
        let textTrimRight = text.replace(/\s+$/, '');
        if (writer.getColumn() + textTrimRight.length > maxWidth) {
            writer.writeLine();
            writer.increaseIndent();
            baseWrite(text.replace(/^\s+/, ''));
            writer.decreaseIndent();
        }
        else {
            baseWrite(text);
        }
    }
}

//
// Annotations
//

function findFirstAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => annotation is TAnnotation): TAnnotation;
function findFirstAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation;
function findFirstAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation {
    for (let annotation of getAnnotations(symbol)) {
        if (match(annotation)) {
            return <TAnnotation>annotation;
        }
    }
    
    return undefined;
}

function findAllAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => annotation is TAnnotation): TAnnotation[];
function findAllAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation[];
function findAllAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation[] {
    let annotations: TAnnotation[];
    for (let annotation of getAnnotations(symbol)) {
        if (match(annotation)) {
            if (!annotations) {
                annotations = [];
            }
            
            annotations.push(<TAnnotation>annotation);
        }
    }
    return annotations || emptyArray;
}

function getAnnotations(symbol: Symbol): Annotation[] {
    let annotations = symbolToAnnotations[getSymbolId(symbol)];
    if (annotations) {
        return annotations;
    }
    
    annotations = [];
    
    for (let decl of symbol.declarations) {
        let leadingCommentRanges = getLeadingCommentRanges(typesSourceFile.text, decl.pos);
        if (leadingCommentRanges) {
            for (let range of leadingCommentRanges) {
                parseAnnotations(decl, range, annotations);
            }
        }
    }
    
    return symbolToAnnotations[getSymbolId(symbol)] = annotations;
}

function getLiteralValue(location: Node, expr: Expression): any {
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
            return (<LiteralExpression>expr).text;
        
        case SyntaxKind.NoSubstitutionTemplateLiteral: 
            return (<LiteralExpression>expr).text;
        
        case SyntaxKind.NumericLiteral: 
            return Number((<LiteralExpression>expr).text);
        
        case SyntaxKind.PropertyAccessExpression:
            return getEnumLiteralValue(location, expr.getText());
        
        case SyntaxKind.ArrayLiteralExpression:
            return getArrayLiteralValue(location, <ArrayLiteralExpression>expr);
        
        case SyntaxKind.ObjectLiteralExpression:
            return getObjectLiteralValue(location, <ObjectLiteralExpression>expr);
    }
}

function getArrayLiteralValue(location: Node, expr: ArrayLiteralExpression) {
    let values: any[] = [];
    for (let element of expr.elements) {
        let value = getLiteralValue(location, element);
        values.push(value);
    }
    return values;
}

function getObjectLiteralValue(location: Node, expr: ObjectLiteralExpression) {
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

function parseAnnotations(location: Node, range: CommentRange, annotations: Annotation[]) {
    let text = typesSourceFile.text;
    let comment = text.substring(range.pos, range.end);
    let annotationMatch: RegExpExecArray;
    while (annotationMatch = annotationPattern.exec(comment)) {
        let annotation = parseAnnotation(location, annotationMatch[1]);
        if (annotation) {
            annotations.push(annotation);
        }
    }
}

function parseAnnotation(location: Node, annotationSource: string) {
    let evalSourceFile = createSourceFile("eval.ts", annotationSource, options.target, true);
    let statements = evalSourceFile.statements;
    if (statements.length === 0) {
        return undefined;
    }
    
    let stmt = statements[0];
    if (stmt.kind !== SyntaxKind.ExpressionStatement) {
        return undefined;
    }
    
    let expr = (<ExpressionStatement>stmt).expression;
    if (expr.kind === SyntaxKind.Identifier) {
        return createAnnotation((<Identifier>expr).text, emptyArray);
    }
    else if (expr.kind === SyntaxKind.CallExpression) {
        let call = <CallExpression>expr;
        if (call.expression.kind !== SyntaxKind.Identifier) {
            return undefined;
        }
        
        let _arguments: any[] = [];
        for (let argument of call.arguments) {
            _arguments.push(getLiteralValue(location, argument));
        }
        
        return createAnnotation((<Identifier>call.expression).text, _arguments);
    }
    else {
        return undefined;
    }
}

function annotation(name: string) {
    return function<T extends typeof Annotation>(target: T) {
        annotationConstructors[name] = target;
        return target;
    }
}

class Annotation {
    public name: string;
    public arguments: any[];
    constructor(_arguments: any[]) {
        this.arguments = _arguments;
    }
    
    public static match(annotation: Annotation): boolean {
        return annotation instanceof this;
    }
}

@annotation("kind")
class KindAnnotation extends Annotation {
    public name = "kind";
    public kind: SyntaxKind;
    public kindSymbol: Symbol;
    public options: KindOptions;
    constructor([{ value, symbol }, { create = true, update = true, test = true } = <KindOptions>{}, ..._arguments]: [EnumValue<SyntaxKind>, KindOptions, any]) {
        super(_arguments);
        this.kind = value;
        this.kindSymbol = symbol;
        this.options = { create, update, test };
    }
    
    public static match(annotation: Annotation): annotation is KindAnnotation {
        return annotation instanceof KindAnnotation;
    }
}

@annotation("factoryhidden")
class FactoryHiddenAnnotation extends Annotation {
    public name = "factoryhidden";
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

    public static match(annotation: Annotation): annotation is FactoryHiddenAnnotation {
        return annotation instanceof FactoryHiddenAnnotation;
    }
}

@annotation("factoryorder")
class FactoryOrderAnnotation extends Annotation {
    public name = "factoryorder";
    public propertyNames: string[];
    constructor(propertyNames: string[]) {
        super([]);
        this.propertyNames = propertyNames;
    }

    public static match(annotation: Annotation): annotation is FactoryOrderAnnotation {
        return annotation instanceof FactoryOrderAnnotation;
    }
}

@annotation("factoryparam")
class FactoryParamAnnotation extends Annotation {
    public name = "factoryparam";
    public propertyName: string;
    constructor([propertyName, ..._arguments]: [string, any]) {
        super(_arguments);
        this.propertyName = propertyName;
    }

    public static match(annotation: Annotation): annotation is FactoryParamAnnotation {
        return annotation instanceof FactoryParamAnnotation;
    }
}

@annotation("visitor")
class MemberVisitorAnnotation extends Annotation {
    public name = "visitor";
    public functionName: string;
    constructor([functionName, ..._arguments]: [string, any]) {
        super(_arguments);
        this.functionName = functionName;
    }

    public static match(annotation: Annotation): annotation is MemberVisitorAnnotation {
        return annotation instanceof MemberVisitorAnnotation;
    }
}

@annotation("newlexicalenvironment")
class NewLexicalEnvironmentAnnotation extends Annotation {
    public name = "newlexicalenvironment";
    
    public static match(annotation: Annotation): annotation is NewLexicalEnvironmentAnnotation {
        return annotation instanceof NewLexicalEnvironmentAnnotation;
    }
}

@annotation("nodetest")
class NodeTestAnnotation extends Annotation {
    public name = "nodetest";
    public functionName: string;
    constructor([functionName, ..._arguments]: [string, any]) {
        super(_arguments);
        this.functionName = functionName
    }
    
    public static match(annotation: Annotation): annotation is NodeTestAnnotation {
        return annotation instanceof NodeTestAnnotation;
    }
}

function createAnnotation(name: string, _arguments: any[]): Annotation {
    let ctor = getProperty(annotationConstructors, name);
    if (ctor) {
        return new ctor(_arguments);
    }
    else {
        let annotation = new Annotation(_arguments);
        annotation.name = name;
        return annotation;
    }
}

function getFactoryHiddenStateForSymbol(symbol: Symbol): FactoryHiddenState {
    let annotation: FactoryHiddenAnnotation;
    if (annotation = findFirstAnnotation<FactoryHiddenAnnotation>(symbol, annotation => FactoryHiddenAnnotation.match(annotation) && annotation.propertyName === undefined)) {
        return annotation.hidden ? FactoryHiddenState.Hidden : FactoryHiddenState.Visible;
    }

    return FactoryHiddenState.None;
}

function getFactoryHiddenStateForProperty(container: Symbol, propertyName: string): FactoryHiddenState {
    let hiddenStates: FactoryHiddenStateResult[] = [];
    let hiddenStateForSource: FactoryHiddenStateResult[] = [];
    
    // find all the hidden states for this property
    getFactoryHiddenStateForPropertyWorker(container, /*depth*/ 0);
    if (hiddenStates.length === 0) {
        return FactoryHiddenState.None;
    }
    else if (hiddenStates.length === 1) {
        return hiddenStates[0].state;
    }
    
    let closestMatch: FactoryHiddenStateResult;
    for (let hiddenState of hiddenStates) {
        if (closestMatch === undefined || hiddenState.depth < closestMatch.depth) {
            closestMatch = hiddenState;
        }
    }
    
    return closestMatch.state;

    interface FactoryHiddenStateResult {
        state: FactoryHiddenState;
        source?: Symbol;
        depth?: number;
    }

    function getFactoryHiddenStateForPropertyWorker(source: Symbol, depth: number): void {
        let state: FactoryHiddenState;

        let result = hiddenStateForSource[getSymbolId(source)];
        if (result) {
            if (depth > result.depth) {
                result.depth = depth;
            }
            
            return;
        }
        
        // First, check for a property-specific `@factoryhidden` annotation on the container (e.g. `@factoryhidden("x", true)`)
        let annotation = findFirstAnnotation<FactoryHiddenAnnotation>(source, annotation => FactoryHiddenAnnotation.match(annotation) && annotation.propertyName === propertyName);
        if (annotation) {
            // encode the depth for later comparison
            state = annotation.hidden ? FactoryHiddenState.Hidden : FactoryHiddenState.Visible;
        }
        
        let property: Symbol;
        if (!state) {
            property = source.members ? getProperty(source.members, propertyName) : undefined;
            if (property) {
                state = getFactoryHiddenStateForSymbol(property);
            }
        }
        
        if (!state) {
            state = getFactoryHiddenStateForSymbol(source);
        }
        
        if (!state && property) {
            state = FactoryHiddenState.Visible;
        }
        
        if (state) {
            let result = { state, source, depth };
            hiddenStates.push(result);
            hiddenStateForSource[getSymbolId(source)] = result;
            if (depth === 0) {
                return;
            }
        }
        
        for (let superType of getSuperTypeSymbols(source)) {
            getFactoryHiddenStateForPropertyWorker(superType, depth + 1);
        }
    }
}


function isFactoryParamProperty(container: Symbol, propertyName: string): boolean {
    if (findFirstAnnotation(container, annotation => FactoryParamAnnotation.match(annotation) && annotation.propertyName === propertyName)) {
        return true;
    }

    let property = container.members ? getProperty(container.members, propertyName) : undefined;
    if (property) {
        if (findFirstAnnotation(property, annotation => FactoryParamAnnotation.match(annotation) && annotation.propertyName === undefined)) {
            return true;
        }
    }
    else {
        for (let superType of getSuperTypeSymbols(container)) {
            if (isFactoryParamProperty(superType, propertyName)) {
                return true;
            }
        }
    }
    
    return false;
}

function getFactoryOrder(symbol: Symbol, inherited?: boolean): string[] {
    let annotation = findFirstAnnotation<FactoryOrderAnnotation>(symbol, FactoryOrderAnnotation.match);
    if (annotation) {
        return annotation.propertyNames;
    }
    
    let propertyNames: string[];
    if (inherited) {
        for (let superType of getSuperTypeSymbols(symbol)) {
            let superTypeOrder = getFactoryOrder(superType, /*inherited*/ true);
            if (superTypeOrder && superTypeOrder.length > 0) {
                if (!propertyNames) {
                    propertyNames = [];
                }
                
                for (let propertyName of superTypeOrder) {
                    if (propertyNames.indexOf(propertyName) === -1) {
                        propertyNames.push(propertyName);
                    }
                }
            }
        }
    }
    
    return propertyNames;
}

function startsNewLexicalEnvironment(symbol: Symbol): boolean {
    return !!findFirstAnnotation(symbol, NewLexicalEnvironmentAnnotation.match);
}

// Main entry point
main();