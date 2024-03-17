import styles from './ProfileHeader.module.scss'

import { Link, NavLink } from 'react-router-dom'

import { uploads } from '../utils/config'

// Hooks
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { follow, unfollow, resetMessage } from '../slices/userSlice'

import { RiSettings4Line, RiAlertLine, RiUserFollowLine, RiUserFollowFill, RiUserUnfollowLine } from "react-icons/ri";
import { MdClose, MdOutlineHandshake } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { TbUserQuestion } from "react-icons/tb";

const ProfileHeader = ({ id, photos }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)

    const [viewFollowers, setViewFollowers] = useState(false)
    const [viewFollowing, setViewFollowing] = useState(false)

    const handleFollow = () => {
        dispatch(follow(user._id))

        resetMessage()
    }

    const handleUnfollow = () => {
        dispatch(unfollow(user._id))

        resetMessage()
    }

    const handleViewFollowers = () => {
        setViewFollowers(!viewFollowers)
    }

    const handleViewFollowing = () => {
        setViewFollowing(!viewFollowing)
    }

    return (
        <>
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
                                                {user.followers.some(followerUser => followerUser.id === userAuth._id) ? (
                                                    <button className={styles.following} onClick={handleUnfollow}>
                                                        <p>Seguindo</p>
                                                        <RiUserFollowFill />
                                                    </button>
                                                ) : user.followSolicitation.some(followSolicitationUser => followSolicitationUser.id === userAuth._id) ? (
                                                    <button className={styles.solicitate}>
                                                        <p>Pediu para seguir</p>
                                                        <MdOutlineHandshake  />
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
                                <p className={styles.posts}><span>{photos.length}</span> Publicações</p>
                            </div>
                            <div className={`${styles.btnSocial} ${styles.middleBtnSocial}`}>
                                {user && user.following && (
                                    <p onClick={handleViewFollowers}><span>{user.followers.length}</span> Seguidores</p>
                                )}
                            </div>
                            <div className={styles.btnSocial}>
                                {user && user.following && (
                                    <p onClick={handleViewFollowing}><span>{user.following.length}</span> Seguindo</p>
                                )}
                            </div>
                        </div>

                        <p className={styles.bio}>{user.bio}</p>

                    </div>
                </div>
            </div>

            {viewFollowers && (
                <div className={styles.followingContainer}>
                    <div className={styles.headerFollowing}>
                        <h1>Seguidores</h1>
                        <button type='button' className={styles.close} onClick={handleViewFollowers}>
                            <MdClose />
                        </button>
                    </div>
                    <div className={styles.usersContainer}>
                        {user && user.followers.map((follower) => (
                            <div className={styles.user}>
                                <p><Link to={`/users/${follower.id}`}>{follower.name}</Link></p>
                                {id === userAuth._id ? (
                                    <button className={styles.unfollow}><RiUserUnfollowLine /></button>
                                ) : (
                                    <Link to={`/users/${follower.id}`}>
                                        <button className={styles.visit}><CiLocationArrow1 /></button>
                                    </Link>
                                )}
                            </div>
                        ))}

                        {user.followers.length === 0 && (
                            <p className={styles.message}><TbUserQuestion />Você não tem seguidores.</p>
                        )}
                    </div>
                </div>
            )}

            {viewFollowing && (
                <div className={styles.followingContainer}>
                    <div className={styles.headerFollowing}>
                        <h1>Seguindo</h1>
                        <button type='button' className={styles.close} onClick={handleViewFollowing}>
                            <MdClose />
                        </button>
                    </div>
                    <div className={styles.usersContainer}>
                        {user && user.following.map((following) => (
                            <div className={styles.user}>
                                <p><Link to={`/users/${following.id}`}>{following.name}</Link></p>
                                {id === userAuth._id ? (
                                    <button className={styles.unfollow}><RiUserUnfollowLine /></button>
                                ) : (
                                    <Link to={`/users/${following.id}`}>
                                        <button className={styles.visit}><CiLocationArrow1 /></button>
                                    </Link>
                                )}
                            </div>
                        ))}

                        {user.following.length === 0 && (
                            <p className={styles.message}><TbUserQuestion />Você está seguindo ninguém.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileHeader