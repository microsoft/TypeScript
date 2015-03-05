module ts {
    /* @internal */
    export interface Equatable {
        equals(other: Equatable): boolean
    }

    /* @internal */
    export interface Hashable extends Equatable {
        getHashCode(): number;
    }

    /* @internal */
    export interface HashTable<Key, Value> {
        get(key: Key): Value;
        getOrAdd(k: Key, value: Value): Value;

        set(key: Key, value: Value): void;

        // same as 'set', except this will throw if the key is already in the hashtable.
        add(key: Key, value: Value): void;
    }

    var defaultGetHashCode = (k: Hashable) => k.getHashCode(); 
    var defaultEquals = (k1: Equatable, k2: Equatable) => {
        if (k1 === k2) {
            return true;
        }
        if (!k1 || !k2) {
            return false;
        }
        return k1.equals(k2);
    };

    interface KeyValuePair<Key, Value> {
        key: Key;
        value: Value;
    }

    function integerMultiply(v1: number, v2: number): number {
        var v1_high = (v1 >>> 16) & 0xFFFF;
        var vl_low = v1 & 0xFFFF;
        var v2_high = (v2 >>> 16) & 0xFFFF;
        var v2_low = v2 & 0xFFFF;
        return ((vl_low * v2_low) + (((v1_high * v2_low + vl_low * v2_high) << 16) >>> 0) | 0);
    }

    /* @internal */
    export function hashCombine(newKey: number, currentKey: number): number {
        return (integerMultiply(currentKey, 0xA5555529) + newKey) | 0;
    } 
    
    /* @internal */
    export function createHashTable<Key, Value>(getHashCode?: (k: Key) => number, equals?: (k1: Key, k2: Key) => boolean): HashTable<Key, Value> {
        getHashCode = getHashCode || <any>defaultGetHashCode;
        equals = equals || <any>defaultEquals;

        var buckets: KeyValuePair<Key, Value>[][] = [];

        return {
            get,
            getOrAdd,
            set,
            add,
        };

        function set(key: Key, value: Value): void {
            return setOrAdd(key, value, /*throwOnExistingMapping*/ false);
        }

        function add(key: Key, value: Value): void {
            return setOrAdd(key, value, /*throwOnExistingMapping*/ true);
        }

        function getOrCreatePairs(key: Key) {
            var hash = getHashCode(key) | 0;
            return buckets[hash] || (buckets[hash] = []);
        }

        function setOrAdd(key: Key, value: Value, throwOnExistingMapping: boolean): void {
            var pairs = getOrCreatePairs(key);

            for (var i = 0, n = pairs.length; i < n; i++) {
                var pair = pairs[i];
                if (equals(key, pair.key)) {
                    if (throwOnExistingMapping) {
                        throw new Error("Key was already in the hashtable");
                    }

                    pair.value = value;
                    return;
                }
            }

            pairs.push({ key, value });
        }

        function get(key: Key): Value {
            var hash = getHashCode(key) | 0;
            var pairs = buckets[hash];
            if (pairs) {
                for (var i = 0, n = pairs.length; i < n; i++) {
                    var pair = pairs[i];
                    if (equals(key, pair.key)) {
                        return pair.value;
                    }
                }
            }
        }

        function getOrAdd(key: Key, value: Value): Value {
            var pairs = getOrCreatePairs(key);
            for (var i = 0, n = pairs.length; i < n; i++) {
                var pair = pairs[i];
                if (equals(key, pair.key)) {
                    return pair.value;
                }
            }
            
            pairs.push({ key, value });
            return value;
        }
    }
}

module ts {
    /* @internal */
    export interface InferenceEngine {
        createEngineUpdater(): InferenceEngineUpdater;
        getTypeInformation(program: Program, node: Node): TypeInformation;

        /* @internal */ referencesManager_forTestingPurposesOnly: ReferencesManager;
    }

    export interface InferenceEngineUpdater {
        onSourceFileAdded(file: SourceFile): void;
        onSourceFileRemoved(file: SourceFile): void;
        onSourceFileUpdated(oldFile: SourceFile, newFile: SourceFile): void;

        updateInferenceEngine(program: Program): void;
    }

