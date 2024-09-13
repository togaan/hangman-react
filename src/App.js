import React from 'react';
import './App.css';
import Letters from './Letters';
import Draw from './Draw';
import Guessed from './Guessed';
import data from "./words.json"


function App() {
  // make state for the randm catagory
  const [catagory] = React.useState(randamCatagory)

  function randamCatagory() {
    const allkeys = Object.keys(data.words);
    const randamNumber = Math.floor(Math.random() * allkeys.length);
    const randamName = allkeys[randamNumber];
    return randamName
  }

  
  // make state for the randam word from randam catagory
  const [chosenWord] = React.useState(getWord)
  function getWord() {
    const randamValue = data.words[catagory];
    const randamValueNumber = Math.floor(Math.random() * randamValue.length);
    const randamValueValue = randamValue[randamValueNumber];
    return randamValueValue
  }
  
 
  // convert the randam word to an array
  const theWordArray = Array.from(chosenWord.toLowerCase())
  
  // make empty array dependes on the chosen word array's length to desplay empty items on the screen so they reprsent each letter from chosen word. 
  //const guessedWord = Array(theWordArray.length).fill('');
  const guessedWord = []
  theWordArray.forEach(item => {
    let emptyLetter;
    if (item === " ") {
     
      emptyLetter = "_"
      guessedWord.push(emptyLetter)
    }
    else {
     
      emptyLetter = " "
      guessedWord.push(emptyLetter)
    }

  })
  
  // make a state for the empty array so we can pass it to the guessed component
  const [emptyGuessedArray, setEmptyGusesed] = React.useState(guessedWord)
  
  // set each letter from chosen word as an object
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const lettersObject = Array.from(letters).map((item, index) => {
      return item = {
          value: item,
          isClicked: false,
          id: index,
          isCorrect: '' 
      }
  })


  // set state for letters
  const [letter, setLetter] = React.useState(lettersObject)

  // set state for wrong attept
  const [wrong, setWrong] = React.useState(0);
  
 
   // handle the letter we click on by passing its id and value
  function toggle(id, value) {

  // Step one:- check if the letter exists in chosen word array
    // - make updated array so we can avoid reset issues
    const updatedArray = [...emptyGuessedArray]

    // loop on each letter from choen word and check if the value we passed equel to the letter we clicked on
    theWordArray.forEach((item, index) => {
      if (item === value) {

        // if they match, we add this letter to the empty array with the correct index 
        updatedArray[index] = value
        
        // and then we reset the epmty array using the updated array
        setEmptyGusesed(updatedArray) 
      }
    }) 
    
    // Step two:- reset the letter's object
    setLetter(prev => {
      return prev.map(item => {
        // get the current letter's object 
        return item.id === id ? {
          ...item,
          
          // update the properties
          isClicked: !item.isClicked,
          isCorrect: theWordArray.includes(item.value.toLowerCase())
            ? ("correct"  )
            : ("incorrect" )
        }: item 
      })
    }) 
   
      
  }
  
  // reset the wrong attempts by increasing it on each incorrect letter
  React.useEffect(() => {
    setWrong(0)
    letter.map((item) => {
      if (item.isCorrect === "incorrect") {
        setWrong(prev => prev + 1)
      }
    })
  }, [letter])
  
  const win = emptyGuessedArray.every(item => item !== ' ');

  // set game result state
  const [result, setResults] = React.useState(false);

  
  React.useEffect(() => {
    if (wrong >= 8 ) {
      setResults(true)
     
    }
  }, [wrong], [win])
  
  React.useEffect(() => {
    if (win) {
      setResults(true)
      
    }
  }, [win])
  
  // set opacity for alert
  const [opacity, setOpacity] = React.useState(0);
  React.useEffect(() => {
    if (result) {
      setTimeout(() => {
        setOpacity(1) 
      }, 1000); 
    }
  }, [result])
 
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className="App position-relative" >
       <nav className="navbar navbar-expand-lg text-light ">
          <div className="container">
            <div className='game-name p-1 fs-3'>Hangman Game</div>
            <div className='info p-1 fs-3'>
            Word From: <span className='fw-bold'>{catagory}</span>
            </div>
          </div>
      </nav>
      
      <div className="container">
          <div className="row mt-5">
            <div className='letters  mt-1 mb-5 text-center col-md-12 col-lg-6'>
                {letter.map((item, index) => 
                  <Letters
                    key={index}
                    value={item.value}
                    isClicked={item.isClicked}
                    id={item.id}
                    isCorrect={item.isCorrect}
                    toggle={() => toggle(item.id, item.value)}
                    letter={letter}
                    wrong={wrong}
                  />
                )} 
            </div>
            <Draw wrong={wrong}/>
          </div>
      </div>
      
      {result && <div
        style={{opacity}}
        className=" game container text-center d-flex justify-content-center position-absolute">
        { <div className={`${win ? "alert w-50 alert-success" : "alert w-50 alert-danger"}`} role="alert">
          <h4 className="alert-heading">{win ? "Congratulations!" : "Game Over!"}</h4>
          <p>{win ? "You won." : "You lost."}</p>
          <p>The word is "{chosenWord}"</p>
          <p onClick={reloadPage} className="mb-0 btn btn-info">Play again</p>
        </div>}
      </div>}
      <Guessed
        emptyGuessedArray={emptyGuessedArray}
        
      />
    </div>
      
   
  );
}

export default App;
