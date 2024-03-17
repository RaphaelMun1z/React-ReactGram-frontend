import styles from './Navbar.module.scss'

import { uploads } from '../utils/config'

// Components
import { NavLink, Link } from 'react-router-dom'

// Icons
import { RiHome2Line, RiLoginBoxLine, RiUserAddLine, RiLogoutBoxLine, RiSearch2Line, RiUser6Line, RiSettings4Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Hooks
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import { logout, reset } from '../slices/authSlice';
import { getUser } from '../slices/userSlice';

const Navbar = () => {
    const { auth } = useAuth()
    const { user } = useSelector((state) => state.auth)
    const { user: act, loading: loadingUsers } = useSelector((state) => state.user)

    const [query, setQuery] = useState("")
    const [searchUser, setSearchUser] = useState([])

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        setOpenNavbarVisible(!openNavbarVisible)

        navigate("/login")
    }

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
                                <input type="text" placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value)} value={query} />
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
                                        <li>
                                            <NavLink to={`/users/${user._id}`} onClick={handleToggleNavbar}>
                                                <RiUser6Line />
                                            </NavLink>
                                        </li>
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