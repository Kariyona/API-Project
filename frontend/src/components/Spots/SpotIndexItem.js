import { useDispatch } from "react-redux";
// import { thunkGetSpot } from '../../store/spots';
import './Landing.css';
import { useHistory } from 'react-router-dom';


const SpotIndexItem = ({ spot }) => {
    let dispatch = useDispatch()
    const history = useHistory();
    // const handleDelete = (e) => {
    //     e.preventDefault();
        // dispatch(thunkGetSpot(spot.id))
    //
    // console.log(spot);

    const handleSpotDetailsClick = () => {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <>
        <div className="spot-card" onClick={handleSpotDetailsClick}>

            <div className="spot-card-tile" title={spot.name}>
                <div className="spot-image"><img src={spot.previewImage} alt={spot.name}/>
                </div>

                <div className="city-state-rating">
                    <div className="city-and-state">{spot.city}, {spot.state}</div>

                    <div className="edit-star-and-rating">
                        <i className="fa-solid fa-star" />
                        <p>{spot.avgRating}</p>
                    </div>
                </div>

                <div className="Price">
                    {`$${spot.price} night`}
                    {/* {spot.price} night */}
                </div>
            </div>

        </div>
        </>
    )
}

export default SpotIndexItem

//<i class="fa-solid fa-star"></i>
