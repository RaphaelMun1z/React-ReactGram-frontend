import styles from './Auth.module.scss'

// Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()


    }

    return (
        <div className={styles.pageContainer}>
            <section>
                <h1 className={styles.title}><span className='siteName'>ReactGram</span></h1>
                <p className={styles.subtitle}>Faça o login para ver o que há de novo.</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                    <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                    {/* {!loading && <input type="submit" value="Cadastrar" className={styles.btnSubmit} />}
                    {loading && <input type="submit" value="Aguarde..." disabled className={styles.btnSubmit} />}
                    {error && <Message msg={error} type="error" />} */}
                </form>
            </section>
            <section>
                <p className={styles.hasAccount}>Não tem uma conta?<Link to="/register">Clique aqui.</Link></p>
            </section>
        </div>
    )
}

export default Login