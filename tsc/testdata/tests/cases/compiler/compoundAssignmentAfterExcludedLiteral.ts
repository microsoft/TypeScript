// @strict: true

function append(buffer: { value: string }) {
    if (buffer.value !== "") {
        buffer.value += "\n";
    }
}
