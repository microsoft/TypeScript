/* @internal */
namespace ts {
    interface BaseRefactor {
        /** An unique code associated with each refactor */
        refactorKind: RefactorKind;
        /** Indicates whether the refactor can be suggested without the editor asking for it  */
        suggestable: boolean;
        /** Compute the associated code actions */
        getCodeActions(context: RefactorContext, positionOrRange: number | TextRange): CodeAction[];
    }

    export interface SuggestableRefactor extends BaseRefactor {
        suggestable: true;
        /**
         * The corresponding refactor diagnostic code this refactor generates. All suggestableRefactors
         * generate one refactor diagnostic and handle it accordingly.
         */
        diagnosticCode: number;
        createRefactorDiagnosticIfApplicable(node: Node, context: RefactorContext): Diagnostic | undefined;
    }

    export interface NonSuggestableRefactor extends BaseRefactor {
        suggestable: false;
        /** Description of the refactor to display in the UI of the editor */
        description: string;
        /** A fast syntactic check to see if the refactor is applicable at given position. */
        isApplicableForPositionOrRange(positionOrRange: number | TextRange, context: LightRefactorContext): boolean;
    }

    export type Refactor = SuggestableRefactor | NonSuggestableRefactor;

    export interface LightRefactorContext {
        /**
         * The AST that was not bound, so the symbols associated with the nodes are not accessible.
         * Such a source file should be cheap to get.
         */
        nonBoundSourceFile: SourceFile;
        newLineCharacter: string;
    }

    export interface RefactorContext {
        boundSourceFile: SourceFile;
        program: Program;
        newLineCharacter: string;
        rulesProvider: formatting.RulesProvider;
    }

    export namespace refactor {
        // A map with the diagnostic code as key, the refactors themselves as value
        // e.g.  suggestableRefactors[diagnosticCode] -> the refactor you want
        const suggestableRefactors: SuggestableRefactor[] = [];
        // A map with the refactor code as key, the refactor itself as value
        // e.g.  nonSuggestableRefactors[refactorCode] -> the refactor you want
        const nonSuggestableRefactors: NonSuggestableRefactor[] = [];

        export function registerRefactor(refactor: Refactor) {
            switch (refactor.suggestable) {
                case true:
                    suggestableRefactors[refactor.diagnosticCode] = refactor;
                    break;
                case false:
                    nonSuggestableRefactors[refactor.refactorKind] = refactor;
                    break;
            }
        }

        export function getApplicableRefactors(
            context: LightRefactorContext,
            positionOrRange: number | TextRange): ApplicableRefactorInfo[] | undefined {

            let results: ApplicableRefactorInfo[];
            for (const code in nonSuggestableRefactors) {
                const refactor = nonSuggestableRefactors[code];
                if (refactor.isApplicableForPositionOrRange(positionOrRange, context)) {
                    (results || (results = [])).push({ refactorKind: refactor.refactorKind, description: refactor.description });
                }
            }
            return results;
        }

        export function getRefactorDiagnosticsForNode(context: RefactorContext, node: Node): Diagnostic[] | undefined {
            let result: Diagnostic[];
            for (const key in suggestableRefactors) {
                const refactor = suggestableRefactors[key];
                const newDiag = refactor.createRefactorDiagnosticIfApplicable(node, context);
                if (newDiag) {
                    (result || (result = [])).push(newDiag);
                }
            }
            return result;
        }

        export function getRefactorCodeActions(
            context: RefactorContext,
            positionOrRange: number | TextRange,
            refactorKinds?: RefactorKind[],
            diagnosticCodes?: number[]) {

            const result: CodeAction[] = [];
            if (refactorKinds !== undefined) {
                for (const refactorKind of refactorKinds) {
                    const refactor = nonSuggestableRefactors[refactorKind];
                    const codeActions = refactor.getCodeActions(context, positionOrRange);
                    if (codeActions) {
                        addRange(result, codeActions);
                    }
                }
            }
            if (diagnosticCodes !== undefined) {
                for (const diagnosticCode of diagnosticCodes) {
                    const refactor = suggestableRefactors[diagnosticCode];
                    const codeActions = refactor && refactor.getCodeActions(context, positionOrRange);
                    if (codeActions) {
                        addRange(result, codeActions);
                    }
                }
            }

            return result;
        }
    }
}
