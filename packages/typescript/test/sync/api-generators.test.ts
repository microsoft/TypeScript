import {
    cast,
    type Identifier,
    isCallExpression,
    isClassDeclaration,
    isEnumDeclaration,
    isExportDeclaration,
    isFunctionDeclaration,
    isIdentifier,
    isImportDeclaration,
    isInterfaceDeclaration,
    isNamedExports,
    isNamedImports,
    isObjectLiteralExpression,
    isShorthandPropertyAssignment,
    isTypeAliasDeclaration,
    isVariableDeclaration,
    isVariableStatement,
    type Node,
    type SourceFile,
    SyntaxKind,
} from "@typescript/typescript/unstable/ast";
import type {
    APIRequest,
    APIResponse,
} from "@typescript/typescript/unstable/proto";
import {
    all,
    type API,
    type ConditionalType,
    type IndexedAccessType,
    type IndexInfo,
    type InterfaceType,
    type LiteralType,
    type NodeHandle,
    type Program,
    type Project,
    type Signature,
    SignatureKind,
    type Snapshot,
    type SubstitutionType,
    type Symbol,
    SymbolFlags,
    type TimingInfo,
    type Type,
    TypeFlags,
    type TypeParameter,
    type TypePredicate,
    type TypeReference,
    type UnionOrIntersectionType,
} from "@typescript/typescript/unstable/sync";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { spawnAPI } from "./api.testUtils.ts";

const parityFiles = {
    "/base.json": JSON.stringify({
        compilerOptions: {
            declaration: true,
            module: "nodenext",
            moduleResolution: "nodenext",
            strict: true,
            target: "esnext",
            exactOptionalPropertyTypes: true,
        },
    }),
    "/tsconfig.json": JSON.stringify({
        extends: "./base.json",
        include: ["src/**/*.ts"],
    }),
    "/src/models.ts": `
export interface Box<T extends Base = Derived> {
    value: T;
    tuple: readonly [T, ...T[]];
    [key: string]: unknown;
    [index: number]: T;
    readonly opt?: true;
}
export class Base { base = true; }
export class Derived extends Base { derived = 1; }
export type Boxed = Box<Derived>;
export type TupleAlias = readonly [string, ...number[]];
export type ArrayAlias = Derived[];
export type Conditional<T extends Base = Derived> = T extends Base ? T : never;
export type Indexed<T extends Box<Derived>> = T["value"];
export type Keys = keyof Box<Derived>;
export type Union = Derived | string;
export enum Choice { First = 1, Second = "second" }
export class Unimported { value = "extra"; }
`,
    "/src/index.ts": `
import { Base, Box, Choice, Derived } from "./models.js";
export { Derived as RenamedDerived } from "./models.js";

/** Combine a first value with the rest. @deprecated parity fixture */
export function combine<T extends Base = Derived>(this: Box<T>, first: T, ...rest: T[]): readonly [T, ...T[]] {
    return [first, ...rest];
}

export const derived = new Derived();
export const box: Box<Derived> = { value: derived, tuple: [derived], derived };
export const shorthand = { derived };
export const called = combine.call(box, derived, derived);
export const semanticIssue: string = 123;
export const choice = Choice.First;
export function isDerived(value: Base): value is Derived { return value instanceof Derived; }
export const badCall = derived();
export function getArguments() { return arguments; }
import { absent } from "./absent.js";
export const missingValue = absent;
`,
    "/src/syntax.ts": `export const broken: = 1;`,
    "/src/bind.ts": `let duplicate = 1; let duplicate = 2;`,
    "/src/suggestions.ts": `export function suggestion() { const unused = 1; return 1; }`,
};

type GeneratorMethod<Args extends readonly unknown[], Result> = ((...args: Args) => Result) & {
    gen(...args: Args): Generator<APIRequest, Result, APIResponse["result"]>;
};

type EquivalenceAssertion<Result> = (actual: Result, expected: Result, message?: string) => void;

interface ParityCase {
    readonly ownerName: string;
    readonly methodName: string;
    readonly runGenerator: () => Generator<APIRequest, void, APIResponse["result"]>;
    readonly assertEquivalent: (message?: string) => void;
}

const exercisedMethods = new Set<string>();
const publicGeneratorExemptions = new Map<string, string>([
    ["API.fromLSPConnection", "requires an existing LSP API session"],
    ["InternalAPI.startCPUProfile", "writes a CPU profile and changes process-global profiling state"],
    ["InternalAPI.stopCPUProfile", "requires a matching active CPU profile"],
    ["InternalAPI.saveHeapProfile", "writes a potentially large heap profile to disk"],
]);
const privateGeneratorGetters = new Set([
    "API.ensureInitialized",
    "Checker.getIntrinsicType",
    "Checker.getWellKnownSignatures",
    "Checker.getWellKnownSymbols",
    "Program.fetchSourceFileMetadata",
    "Symbol.fetchSymbolTable",
    "Type.getNumberIndexTypeWorker",
    "Type.getStringIndexTypeWorker",
]);

function methodKey(ownerName: string, methodName: string): string {
    return `${ownerName}.${methodName}`;
}

function parityCase<Args extends readonly unknown[], Result>(
    ownerName: string,
    methodName: string,
    method: GeneratorMethod<Args, Result>,
    assertEquivalent: EquivalenceAssertion<NoInfer<Result>>,
    ...args: Args
): ParityCase {
    let generatedResult: { readonly value: Result; } | undefined;
    return {
        ownerName,
        methodName,
        runGenerator: function* () {
            generatedResult = { value: yield* method.gen(...args) };
        },
        assertEquivalent: message => {
            assert.ok(generatedResult, `${message ?? methodName}: generator did not complete`);
            assertEquivalent(generatedResult.value, method(...args), message);
        },
    };
}

function selectGeneratorMethod<Args extends readonly unknown[], Result>(
    method: GeneratorMethod<Args, Result>,
): GeneratorMethod<Args, Result> {
    return method;
}

function assertDeepEquivalent<T>(actual: T, expected: T, message?: string): void {
    assert.deepEqual(actual, expected, message);
}

function assertOptionalEquivalent<T>(actual: T | undefined, expected: T | undefined, assertPresentEquivalent: EquivalenceAssertion<T>, message?: string): void {
    if (actual === undefined || expected === undefined) {
        assert.equal(actual, expected, message);
        return;
    }
    assertPresentEquivalent(actual, expected, message);
}

function assertArrayElementsEquivalent<T>(actual: readonly T[], expected: readonly T[], assertElementEquivalent: EquivalenceAssertion<T>, message?: string): void {
    assert.equal(actual.length, expected.length, message);
    for (let index = 0; index < actual.length; index++) {
        assertElementEquivalent(actual[index], expected[index], `${message ?? "value"}[${index}]`);
    }
}

function assertSymbolsEquivalent(actual: Symbol, expected: Symbol, message?: string): void {
    assert.strictEqual(actual, expected, message);
    assert.equal(actual.id, expected.id, message);
    assert.equal(actual.name, expected.name, message);
    assert.equal(actual.flags, expected.flags, message);
}

function assertOptionalSymbolsEquivalent(actual: Symbol | undefined, expected: Symbol | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertSymbolsEquivalent, message);
}

function assertSymbolArraysEquivalent(actual: readonly Symbol[], expected: readonly Symbol[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertSymbolsEquivalent, message);
}

