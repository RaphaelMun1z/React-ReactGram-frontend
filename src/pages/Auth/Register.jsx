import styles from './Auth.module.scss'

// Components
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }
  }

  return (
    <div className={styles.pageContainer}>
      <section>
        <h1 className={styles.title}><span className='siteName'>ReactGram</span></h1>
        <p className={styles.subtitle}>Cadastre-se para ver as fotos dos seus amigos.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""} />
          <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email || ""} />
          <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
          <input type="password" placeholder='Confirme a senha' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""} />
          <input type="submit" value="Cadastrar" className={styles.btnSubmit} />
        </form>
        <p className={styles.terms}>Ao cadastrar-se, você concorda com nossos termos, política de dados e política de cookies.</p>
      </section>
      <section>
        <p className={styles.hasAccount}>Já tem uma conta?<Link to="/login">Clique aqui.</Link></p>
      </section>
    </div>
  )
}

export default Register