import { IonItem, IonAvatar, IonImg, IonLabel, IonBadge, IonItemSliding,IonItemOptions, IonItemOption, IonIcon } from '@ionic/react'
import { trashOutline } from "ionicons/icons";
import styles from './CartItem.module.css'

const CartItem = props => {
    const { product, index } = props;
    return (
        <IonItemSliding className={ styles.cartSlider }>
            <IonItem lines="none" detail={ false } className={ styles.cartItem }>
                <IonAvatar>
                    <IonImg src={ product.product.image } />
                </IonAvatar>
                <IonLabel className="ion-padding-start ion-text-wrap">
                    <p>{ product.category.name }</p>
                    <h4>{ product.product.name }</h4>
                </IonLabel>

                <div className={ styles.cartActions }>
                    <IonBadge color="dark">{ product.product.price }</IonBadge>
                </div>
            </IonItem>
            { props.onHandleChange != null &&
                <IonItemOptions side="end">
                    <IonItemOption color="danger" style={{ paddingLeft: "1rem", paddingRight: "1rem" }} onClick={ props.onHandleChange }>
                        <IonIcon icon={ trashOutline } />
                    </IonItemOption>
                </IonItemOptions>
            }
        </IonItemSliding>
    )
}

export default CartItem