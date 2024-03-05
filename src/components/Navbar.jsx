import styles from './Navbar.module.scss'

// Components
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Login">Entrar</Link></li>
                <li><Link to="/Register">Cadastrar</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar