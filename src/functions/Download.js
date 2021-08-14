import fs from "fs"
import request from "request"

export const download = function (uri, callback) {

    const filename = uri.split("-")[1]

    request.head(uri, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};