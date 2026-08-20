//// [tests/cases/compiler/constEnumOnlyModuleImportAliasEmit.ts] ////

//// [mappa.ts]
namespace OnRtls.Mappa {
    export const enum TipoCamera { Camera2D = 1, Camera3D = 2 }
    export class MappaViewModel {
        constructor(public canvas: any, public config: any, public tipo: TipoCamera) {}
    }
}

//// [types.d.ts]
declare namespace OnRtls.Mappa.Server {
    const enum SomeFlag { A = 0 }
}

//// [sensmap.ts]
namespace OnRtls.Carrello.Home {
    import mappa = OnRtls.Mappa;
    export class SensmapViewModel {
        constructor() {
            var x = new mappa.MappaViewModel(null, null, mappa.TipoCamera.Camera3D);
        }
    }
}


//// [mappa.js]
"use strict";
var OnRtls;
(function (OnRtls) {
    var Mappa;
    (function (Mappa) {
        class MappaViewModel {
            canvas;
            config;
            tipo;
            constructor(canvas, config, tipo) {
                this.canvas = canvas;
                this.config = config;
                this.tipo = tipo;
            }
        }
        Mappa.MappaViewModel = MappaViewModel;
    })(Mappa = OnRtls.Mappa || (OnRtls.Mappa = {}));
})(OnRtls || (OnRtls = {}));
//// [sensmap.js]
"use strict";
var OnRtls;
(function (OnRtls) {
    var Carrello;
    (function (Carrello) {
        var Home;
        (function (Home) {
            var mappa = OnRtls.Mappa;
            class SensmapViewModel {
                constructor() {
                    var x = new mappa.MappaViewModel(null, null, 2 /* mappa.TipoCamera.Camera3D */);
                }
            }
            Home.SensmapViewModel = SensmapViewModel;
        })(Home = Carrello.Home || (Carrello.Home = {}));
    })(Carrello = OnRtls.Carrello || (OnRtls.Carrello = {}));
})(OnRtls || (OnRtls = {}));
