import styles from './NewPostForm.module.scss'

// Components
import Message from '../components/Message'

// Hooks
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { resetMessage, publishPhoto } from '../slices/photoSlice'

const NewPostForm = ({
    title,
    setTitle,
    image,
    setImage,
    newPhotoForm,
    newPhotoButton }) => {

    const dispatch = useDispatch()

    const { loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)

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

        resetComponentMessage()

        handleNewPost()
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleNewPost = () => {
        newPhotoForm.current.classList.toggle("hide")
        newPhotoButton.current.classList.toggle("hide")
    }

    return (
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
    )
}

export default NewPostForm