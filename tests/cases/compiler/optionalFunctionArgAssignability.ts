interface Promise<T> {
    then<U>(onFulfill?: (value: T) => U, onReject?: (reason: any) => U): Promise<U>;
}
 
var a = function then<U>(onFulfill?: (value: string) => U, onReject?: (reason: any) => U): Promise<U> { return null };
var b = function then<U>(onFulFill?: (value: number) => U, onReject?: (reason: any) => U): Promise<U> { return null };
a = b; // error because number is not assignable to string
