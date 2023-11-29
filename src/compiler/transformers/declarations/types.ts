import {
    CompilerOptions,
    CoreEmitResolver,
    CoreTransformationContext,
    Diagnostic,
    NodeFactory,
} from "../../_namespaces/ts";

/** @internal */
export interface IsolatedTransformationContext extends CoreTransformationContext {
    useLocalInferenceTypePrint: true;
    getEmitResolver(): CoreEmitResolver;
    getCompilerOptions(): CompilerOptions;
    factory: NodeFactory;
    addDiagnostic(diag: Diagnostic): void;
}

/** @internal */
export type MemberKey = string & {
    __memberKey: void;
};
