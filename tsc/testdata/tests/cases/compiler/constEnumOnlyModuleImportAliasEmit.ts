// @target: esnext
// @module: esnext
// @moduleResolution: bundler

// @filename: mappa.ts
namespace OnRtls.Mappa {
    export const enum TipoCamera { Camera2D = 1, Camera3D = 2 }
    export class MappaViewModel {
        constructor(public canvas: any, public config: any, public tipo: TipoCamera) {}
    }
}

// @filename: types.d.ts
declare namespace OnRtls.Mappa.Server {
    const enum SomeFlag { A = 0 }
}

// @filename: sensmap.ts
namespace OnRtls.Carrello.Home {
    import mappa = OnRtls.Mappa;
    export class SensmapViewModel {
        constructor() {
            var x = new mappa.MappaViewModel(null, null, mappa.TipoCamera.Camera3D);
        }
    }
}
