import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "./button/Button";
import './app.css';

const ids = ["a","b","c","d"];

export default function App() {
    const [ activeId, setActiveId ] = useState('');
    const [ sequence, setSequence ] = useState('');
    const [ answer, setAnswer ] = useState('');
    const [isDisabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const virtualClick = async () => {
        const promise1 = new Promise((resolve) => {
            setTimeout(() => resolve(ids[Math.floor(Math.random() * 4)]), 1000);
        });

        const promise2 = new Promise((resolve) => {
            setTimeout(() => resolve(''), 1200);
        });

        await promise1.then((val) => setActiveId(val));
        await promise2.then((val) => setActiveId(val));
    };

    useEffect(() => {
        if (answer.length === sequence.length && answer !== '' && sequence !== '') {
            if (answer === sequence) {
                setAnswer('');
                setDisabled(true);
                virtualClick().then();
            } else {
                navigate('/go');
            }
        }
    }, [answer, sequence]);

    useEffect(() => {
        virtualClick().then();
    }, []);


    useEffect(() => {
        setSequence((sequence) => sequence + activeId);
        setDisabled(false);
    }, [activeId]);

    return (
        <div className={"app"}>
            <div className={"score"} style={{ color: "white" }}>Score: 100</div>
            <div className={"buttons"}>
                {
                    ids.map((char, i) => {
                        return <Button
                            isDisabled={isDisabled}
                            answer={answer}
                            sequence={sequence}
                            setAnswer={setAnswer}
                            virtualClick={ virtualClick }
                            key={i}
                            id={char}
                            isActive={char === activeId} />
                    })
                }
            </div>
            <div className={"rating"} style={{ color: "white"}}>Rating table</div>
        </div>
    );
}