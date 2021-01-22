import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Reproductor from "./Reproductor";


function Song() {
    let [musicas, setMusica] = useState(null)

    const [statePlayButton, setState] = useState({
        play: false,
        isActive: true,
        users: null,
    });

    const fetchApi = async () => {
        const responde = await fetch("https://assets.breatheco.de/apis/sound/songs", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        const respondeJSON = await responde.json()
        setMusica(respondeJSON)

    }
    useEffect(() => {
        fetchApi()
    }, [])

    let [songActive, setSongActive] = useState(null)

    let audioRef = useRef(null);

   function setSingleSong(url, index) {
        audioRef.src = `https://assets.breatheco.de/apis/sound/${url}`;
        setSongActive(index);
        statePlayButton.play = true;
    }
    function playSong() {
        if (songActive !== null) { 
            audioRef.play();
            statePlayButton.play = true;
        }
    } 
    function pauseSong(){
        if(songActive !== null){
            audioRef.pause();
            statePlayButton.play = false;
        }
    }
    function nextSong() {
        let nextSong = songActive !== null ? songActive === musicas.length - 1 ? 0 : songActive + 1 : 0;
        setSingleSong(musicas[nextSong].url, nextSong);
        playSong();
    }
    function prevSong() {
        let prevSong = songActive !== null ? songActive === 0 ? musicas.length - 1 : songActive - 1 : 0;
        setSingleSong(musicas[prevSong].url, prevSong);
        playSong();
    }


    return (
        <>
            <div className="card-body bg-dark text-white">
                <ol>
                    {
                        !!musicas ?
                            musicas.map((musica, i) => {

                                return <div key={i} className="list-group" id="list-tab" role="tablist" >
                                    <a className="list-group-item list-group-item-action text-white bg-dark selected" id="list-home-list" data-toggle="list" href="#list-home" role="tab" onClick={() => setSingleSong(musica.url, i)}> {musica.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{musica.name} </a>
                                </div>
                            })
                            : "loadin.."
                    }
                </ol>
                <audio ref={r => audioRef = r} autoPlay />
            </div>
           <Reproductor prevSong={prevSong} nextSong={nextSong} playSong={playSong} pauseSong={pauseSong} statePlayButton={statePlayButton} setState={setState}/>

        </>

    );


}

export default Song;