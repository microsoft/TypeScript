//// [tests/cases/compiler/declarationEmitLateVisibleExpandoFunction.ts] ////

//// [mainTs.ts]
declare function wrap<T>(component: T): T;

function FunctionComponent() { return null; }
FunctionComponent.propTypes = { num: 0 };

const ArrowComponent = () => null;
ArrowComponent.propTypes = { num: 0 };

function UnusedComponent() { return null; }
UnusedComponent.propTypes = { num: 0 };

export const WrappedFunction = wrap(FunctionComponent);
export const WrappedArrow = wrap(ArrowComponent);

//// [mainJs.js]
/**
 * @template T
 * @param {T} component
 * @returns {T}
 */
function wrap(component) { return component; }

function FunctionComponent() { return null; }
FunctionComponent.propTypes = { num: 0 };

export const WrappedFunction = wrap(FunctionComponent);




//// [mainTs.d.ts]
declare function FunctionComponent(): null;
declare namespace FunctionComponent {
    var propTypes: {
        num: number;
    };
}
declare function ArrowComponent(): null;
declare namespace ArrowComponent {
    var propTypes: {
        num: number;
    };
}
export declare const WrappedFunction: typeof FunctionComponent;
export declare const WrappedArrow: typeof ArrowComponent;
export {};
//// [mainJs.d.ts]
declare function FunctionComponent(): null;
declare namespace FunctionComponent {
    var propTypes: {
        num: number;
    };
}
export declare const WrappedFunction: typeof FunctionComponent;
export {};
