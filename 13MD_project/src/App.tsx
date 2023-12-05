import './App.css'
import React, {useRef, useEffect, useState, cloneElement} from 'react';

const App = () => {

    const [formInput, setFormInput] = useState<string>('');
    const [inputArr, setInputArr] = useState<string[]>([]);
    const [loadButton, setLoadButton] = useState(true);
    const [count, setCount] = useState(100);
    const [color, setColor] = useState('redClass');
    const [colorArr, setColorArr] = useState([]);
    const [dynamicInput, setDynamicInput] = useState('');
    const [secCount, setSecCount] = useState(0);
    const [bgColor, setBgColor] = useState(false);

    const backgroundColor = {
        backgroundColor: !bgColor ? 'black' : 'gold'
    }

    const cloneElem = <div className={'clone'}></div>
    const [cloneArr, setCloneArr] = useState([cloneElem]);


    const inputRef = useRef<HTMLInputElement | null> (null);
    const initialInputRef = useRef<HTMLInputElement | null>(null);

    const fontSize = {
        fontSize: secCount
    }


    useEffect(() => {
        initialInputRef.current.focus();
        console.log('First Render')

        const timeoutId = setTimeout(() => {
            setLoadButton(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);


    // useEffect(() => {
    //     console.log('Render')
    // }, [inputArr, loadButton, count, color, colorArr]);



    const handleClick = (e) => {
        e.preventDefault()

        setInputArr([...inputArr, formInput]);
        setFormInput('');


        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleClickCount = () => {
        setCount(count + 1);
        console.log('changing count: ' + (count + 1))
    }

    const handleColorChange = (e) => {
        setColor(e.target.value)
    }

    const handleSecCount = (e) => {
        e.preventDefault()
        setSecCount(secCount + 1)
    }

    const addDivColor = () => {
        setColorArr([...colorArr, color])
    }

    const changeColor = () => {
        setBgColor(true)
    }

    const cloneDiv = () => {
        const clone = cloneElement(cloneElem)
        setCloneArr([...cloneArr, cloneElem])
        console.log(clone)
    }

  return (
    <>
        <div>
            <div>
                <form>
                    <label>
                        <input
                            name="focus"
                            placeholder={'Write something...'}
                            ref={initialInputRef}
                        />
                    </label>
                    <br/>
                    <label>
                        <input
                            name="focus"
                            value={formInput}
                            onChange={(e) => {setFormInput(e.target.value); console.log('input change'); document.title = e.target.value}}
                            placeholder={'Write something...'}
                            ref={inputRef}
                        />
                    </label>
                    <button type={'submit'} onClick={handleClick} >
                        Submit
                    </button>
                </form>
            </div>
            <div>
                <ul>
                    {inputArr.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <button disabled={loadButton} className={'disable_button'}>
                    Poga
                </button>
            </div>
            <div>
                <button onClick={handleClickCount}>
                    Count: {count}
                </button>
                <p>{count * 2}</p>
            </div>
            <div>
                <button onClick={addDivColor}>+</button>
                <select id="" value={color} onChange={handleColorChange}>
                    <option value="redClass">Red</option>
                    <option value="greenClass">Green</option>
                    <option value="blueClass">Blue</option>
                    <option value="yellowClass">Yellow</option>
                    <option value="orangeClass">Orange</option>
                    <option value="blackClass">Black</option>
                </select>
            </div>
            <div className={'colorDivs'}>
                {colorArr.map((colorClass, index) => (
                    <div className={colorClass} key={index}></div>
                ))}
            </div>
            <div>
                <form>
                    <label>
                        <input
                            value={dynamicInput}
                            name="textbelow"
                            placeholder={'Write something...'}
                            onChange={(e) => {setDynamicInput(e.target.value)}}
                        />
                    </label>
                    <p>{dynamicInput}</p>
                    <button onClick={handleSecCount}>
                        +
                    </button>
                    <p style={fontSize}>{secCount}</p>
                </form>
            </div>
            <div>
                <div>
                    <button onClick={changeColor}>
                        Change color
                    </button>
                    <div className={'goldenDiv'} style={backgroundColor}></div>
                </div>
                <div className={'colorDivs'}>
                    <button onClick={cloneDiv}>
                        Clone
                    </button>
                    {cloneArr.map((value, index) => (
                            value
                    ))}
                </div>
                <div></div>
            </div>
        </div>
    </>
  )
}

export default App
