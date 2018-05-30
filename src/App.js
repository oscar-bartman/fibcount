import React, { Component } from 'react';
import * as utils from './utils.js'
import * as settings from './settings.js'

const values = [];

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Should we pass settings.GRIDSIZE as a prop to Grid rather? */}
        <Grid />
      </div>
    );
  }
}

// COMPONENT
class Grid extends Component {
  constructor(props) {    
    super(props)
    initGrid()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const dimensions = e.target.getBoundingClientRect()
    const index = utils.getUpdateIndices(e.clientX - dimensions.left, e.clientY - dimensions.top)
    console.log(index)
  }

  render() {
    // TODO use settings.GRIDSIZE instead
    const height = 50 * settings.CELLSIZE 
    const width = 50 * settings.CELLSIZE
    
    return (
      <svg height={height} width={width}>
        {values.map((v, i) => 
          <Cell index={i} key={i.toString()}/>
        )}
        <g onClick={this.handleClick}><rect className="clickField" height={height} width={width} /></g>
      </svg>
    )
  }
}

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 0}
  }

  render() {
    const index = this.props.index
    const xPosition = (index % settings.GRIDSIZE) * settings.CELLSIZE
    const yPosition = Math.floor(index/settings.GRIDSIZE) * settings.CELLSIZE

    //TODO move styling to CSS
    return <rect height={settings.CELLSIZE} width={settings.CELLSIZE} x={xPosition} y={yPosition} strokeWidth="2" stroke="#000000" fill="#FF0000"/>
  }
}

//TODO move helpers to some util module we can import into here
//HELPERS
function initGrid() {
  for (let i = 0; i < settings.GRIDSIZE * settings.GRIDSIZE; i++) {
    values[i] = 0;
  }
}

export default App;
