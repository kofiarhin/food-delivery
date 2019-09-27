import moment from "moment";

const genDate = () => {

    const date = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    return date;
}


const auth = () => {

    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");

    if (userId) {

        return {
            auth: true,
            role
        }
    }
}


const redirect = (props, path) => {
    props.history.push(path);
}


const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg";



export { genDate, auth, redirect, defaultImage }