/// <reference path="checker.ts" />
/// <reference path="transforms/jsx.ts" />
/// <reference path="transforms/ts.ts" />
/// <reference path="transforms/es6.ts" />
const FORCE_TRANSFORMS = false;

/* @internal */
namespace ts {
    export let transformTime = 0;

    export type TransformationChain = (node: SourceFile, transformer: Transformer) => SourceFile;

    interface LexicalEnvironment {
        tempFlags: TempFlags;
        hoistedVariableDeclarations: VariableDeclaration[];
        hoistedFunctionDeclarations: FunctionDeclaration[];
    }

    const enum VisitFlags {
        StatementBranch = 1 << 1,
        ConciseBody = 1 << 2,
        LexicalEnvironment = 1 << 3,
        LexicalEnvironmentStarted = 1 << 4,
        LexicalEnvironmentEnded = 1 << 5,
    }

    export function getTransformationChain(options: CompilerOptions): TransformationChain {
        let jsx = options.jsx;
        let languageVersion = options.target || ScriptTarget.ES3;
        let moduleKind = options.module || ModuleKind.None;

        let transforms: TransformationChain[] = [];

        // Add the TypeScript and Module transforms to the chain.
        transforms.push(transformTypeScript);
        // // transforms.push(transformModule);

        // // Add the JSX transform to the chain.
        // if (jsx === JsxEmit.React) {
        //     transforms.push(transformJsx);
        // }

        // // Add the ES6 transform to the chain.
        // if (languageVersion < ScriptTarget.ES6) {
        //     transforms.push(transformES6);
        // }

        return chainTransformations(transforms);
    }

    export function transformFilesIfNeeded(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformationChain: TransformationChain): TransformationResult {
        let compilerOptions = host.getCompilerOptions();
        if (compilerOptions.experimentalTransforms) {
            return transformFiles(resolver, host, sourceFiles, transformationChain);
        }

        return { sourceFiles };
    }

