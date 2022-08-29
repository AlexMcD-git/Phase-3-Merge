import React, { useState } from 'react'

function HeroForm() {
    const initialState = {
        name: "",
        strength:0,
        intelligence:0
    }

    const [formState, setFormState] = useState(initialState)
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState((prevState) => ({...prevState, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch ('http://localhost:9393/heros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        .then ((resp) => resp.json())
        .then (setFormState(initialState))
    }
    


    return (
        <div>
            <form className = 'form' onSubmit = {handleSubmit}>
                {"Name: "}
                <input type="text" id = 'input' name="name" placeholder = "Hero's name" value = {formState.name} onChange = {handleChange} /><br />
                <input type="range" min="0" max="20" id = 'input' name="strength" value = {formState.strength} onChange = {handleChange} />{formState.strength} Strength<br />
                <input type="range" min="0" max="20" id = 'input' name="intelligence" value = {formState.intelligence} onChange = {handleChange} />{formState.intelligence} Intelligence<br />

                <button className = 'btn' type="submit"> Add Hero </button>
            </form>
        </div>
  )
}

export default HeroForm