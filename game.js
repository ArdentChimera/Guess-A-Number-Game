
function guessANumber() {
    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let computerGuess = Math.floor(Math.random() * 100);
    let guess;
    let newAnswer;
    let tries = 15;

    let level = 'Level 1(0-100)'
    let levelCap = 100;

    let levelTwo = function () {
        readLine.question('Do you want to proceed with the next level? (y/n): ', answer => {
            newAnswer = String(answer);
            if (newAnswer === 'y'){
                console.log('Next level is started!');
                tries = 10;
                level = 'Level 2(0-200)'
                levelCap = 200
                computerGuess = Math.floor(Math.random() * 200);
                recursiveAsyncReadLine();
            }else if (newAnswer === 'n'){
                reset();
            }else {
                console.log('Invalid input! Type "y" for Yes and "n" for No.');
                levelTwo();
            }
        });
    }

    let levelThree = function () {
        readLine.question('Do you want to proceed with the next level? (y/n): ', answer => {
            newAnswer = String(answer);
            if (newAnswer === 'y'){
                console.log('Next level is started!');
                tries = 5;
                level = 'Level 3(0-300)'
                levelCap = 300
                computerGuess = Math.floor(Math.random() * 300);
                recursiveAsyncReadLine();
            }else if (newAnswer === 'n'){
                reset();
            }else {
                console.log('Invalid input! Type "y" for Yes and "n" for No.');
                levelThree();
            }
        });
    }

    let reset = function () {
        readLine.question('Do you want to restart? (y/n): ', answer => {
            newAnswer = String(answer);
            if (newAnswer === 'y') {
                console.log('New game started!');
                tries = 15;
                computerGuess = Math.floor(Math.random() * 100);
                recursiveAsyncReadLine();
            }else if (newAnswer === 'n'){
                console.log('Thank you for playing!');
                return readLine.close();
            }else {
                console.log('Invalid input! Type "y" for Yes and "n" for No.');
                reset();
            }
        });
    }

    let recursiveAsyncReadLine = function () {
        readLine.question(`Guess the number ${level}: `, number => {
                guess = Number(number);
                
                if (guess <= `${levelCap}` && guess >=0){
                    if (guess == computerGuess){
                        console.log('You guessed it!');
                        if (levelCap === 100) {
                            levelTwo();
                        }else if (levelCap === 200){
                            levelThree();
                        }else if (levelCap === 300){
                            console.log('Congrats!!! You have won the game!!!');
                            return readLine.close();
                        }
                    }else if (guess < computerGuess) {
                        console.log('Too Low!');
                        tries -= 1;
                        if (tries <=0){
                            console.log('You loose!');
                            reset();
                        }else {
                            if(tries === 1){
                                console.log(`You have ${tries} trie left.`);
                                recursiveAsyncReadLine();
                            }else {
                                console.log(`You have ${tries} tries left.`);
                                recursiveAsyncReadLine();
                            }
                        }
                    }else if (guess > computerGuess) {
                        console.log('Too High!');
                        tries -= 1;
                        if (tries <=0){
                            console.log('You loose!');
                            reset();
                        }else {
                            if(tries === 1){
                                console.log(`You have ${tries} trie left.`);
                                recursiveAsyncReadLine();
                            }else {
                                console.log(`You have ${tries} tries left.`);
                                recursiveAsyncReadLine();
                            }
                        }
                    }
                }else {
                    console.log(`Invalid input! Try again with number from 0 to ${levelCap}!`);
                    recursiveAsyncReadLine();
                }
        });
    }
    recursiveAsyncReadLine();
}
guessANumber();


