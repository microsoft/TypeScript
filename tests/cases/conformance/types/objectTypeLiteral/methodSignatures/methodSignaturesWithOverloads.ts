// Object type literals permit overloads with optionality but they must match

var c: {
    func4?(x: number): number;
    func4(s: string): string; // error, mismatched optionality
    func5?: {
        (x: number): number;
        (s: string): string;
    };
};

var c2: {
    func4<T>(x: T): number;
    func4? <T>(s: T): string; // error, mismatched optionality
    func5?: {
        <T>(x: T): number;
        <T>(s: T): string;
    };
};