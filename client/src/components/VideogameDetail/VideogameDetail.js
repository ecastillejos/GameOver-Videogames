import React, { useEffect } from "react";
import { changeStatus, getVideogameDetail } from "../../actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import dt from "../../img/dt.png"
import "./VideogameDetail.css"
import img from "../../img/noimg.jpeg"


function VideogameDetail(props) {
    const { getVideogameDetail, vgDetail, changeStatus, status } = props
    let id = props.match.params.id;

    useEffect(() => {
        getVideogameDetail(id)
        changeStatus(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div id="mn-cnt">
            {status && <Redirect to="/home" />}
            <div id="img-cnt"><img id='img-dt' src={dt} alt='dt' /></div>
            <div id="cnt-cnt">
                <div id="cnt-txt">
                    <h1>
                        {vgDetail.name}
                    </h1>
                    <div>
                        {vgDetail.img ? <img id='img-vg' src={vgDetail.img} alt={vgDetail.name} /> :
                            <img id='img-vg' src={img} alt={vgDetail.name} />}
                    </div>
                    <div>
                        {vgDetail.genres && vgDetail.genres.map(i =>
                            <ul key={i.name}>
                                <li>
                                    {i.name}
                                </li>
                            </ul>)}
                    </div>
                    <div>
                        {vgDetail.description && vgDetail.description.replace(/<[^>]+>/g, '')}
                    </div>
                    <br></br>
                    <div>
                        &#128198; {vgDetail.released}
                    </div>
                    <br></br>
                    <div>
                        &#127942; {vgDetail.rating}
                    </div>
                    <br></br>
                    <b>&#127918; Platforms:</b>
                    <div id= 'cnt-cnt-plats'>
                        <div id="cnt-plats">
                            {vgDetail.platforms && vgDetail.platforms.map(i =>
                                <div id='platsvd' key={i}>
                                    {i}
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        vgDetail: state.vgDetail,
        status: state.status
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVideogameDetail: (id) => dispatch(getVideogameDetail(id)),
        changeStatus: (val) => dispatch(changeStatus(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideogameDetail)