import './Homes.scss';
import exampleHomePhoto from '../../images/home-main-photo-example.jpg';
import { useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { toast } from 'react-toastify';

export default function HomeDetails() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');
    const [homeDetails, setHomeDetails] = useState({});
    const [photo, setPhoto] = useState(null);

    const fetchHomeDetails = () => {
        fetch(`${hostUrl}/home/${homeId}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setHomeDetails(json);
            });
    };

    useEffect(fetchHomeDetails, [homeId]);

    const handleOnPhotoUpload = (event) => {
        setPhoto({
            selectedFile: event.target.files[0],
        });
    };

    const uploadPhoto = () => {
        const formData = new FormData();

        // Update the formData object
        formData.append('photo', photo.selectedFile, photo.selectedFile.name);
        formData.append('home_id', homeId);
        fetch(`${hostUrl}/home-photos`, {
            method: 'POST',
            body: formData,
        }).then((resp) => {
            if (resp.ok) {
                toast.success('Photo uploaded!', { autoClose: 3000, pauseOnHover: false });
                return resp.json();
            }
            toast.error('Photo not uploaded!', { autoClose: 3000, pauseOnHover: false });
        });
    };

    return (
        <section className="home-details-container">
            <div className="home-details-image-container">
                <img src={homeDetails.photo_url} alt="Home" onError={(e) => {e.target.onError = null; e.target.src = exampleHomePhoto}} />
            </div>
            <div className="home-details-text">
                <h2>{homeDetails.title}</h2>
                <p>Location: {homeDetails.city}</p>
                <p>Neighborhood: {homeDetails.neighborhood}</p>
                <p>Address: {homeDetails.address}</p>
                <p>Price: {homeDetails.price}</p>
                <p>Year: {homeDetails.year}</p>
                <p>Information: {homeDetails.description}</p>
            </div>
            <input type="file" name="photo" onChange={handleOnPhotoUpload} />
            <button onClick={uploadPhoto}>Upload photo</button>
        </section>
    );
}
