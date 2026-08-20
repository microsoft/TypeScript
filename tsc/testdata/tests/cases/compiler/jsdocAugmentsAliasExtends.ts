// @noEmit: true

declare class Base {
}
declare class Other {
}
declare const StateDependencies_base: typeof Base;
/**
 * @augments {Base}
 */
export declare class StateDependencies extends StateDependencies_base {
}
/**
 * @augments {Base}
 */
export declare class TypeScriptStateDependencies extends Other {
}
