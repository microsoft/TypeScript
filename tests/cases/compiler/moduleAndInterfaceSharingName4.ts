declare module D3 {
    var x: D3.Color.Color;

    module Color {
        export interface Color {
            darker: Color;
        }
    }
}