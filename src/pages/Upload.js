import React from 'react';
import { useMutation } from "@apollo/client"
import { UPLOAD_IMAGE } from "../graphql/Mutation"
import UniversalForm from "../components/UniversalForm"

const FileUpload = () => {
    const [mutate, { loading, error }] = useMutation(UPLOAD_IMAGE);
    const uploadFile = async (e) => {
        e.preventDefault()

        console.log(e.target)
        const file = e.target[0].file.files[0]
        const preview = e.target[1].file.files[1]
        const keywords = e.target.keywords.value.split(" ")
        // const type = e.target.type.value

        // const { data } = await mutate({ variables: { file, keywords, type: "image", preview } })
        // console.log(data)
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return (
        <div className="container">
            <UniversalForm upload={uploadFile} />
        </div>
    );
};
export default FileUpload;