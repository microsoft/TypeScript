import type {
    APIMethodInfo,
    APIRequest,
    APIResponse,
} from "../proto.ts";

export function cacheGeneratorMethod<Sync extends (...args: any[]) => any, Gen extends (...args: any[]) => AnyAPIRequestGenerator>(
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
    readonly method: "__defer";
    readonly deferred: APIRequestGenerator;
}
interface AllAPIRequest {
    readonly method: "__all";
    readonly generators: readonly AnyAPIRequestGenerator[];
}
type APIRequestGeneratorYield = APIRequest | readonly APIRequest[] | DeferredAPIRequest | AllAPIRequest;
export type APIRequestGenerator<Return = any> = Generator<APIRequestGeneratorYield, Return, any>;
export type DeferredAPIRequestGenerator = Generator<DeferredAPIRequest, void, unknown> & { readonly [deferredGeneratorMarker]: true; };
export type AllAPIRequestGenerator<Return = any> = Generator<AllAPIRequest, Return, Return>;
export type AnyAPIRequestGenerator<Return = any> = APIRequestGenerator<Return> | DeferredAPIRequestGenerator | AllAPIRequestGenerator<Return>;
type GeneratorReturn<T> = T extends Generator<any, infer R, any> ? R : never;
export type ExecutedGeneratorsResults<T extends readonly AnyAPIRequestGenerator[]> = number extends T["length"] ? GeneratorReturn<Exclude<T[number], DeferredAPIRequestGenerator>>[]
    : T extends readonly [infer Head extends AnyAPIRequestGenerator, ...infer Tail extends readonly AnyAPIRequestGenerator[]] ? Head extends DeferredAPIRequestGenerator ? ExecutedGeneratorsResults<Tail> : [GeneratorReturn<Head>, ...ExecutedGeneratorsResults<Tail>]
    : [];

interface GeneratorResponse {
    result: unknown;
    error?: string | undefined;
}

interface GeneratorState {
    generator: AnyAPIRequestGenerator;
    parent: GeneratorGroup | undefined;
    resultIndex: number;
    previous: GeneratorState | undefined;
    next: GeneratorState | undefined;
    active: boolean;
    request?: APIRequest | readonly APIRequest[] | undefined;
    group?: GeneratorGroup | undefined;
}

interface GeneratorGroup {
    parent: GeneratorState | undefined;
    children: GeneratorState[];
    results: unknown[];
    remaining: number;
    initializing: boolean;
    failed: boolean;
    error?: unknown;
}

export function all<const T extends readonly AnyAPIRequestGenerator[]>(
    ...requestGenerators: T
): AllAPIRequestGenerator<ExecutedGeneratorsResults<T>>;
export function* all<T extends readonly AnyAPIRequestGenerator[]>(
    ...requestGenerators: T
): AllAPIRequestGenerator<ExecutedGeneratorsResults<T>> {
    return yield { method: "__all", generators: requestGenerators };
}

