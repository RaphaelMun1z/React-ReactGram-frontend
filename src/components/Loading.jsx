import styles from './Loading.module.scss'

import { trio } from 'ldrs'

const Loading = () => {
    trio.register()

    return (
        <div className={styles.container}>
            <div className={styles.loading}>
                <l-trio
                    size="80"
                    speed="1.3"
                    color="white"
                ></l-trio>
            </div>
        </div >
    )
}

export default Loading