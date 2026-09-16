import {
    API as AsyncAPI,
    type Project as AsyncProject,
} from "@typescript/typescript/unstable/async";
import {
    all,
    API as SyncAPI,
    defer,
    type Project as SyncProject,
} from "@typescript/typescript/unstable/sync";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { Bench } from "tinybench";
import ts from "typescript";
import type { APIRequest } from "../src/api/proto.ts";
import {
    type APIRequestGenerator,
    executeRequestGenerators,
} from "../src/api/sync/generatorSupport.ts";

const requestCount = 128;
const flightCount = 8;
const requestsPerFlight = requestCount / flightCount;

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const { values } = parseArgs({
        options: {
            filter: { type: "string" },
            singleIteration: { type: "boolean", default: false },
        },
    });
    await runBenchmarks(values);
}

export async function runBenchmarks(options?: { filter?: string; singleIteration?: boolean; }) {
    const { filter, singleIteration } = options ?? {};
    const repoRoot = fileURLToPath(new URL("../../../", import.meta.url).toString());
    const fixturePath = fileURLToPath(new URL("../../../tsc/testdata/fixtures/compiler/program.ts", import.meta.url).toString());
    const positions = collectIdentifierPositions(fixturePath, requestCount);
    const bench = new Bench({
        name: "API comparison",
        iterations: 10,
        warmupIterations: 4,
        ...singleIteration ? {
            iterations: 1,
            warmup: false,
            time: 0,
        } : undefined,
    });

    addSyncBenchmarks();
    addAsyncBenchmarks();
    addGeneratorBenchmarks();
    addExecutorBenchmarks();
    addDeferBenchmarks();

    if (filter) {
        const pattern = filter.toLowerCase();
        for (const task of [...bench.tasks]) {
            if (!task.name.toLowerCase().includes(pattern)) {
                bench.remove(task.name);
            }
        }
    }

    await bench.run();
    for (const task of bench.tasks) {
        if (task.result && "error" in task.result) throw task.result.error;
    }
    console.table(bench.table());

    function addSyncBenchmarks() {
        addSyncTask("dependent sequential requests", context => {
            let index = 0;
            for (let request = 0; request < requestCount; request++) {
                const symbol = context.project.checker.getSymbolAtPosition("program.ts", positions[index]);
                index = nextPositionIndex(index, symbol?.flags ?? 0);
            }
        });
        addSyncTask("independent parallel requests", context => {
            for (const position of positions) {
                context.project.checker.getSymbolAtPosition("program.ts", position);
            }
        });
        addSyncTask("multiple flights of independent requests", context => {
            for (let flight = 0; flight < flightCount; flight++) {
                const start = flight * requestsPerFlight;
                for (let request = 0; request < requestsPerFlight; request++) {
                    context.project.checker.getSymbolAtPosition("program.ts", positions[start + request]);
                }
            }
        });
    }

    function addAsyncBenchmarks() {
        addAsyncTask("dependent sequential requests", async context => {
            let index = 0;
            for (let request = 0; request < requestCount; request++) {
                const symbol = await context.project.checker.getSymbolAtPosition("program.ts", positions[index]);
                index = nextPositionIndex(index, symbol?.flags ?? 0);
            }
        });
        addAsyncTask("independent parallel requests", async context => {
            await Promise.all(positions.map(position => context.project.checker.getSymbolAtPosition("program.ts", position)));
        });
        addAsyncTask("multiple flights of independent requests", async context => {
            for (let flight = 0; flight < flightCount; flight++) {
                const start = flight * requestsPerFlight;
                await Promise.all(positions.slice(start, start + requestsPerFlight).map(position => context.project.checker.getSymbolAtPosition("program.ts", position)));
            }
        });
    }

    function addGeneratorBenchmarks() {
        addGeneratorTask("dependent sequential requests", context => {
            context.api.batch(runDependentRequests(context.project));
        });
        addGeneratorTask("independent parallel requests", context => {
            context.api.batch(...positions.map(position => context.project.checker.getSymbolAtPosition.gen("program.ts", position)));
        });
        addGeneratorTask("independent parallel requests (batch defer)", context => {
            context.api.batch(...positions.map(position => defer(context.project.checker.getSymbolAtPosition.gen("program.ts", position))));
        });
        addGeneratorTask("multiple flights of independent requests", context => {
            context.api.batch(...Array.from({ length: requestsPerFlight }, (_, lane) => runRequestLane(context.project, lane)));
        });
        addGeneratorTask("multiple flights of independent requests (batch defer)", context => {
            context.api.batch(...Array.from({ length: requestsPerFlight }, (_, lane) => defer(runRequestLane(context.project, lane))));
        });
        addGeneratorTask("multiple flights of independent requests (yield* defer)", context => {
            context.api.batch(runDeferredRequestLanes(context.project));
        });
        addGeneratorTask("multiple flights of independent requests (repeated all)", context => {
            context.api.batch(runRequestFlights(context.project));
        });
        for (const depth of [1, 4, 16]) {
            addGeneratorTask(`independent parallel requests (all depth ${depth})`, context => {
                context.api.batch(nestAll(positions.map(position => context.project.checker.getSymbolAtPosition.gen("program.ts", position)), depth));
            });
            addGeneratorTask(`multiple flights of independent requests (all depth ${depth})`, context => {
                context.api.batch(nestAll(Array.from({ length: requestsPerFlight }, (_, lane) => runRequestLane(context.project, lane)), depth));
            });
        }
    }

    function nestAll(generators: APIRequestGenerator[], depth: number): APIRequestGenerator {
        let generator = all(...generators);
        for (let level = 1; level < depth; level++) {
            generator = all(generator);
        }
        return generator;
    }

    function addExecutorBenchmarks() {
        for (const rounds of [1, flightCount]) {
            for (const depth of [0, 1, 4, 16]) {
                bench.add(`executor only - ${rounds} flights (${depth ? `all depth ${depth}` : "direct batch"})`, () => run(false), {
                    async: false,
                    beforeAll: () => {
                        run(true);
                    },
                });
                if (depth && rounds > 1) {
                    bench.add(`executor only - ${rounds} flights (repeated all depth ${depth})`, () => run(false, true), {
                        async: false,
                        beforeAll: () => {
                            run(true, true);
                        },
                    });
                }

                function run(verify: boolean, repeatedJoins = false) {
                    const generators = repeatedJoins ? [runFlights()] : Array.from({ length: requestCount / rounds }, (_, lane) => runLane(lane));
                    let executedRequests = 0;
                    let executedRounds = 0;
                    const results = executeRequestGenerators(depth && !repeatedJoins ? [nestAll(generators, depth)] : generators, requests => {
                        executedRequests += requests.length;
                        executedRounds++;
                        return requests.map(request => ({ result: request.params }));
                    });
                    if (verify) {
                        assert.equal(executedRequests, requestCount);
                        assert.equal(executedRounds, rounds);
                        assert.equal(results.flat(Infinity).reduce((sum, value) => sum + value, 0), requestCount * (requestCount - 1) / 2);
                    }
                }

                function* runLane(lane: number): APIRequestGenerator<number> {
                    let sum = 0;
                    for (let flight = 0; flight < rounds; flight++) {
                        sum += yield { method: "benchmark", params: flight * (requestCount / rounds) + lane } as unknown as APIRequest;
                    }
                    return sum;
                }

                function* runFlights(): APIRequestGenerator {
                    const results: unknown[] = [];
                    for (let flight = 0; flight < rounds; flight++) {
                        results.push(yield* nestAll(Array.from({ length: requestCount / rounds }, (_, lane) => runRequest(flight * (requestCount / rounds) + lane)), depth));
                    }
                    return results;
                }

                function* runRequest(index: number): APIRequestGenerator<number> {
                    return yield { method: "benchmark", params: index } as unknown as APIRequest;
                }
            }
        }
    }

    function addDeferBenchmarks() {
        const child = (function* () {
            assert.fail("Lifecycle benchmark must not start the child");
        })();
        for (const helper of [all, defer]) {
            let generators: APIRequestGenerator[] = [];
            bench.add(`helper lifecycle - ${helper.name}`, () => {
                generators = Array.from({ length: requestCount }, () => helper(child));
                for (const generator of generators) {
                    generator.next();
                    generator.next();
                }
            }, {
                async: false,
                afterAll: () => {
                    assert.equal(generators.length, requestCount);
                    for (const generator of generators) assert.deepEqual(generator.next(), { done: true, value: undefined });
                },
            });
        }

        for (const rounds of [1, flightCount]) {
            for (const mode of ["direct", "batch defer", "yield* defer"] as const) {
                bench.add(`executor defer - ${rounds} flights (${mode})`, () => run(false), {
                    async: false,
                    beforeAll: () => {
                        run(true);
                    },
                });

                function run(verify: boolean) {
                    let completed = 0;
                    let checksum = 0;
                    let executedRequests = 0;
                    let executedRounds = 0;
                    const generators = Array.from({ length: requestCount / rounds }, (_, lane) => runLane(lane));
                    const results = executeRequestGenerators(
                        mode === "direct" ? generators : mode === "batch defer" ? generators.map(generator => defer(generator)) : [schedule()],
                        requests => {
                            executedRequests += requests.length;
                            executedRounds++;
                            return requests.map(request => ({ result: request.params }));
                        },
                    );
                    if (verify) {
                        assert.equal(executedRequests, requestCount);
                        assert.equal(executedRounds, rounds);
                        assert.equal(completed, requestCount / rounds);
                        assert.equal(checksum, requestCount * (requestCount - 1) / 2);
                        if (mode === "batch defer") assert.deepEqual(results, []);
                        else if (mode === "yield* defer") assert.deepEqual(results, [undefined]);
                        else {
                            assert.equal(
                                results.reduce<number>((sum, value) => {
                                    assert.ok(typeof value === "number");
                                    return sum + value;
                                }, 0),
                                checksum,
                            );
                        }
                    }

                    function* runLane(lane: number): APIRequestGenerator<number> {
                        let sum = 0;
                        for (let flight = 0; flight < rounds; flight++) {
                            sum += yield { method: "benchmark", params: flight * (requestCount / rounds) + lane } as unknown as APIRequest;
                        }
                        completed++;
                        checksum += sum;
                        return sum;
                    }

                    function* schedule() {
                        for (const generator of generators) yield* defer(generator);
                    }
                }
            }
        }
    }

    function* runDependentRequests(project: SyncProject) {
        let index = 0;
        for (let request = 0; request < requestCount; request++) {
            const symbol = yield* project.checker.getSymbolAtPosition.gen("program.ts", positions[index]);
            index = nextPositionIndex(index, symbol?.flags ?? 0);
        }
    }

    function* runRequestLane(project: SyncProject, lane: number) {
        for (let flight = 0; flight < flightCount; flight++) {
            yield* project.checker.getSymbolAtPosition.gen("program.ts", positions[flight * requestsPerFlight + lane]);
        }
    }

    function* runRequestFlights(project: SyncProject) {
        for (let flight = 0; flight < flightCount; flight++) {
            const start = flight * requestsPerFlight;
            yield* all(...positions.slice(start, start + requestsPerFlight).map(position => project.checker.getSymbolAtPosition.gen("program.ts", position)));
        }
    }

    function* runDeferredRequestLanes(project: SyncProject) {
        for (let lane = 0; lane < requestsPerFlight; lane++) {
            yield* defer(runRequestLane(project, lane));
        }
    }

    function nextPositionIndex(index: number, symbolFlags: number): number {
        return (index + symbolFlags + 1) % positions.length;
    }

    function addSyncTask(name: string, run: (context: SyncContext) => void) {
        let context: SyncContext;
        bench.add(`sync - ${name}`, () => run(context), {
            async: false,
            beforeAll: () => {
                context = createSyncContext();
            },
            afterAll: () => context.api.close(),
        });
    }

    function addAsyncTask(name: string, run: (context: AsyncContext) => Promise<void>) {
        let context: AsyncContext;
        bench.add(`async - ${name}`, () => run(context), {
            async: true,
            beforeAll: async () => {
                context = await createAsyncContext();
            },
            afterAll: async () => context.api.close(),
        });
    }

    function addGeneratorTask(name: string, run: (context: SyncContext) => void) {
        let context: SyncContext;
        bench.add(`generators - ${name}`, () => run(context), {
            async: false,
            beforeAll: () => {
                context = createGeneratorContext();
            },
            afterAll: () => context.api.close(),
        });
    }

    function createSyncContext(): SyncContext {
        const api = new SyncAPI({ cwd: repoRoot });
        const snapshot = api.updateSnapshot({ openProject: "tsc/testdata/fixtures/compiler/tsconfig.json" });
        const project = snapshot.getProjects()[0];
        project.checker.getSymbolAtPosition("core.ts", 0);
        return { api, project };
    }

    async function createAsyncContext(): Promise<AsyncContext> {
        const api = new AsyncAPI({ cwd: repoRoot });
        const snapshot = await api.updateSnapshot({ openProject: "tsc/testdata/fixtures/compiler/tsconfig.json" });
        const project = snapshot.getProjects()[0];
        await project.checker.getSymbolAtPosition("core.ts", 0);
        return { api, project };
    }

    function createGeneratorContext(): SyncContext {
        const api = new SyncAPI({ cwd: repoRoot });
        const [snapshot] = api.batch(api.updateSnapshot.gen({ openProject: "tsc/testdata/fixtures/compiler/tsconfig.json" }));
        const project = snapshot.getProjects()[0];
        api.batch(project.checker.getSymbolAtPosition.gen("core.ts", 0));
        return { api, project };
    }
}

interface SyncContext {
    api: SyncAPI;
    project: SyncProject;
}

interface AsyncContext {
    api: AsyncAPI;
    project: AsyncProject;
}

function collectIdentifierPositions(fileName: string, count: number): number[] {
    const sourceFile = ts.createSourceFile(fileName, readFileSync(fileName, "utf8"), ts.ScriptTarget.Latest, true);
    const positions: number[] = [];
    sourceFile.forEachChild(function visit(node) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            positions.push(node.pos);
        }
        node.forEachChild(visit);
    });
    if (positions.length < count) {
        throw new Error(`Expected at least ${count} identifiers in ${fileName}, found ${positions.length}`);
    }
    return Array.from({ length: count }, (_, index) => positions[Math.floor(index * positions.length / count)]);
}
