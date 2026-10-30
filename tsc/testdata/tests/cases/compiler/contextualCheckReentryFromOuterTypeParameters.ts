// @strict: true
// @noEmit: true

interface Argv<T = {}> {
    command<U>(builder: (args: Argv<T>) => Argv<U>, handler: (args: Arguments<U>) => void): Argv<T>;
    option<K extends string, O>(key: K, options: O): Argv<{ [key in K]: O } & Check<O>>;
}
type Arguments<T> = { [key in keyof T]: T[key] } & { [key: string]: unknown };
type Check<O> = O extends {} ? {} : {};
declare const yargs: Argv;

yargs.command(
    (yargs) => yargs.option("a", { type: "string" }),
    (argv) => {
        const a: { type: string } = argv.a;
    },
);
