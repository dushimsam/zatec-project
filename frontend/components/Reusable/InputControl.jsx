import { useRef, useState } from "react";
import Validator from "validatorjs";

export default function InputControl({ label, type="text", handleChangeV2, validations = "required", handleChange, ...inputProps }) {
    const inputContainer = useRef(null)
    const [validation, setValidation] = useState({
        failed: true,
        errors: []
    })

    const handleValidations = (event) => {
        const validate = new Validator({value: inputContainer.current.value}, {value: validations})
        if(validate.fails(undefined))
            setValidation({...validations, failed: false, errors: validate.errors.all().value})
        else
            setValidation({failed: true, errors: []})
        handleChange && handleChange(event)
        handleChangeV2 && handleChangeV2({value: inputContainer.current.value, valid: !validate.fails(undefined)})
    }

    inputProps.className += " form-control " + (validation.failed ? inputContainer.current?.value.length > 0 && "is-valid" : "is-invalid")

    return (
        <div className="mt-3">
            { label && <label htmlFor="inputI">{label}</label> }
            <input type={type} id="inputI" {...inputProps} onChange={handleValidations} ref={inputContainer}/>
            <div className="invalid-feedback">{validation.errors[0]}</div>
        </div>
    )
}



export  function InputTextArea({ label, type="text", handleChangeV2, validations = "required", handleChange, ...inputProps }) {
    const inputContainer = useRef(null)
    const [validation, setValidation] = useState({
        failed: true,
        errors: []
    })

    const handleValidations = (event) => {
        const validate = new Validator({value: inputContainer.current.value}, {value: validations})
        if(validate.fails(undefined))
            setValidation({...validations, failed: false, errors: validate.errors.all().value})
        else
            setValidation({failed: true, errors: []})
        handleChange && handleChange(event)
        handleChangeV2 && handleChangeV2({value: inputContainer.current.value, valid: !validate.fails(undefined)})
    }

    inputProps.className += " form-control " + (validation.failed ? inputContainer.current?.value.length > 0 && "is-valid" : "is-invalid")

    return (
        <div>
            { label && <label htmlFor="inputI">{label}</label> }
            <textarea
                type="text"
                className="form-control block w-75 h-50"
                id="inputI" {...inputProps} onChange={handleValidations} ref={inputContainer}
                onChange={handleValidations}
            />
            <div className="invalid-feedback">{validation.errors[0]}</div>
        </div>
    )
}