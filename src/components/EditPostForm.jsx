import styles from './EditPostForm.module.scss'

import { uploads } from '../utils/config'

// Components
import Message from '../components/Message'

// Hooks
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { resetMessage, updatePhoto } from '../slices/photoSlice'

const EditPostForm = ({
    editId,
    editImage,
    editTitle,
    setEditTitle,
    editPhotoForm }) => {
    const dispatch = useDispatch()

    const { message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)

    const handleCancelEdit = () => {
        editPhotoForm.current.classList.toggle("hide")
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

        handleCancelEdit()
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    return (
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
    )
}

export default EditPostForm