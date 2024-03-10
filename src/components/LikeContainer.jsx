import styles from './LikeContainer.module.scss'

import { FaRegHeart, FaHeart, FaRegCommentAlt } from "react-icons/fa";

const LikeContainer = ({ photo, user, handleLike, handleToggleComments }) => {
    return (
        <div className={styles.actions}>
            {photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <div className={`${styles.btn} ${styles.liked}`} onClick={() => handleLike(photo)}>
                            <FaHeart />
                            <p>{photo.likes.length}</p>
                        </div>
                    ) : (
                        <div className={`${styles.btn} ${styles.like}`} onClick={() => handleLike(photo)}>
                            <FaRegHeart />
                            <p>{photo.likes.length}</p>
                        </div>
                    )}
                    <div className={styles.btn} onClick={handleToggleComments}>
                        <FaRegCommentAlt />
                        <p>{photo.comments.length}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default LikeContainer