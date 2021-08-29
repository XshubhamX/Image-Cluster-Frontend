import React, { useState } from 'react';
import { ALL_IMAGES } from "../../graphql/allImages"
import { useQuery } from "@apollo/client"
import Spinner from "../../components/Spinner"
import "../CSS/Grid.css"


const Images = () => {
    const [allImages, setAllImages] = useState([])
    const { error, data, loading } = useQuery(ALL_IMAGES)

    let reverts;
    if (!error) {
        reverts = (<Spinner />)
    }
    else {
        reverts = (<h2>Error</h2>)

    }

    return (
        <>
            <div id="gallery" class="container-fluid">

                {data ? data.allImages.images.map((x, i) => {
                    return (
                        <>
                            <a href={x.file} key={i} download>
                                <img src={x.preview} class="img-responsive" alt="dq" />

                            </a>
                        </>
                    )
                }) : reverts}
            </div>
        </>
    )
};
export default Images;