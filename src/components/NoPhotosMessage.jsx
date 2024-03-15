import styles from './NoPhotosMessage.module.scss'

import { TbCameraSearch } from "react-icons/tb";

const NoPhotosMessage = () => {
    return (
        <p className={styles.noPhotosYet}>
            <TbCameraSearch />Ainda não há publicações.
        </p>
    )
}

export default NoPhotosMessage