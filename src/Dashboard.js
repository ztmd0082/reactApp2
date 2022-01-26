import React, { useEffect, useState } from 'react';
import { getToken, getUser, removeUserSession } from './Utils/Common';
import axios from 'axios';
import Customcard from './Customcard';
import Cart from './Cart';

function Dashboard(props) {
  const user = getUser();
  const [authLoading, setAuthLoading] = useState(true);
  const [productList, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`https://fakestoreapi.com/carts?token=${token}`).then(response => {
      let products = []
      for (let i = 0; i < response.data.length; i++) {
        axios.get(`https://fakestoreapi.com/users/${response.data[i].userId}?token=${token}`).then(userInfo => {
          // response.data[i].user = userInfo.data;
          for (let j = 0; j = response.data[i].products.length; j++) {
            axios.get(`https://fakestoreapi.com/products/${response.data[i].products[j].productId}?token=${token}`).then(productInfo => {
              productInfo.data.userDetails = userInfo.data
              productInfo.data.cardDetails = response.data[i]
              products.push(productInfo.data)
            }).catch(error => {
              removeUserSession();
              setAuthLoading(false);
            });
          }
        }).catch(error => {
          removeUserSession();
          setAuthLoading(false);
        });
        if (i == response.data.length - 1) {
          setCarts(products);
          console.log(products)
        }
      }
      setCarts(response.data.slice(0, 5))
      // setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });

    axios.get(`https://fakestoreapi.com/products`).then(response => {
      let item = [];
      for (let i = 0; i < response.data.length; i++) {
        item.push(response.data[i]);
      }
      setProducts(item);
    }).catch(error => { });

    axios.get(`https://fakestoreapi.com/carts`).then(response => {
      let item2 = [];
      console.log(response);
      for (let j = 0; j < response.data.length; j++) {
        item2.push(response.data[j]);
      }
      setCartItems(item2);
    }).catch(error => { });

  }, []);

  return (
    <div>
      {/* <Customcard dataList={productList}/> */}
      <Cart dataList={cartItems}/>
      {/* <input type="button" onClick={handleLogout} value="Logout" /> */}
    </div>
  );
}

export default Dashboard;
