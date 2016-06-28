function foo<T>(x = class { prop: T }): T {
    return undefined;
}

// Should not infer string because it is a static property
foo(class { static prop = "hello" }).length;