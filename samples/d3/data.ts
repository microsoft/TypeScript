///<reference path="d3.d.ts" />
"use strict";

interface IDataSeries {
    desc: string;
    data: IRun[];
}

interface IRun {
    date: Date;
    pass: boolean;
}

interface IPerfDataSeries {
    desc: string;
    data: IPerfRun[];
}

interface IPerfRun {
    x: Date;
    y: number;
}

module Chart {
    
    export class Base {
        public iso8601 = d3.time.format('%Y-%m-%d');
        public chartWidth = 800;
        
        constructor (public element) { }
    }

    export class Bar extends Base {
        public element: ID3Selection;
        constructor(element: ID3Selection) {
            super(element);
            this.element = element;
        }
                     
        public chartHeight = 400;
        public chartWidth = 800;
        public legendItemHeight = 30;
        public legendWidth = 150;
        public colors = ['rgb(0, 113, 188)', 'rgb(0, 174, 239)', 'rgb(145, 0, 145)'];
        public xAxisHashHeight = 10;
        public layout = 'wiggle';


        public render(data: IPerfDataSeries[]) {

            // Create stack layout
            var stackLayout = d3.layout.stack()
                                .values(function(d) { return d.data })
                                .offset(this.layout);

            var stackData = stackLayout(data);

            // Maximum measurement in the dataset
            var maxY = d3.max(stackData, (d) => d3.max<any, any>(d.data, (d) => d.y0 + d.y));

            // Earliest day in the dataset
            var minX = d3.min(data, (d) => d3.min(d.data, (d) => d.x));

            // All days in the dataset (from earliest day until now)
            var days = d3.time.days(minX, new Date());
            
            // Area of the region containing the bars
            var areaWidth = this.chartWidth - this.legendWidth;

            var barWidth = areaWidth / days.length;
            
            // Create scales for X and Y axis (X based on dates, Y based on performance data)
            var x = d3.time.scale()
                        .domain([minX, d3.time.day(d3.time.day.offset(new Date(), 1))])
                        .range([0, this.chartWidth - this.legendWidth]);
            var y = d3.scale.linear()
                        .domain([0, maxY])
                        .range([0, this.chartHeight]);
            var ticks = x.ticks(d3.time.mondays, 1);

            // SVG element
            var svg = this.element.append('svg')
                        .attr('height', this.chartHeight + 25)
                        .attr('width', this.chartWidth);
            
            // Groups that contain bar segments for each dataset
            var barGroups = svg.selectAll('g.bars')
                    .data(stackData)
                .enter().append('g')
                    .attr('class', 'bars')
                    .style('fill', (d, i) => this.colors[<number>i])
                    .attr('transform', 'translate(' + this.legendWidth + ', 0)');

            // Legend
            var legendGroup = svg.append('g')
                    .attr('class', 'legend')

            // Legend items
            var legendItem = legendGroup.selectAll('g.legendItem')
                    .data(stackData)
               .enter().append('g')
                    .attr('class', 'legendItem')
                    .style('fill', (d, i) => this.colors[<number>i])
                    .attr('transform', (d, i) => 'translate(0, ' + (this.legendItemHeight * (2 - i)) + ')');
                    
            legendItem.append('rect')
                        .attr('width', 25)
                        .attr('height', 25);
                        
            legendItem.append('text')
                .text((d) => d.desc)
                .attr('x', 30)
                .attr('dy', '1em');
            
                    
            // Bars
            var rects = barGroups.selectAll('rect')
                            .data((d) => d.data)
                        .enter()
                            .append('rect')
                            .attr('x', (d, i) => x(d.x))
                            .attr('y', (d, i) => this.chartHeight - y(d.y + d.y0))
                            .attr('width', barWidth)
                            .attr('height', (d, i) => y(d.y));
                            
            // Add title (mouseover popup) to bars           
            rects.append('title')
                 .text((d) => this.iso8601(d.x) + ' - ' + d.y + 'ms');
                 

            // Add an axis marker to the bottom
            var axis = d3.svg.axis();
            axis.scale(x)
                .ticks(d3.time.mondays, 1)
                .tickSubdivide(6)
                .tickFormat(this.iso8601)
                .tickSize(10, 5, 0);
                             
            var axisGroup = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(' + this.legendWidth + ',' + this.chartHeight + ')')
                    .call(axis);

        }
    }
    
    export class DailyBuild extends Base {
        public element: ID3Selection;
        constructor (element: ID3Selection) {
            super(element);
            this.element = element;
        }

        public labelWidth = 140;
        public labelGutter = 10;
        public chartWidth = 800;

        private getTextDataString(data) {
            return data.pass ? 'pass' : 'fail';      
        }
        