    export function transformFiles(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformationChain: TransformationChain): TransformationResult {
        // emit output for the __extends helper function
        const extendsHelper = `
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};`;

        // emit output for the __decorate helper function
        const decorateHelper = `
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};`;

        // emit output for the __metadata helper function
        const metadataHelper = `
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};`;

        // emit output for the __param helper function
        const paramHelper = `
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};`;

        const awaiterHelper = `
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.apply(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};`;

        const exportStarHelper = `
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}`;

        let compilerOptions = host.getCompilerOptions();
        let languageVersion = compilerOptions.target || ScriptTarget.ES3;
        let transformFlags: TransformFlags;
        let generatedNameSet: Map<string>;
        let tempVariableNameSet: Map<string>;
        let nodeToGeneratedName: string[] = [];
        let nodeToGeneratedIdentifier: Identifier[] = [];
        let lexicalEnvironmentStackSize: number;
        let lexicalEnvironmentStack: LexicalEnvironment[] = [];
        let tempFlags: TempFlags;
        let hoistedVariableDeclarations: VariableDeclaration[];
        let hoistedFunctionDeclarations: FunctionDeclaration[];
        let currentSourceFile: SourceFile;
        let nodeStack: NodeStack;
        let currentVisitFlags: VisitFlags;
        let requestedVisitFlags: VisitFlags;
        let nodeTest: (node: Node) => boolean;
        let writeOffset: number;
        let originalNodes: Node[];
        let updatedNode: Node;
        let updatedNodes: Node[];
        let helpersEmitted: NodeCheckFlags;
        let assignmentSubstitutions: ((node: BinaryExpression) => Expression)[] = [];
        let bindingIdentifierSubstitutions: ((node: Identifier) => Identifier)[] = [];
        let expressionIdentifierSubstitutions: ((node: Identifier) => LeftHandSideExpression)[] = [];
        let transformer: Transformer = {
            getEmitResolver: () => resolver,
            getCompilerOptions: () => compilerOptions,
            createParentNavigator: () => nodeStack.createParentNavigator(),
            getRootNode: () => currentSourceFile,
            getParentNode: () => nodeStack.getParent(),
            getCurrentNode: () => nodeStack.getNode(),
            tryPushNode: node => nodeStack.tryPushNode(node),
            pushNode: node => nodeStack.pushNode(node),
            popNode: () => nodeStack.popNode(),
            findAncestorNode: (match: (node: Node) => boolean) => nodeStack.findAncestorNode(match),
            getDeclarationName,
            getClassMemberPrefix,
            makeUniqueName,
            getGeneratedNameForNode,
            nodeHasGeneratedName,
            createUniqueIdentifier,
            createTempVariable,
            declareLocal,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            emitEmitHelpers,
            emitExportStarHelper,
            getAssignmentSubstitution,
            setAssignmentSubstitution,
            getBindingIdentifierSubstitution,
            setBindingIdentifierSubstitution,
            getExpressionIdentifierSubstitution,
            setExpressionIdentifierSubstitution,
            startLexicalEnvironment,
            endLexicalEnvironment,
            pipeNode,
            pipeNodes,
            mapNode,
            mapNodes,
            flattenNode,
            visitNode,
            visitNodes,
            visitStatement,
            visitSourceFile,
            visitModuleBody,
            visitFunctionBody,
            visitConciseBody,
            accept(node: Node, visitor: (node: Node, write: (node: Node) => void) => void) {
                return acceptTransformer(transformer, node, visitor);
            }
        };

        return {
            sourceFiles: map(sourceFiles, transformSourceFile),
            transformationResolver: {
                getAssignmentSubstitution,
                getBindingIdentifierSubstitution,
                getExpressionIdentifierSubstitution,
            }
        };

        function transformSourceFile(sourceFile: SourceFile) {
            if (isDeclarationFile(sourceFile)) {
                return sourceFile;
            }

            currentSourceFile = sourceFile;
            generatedNameSet = {};
            tempVariableNameSet = {};
            lexicalEnvironmentStackSize = 0;
            nodeStack = createNodeStack();
            helpersEmitted = undefined;

            let visited = transformationChain(sourceFile, transformer);
            if (visited !== sourceFile) {
                visited.identifiers = assign(assign(clone(sourceFile.identifiers), generatedNameSet), tempVariableNameSet);
                updateFrom(sourceFile, visited);
            }

            currentSourceFile = undefined;
            generatedNameSet = undefined;
            tempVariableNameSet = undefined;
            lexicalEnvironmentStackSize = undefined;
            nodeStack = undefined;
            helpersEmitted = undefined;

            return visited;
        }

        function getAssignmentSubstitution(sourceFile: SourceFile): (node: BinaryExpression) => Expression {
            return assignmentSubstitutions[getNodeId(getOriginalNode(sourceFile))] || identitySubstitution;
        }

        function setAssignmentSubstitution(sourceFile: SourceFile, substitution: (node: BinaryExpression) => Expression) {
            assignmentSubstitutions[getNodeId(getOriginalNode(sourceFile))] = substitution;
        }

        function getBindingIdentifierSubstitution(sourceFile: SourceFile): (node: Identifier) => Identifier {
            return bindingIdentifierSubstitutions[getNodeId(getOriginalNode(sourceFile))] || identitySubstitution;
        }

        function setBindingIdentifierSubstitution(sourceFile: SourceFile, substitution: (node: Identifier) => Identifier): void {
            bindingIdentifierSubstitutions[getNodeId(getOriginalNode(sourceFile))] = substitution;
        }

        function getExpressionIdentifierSubstitution(sourceFile: SourceFile): (node: Identifier) => LeftHandSideExpression {
            return expressionIdentifierSubstitutions[getNodeId(getOriginalNode(sourceFile))] || identitySubstitution;
        }

        function setExpressionIdentifierSubstitution(sourceFile: SourceFile, substitution: (node: Identifier) => LeftHandSideExpression) {
            expressionIdentifierSubstitutions[getNodeId(getOriginalNode(sourceFile))] = substitution;
        }

        function identitySubstitution<T extends Node>(node: T): T {
            return node;
        }

        // Return the next available name in the pattern _a ... _z, _0, _1, ...
        // TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
        // Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
        function makeTempVariableName(flags: TempFlags): string {
            if (flags && !(tempFlags & flags)) {
                let name = flags === TempFlags._i ? "_i" : "_n";
                if (isUniqueName(name)) {
                    tempFlags |= flags;
                    return tempVariableNameSet[name] = name;
                }
            }
            while (true) {
                let count = tempFlags & TempFlags.CountMask;
                tempFlags++;
                // Skip over 'i' and 'n'
                if (count !== 8 && count !== 13) {
                    let name = count < 26
                        ? "_" + String.fromCharCode(CharacterCodes.a + count)
                        : "_" + (count - 26);
                    if (isUniqueName(name)) {
                        return tempVariableNameSet[name] = name;
                    }
                }
            }
        }

        // Generate a name that is unique within the current file and doesn't conflict with any names
        // in global scope. The name is formed by adding an '_n' suffix to the specified base name,
        // where n is a positive integer. Note that names generated by makeTempVariableName and
        // makeUniqueName are guaranteed to never conflict.
        function makeUniqueName(baseName: string): string {
            // Find the first unique 'name_n', where n is a positive number
            if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
                baseName += "_";
            }
            let i = 1;
            while (true) {
                let generatedName = baseName + i;
                if (isUniqueName(generatedName)) {
                    return generatedNameSet[generatedName] = generatedName;
                }
                i++;
            }
        }

