/// <reference path="factory.ts" />
/// <reference path="transform.generated.ts" />
const FORCE_TRANSFORMS = true;

/* @internal */
namespace ts {
    /**
      * Computes the transform flags for a node, given the transform flags of its subtree
      * @param node The node to analyze
      * @param subtreeFlags Transform flags computed for this node's subtree
      */
    export function computeTransformFlagsForNode(node: Node, subtreeFlags: TransformFlags) {
        let transformFlags: TransformFlags;

        // Mark transformations needed for each node
        let kind = node.kind;
        switch (kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
                return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript;

            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ComputedPropertyName:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.ForOfStatement:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;

            case SyntaxKind.YieldExpression:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6Yield;

            case SyntaxKind.ThisKeyword:
                return node.transformFlags = TransformFlags.ThisNodeIsThisKeyword;

            case SyntaxKind.SpreadElementExpression:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6SpreadElement;

            case SyntaxKind.BreakStatement:
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.ReturnStatement:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsCompletionStatement;

            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6VariableBindingPattern;

            case SyntaxKind.Decorator:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScriptDecorator;

            case SyntaxKind.ModuleDeclaration:
                return (node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript) 
                    & ~(node.excludeTransformFlags = TransformFlags.ModuleScopeExcludes);

            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.CallExpression:
                return (node.transformFlags = subtreeFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.CallOrArrayLiteralExcludes);
            
            case SyntaxKind.PropertyDeclaration:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;

            case SyntaxKind.BinaryExpression:
                if (isDestructuringAssignment(node)) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;
                }
                break;

            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.PropertySignature:
                return (node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript)
                    & ~(node.excludeTransformFlags = TransformFlags.TypeExcludes);
                    
            case SyntaxKind.Parameter:
                if ((<ParameterDeclaration>node).questionToken) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }
                
                if (subtreeFlags & TransformFlags.ContainsTypeScriptModifier) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                if ((<ParameterDeclaration>node).initializer) {
                    transformFlags |= TransformFlags.ThisNodeIsES6ParameterInitializer;
                }
                
                if ((<ParameterDeclaration>node).dotDotDotToken) {
                    transformFlags |= TransformFlags.ThisNodeIsES6RestParameter;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.ParameterScopeExcludes);

