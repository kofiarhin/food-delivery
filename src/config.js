import moment from "moment";

const genDate = () => {

    const date = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    return date;
}

export { genDate }