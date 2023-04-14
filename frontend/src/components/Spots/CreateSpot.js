import "./createspotform.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { thunkCreateSpot } from "../../store/spots";
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

  useEffect(() => {
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
    ) {
      errors.previewImg = "Image URL must end in .png, .jpg, .jpeg";
    }

    // if imageUrl exists check
    // if it ends with png/jpg/jpeg
    // then if it doesn't then put that error into error object
    if (imageUrl1) {
      if (
        !imageUrl1.endsWith(".png") &&
        !imageUrl1.endsWith(".jpg") &&
        !imageUrl1.endsWith(".jpeg")
      ) {
        errors.imageUrl1 = "Image1 URL must end in .png, .jpg, .jpeg"
      }
    }

    if (imageUrl2) {
      if (
        !imageUrl2.endsWith(".png") &&
        !imageUrl2.endsWith(".jpg") &&
        !imageUrl2.endsWith(".jpeg")
      ) {
        errors.imageUrl2 = "Image2 URL must end in .png, .jpg, .jpeg"
      }
    }

    if (imageUrl3) {
      if (
        !imageUrl3.endsWith(".png") &&
        !imageUrl3.endsWith(".jpg") &&
        !imageUrl3.endsWith(".jpeg")
      ) {
        errors.imageUrl3 = "Image3 URL must end in .png, .jpg, .jpeg"
      }
    }

    if (imageUrl4) {
      if (
        !imageUrl4.endsWith(".png") &&
        !imageUrl4.endsWith(".jpg") &&
        !imageUrl4.endsWith(".jpeg")
      ) {
        errors.imageUrl4 = "Image4 URL must end in .png, .jpg, .jpeg"
      }
    }
    setValidationErrors(errors);



    //   if (
    //     (country.length > 0 &&
    //       address.length > 0 &&
    //       city.length > 0 &&
    //       state.length > 0 &&
    //       description.length >= 30 &&
    //       name.length > 0 &&
    //     price.length > 0)
    //   ) {
    //     setInvalid(false);
    //   } else {
    //     setInvalid(true);
    //   }
  }, [country, address, city, state, description, name, price, previewImg]);

  // HANDLE submit
    // if they click submit, we set isSubmitted to true
    // the submit has to check if the error object has errors
    // if there are errors then display those errors
    // if it doesnt it will run the submit
  const handleClick = async (e) => {
    console.log("handle click submit function running")
    e.preventDefault();
    setIsSubmitted(true)

   const errorArr = Object.values(validationErrors)
    console.log("this is errors array in handle click: ", errorArr);
  //  console.log(errorObject);

   if (errorArr.length > 0) {
    console.log("if errors array.lenth === 0 running")
    return
   } else {
    const newSpotData = {
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

        // we need an array
        // if the image exists, make object, then put it inside the array
        const imageArr = [];

        const prevImgObj =
        {
          url: previewImg,
          preview: true,
        }
        imageArr.push(prevImgObj)

        if (imageUrl1) {
          const imageObj1 = {
            url: imageUrl1,
            preview: false
          }
          imageArr.push(imageUrl1);
        }
        if (imageUrl2) {
          const imageObj2 = {
            url: imageUrl2,
            preview: false
          }
          imageArr.push(imageUrl2);
        }
        if (imageUrl3) {
          const imageObj3 = {
            url: imageUrl3,
            preview: false
          }
          imageArr.push(imageUrl3);
        }
        if (imageUrl4) {
          const imageObj4 = {
            url: imageUrl4,
            preview: false
          }
          imageArr.push(imageUrl4);
        }

        console.log("this is new spot object and image array in handle click: ", newSpotData, imageArr)
        console.log("before dispatch");

        const createdSpot = await dispatch(thunkCreateSpot(newSpotData, imageArr));
        console.log("this is after thunk create spot. this is created spot: ", createdSpot)

        // const spotX = newSpot;
        // console.log("newSpot tag: ", spotX);
        // await dispatch(thunkCreateImage(imageObject, spotX.id));
        // console.log("after dispatch");

        if (createdSpot.id) {
          history.push(`/spots/${createdSpot.id}`)
        }
    }
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
          required
        />
      </div>
      {isSubmitted && (
        <span className="errors">{validationErrors.country}</span>
      )}

      <div className="form-data">
        <label htmlFor="">Street Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
      </div>
      {isSubmitted && (
        <span className="errors">{validationErrors.address}</span>
      )}

      <div className="form-data">
        <label htmlFor="">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.city}</span>}

      <div className="form-data">
        <label htmlFor="">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="STATE"
          required
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.state}</span>}
      {/* <div className="form-data">
        <label htmlFor="">Latitude</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
      </div>
      <div className="form-data">
        <label htmlFor="">Longitude</label>
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
          required
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
          required
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
        <label htmlFor="">$ </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price per night (USD)"
          required
        />
      </div>
      {isSubmitted && <span className="errors">{validationErrors.price}</span>}
      <div className="line"></div>
      <div className="form-data">
        <h3>Liven up your spot with photos</h3>
        <p>
          Submit a link to at least one photo to publish your spot. The first
          spot will be the preview image.
        </p>
        <div className="image-links">
          <input
            type="text"
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            placeholder="Preview image URL"
            required
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
        <button onClick={handleClick}>
          Create Spot
        </button>
      </div>
    </div>
  );
};

export default Form;
