// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/849

declare function useMemo<T>(func: () => T): T;

function getPredicate(alwaysTrue: boolean) {
    const predicate: (input: string) => boolean = useMemo(() => {
        if (alwaysTrue) {
            return () => true;
        }
        return x => x.length > 0;
    });
    return predicate;
}
