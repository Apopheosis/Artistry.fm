import styles from './Navigation.module.css';
import {getArtistData} from "../services/GetDataService";
import {ArtistPage} from "./ArtistPage"
import * as root from "@testing-library/react";



export default function SearchBar(props) {
    return(
        <div>
            <input/>
            <button
            >Find by {props.category}</button>
        </div>

    )
}