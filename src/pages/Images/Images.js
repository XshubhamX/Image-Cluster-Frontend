import React, { useState } from 'react';
import { ALL_IMAGES } from "../../graphql/allImages"
import { useQuery } from "@apollo/client"
import { download } from "../../functions/Download"
import axios from "axios"
import request from "request"
import "../CSS/Grid.css"
import http from "http"; // or 'https' for https:// URLs
import fs from "fs";

const Images = () => {
    const [allImages, setAllImages] = useState([])
    const { error, data, loading } = useQuery(ALL_IMAGES)

    const save = async () => {
        // const data = await axios.post("http://localhost:4000/download", {
        //     key: "https://eduyear-website-assets.s3.amazonaws.com/uploads/gbpd7pmQg-http___d.gionee.com_nav_20171127_lockimage_20171127_9dab894a_478f_45b7_b22e_b9e14cccf6e0.jpg_1080x1920.png"
        // })

        // const file = fs.createWriteStream("WgHKVcD_6-shubham.jpg");
        const request = http.get("https://eduyear-website-assets.s3.amazonaws.com/uploads/WgHKVcD_6-shubham.jpg", function (response) {
            console.log(response)
        });


        // const { createReadStream, filename } = await data.data.file;

        // console.log(filename)
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
                }) : (<h2>No images</h2>)}
            </div>
        </>
    )
};
export default Images;