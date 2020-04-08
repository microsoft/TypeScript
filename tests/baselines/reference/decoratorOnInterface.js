//// [decoratorOnInterface.ts]
declare function dec<T>(target: T): T;

@dec
interface I {
}

//// [decoratorOnInterface.js]
