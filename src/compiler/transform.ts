/// <reference path="checker.ts" />
/// <reference path="transforms/ts.ts" />
/// <reference path="transforms/module/module.ts" />
/// <reference path="transforms/module/system.ts" />
/// <reference path="transforms/module/es6.ts" />
/// <reference path="transforms/jsx.ts" />
/// <reference path="transforms/es6.ts" />
const FORCE_TRANSFORMS = false;

/* @internal */
namespace ts {
    export let transformTime = 0;

    const moduleTransformationPhaseMap: Map<TransformationPhase> = {
        [ModuleKind.ES2015]: createES6ModuleTransformation,
        [ModuleKind.ES6]: createES6ModuleTransformation,
        [ModuleKind.System]: createSystemModuleTransformation,
        [ModuleKind.AMD]: createModuleTransformation,
        [ModuleKind.CommonJS]: createModuleTransformation,
        [ModuleKind.UMD]: createModuleTransformation,
        [ModuleKind.None]: createModuleTransformation,
    };

    /**
     * Represents a phase in a transformation chain. Used to initialize the transformation and
     * return the transformation for the phase.
     */
    export type TransformationPhase = (transformer: Transformer) => Transformation;

    /**
     * Represents a chain of transformation phases. Used to initialize the transformation
     * chain and return a transformation used to run each transformation for each phase
     * of the chain.
     */
    export type TransformationChain = (transformer: Transformer) => Transformation;

    /**
     * Gets the default transformation chain for the provided set of compiler options.
     */
    export function getTransformationChain(compilerOptions: CompilerOptions): TransformationChain {
        let jsx = compilerOptions.jsx;
        let languageVersion = getLanguageVersion(compilerOptions);
        let moduleKind = getModuleKind(compilerOptions);
        let phases: TransformationPhase[] = [];

        // Add the TypeScript and Module phases to the chain.
        phases.push(createTypeScriptTransformation);

        // Add the module transformation to the chain.
        phases.push(moduleTransformationPhaseMap[moduleKind]);

        // Add the JSX transform to the chain.
        if (jsx === JsxEmit.React) {
            phases.push(createJsxTransformation);
        }

        // Add the ES6 transform to the chain.
        if (languageVersion < ScriptTarget.ES6) {
            phases.push(createES6Transformation);
        }

        // Chain the transformation phases
        return chainTransformationPhases(phases);
    }

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

