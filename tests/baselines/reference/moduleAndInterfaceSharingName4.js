//// [moduleAndInterfaceSharingName4.ts]
declare module D3 {
    var x: D3.Color.Color;

    module Color {
        export interface Color {
            darker: Color;
        }
    }
}

//// [moduleAndInterfaceSharingName4.js]
