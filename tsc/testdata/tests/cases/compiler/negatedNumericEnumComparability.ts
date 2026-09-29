// @strict: true
// @noEmit: true

enum Position {
    Invalid = -1,
    Start = 0,
}

function comparePositions(position: number, other: number) {
    if (position !== Position.Invalid) {
        position === other;
        other === position;
        position === Position.Invalid;
    }
}

declare const position: number & not Position.Invalid;
declare const other: number;
position === other;
other === position;
position === Position.Invalid;