    export function transformFiles(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformationChain: TransformationChain): SourceFile[] {
        // This is used to aggregate transform flags across the children of a node,
        // as there is no `reduce`-like function similar to forEachChild.
        let transformFlags: TransformFlags;

        // These variables keep track of generated identifiers.
        let generatedNameSet: Map<string> = {};
        let tempVariableNameSet: Map<string> = {};
        let nodeToGeneratedName: string[] = [];
        let nodeToGeneratedIdentifier: Identifier[] = [];

        // The lexical environment stack is used to track the allocation of temporary variables
        // and the hoisting of variable and function declarations within a scope.
        let lexicalEnvironmentStackSize: number = 0;
        let lexicalEnvironmentStack: LexicalEnvironment[] = [];
        let tempFlags: TempFlags;
        let hoistedVariableDeclarations: VariableDeclaration[];
        let hoistedFunctionDeclarations: FunctionDeclaration[];

        // Visit flags are used to request and keep track of information related to
        // the current visit operation.
        let currentVisitFlags: VisitFlags;
        let requestedVisitFlags: VisitFlags;

        // This is used during a call to visitNode/visitNodes to ensure any
        // node written out during the transformation is valid.
        let nodeTest: (node: Node) => boolean;

        // These variables are used by visitNode/visitNodes to keep track of
        // differences between the source and output trees without introducing
        // new function closures on each call.
        let writeOffset: number;
        let originalNodes: Node[];
        let updatedNode: Node;
        let updatedNodes: Node[];

        // Substitutions are used by Transformation Phases to perform additional
        // transformations during final emit without further descent into the tree.
        let bindingIdentifierSubstitution: (node: Identifier) => Identifier;
        let expressionSubstitution: (node: Expression) => Expression;

        // These are flags used during various transformation phases to inform
        // later transformation phases about additional information from a transformation.
        let generatedNodeFlags: GeneratedNodeFlags[] = [];

        let nodeStack: NodeStack = createNodeStack();
        let currentSourceFile: SourceFile;
        let transformer: Transformer = {
            getEmitResolver: () => resolver,
            getCompilerOptions: () => host.getCompilerOptions(),
            getSourceFile: () => currentSourceFile,
            isUniqueName,
            getGeneratedNameForNode,
            nodeHasGeneratedName,
            createUniqueIdentifier,
            createTempVariable,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            getGeneratedNodeFlags,
            setGeneratedNodeFlags,
            getBindingIdentifierSubstitution,
            setBindingIdentifierSubstitution,
            getExpressionSubstitution,
            setExpressionSubstitution,
            startLexicalEnvironment,
            endLexicalEnvironment,
            createNodes,
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
            accept,

            // from NodeStack
            createParentNavigator: () => nodeStack.createParentNavigator(),
            getParentNode: () => nodeStack.getParentNode(),
            getCurrentNode: () => nodeStack.getCurrentNode(),
            tryPushNode: node => nodeStack.tryPushNode(node),
            pushNode: node => nodeStack.pushNode(node),
            popNode: () => nodeStack.popNode(),
            setNode: node => nodeStack.setNode(node),
            findAncestorNode: (match: (node: Node) => boolean) => nodeStack.findAncestorNode(match),
        };

        // Build the transformation pipeline using the supplied transformer.
        let transformation = transformationChain(transformer);

        // Transform each source file.
        return map(sourceFiles, transformSourceFile);

        /**
         * Transforms a source file.
         * @param sourceFile The source file to transform.
         */
        function transformSourceFile(sourceFile: SourceFile) {
            if (isDeclarationFile(sourceFile)) {
                return sourceFile;
            }

            currentSourceFile = sourceFile;

            let visited = transformation(sourceFile);
            if (visited !== sourceFile) {
                updateFrom(sourceFile, visited);
            }

            Debug.assert(nodeStack.getStackSize() === 0, "Incorrect node stack size after transformation.");
            Debug.assert(lexicalEnvironmentStackSize === 0, "Incorrect lexical environment stack size after transformation.");

            currentSourceFile = undefined;
            return visited;
        }

        /**
         * Gets additional context about a generated node.
         */
        function getGeneratedNodeFlags(node: Node) {
            let lastNode: Node;
            while (node) {
                let nodeId = getNodeId(node);
                if (nodeId in generatedNodeFlags) {
                    return generatedNodeFlags[nodeId];
                }

                lastNode = node;
                node = node.original;
            }

            return undefined;
        }

        /**
         * Sets additional contxt about a generated node.
         */
        function setGeneratedNodeFlags(node: Node, flags: GeneratedNodeFlags) {
            generatedNodeFlags[getNodeId(node)] = flags;
        }

        /**
         * Gets the current substitution for binding identifiers.
         */
        function getBindingIdentifierSubstitution(): (node: Identifier) => Identifier {
            return bindingIdentifierSubstitution;
        }

        /**
         * Sets the current substitution for binding identifiers.
         */
        function setBindingIdentifierSubstitution(substitution: (node: Identifier) => Identifier): void {
            bindingIdentifierSubstitution = substitution;
        }

        /**
         * Gets the current substitution for expressions.
         */
        function getExpressionSubstitution(): (node: Expression) => Expression {
            return expressionSubstitution;
        }

        /**
         * Sets the current substitution for expressions.
         */
        function setExpressionSubstitution(substitution: (node: Expression) => Expression): void {
            expressionSubstitution = substitution;
        }

        /**
         * Return the next available name in the pattern _a ... _z, _0, _1, ...
         * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
         * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
         */
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

        /**
         * Generate a name that is unique within the current file and doesn't conflict with any names
         * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
         * where n is a positive integer. Note that names generated by makeTempVariableName and
         * makeUniqueName are guaranteed to never conflict.
         */
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

        /**
         * Gets the generated name for a node.
         */
        function getGeneratedNameForNode(node: Node) {
            let id = getNodeId(node);
            return nodeToGeneratedIdentifier[id] || (nodeToGeneratedIdentifier[id] = generateNameForNode(node));
        }

        /**
         * Gets a value indicating whether a node has a generated name.
         */
        function nodeHasGeneratedName(node: Node) {
            let id = getNodeId(node);
            return nodeToGeneratedName[id] !== undefined;
        }

        /**
         * Tests whether the provided name is unique.
         */
        function isUniqueName(name: string): boolean {
            return !resolver.hasGlobalName(name)
                && !hasProperty(currentSourceFile.identifiers, name)
                && !hasProperty(generatedNameSet, name);
        }

        /**
         * Tests whether the provided name is unique within a container.
         */
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

        /**
         * Generates a name for a node.
         */
        function generateNameForNode(node: Node): Identifier {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return createUniqueIdentifier((<Identifier>node).text);
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
                    return createTempVariable(TempFlags.Auto);
            }
        }

