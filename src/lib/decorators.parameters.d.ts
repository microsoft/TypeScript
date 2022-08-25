interface ParameterDecoratorContext<Func extends Function> {
    readonly kind: "parameter";
    readonly index: number;
    readonly name: string | undefined;
    readonly rest: boolean;
    addInitializer(initializer: (this: Func) => void): void;
}

type ParameterDecoratorFunction = <
    Func extends Function,
    This,
    In,
    Out = In
>(target: undefined, context: ParameterDecoratorContext<Func>) => ((this: This, initialValue: In) => Out) | void;
