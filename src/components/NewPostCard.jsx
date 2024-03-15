import styles from './NewPostCard.module.scss'

import { VscDiffAdded } from "react-icons/vsc";

const NewPostCard = ({ newPhotoForm, newPhotoButton }) => {
    const handleNewPost = () => {
        newPhotoForm.current.classList.toggle("hide")
        newPhotoButton.current.classList.toggle("hide")
    }

    return (
        <div className={styles.newPostContainer} onClick={handleNewPost} ref={newPhotoButton}>
            <VscDiffAdded />
        </div>
    )
}

export default NewPostCard