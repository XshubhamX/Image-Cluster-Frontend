import React, { useState } from 'react';
import { ALL_ILLUSTRATIONS } from "../../graphql/allIllustrations"
// import Img from "../../components/Img"
import { useQuery } from "@apollo/client"
import "../CSS/Grid.css"

const Illustrations = () => {
    const [allImages, setAllImages] = useState([])
    const { error, data, loading } = useQuery(ALL_ILLUSTRATIONS)

    console.log(data)

    return (
        <>
            {/* <div class="container">
                {data ? data.allIllustrations.illus.map((x, i) => {
                    return (
                        // <Img key={i} preview={x.preview} />
                        null;
                    )
                }) : (<h2>No images</h2>)}
            </div> */}
        </>
    )
};
export default Illustrations;