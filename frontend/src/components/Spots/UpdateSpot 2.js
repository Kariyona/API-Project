import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "./Form";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots);

  const spotsArray = Object.values(spots);

  let spot;
  for (let i = 0; i < spotsArray.length; i++) {
    // console.log("this is i: ", i);
    // console.log("spots Array at i: ", spotsArray[i])
    if (spotsArray[i].id === parseInt(spotId)) {
      spot = spotsArray[i]
    }
  }

  return (
    <Form spot={spot} type="UpdateSpotForm" />
  )
};

export default UpdateSpot;