        function getGeneratedNameForNode(node: Node) {
            let id = getNodeId(node);
            return nodeToGeneratedIdentifier[id] || (nodeToGeneratedIdentifier[id] = createIdentifier(getGeneratedNameTextForNode(node, id)));
        }

        function nodeHasGeneratedName(node: Node) {
            let id = getNodeId(node);
            return nodeToGeneratedName[id] !== undefined;
        }

        function isUniqueName(name: string): boolean {
            return !resolver.hasGlobalName(name)
                && !hasProperty(currentSourceFile.identifiers, name)
                && !hasProperty(generatedNameSet, name);
        }

        function isUniqueLocalName(name: string, container: Node): boolean {
            container = getOriginalNode(container);
            for (let node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && hasProperty(node.locals, name)) {
                    // We conservatively include alias symbols to cover cases where they're emitted as locals
                    if (node.locals[name].flags & (SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias)) {
                        return false;
                    }
                }
            }
            return true;
        }

        function getGeneratedNameTextForNode(node: Node, id: number) {
            return nodeToGeneratedName[id] || (nodeToGeneratedName[id] = unescapeIdentifier(generateNameForNode(node)));
        }

        function generateNameForNode(node: Node) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return makeUniqueName((<Identifier>node).text);
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return generateNameForModuleOrEnum(<ModuleDeclaration | EnumDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ExportDeclaration:
                    return generateNameForImportOrExportDeclaration(<ImportDeclaration | ExportDeclaration>node);
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ExportAssignment:
                    return generateNameForExportDefault();
                case SyntaxKind.ClassExpression:
                    return generateNameForClassExpression();
                case SyntaxKind.ComputedPropertyName:
                case SyntaxKind.Parameter:
                case SyntaxKind.TaggedTemplateExpression:
                    return makeTempVariableName(TempFlags.Auto);
            }
        }

        function generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
            let name = node.name.text;
            // Use module/enum name itself if it is unique, otherwise make a unique variation
            return isUniqueLocalName(name, node) ? name : makeUniqueName(name);
        }

        function generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
            let expr = getExternalModuleName(node);
            let baseName = expr.kind === SyntaxKind.StringLiteral ?
                escapeIdentifier(makeIdentifierFromModuleName((<LiteralExpression>expr).text)) : "module";
            return makeUniqueName(baseName);
        }

        function generateNameForExportDefault() {
            return makeUniqueName("default");
        }

        function generateNameForClassExpression() {
            return makeUniqueName("class");
        }

        function createParentNavigator(): ParentNavigator {
            return nodeStack.createParentNavigator();
        }

        function getRootNode(): SourceFile {
            return currentSourceFile;
        }

        function getCurrentNode(): Node {
            return nodeStack.getNode();
        }

        function getParentNode(): Node {
            return nodeStack.getParent();
        }

        function findAncestorNode<T extends Node>(match: (node: Node) => node is T): T;
        function findAncestorNode(match: (node: Node) => boolean): Node;
        function findAncestorNode(match: (node: Node) => boolean) {
            return nodeStack.findAncestorNode(match);
        }

        function getDeclarationName(node: DeclarationStatement): Identifier;
        function getDeclarationName(node: ClassLikeDeclaration): Identifier;
        function getDeclarationName(node: Declaration): DeclarationName;
        function getDeclarationName<T extends DeclarationName>(node: Declaration): T | Identifier {
            let name = node.name;
            if (name) {
                return nodeIsSynthesized(name) ? <T>name : cloneNode(<T>name);
            }
            else {
                return getGeneratedNameForNode(node);
            }
        }

        function getClassMemberPrefix(node: ClassLikeDeclaration, member: ClassElement) {
            let expression: LeftHandSideExpression = getDeclarationName(node);
            if (!(member.flags & NodeFlags.Static)) {
                expression = createPropertyAccessExpression2(
                    expression,
                    createIdentifier("prototype")
                );
            }

            return expression;
        }

        function createUniqueIdentifier(baseName: string): Identifier {
            let name = makeUniqueName(baseName);
            return createIdentifier(name);
        }

        function createTempVariable(flags?: TempFlags): Identifier {
            let name = makeTempVariableName(flags);
            return createIdentifier(name);
        }

        function declareLocal(baseName?: string): Identifier {
            let local = baseName
                ? createUniqueIdentifier(baseName)
                : createTempVariable(TempFlags.Auto);
            hoistVariableDeclaration(local);
            return local;
        }

        function hoistVariableDeclaration(name: Identifier): void {
            if (!hoistedVariableDeclarations) {
                hoistedVariableDeclarations = [];
            }

            hoistedVariableDeclarations.push(createVariableDeclaration2(name));
        }

        function hoistFunctionDeclaration(func: FunctionDeclaration): void {
            if (!hoistedFunctionDeclarations) {
                hoistedFunctionDeclarations = [];
            }

            hoistedFunctionDeclarations.push(func);
        }

        function emitEmitHelpers(write: (node: Statement) => void) {
            if (compilerOptions.noEmitHelpers) {
                return;
            }

            if (languageVersion < ScriptTarget.ES6 && shouldEmitHelper(NodeCheckFlags.EmitExtends)) {
                write(createRawStatement(extendsHelper));
                helpersEmitted |= NodeCheckFlags.EmitExtends;
            }

            if (shouldEmitHelper(NodeCheckFlags.EmitDecorate)) {
                write(createRawStatement(decorateHelper));
                helpersEmitted |= NodeCheckFlags.EmitDecorate;
            }

            if (shouldEmitHelper(NodeCheckFlags.EmitParam)) {
                write(createRawStatement(paramHelper));
                helpersEmitted |= NodeCheckFlags.EmitParam;
            }

            if (shouldEmitHelper(NodeCheckFlags.EmitAwaiter)) {
                write(createRawStatement(awaiterHelper));
                helpersEmitted |= NodeCheckFlags.EmitAwaiter;
            }
        }

        function emitExportStarHelper(write: (node: Statement) => void) {
            if (shouldEmitHelper(NodeCheckFlags.EmitExportStar)) {
                write(createRawStatement(exportStarHelper));
            }
        }

        function shouldEmitHelper(flags: NodeCheckFlags) {
            return !(helpersEmitted & flags)
                && !!(resolver.getNodeCheckFlags(currentSourceFile) & flags);
        }

        function aggregateTransformFlags(node: Node) {
            if (!node) {
                return;
            }

            aggregateTransformFlagsForThisNodeAndSubtree(node);
        }

        function aggregateTransformFlagsForThisNodeAndSubtree(node: Node) {
            if (node.transformFlags === undefined) {
                if (node.flags & NodeFlags.Ambient) {
                    // Ambient nodes are marked as TypeScript early to prevent an unnecessary walk of the tree
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }

                let transformFlagsOfChildren = aggregateTransformFlagsOfChildren(node);
                return computeTransformFlagsForNode(node, transformFlagsOfChildren);
            }

            return node.transformFlags & ~node.excludeTransformFlags;
        }

        function aggregateTransformFlagsOfChildren(node: Node) {
            let saveTransformFlags = transformFlags;
            transformFlags = 0;

            forEachChild(node, aggregateTransformFlagsForChildNode);

            let transformFlagsOfChildren = transformFlags;
            transformFlags = saveTransformFlags;

            return transformFlagsOfChildren & ~TransformFlags.NodeExcludes;
        }

        function aggregateTransformFlagsForChildNode(child: Node) {
            transformFlags |= aggregateTransformFlagsForThisNodeAndSubtree(child);
        }

        function nextNodeIsLexicalEnvironment() {
            requestedVisitFlags |= VisitFlags.LexicalEnvironment;
        }

        function nextNodeIsStatementBranch() {
            requestedVisitFlags |= VisitFlags.StatementBranch;
        }

        function nextNodeIsConciseBody() {
            requestedVisitFlags |= VisitFlags.ConciseBody;
        }

        function markLexicalEnvironmentStart() {
            currentVisitFlags |= VisitFlags.LexicalEnvironmentStarted;
        }

        function resetLexicalEnvironmentStart() {
            currentVisitFlags &= ~VisitFlags.LexicalEnvironmentStarted;
        }

        function markLexicalEnvironmentEnd() {
            currentVisitFlags |= VisitFlags.LexicalEnvironmentEnded;
        }

        function resetLexicalEnvironmentEnd() {
            currentVisitFlags &= ~VisitFlags.LexicalEnvironmentEnded;
        }

        function thisNodeIsLexicalEnvironment() {
            return !!(currentVisitFlags & VisitFlags.LexicalEnvironment);
        }

        function lexicalEnvironmentStartWasMarked() {
            return !!(currentVisitFlags & VisitFlags.LexicalEnvironmentStarted);
        }

        function lexicalEnvironmentEndWasMarked() {
            return !!(currentVisitFlags & VisitFlags.LexicalEnvironmentEnded);
        }

        function thisNodeIsStatementBranch() {
            return !!(currentVisitFlags & VisitFlags.StatementBranch);
        }

        function thisNodeIsConciseBody() {
            return !!(currentVisitFlags & VisitFlags.ConciseBody);
        }

        function writeNode(node: Node) {
            if (!node) {
                return;
            }

            Debug.assert(!nodeTest || nodeTest(node), "Wrong node type after visit.");
            aggregateTransformFlags(node);
            if (!updatedNode) {
                updatedNode = node;
            }
            else if (thisNodeIsStatementBranch()) {
                if (!updatedNodes) {
                    updatedNodes = [];
                    writeStatementNode(updatedNode);
                    updatedNode = createBlock(<Statement[]>updatedNodes);
                }
                writeStatementNode(node);
            }
            else if (thisNodeIsConciseBody()) {
                if (!updatedNodes) {
                    updatedNodes = [];
                    writeFunctionBodyNode(updatedNode);
                    updatedNode = createBlock(<Statement[]>updatedNodes);
                }
                writeFunctionBodyNode(node);
            }
            else {
                Debug.fail("Too many nodes written to output.");
            }
        }

        function writeStatementNode(node: Node) {
            Debug.assert(isStatementNode(updatedNode), "Statement expected.");
            updatedNodes.push(node);
        }

        function writeFunctionBodyNode(node: Node) {
            if (isExpressionNode(node)) {
                updatedNodes.push(createReturnStatement(node));
            }
            else {
                Debug.assert(isStatementNode(node), "Statement or expression expected.");
                updatedNodes.push(node);
            }
        }

        function writeNodeToNodeArray(node: Node) {
            if (!node) {
                return;
            }

            Debug.assert(!nodeTest || nodeTest(node), "Wrong node type after visit.");
            aggregateTransformFlags(node);
            if (updatedNodes) {
                updatedNodes.push(node);
            }
            else if (writeOffset < originalNodes.length && originalNodes[writeOffset] === node) {
                writeOffset++;
            }
            else {
                updatedNodes = originalNodes.slice(0, writeOffset);
                updatedNodes.push(node);
            }
        }

        function readNode(): Node {
            Debug.assert(!!updatedNode, "Not enough nodes written to output.");
            return updatedNode;
        }

        function readNodeArray(): NodeArray<Node> {
            if (updatedNodes) {
                return createNodeArray(updatedNodes, /*location*/ <NodeArray<Node>>originalNodes);
            }
            else if (writeOffset !== originalNodes.length) {
                return createNodeArray(originalNodes.slice(0, writeOffset), /*location*/ <NodeArray<Node>>originalNodes);
            }
            else {
                return createNodeArray(originalNodes);
            }
        }

        function visitNodeOrNodes(node: Node, nodes: Node[], start: number, count: number, visitor: (node: Node, write: (node: Node) => void) => void,
            write: (node: Node) => void, readNode?: () => Node, readNodes?: () => NodeArray<Node>, out?: Node[], test?: (node: Node) => boolean): Node | NodeArray<Node> {
            let resultNode: Node;
            let resultNodes: NodeArray<Node>;
            let savedOriginalNodes: typeof originalNodes;
            let savedWriteOffset: typeof writeOffset;
            let savedUpdatedNode: typeof updatedNode;
            let savedUpdatedNodes: typeof updatedNodes;
            let savedNodeTest: typeof nodeTest;
            let savedCurrentVisitFlags: typeof currentVisitFlags;

            // If we have no work to do, clear the requested visit flags and exit
            if (!node && !nodes) {
                // If we don't have a `read` argument, then we should not affect
                // requested flags as we are not directly manipulating nodes.
                if (readNode || readNodes) {
                    requestedVisitFlags = undefined;
                }

                return undefined;
            }

            if (!visitor) {
                visitor = identityVisitor;
            }

            // Establish the new environment, but only if we are going to read a result.
            // If we don't have a `read` argument, then we are piping values to a callback.
            if (readNode || readNodes) {
                // Preserve the previous environment on the call stack as we descend into the tree
                savedOriginalNodes = originalNodes;
                savedWriteOffset = writeOffset;
                savedUpdatedNode = updatedNode;
                savedUpdatedNodes = updatedNodes;
                savedNodeTest = nodeTest;
                savedCurrentVisitFlags = currentVisitFlags;

                originalNodes = nodes; // This will be `undefined` if visiting a single node
                writeOffset = 0;
                updatedNode = undefined;
                updatedNodes = out; // This will be `undefined` unless we are emitting nodes to an existing array.
                nodeTest = test;
                currentVisitFlags = requestedVisitFlags; // Here we copy any requested flags and reset the request.
                requestedVisitFlags = undefined;

                // These flags indicate a new lexical environment should be introduced when/if we visit the children of this node.
                if (thisNodeIsLexicalEnvironment()) {
                    pushLexicalEnvironment();
                }
            }

            // Try to push the node (or `undefined` if we are visiting an array) to the top
            // of the stack.
            // For perf reasons, we push `undefined` as the current node for an array and
            // later set it to the correctvalue for each iteration of the loop below. This
            // avoids excessive push and pop operations on `nodeStack`.
            let wasPushed = nodeStack.tryPushNode(node);

            if (node) {
                // visit the input node
                visitor(node, write);
            }
            else if (nodes) {
                // Fix start and count
                let len = nodes.length;
                start = start < 0 ? 0 : start || 0;
                count = count > len - start ? len - start : count || len - start;

                // Visit each input node
                for (let i = 0; i < count; ++i) {
                    let node = nodes[i + start];
                    nodeStack.setNode(node);
                    visitor(node, write);
                }
            }

            // If we pushed a node (or `undefined`) onto the stack, we need to
            // pop the node from the stack here.
            if (wasPushed) {
                nodeStack.popNode();
            }

            // If we don't have a `read` argument, we don't need to restore state
            if (readNode || readNodes) {
                // Read the result if the `read` callback was supplied
                if (readNode) {
                    resultNode = readNode();
                }
                else if (readNodes) {
                    resultNodes = readNodes();
                }

                // If a new lexical environment had been requested, we need to include it here
                if (thisNodeIsLexicalEnvironment()) {
                    if (hoistedVariableDeclarations || hoistedFunctionDeclarations) {
                        let statements: Statement[];
                        if (isSourceFile(resultNode) || isModuleBody(resultNode) || isFunctionBody(resultNode)) {
                            // ensure we have a fresh node
                            if (resultNode === node) {
                                resultNode = cloneNode(resultNode, /*location*/ resultNode, resultNode.flags);
                            }

                            statements = (<BlockLike>resultNode).statements;
                        }
                        else {
                            Debug.assert(isExpression(resultNode), "Expected the result of a lexical enviornment to be a SourceFile, ModuleBlock, Block, or Expression");
                            statements = [createReturnStatement(<Expression>resultNode)];
                            resultNode = createBlock(statements);
                        }

                        if (hoistedVariableDeclarations) {
                            statements.push(createVariableStatement2(createVariableDeclarationList(hoistedVariableDeclarations)));
                        }

                        if (hoistedFunctionDeclarations) {
                            statements.push(...hoistedFunctionDeclarations);
                        }
                    }

                    popLexicalEnvironment();
                }

                // Restore the previous environment
                originalNodes = savedOriginalNodes;
                writeOffset = savedWriteOffset;
                updatedNode = savedUpdatedNode;
                updatedNodes = savedUpdatedNodes;
                nodeTest = savedNodeTest;
                currentVisitFlags = savedCurrentVisitFlags;
            }

            return resultNode || resultNodes;
        }

        function pipeNodeOrNodes<TIn extends Node, TOut extends Node>(node: TIn, nodes: TIn[], start: number, count: number, through: Through<TIn, TOut>, out: ((node: TOut) => void) | TOut[]): NodeArray<TOut> {
            let write: (node: Node) => void;
            let readNodes: () => NodeArray<Node>;
            let outputArray: TOut[];
            if (typeof out === "function") {
                write = out as (node: Node) => void;
            }
            else {
                write = writeNodeToNodeArray;
                readNodes = readNodeArray;
                outputArray = out as TOut[];
            }

            return <NodeArray<TOut>>visitNodeOrNodes(node, nodes, start, count, through, write, /*readNode*/ undefined, readNodes, outputArray, /*test*/ undefined);
        }


        function identityVisitor(node: Node, write: (node: Node) => void): void {
            write(node);
        }

        function pushLexicalEnvironment(): void {
            // Save the current lexical environment. Rather than resizing the array
            // we adjust the stack size variable. This allows us to reuse existing object's we've
            // already allocated between transformations to avoid allocation and GC overhead during
            // transformation.
            let savedLexicalEnvironment: LexicalEnvironment;
            if (lexicalEnvironmentStackSize < lexicalEnvironmentStack.length) {
                savedLexicalEnvironment = lexicalEnvironmentStack[lexicalEnvironmentStackSize];
            }
            else {
                savedLexicalEnvironment = lexicalEnvironmentStack[lexicalEnvironmentStackSize] = <LexicalEnvironment>{};
            }

            savedLexicalEnvironment.tempFlags = tempFlags;
            savedLexicalEnvironment.hoistedVariableDeclarations = hoistedVariableDeclarations;
            savedLexicalEnvironment.hoistedFunctionDeclarations = hoistedFunctionDeclarations;
            lexicalEnvironmentStackSize++;

            tempFlags = 0;
            hoistedVariableDeclarations = undefined;
            hoistedFunctionDeclarations = undefined;
        }

        function popLexicalEnvironment(): void {
            // Restore the previous lexical environment.
            let savedLexicalEnvironment = lexicalEnvironmentStack[--lexicalEnvironmentStackSize];
            tempFlags = savedLexicalEnvironment.tempFlags;
            hoistedVariableDeclarations = savedLexicalEnvironment.hoistedVariableDeclarations;
            hoistedFunctionDeclarations = savedLexicalEnvironment.hoistedFunctionDeclarations;
        }

        function writeLexicalEnvironment(write: (node: Statement) => void): void {
            if (hoistedVariableDeclarations) {
                write(createVariableStatement2(createVariableDeclarationList(hoistedVariableDeclarations)));
            }

            if (hoistedFunctionDeclarations) {
                forEach(hoistedFunctionDeclarations, write);
            }
        }

        function startLexicalEnvironment(): void {
            pushLexicalEnvironment();
        }

        function endLexicalEnvironment(out: ((node: Statement) => void) | Statement[]): void {
            let write: (node: Node) => void;
            let savedUpdatedNodes = updatedNodes;
            if (typeof out === "function") {
                write = out as (node: Statement) => void;
            }
            else {
                updatedNodes = out as Statement[];
                write = writeNodeToNodeArray;
            }

            writeLexicalEnvironment(write);
            popLexicalEnvironment();

            updatedNodes = savedUpdatedNodes;
        }

        function pipeNode<TIn extends Node, TOut extends Node>(node: TIn, through: Through<TIn, TOut>, out: ((node: TOut) => void) | TOut[]): void {
            pipeNodeOrNodes(node, /*nodes*/ undefined, /*start*/ undefined, /*end*/ undefined, through, out);
        }

        function pipeNodes<TIn extends Node, TOut extends Node>(nodes: TIn[], through: Through<TIn, TOut>, out: ((node: TOut) => void) | TOut[], start?: number, count?: number): void {
            pipeNodeOrNodes(/*node*/ undefined, nodes, start, count, through, out);
        }

        function mapNode<TIn extends Node, TOut extends Node>(node: TIn, through: Through<TIn, TOut>): TOut {
            return <TOut>visitNodeOrNodes(node, /*nodes*/ undefined, /*start*/ undefined, /*end*/ undefined, through, writeNode, readNode, /*readNodes*/ undefined, /*out*/ undefined);
        }

        function mapNodes<TIn extends Node, TOut extends Node>(nodes: TIn[], through: (node: TIn, write: (node: TOut) => void) => void, start?: number, count?: number): TOut[] {
            return <NodeArray<TOut>>visitNodeOrNodes(/*node*/ undefined, nodes, start, count, through, writeNodeToNodeArray, /*readNode*/ undefined, readNodeArray, /*out*/ []);
        }

        function flattenNode<TIn extends Node, TOut extends Node>(node: TIn, through: Through<TIn, TOut>): TOut[] {
            return <NodeArray<TOut>>visitNodeOrNodes(node, /*nodes*/ undefined, /*start*/ undefined, /*end*/ undefined, through, writeNodeToNodeArray, /*readNode*/ undefined, readNodeArray, /*out*/ []);
        }

        function visitNode<T extends Node>(node: T, visitor: (node: Node, write: (node: Node) => void) => void, test: (node: Node) => node is T): T {
            return <T>visitNodeOrNodes(node, /*nodes*/ undefined, /*start*/ undefined, /*end*/ undefined, visitor, writeNode, readNode, /*readNodes*/ undefined, /*out*/ undefined, test);
        }

        function visitNodes<T extends Node>(nodes: T[], visitor: (node: Node, write: (node: Node) => void) => void, test: (node: Node) => node is T, start?: number, count?: number): NodeArray<T> {
            return <NodeArray<T>>visitNodeOrNodes(/*node*/ undefined, nodes, start, count, visitor, writeNodeToNodeArray, /*readNode*/ undefined, readNodeArray, /*out*/ undefined, test);
        }

        function visitSourceFile(node: SourceFile, visitor: (node: Node, write: (node: Node) => void) => void): SourceFile {
            requestedVisitFlags |= VisitFlags.LexicalEnvironment;
            return visitNode(node, visitor, isSourceFile);
        }

        function visitModuleBody(node: ModuleBody, visitor: (node: Node, write: (node: Node) => void) => void): ModuleBody {
            if (isModuleBlock(node)) {
                requestedVisitFlags |= VisitFlags.LexicalEnvironment;
            }

            return visitNode(node, visitor, isModuleBody);
        }

        function visitFunctionBody(node: FunctionBody, visitor: (node: Node, write: (node: Node) => void) => void): FunctionBody {
            requestedVisitFlags |= VisitFlags.LexicalEnvironment;
            return visitNode(node, visitor, isBlock);
        }

        function visitConciseBody(node: ConciseBody, visitor: (node: Node, write: (node: Node) => void) => void): ConciseBody {
            requestedVisitFlags |= VisitFlags.ConciseBody | VisitFlags.LexicalEnvironment;
            return visitNode(node, visitor, isConciseBody);
        }

        function visitStatement(node: Statement, visitor: (node: Node, write: (node: Node) => void) => void): Statement {
            requestedVisitFlags |= VisitFlags.StatementBranch;
            return visitNode(node, visitor, isStatementNode);
        }
    }

    export function chainTransformations(transformations: TransformationChain[]): TransformationChain {
        switch (transformations.length) {
            case 0: return identityTransformation;
            case 1: return createUnaryTransformationChain(transformations[0]);
            case 2: return createBinaryTransformationChain(transformations[0], transformations[1]);
            case 3: return createTrinaryTransformationChain(transformations[0], transformations[1], transformations[2]);
            default: return createNaryTransformationChain(transformations);
        }
    }

    function runTransformation(chain: TransformationChain, node: SourceFile, transformer: Transformer) {
        let start = new Date().getTime();
        let transformed = chain(node, transformer);
        transformTime += new Date().getTime() - start;
        return transformed;
    }

    function createUnaryTransformationChain(only: TransformationChain): TransformationChain {
        return (node, transformer) => {
            if (only) node = runTransformation(only, node, transformer);
            return node;
        };
    }

    function createBinaryTransformationChain(first: TransformationChain, second: TransformationChain): TransformationChain {
        return (node, transformer) => {
            if (first) node = runTransformation(first, node, transformer);
            if (second) node = runTransformation(second, node, transformer);
            return node;
        };
    }

    function createTrinaryTransformationChain(first: TransformationChain, second: TransformationChain, third: TransformationChain): TransformationChain {
        return (node, transformer) => {
            if (first) node = runTransformation(first, node, transformer);
            if (second) node = runTransformation(second, node, transformer);
            if (third) node = runTransformation(third, node, transformer);
            return node;
        };
    }

    function createNaryTransformationChain(transformations: TransformationChain[]): TransformationChain {
        return (node, transformer) => {
            for (let transformation of transformations) {
                if (transformation) node = runTransformation(transformation, node, transformer);
            }
            return node;
        };
    }

    function identityTransformation(node: SourceFile, transformer: Transformer) {
        return node;
    }
}