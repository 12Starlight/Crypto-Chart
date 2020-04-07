class LineChart {
  constructor(_parentElement) {
    this.parentElement = _parentElement;
    this.initVis = this.initVis.bind(this);
    this.wrangleData = this.wrangleData.bind(this);
    this.updateVis = this.updateVis.bind(this);

    this.initVis();
  }


  initVis() {
    const vis = this; 
  }

  wrangleData() {
    const vis = this;
  }

  updateVis() {
    const vis = this; 
  }
}

export default LineChart; 