import { useEffect, useState } from "react";
import Styles from "../../styles/components/Forms.module.scss";
import { isThisFormValid } from "../../utils/functions";
import InputControl from "../Reusable/InputControl";


const GenreFormInput = ({setIsFormValid,setValues,status,values}) => {
    const [valid, setValid] = useState({
        type: !!status,
     })
     
     useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])
    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 mt-2">
                    <div className="form-group">
                        <InputControl handleChangeV2={handleChangeV2("type")} value={values.type} label="Type"
                                  type="text" validations="required|string|min:3"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenreFormInput