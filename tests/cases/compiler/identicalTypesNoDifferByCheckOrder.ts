// @strictNullChecks: true

interface SomeProps {
    x?: string;
    y?: number;
    renderAs?: FunctionComponent1<SomeProps>
}

type SomePropsX = Required<Pick<SomeProps, "x">> & Omit<SomeProps, "x">;

interface SomePropsClone {
    x?: string;
    y?: number;
    renderAs?: FunctionComponent2<SomeProps>
}

type SomePropsCloneX = Required<Pick<SomePropsClone, "x">> & Omit<SomePropsClone, "x">;

type Validator<T> = {(): boolean, opt?: T};
type WeakValidationMap<T> = {[K in keyof T]?: null extends T[K] ? Validator<T[K] | null | undefined> : Validator<T[K]>};

interface FunctionComponent1<P> {
    (props: P & { children?: unknown }): void;
    propTypes?: WeakValidationMap<P>;
}

interface FunctionComponent2<P> {
    (props: P & { children?: unknown }): void;
    propTypes?: WeakValidationMap<P>;
}

function needsComponentOfSomeProps3(...x: SomePropsClone[]): void {}
const comp3: FunctionComponent2<SomePropsCloneX> = null as any;
needsComponentOfSomeProps3({ renderAs: comp3 });

function needsComponentOfSomeProps2(...x: SomeProps[]): void {}
const comp2: FunctionComponent1<SomePropsX> = null as any;
needsComponentOfSomeProps2({ renderAs: comp2 });