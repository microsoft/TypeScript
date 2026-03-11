// @strict: true
// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare function dec(target: any, context: any): any;

// When a decorated class extends null and has no explicit constructor,
// the synthetic constructor should NOT call super(...arguments) since
// null is not a valid constructor.
class C extends null {
    @dec x: number = 1;
}
