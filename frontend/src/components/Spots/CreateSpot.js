import "./createspotform.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { thunkCreateImage, thunkCreateSpot } from "../../store/spots";
const Form = () => {
  const history = useHistory();
  let dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  // const [invalid, setInvalid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useEffect(() => {
  //   (country.length > 0 &&
  //       address.length > 0 &&
  //       city.length > 0 &&
  //       state.length > 0
  //       )
  // }) ? setInvalid(false) : setInvalid(true)

  const handleClick = async (e) => {
    e.preventDefault();
    const errors = {};
    if (country.length === 0) errors.country = "Country is required";
    if (address.length === 0) errors.address = "Address is required";
    if (city.length === 0) errors.city = "City is required";
    if (state.length === 0) errors.state = "State is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (name.length === 0) errors.name = "Name is required";
    if (price.length === 0) errors.price = "Price is required";
    if (previewImg.length === 0)
      errors.previewImg = "Preview image is required";
    if (
      !previewImg.endsWith(".png") &&
      !previewImg.endsWith(".jpg") &&
      !previewImg.endsWith(".jpeg")
    )
      errors.previewImg = "Image URL must end in .png, .jpg, .jpeg";

    setValidationErrors(errors);
    const data = {
      address,
      city,
      state,
      country,
      lat: 0,
      lng: 0,
      name,
      description,
      price,
    };

    const imageObject = {
      url: previewImg,
      preview: true,
    };
    console.log("before dispatch")
    const newSpot = await dispatch(thunkCreateSpot(data));
    const spotX = newSpot;
    console.log("newSpot tag: ", spotX);
    await dispatch(thunkCreateImage(imageObject, spotX.id));
    console.log("after dispatch")
    setIsSubmitted(true);
  };
  // console.table(data)

  return (
    <div className="form-container">
      <h1>Create a new Spot</h1>
      <div className="form-data">
        <h3>Where's your place located?</h3>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <label htmlFor="">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
      </div>
      {isSubmitted && (
        <span className="errors">{validationErrors.country}</span>
      )}

      <div className="form-data">
        <label htmFor="">Street Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      {isSubmitted && (
        <span className="errors">{validationErrors.address}</span>
      )}

      <div className="form-data">
        <label htmFor="">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.city}</span>}

      <div className="form-data">
        <label htmFor="">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="STATE"
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.state}</span>}
      {/* <div className="form-data">
        <label htmFor="">Latitude</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
      </div>
      <div className="form-data">
        <label htmFor="">Longitude</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
      </div> */}
      <div className="line"></div>

      <div className="form-data">
        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters"
        />
      </div>
      {isSubmitted && (
        <span classname="errors">{validationErrors.description}</span>
      )}
      <div className="line"></div>

      <div className="form-data">
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of your spot"
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.name}</span>}

      <div className="line"></div>

      <h3>Set a base price for your spot</h3>
      <p>
        Competitive pricing can help your listing stand out and rank higher in
        search results.
      </p>
      <div className="form-data">
        <label htmFor="">$ </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price per night (USD)"
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.price}</span>}
      <div className="line"></div>
      <div className="form-data">
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="image-links">
          <input
            type="text"
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            placeholder="Preview image URL"
          />
          {isSubmitted && (
            <span className="errors">{validationErrors.previewImg}</span>
          )}
          <input
            type="text"
            value={imageUrl1}
            onChange={(e) => setImageUrl1(e.target.value)}
            placeholder="Image URL"
          />
          {isSubmitted && (
            <span className="errors">{validationErrors.imageUrl1}</span>
          )}
          <input
            type="text"
            value={imageUrl2}
            onChange={(e) => setImageUrl2(e.target.value)}
            placeholder="Image URL"
          />
          <input
            type="text"
            value={imageUrl3}
            onChange={(e) => setImageUrl3(e.target.value)}
            placeholder="Image URL"
          />
          <input
            type="text"
            value={imageUrl4}
            onChange={(e) => setImageUrl4(e.target.value)}
            placeholder="Image URL"
          />{" "}
        </div>

        <div className="line"></div>
        <button onClick={handleClick}>Create Spot</button>
      </div>
    </div>
  );
};

export default Form;
