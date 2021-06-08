import React, { useEffect, useState } from "react";
import {
    filteredByGenre, addVideogame, addPlatform, deletePlatform,
    updateGenres, changeStatus, getAllVideogamesToPg, setCreated, setPlatforms
} from "../../actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./AddVideogame.css"
import add from "../../img/create.png";
import Videogame from "../Videogame/Videogame"


function AddVideogame(props) {
    const initialState = {
        name: '',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: []
    }
    const [state, setState] = useState(initialState)

    let validate = state;

    const { filteredByGenre, addVideogame, created, changeStatus, status } = props;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    var platformsValue = '';

    useEffect(() => {
        changeStatus(false)
        filteredByGenre()
        setState((state) => ({ ...state, platforms: props.platforms, genres: props.genresToAdd }))
    }, [filteredByGenre, props.platforms, props.genresToAdd, changeStatus])

    function handleSubmit(e) {
        e.preventDefault()
        addVideogame(state)
        props.getAllVideogamesToPg()
        validation()
    }

    function validation(){
        let val= Object.values(validate)
        if (val.includes("")){
            alert("There is an empty field")
        }
    }
    // function validation(){
    //     for (let st in validate){
    //         if (typeof st=== "string"){
    //             if (st===""){alert('There is an empty field')}
    //         } else if (st.isArray()===true){
    //             if (st.length===0){
    //                 alert('There is an empty field')
    //             }
    //         }
    //     }
    // }

    function handleChange(e) {
        if (e.target.name === "genres") {
            let num = parseInt(e.target.id)
            props.updateGenres(num)
        } else if (e.target.name === "platforms") {
            platformsValue = e.target.value;
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }

    function handleCreated(e){
        e.preventDefault()
        props.setCreated()
        props.setPlatforms()
    }

    return (
        <div id='mn-add'>
            {status && <Redirect to="/home" />}
            <div><img id="img-add" src={add} alt='Add' /></div>
            {created.length === 0 &&
                <div className='frm-cnt'>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            Name:
            <input type="text" name='name' autoComplete="off" onChange={e => handleChange(e)} />
                        </div>
                        <div>
                            Description:
            <textarea id='inp-desc' type="text" autoComplete="off" name='description' onChange={e => handleChange(e)} />
                        </div>
                        <div>
                            Released:
            <input type="date" name='released' autoComplete="off" min="1980-01-01" max={`${today}`} onChange={e => handleChange(e)} />
                        </div>
                        <div>
                            Rating:
            <input type="number" min="1" max="5" autoComplete="off" name='rating' onChange={e => handleChange(e)} />
                        </div>
                        <br />
                        <div id="cnt-frm-add">
                            {props.genres && props.genres.map(e =>
                                <div id="onefrm" key={e.id}>
                                    <input type="checkbox" name="genres" id={e.id} onChange={e => handleChange(e)} /> {e.name}
                                </div>)}
                        </div>
                        <div id='platforms'>
                            Platforms:
                        <input type="text" id='platf' autoComplete="off" name='platforms' onChange={e => handleChange(e)} />
                            <button className='sub-btn' onClick={e => props.addPlatform(e, platformsValue)}>Add</button>
                            <div id="cnt-plat">
                            {props.platforms.length > 0 && props.platforms.map(e =>
                                <div id="plat-conj" key={e}>
                                    <span id='pf'>{e}</span>
                                    <button className='sub-btn' name={e} onClick={e => props.deletePlatform(e)}>x</button>
                                </div>
                            )}</div>
                        </div>
                        <br />
                        <br />
                        <input className='sub-btn' id='subm-fin' type="submit" value="Create &#9989;" />
                    </form>
                </div>
            }
            {created.name &&
                <div id='cnt-add'>
                    <div id='added'> Successfully added:</div>
                    <div id="vg-ad">
                        <Videogame
                            name={created.name}
                            id={created.id}
                            img={created.img}
                            genres={created.genres} />
                    </div>
                    <button id='btn-ta' onClick={e => handleCreated(e)}>Create + &#128126;</button>
                </div>
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        genres: state.genres,
        created: state.created,
        platforms: state.platforms,
        genresToAdd: state.genresToAdd,
        status: state.status
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filteredByGenre: () => dispatch(filteredByGenre()),
        addVideogame: (newGame) => dispatch(addVideogame(newGame)),
        addPlatform: (e, platform) => dispatch(addPlatform(e, platform)),
        deletePlatform: (e) => dispatch(deletePlatform(e)),
        updateGenres: (e) => dispatch(updateGenres(e)),
        changeStatus: (val) => dispatch(changeStatus(val)),
        getAllVideogamesToPg: () => dispatch(getAllVideogamesToPg()),
        setCreated: () => dispatch(setCreated()),
        setPlatforms:()=> dispatch(setPlatforms())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideogame)