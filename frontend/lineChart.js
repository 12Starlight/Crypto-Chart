import * as d3 from 'd3';

class LineChart {
  constructor(_parentElement) {
    this.parentElement = _parentElement;
    this.initVis = this.initVis.bind(this);
    this.wrangleData = this.wrangleData.bind(this);
    this.updateVis = this.updateVis.bind(this);

    this.initVis();
  }


  initVis() { // Render Static Chart 
    const vis = this; 

    vis.margin = { left: 80, right: 100, top: 30, bottom: 30 };
    vis.height = 350 - vis.margin.top - vis.margin.bottom;
    vis.width = 800 - vis.margin.left - vis.margin.right; 

    vis.svg = d3.select(vis.parentElement)
      .append('svg')
      .attr('width', vis.width + vis.margin.left + vis.margin.right)
      .attr('height', vis.height + vis.margin.top + vis.margin.bottom);

    vis.g = vis.svg.append('g')
      .attr('transform', 'translate(' + vis.margin.left + ', ' + vis.margin.top + ')');

    vis.t = () => d3.transition().duration(1000);

    vis.bisectDate = d3.bisector((d) => d.date).left; // .left returns the lowest position

    vis.linePath = vis.g.append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke-width', '3px');

    vis.yLabel = vis.g.append('text')
      .attr('class', 'y axisLabel')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -170)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .text('Price (USD)')

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

    vis.updateVis();
  }

  updateVis() {
    const vis = this;
    
    
  }
}

export default LineChart; 