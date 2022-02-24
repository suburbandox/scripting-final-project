//Part 1
var state = ['Iowa', 'Missouri'];
console.log(state[0]);
console.log(state[1]);
state.push('Vermont');
console.log(state[0]);
console.log(state[1]);
console.log(state[2]);
state.splice(0, 1);
console.log(state[0]);
console.log(state[1]);
state.splice(0, 1, 'Mississippi');
console.log(state[0]);
console.log(state[1]);

//Part 2
var stateStuff= [
    ['Iowa', 1846],
    ['Missouri', 1821],
];
console.log(stateStuff[0]);
console.log(stateStuff[1]);
stateStuff.unshift(['Alaska', 1959]);
console.log(stateStuff[0]);
console.log(stateStuff[1]);
console.log(stateStuff[2]);
stateStuff.splice(1,1);
console.log(stateStuff[0]);
console.log(stateStuff[1]);
stateStuff.splice(1,1,["Texas",1845]);
console.log(stateStuff[0]);
console.log(stateStuff[1]);

//Part 3
var iowa = new Object();
iowa.name = "Iowa";
iowa.population = 3190369;
iowa.areaSquareMiles  = 55858.1;
console.log("Iowa's population density is " + (iowa.population/iowa.areaSquareMiles).toFixed(1) + " people per square mile.");
