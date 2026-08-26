import type {
    APIMethodInfo,
    APIRequest,
    APIResponse,
} from "../proto.ts";
import type { API } from "./api.ts";

export function cacheGeneratorMethod<Sync extends (...args: any[]) => any, Gen extends (...args: any[]) => APIRequestGenerator>(
    owner: object,
    name: PropertyKey,
    sync: Sync,
    gen: Gen,
): Sync & { readonly gen: Gen; } {
    const method = Object.assign(sync, { gen });
    Object.defineProperty(owner, name, { configurable: true, value: method });
    return method;
}

export function apiRequest<Method extends keyof APIMethodInfo>(
    method: Method,
    params: APIMethodInfo[Method]["params"],
): Generator<APIRequest, APIMethodInfo[Method]["result"], APIResponse["result"]>;
export function* apiRequest(method: PropertyKey, params: unknown): Generator<{ method: PropertyKey; params: unknown; }, unknown, unknown> {
    return yield { method, params };
}
export type APIRequestGenerator = Generator<APIRequest, any, APIResponse["result"]>;
type GeneratorReturn<T> = T extends Generator<any, infer R, any> ? R : never;
export type ExecutedGeneratorsResults<T extends readonly APIRequestGenerator[]> = {
    [K in keyof T]: GeneratorReturn<T[K]>;
};

export function batchGenerators<T extends readonly APIRequestGenerator[]>(
    api: API<any>,
    ...requestGenerators: T
): ExecutedGeneratorsResults<T> {
    const results: any[] = [];
    const requestObjects: (APIRequest | undefined)[] = [];
    const completedIndices = new Set<number>();
    for (let i = 0; i < requestGenerators.length; i++) {
        const state = requestGenerators[i].next();
        if (state.done) {
            results[i] = state.value;
            completedIndices.add(i);
        }
        else {
            requestObjects[i] = state.value;
        }
    }
    while (completedIndices.size < requestGenerators.length) {
        const response = api.batchRequests(requestObjects.filter((r): r is APIRequest => r !== undefined));
        let responseIndex = 0;
        for (let i = 0; i < requestGenerators.length; i++) {
            if (completedIndices.has(i)) continue;

            const requestGenerator = requestGenerators[i];
            const result = response.responses[responseIndex++];
            const state = result.error
                ? requestGenerator.throw(new Error(result.error))
                : requestGenerator.next(result.result);
            if (state.done) {
                results[i] = state.value;
                completedIndices.add(i);
                requestObjects[i] = undefined;
            }
            else requestObjects[i] = state.value;
        }
    }
    return results as any[] as ExecutedGeneratorsResults<T>;
}
