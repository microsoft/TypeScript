//// [tests/cases/compiler/moduleAndInterfaceSharingName4.ts] ////

//// [moduleAndInterfaceSharingName4.ts]
declare namespace D3 {
    var x: D3.Color.Color;

    namespace Color {
        export interface Color {
            darker: Color;
        }
    }
}

//// [moduleAndInterfaceSharingName4.js]
