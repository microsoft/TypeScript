import {
    API as BaseAPI,
    type APIOptions,
} from "../../src/api/sync/api.ts";
import {
    createBrowserAPIOptions,
    wrapFileUpdates,
} from "./apiWrapper.ts";

export * from "../../src/api/sync/api.ts";

export type API<FromLSP extends boolean = false> = BaseAPI<FromLSP>;

export const API: typeof BaseAPI = new Proxy(BaseAPI, {
    construct(_target, args) {
        const options = (args[0] ?? {}) as APIOptions;
        const browserOptions = options as APIOptions & { fs?: import("../../src/api/fs.ts").FileSystem; };
        const created = createBrowserAPIOptions(browserOptions);
        const api = new BaseAPI(created.options as APIOptions);
        wrapFileUpdates(api, browserOptions.fs, created.transport);
        return api;
    },
});
