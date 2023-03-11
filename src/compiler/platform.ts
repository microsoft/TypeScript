/** @internal */
export function isNodeLikeSystem(): boolean {
    // This is defined here rather than in sys.ts to prevent a cycle from its
    // use in performanceCore.ts.
    //
    // We don't use the presence of `require` to check if we are in Node;
    // when bundled using esbuild, this function will be rewritten to `__require`
    // and definitely exist.
    return typeof process !== "undefined"
        && !!process.nextTick
        && !(process as any).browser
        && typeof module === "object";
}