    const enum TypeInformationKind {
        // Simple primitives (like number, string, etc.)
        Primitive,

        // Union types, like "string | number" when you have: "foo" || 0
        Union,

        // Plus types, for when we have: a + b
        Plus,

        // Type information for a declared symbol. (like 'var v').  All references to 'v'
        // will get this type information.
        Symbol,
    }

    /* @internal */
    export interface TypeInformation extends Hashable {
        kind: TypeInformationKind;
        equals(other: TypeInformation): boolean;
    }

    interface UnionTypeInformation extends TypeInformation {
        _unionTypeInformationBrand: any;
        types: TypeInformation[];
    }

    interface PlusTypeInformation extends TypeInformation {
        _plusTypeInformationBrand: any;
        types: TypeInformation[];
    }

    interface SymbolTypeInformation extends TypeInformation {
        declarationId: number;
        type: TypeInformation;
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

    function declarationToReferencesMap_get(map: DeclarationToReferencesMap, declarationNode: Node): References {
        if (!declarationNode) {
            return undefined;
        }

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

    function declarationToReferences_forEach(map: DeclarationToReferencesMap, f: (declarationNodeId: number, references: References) => void) {
        var array = <References[]><any>map;
        array.forEach((references, declarationNodeId) => {
            f(declarationNodeId, references);
        });
    }

    interface References {
        _referencesBrand: any;
    }

    function createReferences(): References {
        return <References><any>[];
    }

    function references_add(references: References, referenceNode: Identifier): void {
        var array = <Node[]><any>references;
        array[getNodeId(referenceNode)] = referenceNode;
    }

    function references_delete(references: References, referenceNode: Identifier): void {
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

    function references_forEach(references: References, f: (referenceNode: Identifier) => void) {
        var array = <Identifier[]><any>references;
        array.forEach(f);
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

        // For testing purposes only
        toJSON(program: Program): any;

        // Returns a map, keyed by file names, to the references to this symbol.
        getReferencesToSymbol(program: Program, symbol: Symbol): Map<References>;
        getReferencesToDeclarationNode(program: Program, declarationNode: Node): Map<References>;

        getBidirectionalReferences(fileName: string): BidirectionalReferences;
    }

    function createReferencesManager(): ReferencesManager {
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
            getReferencesToDeclarationNode,
            getReferencesToSymbol,
            getBidirectionalReferences,
            toJSON
        };

        function getBidirectionalReferences(fileName: string) {
            return fileNameToBidirectionalReferences[fileName];
        }

        function getReferencesToSymbol(program: Program, symbol: Symbol): Map<References> {
            return getReferencesToDeclarationNode(program, symbol && symbol.valueDeclaration);
        }

        function getReferencesToDeclarationNode(program: Program, declarationNode: Node): Map<References> {
            if (declarationNode) {
                ensureUpToDate(program);

                var filesWithReferences = declarationToFilesWithReferences[getNodeId(declarationNode)];
                if (filesWithReferences) {
                    var result: Map<References> = {};

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

        function toJSON(program: Program): any {
            ensureUpToDate(program);
            var idMapping: number[] = [];
            var nextId = 1;

            return {
                declarationToFilesWithReferences: convertDeclarationToFilesWithReferences(),
                fileNameToBidirectionalReferences: convertFileNameToBidirectionalReferences()
            }

            function getNode(nodeId: number): Node {
                var result = forEach(program.getSourceFiles(), findNode);
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

            function convertReferences(references: References): any {
                var result: any[] = [];
                references_forEach(references, referenceNode => {
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
                    references_add(referenceNodes, referenceNode);

                    // Mark that this file is referenced by this symbol.
                    var declarationNodeId = getNodeId(declarationNode);
                    var filesWithReferences = declarationToFilesWithReferences[declarationNodeId] || (declarationToFilesWithReferences[declarationNodeId] = createStringSet());
                    stringSet_add(filesWithReferences, fileName);
                }
            }

            function removeExistingReferences(referenceNode: Identifier, declarationNode: Node) {
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
        var declarationIdToSymbolTypeInformation: SymbolTypeInformation[] = [];
        var cachedTypes = createHashTable<TypeInformation, TypeInformation>();
        var nextPrimitiveId = 0;

        var booleanPrimitiveTypeInformation = createPrimitiveTypeInformation("boolean");
        var numberPrimitiveTypeInformation = createPrimitiveTypeInformation("number");
        var stringPrimitiveTypeInformation = createPrimitiveTypeInformation("string");

        var stringOrNumberUnionType = createUnionTypeInformation(stringPrimitiveTypeInformation, numberPrimitiveTypeInformation);

        var referenceManager = createReferencesManager();
        
        return {
            createEngineUpdater,
            getTypeInformation,
            referencesManager_forTestingPurposesOnly: referenceManager
        };

        function createPrimitiveTypeInformation(name: string): TypeInformation {
            var id = nextPrimitiveId++;
            return {
                kind: TypeInformationKind.Primitive,
                getHashCode: () => id,

                // Use a function expression here so that 'this' refers to the object literal instance.
                equals: function (o) {
                    // Primitives has reference identity.
                    return o === this;
                },

                toString: () => name
            };
        }

        function addSingleTypeToSet(type: TypeInformation, typeSet: TypeInformation[]) {
            // We want to put the type into the list in sorted order.
            var hashCode = type.getHashCode();
            for (var i = 0, n = typeSet.length; i < n; i++) {
                var currentType = typeSet[i];
                var currentTypeHashCode = currentType.getHashCode();

                if (currentTypeHashCode < hashCode) {
                    // Keep going to find the right place to insert the item.
                    continue;
                }
                else if (currentTypeHashCode === hashCode) {
                    if (type.equals(currentType)) {
                        // Was already in the set.  No need to add it again.
                        return;
                    }
                }
                else {
                    // Found the first type that should go after the type we're adding.
                    typeSet.splice(i, /*deleteCount:*/ 0, type);
                    return;
                }
            }

            // Couldn't find a place in the list to put it.  So just put it at the end.
            typeSet.push(type);
        }

        function decomposePossibleUnionAndAddToSet(type: TypeInformation, types: TypeInformation[]) {
            if (type) {
                // We flatten all union types.  That way there is a single linear representation for
                // unions, and we don't have to compare any sort of tree structure.
                if (type.kind === TypeInformationKind.Union) {
                    var constituentTypes = (<UnionTypeInformation>type).types;
                    for (var i = 0, n = constituentTypes.length; i < n; i++) {
                        var constituent = constituentTypes[i];
                        Debug.assert(constituent.kind !== TypeInformationKind.Union);

                        addSingleTypeToSet(constituentTypes[i], types);
                    }
                }
                else {
                    addSingleTypeToSet(type, types);
                }
            }
        }

        function decomposePossiblePlusAndAddToSet(type: TypeInformation, types: TypeInformation[]) {
            if (!type) {
                return;
            }

            // We flatten all plus types.  That way there is a single linear representation for
            // pluses, and we don't have to compare any sort of tree structure.
            if (type.kind === TypeInformationKind.Plus) {
                var constituentTypes = (<PlusTypeInformation>type).types;
                for (var i = 0, n = constituentTypes.length; i < n; i++) {
                    var constituent = constituentTypes[i];
                    Debug.assert(constituent.kind !== TypeInformationKind.Plus);

                    addSingleTypeToSet(constituentTypes[i], types);
                }
            }
            else {
                addSingleTypeToSet(type, types);
            }
        }

        function createUnionTypeInformation(type1: TypeInformation, type2: TypeInformation): TypeInformation {
            if (!type1) {
                return type2;
            }

            if (!type2) {
                return type1;
            }

            if (type1.equals(type2)) {
                return type1;
            }

            var types: TypeInformation[] = [];
            decomposePossibleUnionAndAddToSet(type1, types);
            decomposePossibleUnionAndAddToSet(type2, types);

            Debug.assert(types.length >= 2);

            return createUnionTypeFromTypes(types);
        }

        function createUnionTypeFromTypes(types: TypeInformation[]): TypeInformation {
            if (types.length === 0) {
                return undefined;
            }

            if (types.length === 1) {
                return types[0];
            }

            Debug.assert(filter(types, t => t.kind === TypeInformationKind.Union).length === 0, "We should never nest union types");

            // Cap the number of types we'll keep in a union type at 8.
            types = types.length > 8 ? types.slice(0, 8) : types;

            var hash = computeHash(TypeInformationKind.Union, types);

            var unionType = <UnionTypeInformation>{
                types,
                kind: TypeInformationKind.Union,
                getHashCode: () => hash,
                equals: function (t) {
                    if (this === t) {
                        return true;
                    }

                    return t && t.kind === TypeInformationKind.Union && sequenceEquals(this.types, (<UnionTypeInformation>t).types);
                },
                toString: function () { return "(" + this.types.join(" | ") + ")" }
            };

            return cachedTypes.getOrAdd(unionType, unionType);
        }

        function computeHash(hash: number, items: Hashable[]) {
            for (var i = 0, n = items.length; i < n; i++) {
                hash = hashCombine(items[i].getHashCode(), hash);
            }

            return hash;
        }

        function sequenceEquals<T>(array1: Equatable[], array2: Equatable[]): boolean {
            if (array1 === array2) {
                return true;
            }

            if (!array1 || !array2) {
                return false;
            }

            if (array1.length !== array2.length) {
                return false;
            }

            for (var i = 0, n = array1.length; i < n; i++) {
                if (!array1[i].equals(array2[i])) {
                    return false;
                }
            }

            return true;
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
            }
        }

        function getTypeInformation(program: Program, _node: Node): TypeInformation {
            // Walk the tree, producing type information for expressions, and pulling on declarations 
            // when necessary.  This will produce a TypeInformation object that represents the type
            // of the expression, but still has many type constraints that have not been evaluated 
            // yet.  For example "a + b" will be a PlusInformation along with two SymbolInformations.
            var typeInformation = getTypeInformationWorker(program, _node);

            // So, what we want to go do is 'evaluate' all these unevaluated parts.  Now, outside
            // of symbols, the type information is entirely structural, without any recursion.  
            // However because of the symbols, the structure can recurse.  Because of that, we 
            // keep track of the stack of symbols we're walking through so far to prevent recursing
            // infinitely.
            var symbolStack: SymbolTypeInformation[] = [];
            return evaluateTypeInformation(typeInformation, symbolStack);
        }

        function evaluateTypeInformation(typeInformation: TypeInformation, symbolStack: SymbolTypeInformation[]): TypeInformation {
            switch (typeInformation.kind) {
                case TypeInformationKind.Primitive:
                    // Primitive types are already as processed as possible.
                    return typeInformation;

                case TypeInformationKind.Symbol: return evaluateSymbolTypeInformation(<SymbolTypeInformation>typeInformation, symbolStack);
                case TypeInformationKind.Plus: return evaluatePlusTypeInformation(<PlusTypeInformation>typeInformation, symbolStack);
                case TypeInformationKind.Union: return evaluateUnionTypeInformation(<UnionTypeInformation>typeInformation, symbolStack);
            }

            throw new Error("Unhandled case in evaluateTypeInformation.");
        }

        function evaluateUnionTypeInformation(typeInformation: UnionTypeInformation, symbolStack: SymbolTypeInformation[]) {
            var types = typeInformation.types;
            var evaluatedTypes: TypeInformation[];

            for (var i = 0, n = types.length; i < n; i++) {
                var type = types[i];
                var evaluatedType = evaluateTypeInformation(type, symbolStack);

                if (!evaluatedTypes && type !== evaluatedType) {
                    evaluatedTypes = types.slice(0, i);
                }

                if (evaluatedTypes) {
                    decomposePossibleUnionAndAddToSet(evaluatedType, evaluatedTypes);
                }
            }

            if (!evaluatedTypes) {
                // If no subtypes evaluated out to anything different, then just return this type.
                return typeInformation;
            }

            return createUnionTypeFromTypes(evaluatedTypes);
        }

        function evaluatePlusTypeInformation(typeInformation: PlusTypeInformation, symbolStack: SymbolTypeInformation[]) {
            // Go through and evaluate all the components of the plus expression.
            var allAreNumber = true;
            var definitelyNotNumber = false;

            var types = typeInformation.types;
            for (var i = 0, n = types.length; i < n; i++) {
                var type = evaluateTypeInformation(types[i], symbolStack);
                if (type === stringPrimitiveTypeInformation) {
                    // The moment we hit something we think is definitely a string, then we can
                    // immediately assume this plus expression evaluates out to a string.
                    return stringPrimitiveTypeInformation;
                }

                if (!type) {
                    // We hit something unknown.  Record this as it means we should no longer 
                    // evaluate out to the number type.
                    allAreNumber = false;
                }
                else if (type !== numberPrimitiveTypeInformation) {
                    // We got an actual type, but it wasn't a number (or a string).  There's no 
                    // way to add something like that and get a number back.  So the only option
                    // is that we are getting a string.
                    return stringPrimitiveTypeInformation;
                }
            }

            if (allAreNumber && typeInformation.types.length > 0) {
                // If all we added were numbers, then we're a number.
                return numberPrimitiveTypeInformation;
            }

            // Not enough information to be sure.  This could be a number or a string.
            return stringOrNumberUnionType;
        }

        function evaluateSymbolTypeInformation(typeInformation: SymbolTypeInformation, symbolStack: SymbolTypeInformation[]) {
            if (contains(symbolStack, typeInformation)) {
                return undefined;
            }

            symbolStack.push(typeInformation);
            var result = evaluateTypeInformation(typeInformation.type, symbolStack);
            symbolStack.pop();
            return result;
        }

        function getTypeInformationWorker(program: Program, _node: Node): TypeInformation {
            if (_node) {
                if (isExpression(_node)) {
                    return getTypeInformationForExpression(ts.getSourceFileOfNode(_node), <Expression>_node,
                        getContextualTypeInformation(<Expression>_node));
                }
            }

            return undefined;

            function getContextualTypeInformation(node: Expression): TypeInformation {
                // TODO(cyrusn): add support for flowing contextual type information into an expression.
                return undefined;
            }

            function getTypeInformationForExpression(sourceFile: SourceFile, node: Expression, contextualTypeInformation: TypeInformation): TypeInformation {
                if (node) {
                    switch (node.kind) {
                        case SyntaxKind.NumericLiteral: return numberPrimitiveTypeInformation;
                        case SyntaxKind.StringLiteral: return stringPrimitiveTypeInformation;
                        case SyntaxKind.TrueKeyword: return booleanPrimitiveTypeInformation;
                        case SyntaxKind.FalseKeyword: return booleanPrimitiveTypeInformation;
                        case SyntaxKind.NullKeyword: return undefined;

                        case SyntaxKind.BinaryExpression: return getTypeInformationForBinaryExpression(sourceFile, <BinaryExpression>node, contextualTypeInformation);
                        case SyntaxKind.ConditionalExpression: return getTypeInformationForConditionalExpression(sourceFile, <ConditionalExpression>node, contextualTypeInformation);
                        case SyntaxKind.DeleteExpression: return getTypeInformationForDeleteExpression(<DeleteExpression>node);
                        case SyntaxKind.Identifier: return getTypeInformationForIdentifier(sourceFile, <Identifier>node);
                        case SyntaxKind.ParenthesizedExpression: return getTypeInformationForParenthesizedExpression(sourceFile, <ParenthesizedExpression>node, contextualTypeInformation);
                        case SyntaxKind.PostfixUnaryExpression: return getTypeInformationForPostfixUnaryExpression(<PostfixUnaryExpression>node);
                        case SyntaxKind.PrefixUnaryExpression: return getTypeInformationForPrefixUnaryExpression(<PrefixUnaryExpression>node);
                        case SyntaxKind.TypeOfExpression: return getTypeInformationForTypeOfExpression(<TypeOfExpression>node);
                        case SyntaxKind.VoidExpression: return getTypeInformationForVoidExpression(<VoidExpression>node);
                    }

                    throw new Error("Unhandled case in getTypeInformationForExpression");
                }

                return undefined;
            }

            function getTypeInformationForBinaryExpression(sourceFile: SourceFile, node: BinaryExpression, contextualTypeInformation: TypeInformation) {
                switch (node.operatorToken.kind) {
                    case SyntaxKind.AsteriskToken:
                    case SyntaxKind.AsteriskEqualsToken:
                    case SyntaxKind.SlashToken:
                    case SyntaxKind.SlashEqualsToken:
                    case SyntaxKind.PercentToken:
                    case SyntaxKind.PercentEqualsToken:
                    case SyntaxKind.MinusToken:
                    case SyntaxKind.MinusEqualsToken:
                    case SyntaxKind.LessThanLessThanToken:
                    case SyntaxKind.LessThanLessThanEqualsToken:
                    case SyntaxKind.GreaterThanGreaterThanToken:
                    case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                    case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                    case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                    case SyntaxKind.AmpersandToken:
                    case SyntaxKind.AmpersandEqualsToken:
                    case SyntaxKind.CaretToken:
                    case SyntaxKind.CaretEqualsToken:
                    case SyntaxKind.BarToken:
                    case SyntaxKind.BarEqualsToken:
                        return numberPrimitiveTypeInformation;

                    case SyntaxKind.InKeyword:
                    case SyntaxKind.InstanceOfKeyword:
                    case SyntaxKind.LessThanToken:
                    case SyntaxKind.GreaterThanToken:
                    case SyntaxKind.LessThanEqualsToken:
                    case SyntaxKind.GreaterThanEqualsToken:
                    case SyntaxKind.EqualsEqualsToken:
                    case SyntaxKind.ExclamationEqualsToken:
                    case SyntaxKind.EqualsEqualsEqualsToken:
                    case SyntaxKind.ExclamationEqualsEqualsToken:
                        return booleanPrimitiveTypeInformation;

                    case SyntaxKind.AmpersandAmpersandToken:
                        // The && operator permits the operands to be of any type and produces a result of the same type as the second operand.
                        return getTypeInformationForExpression(sourceFile, node.right, /*contextualTypeInformation:*/ undefined);

                    case SyntaxKind.CommaToken:
                        // The comma operator permits the operands to be of any type and produces a 
                        // result that is of the same type as the second operand.
                        return getTypeInformationForExpression(sourceFile, node.right, /*contextualTypeInformation:*/ undefined);

                    case SyntaxKind.EqualsToken:
                        // The result is a value with the type of expr.
                        return getTypeInformationForExpression(sourceFile, node.right, /*contextualTypeInformation:*/ undefined);

                    case SyntaxKind.BarBarToken:
                        return getTypeInformationForBarBarBinaryExpression(sourceFile, node, contextualTypeInformation);

                    case SyntaxKind.PlusToken:
                    case SyntaxKind.PlusEqualsToken:
                        return getTypeInformationForPlusOrPlusEqualsExpression(sourceFile, node);
                }

                throw new Error("Unhandled case in getTypeInformationForBinaryExpression");
            }

            function getTypeInformationForBarBarBinaryExpression(sourceFile: SourceFile, node: BinaryExpression, contextualTypeInformation: TypeInformation) {
                // If the || expression is contextually typed (section 4.19), the operands are 
                // contextually typed by the same type. Otherwise, the left operand is not contextually
                // typed and the right operand is contextually typed by the type of the left operand. 
                //
                // The type of the result is the union type of the two operand types.
                if (contextualTypeInformation) {
                    return createUnionTypeInformation(
                        getTypeInformationForExpression(sourceFile, node.left, contextualTypeInformation),
                        getTypeInformationForExpression(sourceFile, node.right, contextualTypeInformation));
                }
                else {
                    var leftTypeInformation = getTypeInformationForExpression(sourceFile, node.left, /*contextualTypeInformation:*/ undefined);
                    var rightTypeInformation = getTypeInformationForExpression(sourceFile, node.right, /*contextualTypeInformation:*/ leftTypeInformation);
                    return createUnionTypeInformation(leftTypeInformation, rightTypeInformation);
                }
            }

            function getTypeInformationForPlusOrPlusEqualsExpression(sourceFile: SourceFile, node: BinaryExpression) {
                var leftType = getTypeInformationForExpression(sourceFile, node.left, /*contextualTypeInformation:*/ undefined);
                var rightType = getTypeInformationForExpression(sourceFile, node.right, /*contextualTypeInformation:*/ undefined);

                // If one operand is the null or undefined value, it is treated as having the type of the other operand. 
                leftType = leftType || rightType;
                rightType = rightType || leftType;

                // If both operands are of the Number primitive type, the result is of the Number primitive type.
                if (leftType === numberPrimitiveTypeInformation && rightType === numberPrimitiveTypeInformation) {
                    return numberPrimitiveTypeInformation;
                }

                // If one or both operands are of the String primitive type, the result is of the String primitive type.
                if (leftType === stringPrimitiveTypeInformation || rightType === stringPrimitiveTypeInformation) {
                    return stringPrimitiveTypeInformation;
                }

                if (!leftType && !rightType) {
                    // If we literally know nothing about either side of the + expression, then treat
                    // this as being either number or string.
                    return stringOrNumberUnionType;
                }

                if (leftType === stringOrNumberUnionType && rightType === stringOrNumberUnionType) {
                    return stringOrNumberUnionType;
                }

                // Not enough information at this point to make an up front type determination.  
                // Return a constraint to see if we can figure out the type later.
                Debug.assert(leftType !== undefined || rightType !== undefined);

                // If one of the types is undefined, place it last.
                var types: TypeInformation[] = [];
                decomposePossiblePlusAndAddToSet(leftType, types);
                decomposePossiblePlusAndAddToSet(rightType, types);

                Debug.assert(filter(types, t => t.kind === TypeInformationKind.Plus).length === 0, "We should never plus types");

                // Cap the number of types we'll keep in a plus type at 8.
                types = types.length > 8 ? types.slice(0, 8) : types;

                var hash = computeHash(TypeInformationKind.Plus, types);

                var result = <PlusTypeInformation>{
                    types,
                    kind: TypeInformationKind.Plus,
                    equals: function (other) {
                        if (this === other) {
                            return true;
                        }

                        return other && other.kind === TypeInformationKind.Plus && sequenceEquals(this.types, (<PlusTypeInformation>other).types);
                    },
                    getHashCode: () => hash
                };

                return cachedTypes.getOrAdd(result, result);
            }

            function getTypeInformationForConditionalExpression(sourceFile: SourceFile, node: ConditionalExpression, contextualTypeInformation: TypeInformation) {
                // If the conditional expression is contextually typed (section 4.19), expr1 and expr2 
                // are contextually typed by the same type.Otherwise, expr1 and expr2 are not 
                // contextually typed. type of the result is the union type of the types of expr1 and 
                // expr2.
                return createUnionTypeInformation(
                    getTypeInformationForExpression(sourceFile, node.whenTrue, contextualTypeInformation),
                    getTypeInformationForExpression(sourceFile, node.whenFalse, contextualTypeInformation));
            }

            function getTypeInformationForDeleteExpression(node: DeleteExpression) {
                // The 'delete' operator takes an operand of any type and produces a result of the Boolean primitive type.
                return booleanPrimitiveTypeInformation;
            }

            function getTypeInformationForIdentifier(sourceFile: SourceFile, node: Identifier) {
                // See if this identifier is a reference to some JS symbol.  If so, then it has whatever
                // type the declaration has.
                var bidirectionalReferences = referenceManager.getBidirectionalReferences(sourceFile.fileName);
                if (bidirectionalReferences) {
                    var declarationNode = referenceToDeclarationMap_get(bidirectionalReferences.referenceToDeclaration, node);
                    if (declarationNode) {
                        return getTypeInformationForDeclaration(declarationNode);
                    }
                }
            }

            function getTypeInformationForDeclaration(declarationNode: Node): TypeInformation {
                Debug.assert(!!declarationNode);

                var declarationId = getNodeId(declarationNode);
                var symbolTypeInformation = declarationIdToSymbolTypeInformation[declarationId];
                if (!symbolTypeInformation) {
                    // This is the first time we've been asked about this symbol. Create the information
                    // object for it, and cache it so it is available for all subsequent requests. Then, 
                    // find all the references to the symbol and flow in any type information we can
                    // find at the reference point into it.
                    
                    var type: TypeInformation = undefined;
                    symbolTypeInformation = {
                        declarationId,
                        type,
                        kind: TypeInformationKind.Symbol,
                        getHashCode: () => hashCombine(TypeInformationKind.Symbol, declarationId),
                        equals: function (o) {
                            // symbolInformation has identity semantics.
                            return this === o;
                        }
                    };

                    declarationIdToSymbolTypeInformation[declarationId] = symbolTypeInformation;

                    // The declaration may have an initializer, use that to populate the initial 
                    // type of this symbol.
                    type = computeTypeInformationForDeclaration(declarationNode);

                    // Now check all the references, and flow their information into the symbol.
                    var referencesMap = referenceManager.getReferencesToDeclarationNode(program, declarationNode);
                    if (referencesMap) {
                        for (var fileName in referencesMap) {
                            var references = getProperty(referencesMap, fileName);
                            if (references) {
                                var sourceFile = program.getSourceFile(fileName);
                                references_forEach(references, referenceNode => {
                                    type = createUnionTypeInformation(type, computeTypeInformationForReference(sourceFile, referenceNode));
                                });
                            }
                        }
                    }
                }

                return symbolTypeInformation;
            }

            function computeTypeInformationForDeclaration(node: Node) {
                Debug.assert(!!node);
                switch (node.kind) {
                    case SyntaxKind.VariableDeclaration:
                        return computeTypeInformationForVariableDeclaration(<VariableDeclaration>node);
                }

                throw new Error("Unhandled case in computeTypeInformationForDeclaration");
            }

            function computeTypeInformationForVariableDeclaration(node: VariableDeclaration) {
                return getTypeInformationForExpression(ts.getSourceFileOfNode(node), node.initializer, /*contextualTypeInformation:*/ undefined);
            }

            function computeTypeInformationForReference(sourceFile: SourceFile, node: Identifier) {
                Debug.assert(node.kind === SyntaxKind.Identifier);

                // Walk out of all surrounding parentheses.
                var current: Node = node;
                while (current.parent && current.parent.kind === SyntaxKind.ParenthesizedExpression) {
                    current = current.parent;
                }

                if (current.parent && current.parent.kind === SyntaxKind.BinaryExpression) {
                    var binaryExpression = <BinaryExpression>current.parent;

                    if (current === binaryExpression.left &&
                        isAssignmentOperator(binaryExpression.operatorToken.kind)) {

                        // If the reference is on the left of an assignment, then the type of the
                        // assignment flows into the reference.
                        return getTypeInformationForExpression(sourceFile, binaryExpression, /*contextualTypeInformation:*/ undefined);
                    }
                }

                throw new Error("Unhandled case in computeTypeInformationForReference");
            }

            function getTypeInformationForParenthesizedExpression(sourceFile: SourceFile, node: ParenthesizedExpression, contextualTypeInformation: TypeInformation) {
                // The type of a parenthesized expression is whatever the type of its sub-expression is.
                // The sub-expression *is* contextually typed.
                return getTypeInformationForExpression(sourceFile, node.expression, contextualTypeInformation);
            }

            function getTypeInformationForPostfixUnaryExpression(node: PostfixUnaryExpression) {
                // a++ or b-- are always considered to be the number type.
                return numberPrimitiveTypeInformation;
            }

            function getTypeInformationForPrefixUnaryExpression(node: PrefixUnaryExpression) {
                switch (node.operator) {
                    case SyntaxKind.PlusToken:
                    case SyntaxKind.MinusToken:
                    case SyntaxKind.TildeToken:
                        return numberPrimitiveTypeInformation;

                    case SyntaxKind.ExclamationToken:
                        return booleanPrimitiveTypeInformation;
                }

                throw new Error("Unhandled case in getTypeInformationForPrefixUnaryExpression");
            }

            function getTypeInformationForTypeOfExpression(node: TypeOfExpression) {
                // The 'typeof' operator takes an operand of any type and produces a value of the String primitive type.
                return stringPrimitiveTypeInformation;
            }

            function getTypeInformationForVoidExpression(node: VoidExpression): TypeInformation {
                // The 'void' operator takes an operand of any type and produces the value 'undefined'.
                // The type of the result is the Undefined type
                //
                // We don't actually use something to represent the 'undefined type'.  We just model that
                // as the absence of any actual type information.
                return undefined;
            }
        }
    }
}