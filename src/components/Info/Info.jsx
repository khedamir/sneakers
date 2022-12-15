import React from 'react';
import Button from '../Button/Button';
import styles from './Info.module.scss'

function Info({ title, description, image, buttonOnClick }) {
  return (
    <div className={styles.cartEmpty}>
        <img width={120} src={image} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <Button onClick={buttonOnClick}>
            <img src="img/arrow-left.svg" alt="" />
            Вернуться назад
        </Button>
    </div>
  )
}

export default Info
