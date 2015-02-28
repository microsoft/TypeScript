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

    /* @internal */
    export function createInferenceEngine(): InferenceEngine {
        var typeChecker: TypeChecker;
        var fileNameToSourceFileId: ts.Map<number>

        return <InferenceEngine>{
            createEngineUpdater
            //onBeforeUpdateSourceFile
        };

        function createEngineUpdater(): InferenceEngineUpdater {
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