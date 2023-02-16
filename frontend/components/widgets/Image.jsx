import {DEFAULT_VARIABLES} from "../../utils/constants";

const Image = (props) => {
    return (
        <>
            <img src={props.src ? props.src : props.default}  {...props}
                 onError={({currentTarget}) => {
                     currentTarget.onerror = null;
                     currentTarget.src = props.default
                 }}/>
        </>
    )
}

export default Image;