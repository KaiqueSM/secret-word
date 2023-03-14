import "./Game.css"
import {useState, useRef} from "react";

const Game = ({verifyLetter, pickedCategory, pickedWord, letters,
                  guessedLetters, wrongLetters, guesses, score, }) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        verifyLetter(letter)
        setLetter("")
        letterInputRef.current.focus()
    }

    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Advinhe a palavra:</h1>
            <h3 className="tip">Dica sobre a palavra: <span>{pickedCategory}</span></h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">
                {
                    letters.map((letter, index) => (
                        guessedLetters.includes(letter)? (
                            <span key={index} className="letter">{letter}</span>
                        ):(
                            <span key={index} className="blanSquare"></span>
                        )
                    ))
                }
            </div>
            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" maxLength="1" required ref={letterInputRef}
                    onChange={(e) => setLetter(e.target.value)} value={letter}/>
                    <button type="submit">Jogar</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {
                    wrongLetters.map((letter, index) => (
                        <span key={index}>{letter},</span>
                    ))
                }
            </div>
        </div>
    )
}
export default Game