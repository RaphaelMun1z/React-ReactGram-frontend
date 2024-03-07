import styles from './EditProfile.module.scss'

import { uploads } from '../../utils/config'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'

// Components
import Message from '../../components/Message'

const EditProfile = () => {
    const dispatch = useDispatch()

    const { user, message, error, loading } = useSelector((state) => state.user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    // Load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    // Fill form with user data
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Gather user data from states
        const userData = {
            name,
        }

        if (profileImage) {
            userData.profileImage = profileImage
        }

        if (bio) {
            userData.bio = bio
        }

        if (password) {
            userData.password = password
        }

        // Build form data
        const formData = new FormData()
        Object.keys(userData).forEach((key) => {
            formData.append(key, userData[key]);
        });

        await dispatch(updateProfile(formData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = (e) => {
        // Image preview
        const image = e.target.files[0]

        setPreviewImage(image)

        // Update image state
        setProfileImage(image)
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.editProfile}>
                <h1 className={styles.title}>Edite seu Perfil</h1>
                <p className={styles.subtitle}>Adicione uma imagem de perfil e conte mais sobre você...</p>
                {(user.profileImage || previewImage) && (
                    <label className={styles.imagePreviewContainer}>
                        <input type="file" onChange={handleFile} className={styles.btnImageChange} />

                        <img src={
                            previewImage
                                ? URL.createObjectURL(previewImage)
                                : `${uploads}/users/${user.profileImage}`
                        }
                            alt={user.name}
                            className={styles.imagePreview}
                        />
                    </label>
                )}
                <label className={styles.btnImageChangeStatic}>
                    <input type="file" onChange={handleFile} />
                    <p>Adicionar imagem</p>
                </label>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""} />
                    <input type="email" placeholder='E-mail' disabled value={email || ""} />
                    <label>
                        <span>Bio:</span>
                        <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ""} />
                    </label>
                    <label>
                        <span>Gostaria de alterar sua senha?</span>
                        <input type="password" placeholder='Digite sua nova senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                    </label>
                    {!loading && <input type="submit" value="Salvar" className={styles.btnSubmit} />}
                    {loading && <input type="submit" value="Aguarde..." disabled className={styles.btnSubmit} />}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </form>
            </section>
        </div>
    )
}

export default EditProfile