import './style.css'

export default function Die(props){
    return(
        <div className={props.isHeld ? 'die hold' : 'die'} onClick={props.holdDice}>
            <img src={props.image} className="die-img" />
        </div>
    )
}