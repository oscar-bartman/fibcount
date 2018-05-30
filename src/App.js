import React, { Component } from 'react';
import * as utils from './utils.js'
import * as settings from './settings.js'

// const values = [];

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
    this.handleClick = this.handleClick.bind(this)
    this.state = { values: initGrid() }
  }

  handleClick(e) {
    const dimensions = e.target.getBoundingClientRect()
    const updateIndeces = utils.getUpdateIndices(e.clientX - dimensions.left, e.clientY - dimensions.top)
    const newValues = this.state.values
    for (let index = 0; index < updateIndeces.length; index++) {
       newValues[updateIndeces[index]] = newValues[updateIndeces[index]] + 1
    }
    this.setState({values: newValues})
  }

  render() {
    const size = settings.GRIDSIZE * settings.CELLSIZE 
    
    return (
      <svg height={size} width={size}>
        {this.state.values.map((v, i) => 
          <Cell value={v} index={i} key={i.toString()}/>
        )}
        <g onClick={this.handleClick}><rect className="clickField" height={size} width={size} /></g>
      </svg>
    )
  }
}

class Cell extends Component {
  
  render() {
    const index = this.props.index
    const xPosition = (index % settings.GRIDSIZE) * settings.CELLSIZE
    const yPosition = Math.floor(index/settings.GRIDSIZE) * settings.CELLSIZE

    //TODO move styling to CSS
    return(
      <g>
        <rect height={settings.CELLSIZE} width={settings.CELLSIZE} x={xPosition} y={yPosition} strokeWidth="2" stroke="#000000" fill="#FF0000"/>
        <text className="numberText" x={xPosition + 8} y={yPosition + 17}>{this.props.value !== 0 ? this.props.value : ""}</text>
      </g>
    )
  }
}

//TODO move helpers to some util module we can import into here
//HELPERS
function initGrid() {
  const values = []
  for (let i = 0; i < settings.GRIDSIZE * settings.GRIDSIZE; i++) {
    values[i] = 0;
  }
  return values
}

export default App;
