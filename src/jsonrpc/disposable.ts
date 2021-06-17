/* @internal */
namespace ts.server.rpc {
    export interface Disposable {
        /**
         * Dispose this object.
         */
        dispose(): void;
    }

    export namespace Disposable {
        export function create(func: () => void): Disposable {
            return {
                dispose: func
            };
        }
    }
}
