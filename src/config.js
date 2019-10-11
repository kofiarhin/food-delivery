import moment from "moment";
import randomString from "randomstring";

const genDate = () => {

    const date = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    return date;
}



const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg";
const restDefaultImage = "https://doorservers.com/media/images/default_restaurant.png";
const foodDefaultImage = "http://myeatable.com/assets/images/default-food-image-large.png"

const genPassword = () => {

    const randString = randomString.generate({
        length: 8,
        charset: 'alphabetic'
    })

    return randString;

}

export { genDate, defaultImage, restDefaultImage, genPassword, foodDefaultImage }