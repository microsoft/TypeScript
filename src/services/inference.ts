module ts {
    /* @internal */
    export interface InferenceEngine {
        createEngineUpdater(): InferenceEngineUpdater;
    }

    export interface InferenceEngineUpdater {
        onSourceFileAdded(file: SourceFile): void;
        onSourceFileRemoved(file: SourceFile): void;

        onBeforeSourceFileUpdated(file: SourceFile): void;
        onAfterSourceFileUpdated(file: SourceFile): void;

        updateInferenceEngine(program: Program);
    }

    interface SymbolInferenceInformation {
        flowTypeInformationInto(information: TypeInformation): void;
        getTypeInformation(): TypeInformation;
    }

    interface TypeInformation {
    }

    /* @internal */
    export function createInferenceEngine(): InferenceEngine {
        var nodeIdToSymbolInferenceInformation: SymbolInferenceInformation[] = [];
        var stringLiteralTypeInformation = createPrimitiveTypeInformation("string");
        var numericLiteralTypeInformation = createPrimitiveTypeInformation("number");

        //var fileNameToSourceFileId: ts.Map<number>

        return <InferenceEngine>{
            createEngineUpdater
            //onBeforeUpdateSourceFile
        };

        function createPrimitiveTypeInformation(name: string): TypeInformation {
            return {};
        }

        function createEngineUpdater(): InferenceEngineUpdater {
            var typeChecker: TypeChecker;

            return {
                onSourceFileAdded,
                onSourceFileRemoved,
                onBeforeSourceFileUpdated,
                onAfterSourceFileUpdated,
                updateInferenceEngine
            };

            function onSourceFileAdded(sourceFile: SourceFile) {
                Debug.assert(!sourceFile.locals, "File should not have been bound!");
                Debug.assert(!sourceFile.nodeToSymbol, "File should not have a node map!");

                // Bind the file so that we can use its symbols.  Also, ensure that we have a node map
                // created for it as well so we can diff the symbols between edits.
                bindSourceFile(sourceFile, /*createNodeMap:*/ true);
            }

            function onSourceFileRemoved(sourceFile: SourceFile) {
            }

            function onBeforeSourceFileUpdated(sourceFile: SourceFile) {
                Debug.assert(!!sourceFile.nodeToSymbol, "We should have an node map for this file!");
                fileNameToNodeMap[sourceFile.fileName] = sourceFile.nodeToSymbol;
            }

            function onAfterSourceFileUpdated(sourceFile: SourceFile) {
                Debug.assert(!sourceFile.locals, "File should not have been bound!");
                Debug.assert(!sourceFile.nodeToSymbol, "File should not have a node map!");

                bindSourceFile(sourceFile, /*createNodeMap:*/ true);

                Debug.assert(!!fileNameToNodeMap[sourceFile.fileName]);
                var oldNodeMap = fileNameToNodeMap[sourceFile.fileName];
                var newNodeMap = sourceFile.nodeToSymbol;

                var deletedNodeKeys: string[] = [];
                var addedNodeKeys: string[] = [];
                var changedNodeKeys: string[] = [];

                for (var oldKey in oldNodeMap) {
                    if (newNodeMap[oldKey]) {
                        changedNodeKeys.push(oldKey);
                    }
                    else {
                        deletedNodeKeys.push(oldKey);
                    }
                }

                for (var newKey in newNodeMap) {
                    if (!oldNodeMap[newKey]) {
                        addedNodeKeys.push(newKey);
                    }
                }
            }

            function updateInferenceEngine(program: Program) {
                typeChecker = program.getTypeChecker();

                var sourceFiles = program.getSourceFiles();
                for (var i = 0, n = sourceFiles.length; i < n; i++) {
                    processSourceFile(sourceFiles[i]);
                }
            }

            function processSourceFile(sourceFile: SourceFile) {
                // First walk through and create all the flow links into value symbols.
                flowTypes(sourceFile);
            }

            function flowTypes(node: Node) {
                if (!node) {
                    return;
                }

                //if (node.symbol && node.symbol.valueDeclaration) {
                //    // This is a declaration of some value.  See if there is any information to
                //    // flow into it at the declaration point.
                //    flowTypesAtDeclaration(node.symbol.valueDeclaration);
                //    return;
                //}

                switch (node.kind) {
                    case SyntaxKind.VariableDeclaration:
                        return flowTypesForVariableDeclaration(<VariableDeclaration>node);

                    case SyntaxKind.BinaryExpression:
                        return flowTypesForBinaryExpression(<BinaryExpression>node);
                }

                forEachChild(node, flowTypes);
            }

            //function flowTypesAtDeclaration(declaration: Declaration) {
            //    switch (declaration.kind) {
            //        case SyntaxKind.VariableDeclaration:
            //            flowTypesAtVariableDeclaration(<VariableDeclaration>declaration);
            //            return;
            //    }

            //    // TODO(cyrusn): Handle more cases.
            //}

            function flowTypeInformationInto(symbol: Symbol, information: TypeInformation): void {
                if (!symbol) {
                    return;
                }

                // We don't want to actually store inference data with a symbol.  Symbols are 
                // thrown away and recomputed when a file is edited.  So, instead, we store
                // the data with the node id of the node associated with a symbol instead.
                // Because this is JS, we only need to do this for the single 'value declaration'
                // for the symbol (as there is no symbol merging for JS).
                var symbolInformation = getSymbolInferenceInformation(symbol);
                if (symbolInformation) {
                    symbolInformation.flowTypeInformationInto(information);
                }
            }

            function getSymbolInferenceInformation(symbol: Symbol): SymbolInferenceInformation {
                // We don't want to actually store inference data with a symbol.  Symbols are 
                // thrown away and recomputed when a file is edited.  So, instead, we store
                // the data with the node id of the node associated with a symbol instead.
                // Because this is JS, we only need to do this for the single 'value declaration'
                // for the symbol (as there is no symbol merging for JS).
                var valueDeclaration = symbol.valueDeclaration;
                if (!valueDeclaration) {
                    return undefined;
                }

                var nodeId = getNodeId(valueDeclaration);
                var information = nodeIdToSymbolInferenceInformation[nodeId];
                if (!information) {
                    information = createSymbolInferenceInformation();
                    nodeIdToSymbolInferenceInformation[nodeId] = information;
                }

                return information;
            }

            function createSymbolInferenceInformation(): SymbolInferenceInformation {
                return undefined;
            }

            function flowTypesForVariableDeclaration(node: VariableDeclaration) {
                if (!node.initializer) {
                    // No initializer for this declaration.  We can't flow any information in here.
                    return;
                }

                flowTypeInformationInto(node.symbol, computeTypeInformation(node.initializer));
            }

            function flowTypesForBinaryExpression(node: BinaryExpression) {
                if (node.operatorToken.kind === SyntaxKind.EqualsToken) {
                    if (node.left.kind === SyntaxKind.Identifier) {
                        // if we have an expression of the form "a = <e>", then we link the typing 
                        // information about <e> into 'a' if 'a' is a symbol.
                        var symbol = typeChecker.getSymbolAtLocation(node.left);
                        flowTypeInformationInto(symbol, computeTypeInformation(node.right));
                    }
                }
            }

            function computeTypeInformation(expression: Expression): TypeInformation {
                if (expression) {
                    switch (expression.kind) {
                        case SyntaxKind.StringLiteral:
                            return stringLiteralTypeInformation;
                        case SyntaxKind.NumericLiteral:
                            return numericLiteralTypeInformation;
                        case SyntaxKind.Identifier:
                            return computeIdentifierTypeInformation(<Identifier>expression);
                    }
                }

                // TODO(cyrusn): Add more supported expressions;
                return undefined;
            }

            function computeIdentifierTypeInformation(identifier: Identifier) {
                // If this identifier bound to a symbol, then return the type information
                // for that symbol.  
                var symbol = typeChecker.getSymbolAtLocation(identifier);
                var symbolInformation = getSymbolInferenceInformation(symbol);
                if (symbolInformation) {
                    return symbolInformation.getTypeInformation();
                }
            }
        }
        //return {
        //    onBeforeUpdateSourceFile,
        //    onAfterUpdateSourceFile,
        //    onSourceFileCreated,
        //    onProgramCreated
        //};

        var fileNameToNodeMap: ts.Map<Symbol[]> = {};



        /*
        function onProgramCreated(_program: Program) {
            var oldProgram = program;
            program = _program;



            // Create a type checker to ensure that all our declarations in the program are bound.
            typeChecker = program.getTypeChecker();

            if (program !== undefined) {

            }

            program = _program;


            walkProgram();
        }

        function walkProgram() {
            var sourceFiles = program.getSourceFiles();
            forEach(sourceFiles, walk);
        }

        function walk(node: Node) {
            if (node.symbol) {

            }
        }
        */
    }
}