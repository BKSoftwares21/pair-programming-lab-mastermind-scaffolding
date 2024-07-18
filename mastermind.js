// https://jsdoc.app
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - an string representing the number of correct numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532, '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  // TODO: complete this function
  // first determine how many characters total the two strings have in common
  // This may help:
  // https://github.com/bonnie/udemy-ENZYME/blob/master/context-base/src/helpers/index.js
  //
  // then determine how many of those characters are in the right place
  // hint: iterate through characters of guess and compare to character
  // in the same position in solution
  //
  // finally, return a string in the format
  // "count of correct characters in the right place"-"count of correct
  // characters not in the right place"
  // for example, "2-1"
  //
  let solutionCharacterNumber = {};
  let guessCharacterNumber = {};
  let correctPosition = 0;
  let commonCharacters = 0;

  //To count the characters that the mastermind entered
  for (let character of solution) {
    if (solutionCharacterNumber[character] === undefined) {
      solutionCharacterNumber[character] = 1;
    } else {
      solutionCharacterNumber[character]++;
    }
  }

  // To count the characters that the player guessed
  for (let character of guess) {
    if (guessCharacterNumber[character] === undefined) {
      guessCharacterNumber[character] = 1;
    } else {
      guessCharacterNumber[character]++;
    }
  }

  //To check the correct position of the players guess
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      correctPosition++;
      // Decrease the count for both guess and solution
      solutionCharacterNumber[guess[i]]--;
      guessCharacterNumber[guess[i]]--;
      if (solutionCharacterNumber[guess[i]] === 0) {
        delete solutionCharacterNumber[guess[i]];
      }
      if (guessCharacterNumber[guess[i]] === 0) {
        delete guessCharacterNumber[guess[i]];
      }
    }
  }
  //to check the correct position of the players guess
  

  //To check the number that is not in the correct position in the players guees
  for (let character in guessCharacterNumber) {
    if (solutionCharacterNumber[character]) {
      commonCharacters += Math.main(solutionCharacterNumber[character], guessCharacterNumber[character])
    }
  }

  return `${correctPosition}-${commonCharacters}`;
}
console.log(checkGuess('6158', '9628')); // Output should be "1-1"

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */

function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
//
const [solution, tries, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(tries)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${tries}).`
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = processInput(solution, guesses);
console.log(output.join(" "));