function assertUnorderedSymbolArraysEquivalent(actual: readonly Symbol[], expected: readonly Symbol[], message?: string): void {
    const byIdentity = (left: Symbol, right: Symbol) => left.id - right.id || left.name.localeCompare(right.name);
    const actualSymbols = [...actual].sort(byIdentity);
    const expectedSymbols = [...expected].sort(byIdentity);
    assertArrayElementsEquivalent(actualSymbols, expectedSymbols, assertSymbolsEquivalent, message);
}

function assertOptionalSymbolArraysEquivalent(actual: readonly (Symbol | undefined)[], expected: readonly (Symbol | undefined)[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertOptionalSymbolsEquivalent, message);
}

function assertTypesEquivalent(actual: Type, expected: Type, message?: string): void {
    assert.strictEqual(actual, expected, message);
    assert.equal(actual.id, expected.id, message);
    assert.equal(actual.flags, expected.flags, message);
}

function assertOptionalTypesEquivalent(actual: Type | undefined, expected: Type | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertTypesEquivalent, message);
}

function assertTypeArraysEquivalent(actual: readonly Type[], expected: readonly Type[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertTypesEquivalent, message);
}

function assertOptionalTypeArraysEquivalent(actual: readonly (Type | undefined)[], expected: readonly (Type | undefined)[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertOptionalTypesEquivalent, message);
}

function assertOptionalTypeArrayEquivalent(actual: readonly Type[] | undefined, expected: readonly Type[] | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertTypeArraysEquivalent, message);
}

function assertSignaturesEquivalent(actual: Signature, expected: Signature, message?: string): void {
    assert.strictEqual(actual, expected, message);
    assert.equal(actual.id, expected.id, message);
    assert.equal(actual.hasRestParameter, expected.hasRestParameter, message);
    assert.equal(actual.isConstruct, expected.isConstruct, message);
}

function assertOptionalSignaturesEquivalent(actual: Signature | undefined, expected: Signature | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertSignaturesEquivalent, message);
}

function assertSignatureArraysEquivalent(actual: readonly Signature[], expected: readonly Signature[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertSignaturesEquivalent, message);
}

function assertNodeHandlesEquivalent(actual: NodeHandle, expected: NodeHandle, message?: string): void {
    assert.equal(actual.index, expected.index, message);
    assert.equal(actual.kind, expected.kind, message);
    assert.equal(actual.path, expected.path, message);
}

function assertNodeHandleArraysEquivalent(actual: readonly NodeHandle[], expected: readonly NodeHandle[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertNodeHandlesEquivalent, message);
}

function assertOptionalNodeHandlesEquivalent(actual: NodeHandle | undefined, expected: NodeHandle | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertNodeHandlesEquivalent, message);
}

function assertNodesEquivalent(actual: Node, expected: Node, message?: string): void {
    assert.equal(actual.kind, expected.kind, message);
    assert.equal(actual.pos, expected.pos, message);
    assert.equal(actual.end, expected.end, message);
}

function assertOptionalNodesEquivalent(actual: Node | undefined, expected: Node | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertNodesEquivalent, message);
}

function assertSourceFilesEquivalent(actual: SourceFile, expected: SourceFile, message?: string): void {
    assertNodesEquivalent(actual, expected, message);
    assert.equal(actual.fileName, expected.fileName, message);
    assert.equal(actual.text, expected.text, message);
}

function assertOptionalSourceFilesEquivalent(actual: SourceFile | undefined, expected: SourceFile | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertSourceFilesEquivalent, message);
}

function assertProjectsEquivalent(actual: Project, expected: Project, message?: string): void {
    assert.equal(actual.configFileName, expected.configFileName, message);
    assert.deepEqual(actual.rootFiles, expected.rootFiles, message);
}

function assertOptionalProjectsEquivalent(actual: Project | undefined, expected: Project | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, assertProjectsEquivalent, message);
}

function assertProgramsEquivalent(actual: Program, expected: Program, message?: string): void {
    assertProjectsEquivalent(actual.getProject(), expected.getProject(), message);
}

function assertSnapshotsEquivalent(actual: Snapshot, expected: Snapshot, message?: string): void {
    const actualProjects = actual.getProjects();
    const expectedProjects = expected.getProjects();
    assertArrayElementsEquivalent(actualProjects, expectedProjects, assertProjectsEquivalent, message);
}

function assertSymbolMapsEquivalent(actual: ReadonlyMap<string, Symbol>, expected: ReadonlyMap<string, Symbol>, message?: string): void {
    assert.deepEqual([...actual.keys()], [...expected.keys()], message);
    for (const key of actual.keys()) {
        assertOptionalSymbolsEquivalent(actual.get(key), expected.get(key), `${message ?? "symbol map"}[${key}]`);
    }
}

function assertIndexInfosEquivalent(actual: readonly IndexInfo[], expected: readonly IndexInfo[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, (actualInfo, expectedInfo, elementMessage) => {
        assertTypesEquivalent(actualInfo.keyType, expectedInfo.keyType, elementMessage);
        assertTypesEquivalent(actualInfo.valueType, expectedInfo.valueType, elementMessage);
        assert.equal(actualInfo.isReadonly, expectedInfo.isReadonly, elementMessage);
        assertOptionalNodeHandlesEquivalent(actualInfo.declaration, expectedInfo.declaration, elementMessage);
    }, message);
}

function assertOptionalTypePredicatesEquivalent(actual: TypePredicate | undefined, expected: TypePredicate | undefined, message?: string): void {
    assertOptionalEquivalent(actual, expected, (actualPredicate, expectedPredicate, predicateMessage) => {
        assert.equal(actualPredicate.kind, expectedPredicate.kind, predicateMessage);
        assert.equal(actualPredicate.parameterName, expectedPredicate.parameterName, predicateMessage);
        assert.equal(actualPredicate.parameterIndex, expectedPredicate.parameterIndex, predicateMessage);
        assertOptionalTypesEquivalent(actualPredicate.type, expectedPredicate.type, predicateMessage);
    }, message);
}

function assertDeepArraysEquivalent<T>(actual: readonly T[], expected: readonly T[], message?: string): void {
    assertArrayElementsEquivalent(actual, expected, assertDeepEquivalent, message);
}

function assertTimingInfoEquivalent(actual: TimingInfo, expected: TimingInfo, message?: string): void {
    assert.equal(actual.enabled, expected.enabled, message);
    assert.equal(actual.totals.requestCount, expected.totals.requestCount, message);
    assert.equal(actual.totals.bytesSent, expected.totals.bytesSent, message);
    assert.equal(actual.totals.bytesReceived, expected.totals.bytesReceived, message);
    assert.deepEqual(actual.recentRequests.map(request => request.method), expected.recentRequests.map(request => request.method), message);
}

function runParityBatch(api: API, cases: readonly ParityCase[]): void {
    api.batch(...cases.map(parity => parity.runGenerator()));

    for (const { assertEquivalent, methodName, ownerName } of cases) {
        assertEquivalent(methodKey(ownerName, methodName));
        exercisedMethods.add(methodKey(ownerName, methodName));
    }
}

function* observeRequestBatches<Result>(
    requestGenerator: Generator<APIRequest | readonly APIRequest[], Result, any>,
    requestBatches: string[][],
): Generator<APIRequest | readonly APIRequest[], Result, any> {
    let state = requestGenerator.next();
    while (!state.done) {
        const request = state.value;
        const requests = Array.isArray(request) ? request : [request as APIRequest];
        requestBatches.push(requests.map(current => current.method));
        state = requestGenerator.next(yield request);
    }
    return state.value;
}

