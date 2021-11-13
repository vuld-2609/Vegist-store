import React from 'react';


import './style.scss';


function CartManage() {

  return (
    <>
         <div className="profile__order">
            <p className="profile__order--title">{t('orderHistory.title')}</p>
            {isPayment === false ? (
              <div className="cart__nonProduct ">
                <div className="cart__nonProduct-img text-center">
                  <img src="https://i.imgur.com/Drj57qu.png" alt="nonProduct" />
                </div>
                <div className="cart__nonProduct-btn ">
                  <p>{t('orderHistory.content')}</p>
                  <button
                    className="button button-round--lg button-primary"
                    type="button"
                    onClick={() => history.push('/products')}
                  >
                    {t('cart.Continue Shopping')}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <table>
                  <thead>
                    <tr>
                      <td>STT</td>
                      <td>NAME</td>
                      <td>COUNT</td>
                      <td>ADDRESS</td>
                      <td>DATE</td>
                      <td>PRICE</td>
                    </tr>
                  </thead>
                  <tbody>
                    {billData?.cartData?.map((item, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <div className="name-order">
                              <p>{item.name}</p>
                              <img src={item.img[0]} alt="" />
                            </div>
                          </td>
                          <td>{item.amount}</td>
                          <td>{billData.address}</td>
                          <td>{billData.date}</td>
                          <td>{item.price}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
    </>
  );
}

export default CartManage;
