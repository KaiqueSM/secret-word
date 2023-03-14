// style
import './App.css';

// react
import {useEffect, useState} from "react";

//data
import {wordsList} from "./data/Words";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"}
]

function App() {

    const [gameStage, setGameStage] = useState(stages[0].name)
    const [words] = useState(wordsList)

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);

    const pickWordAndCategory = () => {
        // picking category
        const categories = Object.keys(words)
        const category =
            categories[Math.floor(Math.random() * Object.keys(categories).length)]

        // picking word
        const word =
            words[category][Math.floor(Math.random() * Object.keys(words[category]).length)]

        return {word, category}
    }


    // starts the secret word game
    const startGame = () => {
        // pick word and category
        const {word, category} = pickWordAndCategory()

        // create an array of letters
        let wordLetters = word.split("")
        wordLetters = wordLetters.map((letter) => letter.toLowerCase())

        // fill states
        setPickedCategory(category)
        setPickedWord(word)
        setLetters(wordLetters)

        setGameStage(stages[1].name)
    }

    //process the letter input
    const verifyLetter = (letter) => {

        const normalizedLetter = letter.toLowerCase()

        if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
            return
        }

        if (letters.includes(normalizedLetter)) {
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters, normalizedLetter
            ])
        } else {
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters, normalizedLetter
            ])
            setGuesses((actualGuesses) => actualGuesses -1)
        }
    }

    function clearLetterStates() {
        setGuessedLetters([])
        setWrongLetters([])
    }

    useEffect(() => {
        if(guesses < 1){
            // clear letters states
            clearLetterStates()


            setGameStage(stages[2].name)
        }
    }, [guesses]);
    

    // restarts the game
    const retry = () => {
        setGameStage(stages[0].name)
    }

    return (
        <div className="App">
            {gameStage === "start" && <StartScreen startGame={startGame}/>}
            {gameStage === "game" && <Game
                verifyLetter={verifyLetter} pickedCategory={pickedCategory}
                pickedWord={pickedWord} letters={letters}
                guessedLetters={guessedLetters} wrongLetters={wrongLetters}
                guesses={guesses} score={score}
            />}
            {gameStage === "end" && <GameOver retry={retry}/>}
        </div>
    );
}

export default App;