        public render(data: IDataSeries[]) {
            // Minimum date in the dataset
            var minDate = d3.min(data.map(function(d) { return d3.time.day(d.data[0].date) }));
            
            // All the days in the dataset, from min until now.
            var days = d3.time.days(minDate, new Date());

            var boxSize = (this.chartWidth - this.labelWidth - this.labelGutter) / days.length;
            
            // Create our scales for x and y axis
            var x = d3.time.scale()
                        .domain([minDate, d3.time.day(new Date())])
                        .range([0, boxSize * (days.length - 1)]);
                        
            var y = d3.scale.linear()
                        .domain([0, 1])
                        .range([0, boxSize]);


            // SVG element                      
            var svg = this.element.append('svg')
                            .attr('height', y(data.length  + 1))
                            .attr('width', this.chartWidth);
                            
            svg.selectAll('text')
               .data(data)
               .enter().append('text')
                   .attr('x', this.labelWidth)
                   .attr('transform', function(d, i) { return 'translate(0,' + y(i) + ')' })
                   .attr('dy', '1em')
                   .attr('text-anchor', 'end')
                   .text(function(d) { return d.desc });

            // Groups of boxes for updated builds
            var g = svg.selectAll('g.boxes')
                    .data(data)
                .enter().append('g')
                    .attr('class', 'boxes')
                    .attr('transform', function(d, i) { return 'translate(0,' + y(i) + ')' });
            
            // Boxes of build info
            var rects = g.selectAll('rect')
                    .data(function(d, i) { return d.data; })
                .enter().append('rect')
                    .attr('class', (d) => 'day ' + this.getTextDataString(d))
                    .attr('x', (d, i) => this.labelWidth + this.labelGutter + x(d.date))
                    .attr('width', boxSize)
                    .attr('height', boxSize);
    
            rects.append('title')
                 .text( (d) => this.iso8601(d.date) + ' - ' + this.getTextDataString(d) );
           
            var ticks = x.ticks(d3.time.mondays, 1);
            
            // Date text boxes
            svg.append('g').attr('class', 'dates').selectAll('text')
                    .data(ticks)
                    .enter().append('text')
                        .text((d) => this.iso8601(d) )
                        .attr('transform', (d, i) => 'translate(' + (this.labelWidth + this.labelGutter + x(d) + 5) + ', ' + y(data.length + 1) + ')')
                        .attr('text-anchor', 'start')
            
            // Vertical hashes at week boundaries
            svg.append('g').attr('class', 'hashes').selectAll('line')
                .data(ticks)
                .enter().append('line')
                    .attr('x1', (d) => this.labelWidth + this.labelGutter + x(d) )
                    .attr('x2', (d) => this.labelWidth + this.labelGutter + x(d) )
                    .attr('y1', 0)
                    .attr('y2', y(data.length + 1));

            return svg;
        }
    }
}

var start = d3.time.day.offset(new Date(), -30);
var end = new Date()
var days = d3.time.days(start, end);

var buildData: IRun[] = days.map(day => ({ date: day, pass: Math.random() > 0.1 }));
var compilerTestData: IRun[] = days.map(day => ({ date: day, pass: Math.random() > 0.1 }));
var servicesTestData: IRun[] = days.map(day => ({ date: day, pass: Math.random() > 0.1 }));

function decreasingRandom(start: number, deviation: number, factor: number) {
    var factorRandom = d3.random.normal(factor, 0.05);

    return function () {
        var random = d3.random.normal(start, deviation)();
        start = start * factorRandom();

        return parseFloat(random.toFixed())
    }
}

var parseRandom = decreasingRandom(400, 20, 0.97);
var typecheckRandom = decreasingRandom(500, 20, 0.97);
var emitRandom = decreasingRandom(100, 10, 0.97);

var parseData: IPerfRun[] = days.map(day => ({ x: day, y: parseRandom() }));
var typecheckData: IPerfRun[] = days.map(day => ({ x: day, y: typecheckRandom() }));
var emitData: IPerfRun[] = days.map(day => ({ x: day, y: emitRandom() }));

document.addEventListener('DOMContentLoaded', function () {
    var chart = new Chart.DailyBuild(d3.select('#passchart'));

    chart.render([
        { desc: "Build Status", data: buildData },
        { desc: "Compiler Tests", data: compilerTestData },
        { desc: "Services Tests", data: servicesTestData },
    ]);

    var normalizedData = [
        { desc: 'Emit', data: emitData },
        { desc: 'Typecheck', data: typecheckData },
        { desc: 'Parse', data: parseData }
    ]

    var perfchart = new Chart.Bar(d3.select('#performanceChart'));
    perfchart.render(normalizedData);
});
