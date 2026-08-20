export interface Disposable {
    /**
     * Dispose this object.
     */
    dispose(): void;
}
export declare namespace Disposable {
    function create(func: () => void): Disposable;
}
