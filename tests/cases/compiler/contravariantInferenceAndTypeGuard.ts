// @strict: true
interface ListItem<TData> {
    prev: ListItem<TData> | null;
    next: ListItem<TData> | null;
    data: TData;
}
type IteratorFn<TData, TResult, TContext = List<TData>> = (this: TContext, item: TData, node: ListItem<TData>, list: List<TData>) => TResult;
type FilterFn<TData, TResult extends TData, TContext = List<TData>> = (this: TContext, item: TData, node: ListItem<TData>, list: List<TData>) => item is TResult;

declare class List<TData> {
    filter<TContext, TResult extends TData>(fn: FilterFn<TData, TResult, TContext>, context: TContext): List<TResult>;
    filter<TResult extends TData>(fn: FilterFn<TData, TResult>): List<TResult>;
    filter<TContext>(fn: IteratorFn<TData, boolean, TContext>, context: TContext): List<TData>;
    filter(fn: IteratorFn<TData, boolean>): List<TData>;
}
interface Test {
    a: string;
}
const list2 = new List<Test | null>();
const filter1 = list2.filter(function(item, node, list): item is Test {
    this.b; // $ExpectType string
    item; // $ExpectType Test | null
    node; // $ExpectType ListItem<Test | null>
    list; // $ExpectType List<Test | null>
    return !!item;
}, {b: 'c'});
const x: List<Test> = filter1; // $ExpectType List<Test>
