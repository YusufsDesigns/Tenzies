import { useState, useEffect } from 'react'
import './style.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from "use-window-size-v2";
import die1 from './assets/die-1.png'
import die2 from './assets/die-2.png'
import die3 from './assets/die-3.png'
import die4 from './assets/die-4.png'
import die5 from './assets/die-5.png'
import die6 from './assets/die-6.png'

function App() {
  const [tenzies, setTenzies] = useState(false)
  const [dices, setDices] = useState(allNewDices)
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
        setTimer(timer + 1);
    }, 1000);
    if(tenzies){
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const allHeld = dices.every(die => die.isHeld)
    const firstImg = dices[0].image
    const allEqualImg = dices.every(die => die.image == firstImg)

    if(allHeld && allEqualImg){
      setTenzies(true)
    }
  }, [dices])

  function generateDices(){
    const dots = [die1, die2, die3, die4, die5, die6]
    return{
      image: dots[Math.floor(Math.random() * 6)],
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDices(){
      const newDices = []
      for(let i = 0; i < 10; i++){
        newDices.push(generateDices())
      }
      return newDices
  }

  function holdDice(id){
    setDices(oldDice => oldDice.map(die => {
        return id === die.id ?
          {...die, isHeld: !die.isHeld} :
          die
      })
    )
  }

  function rollDices(){
    if(tenzies){
      setDices(allNewDices)
      setTenzies(false)
    }else{
      setDices(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateDices()
    }))}
  }

  function allFunction(){
    rollDices()
    {!tenzies ? setCount(count + 1) : setCount(0)}
  }

  const diceElement = dices.map(die => (
    <Die 
      image={die.image} 
      key={die.id} 
      isHeld={die.isHeld} 
      holdDice={() => {holdDice(die.id)}}
    />
  )
  )

  const { height, width } = useWindowSize();

  return (
    <>
      {tenzies && <Confetti width={width} height={height}/>}
    <div className="App">
      <h3>Tenzies</h3>
        <span>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </span>
      {tenzies && 
        <div className='timer'>
          <span>Your time: {timer} secs</span>
        </div>
      }
      <span>Number of roll: {count}</span>
      <div className="dice">
        {diceElement}
      </div>
      <button onClick={allFunction}>{tenzies ? 'New Game' : 'Roll'}</button>
    </div>
    </>
    
  )
}

export default App
