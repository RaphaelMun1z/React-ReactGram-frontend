import styles from './Home.module.scss'

// Components
import PhotoItem from '../../components/PhotoItem'
import Loading from '../../components/Loading'

import { useNavigate } from 'react-router-dom'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { getAllFollowingUsersPhotos, like } from '../../slices/photoSlice'

const Home = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)
    const { photos, loading } = useSelector((state) => state.photo)

    // Load all photos
    useEffect(() => {
        dispatch(getAllFollowingUsersPhotos())
    }, [dispatch])

    // Like a photo
    const handleLike = (photo) => {
        dispatch(like(photo._id))
        resetMessage()
    }

    const handleRedirect = (photo_id) => {
        navigate(`/photos/${photo_id}`);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.pageContainer}>
            <section>
                {photos && photos.map((photo) => (
                    <div key={photo._id}>
                        <div onClick={() => handleRedirect(photo._id)}>
                            <PhotoItem photo={photo} user={user} handleLike={handleLike} comments={false} />
                        </div>
                    </div>
                ))}
                {photos && photos.length === 0 && (
                    <h2>Ainda não há fotos publicadas.</h2>
                )}
            </section>
        </div>
    )
}

export default Home