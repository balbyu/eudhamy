// Print reversed array
// printReveresedArray(["Bobby", "Susan", "Rebecca"]);

function printReveresedArray(array) {
    for (let index = array.length - 1; index >= 0; index--) {
        console.log(array[index]);
    }
}

//isUniform
// console.log(isUniform(["b", "b", "b"]));

function isUniform(array) {
    if ([...new Set(array)].length == 1) return true;
    return false;
}

//sumArray
// let arr = [2, 3, 4, 5];
// console.log(arr.reduce((a, b) => a + b, 0));

//maxArray
let arr = [2, 3, 4, 5];
console.log(Math.max(...arr));
