import styles from './PrivateProfileMessage.module.scss'

import { TbLockCancel } from "react-icons/tb";

const PrivateProfileMessage = ({ user }) => {
    return (
        <div className={styles.notFollowingMessage}>
            <TbLockCancel />
            <p >Perfil privado. Siga para saber mais sobre <span>{user.name}</span></p>
        </div>
    )
}

export default PrivateProfileMessage