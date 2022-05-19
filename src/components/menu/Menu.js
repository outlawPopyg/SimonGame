import React from 'react';
import { Link } from "react-router-dom";
import sound from '../../sounds/c.mp3';
import useSound from "use-sound";
import './Menu.css';

export default function Menu() {
    const [s] = useSound(
        sound,
        {volume: 0.0001}
    );
    return (
        <div className={"wrapper"}>
            <h1 className={"title"}>Simon game</h1>
            <div className={"menu"}>
                <div className={"start"}>
                    <Link onClick={() => s()} to={"/app"}>Start</Link>
                </div>
                <div className={"info"}>
                    <Link to={"/info"}>Rules</Link>
                </div>
            </div>
        </div>
    );
}