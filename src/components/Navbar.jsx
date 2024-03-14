import styles from './Navbar.module.scss'

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

const Navbar = () => {
    const { auth } = useAuth()
    const { user } = useSelector((state) => state.auth)

    const [query, setQuery] = useState("")

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
        height > 0 ? navbar.current.classList.add("scroll-navbar") : navbar.current.classList.remove("scroll-navbar")
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
                        <form onSubmit={handleSearch}>
                            <input type="text" placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value)} />
                            <button type='submit'>
                                <RiSearch2Line />
                            </button>
                        </form>
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