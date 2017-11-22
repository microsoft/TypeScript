export function theory(name: string, data: any[][] | (() => any[][]), callback: (...args: any[]) => any) {
    describe(name, () => {
        for (const row of typeof data === "function" ? data() : data) {
            it(row.toString(), () => callback(...row));
        }
    });
}

export function recordError(action: () => void): Error | undefined {
    try {
        action();
        return undefined;
    }
    catch (e) {
        return e;
    }
}