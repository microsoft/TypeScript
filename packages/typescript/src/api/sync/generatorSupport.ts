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
const allGeneratorMarker: unique symbol = Symbol();
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
    wrappers?: AllRequestGenerator<unknown>[] | undefined;
    remaining: number;
    initializing: boolean;
    failed: boolean;
    error?: unknown;
}

export function all<const T extends readonly AnyAPIRequestGenerator[]>(
    ...requestGenerators: T
): AllAPIRequestGenerator<ExecutedGeneratorsResults<T>> {
    return new AllRequestGenerator(requestGenerators);
}

/**
 * This single-message iterator avoids native generator setup/resumption overhead.
 * Keeping pending children on the instance also lets the executor collapse nested
 * all helpers without allocating a scheduler group for each wrapper.
 */
class AllRequestGenerator<Return> implements AllAPIRequestGenerator<Return> {
    readonly [allGeneratorMarker] = true;
    generators: readonly AnyAPIRequestGenerator[] | undefined;
    private done = false;

    constructor(generators: readonly AnyAPIRequestGenerator[]) {
        this.generators = generators;
    }

    next(value?: Return): IteratorResult<AllAPIRequest, Return> {
        if (this.generators) {
            const generators = this.generators;
            this.generators = undefined;
            return { done: false, value: { method: "__all", generators } };
        }
        if (this.done) return { done: true, value: undefined as Return };
        this.done = true;
        return { done: true, value: value as Return };
    }

    return(value: Return): IteratorResult<AllAPIRequest, Return> {
        this.generators = undefined;
        this.done = true;
        return { done: true, value };
    }

    throw(error?: unknown): IteratorResult<AllAPIRequest, Return> {
        this.generators = undefined;
        this.done = true;
        throw error;
    }

    [Symbol.iterator](): AllAPIRequestGenerator<Return> {
        return this;
    }

    [Symbol.dispose](): void {
        this.return(undefined as Return);
    }
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
    return getGroupResults(root) as ExecutedGeneratorsResults<T>;

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
                    if (--parent.remaining === 0 && !parent.initializing) {
                        const results = getGroupResults(parent);
                        if (parent.parent) advanceGenerator(parent.parent, results);
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
                    value = group.failed ? undefined : getGroupResults(group);
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
        while (parent && generators.length === 1) {
            const generator = generators[0];
            if (!(allGeneratorMarker in generator)) break;
            const wrapper = generator as AllRequestGenerator<unknown>;
            const pending = wrapper.generators;
            if (!pending) break;
            if (registeredGenerators.has(wrapper)) {
                failGroup(group, new Error("Cannot execute the same generator instance more than once"));
                group.initializing = false;
                return group;
            }
            registeredGenerators.add(wrapper);
            wrapper.next();
            (group.wrappers ??= []).push(wrapper);
            generators = pending;
        }
        group.remaining = generators.length;
        for (const generator of generators) {
            addGenerator(generator, group);
            if (group.failed) break;
        }
        group.initializing = false;
        if (!group.failed && !group.remaining) getGroupResults(group);
        return group;
    }

    function getGroupResults(group: GeneratorGroup): unknown[] {
        let results = group.results;
        if (group.wrappers) {
            for (let index = group.wrappers.length - 1; index >= 0; index--) {
                results = [group.wrappers[index].next(results).value];
            }
            group.results = results;
            group.wrappers = undefined;
        }
        return results;
    }

    function failGroup(group: GeneratorGroup, error: unknown): void {
        group.failed = true;
        group.error = error;
        cancelGroup(group);
        if (group.wrappers) {
            for (let index = group.wrappers.length - 1; index >= 0; index--) {
                try {
                    group.wrappers[index].throw(error);
                }
                catch (failure) {
                    error = failure;
                }
            }
            group.error = error;
        }
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
    return new DeferredRequestGenerator(gen);
}

/**
 * The API comparison benchmarks show this single-message iterator is cheaper than
 * wrapping and branding a native generator, even with a shared generator factory.
 * Shared prototype methods also avoid creating a generator function per defer call.
 */
class DeferredRequestGenerator implements DeferredAPIRequestGenerator {
    readonly [deferredGeneratorMarker] = true;
    private generator: APIRequestGenerator | undefined;

    constructor(generator: APIRequestGenerator) {
        this.generator = generator;
    }

    next(): IteratorResult<DeferredAPIRequest, void> {
        if (this.generator) {
            const generator = this.generator;
            this.generator = undefined;
            return { done: false, value: { method: "__defer", deferred: generator } };
        }
        return { done: true, value: undefined };
    }

    return(value: void): IteratorResult<DeferredAPIRequest, void> {
        this.generator = undefined;
        return { done: true, value };
    }

    throw(error?: unknown): IteratorResult<DeferredAPIRequest, void> {
        this.generator = undefined;
        throw error;
    }

    [Symbol.iterator](): DeferredAPIRequestGenerator {
        return this;
    }

    [Symbol.dispose](): void {
        this.return(undefined);
    }
}
