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
    isFactoryParam?: boolean;
    isNode?: boolean;
    isNodeArray?: boolean;
    isModifiersArray?: boolean;
}

interface Annotation {
    name: string;
    arguments: any[];
}

interface FactoryHiddenAnnotation extends Annotation {
    propertyName?: string;
    hidden: boolean;
}

const enum FactoryHiddenState {
    None,
    Hidden,
    Visible
}

interface FactoryOrderAnnotation extends Annotation {
    propertyNames: string[];
}

interface FactoryParamAnnotation extends Annotation {
    propertyName?: string;
}

interface KindOptions {
    create: boolean;
    update: boolean;
    test: boolean;
}

interface KindAnnotation extends Annotation {
    kind: SyntaxKind;
    options: KindOptions;
}

const columnWrap = 150;
const emptyArray: any[] = [];
const kindPattern = /@kind\s*\(\s*SyntaxKind\.(\w+)\s*\)/g;
const annotationPattern = /@(\w+\s*[^\r\n]*)/g;
const annotationArgumentPattern = /[(,]([^,)]+)/g;
const whitespacePattern = /\s/;
const quotePattern = /["'`]/;
const numberPattern = /^[+-]?(\d+|\d*\.\d+|\d*e\d+|0x[\da-f]+)$/i;
const arrayPattern = /^\[.*\]$/;
const objectPattern = /^\{.*\}$/;

let file: string;
let options: CompilerOptions;
let host: CompilerHost;
let program: Program;
let checker: TypeChecker;
let sourceFile: SourceFile;
let tsModuleSymbol: Symbol;
let nodeSymbol: Symbol;
let nodeArraySymbol: Symbol;
let modifiersArraySymbol: Symbol;
let syntaxKindSymbol: Symbol;
let syntaxKindValueToSymbol: Symbol[] = [];
let nodeAnnotations: Annotation[][] = [];
let syntax: SyntaxNode[] = [];
let syntaxKindTypeUsages: Map<Symbol[]> = {};
let memberTypeUsages: Map<boolean> = {};
let memberTypeUsageRedirects: Map<string> = {};

main();

function main() {
    if (sys.args.length < 1) {
        sys.write("Usage:" + sys.newLine)
        sys.write("\tnode processTypes.js <types-ts-input-file>" + sys.newLine);
        return;
    }
    
    options = getCompilerOptions();
    host = createCompilerHost(options);
    file = host.getCanonicalFileName(sys.resolvePath(sys.args[0]));
    program = createProgram([file], options, host);
    checker = program.getTypeChecker();
    sourceFile = program.getSourceFile(file);
    
    discover();
    
    let inputDirectory = sys.resolvePath(combinePaths(file, ".."));
    let factoryOutputFile = combinePaths(inputDirectory, "factory.generated.ts");
    generateFactory(factoryOutputFile);
    
    let transformOutputFile = combinePaths(inputDirectory, "transform.generated.ts");
    generateTransform(transformOutputFile);
}

/**
  * Discovers type information and symbols for various SyntaxNodes
  */
function discover() {
    visit(sourceFile);

    // Sort the syntax nodes by SyntaxKind
    syntax.sort((a, b) => {
        return a.kind - b.kind;
    }); 
    
    // Set up member type usage redirects for types with a single kind
    for (let typeName in syntaxKindTypeUsages) {
        if (syntaxKindTypeUsages[typeName].length === 1) {
            memberTypeUsageRedirects[typeName] = syntaxKindTypeUsages[typeName][0].name;
        }
    }
    
    function visit(node: Node) {
        switch (node.kind) {
            case SyntaxKind.SourceFile:
            case SyntaxKind.ModuleBlock:
                forEachChild(node, visit);
                break;
            
            case SyntaxKind.ModuleDeclaration:
                visitModuleDeclaration(<ModuleDeclaration>node);
                break;

            case SyntaxKind.EnumDeclaration:
                visitEnumDeclaration(<EnumDeclaration>node);
                break;
                
            case SyntaxKind.InterfaceDeclaration:
                visitInterfaceDeclaration(<InterfaceDeclaration>node);
                break;

            case SyntaxKind.TypeAliasDeclaration:
                visitTypeAliasDeclaration(<TypeAliasDeclaration>node);
                break;
        }
    }
    
    function visitModuleDeclaration(node: ModuleDeclaration) {
        let name = node.name;
        let symbol = checker.getSymbolAtLocation(name);
        if (symbol.name === "ts") {
            tsModuleSymbol = checker.getSymbolAtLocation(name);
            forEachChild(node, visit);
        }
    }
    
    function visitEnumDeclaration(node: EnumDeclaration) {
        let name = node.name;
        let symbol = checker.getSymbolAtLocation(name);
        if (symbol.name === "SyntaxKind") {
            syntaxKindSymbol = symbol;
            for (let name in syntaxKindSymbol.exports) {
                let exportedSymbol = getProperty(syntaxKindSymbol.exports, name);
                if (!exportedSymbol || !(exportedSymbol.flags & SymbolFlags.EnumMember)) {
                    continue;
                }
                
                let value = checker.getConstantValue(<EnumMember>exportedSymbol.declarations[0]);
                if (value !== undefined && !(value in syntaxKindValueToSymbol)) {
                    syntaxKindValueToSymbol[value] = exportedSymbol;
                }
            }
        }
    }
    
    function visitInterfaceDeclaration(node: InterfaceDeclaration) {
        let name = node.name;
        let symbol = checker.getSymbolAtLocation(name);
        if (symbol.name === "NodeArray") {
            nodeArraySymbol = symbol;
            return;
        }
        else if (symbol.name === "ModifiersArray") {
            modifiersArraySymbol = symbol;
            return;
        }
        else if (symbol.name === "Node") {
            nodeSymbol = symbol;
        }
        
        let kinds = symbol ? getKindsForSymbol(symbol) : undefined;
        if (kinds) {
            createSyntaxNodes(node, symbol, kinds);
        }
    }

    function visitTypeAliasDeclaration(node: TypeAliasDeclaration) {
        let name = node.name;
        let symbol = checker.getSymbolAtLocation(name);
        let kinds = symbol ? getKindsForSymbol(symbol) : undefined;
        if (kinds) {
            createSyntaxNodes(node, symbol, kinds);
        }
    }
    
    function createSyntaxNodes(decl: InterfaceDeclaration | TypeAliasDeclaration, symbol: Symbol, kinds: KindAnnotation[]) {
        if (getFactoryHiddenStateForSymbol(symbol) === FactoryHiddenState.Hidden) {
            return;
        }
        
        let symbolOrder = getFactoryOrder(symbol, /*inherited*/ true);
        for (let kindAnnotation of kinds) {
            let kind = kindAnnotation.kind;
            let kindSymbol = syntaxKindValueToSymbol[kind];
            recordTypeUsagesForKind(kindSymbol, symbol);
            
            let kindOrder = getFactoryOrder(kindSymbol, /*inherited*/ false);
            let type = checker.getDeclaredTypeOfSymbol(symbol);
            var members: SyntaxMember[] = [];
            for (let property of checker.getPropertiesOfType(type)) {
                // Skip any hidden properties
                if (getFactoryHiddenStateForProperty(symbol, property.name) === FactoryHiddenState.Hidden) {
                    continue;
                }
                
                // Collect information about the type
                let typeNode = getTypeNodeForProperty(property);
                let propertyIsFactoryParam = isFactoryParamProperty(symbol, property.name);
                let propertyIsNode = typeNode && isSubtypeOf(typeNode, nodeSymbol);
                let propertyIsNodeArray = typeNode && isNodeArray(typeNode);
                let propertyIsModifiersArray = typeNode && isModifiersArray(typeNode);
                if (propertyIsFactoryParam || propertyIsNodeArray || propertyIsModifiersArray || propertyIsNode) {
                    let typeName = typeNode ? normalizeTypeName(typeNode.getText()) : "any";
                    let elementTypeName = propertyIsNodeArray ? (<TypeReferenceNode>typeNode).typeArguments[0].getText() : undefined; 
                    members.push(<SyntaxMember>{
                        propertyName: property.name,
                        paramName: property.name === "arguments" ? "_arguments" : property.name,
                        typeName: typeName,
                        elementTypeName: elementTypeName,
                        isFactoryParam: propertyIsFactoryParam,
                        isNodeArray: propertyIsNodeArray,
                        isModifiersArray: propertyIsModifiersArray,
                        isNode: propertyIsNode
                    });

                    if (!propertyIsFactoryParam && (propertyIsNodeArray || propertyIsNode)) {
                        recordTypeUsageForMember(propertyIsNode ? typeName : elementTypeName);
                    }
                }
            }
            
            var overrides = kindOrder || symbolOrder;
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
            
            syntax.push(<SyntaxNode>{ 
                kind,
                kindName: kindSymbol.name,
                typeName: symbol.name,
                members,
                options: kindAnnotation.options
            });
        }
    }
    
    function recordTypeUsagesForKind(kindSymbol: Symbol, typeSymbol: Symbol) {
        memberTypeUsages[kindSymbol.name] = false;
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
        
        for (let superType of getSuperTypes(typeSymbol.declarations[0])) {
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
    
    function getFactoryHiddenStateForSymbol(symbol: Symbol): FactoryHiddenState {
        let annotation: FactoryHiddenAnnotation;
        if (annotation = findAnnotation<FactoryHiddenAnnotation>(symbol, annotation => isFactoryHiddenAnnotation(annotation) && annotation.propertyName === undefined)) {
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
            let annotation = findAnnotation<FactoryHiddenAnnotation>(source, annotation => isFactoryHiddenAnnotation(annotation) && annotation.propertyName === propertyName);
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
            
            for (let superType of getSuperTypes(source.declarations[0])) {
                getFactoryHiddenStateForPropertyWorker(superType, depth + 1);
            }
        }
    }


    function isFactoryParamProperty(container: Symbol, propertyName: string): boolean {
        if (findAnnotation(container, annotation => isFactoryParamAnnotation(annotation) && annotation.propertyName === propertyName)) {
            return true;
        }

        let property = container.members ? getProperty(container.members, propertyName) : undefined;
        if (property) {
            if (findAnnotation(property, annotation => isFactoryParamAnnotation(annotation) && annotation.propertyName === undefined)) {
                return true;
            }
        }
        else {
            for (let superType of getSuperTypes(container.declarations[0])) {
                if (isFactoryParamProperty(superType, propertyName)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    function getFactoryOrder(symbol: Symbol, inherited?: boolean): string[] {
        let annotation = findAnnotation<FactoryOrderAnnotation>(symbol, isFactoryOrderAnnotation);
        if (annotation) {
            return annotation.propertyNames;
        }
        
        let propertyNames: string[];
        if (inherited) {
            let propertyNameSet: Map<boolean>;
            for (let superType of getSuperTypes(symbol.declarations[0])) {
                let superTypeOrder = getFactoryOrder(superType, /*inherited*/ true);
                if (superTypeOrder && superTypeOrder.length > 0) {
                    if (!propertyNames) {
                        propertyNames = [];
                        propertyNameSet = {};
                    }
                    
                    for (let propertyName of superTypeOrder) {
                        if (propertyNameSet[propertyName]) {
                            continue;
                        }
                        
                        propertyNameSet[propertyName] = true;
                        propertyNames.push(propertyName);
                    }
                }
            }
        }
        
        return propertyNames;
    }
    
    function getKindsForSymbol(symbol: Symbol): KindAnnotation[] {
        return matchAnnotations<KindAnnotation>(symbol, isKindAnnotation);
    }
}

function generateFactory(outputFile: string) {
    let writer = createTextWriter(host.getNewLine());
    writer.write(`// <auto-generated />`);
    writer.writeLine();
    writer.write(`/// <reference path="parser.ts" />`);
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
    writer.decreaseIndent();
    writer.write(`}`);
    writer.writeLine();
    writeIsNodeFunctions();
    writer.decreaseIndent();
    writer.write(`}`);
    writer.writeLine();
    
    sys.writeFile(outputFile, writer.getText());

    function writeCreateAndUpdateFunctions() {
        for (let syntaxNode of syntax) {
            writeCreateFunction(syntaxNode);
            writeUpdateFunction(syntaxNode);
        }
    }
    
    function writeIsNodeFunctions() {
        for (let syntaxNode of syntax) {
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
        
        writer.write(`export function create${syntaxNode.kindName}(`);
        
        let indented = false;
        for (let i = 0; i < syntaxNode.members.length; ++i) {
            if (i > 0) {
                writer.write(`, `);
            }
            
            let member = syntaxNode.members[i];
            let paramText = 
                member.isNodeArray ? `${member.paramName}?: Array<${member.elementTypeName}>` :
                member.isModifiersArray ? `${member.paramName}?: Array<Node>` :
                `${member.paramName}?: ${member.typeName}`;
            
            if (writer.getColumn() >= columnWrap - paramText.length) {
                writer.writeLine();
                if (!indented) {
                    indented = true;
                    writer.increaseIndent();
                }
            }
            
            writer.write(paramText);
        }
        
        let returnTypeText = `): ${syntaxNode.typeName} {`;
        
        if (writer.getColumn() >= columnWrap - returnTypeText.length) {
            writer.writeLine();
            if (!indented) {
                indented = true;
                writer.increaseIndent();
            }
        }
        
        writer.write(returnTypeText);
        writer.writeLine();
        if (indented) {
            writer.decreaseIndent();
            indented = false;
        }
        
        writer.increaseIndent();
        if (syntaxNode.members.length) {
            writer.write(`let node = createNode<${syntaxNode.typeName}>(SyntaxKind.${syntaxNode.kindName});`);
            writer.writeLine();
            if (syntaxNode.members.length > 1) {
                writer.write(`if (arguments.length) {`);
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
            writer.write(`return createNode<${syntaxNode.typeName}>(SyntaxKind.${syntaxNode.kindName});`);
            writer.writeLine();
        }
    
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeIsNodeFunction(syntaxNode: SyntaxNode) {
        if (!syntaxNode.options.test) {
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
            for (let superType of getSuperTypes(typeSymbol.declarations[0])) {
                fillKindsForType(superType, kinds);
            }
        }
    }
    
    function writeIsAnyNodeFunction(typeName: string) {
        let typeNames = typeName.split(/\s*\|\s*/g);
        if (typeNames.length === 1) {
            let typeSymbol = resolveName(tsModuleSymbol.declarations[0], typeName, SymbolFlags.Type);
            if (typeSymbol && findAnnotation(typeSymbol, annotation => annotation.name === "nofactorynodetest")) {
                return;
            }
        }
        
        writer.write(`export function is${typeNames.join("Or")}(node: Node): node is ${typeNames.join(" | ")} {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`if (node) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        writer.write(`switch (node.kind) {`);
        writer.writeLine();
        writer.increaseIndent();
        
        let kinds: Symbol[] = [];
        for (let typeName of typeNames) {
            let typeSymbol = resolveName(tsModuleSymbol.declarations[0], typeName, SymbolFlags.Type);
            if (typeSymbol) {
                fillKindsForType(typeSymbol, kinds);
            }
        }

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
    
    function writeUpdateFunction(syntaxNode: SyntaxNode) {
        if (!syntaxNode.options.update || !hasChildNodes(syntaxNode)) {
            return;
        }
        
        writer.write(`export function update${syntaxNode.kindName}(node: ${syntaxNode.typeName}`);
    
        let indented = false;
        for (let i = 0; i < syntaxNode.members.length; ++i) {
            let member = syntaxNode.members[i];
            if (member.isFactoryParam) {
                continue;
            }
            
            writer.write(`, `);
            
            let paramText = 
                member.isNodeArray ? `${member.paramName}: Array<${member.elementTypeName}>` :
                member.isModifiersArray ? `${member.paramName}: Array<Node>` :
                `${member.paramName}: ${member.typeName}`;
    
            if (writer.getColumn() >= columnWrap - paramText.length) {
                writer.writeLine();
                if (!indented) {
                    indented = true;
                    writer.increaseIndent();
                }
            }
    
            writer.write(paramText);
        }
    
        let returnTypeText = `): ${syntaxNode.typeName} {`;
        if (writer.getColumn() >= columnWrap - returnTypeText.length) {
            writer.writeLine();
            if (!indented) {
                indented = true;
                writer.increaseIndent();
            }
        }
        
        writer.write(returnTypeText);
        writer.writeLine();
        if (indented) {
            writer.decreaseIndent();
            indented = false;
        }
        
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
            
            let conditionText = `${member.paramName} !== node.${member.propertyName}`;
            if (writer.getColumn() >= columnWrap - conditionText.length) {
                writer.writeLine();
                if (!indented) {
                    indented = true;
                    writer.increaseIndent();
                }
            }
    
            writer.write(conditionText);
        }
    
        writer.write(`) {`);
        writer.writeLine();
        if (indented) {
            writer.decreaseIndent();
            indented = false;
        }
        
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
    writeVisitChildrenFunction();
    writer.decreaseIndent();
    writer.write(`}`);
    writer.writeLine();
   
    sys.writeFile(outputFile, writer.getText());
    
    function writeVisitChildrenFunction() {
        writer.write(`export function visitChildren<TNode extends Node>(node: TNode, transformer: Transformer): TNode;`);
        writer.writeLine();
        writer.write(`export function visitChildren(node: Node, transformer: Transformer): Node {`);
        writer.writeLine();
        writer.increaseIndent();
    
        writer.write(`if (!node || !transformer) {`);
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
        
        for (let syntaxNode of syntax) {
            if (!hasChildNodes(syntaxNode)) {
                continue;
            }
            
            writer.write(`case SyntaxKind.${syntaxNode.kindName}:`);
            writer.writeLine();
            writer.increaseIndent();
            
            writer.write(`return factory.update${syntaxNode.kindName}(`);
            writer.writeLine();
            writer.increaseIndent();
            writer.write(`<${syntaxNode.typeName}>node`);
            
            for (let member of syntaxNode.members) {
                if (member.isFactoryParam) {
                    continue;
                }
                
                writer.write(`, `);
                writer.writeLine();
                if (member.isNodeArray) {
                    writer.write(`visitNodes((<${syntaxNode.typeName}>node).${member.propertyName}, transformer)`);
                }
                else if (member.isModifiersArray) {
                    writer.write(`<ModifiersArray>visitNodes((<${syntaxNode.typeName}>node).${member.propertyName}, transformer)`);
                }
                else {
                    writer.write(`visit((<${syntaxNode.typeName}>node).${member.propertyName}, transformer)`);
                }
            }
            
            writer.write(`);`);
            writer.writeLine();
            writer.decreaseIndent();
            writer.decreaseIndent();
        }
        
        writer.write(`default:`);
        writer.writeLine();
        writer.increaseIndent();
        writer.write(`return node;`);
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
    
function getSuperTypes(node: Declaration) {
    let superTypes: Symbol[] = [];
    let superTypeSymbolSet: boolean[] = [];

    if (isTypeAliasDeclaration(node)) {
        fillSuperTypes(node.type);
    }
    else if (isInterfaceDeclaration(node) && node.heritageClauses) {
        for (let superType of node.heritageClauses[0].types) {
            fillSuperTypes(superType);
        }
    }

    return superTypes;
    
    function fillSuperTypes(node: TypeNode) {
        if (isUnionTypeNode(node)) {
            // Flatten union types
            for (let constituentType of node.types) {
                fillSuperTypes(constituentType);
            }
        }
        else {
            // Add type references
            let symbol = isTypeReferenceNode(node) ? checker.getSymbolAtLocation(node.typeName) 
                : isExpressionWithTypeArguments(node) ? checker.getSymbolAtLocation(node.expression) 
                : undefined;
                
            if (symbol) {
                if (superTypeSymbolSet[getSymbolId(symbol)]) {
                    return;
                }
                
                superTypeSymbolSet[getSymbolId(symbol)] = true;
                superTypes.push(symbol);
            }
        }
    }
}
    
function isFactoryHiddenAnnotation(annotation: Annotation): annotation is FactoryHiddenAnnotation {
    return annotation.name === "factoryhidden";
}

function isFactoryOrderAnnotation(annotation: Annotation): annotation is FactoryOrderAnnotation {
    return annotation.name === "factoryorder";
}

function isFactoryParamAnnotation(annotation: Annotation): annotation is FactoryParamAnnotation {
    return annotation.name === "factoryparam";
}

function isKindAnnotation(annotation: Annotation): annotation is KindAnnotation {
    return annotation.name === "kind";
}

function findAnnotation<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation {
    for (let decl of symbol.declarations) {
        for (let annotation of getAnnotationsForNode(decl)) {
            if (match(annotation)) {
                return <TAnnotation>annotation;
            }
        }
    }
    
    return undefined;
}

function matchAnnotations<TAnnotation extends Annotation>(symbol: Symbol, match: (annotation: Annotation) => boolean): TAnnotation[] {
    let annotations: TAnnotation[];
    for (let decl of symbol.declarations) {
        for (let annotation of getAnnotationsForNode(decl)) {
            if (match(annotation)) {
                if (!annotations) {
                    annotations = [];
                }
                
                annotations.push(<TAnnotation>annotation);
            }
        }
    }
    
    return annotations || emptyArray;
}

function getAnnotations(symbol: Symbol): Annotation[] {
    let annotations: Annotation[];
    for (let decl of symbol.declarations) {
        let declAnnotations = getAnnotationsForNode(decl);
        if (declAnnotations !== emptyArray) {
            if (!annotations) {
                annotations = [];
            }
            for (let annotation of declAnnotations) {
                annotations.push(annotation);
            }
        }
    }
    return annotations;
}

function getAnnotationsForNode(node: Node): Annotation[] {
    let annotations = nodeAnnotations[getNodeId(node)];
    if (annotations) {
        return annotations;
    }

    let leadingCommentRanges = getLeadingCommentRanges(sourceFile.text, node.pos);
    if (leadingCommentRanges) {
        for (let range of leadingCommentRanges) {
            parseAnnotations(range);
        }
    }
    
    if (!annotations) {
        annotations = emptyArray;
    }
    
    nodeAnnotations[getNodeId(node)] = annotations;
    return annotations;
    
    function getLiteralValue(expr: Expression): any {
        switch (expr.kind) {
            case SyntaxKind.TrueKeyword: return true;
            case SyntaxKind.FalseKeyword: return false;
            case SyntaxKind.NullKeyword: return null;
            case SyntaxKind.VoidExpression: return undefined;
            case SyntaxKind.StringLiteral: return (<LiteralExpression>expr).text;
            case SyntaxKind.NoSubstitutionTemplateLiteral: return (<LiteralExpression>expr).text;
            case SyntaxKind.NumericLiteral: return Number((<LiteralExpression>expr).text);
            case SyntaxKind.PropertyAccessExpression:
                return getEnumValue(node, expr.getText());
            case SyntaxKind.ArrayLiteralExpression:
                return (<ArrayLiteralExpression>expr).elements.map(getLiteralValue);
            case SyntaxKind.ObjectLiteralExpression:
                let obj: Map<any> = {};
                for (let element of (<ObjectLiteralExpression>expr).properties) {
                    if (element.kind !== SyntaxKind.PropertyAssignment
                        || (<PropertyAssignment>element).name.kind !== SyntaxKind.Identifier) {
                        continue;
                    }
                    
                    obj[(<Identifier>(<PropertyAssignment>element).name).text] =
                        getLiteralValue((<PropertyAssignment>element).initializer);
                }
                return obj;
        }
    }
    
    function parseAnnotation(annotationSource: string) {
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
                _arguments.push(getLiteralValue(argument));
            }
            
            return createAnnotation((<Identifier>call.expression).text, _arguments);
        }
        else {
            return undefined;
        }
    }
    
    function parseAnnotations(range: CommentRange) {
        let text = sourceFile.text;
        let comment = text.substring(range.pos, range.end);
        let annotationMatch: RegExpExecArray;
        while (annotationMatch = annotationPattern.exec(comment)) {
            let annotation = parseAnnotation(annotationMatch[1]);
            if (annotation) {
                if (!annotations) {
                    annotations = [];
                }
                
                annotations.push(annotation);
            }
        }
    }
}

function getEnumValue(location: Node, name: string) {
    let qn = name.split(".");
    if (qn.length === 1) {
        return undefined;
    }
    
    let namespace: Symbol;
    if (qn.length > 2) { 
        for (let i = 0; i < qn.length - 2; i++) {
            namespace = i === 0 
                ? resolveName(location, qn[i], SymbolFlags.Namespace)
                : getSymbol(namespace.exports, qn[i], SymbolFlags.Namespace);
            
            if (!namespace) {
                return undefined;
            }
        }
    }
    
    let container = qn.length > 2
        ? getSymbol(namespace.exports, qn[qn.length - 2], SymbolFlags.Enum)
        : resolveName(location, qn[qn.length - 2], SymbolFlags.Enum);
         
    if (!container) {
        return undefined;
    }
    
    let member = getSymbol(container.exports, qn[qn.length - 1], SymbolFlags.EnumMember);
    if (!member) {
        return undefined;
    }
    
    return checker.getConstantValue(<EnumMember>member.declarations[0]);
}

function isWhiteSpace(ch: string) {
    return whitespacePattern.test(ch);
}

function isQuote(ch: string) {
    return quotePattern.test(ch);
}

function createAnnotation(name: string, _arguments: any[]): Annotation {
    switch (name) {
        case "kind":
            let options: KindOptions = { create: true, update: true, test: true };
            for (var p in _arguments[1]) {
                (<any>options)[p] = _arguments[1][p];
            }
            return <KindAnnotation>{ 
                name, 
                arguments: _arguments, 
                kind: _arguments[0], 
                options 
            };
            
        case "factoryhidden":
            if (_arguments.length >= 2 && typeof _arguments[0] === "string" && typeof _arguments[1] === "boolean") {
                return <FactoryHiddenAnnotation>{ name, arguments: _arguments, propertyName: _arguments[0], hidden: _arguments[1] };
            }
            else if (_arguments.length >= 1 && typeof _arguments[0] === "string") {
                return <FactoryHiddenAnnotation>{ name, arguments: _arguments, propertyName: _arguments[0], hidden: true };
            }
            else if (_arguments.length >= 1 && typeof _arguments[0] === "boolean") {
                return <FactoryHiddenAnnotation>{ name, arguments: _arguments, hidden: _arguments[0] };
            }
            else {
                return <FactoryHiddenAnnotation>{ name, arguments: _arguments, hidden: true };
            }
        
        case "factoryorder":
            return <FactoryOrderAnnotation>{ name, arguments: _arguments, propertyNames: _arguments };
            
        case "factoryparam":
            if (_arguments.length > 0) {
                return <FactoryParamAnnotation>{ name, arguments: _arguments, propertyName: _arguments[0] };
            }
            else {
                return <FactoryParamAnnotation>{ name, arguments: _arguments };
            }
            
        default:
            return <Annotation>{ name, arguments: _arguments };
    }
}

function getCompilerOptions() {
    let options = getDefaultCompilerOptions();
    options.noResolve = true;
    options.noLib = true;
    return options;
}

function getSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags) {
    if (symbols && meaning && hasProperty(symbols, name)) {
        let symbol = symbols[name];
        if (symbol.flags & meaning) {
            return symbol;
        }
    }
    
    return undefined;
}

function resolveName(location: Node, name: string, meaning: SymbolFlags) {
    let symbols = checker.getSymbolsInScope(location, meaning);
    for (let symbol of symbols) {
        if (symbol.name === name) {
            return symbol;
        }
    }
    
    return undefined;
}