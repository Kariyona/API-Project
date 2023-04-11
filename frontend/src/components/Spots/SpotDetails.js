import { useDispatch, useSelector } from "react-redux";
import "./detailspage.css";
import { thunkGetSpot } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SpotDetails = () => {
  let dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots);
  const spotsObject = Object.values(spots || {});
  const spot = spotsObject.find((spot) => spot.id === parseInt(spotId));

  //test

  useEffect(() => {
    dispatch(thunkGetSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  console.log("spots: ", spot);

  const handleReserveBtnClick = () => {
    alert("Feature Coming Soon...")
  }
  return (
    <>
      <div>
        <div className="spot-name-and-location-subtitle">
          <h2>{spot.name}</h2>
          <p>
            {spot.city}, {spot.state}, {spot.country}
          </p>
        </div>

        <div className="spot-images">
          {spot.SpotImages?.map((image) => (
            <img key={image.id} src={image.url} alt="image"/>
          ))}
        </div>

        <div className="host-and-description">
          <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
          <p>{spot.description}</p>
        </div>

        <div className="callout-info-box">
          <div className="price">
            {`$${spot.price} night`}
          </div>

          <div className="star-reviews"></div>

          <div className="reserve-button">
            <button onClick={handleReserveBtnClick}>Reserve</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default SpotDetails;