        function generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
            let name = node.name;
            // Use module/enum name itself if it is unique, otherwise make a unique variation
            return isUniqueLocalName(name.text, node) ? name : createUniqueIdentifier(name.text);
        }

        function generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
            let expr = getExternalModuleName(node);
            let baseName = expr.kind === SyntaxKind.StringLiteral ?
                escapeIdentifier(makeIdentifierFromModuleName((<LiteralExpression>expr).text)) : "module";
            return createUniqueIdentifier(baseName);
        }

        function generateNameForExportDefault() {
            return createUniqueIdentifier("default");
        }

        function generateNameForClassExpression() {
            return createUniqueIdentifier("class");
        }

        function createUniqueIdentifier(baseName: string): Identifier {
            let name = makeUniqueName(baseName);
            return createIdentifier(name);
        }

        function createTempVariable(flags?: TempFlags): Identifier {
            let name = createIdentifier();
            name.tempFlags = flags;
            getNodeId(name);
            return name;
            // let name = makeTempVariableName(flags);
            // return createIdentifier(name);
        }

        /**
         * Records a hoisted variable declaration within a lexical environment.
         */
        function hoistVariableDeclaration(name: Identifier): void {
            if (!hoistedVariableDeclarations) {
                hoistedVariableDeclarations = [];
            }

            hoistedVariableDeclarations.push(createVariableDeclaration2(name));
        }

        /**
         * Records a hoisted function declaration within a lexical environment.
         */
        function hoistFunctionDeclaration(func: FunctionDeclaration): void {
            if (!hoistedFunctionDeclarations) {
                hoistedFunctionDeclarations = [];
            }

            hoistedFunctionDeclarations.push(func);
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

        /**
         * Callback used to write a one or more nodes to a single output node.
         * If more than one node is written and the output points to a Statement property of a
         * parent node, the result is lifted to a Block containing multiple statements.
         * If more than one node is written and the output points to the body of an Arrow Function,
         * the result is lifted to a Block consisting of a return statement.
         * Otherwise, If more than one node is written it is an error.
         */
        function writeNode(node: Node) {
            if (!node) {
                return;
            }

            Debug.assert(!nodeTest || nodeTest(node), `Wrong node type after visit: ${formatSyntaxKind(node.kind)}`);
            aggregateTransformFlags(node);
            if (!updatedNode) {
                updatedNode = node;
            }
            else if (currentVisitFlags & VisitFlags.StatementBranch) {
                if (!updatedNodes) {
                    updatedNodes = [];
                    writeStatementNode(updatedNode);
                    updatedNode = createBlock(<Statement[]>updatedNodes);
                }
                writeStatementNode(node);
            }
            else if (currentVisitFlags & VisitFlags.ConciseBody) {
                if (!updatedNodes) {
                    updatedNodes = [];
                    writeConciseBodyNode(updatedNode);
                    updatedNode = createBlock(<Statement[]>updatedNodes);
                }
                writeConciseBodyNode(node);
            }
            else {
                Debug.fail("Too many nodes written to output.");
            }
        }

        /**
         * Writes a node to a Statement property of a parent node.
         */
        function writeStatementNode(node: Node) {
            Debug.assert(isStatementNode(updatedNode), "Statement expected.");
            updatedNodes.push(node);
        }

        /**
         * Writes a node to a ConciseBody property of a parent ArrowFunction node.
         */
        function writeConciseBodyNode(node: Node) {
            if (isExpressionNode(node)) {
                updatedNodes.push(createReturnStatement(node));
            }
            else {
                Debug.assert(isStatementNode(node), "Statement or expression expected.");
                updatedNodes.push(node);
            }
        }

        /**
         * Writes one or more nodes to a NodeArray.
         */
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

        /**
         * Reads a single Node.
         */
        function readNode(): Node {
            return updatedNode;
        }

        /**
         * Reads one or more Nodes as a NodeArray.
         */
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

        /**
         * Executes a callback function to emit new nodes to an output array or write callback.
         * @param callback The callback to execute.
         * @param out Either an array to which to write the results, or a callback used to write the results.
         */
        function createNodes<TOut extends Node>(callback: (write: (node: TOut) => void) => void, out?: ((node: TOut) => void) | TOut[]): NodeArray<TOut> {
            let write: (node: Node) => void;
            let readNodes: () => NodeArray<Node>;
            let outputArray: TOut[];
            if (typeof out === "function") {
                write = out as (node: Node) => void;
            }
            else {
                write = writeNodeToNodeArray;
                readNodes = readNodeArray;
                outputArray = out as TOut[] || [];
            }

            // Preserve the previous environment on the call stack.
            let savedOriginalNodes = originalNodes;
            let savedWriteOffset = writeOffset;
            let savedUpdatedNode = updatedNode;
            let savedUpdatedNodes = updatedNodes;
            let savedNodeTest = nodeTest;
            let savedCurrentVisitFlags = currentVisitFlags;

            // Set the new environment.
            originalNodes = undefined;
            writeOffset = undefined;
            updatedNode = undefined;
            updatedNodes = outputArray;
            nodeTest = undefined;
            currentVisitFlags = undefined;
            requestedVisitFlags = undefined;

            // Execute the callback
            callback(write);

            // Read the result
            let resultNodes = readNodes ? readNodes() : undefined;

            // Restore the previous environment.
            originalNodes = savedOriginalNodes;
            writeOffset = savedWriteOffset;
            updatedNode = savedUpdatedNode;
            updatedNodes = savedUpdatedNodes;
            nodeTest = savedNodeTest;
            currentVisitFlags = savedCurrentVisitFlags;

            return resultNodes as NodeArray<TOut>;
        }

        /**
         * Visits either a single node or an array of nodes using a general-purpose visitor callback.
         *
         * When visiting an array of nodes, it is acceptable to write more or less nodes to the output.
         *
         * If the same values are written in the same order as the original node array, the original
         * node array is returned. If more or fewer values are written, or if any value differs from the source in order or reference
         * equality, a new node array will be returned. This is to provide reference equality for the various update functions
         * used by the accept function below.
         *
         * This function also ensures that each node is pushed onto the node stack before calling the
         * visitor, and popped off of the node stack once the visitor has returned.
         *
         * The cardinality of this function is expected to be *:* (many-to-many).
         *
         * The node test is used to enforce that each output node matches the expected kind of the
         * result.
         *
         * @param nodes The array of Nodes to visit.
         * @param visitor A callback executed to write the results of visiting each node or its children.
         * @param test A node test used to validate the result of visiting each node.
         * @param start An offset into nodes at which to start visiting.
         * @param count A the number of nodes to visit.
         */
        function visitNodeOrNodes(node: Node, nodes: Node[], start: number, count: number,
            visitor: (node: Node, write: (node: Node) => void) => void, write: (node: Node) => void,
            readNode?: () => Node, readNodes?: () => NodeArray<Node>, out?: Node[],
            test?: (node: Node) => boolean): Node | NodeArray<Node> {
            let resultNode: Node;
            let resultNodes: NodeArray<Node>;
            let savedOriginalNodes: typeof originalNodes;
            let savedWriteOffset: typeof writeOffset;
            let savedUpdatedNode: typeof updatedNode;
            let savedUpdatedNodes: typeof updatedNodes;
            let savedNodeTest: typeof nodeTest;
            let savedCurrentVisitFlags: typeof currentVisitFlags;

            Debug.assert(!(node && nodes), "`node` and `nodes` may not both be specified.");

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
                if (currentVisitFlags & VisitFlags.LexicalEnvironment) {
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
                count = count > len - start ? len - start : count === undefined ? len - start : count;

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
                if (currentVisitFlags & VisitFlags.LexicalEnvironment) {
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

            // Whenenver we empty the lexical environment stack, we need to save all temporary
            // variable names generated in the source file to prevent reuse in other steps or phases.
            if (lexicalEnvironmentStackSize === 0 && !isEmpty(tempVariableNameSet)) {
                generatedNameSet = extend(generatedNameSet, tempVariableNameSet);
                tempVariableNameSet = { };
            }
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

        function accept(node: Node, visitor: (node: Node, write: (node: Node) => void) => void) {
            if (!node) {
                return undefined;
            }

            let wasPushed = nodeStack.tryPushNode(node);
            node = acceptTransformer(transformer, node, visitor);
            if (wasPushed) {
                nodeStack.popNode();
            }

            return node;
        }
    }

    export function chainTransformationPhases(phases: TransformationPhase[]): TransformationChain {
        switch (phases.length) {
            case 0: return identityTransformationChain;
            case 1: return buildUnaryChain(phases[0]);
            case 2: return buildBinaryChain(phases[0], phases[1]);
            case 3: return buildTrinaryChain(phases[0], phases[1], phases[2]);
            default: return buildNaryChain(phases);
        }
    }

    function buildPhase(phase: TransformationPhase, transformer: Transformer) {
        if (phase) {
            let start = new Date().getTime();
            let transformation = phase(transformer);
            transformTime += new Date().getTime() - start;
            return transformation;
        }

        return undefined;
    }

    function runStep(node: SourceFile, step: Transformation) {
        if (step) {
            let start = new Date().getTime();
            let transformed = step(node);
            transformTime += new Date().getTime() - start;
            return transformed;
        }
        return node;
    }

    function identityTransformationChain(transformer: Transformer) {
        return identityTransformationStep;
    }

    function identityTransformationStep(node: SourceFile) {
        return node;
    }

    function buildUnaryChain(only: TransformationPhase): TransformationChain {
        return transformer => buildUnaryTransformation(buildPhase(only, transformer));
    }

    function buildUnaryTransformation(only: Transformation): Transformation {
        return node => runStep(node, only);
    }

    function buildBinaryChain(first: TransformationPhase, second: TransformationPhase): TransformationChain {
        return transformer => buildBinaryTransformation(buildPhase(first, transformer), buildPhase(second, transformer));
    }

    function buildBinaryTransformation(first: Transformation, second: Transformation): Transformation {
        return node => runStep(runStep(node, first), second);
    }

    function buildTrinaryChain(first: TransformationPhase, second: TransformationPhase, third: TransformationPhase): TransformationChain {
        return transformer => buildTrinaryTransformation(buildPhase(first, transformer), buildPhase(second, transformer), buildPhase(third, transformer));
    }

    function buildTrinaryTransformation(first: Transformation, second: Transformation, third: Transformation): Transformation {
        return node => runStep(runStep(runStep(node, first), second), third);
    }

    function buildNaryChain(phases: TransformationPhase[]): TransformationChain {
        return transformer => buildNaryTransformation(phases.map(phase => buildPhase(phase, transformer)));
    }

    function buildNaryTransformation(steps: Transformation[]): Transformation {
        return node => steps.reduce(runStep, node);
    }

    function formatSyntaxKind(kind: SyntaxKind) {
        let text = String(kind);
        if ((<any>ts).SyntaxKind) {
            text += " (" + (<any>ts).SyntaxKind[kind] + ")";
        }

        return text;
    }

    /**
     * Emits file prologue directives prior to a module body.
     */
    export function writePrologueDirectives(statements: NodeArray<Statement>, write: (node: Statement) => void): number {
        for (let i = 0; i < statements.length; ++i) {
            if (isPrologueDirective(statements[i])) {
                write(statements[i]);
            }
            else {
                return i;
            }
        }

        return statements.length;
    }
}