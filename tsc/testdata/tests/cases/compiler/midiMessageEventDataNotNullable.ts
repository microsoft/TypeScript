// @strict: true
// @lib: dom,es2015

declare const input: MIDIInput;

input.onmidimessage = (event) => {
    // `data` should not be nullable, so this should not error.
    event.data[0];
};
