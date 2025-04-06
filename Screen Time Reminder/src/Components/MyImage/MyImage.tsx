import myImage from '../../assets/react.svg';
import './MyImage.css'

function MyImage() {
    return (
        <img className='image' src={myImage} alt="Clock photo" />
    );
}

export default MyImage;