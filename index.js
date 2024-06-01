var map = [];
const column = 9;
const row = 9;

function conponent(index) {
    this.index = index;
    if(this.index == 0) {
        this.probability = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.probability.splice(this.probability.indexOf(this.index), 1); 
    }
    else {
        this.probability = false;
    } 
}

function prepare() {
    
}

function require() {
    
}

function start() {
    /** for(var i = 0; i < column; i++) {
        map.push([]);
        for(k = 0; k < row; k++) {
            map[i].push(new conponent());
        }
    } */

    for(var i = 0; i < column; i++) {
        for(var k = 0; k < row; k++) {
            if(map[i][k].index != 0) {
                removeProbability(map[i][k].index, i, k);
            }
        }
    }
    while(true) {
        if(searchOneProbability() != false) {
            var objectReI, objectReK = searchOneProbability();
            var object = map[objectReI][objectReK];
            object.index = object.probability[0];
            removeProbability(object.index, objectReI, objectReK);
        }
        else {
            break;
        }
    }
    document.getElementById("output").innerHTML = "We're done!\n";
    for(i = 0; i < column; i++) {
        document.getElementById("output").innerHTML = document.getElementById("output").innerHTML + "\n";
        for(k = 0; k < row; k++) {
            document.getElementById("output").innerHTML = document.getElementById("output").innerHTML + " " + map[i][k];
        }
    }
}

function searchOneProbability() {
    for(i = 0; i < column; i++) {
        for(k = 0; k < row; k++) {
            if(map[i][k].probability.length == 1) {
                return i, k;
            }
        }
    }
    return false;
}

function removeProbability(objectIndex, objectI, objectK) {
    for(i = 0; i < column; i++) {
        if(map[i][objectK].probability.indexOf(objectIndex) != -1) {
            map[i][objectK].probability.splice(map[i][objectK].probability.indexOf(objectIndex));
        }
    }
    for(k = 0; k < row; k++) {
        if(map[objectI][k].probability.indexOf(objectIndex) != -1) {
            map[objectI][k].probability.splice(map[objectI][k].probability.indexOf(objectIndex));
        }
    }
    var threeZoneColumn = Math.ceil(objectI / 3) - 1;
    var threeZoneRow = Math.ceil(objectK / 3) - 1;
    for(i = 0; i < 3; i++) {
        for(k = 0; k < 3; k++) {
            if(map[i + (3 * threeZoneColumn)][k + (3 * threeZoneRow)].probability.indexOf(objectIndex) != -1) {
                map[i + (3 * threeZoneColumn)][k + (3 * threeZoneRow)].probability.splice(map[i + (3 * threeZoneColumn)][k + (3 * threeZoneRow)].probability.indexOf(objectIndex));
            }
        }
    }
}
