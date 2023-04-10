import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllSpots } from '../../store/spots';
import SpotIndexItem from './SpotIndexItem';
import './Landing.css'

const SpotIndex = () => {
    const dispatch = useDispatch();

    const spotsObject = useSelector(state => state.spots)
    const spotsObject2 = useSelector(state => state)
    console.log('tag: ', spotsObject2);

    const spots = Object.values(spotsObject || {})

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    return (
        <>
        <div className='spot-index-container'>
            {spots.map((spot) => (
                <SpotIndexItem
                    spot={spot}
                    key={spot.id}
                />
            ))}
        </div>
        </>
    )
}

export default SpotIndex
