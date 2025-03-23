function testBeeCreation() {
    const workerBee = new WorkerBee();
    console.assert(workerBee.type === "Worker", "WorkerBee type is incorrect");
    console.assert(workerBee.health === 75, "WorkerBee health is incorrect");
    console.assert(workerBee.damage === 10, "WorkerBee damage is incorrect");
    console.assert(workerBee.alive === true, "WorkerBee should be alive upon creation");
    console.log("testBeeCreation passed");
}

testBeeCreation();

function testTakeDamage() {
    const workerBee = new WorkerBee();
    workerBee.takeDamage();
    console.assert(workerBee.health === 65, "WorkerBee health should be 65 after taking damage");
    console.assert(workerBee.alive === true, "WorkerBee should still be alive");

    workerBee.takeDamage();
    workerBee.takeDamage();
    workerBee.takeDamage();
    console.assert(workerBee.health === 35, "WorkerBee health should be 35 after taking more damage");
    
    workerBee.takeDamage();
    console.assert(workerBee.health === 25, "WorkerBee health should be 25 after taking more damage");
    
    workerBee.takeDamage();
    console.assert(workerBee.health === 15, "WorkerBee health should be 15 after taking more damage");
    
    workerBee.takeDamage();
    console.assert(workerBee.health === 5, "WorkerBee health should be 5 after taking more damage");

    workerBee.takeDamage();
    console.assert(workerBee.health === 0, "WorkerBee health should be 0 after taking more damage");
    console.assert(workerBee.alive === false, "WorkerBee should be dead after health reaches 0");

    console.log("testTakeDamage passed");
}

testTakeDamage();



function testCheckGameOver() {
    const hive = new Hive();
    hive.initializeBees();
    
    // Remove the queen to simulate a game over scenario
    const queenBee = hive.bees.find(bee => bee instanceof QueenBee);
    queenBee.alive = false;
    
    // Check if the game over logic works
    hive.checkGameOver();
    
    console.assert(hive.gameOver === true, "Game over should be true when the queen is dead");
    console.log("testCheckGameOver passed");
}

testCheckGameOver();

function testRenderUI() {
    const hive = new Hive();
    hive.initializeBees();
    hive.renderUI();
    
    // Check the number of elements in the DOM for each bee type
    const queenContainer = document.getElementById("queenContainer");
    const workerContainer = document.getElementById("workerContainer");
    const droneContainer = document.getElementById("droneContainer");

    console.assert(queenContainer.children.length === 1, "There should be 1 queen bee in the UI");
    console.assert(workerContainer.children.length === numberOfWorkerBees, `There should be ${numberOfWorkerBees} worker bees in the UI`);
    console.assert(droneContainer.children.length === numberOfDroneBees, `There should be ${numberOfDroneBees} drone bees in the UI`);
    
    console.log("testRenderUI passed");
}

testRenderUI();


function testLogHit() {
    const logContainer = document.getElementById("hitLog");
    logContainer.innerHTML = '';  // Clear the log before the test
    
    logHit("Queen", 8);
    console.assert(logContainer.children.length === 1, "There should be 1 log entry after hitting the Queen");
    
    logHit("Worker", 10);
    console.assert(logContainer.children.length === 2, "There should be 2 log entries after hitting the Worker");
    
    logHit("Drone", 12);
    console.assert(logContainer.children.length === 3, "There should be 3 log entries after hitting the Drone");
    
    console.log("testLogHit passed");
}

testLogHit();
