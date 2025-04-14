// @strict: true
// @noEmit: true

// Repro from #53748

declare type Callback<Args extends any[], Out, R> = (...args: Args) => (data: Out) => R;
declare function factory<Out>(): <Args extends any[], R>(callback: Callback<Args, Out, R>) => (...args: Args) => R;

const make = factory<{id: string, age: number}[]>();

const usersOverAge = make((age: number) => data => {
    return data.filter(user => user.age >= age);
});
