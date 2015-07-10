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
    InterfaceDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    EnumMember,
    PropertyDeclaration,
    TypeNode,
    TypeReferenceNode,
    UnionTypeNode,
    ExpressionWithTypeArguments,
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

interface KindAnnotation extends Annotation {
    kind: SyntaxKind;
}

const columnWrap = 150;
const emptyArray: any[] = [];
const kindPattern = /@kind\s*\(\s*SyntaxKind\.(\w+)\s*\)/g;
const annotationPattern = /@(\w+)\s*(\([^)]*\))?/g;
const annotationArgumentPattern = /[(,]([^,)]+)/g;
const whitespacePattern = /\s/;
const quotePattern = /["'`]/;
const numberPattern = /^[+-]?(\d+|\d*\.\d+|\d*e\d+|0x[\da-f]+)$/i;

let file: string;
let options: CompilerOptions;
let host: CompilerHost;
let program: Program;
let checker: TypeChecker;
let sourceFile: SourceFile;
let writer: EmitTextWriter;
let tsModuleSymbol: Symbol;
let nodeSymbol: Symbol;
let nodeArraySymbol: Symbol;
let modifiersArraySymbol: Symbol;
let syntaxKindSymbol: Symbol;
let syntaxKindValueToSymbol: Symbol[] = [];
let nodeAnnotations: Annotation[][] = [];
let syntax: SyntaxNode[] = [];

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
    let output = combinePaths(inputDirectory, "factory.generated.ts");
    generate(output);
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
    
    function createSyntaxNodes(decl: InterfaceDeclaration | TypeAliasDeclaration, symbol: Symbol, kinds: SyntaxKind[]) {
        if (getFactoryHiddenStateForSymbol(symbol) === FactoryHiddenState.Hidden) {
            return;
        }
        
        let symbolOrder = getFactoryOrder(symbol, /*inherited*/ true);
        for (let kind of kinds) {
            let type = checker.getDeclaredTypeOfSymbol(symbol);
            let kindSymbol = syntaxKindValueToSymbol[kind];
            let kindOrder = getFactoryOrder(kindSymbol, /*inherited*/ false);
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
                    members.push(<SyntaxMember>{
                        propertyName: property.name,
                        paramName: property.name === "arguments" ? "_arguments" : property.name,
                        typeName: typeNode ? typeNode.getText() : "any",
                        elementTypeName: propertyIsNodeArray ? (<TypeReferenceNode>typeNode).typeArguments[0].getText() : undefined,
                        isFactoryParam: propertyIsFactoryParam,
                        isNodeArray: propertyIsNodeArray,
                        isModifiersArray: propertyIsModifiersArray,
                        isNode: propertyIsNode
                    });
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
                members
            });
        }
    }
    
    function getTypeNodeForProperty(property: Symbol) {
        return (<PropertyDeclaration>property.declarations[0]).type;
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
        
        function parseAnnotations(range: CommentRange) {
            let text = sourceFile.text;
            let comment = text.substring(range.pos, range.end);
            let annotationMatch: RegExpExecArray;
            while (annotationMatch = annotationPattern.exec(comment)) {
                let name = annotationMatch[1];
                let _arguments: (string | number | boolean)[] = [];
                if (annotationMatch[2]) {
                    let argumentMatch: RegExpExecArray;
                    let unterminatedStringLiteral: string;
                    let quoteToken: string;
                    while (argumentMatch = annotationArgumentPattern.exec(annotationMatch[2].trim())) {
                        let argumentText = argumentMatch[1];
                        let pos = 0;
                        let end = argumentText.length - 1;
                        let ch: string;
                        if (unterminatedStringLiteral) {
                            unterminatedStringLiteral += ",";
                            while (end >= 0 && whitespacePattern.test(ch = argumentText.charAt(end))) {
                                end--;
                            }
                            
                            if (ch === quoteToken) {
                                if (end > 0) {
                                    unterminatedStringLiteral += argumentText.substring(0, end);
                                }
                                
                                _arguments.push(unterminatedStringLiteral);
                                unterminatedStringLiteral = undefined;
                                quoteToken = undefined;
                            }
                            else {
                                unterminatedStringLiteral += "," + argumentText;
                            }
                            
                            continue;
                        }
                        
                        while (pos <= end && whitespacePattern.test(ch = argumentText.charAt(pos))) {
                            pos++;
                        }

                        while (end >= pos && whitespacePattern.test(argumentText.charAt(end))) {
                            end--;
                        }
                        
                        if (end < pos || end < 0) {
                            _arguments.push(undefined);
                            continue;
                        }
                        
                        if (isQuote(ch)) {
                            if (argumentText.charAt(end) === ch) {
                                _arguments.push(argumentText.substring(pos + 1, end));
                            }
                            else {
                                quoteToken = ch;
                                unterminatedStringLiteral = argumentText.substring(pos + 1);
                            }
                            
                            continue;
                        }

                        argumentText = argumentText.substring(pos, end + 1);
                        if (argumentText === "null") {
                            _arguments.push(null);
                        }
                        else if (argumentText === "undefined") {
                            _arguments.push(undefined);
                        }
                        else if (argumentText === "true") {
                            _arguments.push(true);
                        }
                        else if (argumentText === "false") {
                            _arguments.push(false);
                        }
                        else if (numberPattern.test(argumentText)) {
                            _arguments.push(Number(argumentText));
                        }
                        else {
                            _arguments.push(getConstantValue(node, argumentText));
                        }
                    }
                }
                
                if (!annotations) {
                    annotations = [];
                }
                
                annotations.push(createAnnotation(name, _arguments));
            }
        }
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
    
    function getConstantValue(location: Node, name: string) {
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
    
    function getKindsForSymbol(symbol: Symbol): SyntaxKind[] {
        let annotations = matchAnnotations<KindAnnotation>(symbol, isKindAnnotation);
        return annotations.length > 0 
            ? map(annotations, annotation => annotation.kind)
            : emptyArray;
    }
}

function generate(outputFile: string) {
    writer = createLineWrappingTextWriter(host.getNewLine(), columnWrap);
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
    }
    
    function writeCreateFunction(syntaxNode: SyntaxNode) {
        writer.write(`export function create${syntaxNode.kindName}(`);
        
        for (let member of syntaxNode.members) {
            let type = 
                member.isNodeArray ? `Array<${member.elementTypeName}>` :
                member.isModifiersArray ? `Array<Node>` :
                member.typeName; 
            
            writer.write(`${member.paramName}?: ${type}, `);
        }
        
        writer.write(`location?: TextRange): ${syntaxNode.typeName} {`);
        writer.writeLine();
    
        writer.increaseIndent();
        if (syntaxNode.members.length) {
            writer.write(`let node = createNode<${syntaxNode.typeName}>(SyntaxKind.${syntaxNode.kindName}, location);`);
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
            writer.write(`return createNode<${syntaxNode.typeName}>(SyntaxKind.${syntaxNode.kindName}, location);`);
            writer.writeLine();
        }
    
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeIsNodeFunction(syntaxNode: SyntaxNode) {
        writer.write(`export function is${syntaxNode.kindName}(node: Node): node is ${syntaxNode.typeName} {`);
        writer.writeLine();
        writer.increaseIndent();
        writer.write(`return node && node.kind === SyntaxKind.${syntaxNode.kindName};`);
        writer.writeLine();
        writer.decreaseIndent();
        writer.write(`}`);
        writer.writeLine();
    }
    
    function writeUpdateFunction(syntaxNode: SyntaxNode) {
        if (!hasChildNodes(syntaxNode)) {
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

function createAnnotation(name: string, _arguments: any[]): Annotation {
    switch (name) {
        case "kind":
            return <KindAnnotation>{ name, arguments: _arguments, kind: <SyntaxKind>_arguments[0] };
            
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