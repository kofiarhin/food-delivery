import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { firebase } from "../../../firebase";
import "./uploader.sass"

class Uploader extends Component {

    state = {
        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: ""
    };


    handleUploadStart = () => {

        this.setState({
            isUploading: true,
            progress: 0
        })
    }


    handleUploadError = () => {

        this.setState({
            isUploading: false,
            progress: 0
        })
    }

    handleProgress = (progress) => {

        this.setState({
            progress
        })
    }

    handleUploadSuccess = (filename) => {

        this.setState({
            avatar: filename,
            progress: 100,
            isUploading: false
        })

        //get download url
        firebase.storage().ref("images").child(filename).getDownloadURL().then(url => {

            this.setState({
                avatarURL: url
            });

            const fileData = {
                filename: filename,
                fileUrl: url
            }

            this.props.storeFilename(fileData);
        })
    }

    renderAvatar = () => {

        const avatarUrl = this.state.avatarURL;



        return avatarUrl ? <div className="aatar" style={{
            backgroundImage: `url(${avatarUrl})`,
            width: "100%",
            height: "300px",
            backgroundSize: "cover"
        }}>

        </div> : null;
    }



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
            {this.renderAvatar()}

        </div>
    }
}

export default Uploader;