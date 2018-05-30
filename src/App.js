import React, { Component } from 'react';

const values = [];
const GRIDSIZE = 50;
const CELLSIZE = 30;

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* Should we pass GRIDSIZE as a prop to Grid rather? */}
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
    //...
  }

  //...

  render() {
    const height = 50 * CELLSIZE 
    const width = 50 * CELLSIZE
    
    return (
      <svg height={height} width={width}>
        {values.map((v, i) => 
          <Cell index={i} key={i.toString()}/>
        )}
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
    const xPosition = (index % GRIDSIZE) * CELLSIZE
    const yPosition = Math.floor(index/GRIDSIZE) * CELLSIZE

    //TODO move styling to CSS
    return <rect height={CELLSIZE} width={CELLSIZE} x = {xPosition} y = {yPosition} strokeWidth="2" stroke="#000000" fill="#FF0000"/>
  }
}

//TODO move helpers to some util module we can import into here
//HELPERS
function initGrid() {
  for (let i = 0; i < GRIDSIZE * GRIDSIZE; i++) {
    values[i] = 0;
  }
}

export default App;
