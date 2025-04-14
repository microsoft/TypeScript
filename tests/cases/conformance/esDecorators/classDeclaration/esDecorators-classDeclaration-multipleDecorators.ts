// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec1: any, dec2: any;

@dec1
@dec2
class C {
}
