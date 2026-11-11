// https://github.com/microsoft/TypeScript/issues/61783

abstract class SeparatedByMethod {
    abstract func1(): void;

    func2(): string {
        return 'hi';
    }

    abstract func1(): void;
}

abstract class SeparatedByProperty {
    abstract func1(): void;

    prop: string = 'hi';

    abstract func1(): void;
}
