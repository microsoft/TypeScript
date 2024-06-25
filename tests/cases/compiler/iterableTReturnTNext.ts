// @target: esnext
// @strict: true

declare const map: Map<string, number>;
declare const set: Set<number>;

// based on:
// - https://github.com/apollographql/apollo-client/blob/8740f198805a99e01136617c4055d611b92cc231/src/react/hooks/__tests__/useMutation.test.tsx#L2328
// - https://github.com/continuedev/continue/blob/046bca088a833f8b3620412ff64e4b6f41fbb959/extensions/vscode/src/autocomplete/lsp.ts#L60
const r1: number = map.values().next().value; // error as result is potentially `{ done: true, value: void }`

// based on: https://github.com/gcanti/fp-ts/blob/89a772e95e414acee679f42f56527606f7b61f30/src/Map.ts#L246
interface Next<A> {
    readonly done?: boolean
    readonly value: A
}
const r2: Next<number> = map.values().next(); // error as result is potentially `{ done: true, value: void }`

// based on: https://github.com/graphql/graphql-js/blob/e15c3ec4dc21d9fd1df34fe9798cadf3bf02c6ea/src/execution/__tests__/mapAsyncIterable-test.ts#L175
async function* source() { yield 1; yield 2; yield 3; }
const doubles = source();
doubles.return();

// based on: https://github.com/backstage/backstage/blob/85d9346ef11c1c20e4405102b4f5d93afb1292c1/packages/core-app-api/src/routing/RouteTracker.tsx#L62
const r3: number | undefined = set.values().next().value;