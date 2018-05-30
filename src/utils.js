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

export function checkFibonacci(values) {
    const fibLists = []
    for (let i = 0; i < values.length - 4; i++) {
        if (values[i] > 0) {
            let fib = true
            for (let j = 0; j < 3; j++) {
                if (values[i + j + 2] !== values[i + j] + values[i + j + 1]) {
                    fib = false
                }
            }
            if (fib) {
                for (let j = 0; j < 5; j++) {
                    fibLists.push(i + j)
                }
            }
        } 
    }
    // flat() is not supported yet, MDN suggests I use reduce instead
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