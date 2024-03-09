import styles from './Profile.module.scss'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux
import { getUserDetails } from '../../slices/userSlice'
import { publishPhoto, resetMessage, getUserPhotos } from '../../slices/photoSlice'

import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

const Profile = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    // New form and edit form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getUserPhotos(id))
    }, [dispatch, id])

    const handleFile = (e) => {
        const image = e.target.files[0]

        setImage(image)
    }

    const submitHandle = (e) => {
        e.preventDefault()

        const photoData = {
            title,
            image
        }

        // Build form data
        const formData = new FormData()

        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]))

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData))

        setTitle("")

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.imageContainer}>
                        {user.profileImage && (
                            <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                        )}
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.insideDescription}>
                            <h1 className={styles.name}>{user.name}</h1>
                            <p className={styles.bio}>{user.bio}</p>
                        </div>
                    </div>
                </div>

                {id === userAuth._id && (
                    <div className={styles.container}>
                        <div className={styles.newPhoto} ref={newPhotoForm}>
                            <h3>Compartilhe algum momento seu:</h3>
                            <form onSubmit={submitHandle}>
                                <label>
                                    <span>Título para a foto:</span>
                                    <input type="text" placeholder='Insira um título' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                                </label>
                                <label>
                                    <span>Imagem:</span>
                                    <input type="file" onChange={handleFile} />
                                </label>
                                {!loadingPhoto && <input type="submit" value="Publicar" className={styles.btnSubmit} />}
                                {loadingPhoto && <input type="submit" value="Aguarde..." disabled className={styles.btnSubmit} />}
                                {errorPhoto && <Message msg={errorPhoto} type="error" />}
                                {messagePhoto && <Message msg={messagePhoto} type="success" />}
                            </form>
                        </div>
                    </div>
                )}
                <div className={`${styles.container} ${styles.userPhotos}`}>
                    {photos && photos.map((photo) => (
                        <div className={styles.photo} key={photo._id}>
                            {photo.image && id !== userAuth._id && (
                                <Link to={`/photos/${photo._id}`}>
                                    <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                                </Link>
                            )}

                            {photo.image && id === userAuth._id && (
                                <>
                                    <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                                    <div className={styles.actions}>
                                        <button className={styles.delete}>
                                            <RiDeleteBin2Line />
                                        </button>
                                        <button className={styles.edit}>
                                            <RiEditLine />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {photos.length === 0 && (
                        <p>Ainda não há publicações.</p>
                    )}
                </div>
            </section >
        </div >
    )
}

export default Profile