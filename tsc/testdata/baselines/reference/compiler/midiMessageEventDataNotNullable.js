//// [tests/cases/compiler/midiMessageEventDataNotNullable.ts] ////

//// [midiMessageEventDataNotNullable.ts]
declare const input: MIDIInput;

input.onmidimessage = (event) => {
    // `data` should not be nullable, so this should not error.
    event.data[0];
};


//// [midiMessageEventDataNotNullable.js]
"use strict";
input.onmidimessage = (event) => {
    // `data` should not be nullable, so this should not error.
    event.data[0];
};
