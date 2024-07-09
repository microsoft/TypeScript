/* taken from mongoose.Document */
interface Document {
    increment(): this;
}

/* our custom model extends the mongoose document */
interface CustomDocument extends Document { }

export class Example<Z extends CustomDocument> {
    constructor() {
        // types of increment not compatible??
        this.test<Z>();
    }

    public test<Z extends Document>() { }
}
