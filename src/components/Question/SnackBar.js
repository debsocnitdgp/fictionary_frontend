import styles from "./Snackbar.module.css"

export default function SnackBar({show, text, success}){
    console.log(success)
    const color = success ? '#adff2f' : '#f44336'
    return (
        <div className={`${styles.container} ${show ? styles.enter : styles.leave}`} style={{
            color: color,
            border: `2px solid ${color}`,
            background: color + '44'
        }}>{text}</div>
    )
}