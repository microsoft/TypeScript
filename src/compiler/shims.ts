/* @internal */
namespace ts {
    // Natives
    declare const Map: (new <T>() => Map<T>) | undefined;
    declare const Promise: PromiseConstructor | undefined;

    export function tryGetNativeMap(): MapConstructor | undefined {
        // Internet Explorer's Map doesn't support iteration, so don't use it.
        // tslint:disable-next-line no-in-operator variable-name
        return typeof Map !== "undefined" && "entries" in Map.prototype ? Map : undefined;
    }

    export function tryGetNativePromise(): PromiseConstructor | undefined {
        return typeof Promise === "function" ? Promise : undefined;
    }
}

/* @internal */
namespace ts {
    // Shims
    export const Map: MapConstructor = tryGetNativeMap() || requireShim("./mapShim.js", "createMapShim"); // tslint:disable-line variable-name
    export const Promise: PromiseConstructor = tryGetNativePromise() || requireShim("./promiseShim.js", "createPromiseShim"); // tslint:disable-line variable-name

    function requireShim<K extends string, C>(shimPath: string, shimFactory: K) {
        type ShimModule = Record<K, () => C>;

        // We bundle the shims with services, so first check whether we have the required shim.
        const tsWithShims = ts as typeof ts & ShimModule;
        if (typeof tsWithShims[shimFactory] === "function") {
            return tsWithShims[shimFactory]();
        }

        if (sys && sys.require) {
            const basePath = getDirectoryPath(resolvePath(sys.getExecutingFilePath()));
            const result = sys.require(basePath, shimPath) as RequireResult<ShimModule>;
            if (result.error) {
                return Debug.fail(`Could not load shim from '${shimPath}': ${result.error.stack || result.error.message || result.error}`);
            }
            if (typeof result.module[shimFactory] === "function") {
                return result.module[shimFactory]();
            }
            return Debug.fail(`Could not load shim from '${shimPath}': Factory function '${shimFactory}' was not found.`);
        }

        return Debug.fail(`Could not load shim from '${shimPath}': Module loading not supported.`);
    }
}
