interface Ar {
    reduce(callbackfn: (previousValue: boolean) => void, initialValue: string): void; // If I change the type of 'previousValue' to 'any' it works?
    reduce<U>(callbackfn: (previousValue: U) => void, initialValue: U): void;
}

function max(arr: Ar): void {
    arr.reduce(prev => {}, 0);
}
