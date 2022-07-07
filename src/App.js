// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
/* ethers 変数を使えるようにする*/
import { ethers } from "ethers";
/* ABIファイルを含むWavePortal.jsonファイルをインポートする*/
import abi from "./utils/WavePortal.json";

const App = () => {
  /* ユーザーのパブリックウォレットを保存するために使用する状態変数を定義 */
  const [currentAccount, setCurrentAccount] = useState("");
  /* ユーザーのメッセージを保存するために使用する状態変数を定義 */
  const [messageValue, setMessageValue] = useState("");
  /* すべてのwavesを保存する状態変数を定義 */
  const [allWaves, setAllWaves] = useState([]);
  console.log("currentAccount: ", currentAccount);
  /* デプロイされたコントラクトのアドレスを保持する変数を作成 */
  const contractAddress = "0xD71191730B4A55342dea53b45428c7D522f7474c";
  /* コントラクトからすべてのwavesを取得するメソッドを作成 */
  /* ABIの内容を参照する変数を作成 */
  const contractABI = abi.abi;

  const getAllWaves = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        /* コントラクトからgetAllWavesメソッドを呼び出す */
        const waves = await wavePortalContract.getAllWaves();
        /* UIに必要なのは、アドレス、タイムスタンプ、メッセージだけなので、以下のように設定 */
        const wavesCleaned = waves.map((wave) => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          };
        });
        /* React Stateにデータを格納する */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * `emit`されたイベントをフロントエンドに反映させる
   */
  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    /* NewWaveイベントがコントラクトから発信されたときに、情報をを受け取ります */
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
    }
    /*メモリリークを防ぐために、NewWaveのイベントを解除します*/
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  /* window.ethereumにアクセスできることを確認する関数を実装 */
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      /* ユーザーのウォレットへのアクセスが許可されているかどうかを確認 */
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* connectWalletメソッドを実装 */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  /* waveの回数をカウントする関数を実装 */
  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        /* ABIを参照 */
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        /* コントラクトに👋（wave）を書き込む */
        const waveTxn = await wavePortalContract.wave(messageValue, {
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* WEBページがロードされたときにcheckIfWalletIsConnected()を実行 */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div id="pagetop" class="l_container">
      <header class="l_header">
        <div class="l_header__inner">
            <h1 class="l_header__logo"><a href="index.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="240.381" height="56.64" viewBox="0 0 240.381 56.64">
                    <path class="l_header__path" d="M25.2-6.54a.159.159,0,0,0-.18-.18,4.658,4.658,0,0,0-1.98,1.2c-2.88,2.34-4.56,3.3-5.52,3.3-.78,0-1.02-.6-1.02-1.56,0-4.92,6-16.68,7.44-17.16a.384.384,0,0,0,.3-.42.425.425,0,0,0-.42-.48,8.97,8.97,0,0,0-4.44,1.92.875.875,0,0,1-.48.3c-.12,0-.18-.06-.24-.24-.36-1.08-1.38-1.26-2.88-1.26C5.34-21.12-.66-6.48-.66-2.28-.66-.72,0,.48,1.68.48c1.98,0,6.84-2.52,11.16-7.62a.059.059,0,0,1,.06-.06.468.468,0,0,1,0,.3,16.553,16.553,0,0,0-.72,4.44c0,1.68.54,2.88,2.1,2.88C18.24.42,25.2-5.58,25.2-6.54ZM17.46-18.48a2.278,2.278,0,0,1-.36,1.08C15.6-14.94,11.94-7.32,6.84-3.42a3.1,3.1,0,0,1-1.56.72c-.54,0-.84-.48-.84-1.5,0-4.26,6.42-15.42,11.46-15.42C17.4-19.62,17.46-18.78,17.46-18.48ZM51-36.54a2.066,2.066,0,0,0-2.1-2.16,26.247,26.247,0,0,0-9.72,3.78C30.36-28.86,24-2.64,22.08-.42c-.06.12-.24.3-.24.48a.28.28,0,0,0,.3.3C23.1.36,23.7,0,24.9,0c.3,0,.96.06,1.62.12.72.06,1.38.12,1.62.12C35.1.24,44.22-8.7,46.08-17.64a10.649,10.649,0,0,0,.24-1.8c0-1.74-.84-2.4-2.1-2.4-3.48,0-10.2,5.22-13.02,8.52a.186.186,0,0,1-.12.06c-.18,0,.3-1.2.54-1.68,4.68-10.44,9.66-21.42,14.4-21.42a4.474,4.474,0,0,1,2.4.72,3.384,3.384,0,0,0,1.38.42C50.52-35.22,51-35.64,51-36.54ZM41.4-17.58c-.48,8.4-8.28,16.26-12.54,16.26-.72,0-1.8-.3-1.8-1.08a3.944,3.944,0,0,1,.48-1.44c3.12-7.02,5.76-9.84,10.86-13.8a4.58,4.58,0,0,1,2.28-1.08C41.22-18.72,41.46-18.3,41.4-17.58ZM45.6-3.66c0,2.52.9,4.32,3.12,4.32,1.02,0,4.38-.24,10.98-5.4,3.78-2.94,6.66-9.24,6.66-13.26,0-1.92-.72-3.78-2.94-3.78a26.965,26.965,0,0,0-9.36,2.94C49.32-16.44,45.6-8.64,45.6-3.66ZM50.4-5.7c0-5.04,5.16-13.68,8.52-13.68,2.04,0,2.52,1.74,2.52,3.78,0,3.18-1.92,9.24-5.4,11.76C54.9-3,54.12-2.46,52.98-2.52,51.18-2.52,50.4-3.9,50.4-5.7ZM70.56-18.9a7.856,7.856,0,0,1,2.04-.3c.66,0,1.02.18,1.02.84a1.491,1.491,0,0,1-.06.48c-.36,2.04-5.22,8.82-6.3,13.68a10.85,10.85,0,0,0-.24,1.74c0,1.98,1.02,3,2.7,3,2.58,0,6.6-2.34,11.1-7.62l.6-.66a5.63,5.63,0,0,1-.36,1.44,13.443,13.443,0,0,0-.72,3.78c0,1.98,1.02,3.06,2.58,3.06,4.32,0,10.86-6.36,10.86-7.44,0-.12-.06-.18-.12-.18a4.909,4.909,0,0,0-2.04,1.32c-2.1,1.98-4.2,3.54-5.46,3.54-.72,0-1.14-.6-1.14-1.5,0-3.24,5.7-14.82,6.9-17.22a.892.892,0,0,0,.12-.54.336.336,0,0,0-.3-.36,29.08,29.08,0,0,0-3.66.9c-.78.24-1.2.96-2.4,3.54C81.18-7.8,75-2.82,72.84-2.82c-.6,0-.84-.36-.84-1.02,0-2.94,4.98-11.28,5.76-12.9a7.141,7.141,0,0,0,.84-3c0-1.08-.54-1.86-1.56-1.86a50.007,50.007,0,0,0-6.84,1.62.569.569,0,0,0-.48.54.658.658,0,0,0,.66.54Zm27.48.48c.24,0,.36.06.36.24a.3.3,0,0,1-.06.18c-1.86,3.72-5.82,11.16-5.82,15.42,0,1.02.12,3.18,3.18,3.18,5.1,0,12.78-5.46,12.78-6.54a.159.159,0,0,0-.18-.18,3.36,3.36,0,0,0-1.44.72c-3.42,2.34-5.88,3.3-7.26,3.3-1.44,0-1.92-1.02-1.92-2.28,0-2.76,2.76-9.12,4.62-13.5.12-.24.24-.42.42-.42h6.24c1.02,0,2.88-1.02,2.88-1.56,0-.18-.3-.3-.96-.3-2.16,0-4.92-.12-7.26-.12a.059.059,0,0,1-.06-.06c0-.48,4.2-8.64,4.56-9.3a1.294,1.294,0,0,0,.24-.84c0-.18-.06-.42-.36-.42s-4.68,1.14-5.16,2.82c-.3,1.02-2.58,6.12-3.12,7.26-.12.36-.3.48-.48.48H96.72c-1.2,0-2.94,1.2-2.94,1.68,0,.12.18.24.48.24Zm26.46,0c.3,0,.48,0,.48.18l-.06.24C118.8-.3,114.42,10.26,109.8,14.28a6.325,6.325,0,0,1-4.32,1.86,3.421,3.421,0,0,1-.78-.06c-1.14-.12-1.86-1.38-2.88-1.38a1.726,1.726,0,0,0-1.62,1.56c0,.9,1.5,1.68,3.54,1.68,1.08,0,4.74-.18,9-4.02,6.3-5.82,10.92-17.34,16.32-31.8a.605.605,0,0,1,.66-.42h7.8c-2.82,6.36-5.1,12.54-5.4,14.88a5.491,5.491,0,0,0-.06.96c0,1.98.84,3,2.52,3,3.84,0,11.22-6.06,11.22-7.14,0-.06-.06-.12-.18-.12-.6,0-1.62.9-2.22,1.38C141-3.3,139.14-2.28,138-2.28c-.66,0-1.08-.42-1.08-1.32,0-4.14,11.1-32.88,16.98-32.88a2.776,2.776,0,0,1,1.68.54,2.57,2.57,0,0,0,1.02.36.982.982,0,0,0,.96-1.08,1.64,1.64,0,0,0-1.74-1.86c-1.2,0-5.22,1.26-8.94,3.96-1.98,1.44-5.46,7.8-8.52,14.4-1.5,0-8.28-.12-8.28-.18a.464.464,0,0,1,.06-.18c.78-1.86,3.06-9,5.04-10.98,1.32-1.32,2.52-2.34,4.02-2.34a4.677,4.677,0,0,1,2.4.78,3.3,3.3,0,0,0,1.38.42c.66,0,1.14-.42,1.14-1.32a2,2,0,0,0-2.1-2.16c-.84,0-5.28,1.2-10.68,4.92-2.28,1.56-4.62,8.04-5.64,10.44-.12.36-.24.42-.42.42h-2.34c-1.14,0-2.76,1.08-2.76,1.68,0,.12.06.24.42.24ZM144.12-3.66c0,2.52.9,4.32,3.12,4.32,1.02,0,4.38-.24,10.98-5.4,3.78-2.94,6.66-9.24,6.66-13.26,0-1.92-.72-3.78-2.94-3.78a26.965,26.965,0,0,0-9.36,2.94C147.84-16.44,144.12-8.64,144.12-3.66Zm4.8-2.04c0-5.04,5.16-13.68,8.52-13.68,2.04,0,2.52,1.74,2.52,3.78,0,3.18-1.92,9.24-5.4,11.76-1.14.84-1.92,1.38-3.06,1.32C149.7-2.52,148.92-3.9,148.92-5.7Zm52.44-13.08a3.514,3.514,0,0,0-3.66-3.6c-.78,0-1.2.36-1.2.78a.519.519,0,0,0,.18.36,4.252,4.252,0,0,1,1.14,3.18c0,6.12-8.34,15.54-12,15.54-1.08,0-1.74-.78-1.74-2.64,0-1.98.72-5.46,2.64-10.32.9-2.22,1.62-3.9,1.86-4.32a3.472,3.472,0,0,0,.6-1.38c0-.18-.12-.42-.54-.42a5.558,5.558,0,0,0-3.96,2.46c-1.08,1.68-1.62,2.94-2.82,5.1-3.42,6.36-8.7,12-10.68,12-.6,0-.9-.42-.9-1.38,0-1.8,1.14-5.7,4.38-11.94a10.314,10.314,0,0,0,1.38-4.2,1.784,1.784,0,0,0-1.92-1.98,32.119,32.119,0,0,0-6.18,1.38.81.81,0,0,0-.66.72c0,.18.12.36.48.36s1.8-.3,2.1-.3c.66,0,1.2.18,1.2.9a1.171,1.171,0,0,1-.06.42c-.6,2.64-3.72,8.22-4.92,12.06a11.713,11.713,0,0,0-.66,3.42c0,2.1,1.02,3.24,2.82,3.24,4.62,0,11.28-7.26,11.46-7.5a21.135,21.135,0,0,0-.3,2.94c0,2.94,1.2,4.44,3.18,4.44C188.82.54,201.36-11.76,201.36-18.78ZM221.58-9.6a.22.22,0,0,0-.24-.24,6.421,6.421,0,0,0-2.7,1.5C213.48-4.38,210.6-2.28,207-2.28c-1.26,0-1.86-.96-1.86-2.4,0-4.26,5.76-15,9.42-15,.66,0,1.14.54,1.14,1.68-.06,3.36-3.6,5.52-6.6,6.96a1.126,1.126,0,0,0-.72.9c0,.12.06.36.24.36.6,0,10.86-3.36,10.86-10.32,0-1.08-.96-1.74-2.58-1.74-1.8,0-4.44.78-7.56,2.88-4.68,3.12-9.48,11.1-9.48,15.9,0,2.28,1.14,3.84,3.9,3.84,5.88,0,12.12-5.04,15.6-7.86C220.92-8.34,221.58-9.24,221.58-9.6Zm18.12-8.34c.18-2.58-.84-3.66-2.1-3.66-1.98,0-3.66,1.86-8.58,7.14-.12.12-.18.18-.24.18a.129.129,0,0,1-.12-.12,3.476,3.476,0,0,1,.24-.78c1.32-3,1.92-4.38,1.92-5.7,0-.78-.42-.96-.84-.96-.72,0-6.12,1.38-7.74,1.86a.584.584,0,0,0-.48.6.485.485,0,0,0,.48.54c.12,0,1.8-.36,2.1-.36.78,0,1.2.3,1.2,1.08,0,2.94-6,14.76-6.72,17.28a4.048,4.048,0,0,0-.18,1.02c0,.24.06.42.24.42a1.014,1.014,0,0,0,.3-.12c1.32-.72,3.3-1.32,4.08-1.8,3.84-10.32,9.9-16.26,12-16.26.72,0,1.26.48,1.5,1.44a1.268,1.268,0,0,0,1.2,1.08C238.74-15.06,239.58-15.9,239.7-17.94Z" transform="translate(0.66 38.7)"></path>
                </svg>
            </a></h1>
            <button type="button" id="header-btn" class="header-btn" title="メニュー開閉"><span></span></button>
        </div>
        <nav class="l_gnav">
            <ul class="l_gnav__list">
                <li class="l_gnav__item"><a href="index.html">Home</a></li>
                <li class="l_gnav__item"><a href="#">Online Shop</a></li>
                <li class="l_gnav__item"><a href="#">News</a></li>
                <li class="l_gnav__item"><a href="#">Store</a></li>
                <li class="l_gnav__item"><a href="#">Access</a></li>
                <li class="l_gnav__item"><a href="#">About</a></li>
                <li class="l_gnav__item _cart"><a href="cart.html">Cart</a></li>
            </ul>
        </nav>
      </header>
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">
            <span role="img" aria-label="hand-wave">
              👋
            </span>{" "}
            WELCOME!
          </div>
          <div className="bio">
            イーサリアムウォレットを接続して、メッセージを作成したら、
            <span role="img" aria-label="hand-wave">
              👋
            </span>
            を送ってください
            <span role="img" aria-label="shine">
              ✨
            </span>
          </div>
          <br />
          {/* ウォレットコネクトのボタンを実装 */}
          {!currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
          {currentAccount && (
            <button className="waveButton">Wallet Connected</button>
          )}
          {/* waveボタンにwave関数を連動 */}
          {currentAccount && (
            <button className="waveButton" onClick={wave}>
              Wave at Me
            </button>
          )}
          {/* メッセージボックスを実装*/}
          {currentAccount && (
            <textarea
              name="messageArea"
              placeholder="メッセージはこちら"
              type="text"
              id="message"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)} />
          )}
          {/* 履歴を表示する */}
          {currentAccount &&
            allWaves
              .slice(0)
              .reverse()
              .map((wave, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#F8F8FF",
                      marginTop: "16px",
                      padding: "8px",
                    }}
                  >
                    <div>Address: {wave.address}</div>
                    <div>Time: {wave.timestamp.toString()}</div>
                    <div>Message: {wave.message}</div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
export default App;