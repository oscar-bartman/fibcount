import React, { Component } from 'react';
import * as utils from './utils.js'
import * as settings from './settings.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid />
      </div>
    );
  }
}

// COMPONENTS
class Grid extends Component {
  constructor(props) {    
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { 
      values: utils.initGrid(),
      fibList: []
    }
  }

  handleClick(e) {
    const dimensions = e.target.getBoundingClientRect()
    const updateIndeces = utils.getUpdateIndices(e.clientX - dimensions.left, e.clientY - dimensions.top)
    const newValues = this.state.values
    // update the column and row values
    for (let index = 0; index < updateIndeces.length; index++) {
      newValues[updateIndeces[index]] = newValues[updateIndeces[index]] + 1
    }
    const fibList = utils.checkFibonacci(this.state.values)
    // set all the values in the fib sequence to 0
    for (let index = 0; index < fibList.length; index++) {
      newValues[fibList[index]] = 0
    }
    this.setState({values: newValues, fibList})
  }

  render() {
    const size = settings.GRIDSIZE * settings.CELLSIZE 
    
    return (
      <svg height={size} width={size}>
        {this.state.values.map((v, i) =>
          <Cell value={this.state.fibList.includes(i) ? 0 : v} index={i} isFib={this.state.fibList.includes(i)} key={i.toString()}/>
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
    const xPositionText = xPosition + 9
    const yPositionText = yPosition + 18

    // TODO move styling to CSS
    return(
      <g>
        <rect className={this.props.isFib ? "cell_fib" : "cell"} height={settings.CELLSIZE} width={settings.CELLSIZE} x={xPosition} y={yPosition} strokeWidth="2" stroke = "#000000"/>
        <text className="numberText" x={xPositionText} y={yPositionText}>{this.props.value !== 0 ? this.props.value : ""}</text>
      </g>
    )
  }
}

export default App;
