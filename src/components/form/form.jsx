import {useState} from "react";

function Form({handleFormSubmit}) {

    const [input, setInput] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        handleFormSubmit(input)
        setInput("")
    }
    return (
        <>
            <form id="category_from" className="add_category_form" action="">
                <input className="add_category" type="text" placeholder="Name category" name="name_category"
                value={input} onChange={(e) => {setInput(e.target.value)}} />
                <button className="add_category_btn" type="submit" onClick={(e)=> handleClick(e)}>
                    Добавить
                </button>
            </form>
        </>
    )
}

export default Form