function assertPublicGeneratorCoverage(owners: readonly { readonly name: string; readonly value: object; readonly own?: boolean; }[]): void {
    const missing: string[] = [];
    for (const { name, own, value } of owners) {
        const descriptorOwner = own ? value : Object.getPrototypeOf(value) as object;
        for (const [methodName, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(descriptorOwner))) {
            if (!descriptor.get) continue;
            const key = methodKey(name, methodName);
            const result: { gen?: unknown; } | undefined = descriptor.get.call(value);
            if (typeof result?.gen !== "function") continue;
            if (!exercisedMethods.has(key) && !publicGeneratorExemptions.has(key) && !privateGeneratorGetters.has(key)) {
                missing.push(key);
            }
        }
    }
    assert.deepEqual(missing, [], `Uncovered public generator getters: ${missing.join(", ")}`);
}

describe("API - generator batching", () => {
    test("composes request generators with all", () => {
        const api = spawnAPI(parityFiles);
        const requestBatches: string[][] = [];
        function* getStrictOption() {
            const commandLine = yield* api.parseCommandLine.gen(["--strict"]);
            const config = yield* api.readConfigFile.gen("/tsconfig.json");
            const parsed = yield* api.parseJsonConfigFileContent.gen(config.config, { configFileName: "/tsconfig.json" });
            return { strict: commandLine.options.strict, fileNames: parsed.fileNames };
        }
        function* getTranspiledText() {
            const config = yield* api.readConfigFile.gen("/tsconfig.json");
            const parsed = yield* api.parseJsonConfigFileContent.gen(config.config, { configFileName: "/tsconfig.json" });
            const output = yield* api.transpileModule.gen("const value: string = 'ok';", { compilerOptions: parsed.options });
            return output.outputText;
        }

        try {
            const [[config, outputText]] = api.batch(observeRequestBatches(all(getStrictOption(), getTranspiledText()), requestBatches));
            assert.equal(config.strict, true);
            assert.deepEqual([...config.fileNames].sort(), ["/src/bind.ts", "/src/index.ts", "/src/models.ts", "/src/suggestions.ts", "/src/syntax.ts"]);
            assert.match(outputText, /const value = ['"]ok['"]/);
            assert.deepEqual(requestBatches, [
                ["initialize"],
                ["parseCommandLine", "readConfigFile"],
                ["readConfigFile", "parseJsonConfigFileContent"],
                ["parseJsonConfigFileContent", "transpileModule"],
            ]);
        }
        finally {
            api.close();
        }
    });

    test("throws request errors into generators", () => {
        const api = spawnAPI();
        const events: string[] = [];
        function* requestWithCleanup(): Generator<APIRequest, string, APIResponse["result"]> {
            try {
                yield { method: "unknown", params: null } as unknown as APIRequest;
                return "unexpected";
            }
            catch {
                events.push("caught");
                return "recovered";
            }
            finally {
                events.push("finally");
            }
        }

        try {
            assert.deepEqual(api.batch(requestWithCleanup()), ["recovered"]);
            assert.deepEqual(events, ["caught", "finally"]);
        }
        finally {
            api.close();
        }
    });

    test("lazily caches generator-enabled methods", () => {
        const api = spawnAPI();
        const prototype = Object.getPrototypeOf(api);
        try {
            assert.equal(Object.hasOwn(api, "parseCommandLine"), false);
            assert.equal(typeof Object.getOwnPropertyDescriptor(prototype, "parseCommandLine")?.get, "function");

            const method = api.parseCommandLine;
            assert.strictEqual(api.parseCommandLine, method);
            assert.equal(Object.hasOwn(api, "parseCommandLine"), true);
            assert.equal(Object.keys(api).includes("parseCommandLine"), false);
            assert.equal(typeof method.gen, "function");
        }
        finally {
            api.close();
        }
    });

    test("advances generators through multiple request rounds", () => {
        const api = spawnAPI();
        try {
            const [commandLine, config] = api.batch(
                api.parseCommandLine.gen(["--strict"]),
                api.readConfigFile.gen("/tsconfig.json"),
            );

            assert.equal(commandLine.options.strict, true);
            assert.deepEqual(config.config, {});
        }
        finally {
            api.batch(api.close.gen());
            api.close();
        }
    });

    test("transparently paginates batch responses", () => {
        const api = spawnAPI(undefined, { maxResponseBytesPerPage: 1 });
        try {
            const [strict, config, noImplicitAny] = api.batch(
                api.parseCommandLine.gen(["--strict"]),
                api.readConfigFile.gen("/tsconfig.json"),
                api.parseCommandLine.gen(["--noImplicitAny"]),
            );

            assert.equal(strict.options.strict, true);
            assert.deepEqual(config.config, {});
            assert.equal(noImplicitAny.options.noImplicitAny, true);
        }
        finally {
            api.close();
        }
    });

    test("all deduplicates only initialize requests within a batch round", () => {
        const api = spawnAPI();
        const requestBatches: string[][] = [];

        try {
            const [[firstCommandLine, secondCommandLine, config]] = api.batch(observeRequestBatches(
                all(
                    api.parseCommandLine.gen(["--strict"]),
                    api.parseCommandLine.gen(["--strict"]),
                    api.readConfigFile.gen("/tsconfig.json"),
                ),
                requestBatches,
            ));

            assert.deepEqual(requestBatches, [
                ["initialize"],
                ["parseCommandLine", "parseCommandLine", "readConfigFile"],
            ]);
            assert.equal(firstCommandLine.options.strict, true);
            assert.equal(secondCommandLine.options.strict, true);
            assert.deepEqual(config.config, {});
        }
        finally {
            api.close();
        }
    });

    test("yields source file metadata requests on cache misses", () => {
        const api = spawnAPI();
        try {
            using snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
            const program = snapshot.getProject("/tsconfig.json")!.program;
            const sourceFile = program.getSourceFile("/src/index.ts")!;
            const state = program.getSourceFileMetadataByPath.gen(sourceFile.path).next();

            if (state.done) assert.fail("Expected getSourceFileMetadataByPath.gen() to yield a request");
            assert.equal(state.value.method, "getSourceFileMetadata");
        }
        finally {
            api.close();
        }
    });

    test("uses generators attached to sync API methods", () => {
        const api = spawnAPI();
        try {
            using snapshot = api.batch(api.updateSnapshot.gen({ openProject: "/tsconfig.json" }))[0];
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);
            const node = cast(
                cast(sourceFile.statements[0], isImportDeclaration).importClause?.namedBindings,
                isNamedImports,
            ).elements[0].name;

            const [defaultProject, sourceFileNames] = api.batch(
                snapshot.getDefaultProjectForFile.gen("/src/index.ts"),
                project.program.getSourceFileNames.gen(),
            );
            assert.strictEqual(defaultProject, project);
            assert.ok(sourceFileNames.includes("/src/foo.ts"));
            assert.ok(sourceFileNames.includes("/src/index.ts"));

            const [symbol, type] = api.batch(
                project.checker.getSymbolAtLocation.gen(node),
                project.checker.getTypeAtLocation.gen(node),
            );
            const syncSymbol = project.checker.getSymbolAtLocation(node);
            const syncType = project.checker.getTypeAtLocation(node);

            assert.ok(symbol);
            assert.ok(syncSymbol);
            assert.equal(symbol.name, "foo");
            assert.strictEqual(symbol, syncSymbol);
            assert.strictEqual(type, syncType);
            assert.ok(symbol.flags & SymbolFlags.Alias);
            assert.ok(type.flags & TypeFlags.NumberLiteral);
            assert.equal(Object.hasOwn(syncType, "getProperties"), false);
            assert.equal(typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(syncType), "getProperties")?.get, "function");

            const [parent, properties] = api.batch(
                syncSymbol.getParent.gen(),
                syncType.getProperties.gen(),
            );
            assert.equal(parent, undefined);
            assert.ok(properties.some(property => property.name === "toString"));
            assert.equal(Object.hasOwn(syncType, "getProperties"), true);
            assert.equal(Object.keys(syncType).includes("getProperties"), false);
        }
        finally {
            api.batch(api.close.gen());
            api.close();
        }
    });

    test("keeps every publicly reachable generator-backed method in sync", () => {
        const api = spawnAPI(parityFiles);
        try {
            using snapshot = api.batch(api.updateSnapshot.gen({ openProject: "/tsconfig.json" }))[0];
            const project = snapshot.getProject("/tsconfig.json")!;
            const { checker, emitter, languageService, program } = project;
            const indexFile = program.getSourceFile("/src/index.ts")!;
            const modelsFile = program.getSourceFile("/src/models.ts")!;

            const importDeclaration = cast(indexFile.statements[0], isImportDeclaration);
            const importedNames = cast(importDeclaration.importClause?.namedBindings, isNamedImports);
            const importedDerived = importedNames.elements.find(element => element.name.text === "Derived")!.name;
            const exportDeclaration = cast(indexFile.statements[1], isExportDeclaration);
            const exportSpecifier = cast(exportDeclaration.exportClause, isNamedExports).elements[0];
            const combineDeclaration = cast(indexFile.statements[2], isFunctionDeclaration);
            const derivedDeclaration = cast(
                cast(indexFile.statements[3], isVariableStatement).declarationList.declarations[0],
                isVariableDeclaration,
            );
            const boxDeclaration = cast(
                cast(indexFile.statements[4], isVariableStatement).declarationList.declarations[0],
                isVariableDeclaration,
            );
            const shorthandDeclaration = cast(
                cast(indexFile.statements[5], isVariableStatement).declarationList.declarations[0],
                isVariableDeclaration,
            );
            const shorthand = cast(
                cast(shorthandDeclaration.initializer, isObjectLiteralExpression).properties[0],
                isShorthandPropertyAssignment,
            );
            const calledDeclaration = cast(
                cast(indexFile.statements[6], isVariableStatement).declarationList.declarations[0],
                isVariableDeclaration,
            );
            const callExpression = cast(calledDeclaration.initializer, isCallExpression);
            const interfaceDeclaration = cast(modelsFile.statements[0], isInterfaceDeclaration);
            const derivedClassDeclaration = cast(modelsFile.statements[2], isClassDeclaration);
            const boxedAlias = cast(modelsFile.statements[3], isTypeAliasDeclaration);
            const tupleAlias = cast(modelsFile.statements[4], isTypeAliasDeclaration);
            const arrayAlias = cast(modelsFile.statements[5], isTypeAliasDeclaration);
            const conditionalAlias = cast(modelsFile.statements[6], isTypeAliasDeclaration);
            const indexedAlias = cast(modelsFile.statements[7], isTypeAliasDeclaration);
            const indexAlias = cast(modelsFile.statements[8], isTypeAliasDeclaration);
            const unionAlias = cast(modelsFile.statements[9], isTypeAliasDeclaration);
            const enumDeclaration = cast(modelsFile.statements[10], isEnumDeclaration);

            const importedDerivedSymbol = checker.getSymbolAtLocation(importedDerived)!;
            const combineSymbol = checker.getSymbolAtLocation(combineDeclaration.name!)!;
            const derivedSymbol = checker.getSymbolAtLocation(cast(derivedDeclaration.name, isIdentifier))!;
            const interfaceSymbol = checker.getSymbolAtLocation(interfaceDeclaration.name)!;
            const derivedClassSymbol = checker.getSymbolAtLocation(derivedClassDeclaration.name!)!;
            const moduleSymbol = checker.getSymbolOfSourceFile("/src/models.ts")!;
            const unimportedSymbol = checker.getMemberInModuleExports(moduleSymbol, "Unimported")!;
            const interfaceType = checker.getDeclaredTypeOfSymbol(interfaceSymbol) as InterfaceType;
            const derivedType = checker.getDeclaredTypeOfSymbol(derivedClassSymbol) as InterfaceType;
            const derivedConstructorType = checker.getTypeOfSymbol(derivedClassSymbol);
            const boxedType = checker.getTypeFromTypeNode(boxedAlias.type) as TypeReference;
            const boxedOptSymbol = checker.getPropertyOfType(boxedType, "opt");
            assert.ok(boxedOptSymbol);
            const tupleType = checker.getTypeFromTypeNode(tupleAlias.type);
            const arrayType = checker.getTypeFromTypeNode(arrayAlias.type);
            const conditionalType = checker.getTypeFromTypeNode(conditionalAlias.type) as ConditionalType;
            const indexedType = checker.getTypeFromTypeNode(indexedAlias.type) as IndexedAccessType;
            checker.getTypeFromTypeNode(indexAlias.type);
            const unionType = checker.getTypeFromTypeNode(unionAlias.type);
            const typeParameter = checker.getTypeAtLocation(combineDeclaration.typeParameters![0].name) as TypeParameter;
            const literalType = checker.getTypeAtLocation(enumDeclaration.members[0].name) as LiteralType;
            const substitutionType = conditionalType.getTrueType() as SubstitutionType;
            const signature = checker.getSignatureFromDeclaration(combineDeclaration);
            const predicateDeclaration = indexFile.statements.find(statement => isFunctionDeclaration(statement) && statement.name?.text === "isDerived")!;
            const predicateSignature = checker.getSignatureFromDeclaration(predicateDeclaration);
            const badCallDeclaration = indexFile.statements
                .filter(isVariableStatement)
                .flatMap(statement => [...statement.declarationList.declarations])
                .find(declaration => isIdentifier(declaration.name) && declaration.name.text === "badCall")!;
            const unknownSignature = checker.getResolvedSignature(cast(badCallDeclaration.initializer, isCallExpression));
            let argumentsIdentifier: Identifier | undefined;
            let absentIdentifier: Identifier | undefined;
            indexFile.forEachChild(function visit(node) {
                if (isIdentifier(node)) {
                    if (node.text === "arguments") argumentsIdentifier = node;
                    if (node.text === "absent" && !absentIdentifier) absentIdentifier = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(argumentsIdentifier);
            assert.ok(absentIdentifier);
            const absentAlias = checker.getSymbolAtLocation(absentIdentifier);
            assert.ok(absentAlias);
            const unknownSymbol = checker.getAliasedSymbol(absentAlias);
            const undefinedSymbol = checker.resolveName("undefined", SymbolFlags.Value, absentIdentifier);
            const argumentsSymbol = checker.getResolvedSymbol(argumentsIdentifier);
            assert.ok(unknownSymbol);
            assert.ok(undefinedSymbol);
            assert.ok(argumentsSymbol);
            const constructSignature = derivedConstructorType.getConstructSignatures()[0];
            const derivedMemberSymbol = derivedType.getProperty("derived")!;
            const nodeHandle = combineSymbol.valueDeclaration ?? combineSymbol.declarations[0];
            const completionPosition = parityFiles["/src/index.ts"].indexOf("semanticIssue");
            const temporaryProjects: string[] = [];

            const orderedArguments = Array.from({ length: 128 }, (_, index) => ["--strict", `--outDir=out-${index}`] as const);
            const orderedGenerated = api.batch(...orderedArguments.map(args => api.parseCommandLine.gen(args)));
            const orderedSync = orderedArguments.map(args => api.parseCommandLine(args));
            assertDeepArraysEquivalent(orderedGenerated, orderedSync, "large parseCommandLine batch");
            exercisedMethods.add("API.parseCommandLine");

            const timingGeneratorAPI = spawnAPI(parityFiles, { collectTiming: true });
            const timingSyncAPI = spawnAPI(parityFiles, { collectTiming: true });
            timingGeneratorAPI.parseCommandLine(["--strict"]);
            timingSyncAPI.parseCommandLine(["--strict"]);
            assertTimingInfoEquivalent(
                timingGeneratorAPI.batch(timingGeneratorAPI.getTimingInfo.gen())[0],
                timingSyncAPI.getTimingInfo(),
                "API.getTimingInfo",
            );
            timingGeneratorAPI.batch(timingGeneratorAPI.resetTimingInfo.gen());
            timingSyncAPI.resetTimingInfo();
            assertTimingInfoEquivalent(timingGeneratorAPI.getTimingInfo(), timingSyncAPI.getTimingInfo(), "API.resetTimingInfo");
            exercisedMethods.add("API.getTimingInfo");
            exercisedMethods.add("API.resetTimingInfo");
            timingGeneratorAPI.close();
            timingSyncAPI.close();

            assert.ok(project.getImportAdderEdits("/src/index.ts", [{ kind: "importSymbol", symbol: unimportedSymbol }]).length > 0);
            assert.ok(program.getSyntacticDiagnostics("/src/syntax.ts").length > 0);
            assert.ok(program.getBindDiagnostics("/src/bind.ts").length > 0);
            assert.ok(program.getSuggestionDiagnostics("/src/suggestions.ts").length > 0);
            assert.strictEqual(derivedMemberSymbol.getParent(), derivedClassSymbol);
            assert.ok(checker.getTypePredicateOfSignature(predicateSignature));
            assert.equal(checker.isUnknownSymbol(unknownSymbol), true);
            assert.equal(checker.isUndefinedSymbol(undefinedSymbol), true);
            assert.equal(checker.isArgumentsSymbol(argumentsSymbol), true);
            assert.equal(checker.isUnknownSignature(unknownSignature), true);

            const cases: ParityCase[] = [
                parityCase("API", "parseConfigFile", api.parseConfigFile, assertDeepEquivalent, "/tsconfig.json"),
                parityCase("API", "parseCommandLine", api.parseCommandLine, assertDeepEquivalent, ["--strict", "--noEmit"]),
                parityCase("API", "readConfigFile", api.readConfigFile, assertDeepEquivalent, "/tsconfig.json"),
                parityCase("API", "parseJsonConfigFileContent", api.parseJsonConfigFileContent, assertDeepEquivalent, { compilerOptions: { strict: true } }, { configDirectory: "/" }),
                parityCase("API", "parseJsonConfigFileContent", api.parseJsonConfigFileContent, assertDeepEquivalent, { extends: "./base.json" }, { configFileName: "/tsconfig.json" }),
                parityCase("API", "transpileModule", api.transpileModule, assertDeepEquivalent, "export const value: number = 1;", { compilerOptions: { module: 99 } }),
                parityCase("API", "transpileModuleFromFile", api.transpileModuleFromFile, assertDeepEquivalent, "/src/index.ts"),
                parityCase("API", "transpileDeclaration", api.transpileDeclaration, assertDeepEquivalent, "export function declared(value: string): number { return value.length; }"),
                parityCase("API", "transpileDeclarationFromFile", api.transpileDeclarationFromFile, assertDeepEquivalent, "/src/index.ts"),
                parityCase("API", "updateSnapshot", api.updateSnapshot, assertSnapshotsEquivalent, { openProject: "/tsconfig.json" }),
                parityCase("API", "createProgram", api.createProgram, assertProgramsEquivalent, ["/src/index.ts"], { compilerOptions: { noLib: true } }),
                parityCase("API", "runWithTemporaryFileUpdate", api.runWithTemporaryFileUpdate, assertDeepEquivalent, snapshot, "/src/index.ts", parityFiles["/src/index.ts"].replace("123", '"fixed"'), (temporarySnapshot: Snapshot) => {
                    temporaryProjects.push(temporarySnapshot.getProjects()[0].configFileName);
                }),
                parityCase("Snapshot", "getDefaultProjectForFile", snapshot.getDefaultProjectForFile, assertOptionalProjectsEquivalent, "/src/index.ts"),

                parityCase("Project", "getImportAdderEdits", project.getImportAdderEdits, assertDeepEquivalent, "/src/index.ts", [{ kind: "importSymbol", symbol: unimportedSymbol }]),
                parityCase("Project", "getImportEditsForSymbols", project.getImportEditsForSymbols, assertDeepEquivalent, "/src/index.ts", [unimportedSymbol]),

                parityCase("LanguageService", "getImportAdderEdits", languageService.getImportAdderEdits, assertDeepEquivalent, "/src/index.ts", [{ kind: "importSymbol", symbol: unimportedSymbol }]),
                parityCase("LanguageService", "getImportEditsForSymbols", languageService.getImportEditsForSymbols, assertDeepEquivalent, "/src/index.ts", [unimportedSymbol], { isValidTypeOnlyUseSite: true }),
                parityCase("LanguageService", "getReferencedSymbolsForNode", languageService.getReferencedSymbolsForNode, assertDeepEquivalent, combineDeclaration.name!, combineDeclaration.name!.end),
                parityCase("LanguageService", "getSignatureUsage", languageService.getSignatureUsage, assertDeepEquivalent, combineDeclaration),
                parityCase("LanguageService", "getCompletionsAtPosition", languageService.getCompletionsAtPosition, assertDeepEquivalent, "/src/index.ts", completionPosition, { includeSymbol: true }),

                parityCase("Program", "getSourceFile", program.getSourceFile, assertOptionalSourceFilesEquivalent, "/src/index.ts"),
                parityCase("Program", "getSourceFileNames", program.getSourceFileNames, assertDeepEquivalent),
                parityCase("Program", "getSourceFileMetadata", program.getSourceFileMetadata, assertDeepEquivalent, "/src/index.ts"),
                parityCase("Program", "getSourceFileMetadataByPath", program.getSourceFileMetadataByPath, assertDeepEquivalent, indexFile.path),
                parityCase("Program", "isSourceFileFromExternalLibrary", program.isSourceFileFromExternalLibrary, assertDeepEquivalent, indexFile),
                parityCase("Program", "isSourceFileDefaultLibrary", program.isSourceFileDefaultLibrary, assertDeepEquivalent, indexFile),
                parityCase("Program", "getConfigFileNames", program.getConfigFileNames, assertDeepEquivalent),
                parityCase("Program", "getConfigSourceFile", program.getConfigSourceFile, assertOptionalSourceFilesEquivalent, "/base.json"),
                parityCase("Program", "getSyntacticDiagnostics", program.getSyntacticDiagnostics, assertDeepEquivalent),
                parityCase("Program", "getSyntacticDiagnostics", program.getSyntacticDiagnostics, assertDeepEquivalent, "/src/syntax.ts"),
                parityCase("Program", "getSyntacticDiagnostics", program.getSyntacticDiagnostics, assertDeepEquivalent, ["/src/syntax.ts", "/src/index.ts"]),
                parityCase("Program", "getBindDiagnostics", program.getBindDiagnostics, assertDeepEquivalent, "/src/bind.ts"),
                parityCase("Program", "getSemanticDiagnostics", program.getSemanticDiagnostics, assertDeepEquivalent),
                parityCase("Program", "getSemanticDiagnostics", program.getSemanticDiagnostics, assertDeepEquivalent, "/src/index.ts"),
                parityCase("Program", "getSemanticDiagnostics", program.getSemanticDiagnostics, assertDeepEquivalent, ["/src/index.ts", "/src/models.ts"]),
                parityCase("Program", "getSuggestionDiagnostics", program.getSuggestionDiagnostics, assertDeepEquivalent, "/src/suggestions.ts"),
                parityCase("Program", "getDeclarationDiagnostics", program.getDeclarationDiagnostics, assertDeepEquivalent, "/src/index.ts"),
                parityCase("Program", "getProgramDiagnostics", program.getProgramDiagnostics, assertDeepEquivalent),
                parityCase("Program", "getGlobalDiagnostics", program.getGlobalDiagnostics, assertDeepEquivalent),
                parityCase("Program", "getConfigFileParsingDiagnostics", program.getConfigFileParsingDiagnostics, assertDeepEquivalent),
                parityCase("Program", "emit", program.emit, assertDeepEquivalent),
                parityCase("Program", "emitToString", program.emitToString, assertDeepEquivalent),
                parityCase("Program", "getJavaScriptEmit", program.getJavaScriptEmit, assertDeepEquivalent, ["/src/index.ts"]),
                parityCase("Program", "getDeclarationEmit", program.getDeclarationEmit, assertDeepEquivalent, ["/src/index.ts"]),

                parityCase("Checker", "getSymbolAtLocation", selectGeneratorMethod<[node: Node], Symbol | undefined>(checker.getSymbolAtLocation), assertOptionalSymbolsEquivalent, importedDerived),
                parityCase("Checker", "getSymbolAtLocation", checker.getSymbolAtLocation, assertOptionalSymbolArraysEquivalent, [importedDerived, combineDeclaration.name!]),
                parityCase("Checker", "getSymbolAtPosition", selectGeneratorMethod<[file: string, position: number], Symbol | undefined>(checker.getSymbolAtPosition), assertOptionalSymbolsEquivalent, "/src/index.ts", importedDerived.pos),
                parityCase("Checker", "getSymbolAtPosition", checker.getSymbolAtPosition, assertOptionalSymbolArraysEquivalent, "/src/index.ts", [importedDerived.pos, combineDeclaration.name!.pos]),
                parityCase("Checker", "getSymbolOfSourceFile", selectGeneratorMethod<[file: string], Symbol | undefined>(checker.getSymbolOfSourceFile), assertOptionalSymbolsEquivalent, "/src/models.ts"),
                parityCase("Checker", "getSymbolOfSourceFile", checker.getSymbolOfSourceFile, assertOptionalSymbolArraysEquivalent, ["/src/index.ts", "/src/models.ts"]),
                parityCase("Checker", "getTypeOfSymbol", selectGeneratorMethod<[symbol: Symbol], Type>(checker.getTypeOfSymbol), assertTypesEquivalent, derivedClassSymbol),
                parityCase("Checker", "getTypeOfSymbol", checker.getTypeOfSymbol, assertTypeArraysEquivalent, [derivedClassSymbol, combineSymbol]),
                parityCase("Checker", "getDeclaredTypeOfSymbol", checker.getDeclaredTypeOfSymbol, assertTypesEquivalent, interfaceSymbol),
                parityCase("Checker", "getReferencesToSymbolInFile", checker.getReferencesToSymbolInFile, assertNodeHandleArraysEquivalent, "/src/index.ts", derivedSymbol),
                parityCase("Checker", "getReferencedSymbolsForNode", checker.getReferencedSymbolsForNode, assertDeepEquivalent, combineDeclaration.name!, combineDeclaration.name!.end),
                parityCase("Checker", "getSignatureUsage", checker.getSignatureUsage, assertDeepEquivalent, combineDeclaration),
                parityCase("Checker", "getCompletionsAtPosition", checker.getCompletionsAtPosition, assertDeepEquivalent, "/src/index.ts", completionPosition, { includeSymbol: true }),
                parityCase("Checker", "getTypeAtLocation", selectGeneratorMethod<[node: Node], Type>(checker.getTypeAtLocation), assertTypesEquivalent, boxDeclaration.name),
                parityCase("Checker", "getTypeAtLocation", checker.getTypeAtLocation, assertTypeArraysEquivalent, [boxDeclaration.name, combineDeclaration.name!]),
                parityCase("Checker", "getSignaturesOfType", checker.getSignaturesOfType, assertSignatureArraysEquivalent, checker.getTypeAtLocation(combineDeclaration.name!), SignatureKind.Call),
                parityCase("Checker", "getResolvedSignature", checker.getResolvedSignature, assertOptionalSignaturesEquivalent, callExpression),
                parityCase("Checker", "getTypeAtPosition", selectGeneratorMethod<[file: string, position: number], Type | undefined>(checker.getTypeAtPosition), assertOptionalTypesEquivalent, "/src/index.ts", boxDeclaration.name.pos),
                parityCase("Checker", "getTypeAtPosition", checker.getTypeAtPosition, assertOptionalTypeArraysEquivalent, "/src/index.ts", [boxDeclaration.name.pos, calledDeclaration.name.pos]),
                parityCase("Checker", "resolveName", checker.resolveName, assertOptionalSymbolsEquivalent, "Derived", SymbolFlags.Type | SymbolFlags.Value, importedDerived),
                parityCase("Checker", "resolveName", checker.resolveName, assertOptionalSymbolsEquivalent, "Derived", SymbolFlags.Type | SymbolFlags.Value, { document: "/src/index.ts", position: importedDerived.pos }),
                parityCase("Checker", "getSymbolsInScope", checker.getSymbolsInScope, assertUnorderedSymbolArraysEquivalent, combineDeclaration, SymbolFlags.Value | SymbolFlags.Type),
                parityCase("Checker", "getSymbolsInScope", checker.getSymbolsInScope, assertUnorderedSymbolArraysEquivalent, { document: "/src/index.ts", position: combineDeclaration.pos }, SymbolFlags.Value),
                parityCase("Checker", "getResolvedSymbol", checker.getResolvedSymbol, assertOptionalSymbolsEquivalent, importedDerived),
                parityCase("Checker", "getContextualType", checker.getContextualType, assertOptionalTypesEquivalent, boxDeclaration.initializer!),
                parityCase("Checker", "getBaseTypeOfLiteralType", checker.getBaseTypeOfLiteralType, assertTypesEquivalent, literalType),
                parityCase("Checker", "getNonNullableType", checker.getNonNullableType, assertTypesEquivalent, interfaceType),
                parityCase("Checker", "getTypeFromTypeNode", checker.getTypeFromTypeNode, assertTypesEquivalent, boxedAlias.type),
                parityCase("Checker", "getWidenedType", checker.getWidenedType, assertTypesEquivalent, literalType),
                parityCase("Checker", "getParameterType", checker.getParameterType, assertTypesEquivalent, signature, 0),
                parityCase("Checker", "isArrayLikeType", checker.isArrayLikeType, assertDeepEquivalent, arrayType),
                parityCase("Checker", "isTypeAssignableTo", checker.isTypeAssignableTo, assertDeepEquivalent, derivedType, interfaceType),
                parityCase("Checker", "getShorthandAssignmentValueSymbol", checker.getShorthandAssignmentValueSymbol, assertOptionalSymbolsEquivalent, shorthand),
                parityCase("Checker", "getTypeOfSymbolAtLocation", checker.getTypeOfSymbolAtLocation, assertTypesEquivalent, derivedSymbol, shorthand),
                parityCase("Checker", "getAnyType", checker.getAnyType, assertTypesEquivalent),
                parityCase("Checker", "getStringType", checker.getStringType, assertTypesEquivalent),
                parityCase("Checker", "getNumberType", checker.getNumberType, assertTypesEquivalent),
                parityCase("Checker", "getBooleanType", checker.getBooleanType, assertTypesEquivalent),
                parityCase("Checker", "getVoidType", checker.getVoidType, assertTypesEquivalent),
                parityCase("Checker", "getUndefinedType", checker.getUndefinedType, assertTypesEquivalent),
                parityCase("Checker", "getNullType", checker.getNullType, assertTypesEquivalent),
                parityCase("Checker", "getNeverType", checker.getNeverType, assertTypesEquivalent),
                parityCase("Checker", "getUnknownType", checker.getUnknownType, assertTypesEquivalent),
                parityCase("Checker", "getBigIntType", checker.getBigIntType, assertTypesEquivalent),
                parityCase("Checker", "getESSymbolType", checker.getESSymbolType, assertTypesEquivalent),
                parityCase("Checker", "getNonPrimitiveType", checker.getNonPrimitiveType, assertTypesEquivalent),
                parityCase("Checker", "typeToTypeNode", checker.typeToTypeNode, assertOptionalNodesEquivalent, interfaceType, interfaceDeclaration),
                parityCase("Checker", "signatureToSignatureDeclaration", checker.signatureToSignatureDeclaration, assertOptionalNodesEquivalent, signature, SyntaxKind.FunctionDeclaration, combineDeclaration),
                parityCase("Checker", "typeToString", checker.typeToString, assertDeepEquivalent, interfaceType, interfaceDeclaration),
                parityCase("Checker", "isContextSensitive", checker.isContextSensitive, assertDeepEquivalent, boxDeclaration.initializer!),
                parityCase("Checker", "isArrayType", checker.isArrayType, assertDeepEquivalent, arrayType),
                parityCase("Checker", "isTupleType", checker.isTupleType, assertDeepEquivalent, tupleType),
                parityCase("Checker", "isTupleTypeTarget", checker.isTupleTypeTarget, assertDeepEquivalent, tupleType),
                parityCase("Checker", "getReturnTypeOfSignature", checker.getReturnTypeOfSignature, assertTypesEquivalent, signature),
                parityCase("Checker", "getRestTypeOfSignature", checker.getRestTypeOfSignature, assertOptionalTypesEquivalent, signature),
                parityCase("Checker", "getTypePredicateOfSignature", checker.getTypePredicateOfSignature, assertOptionalTypePredicatesEquivalent, predicateSignature),
                parityCase("Checker", "getBaseTypes", checker.getBaseTypes, assertTypeArraysEquivalent, derivedType),
                parityCase("Checker", "getApparentType", checker.getApparentType, assertTypesEquivalent, interfaceType),
                parityCase("Checker", "getReducedType", checker.getReducedType, assertTypesEquivalent, unionType),
                parityCase("Checker", "getPropertiesOfType", checker.getPropertiesOfType, assertSymbolArraysEquivalent, interfaceType),
                parityCase("Checker", "getIndexInfosOfType", checker.getIndexInfosOfType, assertIndexInfosEquivalent, interfaceType),
                parityCase("Checker", "getConstraintOfTypeParameter", checker.getConstraintOfTypeParameter, assertOptionalTypesEquivalent, typeParameter),
                parityCase("Checker", "getDefaultFromTypeParameter", checker.getDefaultFromTypeParameter, assertOptionalTypesEquivalent, typeParameter),
                parityCase("Checker", "getBaseConstraintOfType", checker.getBaseConstraintOfType, assertOptionalTypesEquivalent, typeParameter),
                parityCase("Checker", "getPropertyOfType", checker.getPropertyOfType, assertOptionalSymbolsEquivalent, interfaceType, "value"),
                parityCase("Checker", "getConstantValue", checker.getConstantValue, assertDeepEquivalent, enumDeclaration.members[0]),
                parityCase("Checker", "getSignatureFromDeclaration", checker.getSignatureFromDeclaration, assertOptionalSignaturesEquivalent, combineDeclaration),
                parityCase("Checker", "getExportSpecifierLocalTargetSymbol", checker.getExportSpecifierLocalTargetSymbol, assertOptionalSymbolsEquivalent, exportSpecifier),
                parityCase("Checker", "getAliasedSymbol", checker.getAliasedSymbol, assertSymbolsEquivalent, importedDerivedSymbol),
                parityCase("Checker", "getFullyQualifiedName", checker.getFullyQualifiedName, assertDeepEquivalent, combineSymbol),
                parityCase("Checker", "getImmediateAliasedSymbol", checker.getImmediateAliasedSymbol, assertOptionalSymbolsEquivalent, importedDerivedSymbol),
                parityCase("Checker", "isUnknownSymbol", checker.isUnknownSymbol, assertDeepEquivalent, unknownSymbol),
                parityCase("Checker", "isUndefinedSymbol", checker.isUndefinedSymbol, assertDeepEquivalent, undefinedSymbol),
                parityCase("Checker", "isArgumentsSymbol", checker.isArgumentsSymbol, assertDeepEquivalent, argumentsSymbol),
                parityCase("Checker", "isUnknownSignature", checker.isUnknownSignature, assertDeepEquivalent, unknownSignature),
                parityCase("Checker", "getExportsOfModule", checker.getExportsOfModule, assertSymbolArraysEquivalent, moduleSymbol),
                parityCase("Checker", "getMemberInModuleExports", checker.getMemberInModuleExports, assertOptionalSymbolsEquivalent, moduleSymbol, "Derived"),
                parityCase("Checker", "getJsDocTagsOfSymbol", checker.getJsDocTagsOfSymbol, assertDeepEquivalent, combineSymbol),
                parityCase("Checker", "getDocumentationCommentOfSymbol", checker.getDocumentationCommentOfSymbol, assertDeepEquivalent, combineSymbol),
                parityCase("Checker", "getTypeArguments", checker.getTypeArguments, assertTypeArraysEquivalent, boxedType),
                parityCase("Checker", "getNonMissingTypeOfSymbol", checker.getNonMissingTypeOfSymbol, assertTypesEquivalent, boxedOptSymbol),
                parityCase("Checker", "isReadonlySymbol", checker.isReadonlySymbol, assertDeepEquivalent, boxedOptSymbol),
                parityCase("Checker", "getTargetSymbol", checker.getTargetSymbol, assertOptionalSymbolsEquivalent, boxedOptSymbol),

                parityCase("Emitter", "printNode", emitter.printNode, assertDeepEquivalent, combineDeclaration, { preserveSourceNewlines: true }),
                parityCase("SnapshotInternalAPI", "formatNodeForInsertion", snapshot.internal.formatNodeForInsertion, assertDeepEquivalent, combineDeclaration, "/src/index.ts", combineDeclaration.pos),
                parityCase("NodeHandle", "resolve", nodeHandle.resolve, assertOptionalNodesEquivalent),
                parityCase("NodeHandle", "resolve", nodeHandle.resolve, assertOptionalNodesEquivalent, project),

                parityCase("Symbol", "getParent", derivedMemberSymbol.getParent, assertOptionalSymbolsEquivalent),
                parityCase("Symbol", "getMembers", derivedClassSymbol.getMembers, assertSymbolMapsEquivalent),
                parityCase("Symbol", "getExports", moduleSymbol.getExports, assertSymbolMapsEquivalent),
                parityCase("Symbol", "getExportSymbol", combineSymbol.getExportSymbol, assertSymbolsEquivalent),
                parityCase("Symbol", "getJsDocTags", combineSymbol.getJsDocTags, assertDeepEquivalent, checker),
                parityCase("Symbol", "getDocumentationComment", combineSymbol.getDocumentationComment, assertDeepEquivalent, checker),

                parityCase("Type", "getSymbol", interfaceType.getSymbol, assertOptionalSymbolsEquivalent),
                parityCase("Type", "getProperties", interfaceType.getProperties, assertSymbolArraysEquivalent),
                parityCase("Type", "getProperty", interfaceType.getProperty, assertOptionalSymbolsEquivalent, "value"),
                parityCase("Type", "getApparentProperties", interfaceType.getApparentProperties, assertSymbolArraysEquivalent),
                parityCase("Type", "getCallSignatures", checker.getTypeAtLocation(combineDeclaration.name!).getCallSignatures, assertSignatureArraysEquivalent),
                parityCase("Type", "getConstructSignatures", derivedConstructorType.getConstructSignatures, assertSignatureArraysEquivalent),
                parityCase("Type", "getNonNullableType", interfaceType.getNonNullableType, assertTypesEquivalent),
                parityCase("Type", "getStringIndexType", interfaceType.getStringIndexType, assertOptionalTypesEquivalent),
                parityCase("Type", "getNumberIndexType", interfaceType.getNumberIndexType, assertOptionalTypesEquivalent),
                parityCase("Type", "getApparentType", interfaceType.getApparentType, assertTypesEquivalent),
                parityCase("Type", "getReducedType", unionType.getReducedType, assertTypesEquivalent),
                parityCase("Type", "getIndexInfos", interfaceType.getIndexInfos, assertIndexInfosEquivalent),
                parityCase("Type", "getAliasSymbol", boxedType.getAliasSymbol, assertOptionalSymbolsEquivalent),
                parityCase("Type", "getTarget", boxedType.getTarget, assertTypesEquivalent),
                parityCase("Type", "getFreshType", literalType.getFreshType, assertOptionalTypesEquivalent),
                parityCase("Type", "getRegularType", literalType.getRegularType, assertOptionalTypesEquivalent),
                parityCase("Type", "getTypes", (unionType as UnionOrIntersectionType).getTypes, assertOptionalTypeArrayEquivalent),
                parityCase("Type", "getTypeParameters", interfaceType.getTypeParameters, assertTypeArraysEquivalent),
                parityCase("Type", "getOuterTypeParameters", interfaceType.getOuterTypeParameters, assertTypeArraysEquivalent),
                parityCase("Type", "getLocalTypeParameters", interfaceType.getLocalTypeParameters, assertTypeArraysEquivalent),
                parityCase("Type", "getAliasTypeArguments", boxedType.getAliasTypeArguments, assertTypeArraysEquivalent),
                parityCase("Type", "getObjectType", indexedType.getObjectType, assertTypesEquivalent),
                parityCase("Type", "getIndexType", indexedType.getIndexType, assertTypesEquivalent),
                parityCase("Type", "getCheckType", conditionalType.getCheckType, assertTypesEquivalent),
                parityCase("Type", "getExtendsType", conditionalType.getExtendsType, assertTypesEquivalent),
                parityCase("Type", "getBaseType", substitutionType.getBaseType, assertTypesEquivalent),
                parityCase("Type", "getConstraint", typeParameter.getConstraint, assertOptionalTypesEquivalent),
                parityCase("Type", "getDefault", typeParameter.getDefault, assertOptionalTypesEquivalent),
                parityCase("Type", "getTrueType", conditionalType.getTrueType, assertTypesEquivalent),
                parityCase("Type", "getFalseType", conditionalType.getFalseType, assertTypesEquivalent),
                parityCase("Type", "getBaseTypes", derivedType.getBaseTypes, assertOptionalTypeArrayEquivalent),

                parityCase("Signature", "getTypeParameters", signature.getTypeParameters, assertTypeArraysEquivalent),
                parityCase("Signature", "getParameters", signature.getParameters, assertSymbolArraysEquivalent),
                parityCase("Signature", "getThisParameter", signature.getThisParameter, assertOptionalSymbolsEquivalent),
                parityCase("Signature", "getTarget", constructSignature.getTarget, assertOptionalSignaturesEquivalent),
                parityCase("Signature", "getReturnType", signature.getReturnType, assertTypesEquivalent),
                parityCase("Signature", "getTypeParameterAtPosition", signature.getTypeParameterAtPosition, assertTypesEquivalent, 0),
            ];

            runParityBatch(api, cases);
            assert.deepEqual(temporaryProjects, ["/tsconfig.json", "/tsconfig.json"]);

            const destructiveAPI = spawnAPI(parityFiles);
            const disposableSnapshot = destructiveAPI.batch(destructiveAPI.updateSnapshot.gen({ openProject: "/tsconfig.json" }))[0];
            destructiveAPI.batch(disposableSnapshot.dispose.gen());
            assert.equal(disposableSnapshot.isDisposed(), true);
            assert.equal(disposableSnapshot.dispose(), undefined);
            exercisedMethods.add("Snapshot.dispose");
            const disposableProgram = destructiveAPI.batch(destructiveAPI.createProgram.gen(["/src/index.ts"], { compilerOptions: { noLib: true } }))[0];
            destructiveAPI.batch(disposableProgram.dispose.gen());
            assert.throws(() => disposableProgram.getSourceFileNames(), /snapshot .* not found/);
            assert.equal(disposableProgram.dispose(), undefined);
            exercisedMethods.add("Program.dispose");
            destructiveAPI.batch(destructiveAPI.close.gen());
            assert.equal(destructiveAPI.close(), undefined);
            exercisedMethods.add("API.close");

            assertPublicGeneratorCoverage([
                { name: "API", value: api },
                { name: "API", value: api.constructor as object, own: true },
                { name: "InternalAPI", value: api.internal },
                { name: "Snapshot", value: snapshot },
                { name: "Project", value: project },
                { name: "LanguageService", value: languageService },
                { name: "Program", value: program },
                { name: "Checker", value: checker },
                { name: "Emitter", value: emitter },
                { name: "SnapshotInternalAPI", value: snapshot.internal },
                { name: "NodeHandle", value: nodeHandle },
                { name: "Symbol", value: combineSymbol },
                { name: "Type", value: interfaceType },
                { name: "Signature", value: signature },
            ]);
        }
        finally {
            api.close();
        }
    });
});
