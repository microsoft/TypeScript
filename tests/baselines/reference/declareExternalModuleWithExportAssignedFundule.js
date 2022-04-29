//// [declareExternalModuleWithExportAssignedFundule.ts]
declare module "express" {

    export = express;

    function express(): express.ExpressServer;

    module express {

        export interface ExpressServer {

            enable(name: string): ExpressServer;

            post(path: RegExp, handler: (req: Function) => void ): void;

        }

        export class ExpressServerRequest {

        }

    }

}


//// [declareExternalModuleWithExportAssignedFundule.js]
