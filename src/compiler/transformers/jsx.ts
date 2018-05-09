/*@internal*/
namespace ts {
    export function transformJsx(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        let currentSourceFile: SourceFile;

        return chainBundle(transformSourceFile);

        /**
         * Transform JSX-specific syntax in a SourceFile.
         *
         * @param node A SourceFile node.
         */
        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            currentSourceFile = node;
            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            if (node.transformFlags & TransformFlags.ContainsJsx) {
                return visitorWorker(node);
            }
            else {
                return node;
            }
        }

        function visitorWorker(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.JsxElement:
                    return visitJsxElement(<JsxElement>node, /*isChild*/ false);

                case SyntaxKind.JsxSelfClosingElement:
                    return visitJsxSelfClosingElement(<JsxSelfClosingElement>node, /*isChild*/ false);

                case SyntaxKind.JsxFragment:
                    return visitJsxFragment(<JsxFragment>node, /*isChild*/ false);

                case SyntaxKind.JsxExpression:
                    return visitJsxExpression(<JsxExpression>node);

                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function transformJsxChildToExpression(node: JsxChild): Expression {
            switch (node.kind) {
                case SyntaxKind.JsxText:
                    return visitJsxText(node);

                case SyntaxKind.JsxExpression:
                    return visitJsxExpression(node);

                case SyntaxKind.JsxElement:
                    return visitJsxElement(node, /*isChild*/ true);

                case SyntaxKind.JsxSelfClosingElement:
                    return visitJsxSelfClosingElement(node, /*isChild*/ true);

                case SyntaxKind.JsxFragment:
                    return visitJsxFragment(node, /*isChild*/ true);

                default:
                    return Debug.failBadSyntaxKind(node);
            }
        }

        function visitJsxElement(node: JsxElement, isChild: boolean) {
            return visitJsxOpeningLikeElement(node.openingElement, node.children, isChild, /*location*/ node);
        }

        function visitJsxSelfClosingElement(node: JsxSelfClosingElement, isChild: boolean) {
            return visitJsxOpeningLikeElement(node, /*children*/ undefined, isChild, /*location*/ node);
        }

        function visitJsxFragment(node: JsxFragment, isChild: boolean) {
            return visitJsxOpeningFragment(node.openingFragment, node.children, isChild, /*location*/ node);
        }

        function visitJsxOpeningLikeElement(node: JsxOpeningLikeElement, children: ReadonlyArray<JsxChild>, isChild: boolean, location: TextRange) {
            const tagName = getTagName(node);
            let objectProperties: Expression;
            const attrs = node.attributes.properties;
            if (attrs.length === 0) {
                // When there are no attributes, React wants "null"
                objectProperties = createNull();
            }
            else {
                // Map spans of JsxAttribute nodes into object literals and spans
                // of JsxSpreadAttribute nodes into expressions.
                const segments = flatten<Expression | ObjectLiteralExpression>(
                    spanMap(attrs, isJsxSpreadAttribute, (attrs, isSpread) => isSpread
                        ? map(attrs, transformJsxSpreadAttributeToExpression)
                        : createObjectLiteral(map(attrs, transformJsxAttributeToObjectLiteralElement))
                    )
                );

                if (isJsxSpreadAttribute(attrs[0])) {
                    // We must always emit at least one object literal before a spread
                    // argument.
                    segments.unshift(createObjectLiteral());
                }

                // Either emit one big object literal (no spread attribs), or
                // a call to the __assign helper.
                objectProperties = singleOrUndefined(segments);
                if (!objectProperties) {
                    objectProperties = createAssignHelper(context, segments);
                }
            }

            const element = createExpressionForJsxElement(
                context.getEmitResolver().getJsxFactoryEntity(currentSourceFile),
                compilerOptions.reactNamespace,
                tagName,
                objectProperties,
                mapDefined(children, transformJsxChildToExpression),
                node,
                location
            );

            if (isChild) {
                startOnNewLine(element);
            }

            return element;
        }

        function visitJsxOpeningFragment(node: JsxOpeningFragment, children: ReadonlyArray<JsxChild>, isChild: boolean, location: TextRange) {
            const element = createExpressionForJsxFragment(
                context.getEmitResolver().getJsxFactoryEntity(currentSourceFile),
                compilerOptions.reactNamespace,
                mapDefined(children, transformJsxChildToExpression),
                node,
                location
            );

            if (isChild) {
                startOnNewLine(element);
            }

            return element;
        }

        function transformJsxSpreadAttributeToExpression(node: JsxSpreadAttribute) {
            return visitNode(node.expression, visitor, isExpression);
        }

        function transformJsxAttributeToObjectLiteralElement(node: JsxAttribute) {
            const name = getAttributeName(node);
            const expression = transformJsxAttributeInitializer(node.initializer);
            return createPropertyAssignment(name, expression);
        }

        function transformJsxAttributeInitializer(node: StringLiteral | JsxExpression) {
            if (node === undefined) {
                return createTrue();
            }
            else if (node.kind === SyntaxKind.StringLiteral) {
                // Always recreate the literal to escape any escape sequences or newlines which may be in the original jsx string and which
                // Need to be escaped to be handled correctly in a normal string
                const literal = createLiteral(tryDecodeEntities(node.text) || node.text);
                literal.singleQuote = node.singleQuote !== undefined ? node.singleQuote : !isStringDoubleQuoted(node, currentSourceFile);
                return setTextRange(literal, node);
            }
            else if (node.kind === SyntaxKind.JsxExpression) {
                if (node.expression === undefined) {
                    return createTrue();
                }
                return visitJsxExpression(node);
            }
            else {
                return Debug.failBadSyntaxKind(node);
            }
        }

        function visitJsxText(node: JsxText): StringLiteral | undefined {
            const fixed = fixupWhitespaceAndDecodeEntities(getTextOfNode(node, /*includeTrivia*/ true));
            return fixed === undefined ? undefined : createLiteral(fixed);
        }

        /**
         * JSX trims whitespace at the end and beginning of lines, except that the
         * start/end of a tag is considered a start/end of a line only if that line is
         * on the same line as the closing tag. See examples in
         * tests/cases/conformance/jsx/tsxReactEmitWhitespace.tsx
         * See also https://www.w3.org/TR/html4/struct/text.html#h-9.1 and https://www.w3.org/TR/CSS2/text.html#white-space-model
         *
         * An equivalent algorithm would be:
         * - If there is only one line, return it.
         * - If there is only whitespace (but multiple lines), return `undefined`.
         * - Split the text into lines.
         * - 'trimRight' the first line, 'trimLeft' the last line, 'trim' middle lines.
         * - Decode entities on each line (individually).
         * - Remove empty lines and join the rest with " ".
         */
        function fixupWhitespaceAndDecodeEntities(text: string): string | undefined {
            let acc: string | undefined;
            // First non-whitespace character on this line.
            let firstNonWhitespace = 0;
            // Last non-whitespace character on this line.
            let lastNonWhitespace = -1;
            // These initial values are special because the first line is:
            // firstNonWhitespace = 0 to indicate that we want leading whitsepace,
            // but lastNonWhitespace = -1 as a special flag to indicate that we *don't* include the line if it's all whitespace.

            for (let i = 0; i < text.length; i++) {
                const c = text.charCodeAt(i);
                if (isLineBreak(c)) {
                    // If we've seen any non-whitespace characters on this line, add the 'trim' of the line.
                    // (lastNonWhitespace === -1 is a special flag to detect whether the first line is all whitespace.)
                    if (firstNonWhitespace !== -1 && lastNonWhitespace !== -1) {
                        acc = addLineOfJsxText(acc, text.substr(firstNonWhitespace, lastNonWhitespace - firstNonWhitespace + 1));
                    }

                    // Reset firstNonWhitespace for the next line.
                    // Don't bother to reset lastNonWhitespace because we ignore it if firstNonWhitespace = -1.
                    firstNonWhitespace = -1;
                }
                else if (!isWhiteSpaceSingleLine(c)) {
                    lastNonWhitespace = i;
                    if (firstNonWhitespace === -1) {
                        firstNonWhitespace = i;
                    }
                }
            }

            return firstNonWhitespace !== -1
                // Last line had a non-whitespace character. Emit the 'trimLeft', meaning keep trailing whitespace.
                ? addLineOfJsxText(acc, text.substr(firstNonWhitespace))
                // Last line was all whitespace, so ignore it
                : acc;
        }

        function addLineOfJsxText(acc: string | undefined, trimmedLine: string): string {
            // We do not escape the string here as that is handled by the printer
            // when it emits the literal. We do, however, need to decode JSX entities.
            const decoded = decodeEntities(trimmedLine);
            return acc === undefined ? decoded : acc + " " + decoded;
        }

        /**
         * Replace entities like "&nbsp;", "&#123;", and "&#xDEADBEEF;" with the characters they encode.
         * See https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
         */
        function decodeEntities(text: string): string {
            return text.replace(/&((#((\d+)|x([\da-fA-F]+)))|(\w+));/g, (match, _all, _number, _digits, decimal, hex, word) => {
                if (decimal) {
                    return String.fromCharCode(parseInt(decimal, 10));
                }
                else if (hex) {
                    return String.fromCharCode(parseInt(hex, 16));
                }
                else {
                    const ch = entities.get(word);
                    // If this is not a valid entity, then just use `match` (replace it with itself, i.e. don't replace)
                    return ch ? String.fromCharCode(ch) : match;
                }
            });
        }

        /** Like `decodeEntities` but returns `undefined` if there were no entities to decode. */
        function tryDecodeEntities(text: string): string | undefined {
            const decoded = decodeEntities(text);
            return decoded === text ? undefined : decoded;
        }

        function getTagName(node: JsxElement | JsxOpeningLikeElement): Expression {
            if (node.kind === SyntaxKind.JsxElement) {
                return getTagName(node.openingElement);
            }
            else {
                const name = node.tagName;
                if (isIdentifier(name) && isIntrinsicJsxName(name.escapedText)) {
                    return createLiteral(idText(name));
                }
                else {
                    return createExpressionFromEntityName(name);
                }
            }
        }

        /**
         * Emit an attribute name, which is quoted if it needs to be quoted. Because
         * these emit into an object literal property name, we don't need to be worried
         * about keywords, just non-identifier characters
         */
        function getAttributeName(node: JsxAttribute): StringLiteral | Identifier {
            const name = node.name;
            const text = idText(name);
            if (/^[A-Za-z_]\w*$/.test(text)) {
                return name;
            }
            else {
                return createLiteral(text);
            }
        }

        function visitJsxExpression(node: JsxExpression) {
            return visitNode(node.expression, visitor, isExpression);
        }
    }

    const entities = createMapFromTemplate<number>({
        quot: 0x0022,
        amp: 0x0026,
        apos: 0x0027,
        lt: 0x003C,
        gt: 0x003E,
        nbsp: 0x00A0,
        iexcl: 0x00A1,
        cent: 0x00A2,
        pound: 0x00A3,
        curren: 0x00A4,
        yen: 0x00A5,
        brvbar: 0x00A6,
        sect: 0x00A7,
        uml: 0x00A8,
        copy: 0x00A9,
        ordf: 0x00AA,
        laquo: 0x00AB,
        not: 0x00AC,
        shy: 0x00AD,
        reg: 0x00AE,
        macr: 0x00AF,
        deg: 0x00B0,
        plusmn: 0x00B1,
        sup2: 0x00B2,
        sup3: 0x00B3,
        acute: 0x00B4,
        micro: 0x00B5,
        para: 0x00B6,
        middot: 0x00B7,
        cedil: 0x00B8,
        sup1: 0x00B9,
        ordm: 0x00BA,
        raquo: 0x00BB,
        frac14: 0x00BC,
        frac12: 0x00BD,
        frac34: 0x00BE,
        iquest: 0x00BF,
        Agrave: 0x00C0,
        Aacute: 0x00C1,
        Acirc: 0x00C2,
        Atilde: 0x00C3,
        Auml: 0x00C4,
        Aring: 0x00C5,
        AElig: 0x00C6,
        Ccedil: 0x00C7,
        Egrave: 0x00C8,
        Eacute: 0x00C9,
        Ecirc: 0x00CA,
        Euml: 0x00CB,
        Igrave: 0x00CC,
        Iacute: 0x00CD,
        Icirc: 0x00CE,
        Iuml: 0x00CF,
        ETH: 0x00D0,
        Ntilde: 0x00D1,
        Ograve: 0x00D2,
        Oacute: 0x00D3,
        Ocirc: 0x00D4,
        Otilde: 0x00D5,
        Ouml: 0x00D6,
        times: 0x00D7,
        Oslash: 0x00D8,
        Ugrave: 0x00D9,
        Uacute: 0x00DA,
        Ucirc: 0x00DB,
        Uuml: 0x00DC,
        Yacute: 0x00DD,
        THORN: 0x00DE,
        szlig: 0x00DF,
        agrave: 0x00E0,
        aacute: 0x00E1,
        acirc: 0x00E2,
        atilde: 0x00E3,
        auml: 0x00E4,
        aring: 0x00E5,
        aelig: 0x00E6,
        ccedil: 0x00E7,
        egrave: 0x00E8,
        eacute: 0x00E9,
        ecirc: 0x00EA,
        euml: 0x00EB,
        igrave: 0x00EC,
        iacute: 0x00ED,
        icirc: 0x00EE,
        iuml: 0x00EF,
        eth: 0x00F0,
        ntilde: 0x00F1,
        ograve: 0x00F2,
        oacute: 0x00F3,
        ocirc: 0x00F4,
        otilde: 0x00F5,
        ouml: 0x00F6,
        divide: 0x00F7,
        oslash: 0x00F8,
        ugrave: 0x00F9,
        uacute: 0x00FA,
        ucirc: 0x00FB,
        uuml: 0x00FC,
        yacute: 0x00FD,
        thorn: 0x00FE,
        yuml: 0x00FF,
        OElig: 0x0152,
        oelig: 0x0153,
        Scaron: 0x0160,
        scaron: 0x0161,
        Yuml: 0x0178,
        fnof: 0x0192,
        circ: 0x02C6,
        tilde: 0x02DC,
        Alpha: 0x0391,
        Beta: 0x0392,
        Gamma: 0x0393,
        Delta: 0x0394,
        Epsilon: 0x0395,
        Zeta: 0x0396,
        Eta: 0x0397,
        Theta: 0x0398,
        Iota: 0x0399,
        Kappa: 0x039A,
        Lambda: 0x039B,
        Mu: 0x039C,
        Nu: 0x039D,
        Xi: 0x039E,
        Omicron: 0x039F,
        Pi: 0x03A0,
        Rho: 0x03A1,
        Sigma: 0x03A3,
        Tau: 0x03A4,
        Upsilon: 0x03A5,
        Phi: 0x03A6,
        Chi: 0x03A7,
        Psi: 0x03A8,
        Omega: 0x03A9,
        alpha: 0x03B1,
        beta: 0x03B2,
        gamma: 0x03B3,
        delta: 0x03B4,
        epsilon: 0x03B5,
        zeta: 0x03B6,
        eta: 0x03B7,
        theta: 0x03B8,
        iota: 0x03B9,
        kappa: 0x03BA,
        lambda: 0x03BB,
        mu: 0x03BC,
        nu: 0x03BD,
        xi: 0x03BE,
        omicron: 0x03BF,
        pi: 0x03C0,
        rho: 0x03C1,
        sigmaf: 0x03C2,
        sigma: 0x03C3,
        tau: 0x03C4,
        upsilon: 0x03C5,
        phi: 0x03C6,
        chi: 0x03C7,
        psi: 0x03C8,
        omega: 0x03C9,
        thetasym: 0x03D1,
        upsih: 0x03D2,
        piv: 0x03D6,
        ensp: 0x2002,
        emsp: 0x2003,
        thinsp: 0x2009,
        zwnj: 0x200C,
        zwj: 0x200D,
        lrm: 0x200E,
        rlm: 0x200F,
        ndash: 0x2013,
        mdash: 0x2014,
        lsquo: 0x2018,
        rsquo: 0x2019,
        sbquo: 0x201A,
        ldquo: 0x201C,
        rdquo: 0x201D,
        bdquo: 0x201E,
        dagger: 0x2020,
        Dagger: 0x2021,
        bull: 0x2022,
        hellip: 0x2026,
        permil: 0x2030,
        prime: 0x2032,
        Prime: 0x2033,
        lsaquo: 0x2039,
        rsaquo: 0x203A,
        oline: 0x203E,
        frasl: 0x2044,
        euro: 0x20AC,
        image: 0x2111,
        weierp: 0x2118,
        real: 0x211C,
        trade: 0x2122,
        alefsym: 0x2135,
        larr: 0x2190,
        uarr: 0x2191,
        rarr: 0x2192,
        darr: 0x2193,
        harr: 0x2194,
        crarr: 0x21B5,
        lArr: 0x21D0,
        uArr: 0x21D1,
        rArr: 0x21D2,
        dArr: 0x21D3,
        hArr: 0x21D4,
        forall: 0x2200,
        part: 0x2202,
        exist: 0x2203,
        empty: 0x2205,
        nabla: 0x2207,
        isin: 0x2208,
        notin: 0x2209,
        ni: 0x220B,
        prod: 0x220F,
        sum: 0x2211,
        minus: 0x2212,
        lowast: 0x2217,
        radic: 0x221A,
        prop: 0x221D,
        infin: 0x221E,
        ang: 0x2220,
        and: 0x2227,
        or: 0x2228,
        cap: 0x2229,
        cup: 0x222A,
        int: 0x222B,
        there4: 0x2234,
        sim: 0x223C,
        cong: 0x2245,
        asymp: 0x2248,
        ne: 0x2260,
        equiv: 0x2261,
        le: 0x2264,
        ge: 0x2265,
        sub: 0x2282,
        sup: 0x2283,
        nsub: 0x2284,
        sube: 0x2286,
        supe: 0x2287,
        oplus: 0x2295,
        otimes: 0x2297,
        perp: 0x22A5,
        sdot: 0x22C5,
        lceil: 0x2308,
        rceil: 0x2309,
        lfloor: 0x230A,
        rfloor: 0x230B,
        lang: 0x2329,
        rang: 0x232A,
        loz: 0x25CA,
        spades: 0x2660,
        clubs: 0x2663,
        hearts: 0x2665,
        diams: 0x2666
    });
}