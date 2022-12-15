import React from 'react'
import styles from './Button.module.scss'

function Button( { children,onClick , ...props }) {
  return (
    <button {...props} onClick={onClick} className={styles.greenButton}>
      {children}
    </button>
  )
}

export default Button
