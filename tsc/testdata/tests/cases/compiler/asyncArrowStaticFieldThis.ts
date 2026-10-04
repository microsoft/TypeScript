// @target: es2015
// @noTypesAndSymbols: true

namespace NS {
    export class C {
        static h = async () => 1;
        static i = async () => this.h;
    }
}
