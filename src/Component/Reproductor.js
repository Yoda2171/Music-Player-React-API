import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Reproductor({playSong, nextSong, prevSong, pauseSong, statePlayButton, setState }) {

    return (
        <>
            <div className="card-footer text-center bg-dark">
                
                <div className="btn-group btn-group-lg " role="group" aria-label="Basic example">
                    <div className="anterior">
                        <button type="button" className="btn btn-dark btn-lg" onClick={prevSong} ><i className="fas fa-caret-left"></i></button>
                    </div>
                    <div className="play">
                    <button id="playButton" type="button" className="btn btn-dark btn-lg" onClick={() => setState({ ...statePlayButton, play: statePlayButton.play })  }>{statePlayButton.play ? <i className="fas fa-pause" onClick={pauseSong}></i> : <i className="fas fa-play" onClick={playSong}></i>}</button>
                    </div>
                    <div className="next">
                        <button type="button" className="btn btn-dark btn-lg" onClick={nextSong}><i className="fas fa-caret-right"></i></button>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Reproductor