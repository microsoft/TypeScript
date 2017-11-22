import { Mock } from "./mock";
import { Times } from "./times";
import { Arg } from "./arg";

function noop() {}

export type Callable = ((...args: any[]) => any);

export type Constructable = (new (...args: any[]) => any);

export class Spy<T extends Callable | Constructable = Callable & Constructable> {
    private _mock: Mock<T>;

    constructor(target = <T>noop) {
        this._mock = new Mock<T>(target);
    }

    public get value(): T {
        return this._mock.value;
    }

    public verify(callback: (value: T) => any, times: Times): this {
        this._mock.verify(callback, times);
        return this;
    }

    public called(times: Times): this {
        return this.verify(_ => (<Callable>_)(Arg.rest()), times);
    }

    public constructed(times: Times): this {
        return this.verify(_ => new (<Constructable>_)(Arg.rest()), times);
    }

    public revoke(): void {
        this._mock.revoke();
    }
}
