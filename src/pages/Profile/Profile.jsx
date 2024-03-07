import styles from './Profile.module.scss'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux
import { getUserDetails } from '../../slices/userSlice'

const Profile = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)

    // Photo

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
    }, [dispatch, id])

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.imageContainer}>
                        {user.profileImage && (
                            <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                        )}
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.insideDescription}>
                            <h1 className={styles.name}>{user.name}</h1>
                            <p className={styles.bio}>{user.bio}</p>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}

export default Profile