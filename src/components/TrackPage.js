import {useEffect, useMemo, useState} from "react";
import {getArtistData, getTopAlbums, getTrackInfo} from "../services/GetDataService";

function TrackPage () {
        const [name, setName] = useState("");
        const [info, setInfo] = useState({ data: []});
        const changeName = (e) => {
            setName(() => (e.target.name = e.target.value));
        };

        const renderedList = useMemo(() => (
        <ol>
            {info.data.map((x, index) => (

                <li key={index}>
                    <div>
                        <a href={x.url}>{x.artist} - {x.name}</a>
                        <ul>
                            <li>MBID: {x.mbid}</li>
                            <li>Streamable: {x.streamable}</li>
                            <li>Listeners: {x.listeners}</li>
                        </ul>
                    </div>

                </li>

            ))}
        </ol>
    ), [info.data]);

        useEffect(() => {
            setInfo((info) => ({ ...info}));
        }, []);

        const search = () => (
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={changeName}
                    placeholder="Трек"
                />
                <button onClick={() => {
                    (getTrackInfo(name).then((data) => {
                        let track = data.results.trackmatches.track;
                        console.log(track)
                        setInfo({ data: track });
                    }));
                }
                }>
                    Поиск
                </button>
            </div>
        )

        return (
            <>
                {search()}
                {renderedList}
            </>

        )
}
export default TrackPage;