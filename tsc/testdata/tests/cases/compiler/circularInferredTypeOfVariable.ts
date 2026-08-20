// @target: es6

// Repro from #14428

(async () => {
    function foo(p: string[]): string[] {
        return [];
    }

    function bar(p: string[]): string[] {
        return [];
    }

    let a1: string[] | undefined = [];

    while (true) {
        let a2 = foo(a1!);
        a1 = await bar(a2);
    }
});