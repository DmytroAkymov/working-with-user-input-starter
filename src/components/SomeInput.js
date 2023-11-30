import { useState } from 'react';

const SomeInput = (props) => {
    const [enteredName, setEnteredName] = useState('');
    const [wasNameInputTouched, setWasNameIputTouched] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [wasEmailInputTouched, setWasEmailIputTouched] = useState(false);

    const isEnteredEmailValid =
        enteredEmail.trim() !== '' && enteredEmail.includes('@');
    const isEmailInputInvalid = !isEnteredEmailValid && wasEmailInputTouched;

    const isEnteredNameValid = enteredName.trim() !== '';
    const isNameIputInvalid = !isEnteredNameValid && wasNameInputTouched;

    let isFormValid = false;

    if (isEnteredNameValid && isEnteredEmailValid) {
        isFormValid = true;
    }

    const nameEmailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const nameEmailLostFocusHandler = () => {
        setWasEmailIputTouched(true);
    };

    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const nameInputLostFocusHandler = () => {
        setWasNameIputTouched(true);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setWasNameIputTouched(true);
        setWasEmailIputTouched(true);
        if (!isEnteredNameValid && !isEnteredEmailValid) {
            return;
        }

        setEnteredName('');
        setWasNameIputTouched(false);
        setEnteredEmail('');
        setWasEmailIputTouched(false);
    };

    // const nameInputClasses = isNameIputInvalid
    //     ? 'form-control invalid'
    //     : 'form-control';

    const generateClasses = (isInvalid) => {
        return isInvalid ? 'form-control invalid' : 'form-control';
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={generateClasses(isNameIputInvalid)}>
                <label htmlFor="name">Enter your name</label>
                <input
                    type="text"
                    id="name"
                    onBlur={nameInputLostFocusHandler}
                    onChange={nameInputChangeHandler}
                    value={enteredName}
                    placeholder="Enter your name"
                />
                {isNameIputInvalid && (
                    <p className="error-text">Please enter your name!</p>
                )}
            </div>
            <div className={generateClasses(isEmailInputInvalid)}>
                <label htmlFor="email">Enter your e-mail</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={enteredEmail}
                    onChange={nameEmailChangeHandler}
                    onBlur={nameEmailLostFocusHandler}
                />
                {isEmailInputInvalid && (
                    <p className="error-text">Please enter your email!</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!isFormValid}>Send</button>
            </div>
        </form>
    );
};

export default SomeInput;
