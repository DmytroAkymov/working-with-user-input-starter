import { useState, useRef } from 'react';

const SomeInput = (props) => {
    const nameIputRef = useRef();
    const [enteredName, setEnteredName] = useState('');
    const [isEnteredNameValid, setIsEnteredNameValid] = useState(false);
    const [wasNameInputTouched, setWasNameIputTouched] = useState(false);
    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
        if (enteredName.trim() === '') {
            setIsEnteredNameValid(false);
            return;
        }
    };

    const nameInputLostFocusHandler = (event) => {
        setWasNameIputTouched(true);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setWasNameIputTouched(true);
        if (enteredName.trim() === '') {
            setIsEnteredNameValid(false);
            return;
        }
        setIsEnteredNameValid(true);
        setEnteredName('');
    };

    const isNameIputInvalid = !isEnteredNameValid && wasNameInputTouched;

    const nameInputClasses = isNameIputInvalid
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Enter your name</label>
                <input
                    ref={nameIputRef}
                    type="text"
                    id="name"
                    onBlur={nameInputLostFocusHandler}
                    onChange={nameInputChangeHandler}
                    value={enteredName}
                />
                {isNameIputInvalid && (
                    <p className="error-text">Please enter your name!</p>
                )}
            </div>
            <div className="form-actions">
                <button>Send</button>
            </div>
        </form>
    );
};

export default SomeInput;
