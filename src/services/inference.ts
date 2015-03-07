/// <reference path="services.ts" />
/// <reference path="referenceManager.ts" />

module ts.inference {
    /* @internal */
    export interface Equatable {
        equals(other: Equatable): boolean
    }

    export function sequenceEquals<T>(array1: Equatable[], array2: Equatable[]): boolean {
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

    /* @internal */
    export function computeHash(hash: number, items: Hashable[]) {
        for (var i = 0, n = items.length; i < n; i++) {
            hash = hashCombine(items[i].getHashCode(), hash);
        }

        return hash;
    }
}

module ts.inference {
    /* @internal */
    export interface InferenceEngine {
        createEngineUpdater(): InferenceEngineUpdater;
        getTypeInformation(program: Program, node: Node): TypeInformation;

        /* @internal */ referenceManager_forTestingPurposesOnly: ReferenceManager;
    }

    export interface InferenceEngineUpdater {
        onSourceFileAdded(file: SourceFile): void;
        onSourceFileRemoved(file: SourceFile): void;

        onBeforeSourceFileUpdated(oldFile: SourceFile, textChangeRange: TextChangeRange): void;
        onAfterSourceFileUpdated(newFile: SourceFile, textChangeRange: TextChangeRange): void;

        finishUpdate(program: Program): void;
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
    export class TypeInformation implements Hashable {
        public kind(): TypeInformationKind {
            throw new Error("abstract");
        }

        public equals(other: TypeInformation): boolean {
            throw new Error("abstract");
        }

        public getHashCode(): number {
            throw new Error("abstract");
        }
    }

    class UnionTypeInformation extends TypeInformation {
        private hash: number;

        constructor(public types: TypeInformation[]) {
            super();
            this.hash = computeHash(TypeInformationKind.Union, types);
        }

        public kind() {
            return TypeInformationKind.Union;
        }

        public getHashCode() {
            return this.hash;
        }

        public equals(other: TypeInformation): boolean {
            if (this === other) {
                return true;
            }

            return other && other.kind() === TypeInformationKind.Union && sequenceEquals(this.types, (<UnionTypeInformation>other).types);
        }

        public toString() {
            return "(" + this.types.join(" | ") + ")";
        }
    }

    class PlusTypeInformation extends TypeInformation {
        private hash: number;

        constructor(public types: TypeInformation[]) {
            super();
            this.hash = computeHash(TypeInformationKind.Plus, types);
        }
        
        public kind() {
            return TypeInformationKind.Plus;
        }

        public equals(other: TypeInformation): boolean {
            if (this === other) {
                return true;
            }

            return other && other.kind() === TypeInformationKind.Plus && sequenceEquals(this.types, (<PlusTypeInformation>other).types);
        }

        public getHashCode() {
            return this.hash;
        }

        public toString() {
            return "(" + this.types.join(" + ") + ")";
        }
    };

    class PrimitiveTypeInformation extends TypeInformation {
        private static nextPrimitiveId = 1;

        private id: number;

        constructor(private name: string) {
            super();
            this.id = PrimitiveTypeInformation.nextPrimitiveId++;
        }

        public kind() {
            return TypeInformationKind.Primitive;
        }

        public getHashCode() {
            return this.id;
        }

        public equals(o: TypeInformation): boolean {
            // Primitives have reference identity.
            return o === this;
        }

        public toString() {
            return this.name;
        }
    }

    class SymbolTypeInformation extends TypeInformation {
        private type: TypeInformation;
        private computingType = false;

        constructor(private declarationNode: Node, private computeType: (declarationNode: Node) => TypeInformation) {
            super();
        }

        public kind() {
            return TypeInformationKind.Symbol;
        }

        public getHashCode() {
            return hashCombine(TypeInformationKind.Symbol, getNodeId(this.declarationNode));
        }

        public equals(o: TypeInformation): boolean {
            // symbolInformation has identity semantics.
            return this === o;
        }

        public clearType() {
            this.type = undefined;
            this.computingType = false;
        }

        public getType() {
            // Prevent recursion.
            if (this.computingType) {
                return undefined;
            }

            this.computingType = true;
            this.type = this.computeType(this.declarationNode);
            this.computingType = false;
            return this.type;
        }

        public toString() {
            return "Symbol(" + getNodeId(this.declarationNode) + ")";
        }
    }
   
