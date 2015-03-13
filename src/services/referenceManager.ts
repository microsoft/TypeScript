module ts.inference {
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

    function stringSet_forEach(set: StringSet, f: (v: string) => void): void {
        var map = <Map<boolean>><any>set;
        for (var k in map) {
            if (hasProperty(map, k)) {
                f(k);
            }
        }
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

    /* @internal */
    export interface BidirectionalReferences {
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
    export interface NodeSet<T extends Node> {
        _nodeSetBrand: any;
    }

    /* @internal */
    export function createNodeSet<T extends Node>(): NodeSet<T> {
        return <NodeSet<T>><any>[];
    }
    
    /* @internal */
    export function nodeSet_add<T extends Node>(nodeSet: NodeSet<T>, node: T): boolean {
        Debug.assert(!!node);

        var array = <T[]><any>nodeSet;
        var nodeId = getNodeId(node);
        var result = !array[nodeId];

        array[nodeId] = node;

        return result;
    }
    
    /* @internal */
    export function nodeSet_contains<T extends Node>(nodeSet: NodeSet<T>, node: T): boolean {
        if (!node) {
            return false;
        }

        var array = <T[]><any>nodeSet;
        var nodeId = getNodeId(node);
        return !!array[nodeId];
    }

    function nodeSet_delete<T extends Node>(nodeSet: NodeSet<T>, node: T): void {
        var array = <T[]><any>nodeSet;
        delete array[getNodeId(node)];
    }

    /* @internal */
    export function nodeSet_isEmpty<T extends Node>(nodeSet: NodeSet<T>): boolean {
        if (nodeSet) {
            var array = <T[]><any>nodeSet;
            for (var id in array) {
                return false;
            }
        }

        return true;
    }

    /* @internal */
    export function nodeSet_forEach<T extends Node>(nodeSet: NodeSet<T>, f: (node: T) => void) {
        var array = <T[]><any>nodeSet;
        array.forEach(f);
    }

    interface ReferenceToDeclarationMap {
        _nodeToNodeMapBrand: any;
    }

    function createReferenceToDeclarationMap(): ReferenceToDeclarationMap {
        return <ReferenceToDeclarationMap><any>[];
    }

    /* @internal */
    export function referenceToDeclarationMap_get(map: ReferenceToDeclarationMap, referenceNode: Node): Node {
        var array = <Node[]><any>map;
        return array[getNodeId(referenceNode)];
    }

    function referenceToDeclarationMap_set(map: ReferenceToDeclarationMap, referenceNode: Node, declarationNode: Node) {
        var array = <Node[]><any>map;
        array[getNodeId(referenceNode)] = declarationNode;
    }

    function referenceToDeclarationMap_forEach(map: ReferenceToDeclarationMap, f: (refId: number, declarationNode: Node) => void) {
        var array = <Node[]><any>map;
        array.forEach((declarationNode, refId) => {
            f(refId, declarationNode);
        });
    }

    interface DeclarationToReferencesMap {
        _nodeToNodesMapBrand: any;
    }

    function createDeclarationToReferencesMap(): DeclarationToReferencesMap {
        return <DeclarationToReferencesMap><any>[];
    }

    function declarationToReferencesMap_get(map: DeclarationToReferencesMap, declarationNode: Node): NodeSet<Identifier> {
        if (!declarationNode) {
            return undefined;
        }

        var array = <NodeSet<Identifier>[]><any>map;
        return array[getNodeId(declarationNode)];
    }

    function declarationToReferencesMap_getOrCreate(map: DeclarationToReferencesMap, declarationNode: Node): NodeSet<Identifier> {
        var array = <NodeSet<Identifier>[]><any>map;
        var declarationId = getNodeId(declarationNode);
        return array[declarationId] || (array[declarationId] = createNodeSet<Identifier>());
    }

    function declarationToReferences_delete(map: DeclarationToReferencesMap, declarationNode: Node): void {
        var array = <NodeSet<Identifier>[]><any>map;
        delete array[getNodeId(declarationNode)];
    }

    function declarationToReferences_forEach(map: DeclarationToReferencesMap, f: (declarationNodeId: number, references: NodeSet<Identifier>) => void) {
        var array = <NodeSet<Identifier>[]><any>map;
        array.forEach((references, declarationNodeId) => {
            f(declarationNodeId, references);
        });
    }

    /* @internal */
    export interface ReferenceManager {
        // Used to tell the reference manager that a new program was created, as well as what 
        // changes occurred between this new program and the last program the reference manager 
        // was notified about.
        //
        // IMPORTANT: The reference manager defers doing expensive work until 'updateReferences' 
        // is called.  As such, query operation on the reference manager can return stale 
        // information.  Clients should call 'updateReferences' first to ensure the references
        // manager is up to date.  This call will also return what changes happened in untouched
        // files so that clients can determine what information they might need to update as well.
        //
        // This includes which files were added and removed from the program, which files were updated
        // (i.e. edited), and what symbols we ended up adding/removing.  The removed symbols list
        // contains the symbols that were removed because they were part of a file that was 
        // removed, or because they were removed as part of an edit.  The added symbols list 
        // contains the symbols that were added because they were part of a file that was added,
        // or because they were added as part of an edit.
        //
        // None of these three file lists intersect.  A file can only be in the removed/added/updated list
        // at most one.  The union of the file lists is not the same as the list of files in the 
        // program.  There will still be files in the program that were not touched at all and 
        // are the same from the last version of the program to this one.
        onAfterProgramCreated(program: Program, removedFiles: SourceFile[], addedFiles: SourceFile[], updatedFiles: [SourceFile,SourceFile][],
            removedSymbols: Symbol[], addedSymbols: Symbol[]): void;
        
        // 
        updateReferences(program: Program): ts.Map<NodeSet<Identifier>>;

        // For testing purposes only
        toJSON(): any;

        // Returns a map, keyed by file names, to the references to this symbol.
        getReferencesToSymbol(symbol: Symbol): Map<NodeSet<Identifier>>;
        getReferencesToDeclarationNode(declarationNode: Node): Map<NodeSet<Identifier>>;

        getBidirectionalReferences(fileName: string): BidirectionalReferences;
    }

    /* @internal */
    export function createReferenceManager(): ReferenceManager {
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

        return {
            onAfterProgramCreated,
            updateReferences,
            getReferencesToDeclarationNode,
            getReferencesToSymbol,
            getBidirectionalReferences,
            toJSON
        };

        function getBidirectionalReferences(fileName: string) {
            return fileNameToBidirectionalReferences[fileName];
        }

        function getReferencesToSymbol(symbol: Symbol): Map<NodeSet<Identifier>> {
            return getReferencesToDeclarationNode(symbol && symbol.valueDeclaration);
        }

        function getReferencesToDeclarationNode(declarationNode: Node): Map<NodeSet<Identifier>> {
            if (declarationNode) {
                var filesWithReferences = declarationToFilesWithReferences[getNodeId(declarationNode)];
                if (filesWithReferences) {
                    var result: Map<NodeSet<Identifier>> = {};

                    stringSet_forEach(filesWithReferences, fileName => {
                        var bidirectionalReferences = getProperty(fileNameToBidirectionalReferences, fileName);
                        if (bidirectionalReferences) {
                            var references = declarationToReferencesMap_get(bidirectionalReferences.declarationToReferences, declarationNode);
                            if (references) {
                                result[fileName] = references;
                            }
                        }
                    });

                    return result;
                }
            }

            return undefined;
        }

        function toJSON(): any {
            var idMapping: number[] = [];
            var nextId = 1;

            return {
                declarationToFilesWithReferences: convertDeclarationToFilesWithReferences(),
                fileNameToBidirectionalReferences: convertFileNameToBidirectionalReferences()
            }

            function getNode(nodeId: number): Node {
                var result = forEach(latestProgram.getSourceFiles(), findNode);
                Debug.assert(!!result);
                return result;

                function findNode(node: Node): Node {
                    if (node && node.id === nodeId) {
                        return node;
                    }

                    return forEachChild(node, findNode);
                }
            }

            function convertDeclarationToFilesWithReferences(): any {
                var result: any[] = [];
                declarationToFilesWithReferences.forEach((files, declarationNodeId) => {
                    var declarationInfo = getDeclarationInfo(getNode(declarationNodeId), /*full:*/ true);
                    var fileNames: string[] = [];
                    stringSet_forEach(files, f => { fileNames.push(f) });
                    result.push({ declarationInfo, fileNames });
                });

                return result;
            }

            function convertFileNameToBidirectionalReferences() {
                var result: any = {};

                for (var fileName in fileNameToBidirectionalReferences) {
                    var bidirectionalReferences = getProperty(fileNameToBidirectionalReferences, fileName);
                    if (bidirectionalReferences) {
                        result[fileName] = convertBidirectionalReferences(bidirectionalReferences);
                    }
                }

                return result;
            }

            function convertBidirectionalReferences(bidirectionalReferences: BidirectionalReferences) {
                return {
                    referenceToDeclaration: convertReferenceToDeclarationMap(bidirectionalReferences.referenceToDeclaration),
                    declarationToReferences: convertDeclarationToReferencesMap(bidirectionalReferences.declarationToReferences)
                };
            }

            function convertReferenceToDeclarationMap(referenceToDeclaration: ReferenceToDeclarationMap) {
                var result: any[] = [];
                referenceToDeclarationMap_forEach(referenceToDeclaration, (referenceId, declarationNode) => {
                    result.push({
                        referenceInfo: getReferenceInfo(getNode(referenceId)),
                        declarationInfo: getDeclarationInfo(declarationNode, /*full:*/ false)
                    });
                });

                return result;
            }

            function convertDeclarationToReferencesMap(declarationToReferences: DeclarationToReferencesMap): any {
                var result: any[] = [];
                declarationToReferences_forEach(declarationToReferences, (declarationNodeId, references) => {
                    result.push({
                        declarationInfo: getDeclarationInfo(getNode(declarationNodeId), /*full:*/ false),
                        references: convertReferences(references)
                    });
                });

                return result;
            }

            function convertReferences(references: NodeSet<Identifier>): any {
                var result: any[] = [];
                nodeSet_forEach(references, referenceNode => {
                    result.push(getReferenceInfo(referenceNode));
                });
                return result;
            }

            function getDeclarationInfo(node: Node, full: boolean) {
                var symbol = node.symbol;
                var result = { symbolName: symbol.name };
                fillNodeInfo(symbol.valueDeclaration, result, full);
                return result;
            }

            function getReferenceInfo(node: Node) {
                Debug.assert(node.kind === SyntaxKind.Identifier);

                var result = { text: (<Identifier>node).text };
                fillNodeInfo(node, result, /*full:*/ true);

                return result;
            }

            function fillNodeInfo(node: Node, result: any, full: boolean): void {
                result.id = mapId(node.id);

                if (full) {
                    var sourceFile = getSourceFileOfNode(node);
                    var start = skipTrivia(sourceFile.text, node.pos);
                    result.fileName = sourceFile.fileName;
                    result.start = start;
                }
            }

            function mapId(id: number) {
                return idMapping[id] || (idMapping[id] = nextId++);
            }
        }

        function updateReferences(program: Program): Map<NodeSet<Identifier>> {
            if (!filesToFullyResolve) {
                return undefined;
            }

            Debug.assert(latestProgram === program);
            Debug.assert(!stringSet_intersects(filesToFullyResolve, filesToPartiallyResolve));

            // First, go and resolve all identifiers in the files we need to fully resolve.
            forEach(program.getSourceFiles(), f => {
                if (stringSet_contains(filesToFullyResolve, f.fileName)) {
                    // Pass in undefined to indicate that all identifiers should be resolved.
                    resolveReferences(program, f, /*shouldResolve:*/ undefined, /*changedReferences:*/ undefined);
                }
            });

            // Now go and resolve added/removed identifiers in the files we need to partially resolve.
            var result: Map<NodeSet<Identifier>> = {};

            forEach(program.getSourceFiles(), f => {
                if (stringSet_contains(filesToPartiallyResolve, f.fileName)) {
                    var nameTable = getNameTable(f);

                    // Only process the file if it could be affected by the symbols that were added or
                    // removed.
                    if (keysIntersect(nameTable, addedOrRemovedSymbolNames)) {
                        var changedReferences = createNodeSet<Identifier>();
                        result[f.fileName] = changedReferences;

                        resolveReferences(program, f, addedOrRemovedSymbolNames, changedReferences);
                    }
                }
            });

            // Now reset all the deferred data now that we've incorporated it.
            filesToFullyResolve = undefined;
            filesToPartiallyResolve = undefined;
            addedOrRemovedSymbolNames = undefined;

            return result;
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

        function onAfterProgramCreated(program: Program, removedFiles: SourceFile[], addedFiles: SourceFile[], oldAndNewupdatedFiles: [SourceFile,SourceFile][], removedSymbols: Symbol[], addedSymbols: Symbol[]): void {
            filesToFullyResolve = filesToFullyResolve || createStringSet();
            filesToPartiallyResolve = filesToPartiallyResolve || createStringSet();
            addedOrRemovedSymbolNames = addedOrRemovedSymbolNames || createStringSet();
            var updatedFiles = map(oldAndNewupdatedFiles, f => f[1]);

            // First purge all data that has been removed.  First, remove all the data for files that
            // were removed *as well as* files that were updated.  We don't need any of the data about
            // the former, and we're going to recompute all the data about the latter.
            removeFiles(removedFiles);
            removeFiles(updatedFiles);

            // For all the symbols that have been removed, delete all the mappings from the 
            // declaration of the symbol to all its references.  Note: there will still be
            // mappings from the references in some files to the declaration.  However,
            // these will get 'fixed' when we go and update all references later.  Do the
            // same for updated symbols as well.
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
        function resolveReferences(program: Program, file: SourceFile, identifierNamesToResolve: StringSet, changedReferences: NodeSet<Identifier>): void {
            var typeChecker = program.getTypeChecker();
            var fileName = file.fileName;
            var bidirectionalReferences = fileNameToBidirectionalReferences[fileName] || (fileNameToBidirectionalReferences[fileName] = createBidirectionalReferences());

            var declarationToReferences = bidirectionalReferences.declarationToReferences;
            var referenceToDeclaration = bidirectionalReferences.referenceToDeclaration;

            // We're doing a partial resolve if we were asked to only check a subset of names.            
            var partialResolve = identifierNamesToResolve !== undefined;

            walk(file);

            function walk(node: Node) {
                if (isStandAloneIdentifier(node)) {
                    var identifier = <Identifier>node;

                    // If we're processing all nodes (i.e. shouldResolve is undefined), or this 
                    // identifier was something we want to examine, then go ahead.
                    if (!identifierNamesToResolve || stringSet_contains(identifierNamesToResolve, identifier.text)) {
                        var symbol = typeChecker.getSymbolAtLocation(node);
                        addSymbolReference(symbol, identifier);
                    }
                }

                forEachChild(node, walk);
            }

            function addSymbolReference(symbol: Symbol, referenceNode: Identifier) {
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
                    nodeSet_add(referenceNodes, referenceNode);

                    // Mark that this file is referenced by this symbol.
                    var declarationNodeId = getNodeId(declarationNode);
                    var filesWithReferences = declarationToFilesWithReferences[declarationNodeId] || (declarationToFilesWithReferences[declarationNodeId] = createStringSet());
                    stringSet_add(filesWithReferences, fileName);
                }
            }

            function removeExistingReferences(referenceNode: Identifier, declarationNode: Node) {
                var previousDeclarationNode = referenceToDeclarationMap_get(referenceToDeclaration, referenceNode);

                if (previousDeclarationNode !== declarationNode) {
                    nodeSet_add(changedReferences, referenceNode);

                    var references = declarationToReferencesMap_get(declarationToReferences, previousDeclarationNode);

                    if (references) {
                        nodeSet_delete(references, referenceNode);

                        // If there are no more references from the old declaration to this
                        // file, then mark that appropriately.
                        if (nodeSet_isEmpty(references)) {
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
    export function isStandAloneIdentifier(node: Node) {
        return node && node.kind === SyntaxKind.Identifier && isExpression(node) && !isRightSideOfPropertyAccess(node)
    }
}