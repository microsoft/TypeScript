//// [tests/cases/compiler/destructuringInitializerContextualTypeFromContext.ts] ////

//// [destructuringInitializerContextualTypeFromContext.ts]
interface SFC<P = {}> {
    (props: P & { children?: any }): any | null;
}

interface Props {
    name: "Apollo" | "Artemis" | "Dionysus" | "Persephone";
}

const Parent: SFC<Props> = ({
    children,
    name = "Artemis",
    ...props
}) => Child({name, ...props});

const Child: SFC<Props> = ({
    children,
    name = "Artemis",
    ...props
}) => `name: ${name} props: ${JSON.stringify(props)}`;

// Repro from #29189

declare function f(g: (as: string[]) => void): void
f(([_1, _2 = undefined]) => undefined)


//// [destructuringInitializerContextualTypeFromContext.js]
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const Parent = (_a) => {
    var { children, name = "Artemis" } = _a, props = __rest(_a, ["children", "name"]);
    return Child(Object.assign({ name }, props));
};
const Child = (_a) => {
    var { children, name = "Artemis" } = _a, props = __rest(_a, ["children", "name"]);
    return `name: ${name} props: ${JSON.stringify(props)}`;
};
f(([_1, _2 = undefined]) => undefined);
