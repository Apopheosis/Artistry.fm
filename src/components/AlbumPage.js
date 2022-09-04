import {getAlbumInfo, getAlbumsImageInfoByAlbum, getTrackInfo} from "../services/GetDataService";
import {useEffect, useMemo, useState} from "react";
import SearchBar from "./SearchBar";

function AlbumPage () {
    const [name, setName] = useState("");
    const [state, setState] = useState({ data: []});
    const [image, setImage] = useState({img: ""});
    const [mbid, setMbid] = useState({mbid: ""});

    const changeName = (e) => {
        setName(() => (e.target.name = e.target.value));
    };

    /*const renderedList = useMemo(() => (
        <ol>
            {info.data.map((x, index) => (

                <li key={index}>
                    <div>
                        <a href={x.url}>{x.artist} - {x.name} ({x.mbid})</a>
                    </div>

                </li>

            ))}
        </ol>
    ), [info.data]);*/

    useEffect(() => {
        setState((state) => ({...state}))
    }, []);

    const search = () => (
        <div>
            <input
                type="text"
                value={name}
                onChange={changeName}
                placeholder="Альбом"
            />
            <button onClick={() => {
                (getAlbumInfo(name).then((data) => {
                    const albums = data.results.albummatches.album[0];
                    const mbid = albums.mbid;
                    setState({ data: albums});
                    setMbid({mbid: mbid})
                    console.log(data);
                }));
                getAlbumsImageInfoByAlbum(mbid.mbid).then((data) => {
                    console.log(data);
                    setImage({img: data.images[0].image});
                }).catch((e) => {
                    setImage({img: "./notfound.png"});
                });
            }
            }>
                Поиск
            </button>
        </div>
    )

    const AlbumData = () => (
        <div>
            <h1>{state.data?.artist} - {state.data?.name}</h1>
            <div className="box">
                <img alt="" src={image.img}/>

            </div>
            <h2><a href={state.data?.url}>Listen here</a></h2>
        </div>
    )

    return (
        <>
            {search()}
            {state.data?.length!==0 && AlbumData()}
        </>

    )
}
export default AlbumPage;