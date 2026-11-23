// @strict: true
class Decoder {
    remaining = 0;
    consume(size: number) {
        if (this.remaining === 0 || size === 0) return;
        this.remaining -= size;
    }
}
