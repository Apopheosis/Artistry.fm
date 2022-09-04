import {useState, useEffect, Component, useMemo} from "react";
import {
    getAlbumsImageInfoByAlbum,
    getArtistData,
    getTopAlbums
} from "../services/GetDataService";


function ArtistPage () {
        const [name, setName] = useState("");
        const [info, setInfo] = useState({ data: []});
        const [albums, setAlbums] = useState({ albumsLibrary: []});
        const [image, setImage] = useState({img: ""});
        const [mbid, setMbid] = useState({mbid: ""});
        const changeName = (e) => {
            setName(() => (e.target.name = e.target.value));
        };

        const renderedList = useMemo(() => (
            <ol>


                {albums.albumsLibrary.map((x, index) => (

                    <li key={index}>
                        <div>
                            <a href={x.url}>{x.name}</a>
                            <ul>
                                <li>Playcount: {x.playcount}</li>
                                <li>Mbid: {x.mbid}</li>
                            </ul>
                        </div>

                    </li>
            ))
            }
            </ol>
        ), [albums.albumsLibrary]);

        const tagList = useMemo(() => (
            <div className="little-box">
                <ul className="tags-list">
                    {info.data?.tags?.tag?.map((x, index) => (
                        <li key={index} className="tags-list">
                            {x.name}
                        </li>
                    ))}
                </ul>
            </div>
        ), [info.data])

        useEffect(() => {
            setInfo((info) => ({ ...info}));
            setAlbums((albums) => ({...albums}));
        }, []);

        const search = () => {
            return (<div>
                <input
                    type="text"
                    value={name}
                    onChange={changeName}
                    placeholder="Музыкант"
                />
                <button onClick={() => {
                    (getArtistData(name).then((data) => {
                        let artist = data.artist;
                        console.log(artist.name);
                        setInfo({ data: artist});
                    }));
                    getTopAlbums(name).then((data)=> {
                        let albums = data.topalbums.album
                        const mbid = albums[0].mbid;
                        console.log(albums);
                        setMbid({mbid: mbid})
                        setAlbums({albumsLibrary: albums})
                    });
                    getAlbumsImageInfoByAlbum(mbid.mbid).then((data) => {
                        console.log(mbid.mbid);
                        setImage({img: data.images[0].image});
                    }).catch((e) => {
                        setImage({img: "./notfound.png"});
                    });
                }
                }>
                    Поиск
                </button>
            </div>)
        }
        const ArtistData = () => (
            <div>
                <h2>{info.data?.name} ({info.data?.mbid})</h2>
                <div className="box">
                    <img alt="" src={image?.img}/>

                </div>
                <h2>{albums.albumsLibrary[0]?.artist.name} - {albums.albumsLibrary[0]?.name}</h2>
                {tagList}
                <p>{info.data?.bio?.summary.substring(0, info.data?.bio?.summary.indexOf("<a "))}</p>
                <p>URL: <a href={info.data?.url}>{info.data?.url}</a></p>
                <p>Top albums:</p>
                {renderedList}
            </div>
        )
        return (
            <>
                {search()}
                {info.data.length!==0 && ArtistData()}
            </>
        )
}
export default ArtistPage;