import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpot } from '../../store/spots';
import './Landing.css';

const SpotIndexItem = ({ spot }) => {
    let dispatch = useDispatch()
    // const handleDelete = (e) => {
    //     e.preventDefault();
        // dispatch(thunkGetSpot(spot.id))
    //
    console.log(spot);
    return (
        <>
        <div className="spot-card">

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
