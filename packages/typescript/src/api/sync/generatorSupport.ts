import type {
    APIMethodInfo,
    APIRequest,
    APIResponse,
} from "../proto.ts";

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
export type APIRequestGenerator<Return = any> = Generator<APIRequest | readonly APIRequest[], Return, any>;
type GeneratorReturn<T> = T extends Generator<any, infer R, any> ? R : never;
export type ExecutedGeneratorsResults<T extends readonly APIRequestGenerator[]> = {
    [K in keyof T]: GeneratorReturn<T[K]>;
};

interface GeneratorResponse {
    result: unknown;
    error?: string | undefined;
}

export function all<const T extends readonly APIRequestGenerator[]>(
    ...requestGenerators: T
): Generator<APIRequest[], ExecutedGeneratorsResults<T>, readonly GeneratorResponse[]>;
export function* all<T extends readonly APIRequestGenerator[]>(
    ...requestGenerators: T
): Generator<APIRequest[], ExecutedGeneratorsResults<T>, readonly GeneratorResponse[]> {
    const results: any[] = [];
    const requestObjects: (APIRequest | readonly APIRequest[] | undefined)[] = [];
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
        const requests: APIRequest[] = [];
        const responseIndices: (number | readonly number[] | undefined)[] = [];
        const responseIndexByDeduplicationKey = new Map<string, number>();
        const addRequest = (request: APIRequest): number => {
            const deduplicationKey = getRequestDeduplicationKey(request);
            let responseIndex = deduplicationKey === undefined ? undefined : responseIndexByDeduplicationKey.get(deduplicationKey);
            if (responseIndex === undefined) {
                responseIndex = requests.length;
                requests.push(request);
                if (deduplicationKey !== undefined) responseIndexByDeduplicationKey.set(deduplicationKey, responseIndex);
            }
            return responseIndex;
        };
        for (let i = 0; i < requestGenerators.length; i++) {
            if (completedIndices.has(i)) continue;

            const request = requestObjects[i]!;
            responseIndices[i] = isRequestGroup(request) ? request.map(addRequest) : addRequest(request);
        }

        const responses = yield requests;
        for (let i = 0; i < requestGenerators.length; i++) {
            if (completedIndices.has(i)) continue;

            const requestGenerator = requestGenerators[i];
            const responseIndex = responseIndices[i]!;
            let state: IteratorResult<APIRequest | readonly APIRequest[], any>;
            if (typeof responseIndex === "number") {
                const result = responses[responseIndex];
                state = result.error
                    ? requestGenerator.throw(new Error(result.error))
                    : requestGenerator.next(result.result);
            }
            else {
                state = requestGenerator.next(responseIndex.map(index => responses[index]));
            }
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

function isRequestGroup(request: APIRequest | readonly APIRequest[]): request is readonly APIRequest[] {
    return Array.isArray(request);
}

function getRequestDeduplicationKey(request: APIRequest): string | undefined {
    switch (request.method) {
        case "initialize":
            return request.method;
        default:
            return undefined;
    }
}
