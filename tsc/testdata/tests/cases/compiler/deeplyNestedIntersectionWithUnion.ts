// @strict: true
// @target: es2023
// @noEmit: true

// Reduced from yargs as used by mikro-orm. Comparing Argv<T> structurally
// builds Argv<T & { ... }> again and again. With a union for T, each
// intersection distributes over the union or flattens a copy of it, and is
// still another level of nesting.

type BuilderCallback<T, R> = ((args: Argv<T>) => PromiseLike<Argv<R>>) | ((args: Argv<T>) => Argv<R>) | ((args: Argv<T>) => void);
interface Argv<T> {
    alias<K1 extends keyof T, K2 extends string>(shortName: K1, longName: K2 | readonly K2[]): Argv<T & { [key in K2]: T[K1] }>;
    alias<K1 extends keyof T, K2 extends string>(shortName: K2, longName: K1 | readonly K1[]): Argv<T & { [key in K2]: T[K1] }>;
    argv: { [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key] } | Promise<{ [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key] }>;
    array<K extends string>(key: K | readonly K[]): Argv<T & { [key in K]: string[] }>;
    command<U = T>(builder?: BuilderCallback<T, U>, handler?: (args: ArgumentsCamelCase<U>) => void, middlewares?: Array<MiddlewareFunction<U>>): Argv<T>;
    command<O extends { [key: string]: Options }>(showInHelp: false, builder?: O, handler?: (args: ArgumentsCamelCase<InferredOptionTypes<O>>) => void): Argv<T>;
    command<U = any>(module: CommandModule<T, U>): Argv<T>;
    command<U = any>(module: CommandModule<T, U>): Argv<T>;
    demandOption<K extends string>(key: K | readonly K[]): Argv<T & { [key in K]: unknown }>;
    parse(parseCallback?: ParseCallback<T>): { [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key] } | Promise<{ [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key] }>;
    parseSync(parseCallback?: ParseCallback<T>): { [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key] };
    parseAsync(parseCallback?: ParseCallback<T>): Promise<{ [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key] }>;
    positional<K extends keyof T, O extends PositionalOptions>(opt: O): Argv<Omit<T, K> & { [key in K]: InferredOptionType<O> }>;
    positional<K extends string, O extends PositionalOptions>(key: K, opt: O): Argv<T & { [key in K]: InferredOptionType<O> }>;
    usage<U>(builder?: (args: Argv<T>) => Argv<U>, handler?: (args: ArgumentsCamelCase<U>) => void): Argv<T>;
    usage<U>(builder?: (args: Argv<T>) => Argv<U>, handler?: (args: ArgumentsCamelCase<U>) => void): Argv<T>;
    usage<O extends { [key: string]: Options }>(builder?: O, handler?: (args: ArgumentsCamelCase<InferredOptionTypes<O>>) => void): Argv<T>;
    usage<O extends { [key: string]: Options }>(builder?: O, handler?: (args: ArgumentsCamelCase<InferredOptionTypes<O>>) => void): Argv<T>;
    version(version: string): Argv<T>;
}
type Arguments<T> = T & { _: string[] };
type ArgumentsCamelCase<T> = { [key in keyof T as key | CamelCaseKey<key>]: T[key] };
interface Options {}
type PositionalOptions = Options;
type CamelCaseKey<K extends PropertyKey> = K extends string ? Exclude<K, ""> : K;
type InferredOptionType<O> =
    O extends { coerce: (arg: any) => infer T } ? T
    : unknown;
type InferredOptionTypes<O extends { [key: string]: Options }> = { [key in keyof O]: InferredOptionType<O[key]> };
interface CommandModule<T, U> {
    builder?: CommandBuilder<T, U>;
}
type ParseCallback<T> = () => T;
type CommandBuilder<T, U> = (args: Argv<T>) => Argv<U>;
type MiddlewareFunction<T> = (args: ArgumentsCamelCase<T>) => void;
declare const argv: Argv<{ config: string[] | undefined; contextName: string; quiet: boolean }>;
type BaseArgs = Awaited<typeof argv['argv']>;
declare function builder(args: Argv<BaseArgs>): Argv<BaseArgs & { class: string }>;
argv.command({ builder });
