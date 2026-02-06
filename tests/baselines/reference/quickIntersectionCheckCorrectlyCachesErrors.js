//// [tests/cases/compiler/quickIntersectionCheckCorrectlyCachesErrors.ts] ////

//// [quickIntersectionCheckCorrectlyCachesErrors.tsx]
interface F<P> {
    (props: P & { children?: boolean }): void;
    propTypes: { [K in keyof P]: null extends P ? K : K };
}
declare function g(C: F<unknown>): string;
export function wu<CP extends { o: object }>(CC: F<CP>) {
    class WU {
        m() {
            g(CC)
            return <CC {...(null as unknown as CP)} />;
        }
    }
}


//// [quickIntersectionCheckCorrectlyCachesErrors.js]
export function wu(CC) {
    class WU {
        m() {
            g(CC);
            return React.createElement(CC, Object.assign({}, null));
        }
    }
}
