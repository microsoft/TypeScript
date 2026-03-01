// @target: es2015
enum E {
    "__foo" = 1,
    bar = E["__foo"] + 1
}
