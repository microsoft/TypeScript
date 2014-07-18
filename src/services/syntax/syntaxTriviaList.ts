///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxTriviaList {
        parent?: ISyntaxToken;

        isShared(): boolean;

        count(): number;
        syntaxTriviaAt(index: number): ISyntaxTrivia;

        // With of this trivia list.
        fullWidth(): number;

        // Text for this trivia list.
        fullText(): string;

        hasComment(): boolean;
        hasNewLine(): boolean;
        hasSkippedToken(): boolean;

        last(): ISyntaxTrivia;
        toArray(): ISyntaxTrivia[];

        clone(): ISyntaxTriviaList;
    }
}

module TypeScript.Syntax {
    class EmptyTriviaList implements ISyntaxTriviaList {
        public kind() {
            return SyntaxKind.TriviaList;
        }

        public isShared(): boolean {
            return true;
        }

        public count(): number {
            return 0;
        }

        public syntaxTriviaAt(index: number): ISyntaxTrivia {
            throw Errors.argumentOutOfRange("index");
        }

        public last(): ISyntaxTrivia {
            throw Errors.argumentOutOfRange("index");
        }

        public fullWidth(): number {
            return 0;
        }

        public fullText(): string {
            return "";
        }

        public hasComment(): boolean {
            return false;
        }

        public hasNewLine(): boolean {
            return false;
        }

        public hasSkippedToken(): boolean {
            return false;
        }

        public toArray(): ISyntaxTrivia[] {
            return [];
        }

        public clone() {
            return this;
        }
    };

    export var emptyTriviaList: ISyntaxTriviaList = new EmptyTriviaList();

    function isComment(trivia: ISyntaxTrivia): boolean {
        return trivia.kind() === SyntaxKind.MultiLineCommentTrivia || trivia.kind() === SyntaxKind.SingleLineCommentTrivia;
    }

    class SingletonSyntaxTriviaList implements ISyntaxTriviaList {
        private item: ISyntaxTrivia;

        constructor(item: ISyntaxTrivia) {
            this.item = item.clone();
            this.item.parent = this;
        }

        public kind() {
            return SyntaxKind.TriviaList;
        }

        public isShared(): boolean {
            return false;
        }

        public count(): number {
            return 1;
        }

        public syntaxTriviaAt(index: number): ISyntaxTrivia {
            if (index !== 0) {
                throw Errors.argumentOutOfRange("index");
            }

            return this.item;
        }

        public last(): ISyntaxTrivia {
            return this.item;
        }

        public fullWidth(): number {
            return this.item.fullWidth();
        }

        public fullText(): string {
            return this.item.fullText();
        }

        public hasComment(): boolean {
            return isComment(this.item);
        }

        public hasNewLine(): boolean {
            return this.item.kind() === SyntaxKind.NewLineTrivia;
        }

        public hasSkippedToken(): boolean {
            return this.item.kind() === SyntaxKind.SkippedTokenTrivia;
        }

        public toArray(): ISyntaxTrivia[] {
            return [this.item];
        }

        public clone(): ISyntaxTriviaList {
            return new SingletonSyntaxTriviaList(this.item.clone());
        }
    }

    class NormalSyntaxTriviaList implements ISyntaxTriviaList {
        private trivia: ISyntaxTrivia[];

        constructor(trivia: ISyntaxTrivia[]) {
            this.trivia = trivia.map(t => {
                var cloned = t.clone();
                cloned.parent = this;
                return cloned;
            });
        }

        public kind() {
            return SyntaxKind.TriviaList;
        }

        public isShared(): boolean {
            return false;
        }

        public count() {
            return this.trivia.length;
        }

        public syntaxTriviaAt(index: number): ISyntaxTrivia {
            if (index < 0 || index >= this.trivia.length) {
                throw Errors.argumentOutOfRange("index");
            }

            return this.trivia[index];
        }
        
        public last(): ISyntaxTrivia {
            return this.trivia[this.trivia.length - 1];
        }

        public fullWidth(): number {
            return ArrayUtilities.sum(this.trivia, t => t.fullWidth());
        }

        public fullText(): string {
            var result: string[] = [];

            for (var i = 0, n = this.trivia.length; i < n; i++) {
                result.push(this.trivia[i].fullText());
            }

            return result.join("");
        }

        public hasComment(): boolean {
            for (var i = 0; i < this.trivia.length; i++) {
                if (isComment(this.trivia[i])) {
                    return true;
                }
            }

            return false;
        }

        public hasNewLine(): boolean {
            for (var i = 0; i < this.trivia.length; i++) {
                if (this.trivia[i].kind() === SyntaxKind.NewLineTrivia) {
                    return true;
                }
            }

            return false;
        }

        public hasSkippedToken(): boolean {
            for (var i = 0; i < this.trivia.length; i++) {
                if (this.trivia[i].kind() === SyntaxKind.SkippedTokenTrivia) {
                    return true;
                }
            }

            return false;
        }

        public toArray(): ISyntaxTrivia[] {
            return this.trivia.slice(0);
        }

        public clone(): ISyntaxTriviaList {
            return new NormalSyntaxTriviaList(this.trivia.map(t => t.clone()));
        }
    }

    export function triviaList(trivia: ISyntaxTrivia[]): ISyntaxTriviaList {
        if (trivia === undefined || trivia === null || trivia.length === 0) {
            return Syntax.emptyTriviaList;
        }

        if (trivia.length === 1) {
            return new SingletonSyntaxTriviaList(trivia[0]);
        }

        return new NormalSyntaxTriviaList(trivia);
    }
}