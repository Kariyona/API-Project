import Form from "./Form";

const CreateSpot = () => {
    const spot = {
        country: "",
        address: "",
        city: "",
        state: "",
        description: "",
        name: "",
        price: "",
        lat: 0,
        lng: 0
    }
    return (
        <Form spot={spot} type="CreateSpotForm"/>
    )
}

export default CreateSpot;
