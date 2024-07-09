interface Promise<T> {
    then<U>(value: T): void;
}

interface Bar {
    bar(value: "Menu"): Promise<string>;
    bar<T>(value: string, element: string): Promise<T>;
    bar<T>(value: string): Promise<T>;
}
