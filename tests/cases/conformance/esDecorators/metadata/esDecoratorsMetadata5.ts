// @target: es2022
// @noTypesAndSymbols: true
// @filename: /foo.ts

declare var metadata: any;
class C {
    @metadata m() {}
}
