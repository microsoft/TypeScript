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
const Parent = ({ children, name = "Artemis", ...props }) => Child({ name, ...props });
const Child = ({ children, name = "Artemis", ...props }) => `name: ${name} props: ${JSON.stringify(props)}`;
f(([_1, _2 = undefined]) => undefined);
