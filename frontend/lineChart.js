import * as d3 from 'd3';
import { filteredData, color } from './controller.js'; 


class LineChart {
  constructor(_parentElement) {
    this.parentElement = _parentElement;
    this.initVis = this.initVis.bind(this);
    this.wrangleData = this.wrangleData.bind(this);
    this.updateVis = this.updateVis.bind(this);

    this.initVis();
  }


  initVis() { // Render Static Chart f
    const vis = this; 

    vis.margin = { left: 80, right: 100, top: 30, bottom: 30 };
    vis.height = 350 - vis.margin.top - vis.margin.bottom;
    vis.width = 1370 - vis.margin.left - vis.margin.right; 

    vis.svg = d3.select(vis.parentElement)
      .append('svg')
      .attr('width', vis.width + vis.margin.left + vis.margin.right)
      .attr('height', vis.height + vis.margin.top + vis.margin.bottom);

    vis.g = vis.svg.append('g')
      .attr('transform', 'translate(' + vis.margin.left + ', ' + vis.margin.top + ')');
 
    vis.t = () => d3.transition().duration(1000);

    vis.bisectDate = d3.bisector((d) => d.date).left; // .left returns the lowest position
    // debugger; 

    vis.linePath = vis.g.append('path')
      .attr('class', 'line')
      .attr('fill', 'none') 
      .attr('stroke-width', '3px'); 
 
    vis.yLabel = vis.g.append('text')
      .attr('class', 'y axisLabel')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -140)
      .attr('font-size', '20px')    
      .attr('text-anchor', 'middle')
      .text('Price (USD)');

    vis.x = d3.scaleTime().range([0, vis.width]);
    vis.y = d3.scaleLinear().range([vis.height, 0]);

    vis.yAxisCall = d3.axisLeft()
    vis.xAxisCall = d3.axisBottom()
      .ticks(4);
  
    vis.xAxis = vis.g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + vis.height + ')');
 
    vis.yAxis = vis.g.append('g')
      .attr('class', 'y axis');

    vis.wrangleData();
  }

  wrangleData() {
    const vis = this;

    vis.coin = document.getElementById('coin-selector').value
    vis.yVariable = document.getElementById('perspective-selector').value

    // Filter data based on selections'
    vis.dataFiltered = filteredData[vis.coin].filter((d) => {
      return d.date; 
    });
    // debugger; 

    console.log(vis.coin);
    console.log(vis.yVariable); 
    vis.updateVis();
  }

  updateVis() {
    const vis = this;
    
    // Update scales
    vis.x.domain(d3.extent(vis.dataFiltered, (d) => d.date));
    vis.y.domain([d3.min(vis.dataFiltered, (d) => d[vis.yVariable]),
    d3.max(vis.dataFiltered, (d) => d[vis.yVariable])]);


    // // Fix for y-axis format values
    let formatYAxis = d3.format('.2s');
    let formatAbbreviation = (x) => {
      let s = formatYAxis(x);
      switch (s[s.length - 1]) {
        case 'G': return s.slice(0, -1) + 'B';
        case 'k': return s.slice(0, -1) + 'K';
      }

      console.log(s)
      return s; 
    }

    // Update axis
    vis.xAxisCall.scale(vis.x);
    vis.xAxis.transition(vis.t()).call(vis.xAxisCall);
    vis.yAxisCall.scale(vis.y);
    vis.yAxis.transition(vis.t()).call(vis.yAxisCall.tickFormat(formatAbbreviation));

    // Discard old tooltip elements
    d3.select('.focus').remove(); 
    d3.select('.overlay').remove();

    const focus = vis.g.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('line')
      .attr('class', 'x-hover-line hover-line')
      .attr('y1', 0)
      .attr('y2', vis.height);

    focus.append('line')
      .attr('class', 'y-hover-line hover-line')
      .attr('x1', 0)
      .attr('x2', vis.width); 

    focus.append('circle')
      .attr('r', 3);

    focus.append('text') 
      .attr('x', 15)
      .attr('dy', '.31em');

    vis.svg.append('rect')
      .attr('transform', 'translate(' + vis.margin.left + ', ' + vis.margin.top + ')')
      .attr('class', 'overlay')
      .attr('width', vis.width)
      .attr('height', vis.height)
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", mousemove);

    function mousemove() {
      let x0 = vis.x.invert(d3.mouse(this)[0]),
        i = vis.bisectDate(vis.dataFiltered, x0, 1),
        d0 = vis.dataFiltered[i - 1],
        d1 = vis.dataFiltered[i],
        d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;
      focus.attr("transform", "translate(" + vis.x(d.date) + "," + vis.y(d[vis.yVariable]) + ")");
      focus.select("text").text(() => d3.format("$,")(d[vis.yVariable].toFixed(2)));
      focus.select(".x-hover-line").attr("y2", vis.height - vis.y(d[vis.yVariable]));
      focus.select(".y-hover-line").attr("x2", -vis.x(d.date));
    }
    // debugger; 

    // Update y-axis yLabel
    let newLabel = (vis.yVariable === 'price_usd') ? 'Price (USD)' :
      ((vis.yVariable === 'market_cap') ? 'Market Capitalization (USD)' :
        '24 Hour Trading Volume (USD)')

    vis.yLabel.text(newLabel)
    
    let line = d3.line()
      .x((d) => vis.x(d.date))
      .y((d) => vis.y(d[vis.yVariable]));

    vis.g.select('.line')
      .attr('stroke', color(vis.coin))
      .transition(vis.t)  
      .attr('d', line(vis.dataFiltered));
  }; 
}

export default LineChart; 