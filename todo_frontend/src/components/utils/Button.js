import React from 'react'
import styles from "./Button.module.css"

function Button(props) {
  return (
    <button className={styles.btn} type={props.type} onClick={props.onClick}>{props.text}</button>
  )
}

export default Button