import styles from './Navbar.module.scss'

// Components
import { NavLink, Link } from 'react-router-dom'

import { RiHome2Line, RiLoginBoxLine, RiUserAddLine, RiLogoutBoxLine, RiSearch2Line, RiUser6Line, RiSettings4Line } from "react-icons/ri";

// Hooks
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import { logout, reset } from '../slices/authSlice';

const Navbar = () => {
    const { auth } = useAuth()
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate("/login")
    }

    return (
        <nav>
            <div className={styles.logo}>
                <Link to="/">
                    <span className='siteName'>ReactGram</span>
                </Link>
            </div>
            <div className={styles.navbar}>
                <form>
                    <input type="text" placeholder='Pesquisar'/>
                    <button type='submit'>
                        <RiSearch2Line />
                    </button>
                </form>
                <ul>
                    {auth ? (
                        <>
                            <li>
                                <Link to="/">
                                    <RiHome2Line />
                                    <p>Início</p>
                                </Link>
                            </li>
                            {user && (
                                <li>
                                    <NavLink to={`/users/${user._id}`}>
                                        <RiUser6Line />
                                        <p>Perfil</p>
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to={"/profile"}>
                                    <RiSettings4Line />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={handleLogout} className={styles.logout}>
                                    <RiLogoutBoxLine />
                                    <p>Sair</p>
                                </span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/Login">
                                    <RiLoginBoxLine />
                                    <p>Entrar</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Register" className={styles.register}>
                                    <RiUserAddLine />
                                    <p>Criar conta</p>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar