import React, {useState} from 'react'
import Header from './components/layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { CartProvider } from './store';

function App() {
  const [cartIsShown, setCartIsShow] = useState(false)

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={() => setCartIsShow(false)} />}
      <Header onShowCart={() => setCartIsShow(true)} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
