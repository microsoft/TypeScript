/// <reference path="scanner.ts"/>
/// <reference path="utilities.ts"/>

module ts {
    var nodeConstructors = new Array<new () => Node>(SyntaxKind.Count);

    export function getNodeConstructor(kind: SyntaxKind): new () => Node {
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    }
 
    export function createNode(kind: SyntaxKind): Node {
        return new (getNodeConstructor(kind))();
    }

    function visitNode<T>(cbNode: (node: Node) => T, node: Node): T {
        if (node) {
            return cbNode(node);
        }
    }

    function visitNodeArray<T>(cbNodes: (nodes: Node[]) => T, nodes: Node[]) {
        if (nodes) {
            return cbNodes(nodes);
        }
    }

    function visitEachNode<T>(cbNode: (node: Node) => T, nodes: Node[]) {
        if (nodes) {
            for (var i = 0, len = nodes.length; i < len; i++) {
                var result = cbNode(nodes[i]);
                if (result) {
                    return result;
                }
            }
        }
    }

    // Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
    // stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
    // embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
    // a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
    export function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodeArray?: (nodes: Node[]) => T): T {
        if (!node) {
            return;
        }
        // The visitXXX functions could be written as local functions that close over the cbNode and cbNodeArray
        // callback parameters, but that causes a closure allocation for each invocation with noticeable effects
        // on performance.
        var visitNodes: (cb: (node: Node | Node[]) => T, nodes: Node[]) => T = cbNodeArray ? visitNodeArray : visitEachNode;
        var cbNodes = cbNodeArray || cbNode;
        switch (node.kind) {
            case SyntaxKind.QualifiedName:
                return visitNode(cbNode, (<QualifiedName>node).left) ||
                    visitNode(cbNode, (<QualifiedName>node).right);
            case SyntaxKind.TypeParameter:
                return visitNode(cbNode, (<TypeParameterDeclaration>node).name) ||
                    visitNode(cbNode, (<TypeParameterDeclaration>node).constraint) ||
                    visitNode(cbNode, (<TypeParameterDeclaration>node).expression);
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<VariableLikeDeclaration>node).propertyName) ||
                    visitNode(cbNode, (<VariableLikeDeclaration>node).dotDotDotToken) ||
                    visitNode(cbNode, (<VariableLikeDeclaration>node).name) ||
                    visitNode(cbNode, (<VariableLikeDeclaration>node).questionToken) ||
                    visitNode(cbNode, (<VariableLikeDeclaration>node).type) ||
                    visitNode(cbNode, (<VariableLikeDeclaration>node).initializer);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNodes(cbNodes, (<SignatureDeclaration>node).typeParameters) ||
                    visitNodes(cbNodes, (<SignatureDeclaration>node).parameters) ||
                    visitNode(cbNode, (<SignatureDeclaration>node).type);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).asteriskToken) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).name) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).questionToken) ||
                    visitNodes(cbNodes, (<FunctionLikeDeclaration>node).typeParameters) ||
                    visitNodes(cbNodes, (<FunctionLikeDeclaration>node).parameters) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).type) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).body);
            case SyntaxKind.TypeReference:
                return visitNode(cbNode, (<TypeReferenceNode>node).typeName) ||
                    visitNodes(cbNodes, (<TypeReferenceNode>node).typeArguments);
            case SyntaxKind.TypeQuery:
                return visitNode(cbNode, (<TypeQueryNode>node).exprName);
            case SyntaxKind.TypeLiteral:
                return visitNodes(cbNodes, (<TypeLiteralNode>node).members);
            case SyntaxKind.ArrayType:
                return visitNode(cbNode, (<ArrayTypeNode>node).elementType);
            case SyntaxKind.TupleType:
                return visitNodes(cbNodes, (<TupleTypeNode>node).elementTypes);
            case SyntaxKind.UnionType:
                return visitNodes(cbNodes, (<UnionTypeNode>node).types);
            case SyntaxKind.ParenthesizedType:
                return visitNode(cbNode, (<ParenthesizedTypeNode>node).type);
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return visitNodes(cbNodes, (<BindingPattern>node).elements);
            case SyntaxKind.ArrayLiteralExpression:
                return visitNodes(cbNodes, (<ArrayLiteralExpression>node).elements);
            case SyntaxKind.ObjectLiteralExpression:
                return visitNodes(cbNodes, (<ObjectLiteralExpression>node).properties);
            case SyntaxKind.PropertyAccessExpression:
                return visitNode(cbNode, (<PropertyAccessExpression>node).expression) ||
                    visitNode(cbNode, (<PropertyAccessExpression>node).name);
            case SyntaxKind.ElementAccessExpression:
                return visitNode(cbNode, (<ElementAccessExpression>node).expression) ||
                    visitNode(cbNode, (<ElementAccessExpression>node).argumentExpression);
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                return visitNode(cbNode, (<CallExpression>node).expression) ||
                    visitNodes(cbNodes, (<CallExpression>node).typeArguments) ||
                    visitNodes(cbNodes, (<CallExpression>node).arguments);
            case SyntaxKind.TaggedTemplateExpression:
                return visitNode(cbNode, (<TaggedTemplateExpression>node).tag) ||
                    visitNode(cbNode, (<TaggedTemplateExpression>node).template);
            case SyntaxKind.TypeAssertionExpression:
                return visitNode(cbNode, (<TypeAssertion>node).type) ||
                    visitNode(cbNode, (<TypeAssertion>node).expression);
            case SyntaxKind.ParenthesizedExpression:
                return visitNode(cbNode, (<ParenthesizedExpression>node).expression);
            case SyntaxKind.DeleteExpression:
                return visitNode(cbNode, (<DeleteExpression>node).expression);
            case SyntaxKind.TypeOfExpression:
                return visitNode(cbNode, (<TypeOfExpression>node).expression);
            case SyntaxKind.VoidExpression:
                return visitNode(cbNode, (<VoidExpression>node).expression);
            case SyntaxKind.PrefixUnaryExpression:
                return visitNode(cbNode, (<PrefixUnaryExpression>node).operand);
            case SyntaxKind.YieldExpression:
                return visitNode(cbNode, (<YieldExpression>node).asteriskToken) ||
                    visitNode(cbNode, (<YieldExpression>node).expression);
            case SyntaxKind.PostfixUnaryExpression:
                return visitNode(cbNode, (<PostfixUnaryExpression>node).operand);
            case SyntaxKind.BinaryExpression:
                return visitNode(cbNode, (<BinaryExpression>node).left) ||
                    visitNode(cbNode, (<BinaryExpression>node).right);
            case SyntaxKind.ConditionalExpression:
                return visitNode(cbNode, (<ConditionalExpression>node).condition) ||
                    visitNode(cbNode, (<ConditionalExpression>node).whenTrue) ||
                    visitNode(cbNode, (<ConditionalExpression>node).whenFalse);
            case SyntaxKind.SpreadElementExpression:
                return visitNode(cbNode, (<SpreadElementExpression>node).expression);
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
                return visitNodes(cbNodes, (<Block>node).statements);
            case SyntaxKind.SourceFile:
                return visitNodes(cbNodes, (<SourceFile>node).statements) ||
                    visitNode(cbNode, (<SourceFile>node).endOfFileToken);
            case SyntaxKind.VariableStatement:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<VariableStatement>node).declarationList);
            case SyntaxKind.VariableDeclarationList:
                return visitNodes(cbNodes, (<VariableDeclarationList>node).declarations);
            case SyntaxKind.ExpressionStatement:
                return visitNode(cbNode, (<ExpressionStatement>node).expression);
            case SyntaxKind.IfStatement:
                return visitNode(cbNode, (<IfStatement>node).expression) ||
                    visitNode(cbNode, (<IfStatement>node).thenStatement) ||
                    visitNode(cbNode, (<IfStatement>node).elseStatement);
            case SyntaxKind.DoStatement:
                return visitNode(cbNode, (<DoStatement>node).statement) ||
                    visitNode(cbNode, (<DoStatement>node).expression);
            case SyntaxKind.WhileStatement:
                return visitNode(cbNode, (<WhileStatement>node).expression) ||
                    visitNode(cbNode, (<WhileStatement>node).statement);
            case SyntaxKind.ForStatement:
                return visitNode(cbNode, (<ForStatement>node).initializer) ||
                    visitNode(cbNode, (<ForStatement>node).condition) ||
                    visitNode(cbNode, (<ForStatement>node).iterator) ||
                    visitNode(cbNode, (<ForStatement>node).statement);
            case SyntaxKind.ForInStatement:
                return visitNode(cbNode, (<ForInStatement>node).initializer) ||
                    visitNode(cbNode, (<ForInStatement>node).expression) ||
                    visitNode(cbNode, (<ForInStatement>node).statement);
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.BreakStatement:
                return visitNode(cbNode, (<BreakOrContinueStatement>node).label);
            case SyntaxKind.ReturnStatement:
                return visitNode(cbNode, (<ReturnStatement>node).expression);
            case SyntaxKind.WithStatement:
                return visitNode(cbNode, (<WithStatement>node).expression) ||
                    visitNode(cbNode, (<WithStatement>node).statement);
            case SyntaxKind.SwitchStatement:
                return visitNode(cbNode, (<SwitchStatement>node).expression) ||
                    visitNodes(cbNodes, (<SwitchStatement>node).clauses);
            case SyntaxKind.CaseClause:
                return visitNode(cbNode, (<CaseClause>node).expression) ||
                    visitNodes(cbNodes, (<CaseClause>node).statements);
            case SyntaxKind.DefaultClause:
                return visitNodes(cbNodes, (<DefaultClause>node).statements);
            case SyntaxKind.LabeledStatement:
                return visitNode(cbNode, (<LabeledStatement>node).label) ||
                    visitNode(cbNode, (<LabeledStatement>node).statement);
            case SyntaxKind.ThrowStatement:
                return visitNode(cbNode, (<ThrowStatement>node).expression);
            case SyntaxKind.TryStatement:
                return visitNode(cbNode, (<TryStatement>node).tryBlock) ||
                    visitNode(cbNode, (<TryStatement>node).catchClause) ||
                    visitNode(cbNode, (<TryStatement>node).finallyBlock);
            case SyntaxKind.CatchClause:
                return visitNode(cbNode, (<CatchClause>node).name) ||
                    visitNode(cbNode, (<CatchClause>node).type) ||
                    visitNode(cbNode, (<CatchClause>node).block);
            case SyntaxKind.ClassDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ClassDeclaration>node).name) ||
                    visitNodes(cbNodes, (<ClassDeclaration>node).typeParameters) ||
                    visitNodes(cbNodes, (<ClassDeclaration>node).heritageClauses) ||
                    visitNodes(cbNodes, (<ClassDeclaration>node).members);
            case SyntaxKind.InterfaceDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<InterfaceDeclaration>node).name) ||
                    visitNodes(cbNodes, (<InterfaceDeclaration>node).typeParameters) ||
                    visitNodes(cbNodes, (<ClassDeclaration>node).heritageClauses) ||
                    visitNodes(cbNodes, (<InterfaceDeclaration>node).members);
            case SyntaxKind.TypeAliasDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<TypeAliasDeclaration>node).name) ||
                    visitNode(cbNode, (<TypeAliasDeclaration>node).type);
            case SyntaxKind.EnumDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<EnumDeclaration>node).name) ||
                    visitNodes(cbNodes, (<EnumDeclaration>node).members);
            case SyntaxKind.EnumMember:
                return visitNode(cbNode, (<EnumMember>node).name) ||
                    visitNode(cbNode, (<EnumMember>node).initializer);
            case SyntaxKind.ModuleDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ModuleDeclaration>node).name) ||
                    visitNode(cbNode, (<ModuleDeclaration>node).body);
            case SyntaxKind.ImportEqualsDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ImportEqualsDeclaration>node).name) ||
                    visitNode(cbNode, (<ImportEqualsDeclaration>node).moduleReference);
            case SyntaxKind.ImportDeclaration:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ImportDeclaration>node).importClause) ||
                    visitNode(cbNode, (<ImportDeclaration>node).moduleSpecifier);
            case SyntaxKind.ImportClause:
                return visitNode(cbNode, (<ImportClause>node).name) ||
                    visitNode(cbNode, (<ImportClause>node).namedBindings);
            case SyntaxKind.NamespaceImport:
                return visitNode(cbNode, (<NamespaceImport>node).name);
            case SyntaxKind.NamedImports:
                return visitNodes(cbNodes, (<NamedImports>node).elements);
            case SyntaxKind.ImportSpecifier:
                return visitNode(cbNode, (<ImportSpecifier>node).propertyName) ||
                    visitNode(cbNode, (<ImportSpecifier>node).name);
            case SyntaxKind.ExportAssignment:
                return visitNodes(cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ExportAssignment>node).exportName);
            case SyntaxKind.TemplateExpression:
                return visitNode(cbNode, (<TemplateExpression>node).head) || visitNodes(cbNodes, (<TemplateExpression>node).templateSpans);
            case SyntaxKind.TemplateSpan:
                return visitNode(cbNode, (<TemplateSpan>node).expression) || visitNode(cbNode, (<TemplateSpan>node).literal);
            case SyntaxKind.ComputedPropertyName:
                return visitNode(cbNode, (<ComputedPropertyName>node).expression);
            case SyntaxKind.HeritageClause:
                return visitNodes(cbNodes, (<HeritageClause>node).types);
            case SyntaxKind.ExternalModuleReference:
                return visitNode(cbNode, (<ExternalModuleReference>node).expression);
        }
    }

    const enum ParsingContext {
        SourceElements,          // Elements in source file
        ModuleElements,          // Elements in module declaration
        BlockStatements,         // Statements in block
        SwitchClauses,           // Clauses in switch statement
        SwitchClauseStatements,  // Statements in switch clause
        TypeMembers,             // Members in interface or type literal
        ClassMembers,            // Members in class declaration
        EnumMembers,             // Members in enum declaration
        TypeReferences,          // Type references in extends or implements clause
        VariableDeclarations,    // Variable declarations in variable statement
        ObjectBindingElements,   // Binding elements in object binding list
        ArrayBindingElements,    // Binding elements in array binding list
        ArgumentExpressions,     // Expressions in argument list
        ObjectLiteralMembers,    // Members in object literal
        ArrayLiteralMembers,     // Members in array literal
        Parameters,              // Parameters in parameter list
        TypeParameters,          // Type parameters in type parameter list
        TypeArguments,           // Type arguments in type argument list
        TupleElementTypes,       // Element types in tuple element type list
        HeritageClauses,         // Heritage clauses for a class or interface declaration.
        ImportSpecifiers,        // Named import clause's import specifier list
        Count                    // Number of parsing contexts
    }

    const enum Tristate {
        False,
        True,
        Unknown
    }

    function parsingContextErrors(context: ParsingContext): DiagnosticMessage {
        switch (context) {
            case ParsingContext.SourceElements:         return Diagnostics.Declaration_or_statement_expected;
            case ParsingContext.ModuleElements:         return Diagnostics.Declaration_or_statement_expected;
            case ParsingContext.BlockStatements:        return Diagnostics.Statement_expected;
            case ParsingContext.SwitchClauses:          return Diagnostics.case_or_default_expected;
            case ParsingContext.SwitchClauseStatements: return Diagnostics.Statement_expected;
            case ParsingContext.TypeMembers:            return Diagnostics.Property_or_signature_expected;
            case ParsingContext.ClassMembers:           return Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected;
            case ParsingContext.EnumMembers:            return Diagnostics.Enum_member_expected;
            case ParsingContext.TypeReferences:         return Diagnostics.Type_reference_expected;
            case ParsingContext.VariableDeclarations:   return Diagnostics.Variable_declaration_expected;
            case ParsingContext.ObjectBindingElements:  return Diagnostics.Property_destructuring_pattern_expected;
            case ParsingContext.ArrayBindingElements:   return Diagnostics.Array_element_destructuring_pattern_expected;
            case ParsingContext.ArgumentExpressions:    return Diagnostics.Argument_expression_expected;
            case ParsingContext.ObjectLiteralMembers:   return Diagnostics.Property_assignment_expected;
            case ParsingContext.ArrayLiteralMembers:    return Diagnostics.Expression_or_comma_expected;
            case ParsingContext.Parameters:             return Diagnostics.Parameter_declaration_expected;
            case ParsingContext.TypeParameters:         return Diagnostics.Type_parameter_declaration_expected;
            case ParsingContext.TypeArguments:          return Diagnostics.Type_argument_expected;
            case ParsingContext.TupleElementTypes:      return Diagnostics.Type_expected;
            case ParsingContext.HeritageClauses:        return Diagnostics.Unexpected_token_expected;
            case ParsingContext.ImportSpecifiers:       return Diagnostics.Identifier_expected;
        }
    };

    export function modifierToFlag(token: SyntaxKind): NodeFlags {
        switch (token) {
            case SyntaxKind.StaticKeyword: return NodeFlags.Static;
            case SyntaxKind.PublicKeyword: return NodeFlags.Public;
            case SyntaxKind.ProtectedKeyword: return NodeFlags.Protected;
            case SyntaxKind.PrivateKeyword: return NodeFlags.Private;
            case SyntaxKind.ExportKeyword: return NodeFlags.Export;
            case SyntaxKind.DeclareKeyword: return NodeFlags.Ambient;
            case SyntaxKind.ConstKeyword: return NodeFlags.Const;
        }
        return 0;
    }

    function fixupParentReferences(sourceFile: SourceFile) {
        // normally parent references are set during binding.
        // however here SourceFile data is used only for syntactic features so running the whole binding process is an overhead.
        // walk over the nodes and set parent references
        var parent: Node = sourceFile;
        function walk(n: Node): void {
            // walk down setting parents that differ from the parent we think it should be.  This
            // allows us to quickly bail out of setting parents for subtrees during incremental 
            // parsing
            if (n.parent !== parent) {
                n.parent = parent;

                var saveParent = parent;
                parent = n;
                forEachChild(n, walk);
                parent = saveParent;
            }
        }

        forEachChild(sourceFile, walk);
    }

    export function isEvalOrArgumentsIdentifier(node: Node): boolean {
        return node.kind === SyntaxKind.Identifier &&
            ((<Identifier>node).text === "eval" || (<Identifier>node).text === "arguments");
    }

    /// Should be called only on prologue directives (isPrologueDirective(node) should be true)
    function isUseStrictPrologueDirective(sourceFile: SourceFile, node: Node): boolean {
        Debug.assert(isPrologueDirective(node));
        var nodeText = getSourceTextOfNodeFromSourceFile(sourceFile,(<ExpressionStatement>node).expression);

        // Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
        // string to contain unicode escapes (as per ES5).
        return nodeText === '"use strict"' || nodeText === "'use strict'";
    }

    interface IncrementalElement extends TextRange {
        parent?: Node;
        intersectsChange: boolean
        length?: number;
        _children: Node[];
    }

    interface IncrementalNode extends Node, IncrementalElement {
    }

    interface IncrementalNodeArray extends NodeArray<IncrementalNode>, IncrementalElement {
        length: number
    }

    // Allows finding nodes in the source file at a certain position in an efficient manner.
    // The implementation takes advantage of the calling pattern it knows the parser will
    // make in order to optimize finding nodes as quickly as possible.
    interface SyntaxCursor {
        currentNode(position: number): IncrementalNode;
    }

    const enum InvalidPosition {
        Value = -1
    }

    function createSyntaxCursor(sourceFile: SourceFile): SyntaxCursor {
        var currentArray: NodeArray<Node> = sourceFile.statements;
        var currentArrayIndex = 0;

        Debug.assert(currentArrayIndex < currentArray.length);
        var current = currentArray[currentArrayIndex];
        var lastQueriedPosition = InvalidPosition.Value;

        return {
            currentNode(position: number) {
                // Only compute the current node if the position is different than the last time 
                // we were asked.  The parser commonly asks for the node at the same position 
                // twice.  Once to know if can read an appropriate list element at a certain point,
                // and then to actually read and consume the node.
                if (position !== lastQueriedPosition) {
                    // Much of the time the parser will need the very next node in the array that 
                    // we just returned a node from.So just simply check for that case and move 
                    // forward in the array instead of searching for the node again.
                    if (current && current.end === position && currentArrayIndex < currentArray.length) {
                        currentArrayIndex++;
                        current = currentArray[currentArrayIndex];
                    }

                    // If we don't have a node, or the node we have isn't in the right position,
                    // then try to find a viable node at the position requested.
                    if (!current || current.pos !== position) {
                        findHighestListElementThatStartsAtPosition(position);
                    }
                }

                // Cache this query so that we don't do any extra work if the parser calls back 
                // into us.  Note: this is very common as the parser will make pairs of calls like
                // 'isListElement -> parseListElement'.  If we were unable to find a node when
                // called with 'isListElement', we don't want to redo the work when parseListElement
                // is called immediately after.
                lastQueriedPosition = position;

                // Either we don'd have a node, or we have a node at the position being asked for.
                Debug.assert(!current || current.pos === position);
                return <IncrementalNode>current;
            }
        };
        
        // Finds the highest element in the tree we can find that starts at the provided position.
        // The element must be a direct child of some node list in the tree.  This way after we
        // return it, we can easily return its next sibling in the list.
        function findHighestListElementThatStartsAtPosition(position: number) {
            // Clear out any cached state about the last node we found.
            currentArray = undefined;
            currentArrayIndex = InvalidPosition.Value;
            current = undefined;

            // Recurse into the source file to find the highest node at this position.
            forEachChild(sourceFile, visitNode, visitArray);

            function visitNode(node: Node) {
                if (position >= node.pos && position < node.end) {
                    // Position was within this node.  Keep searching deeper to find the node.
                    forEachChild(node, visitNode, visitArray);

                    // don't procede any futher in the search.
                    return true;
                }

                // position wasn't in this node, have to keep searching.
                return false;
            }

            function visitArray(array: NodeArray<Node>) {
                if (position >= array.pos && position < array.end) {
                    // position was in this array.  Search through this array to see if we find a
                    // viable element.
                    for (var i = 0, n = array.length; i < n; i++) {
                        var child = array[i];
                        if (child) {
                            if (child.pos === position) {
                                // Found the right node.  We're done.
                                currentArray = array;
                                currentArrayIndex = i;
                                current = child;
                                return true;
                            }
                            else {
                                if (child.pos < position && position < child.end) {
                                    // Position in somewhere within this child.  Search in it and 
                                    // stop searching in this array.
                                    forEachChild(child, visitNode, visitArray);
                                    return true;
                                }
                            }
                        }
                    }
                }

                // position wasn't in this array, have to keep searching.
                return false;
            }
        }
    }

    export function createSourceFile(filename: string, sourceText: string, languageVersion: ScriptTarget, setParentNodes = false): SourceFile {
        var parsingContext: ParsingContext;
        var identifiers: Map<string>;
        var identifierCount = 0;
        var nodeCount = 0;
        var lineStarts: number[];
        var syntacticDiagnostics: Diagnostic[];
        var scanner: Scanner;
        var token: SyntaxKind;
        var syntaxCursor: SyntaxCursor;

        // Flags that dictate what parsing context we're in.  For example:
        // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
        // that some tokens that would be considered identifiers may be considered keywords.
        //
        // When adding more parser context flags, consider which is the more common case that the 
        // flag will be in.  This should be hte 'false' state for that flag.  The reason for this is
        // that we don't store data in our nodes unless the value is in the *non-default* state.  So,
        // for example, more often than code 'allows-in' (or doesn't 'disallow-in').  We opt for 
        // 'disallow-in' set to 'false'.  Otherwise, if we had 'allowsIn' set to 'true', then almost
        // all nodes would need extra state on them to store this info.
        //
        // Note:  'allowIn' and 'allowYield' track 1:1 with the [in] and [yield] concepts in the ES6
        // grammar specification.
        //
        // An important thing about these context concepts.  By default they are effectively inherited
        // while parsing through every grammar production.  i.e. if you don't change them, then when
        // you parse a sub-production, it will have the same context values as hte parent production.
        // This is great most of the time.  After all, consider all the 'expression' grammar productions
        // and how nearly all of them pass along the 'in' and 'yield' context values:
        //
        // EqualityExpression[In, Yield] :
        //      RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] == RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] != RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] === RelationalExpression[?In, ?Yield]
        //      EqualityExpression[?In, ?Yield] !== RelationalExpression[?In, ?Yield]
        //
        // Where you have to be careful is then understanding what the points are in the grammar 
        // where the values are *not* passed along.  For example:
        //
        // SingleNameBinding[Yield,GeneratorParameter]
        //      [+GeneratorParameter]BindingIdentifier[Yield] Initializer[In]opt
        //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
        //
        // Here this is saying that if the GeneratorParameter context flag is set, that we should 
        // explicitly set the 'yield' context flag to false before calling into the BindingIdentifier
        // and we should explicitly unset the 'yield' context flag before calling into the Initializer.
        // production.  Conversely, if the GeneratorParameter context flag is not set, then we 
        // should leave the 'yield' context flag alone.
        //
        // Getting this all correct is tricky and requires careful reading of the grammar to 
        // understand when these values should be changed versus when they should be inherited.
        //
        // Note: it should not be necessary to save/restore these flags during speculative/lookahead
        // parsing.  These context flags are naturally stored and restored through normal recursive
        // descent parsing and unwinding.
        var contextFlags: ParserContextFlags;

        // Whether or not we've had a parse error since creating the last AST node.  If we have 
        // encountered an error, it will be stored on the next AST node we create.  Parse errors
        // can be broken down into three categories:
        //
        // 1) An error that occurred during scanning.  For example, an unterminated literal, or a
        //    character that was completely not understood.
        //
        // 2) A token was expected, but was not present.  This type of error is commonly produced
        //    by the 'parseExpected' function.
        //
        // 3) A token was present that no parsing function was able to consume.  This type of error
        //    only occurs in the 'abortParsingListOrMoveToNextToken' function when the parser 
        //    decides to skip the token.
        //
        // In all of these cases, we want to mark the next node as having had an error before it.
        // With this mark, we can know in incremental settings if this node can be reused, or if
        // we have to reparse it.  If we don't keep this information around, we may just reuse the
        // node.  in that event we would then not produce the same errors as we did before, causing
        // significant confusion problems.
        //
        // Note: it is necessary that this value be saved/restored during speculative/lookahead 
        // parsing.  During lookahead parsing, we will often create a node.  That node will have 
        // this value attached, and then this value will be set back to 'false'.  If we decide to
        // rewind, we must get back to the same value we had prior to the lookahead.
        //
        // Note: any errors at the end of the file that do not precede a regular node, should get
        // attached to the EOF token.
        var parseErrorBeforeNextFinishedNode: boolean;

        var sourceFile: SourceFile;

        return parseSourceFile(sourceText, setParentNodes);

        function parseSourceFile(text: string, setParentNodes: boolean): SourceFile {
            // Set our initial state before parsing.
            sourceText = text;
            parsingContext = 0;
            identifiers = {};
            lineStarts = undefined;
            syntacticDiagnostics = undefined;
            contextFlags = 0;
            parseErrorBeforeNextFinishedNode = false;

            sourceFile = <SourceFile>createNode(SyntaxKind.SourceFile, 0);
            sourceFile.referenceDiagnostics = [];
            sourceFile.parseDiagnostics = [];
            sourceFile.semanticDiagnostics = [];

            // Create and prime the scanner before parsing the source elements.
            scanner = createScanner(languageVersion, /*skipTrivia*/ true, sourceText, scanError);
            token = nextToken();

            sourceFile.flags = fileExtensionIs(filename, ".d.ts") ? NodeFlags.DeclarationFile : 0;
            sourceFile.end = sourceText.length;
            sourceFile.filename = normalizePath(filename);
            sourceFile.text = sourceText;

            sourceFile.getLineAndCharacterFromPosition = getLineAndCharacterFromSourcePosition;
            sourceFile.getPositionFromLineAndCharacter = getPositionFromSourceLineAndCharacter;
            sourceFile.getLineStarts = getLineStarts;
            sourceFile.getSyntacticDiagnostics = getSyntacticDiagnostics;
            sourceFile.update = update;

            processReferenceComments(sourceFile);

            sourceFile.statements = parseList(ParsingContext.SourceElements, /*checkForStrictMode*/ true, parseSourceElement);
            Debug.assert(token === SyntaxKind.EndOfFileToken);
            sourceFile.endOfFileToken = parseTokenNode();

            setExternalModuleIndicator(sourceFile);

            sourceFile.nodeCount = nodeCount;
            sourceFile.identifierCount = identifierCount;
            sourceFile.languageVersion = languageVersion;
            sourceFile.identifiers = identifiers;

            if (setParentNodes) {
                fixupParentReferences(sourceFile);
            }

            return sourceFile;
        }

        function update(newText: string, textChangeRange: TextChangeRange) {
            if (textChangeRangeIsUnchanged(textChangeRange)) {
                // if the text didn't change, then we can just return our current source file as-is.
                return sourceFile;
            }

            if (sourceFile.statements.length === 0) {
                // If we don't have any statements in the current source file, then there's no real
                // way to incrementally parse.  So just do a full parse instead.
                return parseSourceFile(newText, /*setNodeParents*/ true);
            }

            syntaxCursor = createSyntaxCursor(sourceFile);

            // Make the actual change larger so that we know to reparse anything whose lookahead 
            // might have intersected the change.
            var changeRange = extendToAffectedRange(textChangeRange);

            // The is the amount the nodes after the edit range need to be adjusted.  It can be 
            // positive (if the edit added characters), negative (if the edit deleted characters)
            // or zero (if this was a pure overwrite with nothing added/removed).
            var delta = textChangeRangeNewSpan(changeRange).length - changeRange.span.length;

            // If we added or removed characters during the edit, then we need to go and adjust all
            // the nodes after the edit.  Those nodes may move forward down (if we inserted chars)
            // or they may move backward (if we deleted chars).
            //
            // Doing this helps us out in two ways.  First, it means that any nodes/tokens we want
            // to reuse are already at the appropriate position in the new text.  That way when we
            // reuse them, we don't have to figure out if they need to be adjusted.  Second, it makes
            // it very easy to determine if we can reuse a node.  If the node's position is at where
            // we are in the text, then we can reuse it.  Otherwise we can't.  If hte node's position
            // is ahead of us, then we'll need to rescan tokens.  If the node's position is behind
            // us, then we'll need to skip it or crumble it as appropriate
            //
            // We will also adjust the positions of nodes that intersect the change range as well.
            // By doing this, we ensure that all the positions in the old tree are consistent, not
            // just the positions of nodes entirely before/after the change range.  By being 
            // consistent, we can then easily map from positions to nodes in the old tree easily.
            //
            // Also, mark any syntax elements that intersect the changed span.  We know, up front,
            // that we cannot reuse these elements.
            updateTokenPositionsAndMarkElements(<IncrementalNode><Node>sourceFile,
                changeRange.span.start, textSpanEnd(changeRange.span), textSpanEnd(textChangeRangeNewSpan(changeRange)), delta);

            // Now that we've set up our internal incremental state just proceed and parse the
            // source file in the normal fashion.  When possible the parser will retrieve and
            // reuse nodes from the old tree.
            // 
            // Note: passing in 'true' for setNodeParents is very important.  When incrementally
            // parsing, we will be reusing nodes from the old tree, and placing it into new
            // parents.  If we don't set the parents now, we'll end up with an observably 
            // inconsistent tree.  Setting the parents on the new tree should be very fast.  We 
            // will immediately bail out of walking any subtrees when we can see that their parents
            // are already correct.
            var result = parseSourceFile(newText, /*setNodeParents*/ true);

            // Clear out the syntax cursor so it doesn't keep anything alive longer than it should.
            syntaxCursor = undefined;

            return result;
        }

        function updateTokenPositionsAndMarkElements(node: IncrementalNode, changeStart: number, changeRangeOldEnd: number, changeRangeNewEnd: number, delta: number): void {
            visitNode(node);

            function visitNode(child: IncrementalNode) {
                if (child.pos > changeRangeOldEnd) {
                    // Node is entirely past the change range.  We need to move both its pos and 
                    // end, forward or backward appropriately.
                    moveElementEntirelyPastChangeRange(child, delta);
                    return;
                }

                // Check if the element intersects the change range.  If it does, then it is not
                // reusable.  Also, we'll need to recurse to see what constituent portions we may
                // be able to use.
                var fullEnd = child.end;
                if (fullEnd >= changeStart) {
                    child.intersectsChange = true;

                    // Adjust the pos or end (or both) of the intersecting element accordingly.
                    adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                    forEachChild(child, visitNode, visitArray);
                    return;
                }

                // Otherwise, the node is entirely before the change range.  No need to do anything with it.
            }

            function visitArray(array: IncrementalNodeArray) {
                if (array.pos > changeRangeOldEnd) {
                    // Array is entirely after the change range.  We need to move it, and move any of
                    // its children.
                    moveElementEntirelyPastChangeRange(array, delta);
                }
                else {
                    // Check if the element intersects the change range.  If it does, then it is not
                    // reusable.  Also, we'll need to recurse to see what constituent portions we may
                    // be able to use.
                    var fullEnd = array.end;
                    if (fullEnd >= changeStart) {
                        array.intersectsChange = true;

                        // Adjust the pos or end (or both) of the intersecting array accordingly.
                        adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                        for (var i = 0, n = array.length; i < n; i++) {
                            visitNode(array[i]);
                        }
                    }
                    // else {
                    // Otherwise, the array is entirely before the change range.  No need to do anything with it.
                    // }
                }
            }
        }

        function adjustIntersectingElement(element: IncrementalElement, changeStart: number, changeRangeOldEnd: number, changeRangeNewEnd: number, delta: number) {
            Debug.assert(element.end >= changeStart, "Adjusting an element that was entirely before the change range");
            Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");

            // We have an element that intersects the change range in some way.  It may have its
            // start, or its end (or both) in the changed range.  We want to adjust any part
            // that intersects such that the final tree is in a consistent state.  i.e. all
            // chlidren have spans within the span of their parent, and all siblings are ordered
            // properly.

            // We may need to update both the 'pos' and the 'end' of the element.

            // If the 'pos' is before the start of the change, then we don't need to touch it.  
            // If it isn't, then the 'pos' must be inside the change.  How we update it will 
            // depend if delta is  positive or negative.  If delta is positive then we have 
            // something like:
            //
            //  -------------------AAA-----------------
            //  -------------------BBBCCCCCCC-----------------
            //
            // In this case, we consider any node that started in the change range to still be
            // starting at the same position.
            //
            // however, if the delta is negative, then we instead have something like this:
            //
            //  -------------------XXXYYYYYYY-----------------
            //  -------------------ZZZ-----------------
            //
            // In this case, any element that started in the 'X' range will keep its position.  
            // However any element htat started after that will have their pos adjusted to be
            // at the end of the new range.  i.e. any node that started in the 'Y' range will
            // be adjusted to have their start at the end of the 'Z' range.
            //
            // The element will keep its position if possible.  Or Move backward to the new-end
            // if it's in the 'Y' range.
            element.pos = Math.min(element.pos, changeRangeNewEnd);

            // If the 'end' is after the change range, then we always adjust it by the delta
            // amount.  However, if the end is in the change range, then how we adjust it 
            // will depend on if delta is  positive or negative.  If delta is positive then we
            // have something like:
            //
            //  -------------------AAA-----------------
            //  -------------------BBBCCCCCCC-----------------
            //
            // In this case, we consider any node that ended inside the change range to keep its
            // end position.
            //
            // however, if the delta is negative, then we instead have something like this:
            //
            //  -------------------XXXYYYYYYY-----------------
            //  -------------------ZZZ-----------------
            //
            // In this case, any element that ended in the 'X' range will keep its position.  
            // However any element htat ended after that will have their pos adjusted to be
            // at the end of the new range.  i.e. any node that ended in the 'Y' range will
            // be adjusted to have their end at the end of the 'Z' range.
            if (element.end >= changeRangeOldEnd) {
                // Element ends after the change range.  Always adjust the end pos.
                element.end += delta;
            }
            else {
                // Element ends in the change range.  The element will keep its position if 
                // possible. Or Move backward to the new-end if it's in the 'Y' range.
                element.end = Math.min(element.end, changeRangeNewEnd);
            }

            Debug.assert(element.pos <= element.end);
            if (element.parent) {
                Debug.assert(element.pos >= element.parent.pos);
                Debug.assert(element.end <= element.parent.end);
            }
        }

        function moveElementEntirelyPastChangeRange(element: IncrementalElement, delta: number) {
            if (element.length) {
                visitArray(<IncrementalNodeArray>element);
            }
            else {
                visitNode(<IncrementalNode>element);
            }

            function visitNode(node: IncrementalNode) {
                // Ditch any existing LS children we may have created.  This way we can avoid 
                // moving them forward.
                node._children = undefined;
                node.pos += delta;
                node.end += delta;

                forEachChild(node, visitNode, visitArray);
            }

            function visitArray(array: IncrementalNodeArray) {
                array.pos += delta;
                array.end += delta;

                for (var i = 0, n = array.length; i < n; i++) {
                    visitNode(array[i]);
                }
            }
        }

        function extendToAffectedRange(changeRange: TextChangeRange): TextChangeRange {
            // Consider the following code:
            //      void foo() { /; }
            //
            // If the text changes with an insertion of / just before the semicolon then we end up with:
            //      void foo() { //; }
            //
            // If we were to just use the changeRange a is, then we would not rescan the { token 
            // (as it does not intersect the actual original change range).  Because an edit may
            // change the token touching it, we actually need to look back *at least* one token so
            // that the prior token sees that change.  
            var maxLookahead = 1;

            var start = changeRange.span.start;

            // the first iteration aligns us with the change start. subsequent iteration move us to
            // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
            // start of the tree.
            for (var i = 0; start > 0 && i <= maxLookahead; i++) {
                var nearestNode = findNearestNodeStartingBeforeOrAtPosition(start);
                var position = nearestNode.pos;

                start = Math.max(0, position - 1);
            }

            var finalSpan = createTextSpanFromBounds(start, textSpanEnd(changeRange.span));
            var finalLength = changeRange.newLength + (changeRange.span.start - start);

            return createTextChangeRange(finalSpan, finalLength);
        }

        function findNearestNodeStartingBeforeOrAtPosition(position: number): Node {
            var bestResult: Node = sourceFile;
            var lastNodeEntirelyBeforePosition: Node;

            forEachChild(sourceFile, visit);

            if (lastNodeEntirelyBeforePosition) {
                var lastChildOfLastEntireNodeBeforePosition = getLastChild(lastNodeEntirelyBeforePosition);
                if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
                    bestResult = lastChildOfLastEntireNodeBeforePosition;
                }
            }

            return bestResult;

            function getLastChild(node: Node): Node {
                while (true) {
                    var lastChild = getLastChildWorker(node);
                    if (lastChild) {
                        node = lastChild;
                    }
                    else {
                        return node;
                    }
                }
            }

            function getLastChildWorker(node: Node): Node {
                var last:Node = undefined;
                forEachChild(node, child => {
                    if (nodeIsPresent(child)) {
                        last = child;
                    }
                });
                return last;
            }

            function visit(child: Node) {
                if (nodeIsMissing(child)) {
                    // Missing nodes are effectively invisible to us.  We never even consider them
                    // When trying to find the nearest node before us.
                    return;
                }

                // If the child intersects this position, then this node is currently the nearest 
                // node that starts before the position.
                if (child.pos <= position) {
                    if (child.pos >= bestResult.pos) {
                        // This node starts before the position, and is closer to the position than
                        // the previous best node we found.  It is now the new best node.
                        bestResult = child;
                    }

                    // Now, the node may overlap the position, or it may end entirely before the
                    // position.  If it overlaps with the position, then either it, or one of its
                    // children must be the nearest node before the position.  So we can just 
                    // recurse into this child to see if we can find something better.
                    if (position < child.end) {
                        // The nearest node is either this child, or one of the children inside
                        // of it.  We've already marked this child as the best so far.  Recurse
                        // in case one of the children is better.
                        forEachChild(child, visit);

                        // Once we look at the children of this node, then there's no need to
                        // continue any further.
                        return true;
                    }
                    else {
                        Debug.assert(child.end <= position);
                        // The child ends entirely before this position.  Say you have the following
                        // (where $ is the position)
                        // 
                        //      <complex expr 1> ? <complex expr 2> $ : <...> <...> 
                        //
                        // We would want to find the nearest preceding node in "complex expr 2". 
                        // To support that, we keep track of this node, and once we're done searching
                        // for a best node, we recurse down this node to see if we can find a good
                        // result in it.
                        //
                        // This approach allows us to quickly skip over nodes that are entirely 
                        // before the position, while still allowing us to find any nodes in the
                        // last one that might be what we want.
                        lastNodeEntirelyBeforePosition = child;
                    }
                }
                else {
                    Debug.assert(child.pos > position);
                    // We're now at a node that is entirely past the position we're searching for.
                    // This node (and all following nodes) could never contribute to the result,
                    // so just skip them by returning 'true' here.
                    return true;
                }
            }
        }

        function setContextFlag(val: Boolean, flag: ParserContextFlags) {
            if (val) {
                contextFlags |= flag;
            }
            else {
                contextFlags &= ~flag;
            }
        }

        function setStrictModeContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.StrictMode);
        }

        function setDisallowInContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.DisallowIn);
        }

        function setYieldContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.Yield);
        }

        function setGeneratorParameterContext(val: boolean) {
            setContextFlag(val, ParserContextFlags.GeneratorParameter);
        }

        function allowInAnd<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.DisallowIn) {
                setDisallowInContext(false);
                var result = func();
                setDisallowInContext(true);
                return result;
            }
            
            // no need to do anything special if 'in' is already allowed.
            return func();
        }

        function disallowInAnd<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.DisallowIn) {
                // no need to do anything special if 'in' is already disallowed.
                return func();
            }

            setDisallowInContext(true);
            var result = func();
            setDisallowInContext(false);
            return result;
        }

        function doInYieldContext<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.Yield) {
                // no need to do anything special if we're already in the [Yield] context.
                return func();
            }

            setYieldContext(true);
            var result = func();
            setYieldContext(false);
            return result;
        }

        function doOutsideOfYieldContext<T>(func: () => T): T {
            if (contextFlags & ParserContextFlags.Yield) {
                setYieldContext(false);
                var result = func();
                setYieldContext(true);
                return result;
            }

            // no need to do anything special if we're not in the [Yield] context.
            return func();
        }

        function inYieldContext() {
            return (contextFlags & ParserContextFlags.Yield) !== 0;
        }

        function inStrictModeContext() {
            return (contextFlags & ParserContextFlags.StrictMode) !== 0;
        }

        function inGeneratorParameterContext() {
            return (contextFlags & ParserContextFlags.GeneratorParameter) !== 0;
        }

        function inDisallowInContext() {
            return (contextFlags & ParserContextFlags.DisallowIn) !== 0;
        }

        function getLineStarts(): number[] {
            return lineStarts || (lineStarts = computeLineStarts(sourceText));
        }

        function getLineAndCharacterFromSourcePosition(position: number) {
            return getLineAndCharacterOfPosition(getLineStarts(), position);
        }

        function getPositionFromSourceLineAndCharacter(line: number, character: number): number {
            return getPositionFromLineAndCharacter(getLineStarts(), line, character);
        }

        function parseErrorAtCurrentToken(message: DiagnosticMessage, arg0?: any): void {
            var start = scanner.getTokenPos();
            var length = scanner.getTextPos() - start;

            parseErrorAtPosition(start, length, message, arg0);
        }

        function parseErrorAtPosition(start: number, length: number, message: DiagnosticMessage, arg0?: any): void {
            // Don't report another error if it would just be at the same position as the last error.
            var lastError = lastOrUndefined(sourceFile.parseDiagnostics);
            if (!lastError || start !== lastError.start) {
                sourceFile.parseDiagnostics.push(createFileDiagnostic(sourceFile, start, length, message, arg0));
            }

            // Mark that we've encountered an error.  We'll set an appropriate bit on the next 
            // node we finish so that it can't be reused incrementally.
            parseErrorBeforeNextFinishedNode = true;
        }

        function scanError(message: DiagnosticMessage, length?: number) {
            var pos = scanner.getTextPos();
            parseErrorAtPosition(pos, length || 0, message);
        }

        function getNodePos(): number {
            return scanner.getStartPos();
        }

        function getNodeEnd(): number {
            return scanner.getStartPos();
        }

        function nextToken(): SyntaxKind {
            return token = scanner.scan();
        }

        function getTokenPos(pos: number): number {
            return skipTrivia(sourceText, pos);
        }

        function reScanGreaterToken(): SyntaxKind {
            return token = scanner.reScanGreaterToken();
        }

        function reScanSlashToken(): SyntaxKind {
            return token = scanner.reScanSlashToken();
        }

        function reScanTemplateToken(): SyntaxKind {
            return token = scanner.reScanTemplateToken();
        }

        function speculationHelper<T>(callback: () => T, isLookAhead: boolean): T {
            // Keep track of the state we'll need to rollback to if lookahead fails (or if the 
            // caller asked us to always reset our state).
            var saveToken = token;
            var saveParseDiagnosticsLength = sourceFile.parseDiagnostics.length;
            var saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

            // Note: it is not actually necessary to save/restore the context flags here.  That's
            // because the saving/restorating of these flags happens naturally through the recursive
            // descent nature of our parser.  However, we still store this here just so we can 
            // assert that that invariant holds.
            var saveContextFlags = contextFlags;

            // If we're only looking ahead, then tell the scanner to only lookahead as well.
            // Otherwise, if we're actually speculatively parsing, then tell the scanner to do the 
            // same. 
            var result = isLookAhead
                ? scanner.lookAhead(callback)
                : scanner.tryScan(callback);

            Debug.assert(saveContextFlags === contextFlags);

            // If our callback returned something 'falsy' or we're just looking ahead,
            // then unconditionally restore us to where we were.
            if (!result || isLookAhead) {
                token = saveToken;
                sourceFile.parseDiagnostics.length = saveParseDiagnosticsLength;
                parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
            }

            return result;
        }

        // Invokes the provided callback then unconditionally restores the parser to the state it 
        // was in immediately prior to invoking the callback.  The result of invoking the callback
        // is returned from this function.
        function lookAhead<T>(callback: () => T): T {
            return speculationHelper(callback, /*isLookAhead:*/ true);
        }
        
        // Invokes the provided callback.  If the callback returns something falsy, then it restores
        // the parser to the state it was in immediately prior to invoking the callback.  If the 
        // callback returns something truthy, then the parser state is not rolled back.  The result
        // of invoking the callback is returned from this function.
        function tryParse<T>(callback: () => T): T {
            return speculationHelper(callback, /*isLookAhead:*/ false);
        }

        function isIdentifier(): boolean {
            if (token === SyntaxKind.Identifier) {
                return true;
            }
            
            // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is 
            // considered a keyword and is not an identifier.
            if (token === SyntaxKind.YieldKeyword && inYieldContext()) {
                return false;
            }

            return inStrictModeContext() ? token > SyntaxKind.LastFutureReservedWord : token > SyntaxKind.LastReservedWord;
        }

        function parseExpected(kind: SyntaxKind, diagnosticMessage?: DiagnosticMessage): boolean {
            if (token === kind) {
                nextToken();
                return true;
            }

            // Report specific message if provided with one.  Otherwise, report generic fallback message.
            if (diagnosticMessage) {
                parseErrorAtCurrentToken(diagnosticMessage);
            }
            else {
                parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
            }
            return false;
        }

        function parseOptional(t: SyntaxKind): boolean {
            if (token === t) {
                nextToken();
                return true;
            }
            return false;
        }

        function parseOptionalToken(t: SyntaxKind): Node {
            if (token === t) {
                var node = createNode(t);
                nextToken();
                return finishNode(node);
            }
            return undefined;
        }

        function canParseSemicolon() {
            // If there's a real semicolon, then we can always parse it out.
            if (token === SyntaxKind.SemicolonToken) {
                return true;
            }

            // We can parse out an optional semicolon in ASI cases in the following cases.
            return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
        }

        function parseSemicolon(): boolean {
            if (canParseSemicolon()) {
                if (token === SyntaxKind.SemicolonToken) {
                    // consume the semicolon if it was explicitly provided.
                    nextToken();
                }

                return true;
            }
            else {
                return parseExpected(SyntaxKind.SemicolonToken);
            }
        }

        function createNode(kind: SyntaxKind, pos?: number): Node {
            nodeCount++;
            var node = new (nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind)))();
            if (!(pos >= 0)) {
                pos = scanner.getStartPos();
            }

            node.pos = pos;
            node.end = pos;
            return node;
        }

        function finishNode<T extends Node>(node: T): T {
            node.end = scanner.getStartPos();

            if (contextFlags) {
                node.parserContextFlags = contextFlags;
            }

            // Keep track on the node if we encountered an error while parsing it.  If we did, then
            // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
            // flag so that we don't mark any subsequent nodes.
            if (parseErrorBeforeNextFinishedNode) {
                parseErrorBeforeNextFinishedNode = false;
                node.parserContextFlags |= ParserContextFlags.ThisNodeHasError;
            }

            return node;
        }

        function createMissingNode(kind: SyntaxKind, reportAtCurrentPosition: boolean, diagnosticMessage: DiagnosticMessage, arg0?: any): Node {
            if (reportAtCurrentPosition) {
                parseErrorAtPosition(scanner.getStartPos(), 0, diagnosticMessage, arg0);
            }
            else {
                parseErrorAtCurrentToken(diagnosticMessage, arg0);
            }

            var result = createNode(kind, scanner.getStartPos());
            (<Identifier>result).text = "";
            return finishNode(result);
        }

        function internIdentifier(text: string): string {
            text = escapeIdentifier(text);
            return hasProperty(identifiers, text) ? identifiers[text] : (identifiers[text] = text);
        }

        // An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
        // with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
        // each identifier in order to reduce memory consumption.
        function createIdentifier(isIdentifier: boolean, diagnosticMessage?: DiagnosticMessage): Identifier {
            identifierCount++;
            if (isIdentifier) {
                var node = <Identifier>createNode(SyntaxKind.Identifier);
                node.text = internIdentifier(scanner.getTokenValue());
                nextToken();
                return finishNode(node);
            }

            return <Identifier>createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentPosition:*/ false, diagnosticMessage || Diagnostics.Identifier_expected);
        }

        function parseIdentifier(diagnosticMessage?: DiagnosticMessage): Identifier {
            return createIdentifier(isIdentifier(), diagnosticMessage);
        }

        function parseIdentifierName(): Identifier {
            return createIdentifier(isIdentifierOrKeyword());
        }

        function isLiteralPropertyName(): boolean {
            return isIdentifierOrKeyword() ||
                token === SyntaxKind.StringLiteral ||
                token === SyntaxKind.NumericLiteral;
        }

        function parsePropertyName(): DeclarationName {
            if (token === SyntaxKind.StringLiteral || token === SyntaxKind.NumericLiteral) {
                return parseLiteralNode(/*internName:*/ true);
            }
            if (token === SyntaxKind.OpenBracketToken) {
                return parseComputedPropertyName();
            }
            return parseIdentifierName();
        }

        function parseComputedPropertyName(): ComputedPropertyName {
            // PropertyName[Yield,GeneratorParameter] :
            //     LiteralPropertyName
            //     [+GeneratorParameter] ComputedPropertyName
            //     [~GeneratorParameter] ComputedPropertyName[?Yield]
            // 
            // ComputedPropertyName[Yield] :
            //     [ AssignmentExpression[In, ?Yield] ]
            //
            var node = <ComputedPropertyName>createNode(SyntaxKind.ComputedPropertyName);
            parseExpected(SyntaxKind.OpenBracketToken);

            // We parse any expression (including a comma expression). But the grammar
            // says that only an assignment expression is allowed, so the grammar checker
            // will error if it sees a comma expression.
            var yieldContext = inYieldContext();
            if (inGeneratorParameterContext()) {
                setYieldContext(false);
            }

            node.expression = allowInAnd(parseExpression);
            if (inGeneratorParameterContext()) {
                setYieldContext(yieldContext);
            }

            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function parseContextualModifier(t: SyntaxKind): boolean {
            return token === t && tryParse(nextTokenCanFollowModifier);
        }

        function nextTokenCanFollowModifier() {
            nextToken();
            return canFollowModifier();
        }

        function parseAnyContextualModifier(): boolean {
            return isModifier(token) && tryParse(nextTokenCanFollowContextualModifier);
        }

        function nextTokenCanFollowContextualModifier() {
            if (token === SyntaxKind.ConstKeyword) {
                // 'const' is only a modifier if followed by 'enum'.
                return nextToken() === SyntaxKind.EnumKeyword;
            }

            nextToken();
            return canFollowModifier();
        }

        function canFollowModifier(): boolean {
            return token === SyntaxKind.OpenBracketToken
                || token === SyntaxKind.OpenBraceToken
                || token === SyntaxKind.AsteriskToken
                || isLiteralPropertyName();
        }

        // True if positioned at the start of a list element
        function isListElement(parsingContext: ParsingContext, inErrorRecovery: boolean): boolean {
            var node = currentNode(parsingContext);
            if (node) {
                return true;
            }

            switch (parsingContext) {
                case ParsingContext.SourceElements:
                case ParsingContext.ModuleElements:
                    return isSourceElement(inErrorRecovery);
                case ParsingContext.BlockStatements:
                case ParsingContext.SwitchClauseStatements:
                    return isStartOfStatement(inErrorRecovery);
                case ParsingContext.SwitchClauses:
                    return token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
                case ParsingContext.TypeMembers:
                    return isStartOfTypeMember();
                case ParsingContext.ClassMembers:
                    return lookAhead(isClassMemberStart);
                case ParsingContext.EnumMembers:
                    // Include open bracket computed properties. This technically also lets in indexers,
                    // which would be a candidate for improved error reporting.
                    return token === SyntaxKind.OpenBracketToken || isLiteralPropertyName();
                case ParsingContext.ObjectLiteralMembers:
                    return token === SyntaxKind.OpenBracketToken || token === SyntaxKind.AsteriskToken || isLiteralPropertyName();
                case ParsingContext.ObjectBindingElements:
                    return isLiteralPropertyName();
                case ParsingContext.TypeReferences:
                    // We want to make sure that the "extends" in "extends foo" or the "implements" in
                    // "implements foo" is not considered a type name.
                    return isIdentifier() && !isNotHeritageClauseTypeName();
                case ParsingContext.VariableDeclarations:
                    return isIdentifierOrPattern();
                case ParsingContext.ArrayBindingElements:
                    return token === SyntaxKind.CommaToken || token === SyntaxKind.DotDotDotToken || isIdentifierOrPattern();
                case ParsingContext.TypeParameters:
                    return isIdentifier();
                case ParsingContext.ArgumentExpressions:
                    return token === SyntaxKind.CommaToken || isStartOfExpression();
                case ParsingContext.ArrayLiteralMembers:
                    return token === SyntaxKind.CommaToken || token === SyntaxKind.DotDotDotToken || isStartOfExpression();
                case ParsingContext.Parameters:
                    return isStartOfParameter();
                case ParsingContext.TypeArguments:
                case ParsingContext.TupleElementTypes:
                    return token === SyntaxKind.CommaToken || isStartOfType();
                case ParsingContext.HeritageClauses:
                    return isHeritageClause();
                case ParsingContext.ImportSpecifiers:
                    return isIdentifierOrKeyword();
            }

            Debug.fail("Non-exhaustive case in 'isListElement'.");
        }

        function nextTokenIsIdentifier() {
            nextToken();
            return isIdentifier();
        }

        function isNotHeritageClauseTypeName(): boolean {
            if (token === SyntaxKind.ImplementsKeyword ||
                token === SyntaxKind.ExtendsKeyword) {

                return lookAhead(nextTokenIsIdentifier);
            }

            return false;
        }

        // True if positioned at a list terminator
        function isListTerminator(kind: ParsingContext): boolean {
            if (token === SyntaxKind.EndOfFileToken) {
                // Being at the end of the file ends all lists.
                return true;
            }

            switch (kind) {
                case ParsingContext.ModuleElements:
                case ParsingContext.BlockStatements:
                case ParsingContext.SwitchClauses:
                case ParsingContext.TypeMembers:
                case ParsingContext.ClassMembers:
                case ParsingContext.EnumMembers:
                case ParsingContext.ObjectLiteralMembers:
                case ParsingContext.ObjectBindingElements:
                case ParsingContext.ImportSpecifiers:
                    return token === SyntaxKind.CloseBraceToken;
                case ParsingContext.SwitchClauseStatements:
                    return token === SyntaxKind.CloseBraceToken || token === SyntaxKind.CaseKeyword || token === SyntaxKind.DefaultKeyword;
                case ParsingContext.TypeReferences:
                    return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
                case ParsingContext.VariableDeclarations:
                    return isVariableDeclaratorListTerminator();
                case ParsingContext.TypeParameters:
                    // Tokens other than '>' are here for better error recovery
                    return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.OpenBraceToken || token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
                case ParsingContext.ArgumentExpressions:
                    // Tokens other than ')' are here for better error recovery
                    return token === SyntaxKind.CloseParenToken || token === SyntaxKind.SemicolonToken;
                case ParsingContext.ArrayLiteralMembers:
                case ParsingContext.TupleElementTypes:
                case ParsingContext.ArrayBindingElements:
                    return token === SyntaxKind.CloseBracketToken;
                case ParsingContext.Parameters:
                    // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
                    return token === SyntaxKind.CloseParenToken || token === SyntaxKind.CloseBracketToken /*|| token === SyntaxKind.OpenBraceToken*/;
                case ParsingContext.TypeArguments:
                    // Tokens other than '>' are here for better error recovery
                    return token === SyntaxKind.GreaterThanToken || token === SyntaxKind.OpenParenToken;
                case ParsingContext.HeritageClauses:
                    return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.CloseBraceToken;
            }
        }

        function isVariableDeclaratorListTerminator(): boolean {
            // If we can consume a semicolon (either explicitly, or with ASI), then consider us done 
            // with parsing the list of  variable declarators.
            if (canParseSemicolon()) {
                return true;
            }

            // in the case where we're parsing the variable declarator of a 'for-in' statement, we 
            // are done if we see an 'in' keyword in front of us.
            if (token === SyntaxKind.InKeyword) {
                return true;
            }

            // ERROR RECOVERY TWEAK:
            // For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
            // arrow function here and it's going to be very unlikely that we'll resynchronize and get
            // another variable declaration.
            if (token === SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }

            // Keep trying to parse out variable declarators.
            return false;
        }

        // True if positioned at element or terminator of the current list or any enclosing list
        function isInSomeParsingContext(): boolean {
            for (var kind = 0; kind < ParsingContext.Count; kind++) {
                if (parsingContext & (1 << kind)) {
                    if (isListElement(kind, /* inErrorRecovery */ true) || isListTerminator(kind)) {
                        return true;
                    }
                }
            }

            return false;
        }

        // Parses a list of elements
        function parseList<T extends Node>(kind: ParsingContext, checkForStrictMode: boolean, parseElement: () => T): NodeArray<T> {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = <NodeArray<T>>[];
            result.pos = getNodePos();
            var savedStrictModeContext = inStrictModeContext();

            while (!isListTerminator(kind)) {
                if (isListElement(kind, /* inErrorRecovery */ false)) {
                    var element = parseListElement(kind, parseElement);
                    result.push(element);

                    // test elements only if we are not already in strict mode
                    if (checkForStrictMode && !inStrictModeContext()) {
                        if (isPrologueDirective(element)) {
                            if (isUseStrictPrologueDirective(sourceFile, element)) {
                                setStrictModeContext(true);
                                checkForStrictMode = false;
                            }
                        }
                        else {
                            checkForStrictMode = false;
                        }
                    }

                    continue;
                }

                if (abortParsingListOrMoveToNextToken(kind)) {
                    break;
                }
            }

            setStrictModeContext(savedStrictModeContext);
            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }

        function parseListElement<T extends Node>(kind: ParsingContext, parseElement: () => T): T {
            var node = currentNode(kind);
            if (node) {
                return <T>consumeNode(node);
            }
            
            return parseElement();
        }

        function currentNode(parsingContext: ParsingContext): Node {
            // If there is an outstanding parse error that we've encountered, but not attached to
            // some node, then we cannot get a node from the old source tree.  This is because we
            // want to mark the next node we encounter as being unusable.
            // 
            // Note: This may be too conservative.  Perhaps we could reuse hte node and set the bit
            // on it (or its leftmost child) as having the error.  For now though, being conservative 
            // is nice and likely won't ever affect perf.
            if (parseErrorBeforeNextFinishedNode) {
                return undefined;
            }

            if (!syntaxCursor) {
                // if we don't have a cursor, we could never return a node from the old tree.
                return undefined;
            }

            var node = syntaxCursor.currentNode(scanner.getStartPos());

            // Can't reuse a missing node.
            if (nodeIsMissing(node)) {
                return undefined;
            }

            // Can't reuse a node that intersected the change range.
            if (node.intersectsChange) {
                return undefined;
            }

            // Can't reuse a node that contains a parse error.  This is necessary so that we 
            // produce the same set of errors again.
            if (containsParseError(node)) {
                return undefined;
            }

            // We can only reuse a node if it was parsed under the same strict mode that we're 
            // currently in.  i.e. if we originally parsed a node in non-strict mode, but then
            // the user added 'using strict' at the top of the file, then we can't use that node
            // again as the presense of strict mode may cause us to parse the tokens in the file
            // differetly.
            // 
            // Note: we *can* reuse tokens when the strict mode changes.  That's because tokens
            // are unaffected by strict mode.  It's just the parser will decide what to do with it
            // differently depending on what mode it is in.
            //
            // This also applies to all our other context flags as well.
            var nodeContextFlags = node.parserContextFlags & ParserContextFlags.ParserGeneratedFlags;
            if (nodeContextFlags !== contextFlags) {
                return undefined;
            }

            // Ok, we have a node that looks like it could be reused.  Now verify that it is valid
            // in the currest list parsing context that we're currently at.
            if (!canReuseNode(node, parsingContext)) {
                return undefined;
            }

            return node;
        }

        function consumeNode(node: Node) {
            // Move the scanner so it is after the node we just consumed.
            scanner.setTextPos(node.end);
            nextToken();
            return node;
        }

        function canReuseNode(node: Node, parsingContext: ParsingContext): boolean {
            switch (parsingContext) {
                case ParsingContext.ModuleElements:
                    return isReusableModuleElement(node);

                case ParsingContext.ClassMembers:
                    return isReusableClassMember(node);

                case ParsingContext.SwitchClauses:
                    return isReusableSwitchClause(node);

                case ParsingContext.BlockStatements:
                case ParsingContext.SwitchClauseStatements:
                    return isReusableStatement(node);

                case ParsingContext.EnumMembers:
                    return isReusableEnumMember(node);

                case ParsingContext.TypeMembers:
                    return isReusableTypeMember(node);

                case ParsingContext.VariableDeclarations:
                    return isReusableVariableDeclaration(node);

                case ParsingContext.Parameters:
                    return isReusableParameter(node);

                // Any other lists we do not care about reusing nodes in.  But feel free to add if 
                // you can do so safely.  Danger areas involve nodes that may involve speculative
                // parsing.  If speculative parsing is involved with the node, then the range the
                // parser reached while looking ahead might be in the edited range (see the example
                // in canReuseVariableDeclaratorNode for a good case of this).
                case ParsingContext.HeritageClauses:
                // This would probably be safe to reuse.  There is no speculative parsing with 
                // heritage clauses.

                case ParsingContext.TypeReferences:
                // This would probably be safe to reuse.  There is no speculative parsing with 
                // type names in a heritage clause.  There can be generic names in the type
                // name list.  But because it is a type context, we never use speculative 
                // parsing on the type argument list.

                case ParsingContext.TypeParameters:
                // This would probably be safe to reuse.  There is no speculative parsing with 
                // type parameters.  Note that that's because type *parameters* only occur in
                // unambiguous *type* contexts.  While type *arguments* occur in very ambiguous
                // *expression* contexts.

                case ParsingContext.TupleElementTypes:
                // This would probably be safe to reuse.  There is no speculative parsing with 
                // tuple types.

                // Technically, type argument list types are probably safe to reuse.  While 
                // speculative parsing is involved with them (since type argument lists are only
                // produced from speculative parsing a < as a type argument list), we only have
                // the types because speculative parsing succeeded.  Thus, the lookahead never
                // went past the end of the list and rewound.
                case ParsingContext.TypeArguments:

                // Note: these are almost certainly not safe to ever reuse.  Expressions commonly
                // need a large amount of lookahead, and we should not reuse them as they may 
                // have actually intersected the edit.
                case ParsingContext.ArgumentExpressions:

                // This is not safe to reuse for the same reason as the 'AssignmentExpression'
                // cases.  i.e. a property assignment may end with an expression, and thus might 
                // have lookahead far beyond it's old node.
                case ParsingContext.ObjectLiteralMembers:
            }

            return false;
        }

        function isReusableModuleElement(node: Node) {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.ExportAssignment:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.EnumDeclaration:

                    // Keep in sync with isStatement:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.Block:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.EmptyStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.DebuggerStatement:
                        return true;
                }
            }

            return false;
        }

        function isReusableClassMember(node: Node) {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.Constructor:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.PropertyDeclaration:
                        return true;
                }
            }

            return false;
        }

        function isReusableSwitchClause(node: Node) {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                        return true;
                }
            }

            return false;
        }

        function isReusableStatement(node: Node) {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.Block:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.EmptyStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.DebuggerStatement:
                        return true;
                }
            }

            return false;
        }

        function isReusableEnumMember(node: Node) {
            return node.kind === SyntaxKind.EnumMember;
        }

        function isReusableTypeMember(node: Node) {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.CallSignature:
                        return true;
                }
            }

            return false;
        }

        function isReusableVariableDeclaration(node: Node) {
            if (node.kind !== SyntaxKind.VariableDeclaration) {
                return false;
            }

            // Very subtle incremental parsing bug.  Consider the following code:
            //
            //      var v = new List < A, B
            //
            // This is actually legal code.  It's a list of variable declarators "v = new List<A" 
            // on one side and "B" on the other. If you then change that to:
            //
            //      var v = new List < A, B >()
            // 
            // then we have a problem.  "v = new List<A" doesn't intersect the change range, so we
            // start reparsing at "B" and we completely fail to handle this properly.
            //
            // In order to prevent this, we do not allow a variable declarator to be reused if it
            // has an initializer.
            var variableDeclarator = <VariableDeclaration>node;
            return variableDeclarator.initializer === undefined;
        }

        function isReusableParameter(node: Node) {
            // TODO: this most likely needs the same initializer check that 
            // isReusableVariableDeclaration has.
            return node.kind === SyntaxKind.Parameter;
        }

        // Returns true if we should abort parsing.
        function abortParsingListOrMoveToNextToken(kind: ParsingContext) {
            parseErrorAtCurrentToken(parsingContextErrors(kind));
            if (isInSomeParsingContext()) {
                return true;
            }

            nextToken();
            return false;
        }

        // Parses a comma-delimited list of elements
        function parseDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T): NodeArray<T> {
            var saveParsingContext = parsingContext;
            parsingContext |= 1 << kind;
            var result = <NodeArray<T>>[];
            result.pos = getNodePos();

            var commaStart = -1; // Meaning the previous token was not a comma
            while (true) {
                if (isListElement(kind, /* inErrorRecovery */ false)) {
                    result.push(parseListElement(kind, parseElement));
                    commaStart = scanner.getTokenPos();
                    if (parseOptional(SyntaxKind.CommaToken)) {
                        continue;
                    }
                    commaStart = -1; // Back to the state where the last token was not a comma
                    if (isListTerminator(kind)) {
                        break;
                    }
                    parseExpected(SyntaxKind.CommaToken);
                    continue;
                }

                if (isListTerminator(kind)) {
                    break;
                }

                if (abortParsingListOrMoveToNextToken(kind)) {
                    break;
                }
            }

            // Recording the trailing comma is deliberately done after the previous
            // loop, and not just if we see a list terminator. This is because the list
            // may have ended incorrectly, but it is still important to know if there
            // was a trailing comma.
            // Check if the last token was a comma.
            if (commaStart >= 0) {
                // Always preserve a trailing comma by marking it on the NodeArray
                result.hasTrailingComma = true;
            }

            result.end = getNodeEnd();
            parsingContext = saveParsingContext;
            return result;
        }

        function createMissingList<T>(): NodeArray<T> {
            var pos = getNodePos();
            var result = <NodeArray<T>>[];
            result.pos = pos;
            result.end = pos;
            return result;
        }

        function parseBracketedList<T extends Node>(kind: ParsingContext, parseElement: () => T, open: SyntaxKind, close: SyntaxKind): NodeArray<T> {
            if (parseExpected(open)) {
                var result = parseDelimitedList(kind, parseElement);
                parseExpected(close);
                return result;
            }

            return createMissingList<T>();
        }

        // The allowReservedWords parameter controls whether reserved words are permitted after the first dot
        function parseEntityName(allowReservedWords: boolean, diagnosticMessage?: DiagnosticMessage): EntityName {
            var entity: EntityName = parseIdentifier(diagnosticMessage);
            while (parseOptional(SyntaxKind.DotToken)) {
                var node = <QualifiedName>createNode(SyntaxKind.QualifiedName, entity.pos);
                node.left = entity;
                node.right = parseRightSideOfDot(allowReservedWords);
                entity = finishNode(node);
            }
            return entity;
        }

        function parseRightSideOfDot(allowIdentifierNames: boolean): Identifier {
            // Technically a keyword is valid here as all keywords are identifier names.
            // However, often we'll encounter this in error situations when the keyword
            // is actually starting another valid construct.
            //
            // So, we check for the following specific case:
            //
            //      name.
            //      keyword identifierNameOrKeyword
            //
            // Note: the newlines are important here.  For example, if that above code 
            // were rewritten into:
            //
            //      name.keyword
            //      identifierNameOrKeyword
            //
            // Then we would consider it valid.  That's because ASI would take effect and
            // the code would be implicitly: "name.keyword; identifierNameOrKeyword".  
            // In the first case though, ASI will not take effect because there is not a
            // line terminator after the keyword.
            if (scanner.hasPrecedingLineBreak() && scanner.isReservedWord()) {
                var matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

                if (matchesPattern) {
                    // Report that we need an identifier.  However, report it right after the dot, 
                    // and not on the next token.  This is because the next token might actually 
                    // be an identifier and the error woudl be quite confusing.
                    return <Identifier>createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentToken:*/ true, Diagnostics.Identifier_expected);
                }
            }

            return allowIdentifierNames ? parseIdentifierName() : parseIdentifier();
        }



        function parseTokenNode<T extends Node>(): T {
            var node = <T>createNode(token);
            nextToken();
            return finishNode(node);
        }

        function parseTemplateExpression(): TemplateExpression {
            var template = <TemplateExpression>createNode(SyntaxKind.TemplateExpression);

            template.head = parseLiteralNode();
            Debug.assert(template.head.kind === SyntaxKind.TemplateHead, "Template head has wrong token kind");

            var templateSpans = <NodeArray<TemplateSpan>>[];
            templateSpans.pos = getNodePos();

            do {
                templateSpans.push(parseTemplateSpan());
            }
            while (templateSpans[templateSpans.length - 1].literal.kind === SyntaxKind.TemplateMiddle)

            templateSpans.end = getNodeEnd();
            template.templateSpans = templateSpans;

            return finishNode(template);
        }

        function parseTemplateSpan(): TemplateSpan {
            var span = <TemplateSpan>createNode(SyntaxKind.TemplateSpan);
            span.expression = allowInAnd(parseExpression);

            var literal: LiteralExpression;

            if (token === SyntaxKind.CloseBraceToken) {
                reScanTemplateToken()
                literal = parseLiteralNode();
            }
            else {
                literal = <LiteralExpression>createMissingNode(
                    SyntaxKind.TemplateTail, /*reportAtCurrentPosition:*/ false, Diagnostics._0_expected, tokenToString(SyntaxKind.CloseBraceToken));
            }

            span.literal = literal;
            return finishNode(span);
        }

        function parseLiteralNode(internName?: boolean): LiteralExpression {
            var node = <LiteralExpression>createNode(token);
            var text = scanner.getTokenValue();
            node.text = internName ? internIdentifier(text) : text;

            if (scanner.isUnterminated()) {
                node.isUnterminated = true;
            }

            var tokenPos = scanner.getTokenPos();
            nextToken();
            finishNode(node);
            
            // Octal literals are not allowed in strict mode or ES5
            // Note that theoretically the following condition would hold true literals like 009,
            // which is not octal.But because of how the scanner separates the tokens, we would
            // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
            // We also do not need to check for negatives because any prefix operator would be part of a
            // parent unary expression.
            if (node.kind === SyntaxKind.NumericLiteral
                && sourceText.charCodeAt(tokenPos) === CharacterCodes._0
                && isOctalDigit(sourceText.charCodeAt(tokenPos + 1))) {

                node.flags |= NodeFlags.OctalLiteral;
            }

            return node;
        }

        // TYPES

        function parseTypeReference(): TypeReferenceNode {
            var node = <TypeReferenceNode>createNode(SyntaxKind.TypeReference);
            node.typeName = parseEntityName(/*allowReservedWords*/ false, Diagnostics.Type_expected);
            if (!scanner.hasPrecedingLineBreak() && token === SyntaxKind.LessThanToken) {
                node.typeArguments = parseBracketedList(ParsingContext.TypeArguments, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
            }
            return finishNode(node);
        }

        function parseTypeQuery(): TypeQueryNode {
            var node = <TypeQueryNode>createNode(SyntaxKind.TypeQuery);
            parseExpected(SyntaxKind.TypeOfKeyword);
            node.exprName = parseEntityName(/*allowReservedWords*/ true);
            return finishNode(node);
        }

        function parseTypeParameter(): TypeParameterDeclaration {
            var node = <TypeParameterDeclaration>createNode(SyntaxKind.TypeParameter);
            node.name = parseIdentifier();
            if (parseOptional(SyntaxKind.ExtendsKeyword)) {
                // It's not uncommon for people to write improper constraints to a generic.  If the 
                // user writes a constraint that is an expression and not an actual type, then parse
                // it out as an expression (so we can recover well), but report that a type is needed
                // instead.
                if (isStartOfType() || !isStartOfExpression()) {
                    node.constraint = parseType();
                }
                else {
                    // It was not a type, and it looked like an expression.  Parse out an expression
                    // here so we recover well.  Note: it is important that we call parseUnaryExpression
                    // and not parseExpression here.  If the user has:
                    //
                    //      <T extends "">
                    //
                    // We do *not* want to consume the  >  as we're consuming the expression for "".
                    node.expression = parseUnaryExpressionOrHigher();
                }
            }

            return finishNode(node);
        }

        function parseTypeParameters(): NodeArray<TypeParameterDeclaration> {
            if (token === SyntaxKind.LessThanToken) {
                return parseBracketedList(ParsingContext.TypeParameters, parseTypeParameter, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
            }
        }

        function parseParameterType(): TypeNode {
            if (parseOptional(SyntaxKind.ColonToken)) {
                return token === SyntaxKind.StringLiteral
                    ? <StringLiteralTypeNode>parseLiteralNode(/*internName:*/ true)
                    : parseType();
            }

            return undefined;
        }

        function isStartOfParameter(): boolean {
            return token === SyntaxKind.DotDotDotToken || isIdentifierOrPattern() || isModifier(token);
        }

        function setModifiers(node: Node, modifiers: ModifiersArray) {
            if (modifiers) {
                node.flags |= modifiers.flags;
                node.modifiers = modifiers;
            }
        }

        function parseParameter(): ParameterDeclaration {
            var node = <ParameterDeclaration>createNode(SyntaxKind.Parameter);
            setModifiers(node, parseModifiers());
            node.dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);

            // SingleNameBinding[Yield,GeneratorParameter] : See 13.2.3
            //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
            //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt

            node.name = inGeneratorParameterContext() ? doInYieldContext(parseIdentifierOrPattern) : parseIdentifierOrPattern();

            if (getFullWidth(node.name) === 0 && node.flags === 0 && isModifier(token)) {
                // in cases like
                // 'use strict' 
                // function foo(static)
                // isParameter('static') === true, because of isModifier('static')
                // however 'static' is not a legal identifier in a strict mode.
                // so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
                // and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
                // to avoid this we'll advance cursor to the next token.
                nextToken();
            }

            node.questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
            node.type = parseParameterType();
            node.initializer = inGeneratorParameterContext() ? doOutsideOfYieldContext(parseParameterInitializer) : parseParameterInitializer();

            // Do not check for initializers in an ambient context for parameters. This is not
            // a grammar error because the grammar allows arbitrary call signatures in
            // an ambient context.
            // It is actually not necessary for this to be an error at all. The reason is that
            // function/constructor implementations are syntactically disallowed in ambient
            // contexts. In addition, parameter initializers are semantically disallowed in
            // overload signatures. So parameter initializers are transitively disallowed in
            // ambient contexts.
            return finishNode(node);
        }

        function parseParameterInitializer() {
            return parseInitializer(/*inParameter*/ true);
        }

        function fillSignature(
                returnToken: SyntaxKind,
                yieldAndGeneratorParameterContext: boolean,
                requireCompleteParameterList: boolean,
                signature: SignatureDeclaration): void {
            var returnTokenRequired = returnToken === SyntaxKind.EqualsGreaterThanToken;
            signature.typeParameters = parseTypeParameters();
            signature.parameters = parseParameterList(yieldAndGeneratorParameterContext, requireCompleteParameterList);

            if (returnTokenRequired) {
                parseExpected(returnToken);
                signature.type = parseType();
            }
            else if (parseOptional(returnToken)) {
                signature.type = parseType();
            }
        }

        // Note: after careful analysis of the grammar, it does not appear to be possible to 
        // have 'Yield' And 'GeneratorParameter' not in sync.  i.e. any production calling
        // this FormalParameters production either always sets both to true, or always sets
        // both to false.  As such we only have a single parameter to represent both.
        function parseParameterList(yieldAndGeneratorParameterContext: boolean, requireCompleteParameterList: boolean) {
            // FormalParameters[Yield,GeneratorParameter] :
            //      ...
            //
            // FormalParameter[Yield,GeneratorParameter] :
            //      BindingElement[?Yield, ?GeneratorParameter]
            //
            // BindingElement[Yield, GeneratorParameter ] : See 13.2.3
            //      SingleNameBinding[?Yield, ?GeneratorParameter]
            //      [+GeneratorParameter]BindingPattern[?Yield, GeneratorParameter]Initializer[In]opt
            //      [~GeneratorParameter]BindingPattern[?Yield]Initializer[In, ?Yield]opt
            //
            // SingleNameBinding[Yield, GeneratorParameter] : See 13.2.3
            //      [+GeneratorParameter]BindingIdentifier[Yield]Initializer[In]opt
            //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
            if (parseExpected(SyntaxKind.OpenParenToken)) {
                var savedYieldContext = inYieldContext();
                var savedGeneratorParameterContext = inGeneratorParameterContext();

                setYieldContext(yieldAndGeneratorParameterContext);
                setGeneratorParameterContext(yieldAndGeneratorParameterContext);

                var result = parseDelimitedList(ParsingContext.Parameters, parseParameter);

                setYieldContext(savedYieldContext);
                setGeneratorParameterContext(savedGeneratorParameterContext);

                if (!parseExpected(SyntaxKind.CloseParenToken) && requireCompleteParameterList) {
                    // Caller insisted that we had to end with a )   We didn't.  So just return
                    // undefined here.
                    return undefined;
                }

                return result;
            }

            // We didn't even have an open paren.  If the caller requires a complete parameter list,
            // we definitely can't provide that.  However, if they're ok with an incomplete one,
            // then just return an empty set of parameters.
            return requireCompleteParameterList ? undefined : createMissingList<ParameterDeclaration>();
        }

        function parseTypeMemberSemicolon() {
            // Try to parse out an explicit or implicit (ASI) semicolon for a type member.  If we
            // don't have one, then an appropriate error will be reported.
            if (parseSemicolon()) {
                return;
            }

            // If we don't have a semicolon, then the user may have written a comma instead 
            // accidently (pretty easy to do since commas are so prevalent as list separators). So
            // just consume the comma and keep going.  Note: we'll have already reported the error
            // about the missing semicolon above.
            parseOptional(SyntaxKind.CommaToken);
        }

        function parseSignatureMember(kind: SyntaxKind): SignatureDeclaration {
            var node = <SignatureDeclaration>createNode(kind);
            if (kind === SyntaxKind.ConstructSignature) {
                parseExpected(SyntaxKind.NewKeyword);
            }
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            parseTypeMemberSemicolon();
            return finishNode(node);
        }

        function isIndexSignature(): boolean {
            if (token !== SyntaxKind.OpenBracketToken) {
                return false;
            }

            return lookAhead(isUnambiguouslyIndexSignature);
        }

        function isUnambiguouslyIndexSignature() {
            // The only allowed sequence is:
            //
            //   [id:
            //
            // However, for error recovery, we also check the following cases:
            //
            //   [...
            //   [id,
            //   [id?,
            //   [id?:
            //   [id?]
            //   [public id
            //   [private id
            //   [protected id
            //   []
            //
            nextToken();
            if (token === SyntaxKind.DotDotDotToken || token === SyntaxKind.CloseBracketToken) {
                return true;
            }

            if (isModifier(token)) {
                nextToken();
                if (isIdentifier()) {
                    return true;
                }
            }
            else if (!isIdentifier()) {
                return false;
            }
            else {
                // Skip the identifier
                nextToken();
            }

            // A colon signifies a well formed indexer
            // A comma should be a badly formed indexer because comma expressions are not allowed
            // in computed properties.
            if (token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken) {
                return true;
            }

            // Question mark could be an indexer with an optional property,
            // or it could be a conditional expression in a computed property.
            if (token !== SyntaxKind.QuestionToken) {
                return false;
            }

            // If any of the following tokens are after the question mark, it cannot
            // be a conditional expression, so treat it as an indexer.
            nextToken();
            return token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken || token === SyntaxKind.CloseBracketToken;
        }

        function parseIndexSignatureDeclaration(modifiers: ModifiersArray): IndexSignatureDeclaration {
            var fullStart = modifiers ? modifiers.pos : scanner.getStartPos();
            var node = <IndexSignatureDeclaration>createNode(SyntaxKind.IndexSignature, fullStart);
            setModifiers(node, modifiers);
            node.parameters = parseBracketedList(ParsingContext.Parameters, parseParameter, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
            node.type = parseTypeAnnotation();
            parseTypeMemberSemicolon();
            return finishNode(node)
        }

        function parsePropertyOrMethodSignature(): Declaration {
            var fullStart = scanner.getStartPos();
            var name = parsePropertyName();
            var questionToken = parseOptionalToken(SyntaxKind.QuestionToken);

            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                var method = <MethodDeclaration>createNode(SyntaxKind.MethodSignature, fullStart);
                method.name = name;
                method.questionToken = questionToken;

                // Method signatues don't exist in expression contexts.  So they have neither
                // [Yield] nor [GeneratorParameter]
                fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, method);
                parseTypeMemberSemicolon();
                return finishNode(method);
            }
            else {
                var property = <PropertyDeclaration>createNode(SyntaxKind.PropertySignature, fullStart);
                property.name = name;
                property.questionToken = questionToken;
                property.type = parseTypeAnnotation();
                parseTypeMemberSemicolon();
                return finishNode(property);
            }
        }

        function isStartOfTypeMember(): boolean {
            switch (token) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.OpenBracketToken: // Both for indexers and computed properties
                    return true;
                default:
                    if (isModifier(token)) {
                        var result = lookAhead(isStartOfIndexSignatureDeclaration);
                        if (result) {
                            return result;
                        }
                    }

                    return isLiteralPropertyName() && lookAhead(isTypeMemberWithLiteralPropertyName);
            }
        }

        function isStartOfIndexSignatureDeclaration() {
            while (isModifier(token)) {
                nextToken();
            }

            return isIndexSignature();
        }

        function isTypeMemberWithLiteralPropertyName() {
            nextToken();
            return token === SyntaxKind.OpenParenToken ||
                token === SyntaxKind.LessThanToken ||
                token === SyntaxKind.QuestionToken ||
                token === SyntaxKind.ColonToken ||
                canParseSemicolon();
        }

        function parseTypeMember(): Declaration {
            switch (token) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.LessThanToken:
                    return parseSignatureMember(SyntaxKind.CallSignature);
                case SyntaxKind.OpenBracketToken:
                    // Indexer or computed property
                    return isIndexSignature()
                        ? parseIndexSignatureDeclaration(/*modifiers:*/ undefined)
                        : parsePropertyOrMethodSignature();
                case SyntaxKind.NewKeyword:
                    if (lookAhead(isStartOfConstructSignature)) {
                        return parseSignatureMember(SyntaxKind.ConstructSignature);
                    }
                // fall through.
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                    return parsePropertyOrMethodSignature();
                default:
                    // Index declaration as allowed as a type member.  But as per the grammar, 
                    // they also allow modifiers. So we have to check for an index declaration
                    // that might be following modifiers. This ensures that things work properly 
                    // when incrementally parsing as the parser will produce the Index declaration
                    // if it has the same text regardless of whether it is inside a class or an
                    // object type.
                    if (isModifier(token)) {
                        var result = tryParse(parseIndexSignatureWithModifiers);
                        if (result) {
                            return result;
                        }
                    }

                    if (isIdentifierOrKeyword()) {
                        return parsePropertyOrMethodSignature();
                    }
            }
        }

        function parseIndexSignatureWithModifiers() {
            var modifiers = parseModifiers();
            return isIndexSignature()
                ? parseIndexSignatureDeclaration(modifiers)
                : undefined;
        }

        function isStartOfConstructSignature() {
            nextToken();
            return token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken;
        }

        function parseTypeLiteral(): TypeLiteralNode {
            var node = <TypeLiteralNode>createNode(SyntaxKind.TypeLiteral);
            node.members = parseObjectTypeMembers();
            return finishNode(node);
        }

        function parseObjectTypeMembers(): NodeArray<Declaration> {
            var members: NodeArray<Declaration>;
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                members = parseList(ParsingContext.TypeMembers, /*checkForStrictMode*/ false, parseTypeMember);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                members = createMissingList<Declaration>();
            }

            return members;
        }

        function parseTupleType(): TupleTypeNode {
            var node = <TupleTypeNode>createNode(SyntaxKind.TupleType);
            node.elementTypes = parseBracketedList(ParsingContext.TupleElementTypes, parseType, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function parseParenthesizedType(): ParenthesizedTypeNode {
            var node = <ParenthesizedTypeNode>createNode(SyntaxKind.ParenthesizedType);
            parseExpected(SyntaxKind.OpenParenToken);
            node.type = parseType();
            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseFunctionOrConstructorType(kind: SyntaxKind): FunctionOrConstructorTypeNode {
            var node = <FunctionOrConstructorTypeNode>createNode(kind);
            if (kind === SyntaxKind.ConstructorType) {
                parseExpected(SyntaxKind.NewKeyword);
            }
            fillSignature(SyntaxKind.EqualsGreaterThanToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            return finishNode(node);
        }

        function parseKeywordAndNoDot(): TypeNode {
            var node = parseTokenNode<TypeNode>();
            return token === SyntaxKind.DotToken ? undefined : node;
        }

        function parseNonArrayType(): TypeNode {
            switch (token) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                    // If these are followed by a dot, then parse these out as a dotted type reference instead.
                    var node = tryParse(parseKeywordAndNoDot);
                    return node || parseTypeReference();
                case SyntaxKind.VoidKeyword:
                    return parseTokenNode<TypeNode>();
                case SyntaxKind.TypeOfKeyword:
                    return parseTypeQuery();
                case SyntaxKind.OpenBraceToken:
                    return parseTypeLiteral();
                case SyntaxKind.OpenBracketToken:
                    return parseTupleType();
                case SyntaxKind.OpenParenToken:
                    return parseParenthesizedType();
                default:
                    return parseTypeReference();
            }
        }

        function isStartOfType(): boolean {
            switch (token) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.NewKeyword:
                    return true;
                case SyntaxKind.OpenParenToken:
                    // Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
                    // or something that starts a type. We don't want to consider things like '(1)' a type.
                    return lookAhead(isStartOfParenthesizedOrFunctionType);
                default:
                    return isIdentifier();
            }
        }

        function isStartOfParenthesizedOrFunctionType() {
            nextToken();
            return token === SyntaxKind.CloseParenToken || isStartOfParameter() || isStartOfType();
        }

        function parseArrayTypeOrHigher(): TypeNode {
            var type = parseNonArrayType();
            while (!scanner.hasPrecedingLineBreak() && parseOptional(SyntaxKind.OpenBracketToken)) {
                parseExpected(SyntaxKind.CloseBracketToken);
                var node = <ArrayTypeNode>createNode(SyntaxKind.ArrayType, type.pos);
                node.elementType = type;
                type = finishNode(node);
            }
            return type;
        }

        function parseUnionTypeOrHigher(): TypeNode {
            var type = parseArrayTypeOrHigher();
            if (token === SyntaxKind.BarToken) {
                var types = <NodeArray<TypeNode>>[type];
                types.pos = type.pos;
                while (parseOptional(SyntaxKind.BarToken)) {
                    types.push(parseArrayTypeOrHigher());
                }
                types.end = getNodeEnd();
                var node = <UnionTypeNode>createNode(SyntaxKind.UnionType, type.pos);
                node.types = types;
                type = finishNode(node);
            }
            return type;
        }

        function isStartOfFunctionType(): boolean {
            if (token === SyntaxKind.LessThanToken) {
                return true;
            }

            return token === SyntaxKind.OpenParenToken && lookAhead(isUnambiguouslyStartOfFunctionType);
        }

        function isUnambiguouslyStartOfFunctionType() {
            nextToken();
            if (token === SyntaxKind.CloseParenToken || token === SyntaxKind.DotDotDotToken) {
                // ( )
                // ( ...
                return true;
            }
            if (isIdentifier() || isModifier(token)) {
                nextToken();
                if (token === SyntaxKind.ColonToken || token === SyntaxKind.CommaToken ||
                    token === SyntaxKind.QuestionToken || token === SyntaxKind.EqualsToken ||
                    isIdentifier() || isModifier(token)) {
                    // ( id :
                    // ( id ,
                    // ( id ?
                    // ( id =
                    // ( modifier id
                    return true;
                }
                if (token === SyntaxKind.CloseParenToken) {
                    nextToken();
                    if (token === SyntaxKind.EqualsGreaterThanToken) {
                        // ( id ) =>
                        return true;
                    }
                }
            }
            return false;
        }

        function parseType(): TypeNode {
            // The rules about 'yield' only apply to actual code/expression contexts.  They don't
            // apply to 'type' contexts.  So we disable these parameters here before moving on.
            var savedYieldContext = inYieldContext();
            var savedGeneratorParameterContext = inGeneratorParameterContext();

            setYieldContext(false);
            setGeneratorParameterContext(false);

            var result = parseTypeWorker();

            setYieldContext(savedYieldContext);
            setGeneratorParameterContext(savedGeneratorParameterContext);

            return result;
        }

        function parseTypeWorker(): TypeNode {
            if (isStartOfFunctionType()) {
                return parseFunctionOrConstructorType(SyntaxKind.FunctionType);
            }
            if (token === SyntaxKind.NewKeyword) {
                return parseFunctionOrConstructorType(SyntaxKind.ConstructorType);
            }
            return parseUnionTypeOrHigher();
        }

        function parseTypeAnnotation(): TypeNode {
            return parseOptional(SyntaxKind.ColonToken) ? parseType() : undefined;
        }

        // EXPRESSIONS

        function isStartOfExpression(): boolean {
            switch (token) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.NewKeyword:
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.DeleteKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.Identifier:
                case SyntaxKind.YieldKeyword:
                    // Yield always starts an expression.  Either it is an identifier (in which case
                    // it is definitely an expression).  Or it's a keyword (either because we're in
                    // a generator, or in strict mode (or both)) and it started a yield expression.
                    return true;
                default:
                    // Error tolerance.  If we see the start of some binary operator, we consider
                    // that the start of an expression.  That way we'll parse out a missing identifier,
                    // give a good message about an identifier being missing, and then consume the
                    // rest of the binary expression.
                    if (isBinaryOperator()) {
                        return true;
                    }

                    return isIdentifier();
            }
        }

        function isStartOfExpressionStatement(): boolean {
            // As per the grammar, neither '{' nor 'function' can start an expression statement.
            return token !== SyntaxKind.OpenBraceToken && token !== SyntaxKind.FunctionKeyword && isStartOfExpression();
        }

        function parseExpression(): Expression {
            // Expression[in]:
            //      AssignmentExpression[in] 
            //      Expression[in] , AssignmentExpression[in]

            var expr = parseAssignmentExpressionOrHigher();
            while (parseOptional(SyntaxKind.CommaToken)) {
                expr = makeBinaryExpression(expr, SyntaxKind.CommaToken, parseAssignmentExpressionOrHigher());
            }
            return expr;
        }

        function parseInitializer(inParameter: boolean): Expression {
            if (token !== SyntaxKind.EqualsToken) {
                // It's not uncommon during typing for the user to miss writing the '=' token.  Check if
                // there is no newline after the last token and if we're on an expression.  If so, parse
                // this as an equals-value clause with a missing equals.
                // NOTE: There are two places where we allow equals-value clauses.  The first is in a 
                // variable declarator.  The second is with a parameter.  For variable declarators
                // it's more likely that a { would be a allowed (as an object literal).  While this
                // is also allowed for parameters, the risk is that we consume the { as an object
                // literal when it really will be for the block following the parameter.
                if (scanner.hasPrecedingLineBreak() || (inParameter && token === SyntaxKind.OpenBraceToken) || !isStartOfExpression()) {
                    // preceding line break, open brace in a parameter (likely a function body) or current token is not an expression - 
                    // do not try to parse initializer
                    return undefined;
                }
            }

            // Initializer[In, Yield] :
            //     = AssignmentExpression[?In, ?Yield]

            parseExpected(SyntaxKind.EqualsToken);
            return parseAssignmentExpressionOrHigher();
        }

        function parseAssignmentExpressionOrHigher(): Expression {
            //  AssignmentExpression[in,yield]:
            //      1) ConditionalExpression[?in,?yield]
            //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
            //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
            //      4) ArrowFunctionExpression[?in,?yield]
            //      5) [+Yield] YieldExpression[?In]
            //
            // Note: for ease of implementation we treat productions '2' and '3' as the same thing. 
            // (i.e. they're both BinaryExpressions with an assignment operator in it).

            // First, do the simple check if we have a YieldExpression (production '5').
            if (isYieldExpression()) {
                return parseYieldExpression();
            } 

            // Then, check if we have an arrow function (production '4') that starts with a parenthesized
            // parameter list. If we do, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
            // not a  LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done 
            // with AssignmentExpression if we see one.
            var arrowExpression = tryParseParenthesizedArrowFunctionExpression();
            if (arrowExpression) {
                return arrowExpression;
            }

            // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
            // start with a LogicalOrExpression, while the assignment productions can only start with
            // LeftHandSideExpressions.
            //
            // So, first, we try to just parse out a BinaryExpression.  If we get something that is a 
            // LeftHandSide or higher, then we can try to parse out the assignment expression part.  
            // Otherwise, we try to parse out the conditional expression bit.  We want to allow any 
            // binary expression here, so we pass in the 'lowest' precedence here so that it matches
            // and consumes anything.
            var expr = parseBinaryExpressionOrHigher(/*precedence:*/ 0);

            // To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
            // parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
            // identifier and the current token is an arrow.
            if (expr.kind === SyntaxKind.Identifier && token === SyntaxKind.EqualsGreaterThanToken) {
                return parseSimpleArrowFunctionExpression(<Identifier>expr);
            }

            // Now see if we might be in cases '2' or '3'.
            // If the expression was a LHS expression, and we have an assignment operator, then 
            // we're in '2' or '3'. Consume the assignment and return.
            //
            // Note: we call reScanGreaterToken so that we get an appropriately merged token
            // for cases like > > =  becoming >>=
            if (isLeftHandSideExpression(expr) && isAssignmentOperator(reScanGreaterToken())) {
                var operator = token;
                nextToken();
                return makeBinaryExpression(expr, operator, parseAssignmentExpressionOrHigher());
            }

            // It wasn't an assignment or a lambda.  This is a conditional expression:
            return parseConditionalExpressionRest(expr);
        }

        function isYieldExpression(): boolean {
            if (token === SyntaxKind.YieldKeyword) {
                // If we have a 'yield' keyword, and htis is a context where yield expressions are 
                // allowed, then definitely parse out a yield expression.
                if (inYieldContext()) {
                    return true;
                }

                if (inStrictModeContext()) {
                    // If we're in strict mode, then 'yield' is a keyword, could only ever start
                    // a yield expression.
                    return true;
                }

                // We're in a context where 'yield expr' is not allowed.  However, if we can
                // definitely tell that the user was trying to parse a 'yield expr' and not
                // just a normal expr that start with a 'yield' identifier, then parse out
                // a 'yield expr'.  We can then report an error later that they are only 
                // allowed in generator expressions.
                // 
                // for example, if we see 'yield(foo)', then we'll have to treat that as an
                // invocation expression of something called 'yield'.  However, if we have
                // 'yield foo' then that is not legal as a normal expression, so we can 
                // definitely recognize this as a yield expression.
                //
                // for now we just check if the next token is an identifier.  More heuristics
                // can be added here later as necessary.  We just need to make sure that we
                // don't accidently consume something legal.
                return lookAhead(nextTokenIsIdentifierOnSameLine);
            }

            return false;
        }

        function nextTokenIsIdentifierOnSameLine() {
            nextToken();
            return !scanner.hasPrecedingLineBreak() && isIdentifier()
        }

        function parseYieldExpression(): YieldExpression {
            var node = <YieldExpression>createNode(SyntaxKind.YieldExpression);

            // YieldExpression[In] :
            //      yield
            //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
            //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
            nextToken();

            if (!scanner.hasPrecedingLineBreak() &&
                (token === SyntaxKind.AsteriskToken || isStartOfExpression())) {
                node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
                node.expression = parseAssignmentExpressionOrHigher();
                return finishNode(node);
            }
            else {
                // if the next token is not on the same line as yield.  or we don't have an '*' or 
                // the start of an expressin, then this is just a simple "yield" expression.
                return finishNode(node);
            }
        }

        function parseSimpleArrowFunctionExpression(identifier: Identifier): Expression {
            Debug.assert(token === SyntaxKind.EqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");

            var node = <FunctionExpression>createNode(SyntaxKind.ArrowFunction, identifier.pos);

            var parameter = <ParameterDeclaration>createNode(SyntaxKind.Parameter, identifier.pos);
            parameter.name = identifier;
            finishNode(parameter);

            node.parameters = <NodeArray<ParameterDeclaration>>[parameter];
            node.parameters.pos = parameter.pos;
            node.parameters.end = parameter.end;

            parseExpected(SyntaxKind.EqualsGreaterThanToken);
            node.body = parseArrowFunctionExpressionBody();

            return finishNode(node);
        }

        function tryParseParenthesizedArrowFunctionExpression(): Expression {
            var triState = isParenthesizedArrowFunctionExpression();

            if (triState === Tristate.False) {
                // It's definitely not a parenthesized arrow function expression.
                return undefined;
            }

            // If we definitely have an arrow function, then we can just parse one, not requiring a
            // following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
            // it out, but don't allow any ambiguity, and return 'undefined' if this could be an
            // expression instead.
            var arrowFunction = triState === Tristate.True
                ? parseParenthesizedArrowFunctionExpressionHead(/*allowAmbiguity:*/ true)
                : tryParse(parsePossibleParenthesizedArrowFunctionExpressionHead);

            if (!arrowFunction) {
                // Didn't appear to actually be a parenthesized arrow function.  Just bail out.
                return undefined;
            }

            // If we have an arrow, then try to parse the body. Even if not, try to parse if we 
            // have an opening brace, just in case we're in an error state.
            if (parseExpected(SyntaxKind.EqualsGreaterThanToken) || token === SyntaxKind.OpenBraceToken) {
                arrowFunction.body = parseArrowFunctionExpressionBody();
            }
            else {
                // If not, we're probably better off bailing out and returning a bogus function expression.
                arrowFunction.body = parseIdentifier();
            }

            return finishNode(arrowFunction);
        }

        //  True        -> We definitely expect a parenthesized arrow function here.
        //  False       -> There *cannot* be a parenthesized arrow function here.
        //  Unknown     -> There *might* be a parenthesized arrow function here.
        //                 Speculatively look ahead to be sure, and rollback if not.
        function isParenthesizedArrowFunctionExpression(): Tristate {
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
            }

            if (token === SyntaxKind.EqualsGreaterThanToken) {
                // ERROR RECOVERY TWEAK:
                // If we see a standalone => try to parse it as an arrow function expression as that's
                // likely what the user intended to write.
                return Tristate.True;
            }
            // Definitely not a parenthesized arrow function.
            return Tristate.False;
        }

        function isParenthesizedArrowFunctionExpressionWorker() {
            var first = token;
            var second = nextToken();

            if (first === SyntaxKind.OpenParenToken) {
                if (second === SyntaxKind.CloseParenToken) {
                    // Simple cases: "() =>", "(): ", and  "() {".
                    // This is an arrow function with no parameters.
                    // The last one is not actually an arrow function,
                    // but this is probably what the user intended.
                    var third = nextToken();
                    switch (third) {
                        case SyntaxKind.EqualsGreaterThanToken:
                        case SyntaxKind.ColonToken:
                        case SyntaxKind.OpenBraceToken:
                            return Tristate.True;
                        default:
                            return Tristate.False;
                    }
                }

                // Simple case: "(..."
                // This is an arrow function with a rest parameter.
                if (second === SyntaxKind.DotDotDotToken) {
                    return Tristate.True;
                }

                // If we had "(" followed by something that's not an identifier,
                // then this definitely doesn't look like a lambda.
                // Note: we could be a little more lenient and allow
                // "(public" or "(private". These would not ever actually be allowed,
                // but we could provide a good error message instead of bailing out.
                if (!isIdentifier()) {
                    return Tristate.False;
                }

                // If we have something like "(a:", then we must have a
                // type-annotated parameter in an arrow function expression.
                if (nextToken() === SyntaxKind.ColonToken) {
                    return Tristate.True;
                }

                // This *could* be a parenthesized arrow function.
                // Return Unknown to let the caller know.
                return Tristate.Unknown;
            }
            else {
                Debug.assert(first === SyntaxKind.LessThanToken);

                // If we have "<" not followed by an identifier,
                // then this definitely is not an arrow function.
                if (!isIdentifier()) {
                    return Tristate.False;
                }

                // This *could* be a parenthesized arrow function.
                return Tristate.Unknown;
            }
        }

        function parsePossibleParenthesizedArrowFunctionExpressionHead() {
            return parseParenthesizedArrowFunctionExpressionHead(/*allowAmbiguity:*/ false);
        }

        function parseParenthesizedArrowFunctionExpressionHead(allowAmbiguity: boolean): FunctionExpression {
            var node = <FunctionExpression>createNode(SyntaxKind.ArrowFunction);
            // Arrow functions are never generators.
            //
            // If we're speculatively parsing a signature for a parenthesized arrow function, then
            // we have to have a complete parameter list.  Otherwise we might see something like
            // a => (b => c)
            // And think that "(b =>" was actually a parenthesized arrow function with a missing 
            // close paren.
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ !allowAmbiguity, node);

            // If we couldn't get parameters, we definitely could not parse out an arrow function.
            if (!node.parameters) {
                return undefined;
            }

            // Parsing a signature isn't enough.
            // Parenthesized arrow signatures often look like other valid expressions.
            // For instance:
            //  - "(x = 10)" is an assignment expression parsed as a signature with a default parameter value.
            //  - "(x,y)" is a comma expression parsed as a signature with two parameters.
            //  - "a ? (b): c" will have "(b):" parsed as a signature with a return type annotation.
            //
            // So we need just a bit of lookahead to ensure that it can only be a signature.
            if (!allowAmbiguity && token !== SyntaxKind.EqualsGreaterThanToken && token !== SyntaxKind.OpenBraceToken) {
                // Returning undefined here will cause our caller to rewind to where we started from.
                return undefined;
            }

            return node;
        }

        function parseArrowFunctionExpressionBody(): Block | Expression {
            if (token === SyntaxKind.OpenBraceToken) {
                return parseFunctionBlock(/*allowYield:*/ false, /* ignoreMissingOpenBrace */ false);
            }

            if (isStartOfStatement(/*inErrorRecovery:*/ true) && !isStartOfExpressionStatement() && token !== SyntaxKind.FunctionKeyword) {
                // Check if we got a plain statement (i.e. no expression-statements, no functions expressions/declarations)
                //
                // Here we try to recover from a potential error situation in the case where the 
                // user meant to supply a block. For example, if the user wrote:
                //
                //  a =>
                //      var v = 0;
                //  }
                //
                // they may be missing an open brace.  Check to see if that's the case so we can
                // try to recover better.  If we don't do this, then the next close curly we see may end
                // up preemptively closing the containing construct.
                //
                // Note: even when 'ignoreMissingOpenBrace' is passed as true, parseBody will still error.
                return parseFunctionBlock(/*allowYield:*/ false, /* ignoreMissingOpenBrace */ true);
            }

            return parseAssignmentExpressionOrHigher();
        }

        function parseConditionalExpressionRest(leftOperand: Expression): Expression {
            // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
            if (!parseOptional(SyntaxKind.QuestionToken)) {
                return leftOperand;
            }

            // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and 
            // we do not that for the 'whenFalse' part.  
            var node = <ConditionalExpression>createNode(SyntaxKind.ConditionalExpression, leftOperand.pos);
            node.condition = leftOperand;
            node.whenTrue = allowInAnd(parseAssignmentExpressionOrHigher);
            parseExpected(SyntaxKind.ColonToken);
            node.whenFalse = parseAssignmentExpressionOrHigher();
            return finishNode(node);
        }

        function parseBinaryExpressionOrHigher(precedence: number): Expression {
            var leftOperand = parseUnaryExpressionOrHigher();
            return parseBinaryExpressionRest(precedence, leftOperand);
        }

        function parseBinaryExpressionRest(precedence: number, leftOperand: Expression): Expression {
            while (true) {
                // We either have a binary operator here, or we're finished.  We call 
                // reScanGreaterToken so that we merge token sequences like > and = into >=

                reScanGreaterToken();
                var newPrecedence = getBinaryOperatorPrecedence();

                // Check the precedence to see if we should "take" this operator
                if (newPrecedence <= precedence) {
                    break;
                }

                if (token === SyntaxKind.InKeyword && inDisallowInContext()) {
                    break;
                }

                var operator = token;
                nextToken();
                leftOperand = makeBinaryExpression(leftOperand, operator, parseBinaryExpressionOrHigher(newPrecedence));
            }

            return leftOperand;
        }

        function isBinaryOperator() {
            if (inDisallowInContext() && token === SyntaxKind.InKeyword) {
                return false;
            }

            return getBinaryOperatorPrecedence() > 0;
        }

        function getBinaryOperatorPrecedence(): number {
            switch (token) {
                case SyntaxKind.BarBarToken:
                    return 1;
                case SyntaxKind.AmpersandAmpersandToken:
                    return 2;
                case SyntaxKind.BarToken:
                    return 3;
                case SyntaxKind.CaretToken:
                    return 4;
                case SyntaxKind.AmpersandToken:
                    return 5;
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                    return 6;
                case SyntaxKind.LessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.InstanceOfKeyword:
                case SyntaxKind.InKeyword:
                    return 7;
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                    return 8;
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                    return 9;
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                    return 10;
            }

            // -1 is lower than all other precedences.  Returning it will cause binary expression
            // parsing to stop.
            return -1;
        }

        function makeBinaryExpression(left: Expression, operator: SyntaxKind, right: Expression): BinaryExpression {
            var node = <BinaryExpression>createNode(SyntaxKind.BinaryExpression, left.pos);
            node.left = left;
            node.operator = operator;
            node.right = right;
            return finishNode(node);
        }

        function parsePrefixUnaryExpression() {
            var node = <PrefixUnaryExpression>createNode(SyntaxKind.PrefixUnaryExpression);
            node.operator = token;
            nextToken();
            node.operand = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseDeleteExpression() {
            var node = <DeleteExpression>createNode(SyntaxKind.DeleteExpression);
            nextToken();
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseTypeOfExpression() {
            var node = <TypeOfExpression>createNode(SyntaxKind.TypeOfExpression);
            nextToken();
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseVoidExpression() {
            var node = <VoidExpression>createNode(SyntaxKind.VoidExpression);
            nextToken();
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseUnaryExpressionOrHigher(): UnaryExpression {
            switch (token) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    return parsePrefixUnaryExpression();
                case SyntaxKind.DeleteKeyword:
                    return parseDeleteExpression();
                case SyntaxKind.TypeOfKeyword:
                    return parseTypeOfExpression();
                case SyntaxKind.VoidKeyword:
                    return parseVoidExpression();
                case SyntaxKind.LessThanToken:
                    return parseTypeAssertion();
                default:
                    return parsePostfixExpressionOrHigher();
            }
        }

        function parsePostfixExpressionOrHigher(): PostfixExpression {
            var expression = parseLeftHandSideExpressionOrHigher();

            Debug.assert(isLeftHandSideExpression(expression));
            if ((token === SyntaxKind.PlusPlusToken || token === SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
                var node = <PostfixUnaryExpression>createNode(SyntaxKind.PostfixUnaryExpression, expression.pos);
                node.operand = expression;
                node.operator = token;
                nextToken();
                return finishNode(node);
            }

            return expression;
        }

        function parseLeftHandSideExpressionOrHigher(): LeftHandSideExpression {
            // Original Ecma:
            // LeftHandSideExpression: See 11.2 
            //      NewExpression
            //      CallExpression 
            //
            // Our simplification:
            //
            // LeftHandSideExpression: See 11.2 
            //      MemberExpression  
            //      CallExpression 
            //
            // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
            // MemberExpression to make our lives easier.
            //
            // to best understand the below code, it's important to see how CallExpression expands
            // out into its own productions:
            //
            // CallExpression:
            //      MemberExpression Arguments 
            //      CallExpression Arguments
            //      CallExpression[Expression]
            //      CallExpression.IdentifierName
            //      super   (   ArgumentListopt   )
            //      super.IdentifierName
            //
            // Because of the recursion in these calls, we need to bottom out first.  There are two 
            // bottom out states we can run into.  Either we see 'super' which must start either of
            // the last two CallExpression productions.  Or we have a MemberExpression which either
            // completes the LeftHandSideExpression, or starts the beginning of the first four
            // CallExpression productions.
            var expression = token === SyntaxKind.SuperKeyword
                ? parseSuperExpression()
                : parseMemberExpressionOrHigher();

            // Now, we *may* be complete.  However, we might have consumed the start of a 
            // CallExpression.  As such, we need to consume the rest of it here to be complete.
            return parseCallExpressionRest(expression);
        }

        function parseMemberExpressionOrHigher(): MemberExpression {
            // Note: to make our lives simpler, we decompose the the NewExpression productions and
            // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
            // like so:
            //
            //   PrimaryExpression : See 11.1 
            //      this
            //      Identifier
            //      Literal
            //      ArrayLiteral
            //      ObjectLiteral
            //      (Expression) 
            //      FunctionExpression
            //      new MemberExpression Arguments?
            //
            //   MemberExpression : See 11.2 
            //      PrimaryExpression 
            //      MemberExpression[Expression]
            //      MemberExpression.IdentifierName
            //
            //   CallExpression : See 11.2 
            //      MemberExpression 
            //      CallExpression Arguments
            //      CallExpression[Expression]
            //      CallExpression.IdentifierName 
            //
            // Technically this is ambiguous.  i.e. CallExpression defines:
            //
            //   CallExpression:
            //      CallExpression Arguments
            // 
            // If you see: "new Foo()"
            //
            // Then that could be treated as a single ObjectCreationExpression, or it could be 
            // treated as the invocation of "new Foo".  We disambiguate that in code (to match
            // the original grammar) by making sure that if we see an ObjectCreationExpression
            // we always consume arguments if they are there. So we treat "new Foo()" as an
            // object creation only, and not at all as an invocation)  Another way to think 
            // about this is that for every "new" that we see, we will consume an argument list if
            // it is there as part of the *associated* object creation node.  Any additional
            // argument lists we see, will become invocation expressions.
            //
            // Because there are no other places in the grammar now that refer to FunctionExpression
            // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
            // production.
            //
            // Because CallExpression and MemberExpression are left recursive, we need to bottom out
            // of the recursion immediately.  So we parse out a primary expression to start with.
            var expression = parsePrimaryExpression();
            return parseMemberExpressionRest(expression);
        }

        function parseSuperExpression(): MemberExpression {
            var expression = parseTokenNode<PrimaryExpression>();
            if (token === SyntaxKind.OpenParenToken || token === SyntaxKind.DotToken) {
                return expression;
            }

            // If we have seen "super" it must be followed by '(' or '.'.
            // If it wasn't then just try to parse out a '.' and report an error.
            var node = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, expression.pos);
            node.expression = expression;
            parseExpected(SyntaxKind.DotToken, Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
            node.name = parseRightSideOfDot(/*allowIdentifierNames:*/ true);
            return finishNode(node);
        }

        function parseTypeAssertion(): TypeAssertion {
            var node = <TypeAssertion>createNode(SyntaxKind.TypeAssertionExpression);
            parseExpected(SyntaxKind.LessThanToken);
            node.type = parseType();
            parseExpected(SyntaxKind.GreaterThanToken);
            node.expression = parseUnaryExpressionOrHigher();
            return finishNode(node);
        }

        function parseMemberExpressionRest(expression: LeftHandSideExpression): MemberExpression {
            while (true) {
                var dotOrBracketStart = scanner.getTokenPos();
                if (parseOptional(SyntaxKind.DotToken)) {
                    var propertyAccess = <PropertyAccessExpression>createNode(SyntaxKind.PropertyAccessExpression, expression.pos);
                    propertyAccess.expression = expression;
                    propertyAccess.name = parseRightSideOfDot(/*allowIdentifierNames:*/ true);
                    expression = finishNode(propertyAccess);
                    continue;
                }

                if (parseOptional(SyntaxKind.OpenBracketToken)) {
                    var indexedAccess = <ElementAccessExpression>createNode(SyntaxKind.ElementAccessExpression, expression.pos);
                    indexedAccess.expression = expression;

                    // It's not uncommon for a user to write: "new Type[]".
                    // Check for that common pattern and report a better error message.
                    if (token !== SyntaxKind.CloseBracketToken) {
                        indexedAccess.argumentExpression = allowInAnd(parseExpression);
                        if (indexedAccess.argumentExpression.kind === SyntaxKind.StringLiteral || indexedAccess.argumentExpression.kind === SyntaxKind.NumericLiteral) {
                            var literal = <LiteralExpression>indexedAccess.argumentExpression;
                            literal.text = internIdentifier(literal.text);
                        }
                    }

                    parseExpected(SyntaxKind.CloseBracketToken);
                    expression = finishNode(indexedAccess);
                    continue;
                }

                if (token === SyntaxKind.NoSubstitutionTemplateLiteral || token === SyntaxKind.TemplateHead) {
                    var tagExpression = <TaggedTemplateExpression>createNode(SyntaxKind.TaggedTemplateExpression, expression.pos);
                    tagExpression.tag = expression;
                    tagExpression.template = token === SyntaxKind.NoSubstitutionTemplateLiteral
                        ? parseLiteralNode()
                        : parseTemplateExpression();
                    expression = finishNode(tagExpression);
                    continue;
                }

                return <MemberExpression>expression;
            }
        }

        function parseCallExpressionRest(expression: LeftHandSideExpression): LeftHandSideExpression {
            while (true) {
                expression = parseMemberExpressionRest(expression);

                if (token === SyntaxKind.LessThanToken) {
                    // See if this is the start of a generic invocation.  If so, consume it and
                    // keep checking for postfix expressions.  Otherwise, it's just a '<' that's 
                    // part of an arithmetic expression.  Break out so we consume it higher in the
                    // stack.
                    var typeArguments = tryParse(parseTypeArgumentsInExpression);
                    if (!typeArguments) {
                        return expression;
                    }

                    var callExpr = <CallExpression>createNode(SyntaxKind.CallExpression, expression.pos);
                    callExpr.expression = expression;
                    callExpr.typeArguments = typeArguments;
                    callExpr.arguments = parseArgumentList();
                    expression = finishNode(callExpr);
                    continue;
                }
                else if (token === SyntaxKind.OpenParenToken) {
                    var callExpr = <CallExpression>createNode(SyntaxKind.CallExpression, expression.pos);
                    callExpr.expression = expression;
                    callExpr.arguments = parseArgumentList();
                    expression = finishNode(callExpr);
                    continue;
                }

                return expression;
            }
        }

        function parseArgumentList() {
            parseExpected(SyntaxKind.OpenParenToken);
            var result = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            return result;
        }

        function parseTypeArgumentsInExpression() {
            if (!parseOptional(SyntaxKind.LessThanToken)) {
                return undefined;
            }

            var typeArguments = parseDelimitedList(ParsingContext.TypeArguments, parseType);
            if (!parseExpected(SyntaxKind.GreaterThanToken)) {
                // If it doesn't have the closing >  then it's definitely not an type argument list.
                return undefined;
            }

            // If we have a '<', then only parse this as a arugment list if the type arguments
            // are complete and we have an open paren.  if we don't, rewind and return nothing.
            return typeArguments && canFollowTypeArgumentsInExpression()
                ? typeArguments
                : undefined;
        }

        function canFollowTypeArgumentsInExpression(): boolean {
            switch (token) {
                case SyntaxKind.OpenParenToken:                 // foo<x>(   
                // this case are the only case where this token can legally follow a type argument 
                // list.  So we definitely want to treat this as a type arg list.

                case SyntaxKind.DotToken:                       // foo<x>.
                case SyntaxKind.CloseParenToken:                // foo<x>)
                case SyntaxKind.CloseBracketToken:              // foo<x>]
                case SyntaxKind.ColonToken:                     // foo<x>:
                case SyntaxKind.SemicolonToken:                 // foo<x>;
                case SyntaxKind.CommaToken:                     // foo<x>,
                case SyntaxKind.QuestionToken:                  // foo<x>?
                case SyntaxKind.EqualsEqualsToken:              // foo<x> ==
                case SyntaxKind.EqualsEqualsEqualsToken:        // foo<x> ===
                case SyntaxKind.ExclamationEqualsToken:         // foo<x> !=
                case SyntaxKind.ExclamationEqualsEqualsToken:   // foo<x> !==
                case SyntaxKind.AmpersandAmpersandToken:        // foo<x> &&
                case SyntaxKind.BarBarToken:                    // foo<x> ||
                case SyntaxKind.CaretToken:                     // foo<x> ^
                case SyntaxKind.AmpersandToken:                 // foo<x> &
                case SyntaxKind.BarToken:                       // foo<x> |
                case SyntaxKind.CloseBraceToken:                // foo<x> }
                case SyntaxKind.EndOfFileToken:                 // foo<x>
                    // these cases can't legally follow a type arg list.  However, they're not legal 
                    // expressions either.  The user is probably in the middle of a generic type. So
                    // treat it as such.
                    return true;

                default:
                    // Anything else treat as an expression.
                    return false;
            }
        }

        function parsePrimaryExpression(): PrimaryExpression {
            switch (token) {
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return parseLiteralNode();
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return parseTokenNode<PrimaryExpression>();
                case SyntaxKind.OpenParenToken:
                    return parseParenthesizedExpression();
                case SyntaxKind.OpenBracketToken:
                    return parseArrayLiteralExpression();
                case SyntaxKind.OpenBraceToken:
                    return parseObjectLiteralExpression();
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionExpression();
                case SyntaxKind.NewKeyword:
                    return parseNewExpression();
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                    if (reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                        return parseLiteralNode();
                    }
                    break;
                case SyntaxKind.TemplateHead:
                    return parseTemplateExpression();
            }

            return parseIdentifier(Diagnostics.Expression_expected);
        }

        function parseParenthesizedExpression(): ParenthesizedExpression {
            var node = <ParenthesizedExpression>createNode(SyntaxKind.ParenthesizedExpression);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseAssignmentExpressionOrOmittedExpression(): Expression {
            return token === SyntaxKind.CommaToken
                ? <Expression>createNode(SyntaxKind.OmittedExpression)
                : parseAssignmentExpressionOrHigher();
        }

        function parseSpreadElement(): Expression {
            var node = <SpreadElementExpression>createNode(SyntaxKind.SpreadElementExpression);
            parseExpected(SyntaxKind.DotDotDotToken);
            node.expression = parseAssignmentExpressionOrHigher();
            return finishNode(node);
        }

        function parseArrayLiteralElement(): Expression {
            return token === SyntaxKind.DotDotDotToken ? parseSpreadElement() : parseAssignmentExpressionOrOmittedExpression();
        }

        function parseArgumentExpression(): Expression {
            return allowInAnd(parseAssignmentExpressionOrOmittedExpression);
        }

        function parseArrayLiteralExpression(): ArrayLiteralExpression {
            var node = <ArrayLiteralExpression>createNode(SyntaxKind.ArrayLiteralExpression);
            parseExpected(SyntaxKind.OpenBracketToken);
            if (scanner.hasPrecedingLineBreak()) node.flags |= NodeFlags.MultiLine;
            node.elements = parseDelimitedList(ParsingContext.ArrayLiteralMembers, parseArrayLiteralElement);
            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function tryParseAccessorDeclaration(fullStart: number, modifiers: ModifiersArray): AccessorDeclaration {
            if (parseContextualModifier(SyntaxKind.GetKeyword)) {
                return parseAccessorDeclaration(SyntaxKind.GetAccessor, fullStart, modifiers);
            }
            else if (parseContextualModifier(SyntaxKind.SetKeyword)) {
                return parseAccessorDeclaration(SyntaxKind.SetAccessor, fullStart, modifiers);
            }

            return undefined;
        }

        function parseObjectLiteralElement(): ObjectLiteralElement {
            var fullStart = scanner.getStartPos();
            var modifiers = parseModifiers();

            var accessor = tryParseAccessorDeclaration(fullStart, modifiers);
            if (accessor) {
                return accessor;
            }

            var asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            var tokenIsIdentifier = isIdentifier();
            var nameToken = token;
            var propertyName = parsePropertyName();

            // Disallowing of optional property assignments happens in the grammar checker.
            var questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
            if (asteriskToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return parseMethodDeclaration(fullStart, modifiers, asteriskToken, propertyName, questionToken);
            }

            // Parse to check if it is short-hand property assignment or normal property assignment
            if ((token === SyntaxKind.CommaToken || token === SyntaxKind.CloseBraceToken) && tokenIsIdentifier) {
                var shorthandDeclaration = <ShorthandPropertyAssignment>createNode(SyntaxKind.ShorthandPropertyAssignment, fullStart);
                shorthandDeclaration.name = <Identifier>propertyName;
                shorthandDeclaration.questionToken = questionToken;
                return finishNode(shorthandDeclaration);
            }
            else {
                var propertyAssignment = <PropertyAssignment>createNode(SyntaxKind.PropertyAssignment, fullStart);
                propertyAssignment.name = propertyName;
                propertyAssignment.questionToken = questionToken;
                parseExpected(SyntaxKind.ColonToken);
                propertyAssignment.initializer = allowInAnd(parseAssignmentExpressionOrHigher);
                return finishNode(propertyAssignment);
            }
        }

        function parseObjectLiteralExpression(): ObjectLiteralExpression {
            var node = <ObjectLiteralExpression>createNode(SyntaxKind.ObjectLiteralExpression);
            parseExpected(SyntaxKind.OpenBraceToken);
            if (scanner.hasPrecedingLineBreak()) {
                node.flags |= NodeFlags.MultiLine;
            }

            node.properties = parseDelimitedList(ParsingContext.ObjectLiteralMembers, parseObjectLiteralElement);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseFunctionExpression(): FunctionExpression {
            // GeneratorExpression :
            //      function * BindingIdentifier[Yield]opt (FormalParameters[Yield, GeneratorParameter]) { GeneratorBody[Yield] }
            // FunctionExpression:
            //      function BindingIdentifieropt(FormalParameters) { FunctionBody }
            var node = <FunctionExpression>createNode(SyntaxKind.FunctionExpression);
            parseExpected(SyntaxKind.FunctionKeyword);
            node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            node.name = node.asteriskToken ? doInYieldContext(parseOptionalIdentifier) : parseOptionalIdentifier();
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ !!node.asteriskToken, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlock(/*allowYield:*/ !!node.asteriskToken, /* ignoreMissingOpenBrace */ false);
            return finishNode(node);
        }

        function parseOptionalIdentifier() {
            return isIdentifier() ? parseIdentifier() : undefined;
        }

        function parseNewExpression(): NewExpression {
            var node = <NewExpression>createNode(SyntaxKind.NewExpression);
            parseExpected(SyntaxKind.NewKeyword);
            node.expression = parseMemberExpressionOrHigher();
            node.typeArguments = tryParse(parseTypeArgumentsInExpression);
            if (node.typeArguments || token === SyntaxKind.OpenParenToken) {
                node.arguments = parseArgumentList();
            }

            return finishNode(node);
        }

        // STATEMENTS
        function parseBlock(ignoreMissingOpenBrace: boolean, checkForStrictMode: boolean, diagnosticMessage?: DiagnosticMessage): Block {
            var node = <Block>createNode(SyntaxKind.Block);
            if (parseExpected(SyntaxKind.OpenBraceToken, diagnosticMessage) || ignoreMissingOpenBrace) {
                node.statements = parseList(ParsingContext.BlockStatements, checkForStrictMode, parseStatement);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.statements = createMissingList<Statement>();
            }
            return finishNode(node);
        }

        function parseFunctionBlock(allowYield: boolean, ignoreMissingOpenBrace: boolean, diagnosticMessage?: DiagnosticMessage): Block {
            var savedYieldContext = inYieldContext();
            setYieldContext(allowYield);

            var block = parseBlock(ignoreMissingOpenBrace, /*checkForStrictMode*/ true, diagnosticMessage);

            setYieldContext(savedYieldContext);

            return block;
        }

        function parseEmptyStatement(): Statement {
            var node = <Statement>createNode(SyntaxKind.EmptyStatement);
            parseExpected(SyntaxKind.SemicolonToken);
            return finishNode(node);
        }

        function parseIfStatement(): IfStatement {
            var node = <IfStatement>createNode(SyntaxKind.IfStatement);
            parseExpected(SyntaxKind.IfKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node.thenStatement = parseStatement();
            node.elseStatement = parseOptional(SyntaxKind.ElseKeyword) ? parseStatement() : undefined;
            return finishNode(node);
        }

        function parseDoStatement(): DoStatement {
            var node = <DoStatement>createNode(SyntaxKind.DoStatement);
            parseExpected(SyntaxKind.DoKeyword);
            node.statement = parseStatement();
            parseExpected(SyntaxKind.WhileKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);

            // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
            // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in 
            // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
            //  do;while(0)x will have a semicolon inserted before x.
            parseOptional(SyntaxKind.SemicolonToken);
            return finishNode(node);
        }

        function parseWhileStatement(): WhileStatement {
            var node = <WhileStatement>createNode(SyntaxKind.WhileStatement);
            parseExpected(SyntaxKind.WhileKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseForOrForInStatement(): Statement {
            var pos = getNodePos();
            parseExpected(SyntaxKind.ForKeyword);
            parseExpected(SyntaxKind.OpenParenToken);

            var initializer: VariableDeclarationList | Expression = undefined;
            if (token !== SyntaxKind.SemicolonToken) {
                if (token === SyntaxKind.VarKeyword || token === SyntaxKind.LetKeyword || token === SyntaxKind.ConstKeyword) {
                    initializer = parseVariableDeclarationList(/*disallowIn:*/ true);
                }
                else {
                    initializer = disallowInAnd(parseExpression);
                }
            }
            var forOrForInStatement: IterationStatement;
            if (parseOptional(SyntaxKind.InKeyword)) {
                var forInStatement = <ForInStatement>createNode(SyntaxKind.ForInStatement, pos);
                forInStatement.initializer = initializer;
                forInStatement.expression = allowInAnd(parseExpression);
                parseExpected(SyntaxKind.CloseParenToken);
                forOrForInStatement = forInStatement;
            }
            else {
                var forStatement = <ForStatement>createNode(SyntaxKind.ForStatement, pos);
                forStatement.initializer = initializer;
                parseExpected(SyntaxKind.SemicolonToken);
                if (token !== SyntaxKind.SemicolonToken && token !== SyntaxKind.CloseParenToken) {
                    forStatement.condition = allowInAnd(parseExpression);
                }
                parseExpected(SyntaxKind.SemicolonToken);
                if (token !== SyntaxKind.CloseParenToken) {
                    forStatement.iterator = allowInAnd(parseExpression);
                }
                parseExpected(SyntaxKind.CloseParenToken);
                forOrForInStatement = forStatement;
            }

            forOrForInStatement.statement = parseStatement();

            return finishNode(forOrForInStatement);
        }

        function parseBreakOrContinueStatement(kind: SyntaxKind): BreakOrContinueStatement {
            var node = <BreakOrContinueStatement>createNode(kind);

            parseExpected(kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword);
            if (!canParseSemicolon()) {
                node.label = parseIdentifier();
            }

            parseSemicolon();
            return finishNode(node);
        }

        function parseReturnStatement(): ReturnStatement {
            var node = <ReturnStatement>createNode(SyntaxKind.ReturnStatement);

            parseExpected(SyntaxKind.ReturnKeyword);
            if (!canParseSemicolon()) {
                node.expression = allowInAnd(parseExpression);
            }

            parseSemicolon();
            return finishNode(node);
        }

        function parseWithStatement(): WithStatement {
            var node = <WithStatement>createNode(SyntaxKind.WithStatement);
            parseExpected(SyntaxKind.WithKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node.statement = parseStatement();
            return finishNode(node);
        }

        function parseCaseClause(): CaseClause {
            var node = <CaseClause>createNode(SyntaxKind.CaseClause);
            parseExpected(SyntaxKind.CaseKeyword);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.ColonToken);
            node.statements = parseList(ParsingContext.SwitchClauseStatements, /*checkForStrictMode*/ false, parseStatement);
            return finishNode(node);
        }

        function parseDefaultClause(): DefaultClause {
            var node = <DefaultClause>createNode(SyntaxKind.DefaultClause);
            parseExpected(SyntaxKind.DefaultKeyword);
            parseExpected(SyntaxKind.ColonToken);
            node.statements = parseList(ParsingContext.SwitchClauseStatements, /*checkForStrictMode*/ false, parseStatement);
            return finishNode(node);
        }

        function parseCaseOrDefaultClause(): CaseOrDefaultClause {
            return token === SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
        }

        function parseSwitchStatement(): SwitchStatement {
            var node = <SwitchStatement>createNode(SyntaxKind.SwitchStatement);
            parseExpected(SyntaxKind.SwitchKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            node.expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            parseExpected(SyntaxKind.OpenBraceToken);
            node.clauses = parseList(ParsingContext.SwitchClauses, /*checkForStrictMode*/ false, parseCaseOrDefaultClause);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseThrowStatement(): ThrowStatement {
            // ThrowStatement[Yield] :
            //      throw [no LineTerminator here]Expression[In, ?Yield];

            // Because of automatic semicolon insertion, we need to report error if this 
            // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
            // directly as that might consume an expression on the following line.  
            // We just return 'undefined' in that case.  The actual error will be reported in the
            // grammar walker.
            var node = <ThrowStatement>createNode(SyntaxKind.ThrowStatement);
            parseExpected(SyntaxKind.ThrowKeyword);
            node.expression = scanner.hasPrecedingLineBreak() ? undefined : allowInAnd(parseExpression);
            parseSemicolon();
            return finishNode(node);
        }

        // TODO: Review for error recovery
        function parseTryStatement(): TryStatement {
            var node = <TryStatement>createNode(SyntaxKind.TryStatement);

            parseExpected(SyntaxKind.TryKeyword);
            node.tryBlock = parseBlock(/*ignoreMissingOpenBrace:*/ false, /*checkForStrictMode*/ false);
            node.catchClause = token === SyntaxKind.CatchKeyword ? parseCatchClause() : undefined;

            // If we don't have a catch clause, then we must have a finally clause.  Try to parse
            // one out no matter what.
            if (!node.catchClause || token === SyntaxKind.FinallyKeyword) {
                parseExpected(SyntaxKind.FinallyKeyword);
                node.finallyBlock = parseBlock(/*ignoreMissingOpenBrace:*/ false, /*checkForStrictMode*/ false);
            }

            return finishNode(node);
        }

        function parseCatchClause(): CatchClause {
            var result = <CatchClause>createNode(SyntaxKind.CatchClause);
            parseExpected(SyntaxKind.CatchKeyword);
            parseExpected(SyntaxKind.OpenParenToken);
            result.name = parseIdentifier();
            result.type = parseTypeAnnotation();
            parseExpected(SyntaxKind.CloseParenToken);
            result.block = parseBlock(/*ignoreMissingOpenBrace:*/ false, /*checkForStrictMode:*/ false);
            return finishNode(result);
        }

        function parseDebuggerStatement(): Statement {
            var node = <Statement>createNode(SyntaxKind.DebuggerStatement);
            parseExpected(SyntaxKind.DebuggerKeyword);
            parseSemicolon();
            return finishNode(node);
        }

        function parseExpressionOrLabeledStatement(): ExpressionStatement | LabeledStatement {
            // Avoiding having to do the lookahead for a labeled statement by just trying to parse
            // out an expression, seeing if it is identifier and then seeing if it is followed by
            // a colon.
            var fullStart = scanner.getStartPos();
            var expression = allowInAnd(parseExpression);

            if (expression.kind === SyntaxKind.Identifier && parseOptional(SyntaxKind.ColonToken)) {
                var labeledStatement = <LabeledStatement>createNode(SyntaxKind.LabeledStatement, fullStart);
                labeledStatement.label = <Identifier>expression;
                labeledStatement.statement = parseStatement();
                return finishNode(labeledStatement);
            }
            else {
                var expressionStatement = <ExpressionStatement>createNode(SyntaxKind.ExpressionStatement, fullStart);
                expressionStatement.expression = expression;
                parseSemicolon();
                return finishNode(expressionStatement);
            }
        }

        function isStartOfStatement(inErrorRecovery: boolean): boolean {
            // Functions and variable statements are allowed as a statement.  But as per the grammar,
            // they also allow modifiers.  So we have to check for those statements that might be 
            // following modifiers.This ensures that things work properly when incrementally parsing 
            // as the parser will produce the same FunctionDeclaraiton or VariableStatement if it has 
            // the same text regardless of whether it is inside a block or not.
            if (isModifier(token)) {
                var result = lookAhead(parseVariableStatementOrFunctionDeclarationWithModifiers);
                if (result) {
                    return true;
                }
            }

            switch (token) {
                case SyntaxKind.SemicolonToken:
                    // If we're in error recovery, then we don't want to treat ';' as an empty statement.
                    // The problem is that ';' can show up in far too many contexts, and if we see one
                    // and assume it's a statement, then we may bail out inappropriately from whatever
                    // we're parsing.  For example, if we have a semicolon in the middle of a class, then
                    // we really don't want to assume the class is over and we're on a statement in the
                    // outer module.  We just want to consume and move on.
                    return !inErrorRecovery;
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.VarKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.IfKeyword:
                case SyntaxKind.DoKeyword:
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.ForKeyword:
                case SyntaxKind.ContinueKeyword:
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.ReturnKeyword:
                case SyntaxKind.WithKeyword:
                case SyntaxKind.SwitchKeyword:
                case SyntaxKind.ThrowKeyword:
                case SyntaxKind.TryKeyword:
                case SyntaxKind.DebuggerKeyword:
                // 'catch' and 'finally' do not actually indicate that the code is part of a statement,
                // however, we say they are here so that we may gracefully parse them and error later.
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.FinallyKeyword:
                    return true;
                case SyntaxKind.ConstKeyword:
                    // const keyword can precede enum keyword when defining constant enums
                    // 'const enum' do not start statement.
                    // In ES 6 'enum' is a future reserved keyword, so it should not be used as identifier
                    var isConstEnum = lookAhead(nextTokenIsEnumKeyword);
                    return !isConstEnum;
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.ModuleKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.TypeKeyword:
                    // When followed by an identifier, these do not start a statement but might
                    // instead be following declarations
                    if (isDeclarationStart()) {
                        return false;
                    }

                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    // When followed by an identifier or keyword, these do not start a statement but
                    // might instead be following type members
                    if (lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine)) {
                        return false;
                    }
                default:
                    return isStartOfExpression();
            }
        }

        function nextTokenIsEnumKeyword() {
            nextToken();
            return token === SyntaxKind.EnumKeyword
        }

        function nextTokenIsIdentifierOrKeywordOnSameLine() {
            nextToken();
            return isIdentifierOrKeyword() && !scanner.hasPrecedingLineBreak();
        }

        function parseStatement(): Statement {
            switch (token) {
                case SyntaxKind.OpenBraceToken:
                    return parseBlock(/*ignoreMissingOpenBrace:*/ false, /*checkForStrictMode:*/ false);
                case SyntaxKind.VarKeyword:
                case SyntaxKind.ConstKeyword:
                    // const here should always be parsed as const declaration because of check in 'isStatement' 
                    return parseVariableStatement(scanner.getStartPos(), /*modifiers:*/ undefined);
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionDeclaration(scanner.getStartPos(), /*modifiers:*/ undefined);
                case SyntaxKind.SemicolonToken:
                    return parseEmptyStatement();
                case SyntaxKind.IfKeyword:
                    return parseIfStatement();
                case SyntaxKind.DoKeyword:
                    return parseDoStatement();
                case SyntaxKind.WhileKeyword:
                    return parseWhileStatement();
                case SyntaxKind.ForKeyword:
                    return parseForOrForInStatement();
                case SyntaxKind.ContinueKeyword:
                    return parseBreakOrContinueStatement(SyntaxKind.ContinueStatement);
                case SyntaxKind.BreakKeyword:
                    return parseBreakOrContinueStatement(SyntaxKind.BreakStatement);
                case SyntaxKind.ReturnKeyword:
                    return parseReturnStatement();
                case SyntaxKind.WithKeyword:
                    return parseWithStatement();
                case SyntaxKind.SwitchKeyword:
                    return parseSwitchStatement();
                case SyntaxKind.ThrowKeyword:
                    return parseThrowStatement();
                case SyntaxKind.TryKeyword:
                // Include the next two for error recovery.
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.FinallyKeyword:
                    return parseTryStatement();
                case SyntaxKind.DebuggerKeyword:
                    return parseDebuggerStatement();
                case SyntaxKind.LetKeyword:
                    // If let follows identifier on the same line, it is declaration parse it as variable statement
                    if (isLetDeclaration()) {
                        return parseVariableStatement(scanner.getStartPos(), /*modifiers:*/ undefined);
                    }
                // Else parse it like identifier - fall through
                default:
                    // Functions and variable statements are allowed as a statement.  But as per 
                    // the grammar, they also allow modifiers.  So we have to check for those 
                    // statements that might be following modifiers.  This ensures that things
                    // work properly when incrementally parsing as the parser will produce the
                    // same FunctionDeclaraiton or VariableStatement if it has the same text
                    // regardless of whether it is inside a block or not.
                    if (isModifier(token)) {
                        var result = tryParse(parseVariableStatementOrFunctionDeclarationWithModifiers);
                        if (result) {
                            return result;
                        }
                    }

                    return parseExpressionOrLabeledStatement();
            }
        }

        function parseVariableStatementOrFunctionDeclarationWithModifiers(): FunctionDeclaration | VariableStatement {
            var start = scanner.getStartPos();
            var modifiers = parseModifiers();
            switch (token) {
                case SyntaxKind.ConstKeyword:
                    var nextTokenIsEnum = lookAhead(nextTokenIsEnumKeyword)
                    if (nextTokenIsEnum) {
                        return undefined;
                    }
                    return parseVariableStatement(start, modifiers);

                case SyntaxKind.LetKeyword:
                    if (!isLetDeclaration()) {
                        return undefined;
                    }
                    return parseVariableStatement(start, modifiers);

                case SyntaxKind.VarKeyword:
                    return parseVariableStatement(start, modifiers);
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionDeclaration(start, modifiers);
            }

            return undefined;
        }

        function parseFunctionBlockOrSemicolon(isGenerator: boolean, diagnosticMessage?: DiagnosticMessage): Block {
            if (token !== SyntaxKind.OpenBraceToken && canParseSemicolon()) {
                parseSemicolon();
                return;
            }

            return parseFunctionBlock(isGenerator, /*ignoreMissingOpenBrace:*/ false, diagnosticMessage);
        }

        // DECLARATIONS

        function parseArrayBindingElement(): BindingElement {
            if (token === SyntaxKind.CommaToken) {
                return <BindingElement>createNode(SyntaxKind.OmittedExpression);
            }
            var node = <BindingElement>createNode(SyntaxKind.BindingElement);
            node.dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
            node.name = parseIdentifierOrPattern();
            node.initializer = parseInitializer(/*inParameter*/ false);
            return finishNode(node);
        }

        function parseObjectBindingElement(): BindingElement {
            var node = <BindingElement>createNode(SyntaxKind.BindingElement);
            // TODO(andersh): Handle computed properties
            var id = parsePropertyName();
            if (id.kind === SyntaxKind.Identifier && token !== SyntaxKind.ColonToken) {
                node.name = <Identifier>id;
            }
            else {
                parseExpected(SyntaxKind.ColonToken);
                node.propertyName = <Identifier>id;
                node.name = parseIdentifierOrPattern();
            }
            node.initializer = parseInitializer(/*inParameter*/ false);
            return finishNode(node);
        }

        function parseObjectBindingPattern(): BindingPattern {
            var node = <BindingPattern>createNode(SyntaxKind.ObjectBindingPattern);
            parseExpected(SyntaxKind.OpenBraceToken);
            node.elements = parseDelimitedList(ParsingContext.ObjectBindingElements, parseObjectBindingElement);
            parseExpected(SyntaxKind.CloseBraceToken);
            return finishNode(node);
        }

        function parseArrayBindingPattern(): BindingPattern {
            var node = <BindingPattern>createNode(SyntaxKind.ArrayBindingPattern);
            parseExpected(SyntaxKind.OpenBracketToken);
            node.elements = parseDelimitedList(ParsingContext.ArrayBindingElements, parseArrayBindingElement);
            parseExpected(SyntaxKind.CloseBracketToken);
            return finishNode(node);
        }

        function isIdentifierOrPattern() {
            return token === SyntaxKind.OpenBraceToken || token === SyntaxKind.OpenBracketToken || isIdentifier();
        }

        function parseIdentifierOrPattern(): Identifier | BindingPattern {
            if (token === SyntaxKind.OpenBracketToken) {
                return parseArrayBindingPattern();
            }
            if (token === SyntaxKind.OpenBraceToken) {
                return parseObjectBindingPattern();
            }
            return parseIdentifier();
        }

        function parseVariableDeclaration(): VariableDeclaration {
            var node = <VariableDeclaration>createNode(SyntaxKind.VariableDeclaration);
            node.name = parseIdentifierOrPattern();
            node.type = parseTypeAnnotation();
            node.initializer = parseInitializer(/*inParameter*/ false);
            return finishNode(node);
        }

        function parseVariableDeclarationList(disallowIn: boolean): VariableDeclarationList {
            var node = <VariableDeclarationList>createNode(SyntaxKind.VariableDeclarationList);

            switch (token) {
                case SyntaxKind.VarKeyword:
                    break;
                case SyntaxKind.LetKeyword:
                    node.flags |= NodeFlags.Let;
                    break;
                case SyntaxKind.ConstKeyword:
                    node.flags |= NodeFlags.Const;
                    break;
                default:
                    Debug.fail();
            }

            nextToken();
            var savedDisallowIn = inDisallowInContext();
            setDisallowInContext(disallowIn);

            node.declarations = parseDelimitedList(ParsingContext.VariableDeclarations, parseVariableDeclaration);

            setDisallowInContext(savedDisallowIn);

            return finishNode(node);
        }

        function parseVariableStatement(fullStart: number, modifiers: ModifiersArray): VariableStatement {
            var node = <VariableStatement>createNode(SyntaxKind.VariableStatement, fullStart);
            setModifiers(node, modifiers);
            node.declarationList = parseVariableDeclarationList(/*disallowIn:*/ false);
            parseSemicolon();
            return finishNode(node);
        }

        function parseFunctionDeclaration(fullStart: number, modifiers: ModifiersArray): FunctionDeclaration {
            var node = <FunctionDeclaration>createNode(SyntaxKind.FunctionDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.FunctionKeyword);
            node.asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            node.name = parseIdentifier();
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ !!node.asteriskToken, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlockOrSemicolon(!!node.asteriskToken, Diagnostics.or_expected);
            return finishNode(node);
        }

        function parseConstructorDeclaration(pos: number, modifiers: ModifiersArray): ConstructorDeclaration {
            var node = <ConstructorDeclaration>createNode(SyntaxKind.Constructor, pos);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.ConstructorKeyword);
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlockOrSemicolon(/*isGenerator:*/ false, Diagnostics.or_expected);
            return finishNode(node);
        }

        function parseMethodDeclaration(fullStart: number, modifiers: ModifiersArray, asteriskToken: Node, name: DeclarationName, questionToken: Node, diagnosticMessage?: DiagnosticMessage): MethodDeclaration {
            var method = <MethodDeclaration>createNode(SyntaxKind.MethodDeclaration, fullStart);
            setModifiers(method, modifiers);
            method.asteriskToken = asteriskToken;
            method.name = name;
            method.questionToken = questionToken;
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ !!asteriskToken, /*requireCompleteParameterList:*/ false, method);
            method.body = parseFunctionBlockOrSemicolon(!!asteriskToken, diagnosticMessage);
            return finishNode(method);
        }

        function parsePropertyOrMethodDeclaration(fullStart: number, modifiers: ModifiersArray): ClassElement {
            var asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
            var name = parsePropertyName();

            // Note: this is not legal as per the grammar.  But we allow it in the parser and
            // report an error in the grammar checker.
            var questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
            if (asteriskToken || token === SyntaxKind.OpenParenToken || token === SyntaxKind.LessThanToken) {
                return parseMethodDeclaration(fullStart, modifiers, asteriskToken, name, questionToken, Diagnostics.or_expected);
            }
            else {
                var property = <PropertyDeclaration>createNode(SyntaxKind.PropertyDeclaration, fullStart);
                setModifiers(property, modifiers);
                property.name = name;
                property.questionToken = questionToken;
                property.type = parseTypeAnnotation();
                property.initializer = allowInAnd(parseNonParameterInitializer);
                parseSemicolon();
                return finishNode(property);
            }
        }

        function parseNonParameterInitializer() {
            return parseInitializer(/*inParameter*/ false);
        }

        function parseAccessorDeclaration(kind: SyntaxKind, fullStart: number, modifiers: ModifiersArray): AccessorDeclaration {
            var node = <AccessorDeclaration>createNode(kind, fullStart);
            setModifiers(node, modifiers);
            node.name = parsePropertyName();
            fillSignature(SyntaxKind.ColonToken, /*yieldAndGeneratorParameterContext:*/ false, /*requireCompleteParameterList:*/ false, node);
            node.body = parseFunctionBlockOrSemicolon(/*isGenerator:*/ false);
            return finishNode(node);
        }

        function isClassMemberStart(): boolean {
            var idToken: SyntaxKind;

            // Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
            while (isModifier(token)) {
                idToken = token;
                nextToken();
            }

            if (token === SyntaxKind.AsteriskToken) {
                return true;
            }

            // Try to get the first property-like token following all modifiers.
            // This can either be an identifier or the 'get' or 'set' keywords.
            if (isLiteralPropertyName()) {
                idToken = token;
                nextToken();
            }

            // Index signatures and computed properties are class members; we can parse.
            if (token === SyntaxKind.OpenBracketToken) {
                return true;
            }
            
            // If we were able to get any potential identifier...
            if (idToken !== undefined) {
                // If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
                if (!isKeyword(idToken) || idToken === SyntaxKind.SetKeyword || idToken === SyntaxKind.GetKeyword) {
                    return true;
                }

                // If it *is* a keyword, but not an accessor, check a little farther along
                // to see if it should actually be parsed as a class member.
                switch (token) {
                    case SyntaxKind.OpenParenToken:     // Method declaration
                    case SyntaxKind.LessThanToken:      // Generic Method declaration
                    case SyntaxKind.ColonToken:         // Type Annotation for declaration
                    case SyntaxKind.EqualsToken:        // Initializer for declaration
                    case SyntaxKind.QuestionToken:      // Not valid, but permitted so that it gets caught later on.
                        return true;
                    default:
                        // Covers
                        //  - Semicolons     (declaration termination)
                        //  - Closing braces (end-of-class, must be declaration)
                        //  - End-of-files   (not valid, but permitted so that it gets caught later on)
                        //  - Line-breaks    (enabling *automatic semicolon insertion*)
                        return canParseSemicolon();
                }
            }

            return false;
        }

        function parseModifiers(): ModifiersArray {
            var flags = 0;
            var modifiers: ModifiersArray;
            while (true) {
                var modifierStart = scanner.getStartPos();
                var modifierKind = token;

                if (!parseAnyContextualModifier()) {
                    break;
                }

                if (!modifiers) {
                    modifiers = <ModifiersArray>[];
                    modifiers.pos = modifierStart;
                }
                flags |= modifierToFlag(modifierKind);
                modifiers.push(finishNode(createNode(modifierKind, modifierStart)));
            }
            if (modifiers) {
                modifiers.flags = flags;
                modifiers.end = scanner.getStartPos();
            }
            return modifiers;
        }

        function parseClassElement(): ClassElement {
            var fullStart = getNodePos();
            var modifiers = parseModifiers();

            var accessor = tryParseAccessorDeclaration(fullStart, modifiers);
            if (accessor) {
                return accessor;
            }

            if (token === SyntaxKind.ConstructorKeyword) {
                return parseConstructorDeclaration(fullStart, modifiers);
            }

            if (isIndexSignature()) {
                return parseIndexSignatureDeclaration(modifiers);
            }

            // It is very important that we check this *after* checking indexers because
            // the [ token can start an index signature or a computed property name
            if (isIdentifierOrKeyword() ||
                token === SyntaxKind.StringLiteral ||
                token === SyntaxKind.NumericLiteral ||
                token === SyntaxKind.AsteriskToken ||
                token === SyntaxKind.OpenBracketToken) {

                return parsePropertyOrMethodDeclaration(fullStart, modifiers);
            }

            // 'isClassMemberStart' should have hinted not to attempt parsing.
            Debug.fail("Should not have attempted to parse class member declaration.");
        }

        function parseClassDeclaration(fullStart: number, modifiers: ModifiersArray): ClassDeclaration {
            var node = <ClassDeclaration>createNode(SyntaxKind.ClassDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.ClassKeyword);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            node.heritageClauses = parseHeritageClauses(/*isClassHeritageClause:*/ true);

            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                // ClassTail[Yield,GeneratorParameter] : See 14.5
                //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
                //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }

                node.members = inGeneratorParameterContext()
                    ? doOutsideOfYieldContext(parseClassMembers)
                    : parseClassMembers();
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<ClassElement>();
            }
            return finishNode(node);
        }

        function parseHeritageClauses(isClassHeritageClause: boolean): NodeArray<HeritageClause> {
            // ClassTail[Yield,GeneratorParameter] : See 14.5
            //      [~GeneratorParameter]ClassHeritage[?Yield]opt { ClassBody[?Yield]opt }
            //      [+GeneratorParameter] ClassHeritageopt { ClassBodyopt }

            if (isHeritageClause()) {
                return isClassHeritageClause && inGeneratorParameterContext()
                    ? doOutsideOfYieldContext(parseHeritageClausesWorker)
                    : parseHeritageClausesWorker();
            }

            return undefined;
        }

        function parseHeritageClausesWorker() {
            return parseList(ParsingContext.HeritageClauses, /*checkForStrictMode:*/ false, parseHeritageClause);
        }

        function parseHeritageClause() {
            if (token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword) {
                var node = <HeritageClause>createNode(SyntaxKind.HeritageClause);
                node.token = token;
                nextToken();
                node.types = parseDelimitedList(ParsingContext.TypeReferences, parseTypeReference);
                return finishNode(node);
            }

            return undefined;
        }

        function isHeritageClause(): boolean {
            return token === SyntaxKind.ExtendsKeyword || token === SyntaxKind.ImplementsKeyword;
        }

        function parseClassMembers() {
            return parseList(ParsingContext.ClassMembers, /*checkForStrictMode*/ false, parseClassElement);
        }

        function parseInterfaceDeclaration(fullStart: number, modifiers: ModifiersArray): InterfaceDeclaration {
            var node = <InterfaceDeclaration>createNode(SyntaxKind.InterfaceDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.InterfaceKeyword);
            node.name = parseIdentifier();
            node.typeParameters = parseTypeParameters();
            node.heritageClauses = parseHeritageClauses(/*isClassHeritageClause:*/ false);
            node.members = parseObjectTypeMembers();
            return finishNode(node);
        }

        function parseTypeAliasDeclaration(fullStart: number, modifiers: ModifiersArray): TypeAliasDeclaration {
            var node = <TypeAliasDeclaration>createNode(SyntaxKind.TypeAliasDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.TypeKeyword);
            node.name = parseIdentifier();
            parseExpected(SyntaxKind.EqualsToken);
            node.type = parseType();
            parseSemicolon();
            return finishNode(node);
        }

        // In an ambient declaration, the grammar only allows integer literals as initializers.
        // In a non-ambient declaration, the grammar allows uninitialized members only in a
        // ConstantEnumMemberSection, which starts at the beginning of an enum declaration
        // or any time an integer literal initializer is encountered.
        function parseEnumMember(): EnumMember {
            var node = <EnumMember>createNode(SyntaxKind.EnumMember, scanner.getStartPos());
            node.name = parsePropertyName();
            node.initializer = allowInAnd(parseNonParameterInitializer);
            return finishNode(node);
        }

        function parseEnumDeclaration(fullStart: number, modifiers: ModifiersArray): EnumDeclaration {
            var node = <EnumDeclaration>createNode(SyntaxKind.EnumDeclaration, fullStart);
            setModifiers(node, modifiers);
            parseExpected(SyntaxKind.EnumKeyword);
            node.name = parseIdentifier();
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.members = parseDelimitedList(ParsingContext.EnumMembers, parseEnumMember);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.members = createMissingList<EnumMember>();
            }
            return finishNode(node);
        }

        function parseModuleBlock(): ModuleBlock {
            var node = <ModuleBlock>createNode(SyntaxKind.ModuleBlock, scanner.getStartPos());
            if (parseExpected(SyntaxKind.OpenBraceToken)) {
                node.statements = parseList(ParsingContext.ModuleElements, /*checkForStrictMode*/false, parseModuleElement);
                parseExpected(SyntaxKind.CloseBraceToken);
            }
            else {
                node.statements = createMissingList<Statement>();
            }
            return finishNode(node);
        }

        function parseInternalModuleTail(fullStart: number, modifiers: ModifiersArray, flags: NodeFlags): ModuleDeclaration {
            var node = <ModuleDeclaration>createNode(SyntaxKind.ModuleDeclaration, fullStart);
            setModifiers(node, modifiers);
            node.flags |= flags;
            node.name = parseIdentifier();
            node.body = parseOptional(SyntaxKind.DotToken)
                ? parseInternalModuleTail(getNodePos(), /*modifiers:*/undefined, NodeFlags.Export)
                : parseModuleBlock();
            return finishNode(node);
        }

        function parseAmbientExternalModuleDeclaration(fullStart: number, modifiers: ModifiersArray): ModuleDeclaration {
            var node = <ModuleDeclaration>createNode(SyntaxKind.ModuleDeclaration, fullStart);
            setModifiers(node, modifiers);
            node.name = parseLiteralNode(/*internName:*/ true);
            node.body = parseModuleBlock();
            return finishNode(node);
        }

        function parseModuleDeclaration(fullStart: number, modifiers: ModifiersArray): ModuleDeclaration {
            parseExpected(SyntaxKind.ModuleKeyword);
            return token === SyntaxKind.StringLiteral
                ? parseAmbientExternalModuleDeclaration(fullStart, modifiers)
                : parseInternalModuleTail(fullStart, modifiers, modifiers ? modifiers.flags : 0);
        }

        function isExternalModuleReference() {
            return token === SyntaxKind.RequireKeyword &&
                lookAhead(nextTokenIsOpenParen);
        }

        function nextTokenIsOpenParen() {
            return nextToken() === SyntaxKind.OpenParenToken;
        }

        function nextTokenIsCommaOrFromKeyword() {
            nextToken();
            return token === SyntaxKind.CommaToken ||
                token === SyntaxKind.FromKeyword;
        }

        function parseImportDeclarationOrImportEqualsDeclaration(fullStart: number, modifiers: ModifiersArray): ImportEqualsDeclaration | ImportDeclaration {
            parseExpected(SyntaxKind.ImportKeyword);
            var identifier: Identifier;
            if (isIdentifier()) {
                identifier = parseIdentifier();
                if (token !== SyntaxKind.CommaToken && token !== SyntaxKind.FromKeyword) {
                    // ImportEquals declaration of type:
                    // import x = require("mod"); or
                    // import x = M.x;
                    var importEqualsDeclaration = <ImportEqualsDeclaration>createNode(SyntaxKind.ImportEqualsDeclaration, fullStart);
                    setModifiers(importEqualsDeclaration, modifiers);
                    importEqualsDeclaration.name = identifier;
                    parseExpected(SyntaxKind.EqualsToken);
                    importEqualsDeclaration.moduleReference = parseModuleReference();
                    parseSemicolon();
                    return finishNode(importEqualsDeclaration);
                }
            }

            // Import statement
            var importDeclaration = <ImportDeclaration>createNode(SyntaxKind.ImportDeclaration, fullStart);
            setModifiers(importDeclaration, modifiers);

            // ImportDeclaration:
            //  import ImportClause from ModuleSpecifier ;
            //  import ModuleSpecifier;
            if (identifier || // import id
                token === SyntaxKind.AsteriskToken || // import * 
                token === SyntaxKind.OpenBraceToken) { // import {
                //ImportClause:
                //  ImportedDefaultBinding
                //  NameSpaceImport
                //  NamedImports
                //  ImportedDefaultBinding, NameSpaceImport
                //  ImportedDefaultBinding, NamedImports

                var importClause = <ImportClause>createNode(SyntaxKind.ImportClause);
                if (identifier) {
                    // ImportedDefaultBinding:
                    //  ImportedBinding
                    importClause.name = identifier;
                }

                // If there was no default import or if there is comma token after default import 
                // parse namespace or named imports
                if (!importClause.name ||
                    parseOptional(SyntaxKind.CommaToken)) {
                    importClause.namedBindings = token === SyntaxKind.AsteriskToken ? parseNamespaceImport() : parseNamedImports();
                }

                importDeclaration.importClause = finishNode(importClause);
                parseExpected(SyntaxKind.FromKeyword);
            }

            importDeclaration.moduleSpecifier = parseModuleSpecifier();
            parseSemicolon();
            return finishNode(importDeclaration);
        }

        function parseModuleReference() {
            return isExternalModuleReference()
                ? parseExternalModuleReference()
                : parseEntityName(/*allowReservedWords*/ false);
        }

        function parseExternalModuleReference() {
            var node = <ExternalModuleReference>createNode(SyntaxKind.ExternalModuleReference);
            parseExpected(SyntaxKind.RequireKeyword);
            parseExpected(SyntaxKind.OpenParenToken);

            // We allow arbitrary expressions here, even though the grammar only allows string 
            // literals.  We check to ensure that it is only a string literal later in the grammar
            // walker.
            node.expression = parseExpression();

            // Ensure the string being required is in our 'identifier' table.  This will ensure 
            // that features like 'find refs' will look inside this file when search for its name.
            if (node.expression.kind === SyntaxKind.StringLiteral) {
                internIdentifier((<LiteralExpression>node.expression).text);
            }

            parseExpected(SyntaxKind.CloseParenToken);
            return finishNode(node);
        }

        function parseModuleSpecifier(): StringLiteralExpression {
            // ModuleSpecifier:
            //  StringLiteral
            if (token === SyntaxKind.StringLiteral) {
                // Ensure the string being required is in our 'identifier' table.  This will ensure 
                // that features like 'find refs' will look inside this file when search for its name.
                return <StringLiteralExpression>parseLiteralNode(/*internName*/ true);
            }

            parseErrorAtCurrentToken(Diagnostics.String_literal_expected);
        }

        function parseNamespaceImport(): NamespaceImport {
            // NameSpaceImport:
            //  * as ImportedBinding
            var namespaceImport = <NamespaceImport>createNode(SyntaxKind.NamespaceImport);
            parseExpected(SyntaxKind.AsteriskToken);
            parseExpected(SyntaxKind.AsKeyword);
            namespaceImport.name = parseIdentifier();
            return finishNode(namespaceImport);
        }

        function parseNamedImports(): NamedImports {
            var namedImports = <NamedImports>createNode(SyntaxKind.NamedImports);

            // NamedImports:
            //  { }
            //  { ImportsList }
            //  { ImportsList, }

            // ImportsList:
            //  ImportSpecifier
            //  ImportsList, ImportSpecifier
            namedImports.elements = parseBracketedList(ParsingContext.ImportSpecifiers, parseImportSpecifier, SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken);
            return finishNode(namedImports);
        }

        function parseImportSpecifier(): ImportSpecifier {
            var node = <ImportSpecifier>createNode(SyntaxKind.ImportSpecifier);
            // ImportSpecifier:
            //  ImportedBinding
            //  IdentifierName as ImportedBinding
            var isFirstIdentifierNameNotAnIdentifier = isKeyword(token) && !isIdentifier();
            var start = scanner.getTokenPos();
            var identifierName = parseIdentifierName();
            if (token === SyntaxKind.AsKeyword) {
                node.propertyName = identifierName;
                parseExpected(SyntaxKind.AsKeyword);
                if (isIdentifier()) {
                    node.name = parseIdentifierName();
                }
                else {
                    parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
                }
            }
            else {
                node.name = identifierName;
                if (isFirstIdentifierNameNotAnIdentifier) {
                    // Report error identifier expected
                    parseErrorAtPosition(start, identifierName.end - start, Diagnostics.Identifier_expected);
                }
            }

            return finishNode(node);
        }

        function parseExportAssignmentTail(fullStart: number, modifiers: ModifiersArray): ExportAssignment {
            var node = <ExportAssignment>createNode(SyntaxKind.ExportAssignment, fullStart);
            setModifiers(node, modifiers);
            node.exportName = parseIdentifier();
            parseSemicolon();
            return finishNode(node);
        }

        function isLetDeclaration() {
            // It is let declaration if in strict mode or next token is identifier on same line.
            // otherwise it needs to be treated like identifier
            return inStrictModeContext() || lookAhead(nextTokenIsIdentifierOnSameLine);
        }

        function isDeclarationStart(): boolean {
            switch (token) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.FunctionKeyword:
                    return true;
                case SyntaxKind.LetKeyword:
                    return isLetDeclaration();
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.TypeKeyword:
                    // Not true keywords so ensure an identifier follows
                    return lookAhead(nextTokenIsIdentifierOrKeyword);
                case SyntaxKind.ImportKeyword:
                    // Not true keywords so ensure an identifier follows or is string literal or asterisk or open brace
                    return lookAhead(nextTokenCanFollowImportKeyword);
                case SyntaxKind.ModuleKeyword:
                    // Not a true keyword so ensure an identifier or string literal follows
                    return lookAhead(nextTokenIsIdentifierOrKeywordOrStringLiteral);
                case SyntaxKind.ExportKeyword:
                    // Check for export assignment or modifier on source element
                    return lookAhead(nextTokenIsEqualsTokenOrDeclarationStart);
                case SyntaxKind.DeclareKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    // Check for modifier on source element
                    return lookAhead(nextTokenIsDeclarationStart);
            }
        }

        function isIdentifierOrKeyword() {
            return token >= SyntaxKind.Identifier;
        }

        function nextTokenIsIdentifierOrKeyword() {
            nextToken();
            return isIdentifierOrKeyword();
        }

        function nextTokenIsIdentifierOrKeywordOrStringLiteral() {
            nextToken();
            return isIdentifierOrKeyword() || token === SyntaxKind.StringLiteral;
        }

        function nextTokenCanFollowImportKeyword() {
            nextToken();
            return isIdentifierOrKeyword() || token === SyntaxKind.StringLiteral ||
                token === SyntaxKind.AsteriskToken || token === SyntaxKind.OpenBraceToken;
        }

        function nextTokenIsEqualsTokenOrDeclarationStart() {
            nextToken();
            return token === SyntaxKind.EqualsToken || isDeclarationStart();
        }

        function nextTokenIsDeclarationStart() {
            nextToken();
            return isDeclarationStart();
        }

        function nextTokenIsAsKeyword() {
            return nextToken() === SyntaxKind.AsKeyword;
        }

        function parseDeclaration(): ModuleElement {
            var fullStart = getNodePos();
            var modifiers = parseModifiers();
            if (token === SyntaxKind.ExportKeyword) {
                nextToken();
                if (parseOptional(SyntaxKind.EqualsToken)) {
                    return parseExportAssignmentTail(fullStart, modifiers);
                }
            }

            switch (token) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                    return parseVariableStatement(fullStart, modifiers);
                case SyntaxKind.FunctionKeyword:
                    return parseFunctionDeclaration(fullStart, modifiers);
                case SyntaxKind.ClassKeyword:
                    return parseClassDeclaration(fullStart, modifiers);
                case SyntaxKind.InterfaceKeyword:
                    return parseInterfaceDeclaration(fullStart, modifiers);
                case SyntaxKind.TypeKeyword:
                    return parseTypeAliasDeclaration(fullStart, modifiers);
                case SyntaxKind.EnumKeyword:
                    return parseEnumDeclaration(fullStart, modifiers);
                case SyntaxKind.ModuleKeyword:
                    return parseModuleDeclaration(fullStart, modifiers);
                case SyntaxKind.ImportKeyword:
                    return parseImportDeclarationOrImportEqualsDeclaration(fullStart, modifiers);
                default:
                    Debug.fail("Mismatch between isDeclarationStart and parseDeclaration");
            }
        }

        function isSourceElement(inErrorRecovery: boolean): boolean {
            return isDeclarationStart() || isStartOfStatement(inErrorRecovery);
        }

        function parseSourceElement() {
            return parseSourceElementOrModuleElement();
        }

        function parseModuleElement() {
            return parseSourceElementOrModuleElement();
        }

        function parseSourceElementOrModuleElement(): ModuleElement {
            return isDeclarationStart()
                ? parseDeclaration()
                : parseStatement();
        }

        function processReferenceComments(sourceFile: SourceFile): void {
            var triviaScanner = createScanner(languageVersion, /*skipTrivia*/false, sourceText);
            var referencedFiles: FileReference[] = [];
            var amdDependencies: string[] = [];
            var amdModuleName: string;

            // Keep scanning all the leading trivia in the file until we get to something that 
            // isn't trivia.  Any single line comment will be analyzed to see if it is a 
            // reference comment.
            while (true) {
                var kind = triviaScanner.scan();
                if (kind === SyntaxKind.WhitespaceTrivia || kind === SyntaxKind.NewLineTrivia || kind === SyntaxKind.MultiLineCommentTrivia) {
                    continue;
                }
                if (kind !== SyntaxKind.SingleLineCommentTrivia) {
                    break;
                }

                var range = { pos: triviaScanner.getTokenPos(), end: triviaScanner.getTextPos() };

                var comment = sourceText.substring(range.pos, range.end);
                var referencePathMatchResult = getFileReferenceFromReferencePath(comment, range);
                if (referencePathMatchResult) {
                    var fileReference = referencePathMatchResult.fileReference;
                    sourceFile.hasNoDefaultLib = referencePathMatchResult.isNoDefaultLib;
                    var diagnosticMessage = referencePathMatchResult.diagnosticMessage;
                    if (fileReference) {
                        referencedFiles.push(fileReference);
                    }
                    if (diagnosticMessage) {
                        sourceFile.referenceDiagnostics.push(createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, diagnosticMessage));
                    }
                }
                else {
                    var amdModuleNameRegEx = /^\/\/\/\s*<amd-module\s+name\s*=\s*('|")(.+?)\1/gim;
                    var amdModuleNameMatchResult = amdModuleNameRegEx.exec(comment);
                    if (amdModuleNameMatchResult) {
                        if (amdModuleName) {
                            sourceFile.referenceDiagnostics.push(createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments));
                        }
                        amdModuleName = amdModuleNameMatchResult[2];
                    }

                    var amdDependencyRegEx = /^\/\/\/\s*<amd-dependency\s+path\s*=\s*('|")(.+?)\1/gim;
                    var amdDependencyMatchResult = amdDependencyRegEx.exec(comment);
                    if (amdDependencyMatchResult) {
                        amdDependencies.push(amdDependencyMatchResult[2]);
                    }
                }
            }

            sourceFile.referencedFiles = referencedFiles;
            sourceFile.amdDependencies = amdDependencies;
            sourceFile.amdModuleName = amdModuleName;
        }

        function setExternalModuleIndicator(sourceFile: SourceFile) {
            sourceFile.externalModuleIndicator = forEach(sourceFile.statements, node =>
                node.flags & NodeFlags.Export
                || node.kind === SyntaxKind.ImportEqualsDeclaration && (<ImportEqualsDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference
                || node.kind === SyntaxKind.ExportAssignment
                || node.kind === SyntaxKind.ImportDeclaration
                    ? node
                    : undefined);
        }

        function getSyntacticDiagnostics() {
            if (syntacticDiagnostics === undefined) {
                // Don't bother doing any grammar checks if there are already parser errors.  
                // Otherwise we may end up with too many cascading errors.
                syntacticDiagnostics = sourceFile.referenceDiagnostics.concat(sourceFile.parseDiagnostics);
            }

            Debug.assert(syntacticDiagnostics !== undefined);
            return syntacticDiagnostics;
        }
    }

    export function isLeftHandSideExpression(expr: Expression): boolean {
        if (expr) {
            switch (expr.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.TaggedTemplateExpression:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.Identifier:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateExpression:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.SuperKeyword:
                    return true;
            }
        }

        return false;
    }

    export function isAssignmentOperator(token: SyntaxKind): boolean {
        return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
    }
}
