function foo<T>(x = class { static prop: T }): T {
    return undefined;
}

foo(class { static prop = "hello" }).length;