export function executeRequestGenerators<T extends readonly AnyAPIRequestGenerator[]>(
    requestGenerators: T,
    executeRequests: (requests: APIRequest[]) => readonly GeneratorResponse[],
): ExecutedGeneratorsResults<T> {
    const registeredGenerators = new WeakSet<AnyAPIRequestGenerator>();
    let firstGenerator: GeneratorState | undefined;
    let lastGenerator: GeneratorState | undefined;
    const root = startGroup(requestGenerators);
    if (root.failed) throw root.error;
    while (firstGenerator) {
        const requests: APIRequest[] = [];
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
        const roundGenerators: GeneratorState[] = [];
        const responseIndices: (number | readonly number[])[] = [];
        for (let state: GeneratorState | undefined = firstGenerator; state; state = state.next) {
            if (state.request === undefined) continue;
            roundGenerators.push(state);
            responseIndices.push(isRequestGroup(state.request) ? state.request.map(addRequest) : addRequest(state.request));
        }

        const responses = requests.length ? executeRequests(requests) : [];
        for (let index = 0; index < roundGenerators.length; index++) {
            const state = roundGenerators[index];
            if (!state.active) continue;
            const responseIndex = responseIndices[index];
            if (typeof responseIndex === "number") {
                const response = responses[responseIndex];
                advanceGenerator(state, response.result, response.error ? { error: new Error(response.error) } : undefined);
            }
            else {
                advanceGenerator(state, responseIndex.map(index => responses[index]));
            }
        }
    }
    return root.results as ExecutedGeneratorsResults<T>;

    function advanceGenerator(state: GeneratorState, value?: unknown, failure?: { error: unknown; }): void {
        state.request = undefined;
        state.group = undefined;
        while (true) {
            let next: IteratorResult<APIRequestGeneratorYield, unknown>;
            try {
                next = failure ? state.generator.throw(failure.error) : state.generator.next(value);
            }
            catch (error) {
                removeGenerator(state);
                if (!state.parent) throw error;
                failGroup(state.parent, error);
                return;
            }
            value = undefined;
            failure = undefined;
            if (next.done) {
                removeGenerator(state);
                const parent = state.parent;
                if (parent) {
                    if (state.resultIndex !== -1) parent.results[state.resultIndex] = next.value;
                    if (--parent.remaining === 0 && !parent.initializing && parent.parent) {
                        advanceGenerator(parent.parent, parent.results);
                    }
                }
                return;
            }
            const request = next.value;
            if (isRequestGroup(request)) {
                state.request = request;
                return;
            }
            switch (request.method) {
                case "__defer":
                    addGenerator(request.deferred);
                    break;
                case "__all": {
                    const group = startGroup(request.generators, state);
                    if (!group.failed && group.remaining) return;
                    state.group = undefined;
                    value = group.results;
                    failure = group.failed ? { error: group.error } : undefined;
                    break;
                }
                default:
                    state.request = request;
                    return;
            }
        }
    }

    function addGenerator(generator: AnyAPIRequestGenerator, parent?: GeneratorGroup): void {
        if (registeredGenerators.has(generator)) {
            const error = new Error("Cannot execute the same generator instance more than once");
            if (!parent) throw error;
            failGroup(parent, error);
            return;
        }
        registeredGenerators.add(generator);
        const next = parent?.parent;
        const previous = next ? next.previous : lastGenerator;
        const state: GeneratorState = {
            generator,
            parent,
            resultIndex: parent && !isDeferredGenerator(generator) ? parent.results.push(undefined) - 1 : -1,
            previous,
            next,
            active: true,
        };
        if (previous) previous.next = state;
        else firstGenerator = state;
        if (next) next.previous = state;
        else lastGenerator = state;
        parent?.children.push(state);
        advanceGenerator(state);
    }

    function removeGenerator(state: GeneratorState): void {
        if (!state.active) return;
        if (state.previous) state.previous.next = state.next;
        else firstGenerator = state.next;
        if (state.next) state.next.previous = state.previous;
        else lastGenerator = state.previous;
        state.previous = undefined;
        state.next = undefined;
        state.active = false;
    }

    function startGroup(generators: readonly AnyAPIRequestGenerator[], parent?: GeneratorState): GeneratorGroup {
        const group: GeneratorGroup = { parent, children: [], results: [], remaining: generators.length, initializing: true, failed: false };
        if (parent) parent.group = group;
        for (const generator of generators) {
            addGenerator(generator, group);
            if (group.failed) break;
        }
        group.initializing = false;
        return group;
    }

    function failGroup(group: GeneratorGroup, error: unknown): void {
        group.failed = true;
        group.error = error;
        cancelGroup(group);
        if (!group.initializing) {
            if (!group.parent) throw error;
            advanceGenerator(group.parent, undefined, { error });
        }
    }

    function cancelGroup(group: GeneratorGroup): void {
        for (const child of group.children) {
            removeGenerator(child);
            if (child.group) cancelGroup(child.group);
        }
    }
}

function isDeferredGenerator(generator: AnyAPIRequestGenerator): generator is DeferredAPIRequestGenerator {
    return deferredGeneratorMarker in generator;
}

function isRequestGroup(request: APIRequestGeneratorYield): request is readonly APIRequest[] {
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

export function defer(gen: APIRequestGenerator): DeferredAPIRequestGenerator {
    const deferred = (function* (): Generator<DeferredAPIRequest, void, unknown> {
        yield { method: "__defer", deferred: gen };
    })() as DeferredAPIRequestGenerator;
    Object.defineProperty(deferred, deferredGeneratorMarker, { value: true });
    return deferred;
}
