class TestFile {
    public message: string;
    public name: string;
    constructor(message: string) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />

        var getMessage = () => message + this.name;
        this.message = getMessage();
    }
}