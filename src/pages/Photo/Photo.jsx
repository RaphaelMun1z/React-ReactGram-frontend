import styles from './Photo.module.scss'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'

import PhotoItem from '../../components/PhotoItem'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { getPhoto, like, comment } from '../../slices/photoSlice'

const Photo = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)
    const { photo, loading, error, message } = useSelector((state) => state.photo)

    const [commentText, setCommentText] = useState("")

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    // Insert a like
    const handleLike = () => {
        dispatch(like(photo._id))

        resetMessage()
    }

    // Insert a comment
    const handleComment = (e) => {
        e.preventDefault()

        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(comment(commentData))

        setCommentText("")

        resetMessage()
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.pageContainer}>
            <section>
                <PhotoItem photo={photo} user={user} handleLike={handleLike} message={message} error={error} handleComment={handleComment} commentText={commentText} setCommentText={setCommentText} comments={true} />
            </section>
        </div>
    )
}

export default Photo