    /* @internal */
    export function createInferenceEngine(): InferenceEngine {
        var declarationIdToSymbolTypeInformation: SymbolTypeInformation[] = [];
        var cachedTypes = createHashTable<TypeInformation, TypeInformation>();

        var booleanPrimitiveTypeInformation = new PrimitiveTypeInformation("boolean");
        var numberPrimitiveTypeInformation = new PrimitiveTypeInformation("number");
        var stringPrimitiveTypeInformation = new PrimitiveTypeInformation("string");

        var stringOrNumberUnionType = createUnionTypeInformation(stringPrimitiveTypeInformation, numberPrimitiveTypeInformation);

        var referenceManager = createReferenceManager();
        
        return {
            createEngineUpdater,
            getTypeInformation,
            referenceManager_forTestingPurposesOnly: referenceManager
        };

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
                if (type.kind() === TypeInformationKind.Union) {
                    var constituentTypes = (<UnionTypeInformation>type).types;
                    for (var i = 0, n = constituentTypes.length; i < n; i++) {
                        var constituent = constituentTypes[i];
                        Debug.assert(constituent.kind() !== TypeInformationKind.Union);

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
            if (type.kind() === TypeInformationKind.Plus) {
                var constituentTypes = (<PlusTypeInformation>type).types;
                for (var i = 0, n = constituentTypes.length; i < n; i++) {
                    var constituent = constituentTypes[i];
                    Debug.assert(constituent.kind() !== TypeInformationKind.Plus);

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

            Debug.assert(filter(types, t => t.kind() === TypeInformationKind.Union).length === 0, "We should never nest union types");

            // Cap the number of types we'll keep in a union type at 8.
            types = types.length > 8 ? types.slice(0, 8) : types;

            var unionType = new UnionTypeInformation(types);
            return cachedTypes.getOrAdd(unionType, unionType);
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
                onBeforeSourceFileUpdated,
                onAfterSourceFileUpdated,
                finishUpdate
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

            var lastUpdatedSourceFile: SourceFile;
            function onBeforeSourceFileUpdated(oldFile: SourceFile, textChangeRange: TextChangeRange) {
                if (!isJavascriptFile(oldFile)) {
                    return;
                }

                Debug.assert(!lastUpdatedSourceFile, "We already have an outstanding updated file!");
                lastUpdatedSourceFile = oldFile;

                // Before we go and reparse the file, go through and remove information that we 
                // think will be affected by the edit.  We do this by finding a suitable range
                // to invalidate, and then going through and dumping the type information for any
                // symbols we see referenced in that range.
                //
                // Our general approach is to find the closest containing node that encompasses
                // the text change.  Then, if that's an expression, we keep walking upwards to 
                // the highest expression level.
                var changeRoot = getRootOfChange(oldFile, textChangeRange);
                clearCachedInformationForAffectedNodes(oldFile, changeRoot);
            }

            function clearCachedInformationForAffectedNodes(file: SourceFile, rootNode: Node) {
                // Any references we see used here we will clear the cached type information for.

                var bidirectionalReferences = referenceManager.getBidirectionalReferences(file.fileName);
                if (!bidirectionalReferences) {
                    return;
                }

                walk(rootNode);

                function walk(node: Node) {
                    if (node && node.kind === SyntaxKind.Identifier) {
                        var declarationNode = referenceToDeclarationMap_get(bidirectionalReferences.referenceToDeclaration, node);
                        if (declarationNode) {
                            clearCachedTypes(declarationNode);
                        }
                    }

                    forEachChild(node, walk);
                }
            }

            function clearCachedTypes(declarationNode: Node) {
                if (declarationNode) {
                    var declarationNodeId = getNodeId(declarationNode);
                    var symbolInformation = declarationIdToSymbolTypeInformation[declarationNodeId];
                    if (symbolInformation) {
                        symbolInformation.clearType();
                    }
                }
            }

            function getRootOfChange(file: SourceFile, textChangeRange: TextChangeRange) {
                var container = getNode(file, textChangeRange.span.start, textSpanEnd(textChangeRange.span));

                // Walk up anything that would be contextually typed.  We use this as a weak form 
                // of detecting what is affected by this edit.
                for (var current = container.parent; current; current = current.parent) {
                    if (!isExpression(current) && !isObjectLiteralMethod(current)) {
                        break;
                    }
                }

                return current;
            }

            function getNode(sourceFile: SourceFile, start: number, end: number): Node {
                var bestNode: Node = sourceFile;
                walk(sourceFile);
                return bestNode;

                function walk(node: Node): void {
                    if (!node || !overlaps(node, start, end)) {
                        return;
                    }

                    bestNode = node;
                    forEachChild(node, walk);
                }
            }

            function overlaps(node: Node, start: number, end: number) {
                return node.pos <= start && node.end >= end;
            }

            function getCommonContainer(node1: Node, node2: Node) {
                var containers: Node[] = [];
                for (var current = node1; current; current = current.parent) {
                    containers.push(current);
                }

                for (var current = node2; current; current = current.parent) {
                    if (contains(containers, current)) {
                        return current;
                    }
                }

                throw new Error("Unreachable");
            }

            function onAfterSourceFileUpdated(newFile: SourceFile, textChangeRange: TextChangeRange) {
                if (!isJavascriptFile(newFile)) {
                    return;
                }

                Debug.assert(!!lastUpdatedSourceFile, "We were never notified about this file being updated");
                Debug.assert(lastUpdatedSourceFile.fileName === newFile.fileName);

                var oldFile = lastUpdatedSourceFile;
                lastUpdatedSourceFile = undefined;

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

            function finishUpdate(program: Program) {
                Debug.assert(!lastUpdatedSourceFile, "We have an outstanding updated file we never heard about");

                // First, go through the removed symbols, and remove the cached information we have for them.
                for (var i = 0, n = removedValueSymbols.length; i < n; i++) {
                    var removedSymbol = removedValueSymbols[i];
                    var declarationNode = removedSymbol.valueDeclaration;
                    if (declarationNode) {
                        var declarationId = getNodeId(declarationNode);
                        var symbolInformation = declarationIdToSymbolTypeInformation[declarationId];

                        if (symbolInformation) {
                            // Remove any type information we've cached about this symbol.  Anyone
                            // still referring to this symbol will get no type information from it.
                            // Note: in general, if we update the graph properly, no one should still
                            // point at it.  However, we want to be defensive here to prevent old
                            // symbols from keeping too much stuff alive.
                            symbolInformation.clearType();

                            // And delete the symbol from the cache.
                            delete declarationIdToSymbolTypeInformation[declarationId];
                        }
                    }
                }

                // Now, notify the reference manager of the updates.
                referenceManager.onAfterProgramCreated(program, removedFiles, addedFiles, newUpdatedFiles, removedValueSymbols, addedValueSymbols);
            }
        }

        function getTypeInformation(program: Program, _node: Node): TypeInformation {
            referenceManager.updateReferences(program);

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
            switch (typeInformation.kind()) {
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
            var result = evaluateTypeInformation(typeInformation.getType(), symbolStack);
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

                Debug.assert(filter(types, t => t.kind() === TypeInformationKind.Plus).length === 0, "We should never plus types");

                // Cap the number of types we'll keep in a plus type at 8.
                types = types.length > 8 ? types.slice(0, 8) : types;

                var result = new PlusTypeInformation(types);
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
                    
                    symbolTypeInformation = new SymbolTypeInformation(declarationNode, node => computeTypeInformationForDeclaration(node));

                    declarationIdToSymbolTypeInformation[declarationId] = symbolTypeInformation;
                }

                return symbolTypeInformation;
            }

            function computeTypeInformationForDeclaration(declarationNode: Node): TypeInformation {
                // This may get called after a declaration has been removed.  If so, then we simply
                // return no type information.
                var symbolInformation = declarationIdToSymbolTypeInformation[getNodeId(declarationNode)];
                if (!symbolInformation) {
                    return undefined;
                }

                // The declaration may have an initializer, use that to populate the initial 
                // type of this symbol.
                var type = computeTypeInformationForDeclarationWorker(declarationNode);

                // Now check all the references, and flow their information into the symbol.
                var referencesMap = referenceManager.getReferencesToDeclarationNode(declarationNode);
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

                return type;
            }

            function computeTypeInformationForDeclarationWorker(node: Node) {
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

                // TODO(cyrusn): If necessary, add more cases where we a reference can be found 
                // where we can flow type information.
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