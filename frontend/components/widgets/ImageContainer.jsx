import { useEffect, useState } from "react";

export const ImageContainer = ({file, status}) => {
    const [img, setImg] = useState("")
    

    useEffect(() => {
        if (status !== "update") {
            if (file) {
                let reader = new FileReader();
                reader.onload = function (evt) {
                    setImg(evt.target.result)
                }
                reader.onerror = function (evt) {
                    console.log(evt)
                }
                reader.readAsDataURL(file)
            }
        } else {
            setImg(file)
        }

    }, [file])
    return (
        <div className="col-2">
            <img src={img} id="imageSpace" style={otherStyles.img}/>
        </div>
    )
}


const otherStyles = {
    img: {
        maxWidth: "20em",
        maxHeight: "10em",
        border: "0.5em"
    }
}