import {useRef, useState} from "react";
import Validator from "validatorjs";

export default function SelectControl({label, placeholder, children, handleChangeV2, validations = "required", handleChange, ...selectProps}) {
    const inputContainer = useRef(null)
    const [validation, setValidation] = useState({
        failed: true,
        errors: []
    })

    const handleValidations = (event) => {
        const validate = new Validator({value: inputContainer.current.value}, {value: validations})
        if (validate.fails(undefined))
            setValidation({...validations, failed: false, errors: validate.errors.all().value})
        else
            setValidation({failed: true, errors: []})
        handleChange && handleChange(event)
        handleChangeV2 && handleChangeV2({value: inputContainer.current.value, valid: !validate.fails(undefined)})

    }

    selectProps.className += " form-control " + (validation.failed || "is-invalid")

    
    return (
        <div className="mt-3">
            {label && <label htmlFor="inputI">{label}</label>}
            <select {...selectProps} onChange={handleValidations} ref={inputContainer} defaultValue="-">
                { placeholder && <option disabled value="-"> { placeholder }</option>}
                {children}
            </select>
            <div className="invalid-feedback">{validation.errors[0]}</div>
        </div>
    )
}