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
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice'

import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";
import { VscDiffAdded } from "react-icons/vsc";

const Profile = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    const [editId, setEditId] = useState("")
    const [editImage, setEditImage] = useState("")
    const [editTitle, setEditTitle] = useState("")

    // New form and edit form refs
    const newPhotoForm = useRef()
    const newPhotoButton = useRef()
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

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
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

        resetComponentMessage()
    }

    // Delete a photo
    const handleDelete = (id) => {
        dispatch(deletePhoto(id))

        resetComponentMessage()
    }

    // Update a photo
    const handleUpdate = (e) => {
        e.preventDefault()

        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData))

        resetComponentMessage()
    }

    const handleEdit = (photo) => {
        setEditId(photo._id)
        setEditTitle(photo.title)
        setEditImage(photo.image)

        editPhotoForm.current.classList.toggle("hide")
    }

    const handleCancelEdit = () => {
        editPhotoForm.current.classList.toggle("hide")
    }

    const handleNewPost = () => {
        newPhotoForm.current.classList.toggle("hide")
        newPhotoButton.current.classList.toggle("hide")
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.imageContainer}>
                        {user.profileImage ? (
                            <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                        ) : (
                            <img src={`${uploads}/users/noUserImageProfile.png`} alt={user.name} />
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
                    <div className={`${styles.container} hide`} ref={newPhotoForm}>
                        <div className={styles.newPhoto}>
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
                                <button type='button' className={styles.btnCancelPost} onClick={handleNewPost}>Cancelar</button>
                                {errorPhoto && <Message msg={errorPhoto} type="error" />}
                                {messagePhoto && <Message msg={messagePhoto} type="success" />}
                            </form>
                        </div>
                    </div>
                )}

                <div className={`${styles.container} ${styles.editPhoto} hide`} ref={editPhotoForm}>
                    <div className={styles.editPhotoInside}>
                        <p>Editando:</p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} className={styles.editImage} />
                        )}
                        <form onSubmit={handleUpdate}>
                            <span>Título para a foto:</span>
                            <input type="text" onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />
                            <input type="submit" value="Salvar" className={styles.btnSubmit} />
                            <button type='button' className={styles.btnEditCancel} onClick={handleCancelEdit}>Cancelar</button>
                            {errorPhoto && <Message msg={errorPhoto} type="error" />}
                            {messagePhoto && <Message msg={messagePhoto} type="success" />}
                        </form>
                    </div>
                </div>

                <div className={`${styles.container} ${styles.userPhotos}`}>

                    <div className={styles.newPostContainer} onClick={handleNewPost} ref={newPhotoButton}>
                        <VscDiffAdded />
                    </div>

                    {photos && photos.map((photo) => (
                        <div className={styles.photo} key={photo._id}>
                            {photo.image && id !== userAuth._id && (
                                <Link to={`/photos/${photo._id}`}>
                                    <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                                </Link>
                            )}

                            {photo.image && id === userAuth._id && (
                                <>
                                    <Link to={`/photos/${photo._id}`}>
                                        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                                    </Link>
                                    <div className={styles.actions}>
                                        <button className={styles.delete} onClick={() => handleDelete(photo._id)}>
                                            <RiDeleteBin2Line />
                                        </button>
                                        <button className={styles.edit} onClick={() => handleEdit(photo)}>
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