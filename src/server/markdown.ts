/*@internal*/
namespace ts.server.lsp {
    function replaceLinks(text: string): string {
        return text
            // Http(s) links
            .replace(/\{@(link|linkplain|linkcode) (https?:\/\/[^ |}]+?)(?:[| ]([^{}\n]+?))?\}/gi, (_, tag: string, link: string, text?: string) => {
                switch (tag) {
                    case "linkcode":
                        return `[\`${text ? text.trim() : link}\`](${link})`;

                    default:
                        return `[${text ? text.trim() : link}](${link})`;
                }
            });
    }

    function processInlineTags(text: string): string {
        return replaceLinks(text);
    }

    function getTagBodyText(tag: protocol.JSDocTagInfo): string | undefined {
        if (!tag.text) {
            return undefined;
        }

        const tagText = getTagText(tag.text);

        // Convert to markdown code block if it is not already one
        function makeCodeblock(text: string): string {
            if (text.match(/^\s*[~`]{3}/g)) {
                return text;
            }
            return "```\n" + text + "\n```";
        }

        switch (tag.name) {
            case "example":
                // check for caption tags, fix for #79704
                const captionTagMatches = tagText.match(/<caption>(.*?)<\/caption>\s*(\r\n|\n)/);
                if (captionTagMatches && captionTagMatches.index === 0) {
                    return captionTagMatches[1] + "\n\n" + makeCodeblock(tagText.substr(captionTagMatches[0].length));
                }
                else {
                    return makeCodeblock(tagText);
                }
            case "author":
                // fix obsucated email address, #80898
                const emailMatch = tagText.match(/(.+)\s<([-.\w]+@[-.\w]+)>/);

                // eslint-disable-next-line no-null/no-null
                if (emailMatch === null) {
                    return tagText;
                }
                else {
                    return `${emailMatch[1]} ${emailMatch[2]}`;
                }
            case "default":
                return makeCodeblock(tagText);
        }

        return processInlineTags(tagText);
    }

    function getTagText(text: string | SymbolDisplayPart[]) {
        return text as string;  // TODO: successful iff userPreferences.displayPartsForJSDoc is not true
    }

    function getTagDocumentation(tag: protocol.JSDocTagInfo): string | undefined {
        const tagText = getTagText(tag.text || "");
        switch (tag.name) {
            case "augments":
            case "extends":
            case "param":
            case "template":
                const body = (tagText).split(/^(\S+)\s*-?\s*/);
                if (body?.length === 3) {
                    const param = body[1];
                    const doc = body[2];
                    const label = `*@${tag.name}* \`${param}\``;
                    if (!doc) {
                        return label;
                    }
                    return label + (doc.match(/\r\n|\n/g) ? "  \n" + processInlineTags(doc) : ` — ${processInlineTags(doc)}`);
                }
        }

        // Generic tag
        const label = `*@${tag.name}*`;
        const text = getTagBodyText(tag);
        if (!text) {
            return label;
        }
        return label + (text.match(/\r\n|\n/g) ? "  \n" + text : ` — ${text}`);
    }

    export function plain(parts: protocol.SymbolDisplayPart[] | string): string {
        return processInlineTags(
            typeof parts === "string"
                ? parts
                : parts.map(part => part.text).join(""));
    }

    export function tagsMarkdownPreview(tags: protocol.JSDocTagInfo[]): string {
        return tags.map(getTagDocumentation).join("  \n\n");
    }

    export function markdownDocumentation(
        documentation: protocol.SymbolDisplayPart[] | string,
        tags: protocol.JSDocTagInfo[]
    ): MarkupContent {
        const out: MarkupContent = { kind: MarkupKind.Markdown, value: "" };
        addMarkdownDocumentation(out, documentation, tags);
        return out;
    }

    export function addMarkdownDocumentation(
        out: MarkupContent,
        documentation: protocol.SymbolDisplayPart[] | string | undefined,
        tags: protocol.JSDocTagInfo[] | undefined
    ): MarkupContent {
        if (documentation) {
            const documentationText = plain(documentation);
            out.value += documentationText;
        }

        if (tags) {
            const tagsPreview = tagsMarkdownPreview(tags);
            if (tagsPreview) {
                out.value += "\n\n" + tagsPreview;
            }
        }
        return out;
    }

}
