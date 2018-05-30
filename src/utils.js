import * as settings from './settings.js'

export function getUpdateIndices(x, y) {
    // const index = toIndex(x, y)
    // const rowList = indicesSameRow(index)
    // const columnList = indicesSameColumn(index)

    // // might have to deal with indices getting entered double
    // return rowList.concat(columnList)
    return toIndex(x, y)
}

// converts client coords into the index of the square clicked
function toIndex(x, y){
    const rows = Math.floor(y/settings.CELLSIZE)
    const cols = Math.floor(x/settings.CELLSIZE)

    return rows * settings.GRIDSIZE + cols
}

// obtains the indices of the cells in the same row as the index given
function indicesSameRow(index) {

}

// obtains the indices of the cells in the same column as the index given
function indicesSameColumn(index) {

}