            case SyntaxKind.ArrowFunction:
                transformFlags = TransformFlags.ThisNodeIsES6;
                if (subtreeFlags & TransformFlags.SubtreeContainsLexicalThis) {
                    transformFlags |= TransformFlags.ThisNodeCapturesLexicalThis;
                }
                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.ArrowFunctionScopeExcludes);

            case SyntaxKind.FunctionExpression:
                if ((<FunctionLikeDeclaration>node).asteriskToken
                    || transformFlags & TransformFlags.SubtreeContainsES6ParameterOrCapturedThis) {
                    transformFlags |= TransformFlags.ThisNodeIsES6;
                }

                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.FunctionDeclaration:
                if (!(<MethodDeclaration>node).body) {
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }
                
                transformFlags = TransformFlags.ThisNodeIsHoistedDeclaration;
                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                if ((<FunctionLikeDeclaration>node).asteriskToken
                    || node.flags & NodeFlags.Export
                    || subtreeFlags & TransformFlags.SubtreeContainsES6ParameterOrCapturedThis) {
                    transformFlags |= TransformFlags.ThisNodeIsES6;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.VariableDeclarationList:
                transformFlags = TransformFlags.ThisNodeIsHoistedDeclaration;
                if (node.flags & (NodeFlags.Let | NodeFlags.Const)) {
                    transformFlags |= TransformFlags.ThisNodeIsES6LetOrConst;
                }
                
                return node.transformFlags = subtreeFlags | transformFlags;

            case SyntaxKind.VariableStatement:
                if (node.flags & NodeFlags.Export) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;
                }
                break;

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                transformFlags = TransformFlags.ThisNodeIsES6;
                if (subtreeFlags & TransformFlags.ContainsTypeScriptClassSyntaxExtension) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.ClassScopeExcludes);

            case SyntaxKind.HeritageClause:
                if ((<HeritageClause>node).token !== SyntaxKind.ExtendsKeyword) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                break;

            case SyntaxKind.ExpressionWithTypeArguments:
                if ((<ExpressionWithTypeArguments>node).typeArguments) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript;
                }
                
                break;

            case SyntaxKind.Constructor:
                if (!(<ConstructorDeclaration>node).body) {
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.MethodDeclaration:
                if (!(<MethodDeclaration>node).body) {
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }

                transformFlags = TransformFlags.ThisNodeIsES6;
                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }
                
                if (subtreeFlags & TransformFlags.ContainsTypeScriptDecorator
                    && (<MethodDeclaration>node).name.kind === SyntaxKind.ComputedPropertyName) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                if (subtreeFlags & TransformFlags.ContainsTypeScriptDecorator
                    && (<MethodDeclaration>node).name.kind === SyntaxKind.ComputedPropertyName) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.ExportAssignment:
                if ((<ExportAssignment>node).isExportEquals) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript;
                }
                
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;

            default:
                if (SyntaxKind.FirstTypeNode <= kind && kind <= SyntaxKind.LastTypeNode) {
                    return (node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript)
                        & ~(node.excludeTransformFlags = TransformFlags.TypeExcludes);
                }
                
                break;
        }
        
        return node.transformFlags = subtreeFlags;
    }

    export function runTransformationChain(statements: NodeArray<Statement>, chain: (statements: NodeArray<Statement>) => NodeArray<Statement>, 
        _compilerOptions: CompilerOptions, _currentSourceFile: SourceFile, _resolver: EmitResolver, _generatedNameSet: Map<string>, _nodeToGeneratedName: string[]) {
        return transform.runTransformationChain(statements, chain, _compilerOptions, _currentSourceFile, _resolver, _generatedNameSet, _nodeToGeneratedName);
    }
    
    export type Visitor = (input: Node, output: (node: Node) => void) => void;
    export type PipelineOutput<TOut extends Node> = (node: TOut) => void;
    export type Pipeline<TIn extends Node, TOut extends Node> = (input: TIn, output: PipelineOutput<TOut>) => void;
    export type NodeTest<T extends Node> = (node: Node) => node is T;
    
    
    export const enum VisitorFlags {
        NewLexicalEnvironment = 1 << 1,
        ReturnUndefinedIfEmpty = 1 << 3,
    }
    
    export namespace transform {
        // Flags enum to track count of temp variables and a few dedicated names
        const enum TempFlags {
            Auto      = 0x00000000,  // No preferred name
            CountMask = 0x0FFFFFFF,  // Temp variable counter
            _i        = 0x10000000,  // Use/preference flag for '_i'
        }

        let transformationRunning: boolean;
        let transformFlags: TransformFlags;
        let generatedNameSet: Map<string>;
        let nodeToGeneratedName: string[];
        let nodeToGeneratedIdentifier: Identifier[];
        let tempFlags: TempFlags;
        let hoistedVariableDeclarations: VariableDeclaration[];
        let hoistedFunctionDeclarations: FunctionDeclaration[];
        let compilerOptions: CompilerOptions;
        let languageVersion: ScriptTarget;
        let currentSourceFile: SourceFile;
        let resolver: EmitResolver;
        
        // node stack
        let nodeStack: NodeStack;
        
        // single node transform
        let updatedNode: Node;
        let writeNodeFastOrSlow: (node: Node) => void;
        
        // single statement transform
        let updatedStatement: Statement;
        let updatedBlock: Block;
        let writeStatementFastOrSlow: (node: Statement) => void;
        
        // multiple node transform
        let originalNodes: Node[];
        let updatedNodes: Node[];
        let offsetWritten: number;
        let writeNodeToNodeArrayFastOrSlow: (node: Node) => void;
        
        export function runTransformationChain(statements: NodeArray<Statement>, chain: (statements: NodeArray<Statement>) => NodeArray<Statement>, 
            _compilerOptions: CompilerOptions, _currentSourceFile: SourceFile, _resolver: EmitResolver, _generatedNameSet: Map<string>, _nodeToGeneratedName: string[]) {
            Debug.assert(!transformationRunning, "Transformation already running");
            initializeTransformation(_compilerOptions, _currentSourceFile, _resolver, _generatedNameSet, _nodeToGeneratedName);
            let result = chain(statements);
            cleanupTransformation();
            return result;
        }
        
        function initializeTransformation(_compilerOptions: CompilerOptions, _currentSourceFile: SourceFile, _resolver: EmitResolver, _generatedNameSet: Map<string>, 
            _nodeToGeneratedName: string[]) {
            compilerOptions = _compilerOptions;
            languageVersion = _compilerOptions.target || ScriptTarget.ES3;
            currentSourceFile = _currentSourceFile;
            resolver = _resolver;
            generatedNameSet = _generatedNameSet;
            nodeToGeneratedName = _nodeToGeneratedName;
            nodeToGeneratedIdentifier = [];
            nodeStack = createNodeStack();
            nodeStack.pushNode(_currentSourceFile);
            transformationRunning = true;
        }
        
        function cleanupTransformation() {
            compilerOptions = undefined;
            languageVersion = undefined;
            currentSourceFile = undefined;
            resolver = undefined;
            generatedNameSet = undefined;
            nodeToGeneratedName = undefined;
            nodeToGeneratedIdentifier = undefined;
            nodeStack = undefined;
            transformationRunning = false;
        }

        // Return the next available name in the pattern _a ... _z, _0, _1, ...
        // TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
        // Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
        function makeTempVariableName(flags: TempFlags): string {
            if (flags && !(tempFlags & flags)) {
                let name = flags === TempFlags._i ? "_i" : "_n";
                if (isUniqueName(name)) {
                    tempFlags |= flags;
                    return name;
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
                        return name;
                    }
                }
            }
        }
    
        // Generate a name that is unique within the current file and doesn't conflict with any names
        // in global scope. The name is formed by adding an '_n' suffix to the specified base name,
        // where n is a positive integer. Note that names generated by makeTempVariableName and
        // makeUniqueName are guaranteed to never conflict.
        export function makeUniqueName(baseName: string): string {
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
    
        export function getGeneratedNameForNode(node: Node) {
            let id = getNodeId(node);
            return nodeToGeneratedIdentifier[id] || (nodeToGeneratedIdentifier[id] = factory.createIdentifier(getGeneratedNameTextForNode(node, id)));
        }
        
        export function nodeHasGeneratedName(node: Node) {
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
        
        export function getEmitResolver(): EmitResolver {
            return resolver;
        }
        
        export function getCompilerOptions(): CompilerOptions {
            return compilerOptions;
        }
        
        export function createParentNavigator(): ParentNavigator {
            return nodeStack.createParentNavigator();
        }
        
        export function getCurrentNode(): Node {
            return nodeStack.getNode();
        }
        
        export function getParentNode(): Node {
            return nodeStack.getParent();
        }
        
        export function findAncestorNode<T extends Node>(match: (node: Node) => node is T): T;
        export function findAncestorNode(match: (node: Node) => boolean): Node;
        export function findAncestorNode(match: (node: Node) => boolean) {
            return nodeStack.findAncestorNode(match);
        }
        
        export function getDeclarationName(node: DeclarationStatement): Identifier;
        export function getDeclarationName(node: ClassLikeDeclaration): Identifier;
        export function getDeclarationName(node: Declaration): DeclarationName;
        export function getDeclarationName<T extends DeclarationName>(node: Declaration): T | Identifier {
            let name = node.name;
            if (name) {
                return nodeIsSynthesized(name) ? <T>name : factory.cloneNode(<T>name);
            }
            else {
                return getGeneratedNameForNode(node);
            }
        }
    
        export function getClassMemberPrefix(node: ClassLikeDeclaration, member: ClassElement) {
            let expression: Expression = getDeclarationName(node);
            if (!(member.flags & NodeFlags.Static)) {
                expression = factory.createPropertyAccessExpression2(
                    expression,
                    factory.createIdentifier("prototype")
                );
            }
    
            return expression;
        }
    
        export function createUniqueIdentifier(baseName: string): Identifier {
            let name = makeUniqueName(baseName);
            return factory.createIdentifier(name);
        }
    
        export function createTempVariable(loopVariable: boolean): Identifier {
            let name = makeTempVariableName(loopVariable ? TempFlags._i : TempFlags.Auto);
            return factory.createIdentifier(name);
        }
    
        export function declareLocal(baseName?: string): Identifier {
            let local = baseName
                ? createUniqueIdentifier(baseName)
                : createTempVariable(/*loopVariable*/ false);
            hoistVariableDeclaration(local);
            return local;
        }
    
        export function hoistVariableDeclaration(name: Identifier): void {
            if (!hoistedVariableDeclarations) {
                hoistedVariableDeclarations = [];
            }
    
            hoistedVariableDeclarations.push(factory.createVariableDeclaration2(name));
        }
    
        export function hoistFunctionDeclaration(func: FunctionDeclaration): void {
            if (!hoistedFunctionDeclarations) {
                hoistedFunctionDeclarations = [];
            }
    
            hoistedFunctionDeclarations.push(func);
        }
    
        export function childNodeStartPositionIsOnSameLine(parent: Node, child: Node) {
            if (nodeIsSynthesized(child)) {
                return !(<SynthesizedNode>child).startsOnNewLine;
            }
            if (nodeIsSynthesized(parent)) {
                return false;
            }
            return getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, parent.pos)) ===
                getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, child.pos));
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
        
        function verifyNode<TOut extends Node>(node: Node, nodeTestCallback: (node: Node) => node is TOut): node is TOut {
            if (!nodeTestCallback(node)) {
                Debug.fail("Incorrect node kind after visit");
                return false;
            }
            return true;
        }
        
        function writeNodeToPipeline<TOut extends Node>(node: Node, output: (node: TOut) => void, nodeTest: (node: Node) => node is TOut): void {
            if (!node) {
                return;
            }
            
            if (verifyNode(node, nodeTest)) {
                output(node);
            }
        }
        
        /**
         * A function passed to a visitor callback that can be used to write a single node.
         * @param node The node to write
         * @remarks This function forwards `node` on either the `writeOneNodeSlow` or 
         * `writeOneNodeFast` functions by way of the `writeOneNode` variable. This is intended 
         * as a performance optimization to avoid repetitive checks in a tight loop.
         */
        function writeNode(node: Node) {
            if (!node) {
                return;
            }
    
            aggregateTransformFlags(node);
            writeNodeFastOrSlow(node);
        }
        
        function writeNodeSlow(node: Node) {
            updatedNode = node;
            writeNodeFastOrSlow = writeNodeFast;
        }
        
        function writeNodeFast(node: Node) {
            Debug.fail("Node already written");
        }
        
        function readNode(): Node {
            return updatedNode;
        }
        
        function writeStatement(node: Statement) {
            if (!node) {
                return;
            }
            
            aggregateTransformFlags(node);
            writeStatementFastOrSlow(node);
        }
        
        function writeStatementSlow(node: Statement) {
            if (!updatedStatement) {
                updatedStatement = node;
            }
            else {
                updatedBlock = factory.createBlock([updatedStatement, node]);
                updatedStatement = undefined;
                writeStatementFastOrSlow = writeStatementFast;
            }
        }
        
        function writeStatementFast(node: Statement) {
            updatedBlock.statements.push(node);
        }
        
        function readStatement(): Statement {
            return updatedBlock || updatedStatement;
        }
        
        function writeNodeToNodeArray(node: Node) {
            if (!node) {
                return;
            }
            
            aggregateTransformFlags(node);
            writeNodeToNodeArrayFastOrSlow(node);
        }
        
        function writeNodeToNodeArraySlow(node: Node) {
            if (offsetWritten === originalNodes.length || originalNodes[offsetWritten] !== node) {
                updatedNodes = originalNodes.slice(0, offsetWritten);
                updatedNodes.push(node);
                writeNodeToNodeArrayFastOrSlow = writeNodeToNodeArrayFast;
            }
            else {
                offsetWritten++;
            }
        }
        
        function writeNodeToNodeArrayFast(node: Node) {
            updatedNodes.push(node);
        }
        
        function readNodeArray(flags: VisitorFlags): NodeArray<Node> {
            if (updatedNodes) {
                return factory.createNodeArray(updatedNodes, /*location*/ <NodeArray<Node>>originalNodes);
            }
            else if (offsetWritten !== originalNodes.length) {
                if (offsetWritten === 0 && (flags & VisitorFlags.ReturnUndefinedIfEmpty)) {
                    return undefined;
                }
                else {
                    return factory.createNodeArray(originalNodes.slice(0, offsetWritten), /*location*/ <NodeArray<Node>>originalNodes);
                }
            }
            else {
                return factory.createNodeArray(originalNodes);
            }
        }
        
        function addNodeTestToPipeline<TOut extends Node>(output: (node: TOut) => void, nodeTest: (node: Node) => node is TOut): (node: TOut) => void {
            return (node: Node) => writeNodeToPipeline<TOut>(node, output, nodeTest);
        }
        
       /**
          * Pipes an input node (or nodes) into an output callback by passing it through a visitor callback.
          * @remarks
          * The primary responsibility of `pipeOneOrMany` is to execute the `visitor` callback for each
          * input node, passing the input node and the output callback.
          * This function also manages when new lexical environments are introduced, and tracks temporary 
          * variables and hoisted variable and function declarations.
          */
        function pipeOneOrMany<TIn extends Node, TOut extends Node>(inputNode: TIn, inputNodes: TIn[], pipeline: Visitor, output: (node: TOut) => void, flags: VisitorFlags, nodeTest: (node: Node) => node is TOut): void {
            if (!inputNode && !inputNodes) {
                return;
            }
    
            // Preserve the current environment on the call stack as we descend into the tree
            let savedTempFlags: number;
            let savedHoistedVariableDeclarations: VariableDeclaration[];
            let savedHoistedFunctionDeclarations: FunctionDeclaration[];
            
            // If we are starting a new lexical environment, we need to reinitialize the lexical
            // environment state as well
            if (flags & VisitorFlags.NewLexicalEnvironment) {
                savedTempFlags = tempFlags;
                savedHoistedVariableDeclarations = hoistedVariableDeclarations;
                savedHoistedFunctionDeclarations = hoistedFunctionDeclarations;
                
                tempFlags = 0;
                hoistedVariableDeclarations = undefined;
                hoistedFunctionDeclarations = undefined;
            }
            
            // If a node test was supplied, we need to wrap the output with an assertion
            if (nodeTest) {
                output = addNodeTestToPipeline(output, nodeTest);
            }
            
            if (inputNode) {
                let nodeWasPushed = nodeStack.tryPushNode(inputNode);
                pipeline(inputNode, output);
                if (nodeWasPushed) {
                    nodeStack.popNode();
                }
            }
            else {
                // For perf reasons, we push `undefined` as the current node and set it to the correct 
                // value for each iteration of the loop below. This avoids excessive push and pop
                // operations on `nodeStack`.
                nodeStack.pushNode(/*node*/ undefined);
                
                // Visit each input node
                for (let node of inputNodes) {
                    nodeStack.setNode(node);
                    pipeline(node, output);
                }
                
                // For the perf reasons mentioned above, we pop the current node at the end of the loop.
                nodeStack.popNode();
            }
            
            // If we established a new lexical environment, we need to write any hoisted variables or
            // function declarations to the end of the output.
            if (flags & VisitorFlags.NewLexicalEnvironment) {
                if (hoistedVariableDeclarations) {
                    var stmt = factory.createVariableStatement2(factory.createVariableDeclarationList(hoistedVariableDeclarations));
                    output(<TOut><Node>stmt);
                }
                else if (hoistedFunctionDeclarations) {
                    for (let decl of hoistedFunctionDeclarations) {
                        output(<TOut><Node>decl);
                    }
                }
                
                // Restore the previous lexical environment
                tempFlags = savedTempFlags;
                hoistedVariableDeclarations = savedHoistedVariableDeclarations;
                hoistedFunctionDeclarations = savedHoistedFunctionDeclarations;
            }
        }

        function emitOneOrMany<TIn extends Node, TOut extends Node>(inputNode: TIn, inputNodes: TIn[], pipeline: Pipeline<TIn, TOut>, output: TOut[], flags: VisitorFlags, nodeTest: (node: Node) => node is TOut): TOut[] {
            // Exit early if we have nothing to do
            if (!inputNode && !inputNodes) {
                return undefined;
            }
            
            // Preserve the current environment on the call stack as we descend into the tree
            let savedOriginalNodes = originalNodes;
            let savedUpdatedNodes = updatedNodes;
            let savedOffsetWritten = offsetWritten;
            let savedWriteNodeToNodeArrayFastOrSlow = writeNodeToNodeArrayFastOrSlow;
            
            // Establish the new environment
            originalNodes = undefined;
            updatedNodes = output;
            offsetWritten = 0;
            writeNodeToNodeArrayFastOrSlow = writeNodeToNodeArrayFast;
            
            pipeOneOrMany<TIn, TOut>(inputNode, inputNodes, pipeline, writeNodeToNodeArray, flags, nodeTest);
            
            // Restore previous environment
            originalNodes = savedOriginalNodes;
            updatedNodes = savedUpdatedNodes;
            offsetWritten = savedOffsetWritten;
            writeNodeToNodeArrayFastOrSlow = savedWriteNodeToNodeArrayFastOrSlow;
            
            return output;
        }
        
        /**
        * Pipelines the results of visiting a single input node to an output callback function.
        * @param input The source node to visit.
        * @param pipeline The callback to execute as we visit each node in the source.
        * @param output The callback passed to `visitor` to write each visited node.
        * @param flags Flags that affect the pipeline.
        */
        export function pipeNode<TIn extends Node, TOut extends Node>(input: TIn, pipeline: Pipeline<TIn, TOut>, output: PipelineOutput<TOut>, flags?: VisitorFlags, nodeTest?: NodeTest<TOut>): void {
            pipeOneOrMany(input, undefined, pipeline, output, flags, nodeTest); 
        }
        
        /**
        * Pipelines the results of visiting each node from an input source to an output callback function.
        * @param input The source nodes to visit.
        * @param pipeline The callback to execute as we visit each node in the source.
        * @param output The callback passed to `visitor` to write each visited node.
        * @param flags Flags that affect the pipeline.
        */
        export function pipeNodes<TIn extends Node, TOut extends Node>(input: TIn[], pipeline: Pipeline<TIn, TOut>, output: PipelineOutput<TOut>, flags?: VisitorFlags, nodeTest?: NodeTest<TOut>): void {
            pipeOneOrMany(undefined, input, pipeline, output, flags, nodeTest);
        }
        
        /**
        * Writes the result from visiting a single input node to an output node array.
        * @param input The source node to visit.
        * @param pipeline The callback to execute as we visit each node in the source.
        * @param output The destination node array to which to write the results from visiting each node.
        * @param flags Flags that affect the pipeline.
        */
        export function emitNode<TIn extends Node, TOut extends Node>(input: TIn, pipeline: Pipeline<TIn, TOut>, output: TOut[], flags?: VisitorFlags, nodeTest?: NodeTest<TOut>): void {
            emitOneOrMany(input, undefined, pipeline, output, flags, nodeTest);
        }
        
        /**
        * Writes the result from visiting each node from an input source to an output node array.
        * @param input The source nodes to visit.
        * @param pipeline The callback to execute as we visit each node in the source.
        * @param output The destination node array to which to write the results from visiting each node.
        * @param flags Flags that affect the pipeline.
        */
        export function emitNodes<TIn extends Node, TOut extends Node>(input: TIn[], pipeline: Pipeline<TIn, TOut>, output: TOut[], flags?: VisitorFlags, nodeTest?: NodeTest<TOut>): void {
            emitOneOrMany(undefined, input, pipeline, output, flags, nodeTest);
        }
        
        export function visitNode<T extends Node>(node: T, visitor: Visitor, flags?: VisitorFlags): T;
        export function visitNode<TIn extends Node, TOut extends Node>(node: TIn, visitor: Visitor, flags?: VisitorFlags, nodeTest?: (node: Node) => node is TOut): TOut;
        export function visitNode<TIn extends Node, TOut extends Node>(node: TIn, visitor: Visitor, flags?: VisitorFlags, nodeTest?: (node: Node) => node is TOut): TOut {
            if (!node) {
                return undefined;
            }
            
            let savedUpdatedNode = updatedNode;
            let savedWriteOneNode = writeNodeFastOrSlow;
            updatedNode = undefined;
            writeNodeFastOrSlow = writeNodeSlow;
            
            pipeNode<TIn, TOut>(node, visitor, writeNode, flags, nodeTest);
            
            let visited = <TOut>readNode();
            updatedNode = savedUpdatedNode;
            writeNodeFastOrSlow = savedWriteOneNode;
            
            return visited;
        }
    
        export function visitStatement(node: Statement, visitor: Visitor, flags?: VisitorFlags) {
            if (!node) {
                return node;
            }
            
            let savedUpdatedStatement = updatedStatement;
            let savedUpdatedBlock = updatedBlock;
            let savedWriteOneStatement = writeStatementFastOrSlow;
            
            updatedStatement = undefined;
            updatedBlock = undefined;
            writeStatementFastOrSlow = writeStatementSlow;
    
            pipeNode<Statement, Statement>(node, visitor, writeStatement, flags, isStatementNode);
    
            let visited = readStatement();
            updatedStatement = savedUpdatedStatement;
            updatedBlock = savedUpdatedBlock;
            writeStatementFastOrSlow = savedWriteOneStatement;
            
            return visited;
        }
    
        export function visitNodes<T extends Node>(nodes: T[], visitor: Visitor, flags?: VisitorFlags): NodeArray<T>;
        export function visitNodes<TIn extends Node, TOut extends Node>(nodes: TIn[], visitor: Visitor, flags?: VisitorFlags): NodeArray<TOut>;
        export function visitNodes<TIn extends Node, TOut extends Node>(nodes: TIn[], visitor: Visitor, flags?: VisitorFlags, nodeTest?: (node: Node) => node is TOut): NodeArray<TOut> {
            // Exit early if we have nothing to do
            if (!nodes) {
                return undefined;
            }
            
            // Preserve the current environment on the call stack as we descend into the tree
            let savedOriginalNodes = originalNodes;
            let savedUpdatedNodes = updatedNodes;
            let savedOffsetWritten = offsetWritten;
            let savedWriteNodeToNodeArrayFastOrSlow = writeNodeToNodeArrayFastOrSlow;
    
            // Establish the new environment
            originalNodes = nodes;
            updatedNodes = undefined;
            offsetWritten = 0;
            writeNodeToNodeArrayFastOrSlow = writeNodeToNodeArraySlow;
            
            // Pipe each node from input into output
            pipeNodes<TIn, TOut>(nodes, visitor, writeNodeToNodeArray, flags, nodeTest);
            
            let visited = readNodeArray(flags);
    
            // Restore previous environment
            originalNodes = savedOriginalNodes;
            updatedNodes = savedUpdatedNodes;
            offsetWritten = savedOffsetWritten;
            writeNodeToNodeArrayFastOrSlow = savedWriteNodeToNodeArrayFastOrSlow;
    
            return <NodeArray<TOut>>visited;
            
            // let updatedNodes: T[];
            // //let cacheOffset = 0;
            // for (var i = 0; i < nodes.length; i++) {
            //     let node = nodes[i];
            //     // if (cache && cache.shouldCachePreviousNodes(node)) {
            //     //     if (!updatedNodes) {
            //     //         updatedNodes = nodes.slice(0, i);
            //     //     }
    
            //     //     while (cacheOffset < updatedIndex) {
            //     //         updatedNodes[cacheOffset] = cache.cacheNode(updatedNodes[cacheOffset]);
            //     //         cacheOffset++;
            //     //     }
    
            //     //     cacheOffset = updatedIndex;
            //     // }
    
            //     let updatedNode = visitNode(context, node, visitor);
            //     if (updatedNodes || !updatedNode || updatedNode !== node) {
            //         if (!updatedNodes) {
            //             updatedNodes = nodes.slice(0, i);
            //         }
            //         if (updatedNode) {
            //             if (isSynthesizedList(updatedNode)) {
            //                 let synthesizedList = <SynthesizedList<T>>updatedNode;
            //                 flattenSynthesizedList(synthesizedList, updatedNodes);
            //             }
            //             else {
            //                 updatedNodes.push(<T>updatedNode);
            //             }
            //         }
            //     }
            // }
        }
        
        export function visitNewLexicalEnvironment(node: ModuleDeclaration | ModuleBlock | Block | Expression, visitor: (input: Node, write: (node: Node) => void) => void): ModuleDeclaration | ModuleBlock | Block | Expression {
            switch (node.kind) {
                case SyntaxKind.Block:
                    return factory.updateBlock(
                        <Block>node,
                        visitNodes((<Block>node).statements, visitor, VisitorFlags.NewLexicalEnvironment)
                    );
                    
                case SyntaxKind.ModuleBlock:
                    return factory.updateModuleBlock(
                        <ModuleBlock>node,
                        visitNodes((<ModuleBlock>node).statements, visitor, VisitorFlags.NewLexicalEnvironment)
                    );
                
                default:
                    if (isExpressionNode(node)) {
                        return visitExpressionFunctionBodyInNewLexicalEnvironment(node, visitor);
                    }
                    else {
                        return visitNode(node, visitor);
                    }
            }
        }
        
        function visitExpressionFunctionBodyInNewLexicalEnvironment(node: Expression, visitor: (input: Node, write: (node: Node) => void) => void): Expression | Block {
            let savedTempFlags = tempFlags;
            let savedHoistedVariableDeclarations = hoistedVariableDeclarations;
            let savedHoistedFunctionDeclarations = hoistedFunctionDeclarations;
            tempFlags = 0;
            hoistedVariableDeclarations = undefined;
            hoistedFunctionDeclarations = undefined;
    
            let visited = visitNode(node, visitor);
            let result: Block | Expression;
            if (hoistedVariableDeclarations || hoistedFunctionDeclarations) {
                let block = factory.createBlock([]);
                if (visited) {
                    let returnStmt = factory.createReturnStatement(visited);
                    block.statements.push(returnStmt);
                }
                
                if (hoistedVariableDeclarations) {
                    block.statements.push(factory.createVariableStatement2(factory.createVariableDeclarationList(hoistedVariableDeclarations)));
                }
                
                if (hoistedFunctionDeclarations) {
                    block.statements.push(...hoistedFunctionDeclarations);
                }
                
                result = block;
            }
            else {
                result = visited;
            }
    
            tempFlags = savedTempFlags;
            hoistedVariableDeclarations = savedHoistedVariableDeclarations;
            hoistedFunctionDeclarations = savedHoistedFunctionDeclarations;
            return result;
        }
    }
}