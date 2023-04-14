import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../store/spots';

const CreateSpotRedirect = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    console.log(spots);
    
    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])


    return (
        <div>
            <h1>test</h1>

        </div>
    )
}

export default CreateSpotRedirect;
