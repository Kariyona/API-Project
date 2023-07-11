// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Form from "./Form";

// const UpdateSpot = () => {
//   const { spotId } = useParams();
//   const spots = useSelector((state) => state.spots);

//   const spotsArray = Object.values(spots);

//   let spot;
//   for (let i = 0; i < spotsArray.length; i++) {
//     if (spotsArray[i].id === parseInt(spotId)) {
//       spot = spotsArray[i]
//     }
//   }

//   return (
//     <Form spot={spot} type="UpdateSpotForm" />
//   )
// };

// export default UpdateSpot;

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "./Form";
import { useEffect } from "react";
import { thunkGetSpot } from "../../store/spots";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArray = Object.values(spots);
  const spot = spotsArray.find((spot) => spot.id === parseInt(spotId));

  useEffect(() => {
    dispatch(thunkGetSpot(spotId))
  }, [dispatch])

  if(!spot) return;
  if(!spot.SpotImages) return;

  return (
    <Form spot={spot} type="UpdateSpotForm" />
  )
};

export default UpdateSpot;
