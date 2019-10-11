import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { firebase } from "../../firebase";



class Uploader extends Component {

    state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: ""
    };

    render() {

        return <div>

            <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
            />

        </div>
    }
}

export default Uploader;