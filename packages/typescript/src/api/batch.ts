import type {
    APIRequest,
    BatchRequestsParams,
    BatchRequestsResponse,
} from "./proto.ts";

interface GroupedBatchRequest {
    method: APIRequest["method"];
    base?: Record<string, unknown>;
    count: number;
    fields?: Record<string, unknown[]>;
    requests?: unknown[];
}

export function groupBatchRequests<T extends { method: APIRequest["method"]; params: APIRequest["params"]; }>(requests: readonly T[]): {
    groups: GroupedBatchRequest[];
    groupOrder?: number[];
} | undefined {
    const groupIndexes = new Map<APIRequest["method"], number>();
    const requestsByMethod: T[][] = [];
    const groupOrder: number[] = [];
    let hasBatchableGroup = false;
    for (const request of requests) {
        let groupIndex = groupIndexes.get(request.method);
        if (groupIndex === undefined) {
            groupIndex = requestsByMethod.length;
            groupIndexes.set(request.method, groupIndex);
            requestsByMethod.push([]);
        }
        requestsByMethod[groupIndex].push(request);
        if (requestsByMethod[groupIndex].length === 4) hasBatchableGroup = true;
        groupOrder.push(groupIndex);
    }
    if (!hasBatchableGroup) return undefined;

    const groups: GroupedBatchRequest[] = [];
    for (const [method, groupIndex] of groupIndexes) {
        const groupedRequests = requestsByMethod[groupIndex];
        const params = groupedRequests.map(request => request.params);
        if (groupedRequests.length < 4) {
            groups.push({ method, count: params.length, requests: params });
            continue;
        }
        if (params.every(param => typeof param === "object" && param !== null && !Array.isArray(param))) {
            const records = params as Record<string, unknown>[];
            const base = commonParams(records);
            const commonKeys = new Set(Object.keys(base));
            const deltas = records.map(param => Object.fromEntries(Object.entries(param).filter(([key]) => !commonKeys.has(key))));
            const fields = parameterColumns(deltas);
            groups.push(
                fields
                    ? { method, base, count: records.length, fields }
                    : { method, base, count: records.length, requests: deltas },
            );
        }
        else {
            groups.push({ method, count: params.length, requests: params });
        }
    }
    return groups.length === 1 ? { groups } : { groups, groupOrder };
}

function parameterColumns(params: readonly Record<string, unknown>[]): Record<string, unknown[]> | undefined {
    const keys = Object.keys(params[0]);
    if (
        !params.every(param => {
            const paramKeys = Object.keys(param);
            return paramKeys.length === keys.length
                && keys.every(key => Object.hasOwn(param, key) && param[key] !== undefined);
        })
    ) return undefined;
    return Object.fromEntries(keys.map(key => [key, params.map(param => param[key])])) as Record<string, unknown[]>;
}

function commonParams(params: readonly Record<string, unknown>[]): Record<string, unknown> {
    const first = params[0];
    return Object.fromEntries(
        Object.entries(first).filter(([key, value]) => {
            const type = typeof value;
            return (value === null || type !== "object" && type !== "undefined")
                && params.every(param => Object.hasOwn(param, key) && param[key] === value);
        }),
    );
}

export function createGroupedBatchRequest(
    method: APIRequest["method"],
    base: Record<string, unknown>,
    fields: Record<string, readonly unknown[]>,
): BatchRequestsParams {
    const entries = Object.entries(fields);
    const count = entries[0]?.[1].length ?? 0;
    if (!entries.every(([, values]) => values.length === count)) {
        throw new Error("Grouped batch parameter columns must have equal lengths");
    }
    if (count < 4) {
        return {
            requests: Array.from({ length: count }, (_, index) => ({
                method,
                params: { ...base, ...Object.fromEntries(entries.map(([key, values]) => [key, values[index]])) },
            })),
        };
    }
    return {
        groups: [{ method, base, count, fields: Object.fromEntries(entries) }],
    };
}

export function getBatchResults<T>(response: BatchRequestsResponse): T[] {
    return response.results.map((result, index) => {
        const error = response.errors?.[index];
        if (error !== undefined) throw new Error(error);
        return result as T;
    });
}
