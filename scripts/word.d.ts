declare namespace Word {
    export interface Collection<T> {
        count: number;
        item(index: number): T;
    }

    export interface Font {
        bold: boolean;
        italic: boolean;
        subscript: boolean;
        superscript: boolean;
    }

    export interface Find {
        font: Font;
        format: boolean;
        replacement: Replacement;
        style: any;
        text: string;
        clearFormatting(): void;
        execute(
            findText: string,
            matchCase: boolean,
            matchWholeWord: boolean,
            matchWildcards: boolean,
            matchSoundsLike: boolean,
            matchAllWordForms: boolean,
            forward: boolean,
            wrap: number,
            format: boolean,
            replaceWith: string,
            replace: number): boolean;
    }

    export interface Replacement {
        font: Font;
        style: any;
        text: string;
        clearFormatting(): void;
    }

    export interface ListFormat {
        listLevelNumber: number;
        listString: string;
    }

    export interface Column {
    }

    export interface Columns extends Collection<Column> {
    }

    export interface Table {
        columns: Columns;
    }

    export interface Tables extends Collection<Table> {
    }

    export interface Range {
        find: Find;
        listFormat: ListFormat;
        tables: Tables;
        text: string;
        textRetrievalMode: {
            includeHiddenText: boolean;
        }
        words: Ranges;
    }

    export interface Ranges extends Collection<Range> {
    }

    export interface Style {
        nameLocal: string;
    }

    export interface Paragraph {
        alignment: number;
        range: Range;
        style: Style;
        next(): Paragraph;
    }

    export interface Paragraphs extends Collection<Paragraph> {
        first: Paragraph;
    }

    export interface Field {
    }

    export interface Fields extends Collection<Field> {
        toggleShowCodes(): void;
    }

    export interface Hyperlink {
        address: string;
        textToDisplay: string;
        range: Range;
    }

    export interface Hyperlinks extends Collection<Hyperlink> {
    }

    export interface Document {
        fields: Fields;
        paragraphs: Paragraphs;
        hyperlinks: Hyperlinks;
        builtInDocumentProperties: Collection<any>;
        close(saveChanges: boolean): void;
        range(): Range;
    }

    export interface Documents extends Collection<Document> {
        open(filename: string): Document;
    }

    export interface Application {
        documents: Documents;
        quit(): void;
    }
}
