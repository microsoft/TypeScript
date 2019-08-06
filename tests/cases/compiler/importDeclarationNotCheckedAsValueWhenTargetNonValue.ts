// @filename: file.d.ts
declare namespace dojox {
    namespace charting {
        namespace axis2d {
            export class Val { }
            interface common {
                createText: object;
            }
            namespace common {
                interface createText {
                    gfx(): string
                }
            }
        }
    }
}
declare module "dojox/charting/axis2d/common.createText" {
    import exp = dojox.charting.axis2d.common
    export = exp;
}