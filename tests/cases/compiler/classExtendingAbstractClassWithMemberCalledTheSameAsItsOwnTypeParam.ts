// @strict: true
// @lib: esnext
// @noEmit: true

interface IObserver {
	handleChange<T, TChange>(observable: IObservable<T, TChange>, change: TChange): void;
}

interface IObservable<T, TChange = unknown> {
	get(): T;
	readonly TChange: TChange;
}

export interface IReader {
	readObservable<T>(observable: IObservable<T, any>): T;
}

export abstract class ConvenientObservable<T, TChange> implements IObservable<T, TChange> {
	get TChange(): TChange { return null!; }
	public abstract get(): T;
}

export abstract class BaseObservable<T, TChange = void> extends ConvenientObservable<T, TChange> {
	protected readonly observers = new Set<IObserver>();
}
