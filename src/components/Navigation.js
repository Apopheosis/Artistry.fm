import { Link, NavLink} from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation(){
    const setNavStyle = ({isActive})=>{
        return isActive ? styles ['active-link'] : undefined;
    }
    return(
        <nav>
            <NavLink to ="/artists" className={setNavStyle} >По музыканту</NavLink>
            <NavLink to = "/tracks" className={setNavStyle} >По треку</NavLink>
            <NavLink to = "/albums" className={setNavStyle}>По альбому</NavLink>
        </nav>
    )
}