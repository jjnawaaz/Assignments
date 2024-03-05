function calculateTime(n) {
    let Start_Time = new Date();
    let sum = 0
    for(i = 1; i < n; i++){
        sum += i
    }
    let End_Time = new Date();
    let calculated_time = ( End_Time - Start_Time ) / 1000
    return calculated_time
}

console.log("The time taken for n = 100 is :", calculateTime(100))
console.log("The time taken for n = 100000 is :", calculateTime(100000))
console.log("The time taken for n = 100000000 is :", calculateTime(1000000000))
