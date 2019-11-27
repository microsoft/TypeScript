// We polyfill `globalThis` here so re can reliably patch the global scope
// in the contexts we want to in the same way across script and module formats

// https://mathiasbynens.be/notes/globalthis

// #region The polyfill starts here.
((() => {
    if (typeof globalThis === "object") return;
    try {
        Object.defineProperty(Object.prototype, "__magic__", {
            get() {
                return this;
            },
            configurable: true
        });
        //@ts-ignore
        __magic__.globalThis = __magic__;
        // The previous line should have made `globalThis` globally
        // available, but it fails in Internet Explorer 10 and older.
        // Detect this failure and fall back.
        if (typeof globalThis === "undefined") {
            // Assume `window` exists.
            //@ts-ignore
            window.globalThis = window;
        }
        //@ts-ignore
        delete Object.prototype.__magic__;
    }
    catch (error) {
        // In IE8, Object.defineProperty only works on DOM objects.
        // If we hit this code path, assume `window` exists.
        //@ts-ignore
        window.globalThis = window;
    }
})());
// #endregion The polyfill ends here.

// if `process` is undefined, we're probably not running in node - patch legacy members onto the global scope
// @ts-ignore
if (typeof process === "undefined" || process.browser) {
    /// TODO: this is used by VS, clean this up on both sides of the interface
    //@ts-ignore
    globalThis.TypeScript.Services.TypeScriptServicesFactory = ts.TypeScriptServicesFactory;

    // 'toolsVersion' gets consumed by the managed side, so it's not unused.
    // TODO: it should be moved into a namespace though.

    //@ts-ignore
    globalThis.toolsVersion = ts.versionMajorMinor;
}