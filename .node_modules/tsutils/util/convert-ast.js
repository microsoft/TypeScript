"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var util_1 = require("./util");
function convertAst(sourceFile) {
    var wrapped = {
        node: sourceFile,
        parent: undefined,
        kind: ts.SyntaxKind.SourceFile,
        children: [],
        next: undefined,
        skip: undefined,
    };
    var flat = [];
    var current = wrapped;
    var previous = current;
    ts.forEachChild(sourceFile, function wrap(node) {
        flat.push(node);
        var parent = current;
        previous.next = current = {
            node: node,
            parent: parent,
            kind: node.kind,
            children: [],
            next: undefined,
            skip: undefined,
        };
        if (previous !== parent)
            setSkip(previous, current);
        previous = current;
        parent.children.push(current);
        if (util_1.isNodeKind(node.kind))
            ts.forEachChild(node, wrap);
        current = parent;
    });
    return {
        wrapped: wrapped,
        flat: flat,
    };
}
exports.convertAst = convertAst;
function setSkip(node, skip) {
    do {
        node.skip = skip;
        node = node.parent;
    } while (node !== skip.parent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb252ZXJ0LWFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFpQztBQUNqQywrQkFBb0M7QUFtQ3BDLG9CQUEyQixVQUF5QjtJQUNoRCxJQUFNLE9BQU8sR0FBZTtRQUN4QixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsU0FBUztRQUNqQixJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVO1FBQzlCLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFPLFNBQVM7UUFDcEIsSUFBSSxFQUFFLFNBQVM7S0FDbEIsQ0FBQztJQUNGLElBQU0sSUFBSSxHQUFjLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBYSxPQUFPLENBQUM7SUFDaEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLGNBQWMsSUFBSTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUN2QixRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRztZQUN0QixJQUFJLE1BQUE7WUFDSixNQUFNLFFBQUE7WUFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsRUFBRTtZQUNaLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUNGLElBQUksUUFBUSxLQUFLLE1BQU07WUFDbkIsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQixRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksaUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0gsT0FBTyxTQUFBO1FBQ1AsSUFBSSxNQUFBO0tBQ1AsQ0FBQztBQUNOLENBQUM7QUF2Q0QsZ0NBdUNDO0FBRUQsaUJBQWlCLElBQWMsRUFBRSxJQUFjO0lBQzNDLEdBQUc7UUFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU8sQ0FBQztLQUN2QixRQUFRLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ25DLENBQUMifQ==