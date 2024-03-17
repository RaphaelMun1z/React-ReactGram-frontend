import styles from './Navbar.module.scss'

import { uploads } from '../utils/config'

// Components
import { NavLink, Link } from 'react-router-dom'

// Icons
import { RiHome2Line, RiLoginBoxLine, RiUserAddLine, RiLogoutBoxLine, RiSearch2Line, RiUser6Line, RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { IoClose, IoNotificationsSharp, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";

// Hooks
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import { logout, reset } from '../slices/authSlice';
import { getUser, getUserDetails, soliciteFollowResult } from '../slices/userSlice';

const Navbar = () => {
    const { auth } = useAuth()
    const { user } = useSelector((state) => state.auth)
    const { user: act, loading: loadingUsers } = useSelector((state) => state.user)

    const [query, setQuery] = useState("")
    const [searchUser, setSearchUser] = useState([])
    const [openNotificationsBar, setOpenNotificationsBar] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        setOpenNavbarVisible(!openNavbarVisible)

        navigate("/login")
    }

    const handleResponseSolicitation = (id, response) => {
        const responseData = {
            id: id,
            status: response,
        }

        dispatch(soliciteFollowResult(responseData))
    }

    const handleOpenNotificationBar = () => {
        setOpenNotificationsBar(!openNotificationsBar)
        setQuery("")
    }

    useEffect(() => {
        if (user) dispatch(getUserDetails(user._id))
    }, [user])

    const handleSearch = (e) => {
        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }

    useEffect(() => {
        setSearchUser(act.search)
    }, [act])

    useEffect(() => {
        if (query === " ") {
            setQuery("")
        } else {
            setQuery(query.replace("  ", " "));
        }

        if (query.trim() !== "") {
            setOpenNotificationsBar(false)
        }
    }, [query])

    const handleSearchUser = (e) => {
        e.preventDefault()

        if (query.trim() !== '') {
            dispatch(getUser(query))
        }
    }

    const handleResetQuery = () => {
        setQuery("")
        dispatch(getUser(query))
    }

    // Navbar scroll
    const navbar = useRef()

    const [height, setHeight] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentHeight = window.scrollY;
            setHeight(currentHeight);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        height > 173 ? navbar.current.classList.add("scroll-navbar") : navbar.current.classList.remove("scroll-navbar")
    }, [height]);

    // Navbar on mobile
    const [openNavbarVisible, setOpenNavbarVisible] = useState(false)
    const [menuBtnIsVisible, setMenuBtnIsVisible] = useState(false)

    const navbarMobile = useRef()
    const navbarMobileContainer = useRef()

    const checkWindowWidth = () => {
        if (window.innerWidth < 768) {
            setMenuBtnIsVisible(true);
            navbarMobile.current.classList.add("navbar-mobile")
            navbarMobileContainer.current.classList.add("navbar-mobile-container")
        } else {
            setMenuBtnIsVisible(false);
            navbarMobile.current.classList.remove("navbar-mobile")
            navbarMobileContainer.current.classList.remove("navbar-mobile-container")
        }
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            checkWindowWidth();
        });

        return () => {
            window.removeEventListener('resize', () => { });
        };
    }, [])

    useEffect(() => {
        checkWindowWidth();
    }, [openNavbarVisible])

    const handleToggleNavbar = () => {
        setOpenNavbarVisible(!openNavbarVisible)
    }

    return (
        <nav ref={navbar}>
            <div className={styles.logo}>
                <Link to="/">
                    <span className='siteName'>ReactGram</span>
                </Link>
                {menuBtnIsVisible && (
                    <button onClick={handleToggleNavbar}>
                        <FaBars />
                    </button>
                )}
            </div>

            <div className={`${styles.navbar} ${openNavbarVisible ? styles.activeNavbar : ''}`} ref={navbarMobile}>
                <div className={styles.navMobile} ref={navbarMobileContainer}>
                    {menuBtnIsVisible && (
                        <div className={styles.menuMobile}>
                            <button onClick={handleToggleNavbar}>
                                <IoClose />
                            </button>
                        </div>
                    )}
                    <div className={styles.divMobileNav}>
                        {auth && (
                            <form onSubmit={handleSearch} onChange={handleSearchUser}>
                                <input type="text" placeholder='Pesquisar por perfil/foto' onChange={(e) => setQuery(e.target.value)} value={query} />
                                <button type='submit'>
                                    <RiSearch2Line />
                                </button>
                                {query.trim() !== '' && (
                                    <div className={styles.usersListContainer}>
                                        {searchUser && searchUser.map((user) => (
                                            <Link to={`/users/${user._id}`} className={styles.user} onClick={handleResetQuery} key={user._id}>
                                                <div className={styles.imageContainer}>
                                                    {user.profileImage ? (
                                                        <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                                                    ) : (
                                                        <img src={`${uploads}/users/noUserImageProfile.png`} alt={user.name} />
                                                    )}
                                                </div>
                                                <div className={styles.nameContainer}>
                                                    <p>{user.name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        {searchUser && searchUser.length === 0 && (
                                            <p>Nenhum usuário encontrado.</p>
                                        )}
                                        {loadingUsers && (
                                            <p>Carregando...</p>
                                        )}
                                    </div>
                                )}
                            </form>
                        )}
                        <ul>
                            {auth ? (
                                <>
                                    <li>
                                        <Link to="/" onClick={handleToggleNavbar}>
                                            <RiHome2Line />
                                        </Link>
                                    </li>
                                    {user && (
                                        <>
                                            <li>
                                                <NavLink to={`/users/${user._id}`} onClick={handleToggleNavbar}>
                                                    <RiUser6Line />
                                                </NavLink>
                                            </li>
                                            {user.notifications && user.notifications.length > 0 || user.followSolicitation && user.followSolicitation.length > 0 && (
                                                <li>
                                                    <span className={styles.notificationButton} onClick={handleOpenNotificationBar}>
                                                        <IoNotificationsSharp />
                                                    </span>
                                                    {openNotificationsBar && (
                                                        <div className={styles.notificationContainer}>
                                                            {user.followSolicitation && user.followSolicitation.map((followSolicitation) => (
                                                                <div className={styles.notification} key={followSolicitation.id}>
                                                                    <div className={styles.insideNotification}>
                                                                        <div className={styles.icon}>
                                                                            <MdOutlineHandshake />
                                                                        </div>
                                                                        <div className={styles.actionName}>
                                                                            <p><Link to={`/users/${followSolicitation.id}`}>{followSolicitation.name}</Link> pediu para seguir você.</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.actions}>
                                                                        <button className={styles.accept} onClick={() => handleResponseSolicitation(followSolicitation.id, true)}>
                                                                            <RiUserFollowLine />
                                                                            <p>Aceitar</p>
                                                                        </button>
                                                                        <button className={styles.reject} onClick={() => handleResponseSolicitation(followSolicitation.id, false)}>
                                                                            <RiUserUnfollowLine />
                                                                            <p>Rejeitar</p>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            {user.notifications && user.notifications.map((notification) => (
                                                                <div className={styles.notification} key={notification.id}>
                                                                    <div className={styles.insideNotification}>
                                                                        <div className={styles.icon}>
                                                                            <FaRegHeart />
                                                                        </div>
                                                                        <div className={styles.actionName}>
                                                                            <p><div>Usuário</div> curtiu sua publicação</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.notPost}>
                                                                        <img src="" alt="" />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </li>
                                            )}
                                            {user.notifications && user.notifications.length === 0 && user.followSolicitation.length === 0 && (
                                                <li>
                                                    <span className={styles.notificationEmptyButton} >
                                                        <IoNotificationsOutline />
                                                    </span>
                                                </li>
                                            )}
                                            {!user.notifications && !user.followSolicitation && (
                                                <li>
                                                    <span className={styles.notificationEmptyButton} >
                                                        <IoNotificationsOutline />
                                                    </span>
                                                </li>
                                            )}
                                        </>
                                    )}
                                    <li>
                                        <span onClick={handleLogout} className={styles.logout} >
                                            <RiLogoutBoxLine />
                                        </span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/Login" onClick={handleToggleNavbar}>
                                            <RiLoginBoxLine />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Register" className={styles.register} onClick={handleToggleNavbar}>
                                            <RiUserAddLine />
                                            <p>Criar conta</p>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar