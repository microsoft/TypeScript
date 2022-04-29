// @strictNullChecks: true

// Repro for #8401

function f(dim, offsets, arr, acommon, centerAnchorLimit, g, has, lin) {
    var isRtl = this._isRtl();  // chart mirroring
    // prepare variable
    var o = this.opt, ta = this.chart.theme.axis, position = o.position,
        leftBottom = position !== "rightOrTop", rotation = o.rotation % 360,
        start, stop, titlePos, titleRotation = 0, titleOffset, axisVector, tickVector, anchorOffset, labelOffset, labelAlign,
        labelGap = this.chart.theme.axis.tick.labelGap,
        taFont = o.font || (ta.majorTick && ta.majorTick.font) || (ta.tick && ta.tick.font),
        taTitleFont = o.titleFont || (ta.title && ta.title.font),
        taFontColor = o.fontColor || (ta.majorTick && ta.majorTick.fontColor) || (ta.tick && ta.tick.fontColor) || "black",
        taTitleFontColor = o.titleFontColor || (ta.title && ta.title.fontColor) || "black",
        taTitleGap = (o.titleGap == 0) ? 0 : o.titleGap || (ta.title && ta.title.gap) || 15,
        taTitleOrientation = o.titleOrientation || (ta.title && ta.title.orientation) || "axis",
        taMajorTick = this.chart.theme.getTick("major", o),
        taMinorTick = this.chart.theme.getTick("minor", o),
        taMicroTick = this.chart.theme.getTick("micro", o),

        taStroke = "stroke" in o ? o.stroke : ta.stroke,
        size = taFont ? g.normalizedLength(g.splitFontString(taFont).size) : 0,
        cosr = Math.abs(Math.cos(rotation * Math.PI / 180)),
        sinr = Math.abs(Math.sin(rotation * Math.PI / 180)),
        tsize = taTitleFont ? g.normalizedLength(g.splitFontString(taTitleFont).size) : 0;
    if (rotation < 0) {
        rotation += 360;
    }
    var cachedLabelW = this._getMaxLabelSize();
    cachedLabelW = cachedLabelW && cachedLabelW.majLabelW;
    titleOffset = size * cosr + (cachedLabelW || 0) * sinr + labelGap + Math.max(taMajorTick.length > 0 ? taMajorTick.length : 0,
        taMinorTick.length > 0 ? taMinorTick.length : 0) +
        tsize + taTitleGap;
    axisVector = { x: isRtl ? -1 : 1, y: 0 };     // chart mirroring
    switch (rotation) {
        default:
            if (rotation < (90 - centerAnchorLimit)) {
                labelOffset.y = leftBottom ? size : 0;
            } else if (rotation < (90 + centerAnchorLimit)) {
                labelOffset.x = -size * 0.4;
            } else if (rotation < 180) {
                labelOffset.y = leftBottom ? 0 : -size;
            } else if (rotation < (270 - centerAnchorLimit)) {
                labelOffset.y = leftBottom ? 0 : -size;
            } else if (rotation < (270 + centerAnchorLimit)) {
                labelOffset.y = leftBottom ? size * 0.4 : 0;
            } else {
                labelOffset.y = leftBottom ? size : 0;
            }
    }

    titleRotation = (taTitleOrientation && taTitleOrientation == "away") ? 180 : 0;
    titlePos.y = offsets.t - titleOffset + (titleRotation ? 0 : tsize);
    switch (labelAlign) {
        case "start":
            labelAlign = "end";
            break;
        case "end":
            labelAlign = "start";
            break;
        case "middle":
            labelOffset.y -= size;
            break;
    }

    let _ = rotation;
}
