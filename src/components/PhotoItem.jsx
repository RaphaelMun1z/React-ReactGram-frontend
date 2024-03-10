import styles from './PhotoItem.module.scss'

import { uploads } from '../utils/config'

import { Link } from 'react-router-dom'

import LikeContainer from './LikeContainer'
import Message from './Message'

import { RiSendPlaneFill } from "react-icons/ri";

const PhotoItem = ({ photo, user, handleLike, message, error, handleComment, commentText, setCommentText, comments }) => {
    return (
        <div className={styles.photoImage}>
            <div className={styles.header}>
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <h3><Link to={`/users/${photo.userName}`}>{photo.userName}</Link></h3>
            </div>
            <div className={styles.image}>
                {photo.image && (
                    <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} onDoubleClick={() => handleLike(photo)} />
                )}
            </div>
            <div className={styles.desc}>
                <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                <div className={styles.alerts}>
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </div>
                <p>{photo.title}</p>
                {photo.comments && comments === true ? (
                    <>
                        <div className={styles.comments}>
                            {photo.comments.length > 0 ? (
                                <>
                                    <p className={styles.openComments}>Ver todos os {photo.comments.length} comentários.</p>

                                    <div className={styles.commentsContainer}>
                                        {photo.comments.map((comment) => (
                                            <div className={styles.comment} key={comment.comment}>
                                                <div className={styles.header}>
                                                    {comment.userImage && (
                                                        <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
                                                    )}
                                                    <Link to={`/users/${comment.userId}`}>{comment.userName}</Link>
                                                </div>
                                                <div className={styles.textContainer}>
                                                    <p>{comment.comment}</p>
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p className={styles.openComments}>Ainda não há comentários.</p>
                            )}
                            <form onSubmit={handleComment}>
                                <input type="text" placeholder='Insira seu comentário...' onChange={(e) => setCommentText(e.target.value)} value={commentText || ""} />
                                <button type="submit" className={styles.btnSubmit}><RiSendPlaneFill /></button>
                            </form>
                        </div>
                    </>
                ) : null}

            </div>
        </div >
    )
}

export default PhotoItem