import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

function App() {

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));

            fetchTokenMetadata(user.get("ethAddress"));
            
          })
          .catch(function (error) {
            console.log(error);
          });

        

      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

    const Web3Api = useMoralisWeb3Api();

    const fetchTokenMetadata = async (address) => {
      //Get metadata for one token. Ex: USDT token on ETH
      const options1 = {
        chain: "eth",
        addresses: address,
      };
      const tokenMetadata = await Web3Api.token.getTokenMetadata(options1);
      console.log(tokenMetadata);
    
      const options2 = {
        chain: "eth",
        addresses: "0xd9cC01f3d3dd5705BB289bce94D96F6C7aC0e4Ae",
      };
      const tokenArrayMetadata = await Web3Api.token.getTokenMetadata(options2);
      console.log(tokenArrayMetadata);
    };

  return (

    <div>
      <h1>Moralis Hello World!</h1>
      <button onClick={login}>Moralis Metamask Login</button>
      <button onClick={logOut} disabled={!isAuthenticated}>Logout</button>
    </div>
  );
}

export default App;