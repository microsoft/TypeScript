module ts {
    /* @internal */
    export interface InferenceEngine {
        createEngineUpdater(): InferenceEngineUpdater;

        /* @internal */ referencesManager_forTestingPurposesOnly: ReferencesManager;
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

    interface ReferenceToDeclarationMap {
        _nodeToNodeMapBrand: any;
    }

    function createReferenceToDeclarationMap(): ReferenceToDeclarationMap {
        return <ReferenceToDeclarationMap><any>[];
    }

    function referenceToDeclarationMap_get(map: ReferenceToDeclarationMap, referenceNode: Node): Node {
        var array = <Node[]><any>map;
        return array[getNodeId(referenceNode)];
    }

    function referenceToDeclarationMap_set(map: ReferenceToDeclarationMap, referenceNode: Node, declarationNode: Node) {
        var array = <Node[]><any>map;
        array[getNodeId(referenceNode)] = declarationNode;
    }

    interface DeclarationToReferencesMap {
        _nodeToNodesMapBrand: any;
    }

    function createDeclarationToReferencesMap(): DeclarationToReferencesMap {
        return <DeclarationToReferencesMap><any>[];
    }

    function declarationToReferencesMap_get(map: DeclarationToReferencesMap, declarationNode: Node): References {
        var array = <References[]><any>map;
        return array[getNodeId(declarationNode)];
    }

    function declarationToReferencesMap_getOrCreate(map: DeclarationToReferencesMap, declarationNode: Node): References {
        var array = <References[]><any>map;
        var declarationId = getNodeId(declarationNode);
        return array[declarationId] || (array[declarationId] = createReferences());
    }

    function declarationToReferences_delete(map: DeclarationToReferencesMap, declarationNode: Node): void {
        var array = <References[]><any>map;
        delete array[getNodeId(declarationNode)];
    }

    interface References {
        _referencesBrand: any;
    }

    function createReferences(): References {
        return <References><any>[];
    }

    function references_add(references: References, referenceNode: Node): void {
        var array = <Node[]><any>references;
        array[getNodeId(referenceNode)] = referenceNode;
    }

    function references_delete(references: References, referenceNode: Node): void {
        var array = <Node[]><any>references;
        delete array[getNodeId(referenceNode)];
    }

    function references_isEmpty(references: References): boolean {
        var array = <Node[]><any>references;
        for (var id in array) {
            return false;
        }
        return true;
    }

    interface StringSet {
        _stringSetBrand: any;
    }

    function createStringSet(): StringSet {
        return <StringSet>{};
    }

    function stringSet_add(set: StringSet, value: string): void {
        var map = <Map<boolean>><any>set;
        map[value] = true;
    }

    function stringSet_delete(set: StringSet, value: string): void {
        var map = <Map<boolean>><any>set;
        delete map[value];
    }

    function stringSet_contains(set: StringSet, value: string): boolean {
        var map = <Map<boolean>><any>set;
        return hasProperty(map, value);
    }

    function stringSet_intersects(set1: StringSet, set2: StringSet): boolean {
        // TODO(cyrusn): Ideally we'd only enumerate the smaller of the two sets.  However, just
        // knowing the count is itself an O(n) operation.
        var map1 = <Map<boolean>><any>set1;
        var map2 = <Map<boolean>><any>set2;
        for (var k in map) {
            if (hasProperty(map1, k) &&
                hasProperty(map2, k)) {

                return true;
            }
        }
    }

    interface BidirectionalReferences {
        // Maps from the node-id of the reference to the declaration node.
        referenceToDeclaration: ReferenceToDeclarationMap;

        // Maps from the node-id of the declaration to a map from the node-id of a reference
        // to the reference node.
        declarationToReferences: DeclarationToReferencesMap;
    }

    function createBidirectionalReferences(): BidirectionalReferences {
        return {
            declarationToReferences: createDeclarationToReferencesMap(),
            referenceToDeclaration: createReferenceToDeclarationMap(),
        };
    }

    /* @internal */
    export interface ReferencesManager {
        update(program: Program, removedFiles: SourceFile[], addedFiles: SourceFile[], updatedFiles: SourceFile[], removedSymbols: Symbol[], addedSymbols: Symbol[]): void;

        //getReferencesToNode(node: Node): References;
        //getReferencesToSymbol(symbol: Symbol): References;
    }

    function createReferencesManager(): ReferencesManager {
        // Kept around for debugging purposes.
        var latestProgram: Program;

        // Maps a symbol's value declaration to a per file map of all the references to it.
        var fileNameToBidirectionalReferences: Map<BidirectionalReferences> = {};
        var declarationToFilesWithReferences: StringSet[] = [];

        // We delay responding to all changes we hear about until we actually get a request for 
        // some reference information.  This allows us to avoid costly computation for every 
        // change to the LS, and instead only us to batch it all up into one piece of work that
        // needs to be done.
        //
        // In general, the work to remove information is fairly cheap.  Our maps are keyed in a 
        // fashion that makes that possible.Add / changes, on the other hand, are more expensive
        // as they require walking trees and resolving identifiers.  So we front-load removals,
        // and we defer adds/updates.
        //
        var filesToFullyResolve: StringSet;
        var filesToPartiallyResolve: StringSet;
        var addedOrRemovedSymbolNames: StringSet;

        resetDeferredData();

        return {
            update,
        };

        function ensureUpToDate(program: Program): void {
            Debug.assert(latestProgram === program);
            Debug.assert(!stringSet_intersects(filesToFullyResolve, filesToPartiallyResolve));

            // First, go and resolve all identifiers in the files we need to fully resolve.
            forEach(program.getSourceFiles(), f => {
                if (stringSet_contains(filesToFullyResolve, f.fileName)) {
                    // Pass in undefined to indicate that all identifiers should be resolved.
                    resolveReferences(program, f, /*shouldResolve:*/ undefined);
                }
            });

            // Now go and resolve added/removed identifiers in the files we need to partially resolve.
            forEach(program.getSourceFiles(), f => {
                if (stringSet_contains(filesToPartiallyResolve, f.fileName)) {
                    var nameTable = getNameTable(f);

                    // Only process the file if it could be affected by the symbols that were added or
                    // removed.
                    if (keysIntersect(nameTable, addedOrRemovedSymbolNames)) {
                        resolveReferences(program, f, addedOrRemovedSymbolNames);
                    }
                }
            });

            // Now reset all the deferred data now that we've incorporated it.
            resetDeferredData();
        }

        function keysIntersect<T, U>(nameTable: Map<T>, changedSymbolNames: StringSet) {
            // For now we assume the set of changed symbol names is considered to be smaller than 
            // the set of names in the file.  If we could figure out which one was actually smaller
            // we could enumerate the small one instead.
            for (var symbolName in changedSymbolNames) {
                if (stringSet_contains(changedSymbolNames, symbolName) &&
                    hasProperty(nameTable, symbolName)) {

                    return true;
                }
            }

            return false;
        }

        function resetDeferredData() {
            filesToFullyResolve = createStringSet();
            filesToPartiallyResolve = createStringSet();
            addedOrRemovedSymbolNames = createStringSet();
        }

        function update(program: Program, removedFiles: SourceFile[], addedFiles: SourceFile[], updatedFiles: SourceFile[], removedSymbols: Symbol[], addedSymbols: Symbol[]): void {
            // First purge all data that has been removed.  First, remove all the data for files that
            // were removed *as well as* files that were updated.  We don't need any of the data about
            // the former, and we're going to recompute all the data about the latter.
            removeFiles(removedFiles);
            removeFiles(updatedFiles);

            // For all the symbols that have been removed, delete all the mappings from the 
            // declaration of the symbol to all its references.  Note: there will still be
            // mappings from the references in some files to the declaration.  However,
            // these will get 'fixed' when we go and update all references later.
            removeSymbols(removedSymbols);

            // Now, mark all files that were added or updated as files that will need full 
            // resolution.If the file was previously marked as needing partial resolution, then
            // remove it from that list as full resolution overrides partial resolution.
            var addedOrUpdatedFiles = addedFiles.concat(updatedFiles);
            forEach(addedOrUpdatedFiles, f => {
                stringSet_add(filesToFullyResolve, f.fileName);
                stringSet_delete(filesToPartiallyResolve, f.fileName);
            });

            // Mark all untouched files as files we'll need to go in partially resolve.  For these
            // files we only need to check identifiers that match the names of symbols that were
            // added or removed.  Also, don't bother marking as needing partial resolution if the
            // file has already been marked as needing full resolution.
            var untouchedFiles = filter(program.getSourceFiles(), f => !contains(addedOrUpdatedFiles, f));
            forEach(untouchedFiles, f => {
                if (!stringSet_contains(filesToFullyResolve, f.fileName)) {
                    stringSet_add(filesToPartiallyResolve, f.fileName);
                }
            });

            // Use the added and removed symbol lists to keep track of the names of identifiers in 
            // untouched files that should be re-resolved.  
            forEach(removedSymbols, s => {
                stringSet_add(addedOrRemovedSymbolNames, s.name);
            });
            forEach(addedSymbols, s => {
                stringSet_add(addedOrRemovedSymbolNames, s.name);
            });

            latestProgram = program;
        }

        // If 'identifierNamesToResolve' is undefined, then that means that all identifiers should 
        // be resolved.
        function resolveReferences(program: Program, file: SourceFile, identifierNamesToResolve: StringSet): void {
            var typeChecker = program.getTypeChecker();
            var fileName = file.fileName;
            var bidirectionalReferences = fileNameToBidirectionalReferences[fileName] || (fileNameToBidirectionalReferences[fileName] = createBidirectionalReferences());

            var declarationToReferences = bidirectionalReferences.declarationToReferences;
            var referenceToDeclaration = bidirectionalReferences.referenceToDeclaration;

            // We're doing a partial resolve if we were asked to only check a subset of names.            
            var partialResolve = identifierNamesToResolve !== undefined;

            walk(file);

            function walk(node: Node) {
                if (!node) {
                    return;
                }

                if (node.kind === SyntaxKind.Identifier && isExpression(node) && !isRightSideOfPropertyAccess(node)) {
                    // If we're processing all nodes (i.e. shouldResolve is undefined), or this 
                    // identifier was something we want to examine, then go ahead.
                    if (!identifierNamesToResolve || stringSet_contains(identifierNamesToResolve, (<Identifier>node).text)) {
                        var symbol = typeChecker.getSymbolAtLocation(node);
                        addSymbolReference(symbol, node);
                    }
                }

                forEachChild(node, walk);
            }

            function addSymbolReference(symbol: Symbol, referenceNode: Node) {
                // Only record references to JavaScript symbols.
                var isJavaScriptDeclaration = symbol && symbol.valueDeclaration && symbol.flags & SymbolFlags.JavascriptSymbol;
                var declarationNode = isJavaScriptDeclaration ? symbol.valueDeclaration : undefined;
                
                if (partialResolve) {
                    // this node may have previously referenced some other symbol.  Remove this
                    // node from that symbol's reference set.  We don't need to do this if this
                    // is a full resolve because then the node could never be in any reference
                    // list already.
                    //
                    // Note: we do this even if we are now resolving to a TypeScript declaration. 
                    // That's because we still want to remove any old references if we previously
                    // resolved to a JavaScript symbol but now no longer aren't.
                    removeExistingReferences(referenceNode, declarationNode);
                }
                else {
                    // Ensure that if this is a full resolve that the reference node doesn't map
                    // to any declaration.  Because we are doing a full resolve, we should have
                    // already deleted all information about all the references in this file when
                    // we called removeFile.
                    var previousDeclaration = referenceToDeclarationMap_get(referenceToDeclaration, referenceNode)
                    Debug.assert(!previousDeclaration);
                }

                if (isJavaScriptDeclaration) {
                    // First, add a link from the reference node to the symbol's declaration node.
                    referenceToDeclarationMap_set(referenceToDeclaration, referenceNode, declarationNode);

                    // Add a link from the symbol's declaration node to the reference node.
                    var referenceNodes = declarationToReferencesMap_getOrCreate(declarationToReferences, declarationNode);
                    references_add(referenceNodes, referenceNode);

                    // Mark that this file is referenced by this symbol.
                    var declarationNodeId = getNodeId(declarationNode);
                    var filesWithReferences = declarationToFilesWithReferences[declarationNodeId] || (declarationToFilesWithReferences[declarationNodeId] = createStringSet());
                    filesWithReferences[fileName] = true;
                }
            }

            function removeExistingReferences(referenceNode: Node, declarationNode: Node) {
                var previousDeclarationNode = referenceToDeclarationMap_get(referenceToDeclaration, referenceNode);

                if (previousDeclarationNode !== declarationNode) {
                    var references = declarationToReferencesMap_get(declarationToReferences, previousDeclarationNode);

                    if (references) {
                        references_delete(references, referenceNode);

                        // If there are no more references from the old declaration to this
                        // file, then mark that appropriately.
                        if (references_isEmpty(references)) {
                            var fileWithReferences = declarationToFilesWithReferences[getNodeId(previousDeclarationNode)];

                            if (fileWithReferences) {
                                stringSet_delete(fileWithReferences, fileName);
                            }
                        }
                    }
                }
            }
        }

        function removeFiles(files: SourceFile[]): void {
            for (var i = 0, n = files.length; i < n; i++) {
                var file = files[i];

                Debug.assert(!!file.nodeToSymbol);
                delete fileNameToBidirectionalReferences[file.fileName];
            }
        }

        function removeSymbols(removedSymbols: Symbol[]): void {
            for (var i = 0, n = removedSymbols.length; i < n; i++) {
                var symbol = removedSymbols[i];
                var declarationNodeId = getNodeId(symbol.valueDeclaration)
                var filesWithReferences = declarationToFilesWithReferences[declarationNodeId];
                if (filesWithReferences) {
                    for (var fileName in filesWithReferences) {
                        if (stringSet_contains(filesWithReferences, fileName)) {
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
                declarationToReferences_delete(declarationToReferences, symbol.valueDeclaration);
            }
        }
    }

    /* @internal */
    export function createInferenceEngine(): InferenceEngine {
        var nodeIdToSymbolInferenceInformation: SymbolInferenceInformation[] = [];
        var stringLiteralTypeInformation = createPrimitiveTypeInformation("string");
        var numericLiteralTypeInformation = createPrimitiveTypeInformation("number");

        //var fileNameToSourceFileId: ts.Map<number>
        var referenceManager = createReferencesManager();

        return {
            createEngineUpdater,
            referencesManager_forTestingPurposesOnly: referenceManager
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

            function isJavascriptFile(sourceFile: SourceFile) {
                return fileExtensionIs(sourceFile.fileName, ".js");
            }

            function onSourceFileAdded(sourceFile: SourceFile) {
                if (!isJavascriptFile(sourceFile)) {
                    return;
                }

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
                if (!isJavascriptFile(sourceFile)) {
                    return;
                }

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
                Debug.assert(oldFile.fileName === newFile.fileName);
                if (!isJavascriptFile(oldFile)) {
                    return;
                }

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

                //typeChecker = program.getTypeChecker();

                //var sourceFiles = program.getSourceFiles();
                //for (var i = 0, n = sourceFiles.length; i < n; i++) {
                //    processSourceFile(sourceFiles[i]);
                //}
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