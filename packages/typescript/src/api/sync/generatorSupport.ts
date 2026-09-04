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
const deferredGeneratorMarker: unique symbol = Symbol();
interface DeferredAPIRequest {
    readonly deferred: UndeferredAPIRequestGenerator;
}
type APIRequestGeneratorYield = APIRequest | readonly APIRequest[] | DeferredAPIRequest;
export type UndeferredAPIRequestGenerator<Return = any> = Generator<APIRequestGeneratorYield, Return, any>;
export type DeferredAPIRequestGenerator = Generator<DeferredAPIRequest, void, unknown> & { readonly [deferredGeneratorMarker]: true; };
export type APIRequestGenerator<Return = any> = UndeferredAPIRequestGenerator<Return> | DeferredAPIRequestGenerator;
type GeneratorReturn<T> = T extends Generator<any, infer R, any> ? R : never;
export type ExecutedGeneratorsResults<T extends readonly APIRequestGenerator[]> = number extends T["length"] ? GeneratorReturn<Exclude<T[number], DeferredAPIRequestGenerator>>[]
    : T extends readonly [infer Head extends APIRequestGenerator, ...infer Tail extends readonly APIRequestGenerator[]] ? Head extends DeferredAPIRequestGenerator ? ExecutedGeneratorsResults<Tail> : [GeneratorReturn<Head>, ...ExecutedGeneratorsResults<Tail>]
    : [];

interface GeneratorResponse {
    result: unknown;
    error?: string | undefined;
}

interface RequestRunnerOptions {
    executeDeferred?: boolean;
    getDeduplicationKey?: (request: APIRequest) => string | undefined;
}

function createRequestRunner<T extends readonly APIRequestGenerator[]>(requestGenerators: T, options: RequestRunnerOptions = {}) {
    const registeredGenerators = new Set<APIRequestGenerator>();
    const requestsByGenerator = new Map<APIRequestGenerator, APIRequestGeneratorYield>();
    const resultsByGenerator = new Map<APIRequestGenerator, unknown>();
    for (const generator of requestGenerators) {
        addGenerator(generator);
    }
    const requestRounds = runRequestRounds();
    return { requestRounds, getResults };

    function advanceGenerator(generator: APIRequestGenerator, value?: unknown, error?: string): void {
        let state = error === undefined
            ? generator.next(value)
            : generator.throw(new Error(error));
        while (!state.done && isDeferredAPIRequest(state.value) && options.executeDeferred) {
            addGenerator(state.value.deferred);
            state = generator.next();
        }
        if (state.done) {
            requestsByGenerator.delete(generator);
            resultsByGenerator.set(generator, state.value);
        }
        else {
            requestsByGenerator.set(generator, state.value);
        }
    }

    function addGenerator(generator: APIRequestGenerator): void {
        if (registeredGenerators.has(generator)) throw new Error("Cannot execute the same generator instance more than once");
        registeredGenerators.add(generator);
        advanceGenerator(generator);
    }

    function* runRequestRounds(): Generator<APIRequest[] | DeferredAPIRequest, void, readonly GeneratorResponse[]> {
        while (requestsByGenerator.size) {
            for (const generator of registeredGenerators) {
                let request = requestsByGenerator.get(generator);
                while (request && isDeferredAPIRequest(request)) {
                    yield request;
                    advanceGenerator(generator);
                    request = requestsByGenerator.get(generator);
                }
            }
            if (!requestsByGenerator.size) break;

            const requests: APIRequest[] = [];
            const responseIndexByDeduplicationKey = new Map<string, number>();
            const addRequest = (request: APIRequest): number => {
                const deduplicationKey = options.getDeduplicationKey?.(request);
                let responseIndex = deduplicationKey === undefined ? undefined : responseIndexByDeduplicationKey.get(deduplicationKey);
                if (responseIndex === undefined) {
                    responseIndex = requests.length;
                    requests.push(request);
                    if (deduplicationKey !== undefined) responseIndexByDeduplicationKey.set(deduplicationKey, responseIndex);
                }
                return responseIndex;
            };
            // TODO: Use Iterator.prototype.filter when target >= ES2025
            const roundGenerators = [...registeredGenerators].filter(generator => requestsByGenerator.has(generator));
            const responseIndices = new Map<APIRequestGenerator, number | readonly number[]>();
            for (const generator of roundGenerators) {
                const request = requestsByGenerator.get(generator) as APIRequest | readonly APIRequest[];
                responseIndices.set(generator, isRequestGroup(request) ? request.map(addRequest) : addRequest(request));
            }

            const responses = yield requests;
            for (const generator of roundGenerators) {
                const responseIndex = responseIndices.get(generator)!;
                if (typeof responseIndex === "number") {
                    const result = responses[responseIndex];
                    advanceGenerator(generator, result.result, result.error || undefined);
                }
                else {
                    advanceGenerator(generator, responseIndex.map(index => responses[index]));
                }
            }
        }
    }

    function getResults(): ExecutedGeneratorsResults<T> {
        return requestGenerators
            .filter(generator => !isDeferredGenerator(generator))
            .map(generator => resultsByGenerator.get(generator)) as ExecutedGeneratorsResults<T>;
    }
}

export function all<const T extends readonly APIRequestGenerator[]>(
    ...requestGenerators: T
): UndeferredAPIRequestGenerator<ExecutedGeneratorsResults<T>>;
export function* all<T extends readonly APIRequestGenerator[]>(
    ...requestGenerators: T
): UndeferredAPIRequestGenerator<ExecutedGeneratorsResults<T>> {
    const { requestRounds, getResults } = createRequestRunner(requestGenerators);
    yield* requestRounds;
    return getResults();
}

export function executeRequestGenerators<T extends readonly APIRequestGenerator[]>(
    requestGenerators: T,
    executeRequests: (requests: APIRequest[]) => readonly GeneratorResponse[],
): ExecutedGeneratorsResults<T> {
    const { requestRounds, getResults } = createRequestRunner(requestGenerators, { executeDeferred: true, getDeduplicationKey: getRequestDeduplicationKey });
    let state = requestRounds.next();
    while (!state.done) {
        if (isDeferredAPIRequest(state.value)) throw new Error("Unexpected deferred request");
        state = requestRounds.next(executeRequests(state.value));
    }
    return getResults();
}

function isDeferredAPIRequest(request: APIRequestGeneratorYield): request is DeferredAPIRequest {
    return !Array.isArray(request) && "deferred" in request;
}

function isDeferredGenerator(generator: APIRequestGenerator): generator is DeferredAPIRequestGenerator {
    return deferredGeneratorMarker in generator;
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

export function defer(gen: UndeferredAPIRequestGenerator): DeferredAPIRequestGenerator {
    const deferred = (function* (): Generator<DeferredAPIRequest, void, unknown> {
        yield { deferred: gen };
    })() as DeferredAPIRequestGenerator;
    Object.defineProperty(deferred, deferredGeneratorMarker, { value: true });
    return deferred;
}
