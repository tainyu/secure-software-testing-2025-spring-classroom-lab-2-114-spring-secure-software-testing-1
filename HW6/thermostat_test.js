const Thermostat = require('./Thermostat');

function runTest(testName, curTemp, timeSinceLastRun, expectedHeaterOn) {
  const thermostat = new Thermostat();

  thermostat.thresholdDiff = 2;
  thermostat.minLag = 5;
  thermostat.timeSinceLastRun = timeSinceLastRun;

  // Use override mode to set targetTemp = 20 directly.
  thermostat.setOverride(20);
  thermostat.setCurrentTemp(curTemp);

  const result = thermostat.turnHeaterOn(null);
  const passed = result.heaterOn === expectedHeaterOn;

  console.log(`${testName}: ${passed ? 'PASS' : 'FAIL'}`);
  console.log(`  curTemp=${curTemp}, timeSinceLastRun=${timeSinceLastRun}`);
  console.log(`  expected heaterOn=${expectedHeaterOn}, actual heaterOn=${result.heaterOn}`);
  console.log(`  runTime=${result.runTime}`);
  console.log('');
}

console.log('Homework 6 - Logic Coverage of Thermostat');
console.log('Predicate: (curTemp < targetTemp - thresholdDiff) && (timeSinceLastRun >= minLag)');
console.log('');

runTest('T1 - A=true, B=true, P=true', 17, 5, true);
runTest('T2 - A=false, B=true, P=false', 18, 5, false);
runTest('T3 - A=true, B=false, P=false', 17, 4, false);
runTest('T4 - A=false, B=false, P=false', 18, 4, false);