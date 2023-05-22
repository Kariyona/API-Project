import { useDispatch, useSelector } from "react-redux";
import { thunkCreateImage, thunkGetAllSpotsByUser, thunkUpdateSpot } from "../../store/spots";
import { useEffect } from "react";
import SpotIndexItem from "./SpotIndexItem";
import { NavLink } from "react-router-dom";
import "./managespot.css";
import { useHistory } from 'react-router-dom';
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";

const ManageSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => state.spots);
  const spotsObject = Object.values(spots || {});
  // console.log("spots object for manage spot: ", spotsObject);

  useEffect(() => {
    console.log("Calling thunkGetAllSpotsByUser");
    dispatch(thunkGetAllSpotsByUser());
  }, [dispatch]);

  if (!spots) return null;

  const handleUpdate = async (spotId) => {
    console.log("spotId=======", spotId)
    history.push(`/spots/${spotId}/edit`)
  }

  if (spotsObject.length === 0) {
    return (
      <>
        <div>
          <h2>Manage Spots</h2>
          <NavLink to="/spots/new">Create a New Spot</NavLink>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>Manage Spots</h2>
        <div className="spot-tile">
          {spotsObject.map((spot) => (
            <div className="manage-spot-buttons" key={spot.id}>
              <SpotIndexItem spot={spot} key={spot.id} />
              <div className="blah">
              <button className="update-button-1 cursorPointer"onClick={()=>handleUpdate(spot.id)}>Update</button>
              <OpenModalButton
                giveClass="delete-button-1"
                modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                buttonText="Delete"
              />
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default ManageSpot;
