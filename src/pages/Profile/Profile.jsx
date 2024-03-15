import React from 'react'
import styles from './Profile.module.scss'

// Components
import EditPostForm from '../../components/EditPostForm'
import NewPostForm from '../../components/NewPostForm'
import ProfileHeader from '../../components/ProfileHeader'
import PostCardInProfile from '../../components/PostCardInProfile'
import NewPostCard from '../../components/NewPostCard'
import PrivateProfileMessage from '../../components/PrivateProfileMessage'
import NoPhotosMessage from '../../components/NoPhotosMessage'

import Loading from '../../components/Loading'

// Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux
import { getUserDetails } from '../../slices/userSlice'
import { getUserPhotos } from '../../slices/photoSlice'

const Profile = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const { photos } = useSelector((state) => state.photo)

    // New post
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    // Edit form data
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

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.profile}>
                <ProfileHeader id={id} photos={photos} />

                {id === userAuth._id && (
                    <NewPostForm
                        title={title}
                        setTitle={setTitle}
                        image={image}
                        setImage={setImage}
                        newPhotoForm={newPhotoForm}
                        newPhotoButton={newPhotoButton}
                    />
                )}

                <EditPostForm
                    editPhotoForm={editPhotoForm}
                    editId={editId}
                    setEditId={setEditId}
                    editImage={editImage}
                    setEditImage={setEditImage}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                />

                <div className={`${styles.container} ${styles.userPhotos}`}>
                    {photos.length === 0 && (
                        <NoPhotosMessage />
                    )}

                    {id === userAuth._id && (
                        <NewPostCard
                            newPhotoButton={newPhotoButton}
                            newPhotoForm={newPhotoForm}
                        />
                    )}

                    {user && user.followers && (
                        <>
                            {user.privateProfile && user.followers.includes(userAuth._id) || !user.privateProfile || id === userAuth._id ? (
                                <>
                                    {photos && photos.map((photo) => (
                                        <React.Fragment key={photo._id}>
                                            {photo.image && id !== userAuth._id && (
                                                <PostCardInProfile
                                                    photo={photo}
                                                    setEditId={setEditId}
                                                    setEditTitle={setEditTitle}
                                                    setEditImage={setEditImage}
                                                    editPhotoForm={editPhotoForm}
                                                    selfProfile={false}
                                                />
                                            )}

                                            {photo.image && id === userAuth._id && (
                                                <>
                                                    <PostCardInProfile
                                                        photo={photo}
                                                        setEditId={setEditId}
                                                        setEditTitle={setEditTitle}
                                                        setEditImage={setEditImage}
                                                        editPhotoForm={editPhotoForm}
                                                        selfProfile={true}
                                                    />
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </>
                            ) : (
                                <PrivateProfileMessage user={user} />
                            )}
                        </>
                    )}

                </div>
            </section >
        </div >
    )
}

export default Profile