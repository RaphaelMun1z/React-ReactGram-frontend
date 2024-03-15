import styles from './ProfileHeader.module.scss'

import { NavLink } from 'react-router-dom'

import { uploads } from '../utils/config'

// Hooks
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { follow, unfollow, resetMessage } from '../slices/userSlice'

import { RiSettings4Line, RiAlertLine, RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";

const ProfileHeader = ({ id, photos }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)

    const handleFollow = () => {
        dispatch(follow(user._id))

        resetMessage()
    }

    const handleUnfollow = () => {
        dispatch(unfollow(user._id))

        resetMessage()
    }

    return (
        <div className={styles.header}>
            <div className={styles.imageContainer}>
                {user.profileImage ? (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                ) : (
                    <img src={`${uploads}/users/noUserImageProfile.png`} alt={user.name} />
                )}
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.insideDescription}>

                    <div className={styles.usernameContainer}>
                        <h1 className={styles.name}>{user.name}</h1>
                        <div className={styles.actions}>
                            {id === userAuth._id ? (
                                <>
                                    <NavLink to={"/profile"}>
                                        <RiSettings4Line />
                                    </NavLink>
                                </>
                            ) : (
                                <>

                                    {user && user.followers && (
                                        <>
                                            {user.followers.includes(userAuth._id) ? (
                                                <button className={styles.following} onClick={handleUnfollow}>
                                                    <p>Seguindo</p>
                                                    <RiUserFollowFill />
                                                </button>
                                            ) : (
                                                <button className={styles.follow} onClick={handleFollow}>
                                                    <p>Seguir</p>
                                                    <RiUserFollowLine />
                                                </button>
                                            )}
                                        </>
                                    )}
                                    <button className={styles.report}>
                                        <RiAlertLine />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.socialContainer}>
                        <div className={styles.btnSocial}>
                            <p><span>{photos.length}</span> Publicações</p>
                        </div>
                        <div className={`${styles.btnSocial} ${styles.middleBtnSocial}`}>
                            {user && user.following && (
                                <p><span>{user.followers.length}</span> Seguidores</p>
                            )}
                        </div>
                        <div className={styles.btnSocial}>
                            {user && user.following && (
                                <p><span>{user.following.length}</span> Seguindo</p>
                            )}
                        </div>
                    </div>

                    <p className={styles.bio}>{user.bio}</p>

                </div>
            </div>
        </div>
    )
}

export default ProfileHeader