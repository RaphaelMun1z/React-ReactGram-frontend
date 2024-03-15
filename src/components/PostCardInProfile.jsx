import styles from './PostCardInProfile.module.scss'

import { uploads } from '../utils/config'

// Components
import { Link } from 'react-router-dom'

// Hooks
import { useDispatch } from 'react-redux'

// Redux
import { resetMessage, deletePhoto } from '../slices/photoSlice'

import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

const PostCardInProfile = ({
    photo,
    selfProfile,
    setEditId,
    setEditTitle,
    setEditImage,
    editPhotoForm }) => {
    const dispatch = useDispatch()

    // Edit a photo
    const handleEdit = (photo) => {
        setEditId(photo._id)
        setEditTitle(photo.title)
        setEditImage(photo.image)

        editPhotoForm.current.classList.toggle("hide")
    }

    // Delete a photo
    const handleDelete = (id) => {
        dispatch(deletePhoto(id))

        resetComponentMessage()
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    return (
        <div className={styles.photo} key={photo._id}>
            <Link to={`/photos/${photo._id}`}>
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
            </Link>
            {selfProfile && (
                <div className={styles.actions}>
                    <button className={styles.delete} onClick={() => handleDelete(photo._id)}>
                        <RiDeleteBin2Line />
                    </button>
                    <button className={styles.edit} onClick={() => handleEdit(photo)}>
                        <RiEditLine />
                    </button>
                </div>
            )}
        </div>
    )
}

export default PostCardInProfile