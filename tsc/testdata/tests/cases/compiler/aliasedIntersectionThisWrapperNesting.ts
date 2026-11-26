// @strict: true
// @noEmit: true

// Reduced from drizzle-orm column builders. Each method wraps `this` in an
// intersection alias, so measuring the variance of `Initial` compares
// intersections with the same constituents under ever longer aliases, such
// as HasDefault<NotNull<HasDefault<B>>>. Each is another level of nesting.

interface Base { _: object }
type NotNull<T extends Base> = T & { _: { notNull: true } };
type HasDefault<T extends Base> = T & { _: { hasDefault: true } };
type HasRuntimeDefault<T extends Base> = T & { _: { hasRuntimeDefault: true } };
type $Type<T extends Base, TType> = T & { _: { $type: TType } };

declare class ColumnBuilder<T extends { data: unknown }> {
    _: T;
    $type<TType>(): $Type<this, TType>;
    notNull(): NotNull<this>;
    default(value: this['_']['data']): HasDefault<this>;
    $defaultFn(fn: this['_']['data']): HasRuntimeDefault<HasDefault<this>>;
    $onUpdateFn(fn: this['_']['data']): HasDefault<this>;
    $default: (fn: this['_']['data']) => HasRuntimeDefault<HasDefault<this>>;
    $onUpdate: (fn: this['_']['data']) => HasDefault<this>;
}

type Initial<TName> = NotNull<HasDefault<ColumnBuilder<{ name: TName; data: number }>>>;

declare let a: Initial<"a">;
let b: Initial<string> = a;
