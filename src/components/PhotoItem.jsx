import styles from './PhotoItem.module.scss'

import { uploads } from '../utils/config'

// Date format
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Components
import LikeContainer from './LikeContainer'
import Message from './Message'

import { Link } from 'react-router-dom'

// Hooks
import React, { useState } from 'react';

// Icons
import { RiSendPlaneFill } from "react-icons/ri";

const PhotoItem = ({ photo, user, handleLike, message, error, handleComment, commentText, setCommentText, comments, isAnimatingPost }) => {
    const convertDate = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: ptBR });

            return timeAgo
        }
    }

    const [commentsIsVisible, setCommentsIsVisible] = useState(false)

    const handleComments = () => {
        setCommentsIsVisible(!commentsIsVisible)
    }

    return (
        <div className={styles.photoImage}>
            <div className={styles.header}>
                <div className={styles.userDetails}>
                    {user.profileImage && (
                        <img src={`${uploads}/users/${photo.userProfileImage}`} alt={user.name} />
                    )}
                    <h3><Link to={`/users/${photo.userId}`}>{photo.userName}</Link></h3>
                </div>
                <div className={styles.postDate}>
                    <p>{convertDate(photo.createdAt)}</p>
                </div>
            </div>
            <div className={`${styles.image} ${isAnimatingPost && styles.likeAnimClass}`}>
                {photo.image && (
                    <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} onDoubleClick={() => handleLike(photo)} />
                )}
            </div>
            <div className={styles.desc}>
                <LikeContainer photo={photo} user={user} handleLike={handleLike} handleToggleComments={handleComments} />
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
                                    {commentsIsVisible ? (
                                        <p className={styles.openComments} onClick={handleComments}>Ocultar comentários.</p>
                                    ) : (
                                        <p className={styles.openComments} onClick={handleComments}>Ver todos os {photo.comments.length} comentários.</p>
                                    )}

                                    {commentsIsVisible && (
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
                                    )}

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