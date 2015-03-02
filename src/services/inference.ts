module ts {
    /* @internal */
    export interface InferenceEngine {
        createEngineUpdater(): InferenceEngineUpdater;
    }

    export interface InferenceEngineUpdater {
        onSourceFileAdded(file: SourceFile): void;
        onSourceFileRemoved(file: SourceFile): void;
        onSourceFileUpdated(oldFile: SourceFile, newFile: SourceFile): void;

        updateInferenceEngine(program: Program): void;
    }

    interface SymbolInferenceInformation {
        flowTypeInformationInto(information: TypeInformation): void;
        getTypeInformation(): TypeInformation;
    }

    interface TypeInformation {
    }

    //interface References {
    //    [fileName: string]: Set<Node>;
    //}

    interface BidirectionalReferences {
        // Maps from the node-id of the reference to the declaration node.
        referenceToDeclaration: Node[];

        // Maps from the node-id of the declaration to a map from the node-id of a reference
        // to the reference node.
        declarationToReferences: Node[][];
    }

    function createBidirectionalReferences(): BidirectionalReferences {
        return {
            declarationToReferences: [],
            referenceToDeclaration: []
        };
    }

    interface ReferencesManager {
        update(program: Program, removedFiles: SourceFile[], addedFiles: SourceFile[], updatedFiles: SourceFile[], removedSymbols: Symbol[], addedSymbols: Symbol[]): void;

        //getReferencesToNode(node: Node): References;
        //getReferencesToSymbol(symbol: Symbol): References;
    }

    function createReferencesManager(): ReferencesManager {
        // Maps a symbol's value declaration to a per file map of all the references to it.
        var fileNameToBidirectionalReferences: Map<BidirectionalReferences> = {};
        var declarationToFilesWithReferences: ts.Map<boolean>[] = [];

        return {
            update,
            //getReferencesToNode,
            //getReferencesToSymbol
        };

        //function getReferencesToNode(declarationNode: Node): References {
        //    return declarationNodeToFileNameToReferenceNodes.get(declarationNode);
        //}

        //function getReferencesToSymbol(symbol: Symbol): References {
        //    return getReferencesToNode(symbol ? symbol.valueDeclaration : undefined);
        //}

        function update(program: Program, removedFiles: SourceFile[], addedFiles: SourceFile[], updatedFiles: SourceFile[], removedSymbols: Symbol[], addedSymbols: Symbol[]): void {
            // First purge all data that has been removed.  This includes file removes and symbol removes.
            removeFiles(removedFiles);
            removeSymbols(removedSymbols);

            // Now remove from all symbols, any references to any updated files.  We're going to
            // re-resolve all the updated files and figure out what all the identifiers in them
            // mean after the edits within.
            processUpdatedFiles(program, updatedFiles);

            // Now, process untouched files to see if identifiers in them might resolve to different 
            // symbols.
            processUntouchedFiles(program, addedFiles, updatedFiles, removedSymbols, addedSymbols);

            // Finally, add the reference links for all the files that were added to the program.
            addFiles(program, addedFiles);
        }

        function processUpdatedFiles(program: Program, files: SourceFile[]) {
            for (var i = 0, n = files.length; i < n; i++) {
                var file = files[i];

                // We're going to re-resolve everything in this file.  THat means that we want to
                // remove any information about what symbols have references within this file.  We
                // can do this just by calling 'removeFile'.
                // 
                // This also ensures that no symbols are pointing to reference nodes that are no
                // longer valid (due to being incrementally parsed).
                removeFile(file);
                 
                // Now we go through and bind all the identifiers in this file.  This will ensure
                // that any references in this file to symbols are properly recorded.  We can do
                // this just by calling 'addFile'.
                addFile(program, file);
            }
        }

        function addFiles(program: Program, files: SourceFile[]): void {
            for (var i = 0, n = files.length; i < n; i++) {
                addFile(program, files[i]);
            }
        }

        function addFile(program: Program, file: SourceFile): void {
            // Pass undefined for 'examineName' so that we examine all names in this file.
            resolveReferences(program, file, /*examineName:*/ undefined);
        }

        function resolveReferences(program: Program, file: SourceFile, shouldResolve: Map<boolean>): void {
            var typeChecker = program.getTypeChecker();
            var fileName = file.fileName;
            var bidirectionalReferences = fileNameToBidirectionalReferences[fileName] || (fileNameToBidirectionalReferences[fileName] = createBidirectionalReferences());

            var declarationToReferences = bidirectionalReferences.declarationToReferences;
            var referenceToDeclaration = bidirectionalReferences.referenceToDeclaration;

            // We're doing a partial resolve if we were asked to only check a subset of names.            
            var partialResolve = shouldResolve !== undefined;

            walk(file);

            function walk(node: Node) {
                if (!node) {
                    return;
                }

                if (node.kind === SyntaxKind.Identifier && isExpression(node) && !isRightSideOfPropertyAccess(node)) {
                    // If we're processing all nodes (i.e. shouldResolve is undefined), or this 
                    // identifier was something we want to examine, then go ahead.
                    if (!shouldResolve && shouldResolve[(<Identifier>node).text]) {
                        var symbol = typeChecker.getSymbolAtLocation(node);
                        addSymbolReference(symbol, node);
                    }
                }

                forEachChild(node, walk);
            }

            function addSymbolReference(symbol: Symbol, referenceNode: Node) {
                if (symbol && symbol.valueDeclaration) {
                    var declarationNode = symbol.valueDeclaration;

                    if (partialResolve) {
                        // this node may have previously referenced some other symbol.  Remove this
                        // node from that symbol's reference set.  We don't need to do this if this
                        // is a full resolve because then the node could never be in any reference
                        // list already.
                        removeExistingReferences(referenceNode, declarationNode);
                    }

                    var declarationNodeId = getNodeId(declarationNode);
                    var referenceNodeId = getNodeId(referenceNode);

                    // Also, add a link from the reference node to the symbol's node.
                    referenceToDeclaration[referenceNodeId] = declarationNode;

                    // Add a link from the symbol's node to the reference node.
                    var referenceNodes = getSymbolReferenceNodesInFile(declarationNode);
                    referenceNodes[referenceNodeId] = referenceNode;

                    // Mark that this file is referenced by this symbol.
                    var filesWithReferences = declarationToFilesWithReferences[declarationNodeId] || (declarationToFilesWithReferences[declarationNodeId] = {});
                    filesWithReferences[fileName] = true;
                }
            }

            function removeExistingReferences(referenceNode: Node, declarationNode: Node) {
                var referenceNodeId = getNodeId(referenceNode);
                var previousDeclarationNode = referenceToDeclaration[referenceNodeId];
                if (previousDeclarationNode !== declarationNode) {
                    var previousDeclarationNodeId = getNodeId(previousDeclarationNode);

                    var references = declarationToReferences[previousDeclarationNodeId];
                    if (references) {
                        delete references[referenceNodeId];

                        // If there are no more references from the old declaration to this
                        // file, then mark that appropriately.
                        if (sparseArrayIsEmpty(references)) {
                            var fileWithReferences = declarationToFilesWithReferences[previousDeclarationNodeId];
                            if (fileWithReferences) {
                                delete fileWithReferences[fileName];
                            }
                        }
                    }
                }
            }

            function getSymbolReferenceNodesInFile(declarationNode: Node): Node[]{
                var declarationNodeId = getNodeId(declarationNode);
                return declarationToReferences[declarationNodeId] || (declarationToReferences[declarationNodeId] = []);
            }
        }

        function removeFiles(files: SourceFile[]): void {
            for (var i = 0, n = files.length; i < n; i++) {
                removeFile(files[i]);
            }
        }

        function removeFile(file: SourceFile): void {
            Debug.assert(!!file.nodeToSymbol);
            
            delete fileNameToBidirectionalReferences[file.fileName];
        }

        function removeSymbols(removedSymbols: Symbol[]): void {
            for (var i = 0, n = removedSymbols.length; i < n; i++) {
                var symbol = removedSymbols[i];
                var declarationNodeId = getNodeId(symbol.valueDeclaration)
                var filesWithReferences = declarationToFilesWithReferences[declarationNodeId];
                if (filesWithReferences) {
                    for (var fileName in filesWithReferences) {
                        if (hasProperty(filesWithReferences, fileName)) {
                            removeReferencesToSymbol(symbol, fileName);
                        }
                    }

                    delete declarationToFilesWithReferences[declarationNodeId];
                }
            }
        }

        function removeReferencesToSymbol(symbol: Symbol, fileName: string) {
            var bidirectionalReferences = getProperty(fileNameToBidirectionalReferences, fileName);
            if (bidirectionalReferences) {
                var declarationToReferences = bidirectionalReferences.declarationToReferences;
                delete declarationToReferences[getNodeId(symbol.valueDeclaration)];
            }
        }

        function processUntouchedFiles(program: Program, addedFiles: SourceFile[], updatedFiles: SourceFile[], removedSymbols: Symbol[], addedSymbols: Symbol[]) {
            // Determine the name of symbols added/removed.  We'll walk all non-added, non-updated 
            // files in the program if they could be affected by those names and we'll try 
            // re-resolving any identifiers that match those names to see if they've changed. 
            // We don't need to hit added files because we'll already have fully processed them
            // to determine references.
            var changedSymbolNames: Map<boolean> = {};
            forEach(removedSymbols, addChangedSymbolName);
            forEach(addedSymbols, addChangedSymbolName);
            
            var allSourceFiles = program.getSourceFiles();
            for (var i = 0, n = allSourceFiles.length; i < n; i++) {
                var file = allSourceFiles[i];
                if (contains(addedFiles, file) || contains(updatedFiles, file)) {
                    continue;
                }

                var nameTable = getNameTable(file);

                // Only process the file if it could be affected by the symbols that were added or
                // removed.
                if (keysIntersect(nameTable, changedSymbolNames)) {
                    // Walk the file and check any identifiers that match the name of any of the 
                    // symbols we've added or removed.  If so, determine what symbol the identifier
                    // binds to now.
                    resolveReferences(program, file, changedSymbolNames);
                }
            }

            return;

            function addChangedSymbolName(s: Symbol) {
                if (!isReservedMemberName(s.name)) {
                    changedSymbolNames[s.name] = true;
                }
            }
        }

        function keysIntersect(nameTable: Map<string>, changedSymbolNames: Map<boolean>) {
            for (var symbolName in changedSymbolNames) {
                if (hasProperty(changedSymbolNames, symbolName)) {
                    if (hasProperty(nameTable, symbolName)) {
                        return true;
                    }
                }
            }

            return false;
        }
    }

    /* @internal */
    export function createInferenceEngine(): InferenceEngine {
        var nodeIdToSymbolInferenceInformation: SymbolInferenceInformation[] = [];
        var stringLiteralTypeInformation = createPrimitiveTypeInformation("string");
        var numericLiteralTypeInformation = createPrimitiveTypeInformation("number");

        //var fileNameToSourceFileId: ts.Map<number>
        var referenceManager = createReferencesManager();

        return <InferenceEngine>{
            createEngineUpdater
            //onBeforeUpdateSourceFile
        };

        function createPrimitiveTypeInformation(name: string): TypeInformation {
            return {};
        }

        function createEngineUpdater(): InferenceEngineUpdater {
            var typeChecker: TypeChecker;
            
            var addedFiles: SourceFile[] = [];
            var removedFiles: SourceFile[] = [];
            var oldUpdatedFiles: SourceFile[] = [];
            var newUpdatedFiles: SourceFile[] = [];

            var addedValueSymbols: Symbol[] = [];
            var removedValueSymbols: Symbol[] = [];

            return {
                onSourceFileAdded,
                onSourceFileRemoved,
                onSourceFileUpdated,
                updateInferenceEngine
            };

            function assertOnlyOperationOnThisFile(sourceFile: SourceFile) {
                Debug.assert(!contains(addedFiles, sourceFile), "Trying to process a file that was already added.");
                Debug.assert(!contains(removedFiles, sourceFile), "Trying to process a file that was already removed.");
                Debug.assert(!contains(oldUpdatedFiles, sourceFile), "Trying to process a file that was already updated.");
                Debug.assert(!contains(newUpdatedFiles, sourceFile), "Trying to process a file that was already updated.");
            }

            function onSourceFileAdded(sourceFile: SourceFile) {
                assertOnlyOperationOnThisFile(sourceFile);

                if (sourceFile.locals) {
                    Debug.assert(!!sourceFile.nodeToSymbol,
                        "If the source file was bound, it should have been asked to create the node map!");
                }

                // Put the file into the added list so we will process it entirely for references.
                addedFiles.push(sourceFile);
                
                // Bind the file so that we can use its symbols.  Also, ensure that we have a node map
                // created for it as well so we can diff the symbols between edits.
                bindSourceFile(sourceFile, /*createNodeMap:*/ true);

                // Record what symbols were added.  We'll use this to rescan the rest of the source
                // files to see if they have a reference to any of these symbols. 
                recordAddedSymbols(sourceFile.nodeToSymbol);
            }

            function recordAddedSymbols(nodeToSymbol: Symbol[]) {
                nodeToSymbol.forEach(recordAddedSymbolsHelper);
            }

            function recordAddedSymbolsHelper(s: Symbol) {
                if (s.valueDeclaration) {
                    addedValueSymbols.push(s);
                }
            }

            function recordRemovedSymbols(nodeToSymbol: Symbol[]) {
                nodeToSymbol.forEach(recordRemovedSymbolsHelper);
            }

            function recordRemovedSymbolsHelper(s: Symbol) {
                if (s.valueDeclaration) {
                    removedValueSymbols.push(s);
                }
            }

            function onSourceFileRemoved(sourceFile: SourceFile) {
                assertOnlyOperationOnThisFile(sourceFile);

                // Put the file in the removed list so we throw away all references to symbols
                // declared in it, as well as all references in it to symbols elsewhere.
                removedFiles.push(sourceFile);

                // Record which symbols were removed by this operation. We'll remove all the
                // references to this symbol, and we'll rescan all the files to see if anything
                // with a matching name might bind to something else.
                recordRemovedSymbols(sourceFile.nodeToSymbol);
            }

            function onSourceFileUpdated(oldFile: SourceFile, newFile: SourceFile) {
                assertOnlyOperationOnThisFile(oldFile);
                assertOnlyOperationOnThisFile(newFile);

                if (oldFile === newFile) {
                    // If the file wasn't actually changed (for example, we just got an empty change
                    // range notification, then no need to bother doing anything with it.
                    return;
                }

                oldUpdatedFiles.push(oldFile);
                newUpdatedFiles.push(newFile);

                Debug.assert(!!oldFile.nodeToSymbol, "We should have a node map for the old file!");
                Debug.assert(!newFile.locals, "The new file should not have been bound!");
                Debug.assert(!newFile.nodeToSymbol, "The new file should not have a node map!");

                // Bind the new file, ensuring that we have symbols and the node map for it.
                bindSourceFile(newFile, /*createNodeMap:*/ true);

                var oldNodeMap = oldFile.nodeToSymbol;
                var newNodeMap = newFile.nodeToSymbol;

                // Walk both node tables determining which symbols were added and which were removed.
                oldNodeMap.forEach((symbol, nodeId) => {
                    if (!newNodeMap[nodeId]) {
                        removedValueSymbols.push(symbol);
                    }
                });

                newNodeMap.forEach((symbol, nodeId) => {
                    if (!oldNodeMap[nodeId]) {
                        addedValueSymbols.push(symbol);
                    }
                });
            }

            function updateInferenceEngine(program: Program) {
                // First update all the references we have.
                referenceManager.update(program, removedFiles, addedFiles, newUpdatedFiles, removedValueSymbols, addedValueSymbols);

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