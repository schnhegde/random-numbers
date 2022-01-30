var smallValue = 100;
var smallCount = 100;

function getMultiplesOf100(v) {
  var final_value = 0;

  if (v < smallValue) {
    final_value = smallValue;
  } else {
    final_value = Math.floor(v / 100) * 100;
  }

  return final_value;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function getRandomNumbers(totalVal, count) {
  var sum = 0,
    diff = 0,
    randNumbers = [],
    total = 0;
  
  for (var i = 0; i < count; i++) {
    randNumbers[i] = Math.random();
    sum += randNumbers[i];
  }

  for(var i = 0; i < count; i++) {
    randNumbers[i] = randNumbers[i] / sum;
    randNumbers[i] = randNumbers[i] * totalVal;
    randNumbers[i] = getMultiplesOf100(randNumbers[i]);
    total += randNumbers[i];
  }

  randNumbers.sort(function(a, b) {
    return a - b;
  });
  
  diff = totalVal - total;
  
  randNumbers[0] += diff;
  
  
  total = 0;
  
  for(var i = 0; i < count; i++) {
    total += randNumbers[i];  
  }
  return shuffleArray(randNumbers);
}

function getRandomArbitrary(min, max) {
  return Math.floor((Math.random() * (max - min) + min));
}

function weightedRand(spec) {
  var i, j, table=[];
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j=0; j<spec[i]*10; j++) {
      table.push(i);
    }
  }
  return function() {
    return table[Math.floor(Math.random() * table.length)];
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function removeFromArray(array, listOfIndexes) {
  for (var i = removeValFromIndex.length -1; i >= 0; i--)
    array.splice(listOfIndexes[i],1);
  
  return array;
}


var generator = {};

generator.getRandomArray = function(totalNumber, countNumber) {
  var arrayNumbers = getRandomNumbers(totalNumber, countNumber);

//   for (var i = 0 ;i < arrayNumbers.length; i++) {
//     var currNum = arrayNumbers[i];
//     var currArray = getRandomNumbers(currNum, smallCount);
//     arrayNumbers[i] = currArray;
//   }

  return arrayNumbers
  
}


generator.getRandomIndexes = function(randomArray, repeatIndexWeight, removeNumbersWeight) {
  var finalIndexes = [];
  
  var noRepeatWeight = 1.0 - repeatIndexWeight;
  var randomRepeatIndex = weightedRand({0: noRepeatWeight, 1: repeatIndexWeight});

  for (var i = 0; i < 100; i++) {
    finalIndexes.push(i);
  }
  
  for (var i = 0; i < 100; i++) {
    var decision = parseInt(randomRepeatIndex());
    
    if (decision === 1) {
      var randomIndexIndex = getRandomArbitrary(0, 100);
      finalIndexes[i] = finalIndexes[randomIndexIndex];
    }
  }

  finalIndexes = shuffle(finalIndexes);

  var noRemoveWeight = 1.0 - removeNumbersWeight;
  var randomRemoveNumbers = weightedRand({0: noRemoveWeight, 1: removeNumbersWeight});
  for (var i = 0; i < 100; i++) {
    var decision = parseInt(randomRemoveNumbers());
    if (decision === 1) {
      randomArray[i] = -1;
    }
  }


  var finalObj = {};

  finalObj.shuffled = [];

  for (var i = 0; i < 100; i++) {
    finalObj.shuffled[i] = (finalIndexes[i] < 10 ? '0' + finalIndexes[i] : finalIndexes[i]) + " - " + (randomArray[i] > 0 ? randomArray[i] : '  ');
  }

  finalCount = {};
  finalObj.count = [];

  for (var i = 0; i < 100; i++) {
    var currIndex = finalIndexes[i]
    if (finalCount[currIndex]) {
      finalCount[currIndex] += randomArray[i] > 0? randomArray[i] : 0;
    } else {
      finalCount[currIndex] = randomArray[i] > 0? randomArray[i] : 0;
    }
  }

  var keys = Object.keys(finalCount);
  for (var i = 0; i < keys.length; i++) {
    var keyInt = parseInt(keys[i]);
    finalObj.count[i] = (keyInt < 10 ? '0' + keyInt : keyInt) + " - " + (finalCount[keys[i]] > 0 ? finalCount[keys[i]] : '  ');
  }

  var combinedList = [];
  for (var i = 0; i < 100; i++) {
    combinedList.push({'index': finalIndexes[i], 'number': randomArray[i]});
  }

  combinedList = combinedList.sort((a, b) => {return (a.index < b.index) ? -1 : 0});
  
  finalObj.sorted = [];

  for (var i = 0; i < 100; i++) {
    finalObj.sorted[i] = (combinedList[i].index < 10 ? '0' + combinedList[i].index : combinedList[i].index)
      + ' - ' + (combinedList[i].number < 0 ? '' : combinedList[i].number); 
  }


  return finalObj;

}

module.exports = generator;
