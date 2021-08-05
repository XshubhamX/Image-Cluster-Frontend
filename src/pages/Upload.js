import React from 'react';
import { useMutation } from "@apollo/client"
import { UPLOAD_IMAGE } from "../graphql/Mutation"
import UniversalForm from "../components/UniversalForm"

const FileUpload = () => {
    const [mutate, { loading, error }] = useMutation(UPLOAD_IMAGE);
    const uploadFile = async (e) => {
        e.preventDefault()

        const file = e.target.file.files[0]
        const keywords = e.target.keywords.value.split(" ")
        // const type = e.target.type.value


        const { data } = await mutate({ variables: { file, keywords } })
        console.log(data)
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