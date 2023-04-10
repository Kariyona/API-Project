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


  useEffect(() => {
    dispatch(thunkGetSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  console.log("spots: ", spot);

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
            <img key={image.id} src={image.url} />
          ))}
        </div>

        <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
      </div>
    </>
  );
};

export default SpotDetails;
