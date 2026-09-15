import type {
    APIRequest,
    BatchRequestsParams,
    BatchRequestsResponse,
} from "./proto.ts";

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
