import { NavLink } from "react-router-dom";
import img from "../../img/noimg.jpeg"
import "./Videogame.css"

export default function Videogame(props) {
    return (
        <div id="cnt-vg">
            <NavLink to={`/videogame/${props.id}`} className='txtvg'> <b>{props.name}</b> </NavLink>
            <div id='cnt-img'>
                {props.img ? <img className='imgvg' src={props.img} alt={props.name} /> :
                    <img className='imgvg' src={img} alt={props.name} />}
            </div>
            {props.genres && props.genres.map(i =>
                <div key={i.id} className='txtvg'>{i.name}</div>
            )}
            <div id='rat'>&#127941; {props.rating}</div>
        </div>
    )
}