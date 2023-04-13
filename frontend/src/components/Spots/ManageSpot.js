import { useDispatch, useSelector } from "react-redux";
import { thunkCreateImage, thunkGetAllSpotsByUser } from "../../store/spots";
import { useEffect } from "react";
import SpotIndexItem from "./SpotIndexItem";

const ManageSpot = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsObject = Object.values(spots || {});
  console.log("spots object for manage spot: ", spotsObject);

  useEffect(() => {
    console.log('Calling thunkGetAllSpotsByUser');
    dispatch(thunkGetAllSpotsByUser(spots))
  }, [dispatch])

  if (!spots) return null;

  return (
    <>
      <div>
        <h2>Manage Spots</h2>
        <div>
          {spotsObject.map((spot) => (
            <SpotIndexItem
                spot={spot}
                key={spot.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageSpot;
