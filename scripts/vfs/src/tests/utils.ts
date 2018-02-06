export interface Theory {
    title: string;
    args: any[];
}

export function theory(name: string, data: (Theory | any[])[], callback: (...args: any[]) => any) {
    describe(name, () => {
        for (const theory of data) {
            const title = Array.isArray(theory) ? theory.toString() : theory.title;
            const args = Array.isArray(theory) ? theory : theory.args;
            it(title, () => callback(...args));
        }
    });
}

export function createSpy() {
    const calls: any[][] = [];
    const proxy = function(...args: any[]): any { calls.push(args); }
    return { proxy, calls };
}