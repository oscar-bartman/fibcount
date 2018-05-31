import * as settings from './settings.js'

export function getUpdateIndices(x, y) {
    const gridCoords = toGridCoords(x, y)
    const rowCoordsList = coordsSameRow(gridCoords)
    const columnCoordsList = coordsSameColumn(gridCoords)
    const rowAndColumnCoords = rowCoordsList.concat(columnCoordsList)
    // map the coords to indices
    const indices = rowAndColumnCoords.map((gridCoords) => {
        return gridCoords.gridY * settings.GRIDSIZE + gridCoords.gridX
    })

    return indices
}

export function initGrid() {
    const values = []
    for (let i = 0; i < settings.GRIDSIZE * settings.GRIDSIZE; i++) {
        values[i] = 0;
    }
    return values
}

// This was still incorrect. It'll check for any row where the third, fourth and fifth element are the 
// sum of the previous two numbers. So [2,2,4,6,10] for example was still being added to the fibList but is not 
// a fibonacci sequence. Fixing it by checking if the first number in a row of five is included in the 
// fibonacci sequence up to 233. That means the alg will work for numbers up to 5 steps away  from 233.
// Should probably suffice for the average user. 
export function checkFibonacci(values) {
    const sequence = [1,1,2,3,5,8,13,21,34,55,89,144,233]
    const fibLists = []
    for (let i = 0; i < values.length - 4; i++) {
        if (sequence.includes(values[i])) {
            let fib = true
            if (values[i] === values[i+1] && values[i] !== 1) {
                fib = false
            } else {
                for (let j = 0; j < 3; j++) {
                    if (values[i + j + 2] !== values[i + j] + values[i + j + 1]) {
                        fib = false
                    }
                }
            }
            if (fib) {
                for (let j = 0; j < 5; j++) {
                    fibLists.push(i + j)
                }
            }
        } 
    }
    return fibLists
}

// converts client coords into the index of the square clicked
function toGridCoords(x, y){
    const rows = Math.floor(y/settings.CELLSIZE)
    const cols = Math.floor(x/settings.CELLSIZE)

    return {gridX: cols, gridY: rows}
}

// obtains the coords of the cells in the same row as the coords given
function coordsSameRow(gridCoords) {
    const coords = []
    for (let index = 0; index < settings.GRIDSIZE; index++) {
        if (index !== gridCoords.gridX){ // prevent double entries
            coords[index] = { gridX: index, gridY: gridCoords.gridY }
        }
    }
    return coords
}

// obtains the coords of the cells in the same column as the coords given
function coordsSameColumn(gridCoords) {
    const coords = []
    for (let index = 0; index < settings.GRIDSIZE; index++) {
        coords[index] = { gridX: gridCoords.gridX, gridY: index }
    }
    return coords
}