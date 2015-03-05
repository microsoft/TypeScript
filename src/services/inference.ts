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
        getTypeInformation(node: Node): TypeInformation;

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

    const enum TypeInformationKind {
        Primitive,
        Union
    }

    interface TypeInformation extends Hashable {
        kind: TypeInformationKind;
        equals(other: TypeInformation): boolean;
    }

    interface UnionTypeInformation extends TypeInformation {
        types: TypeInformation[];
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

    function references_forEach(references: References, f: (referenceNode: Node) => void) {
        var array = <Node[]><any>references;
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
        getReferences(program: Program, symbol: Symbol): Map<References>;
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
            getReferences,
            toJSON
        };

        function getReferences(program: Program, symbol: Symbol): Map<References> {
            ensureUpToDate(program);
            if (symbol && symbol.valueDeclaration) {
                var declarationNode = symbol.valueDeclaration;

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
                    stringSet_add(filesWithReferences, fileName);
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
        var cachedTypes = createHashTable<TypeInformation, TypeInformation>();

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

        var nextPrimitiveId = 0;
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

        function addTypesToSet(type: TypeInformation, types: TypeInformation[]) {
            // We flatten all union types.  That way there is a single linear representation for
            // unions, and we don't have to compare any sort of tree structure.
            if (type.kind === TypeInformationKind.Union) {
                var constituentTypes = (<UnionTypeInformation>type).types;
                for (var i = 0, n = constituentTypes.length; i < n; i++) {
                    addTypesToSet(constituentTypes[i], types);
                }

                return;
            }

            // We want to put the type into the list in sorted order.
            var hashCode = type.getHashCode();
            for (var i = 0, n = types.length; i < n; i++) {
                var currentType = types[i];
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
                    types.splice(i, /*deleteCount:*/ 0, type);
                    return;
                }
            }

            // Couldn't find a place in the list to put it.  So just put it at the end.
            types.push(type);
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
            addTypesToSet(type1, types);
            addTypesToSet(type2, types);

            Debug.assert(types.length >= 2);
            Debug.assert(filter(types, t => t.kind === TypeInformationKind.Union).length === 0, "We should never nest union types");

            // Cap the number of types we'll keep in a union type at 8.
            types = types.length > 8 ? types.slice(0, 8) : types;

            var hash: number = TypeInformationKind.Union;
            for (var i = 0, n = types.length; i < n; i++) {
                hash = hashCombine(types[i].getHashCode(), hash);
            }

            var unionType: UnionTypeInformation = {
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
                            return stringPrimitiveTypeInformation;
                        case SyntaxKind.NumericLiteral:
                            return numberPrimitiveTypeInformation;
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

        function getTypeInformation(node: Node): TypeInformation {
            if (node) {
                if (isExpression(node)) {
                    return getTypeInformationForExpression(<Expression>node,
                        getContextualTypeInformation(<Expression>node));
                }
            }

            return undefined;
        }

        function getContextualTypeInformation(node: Expression): TypeInformation {
            // TODO(cyrusn): add support for flowing contextual type information into an expression.
            return undefined;
        }

        function getTypeInformationForExpression(node: Expression, contextualTypeInformation: TypeInformation): TypeInformation {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.BinaryExpression:           return getTypeInformationForBinaryExpression(<BinaryExpression>node, contextualTypeInformation);
                    case SyntaxKind.ConditionalExpression:      return getTypeInformationForConditionalExpression(<ConditionalExpression>node, contextualTypeInformation);
                    case SyntaxKind.DeleteExpression:           return getTypeInformationForDeleteExpression(<DeleteExpression>node);
                    case SyntaxKind.ParenthesizedExpression:    return getTypeInformationForParenthesizedExpression(<ParenthesizedExpression>node, contextualTypeInformation);
                    case SyntaxKind.PostfixUnaryExpression:     return getTypeInformationForPostfixUnaryExpression(<PostfixUnaryExpression>node);
                    case SyntaxKind.PrefixUnaryExpression:      return getTypeInformationForPrefixUnaryExpression(<PrefixUnaryExpression>node);
                    case SyntaxKind.TypeOfExpression:           return getTypeInformationForTypeOfExpression(<TypeOfExpression>node);
                    case SyntaxKind.VoidExpression:             return getTypeInformationForVoidExpression(<VoidExpression>node);
                }

                throw new Error("Unhandled case in getTypeInformationForExpression");
            }

            return undefined;
        }

        function getTypeInformationForBinaryExpression(node: BinaryExpression, contextualTypeInformation: TypeInformation) {
            switch (node.operatorToken.kind) {
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case SyntaxKind.AmpersandToken:
                case SyntaxKind.CaretToken:
                case SyntaxKind.BarToken:
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
                    return getTypeInformationForExpression(node.right, /*contextualTypeInformation:*/ undefined);

                case SyntaxKind.CommaToken:
                    // The comma operator permits the operands to be of any type and produces a 
                    // result that is of the same type as the second operand.
                    return getTypeInformationForExpression(node.right, /*contextualTypeInformation:*/ undefined);

                case SyntaxKind.BarBarToken:
                    return getTypeInformationForBarBarBinaryExpression(node, contextualTypeInformation);
            }

            throw new Error("Unhandled case in getTypeInformationForBinaryExpression");
        }

        function getTypeInformationForBarBarBinaryExpression(node: BinaryExpression, contextualTypeInformation: TypeInformation) {
            // If the || expression is contextually typed (section 4.19), the operands are 
            // contextually typed by the same type. Otherwise, the left operand is not contextually
            // typed and the right operand is contextually typed by the type of the left operand. 
            //
            // The type of the result is the union type of the two operand types.
            if (contextualTypeInformation) {
                return createUnionTypeInformation(
                    getTypeInformationForExpression(node.left, contextualTypeInformation),
                    getTypeInformationForExpression(node.right, contextualTypeInformation));
            }
            else {
                var leftTypeInformation = getTypeInformationForExpression(node.left, /*contextualTypeInformation:*/ undefined);
                var rightTypeInformation = getTypeInformationForExpression(node.right, /*contextualTypeInformation:*/ leftTypeInformation);
                return createUnionTypeInformation(leftTypeInformation, rightTypeInformation);
            }
        }

        function getTypeInformationForConditionalExpression(node: ConditionalExpression, contextualTypeInformation: TypeInformation) {
            // If the conditional expression is contextually typed (section 4.19), expr1 and expr2 
            // are contextually typed by the same type.Otherwise, expr1 and expr2 are not 
            // contextually typed. type of the result is the union type of the types of expr1 and 
            // expr2.
            return createUnionTypeInformation(
                getTypeInformationForExpression(node.whenTrue, contextualTypeInformation),
                getTypeInformationForExpression(node.whenFalse, contextualTypeInformation));
        }

        function getTypeInformationForDeleteExpression(node: DeleteExpression) {
            // The 'delete' operator takes an operand of any type and produces a result of the Boolean primitive type.
            return booleanPrimitiveTypeInformation;
        }

        function getTypeInformationForParenthesizedExpression(node: ParenthesizedExpression, contextualTypeInformation: TypeInformation) {
            // The type of a parenthesized expression is whatever the type of its sub-expression is.
            // The sub-expression *is* contextually typed.
            return getTypeInformationForExpression(node.expression, contextualTypeInformation);
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