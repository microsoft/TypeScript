//// [tests/cases/compiler/intersectionOfTypeVariableHasApparentSignatures.ts] ////

//// [intersectionOfTypeVariableHasApparentSignatures.ts]
interface Component<P> {
    props: Readonly<P> & Readonly<{ children?: {} }>;
}

interface Props {
    children?: (items: {x: number}) => void
}

declare function f<T extends Props>(i: Component<T>): void;

f({
    props: {
        children: (({ x }) => { })
    }
});

//// [intersectionOfTypeVariableHasApparentSignatures.js]
f({
    props: {
        children: (function (_a) {
            var x = _a.x;
        })
    }
});
