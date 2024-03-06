import styles from './Navbar.module.scss'

// Components
import { NavLink, Link } from 'react-router-dom'

import { RiHome2Line, RiLoginBoxLine, RiUserAddLine, RiLogoutBoxLine, RiSearch2Line } from "react-icons/ri";

const Navbar = () => {
    return (
        <nav>
            <div className={styles.logo}>
                <Link to="/">
                    <span className='siteName'>ReactGram</span>
                </Link>
            </div>
            <div className={styles.navbar}>
                <form>
                    <input type="text" />
                    <button type='submit'>
                        <RiSearch2Line />
                    </button>
                </form>
                <ul>
                    <li><Link to="/">
                        <RiHome2Line />
                        <p>Início</p>
                    </Link></li>
                    <li><Link to="/Login">
                        <RiLoginBoxLine />
                        <p>Entrar</p>
                    </Link></li>
                    <li><Link to="/Register" className={styles.register}>
                        <RiUserAddLine />
                        <p>Registrar</p>
                    </Link></li>
                    <li><Link to="/Logout" className={styles.logout}>
                        <RiLogoutBoxLine />
                        <p>Sair</p>
                    </Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar