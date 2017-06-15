export class TextWriter {
    private text: string;
    private eol: string;
    private indents = ["", "    "];
    private indentDepth = 0;
    private indentRequested = true;

    constructor(text?: string, options?: { eol?: string }) {
        this.text = text || "";
        this.eol = options && options.eol || "\r\n";
    }

    public get size() {
        return this.text.length;
    }

    public write(text?: string) {
        if (text) {
            this.writeIndent();
            this.text += text;
        }
        return this;
    }

    public writeln(text?: string) {
        this.write(text);
        this.text += this.eol;
        this.indentRequested = true;
        return this;
    }

    public increaseIndent() {
        this.indentDepth++;
        return this;
    }

    public decreaseIndent() {
        this.indentDepth = Math.max(0, this.indentDepth - 1);
        return this;
    }

    public toString() {
        return this.text;
    }

    public clear() {
        this.text = "";
        this.indentRequested = true;
        this.indentDepth = 0;
    }

    private writeIndent() {
        if (!this.indentRequested) return;
        while (this.indents.length <= this.indentDepth) {
            this.indents[this.indents.length] = this.indents[this.indents.length - 1] + this.indents[1];
        }
        if (this.indentDepth) this.text += this.indents[this.indentDepth];
        this.indentRequested = false;
    }
}