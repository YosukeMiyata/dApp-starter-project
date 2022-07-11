// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
/* ethers 変数を使えるようにする*/
import { ethers } from "ethers";
/* ABIファイルを含むWavePortal.jsonファイルをインポートする*/
import abi from "./utils/WavePortal.json";

let showResults = false;
let showResults1 = false;
let showResults2 = false;
let showResults3 = false;

const App = () => {
  /* ユーザーのパブリックウォレットを保存するために使用する状態変数を定義 */
  const [currentAccount, setCurrentAccount] = useState("");
  /* ユーザーのメッセージを保存するために使用する状態変数を定義 */
  const [messageValue, setMessageValue] = useState("");
  /* すべてのwavesを保存する状態変数を定義 */
  const [allWaves, setAllWaves] = useState([]);
  /* totalwavesを保存する状態変数を定義 */
  const [totalWaves, setTotalWaves] = useState("");
  /* statementを保存する状態変数を定義 */
  const [statement, setStatement] = useState("");

  /* すべてのLikesを保存する状態変数を定義 */
  const [likesForPic1, setLikesForPic1] = useState("");
  /* すべてのLikesを保存する状態変数を定義 */
  const [likesForPic2, setLikesForPic2] = useState("");
  /* すべてのLikesを保存する状態変数を定義 */
  const [likesForPic3, setLikesForPic3] = useState("");

  console.log("currentAccount: ", currentAccount);
  /* デプロイされたコントラクトのアドレスを保持する変数を作成 */
  const contractAddress = "0x58827ef8b4c63AC860248a47e584C03D6bb4D745";
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

  const getTotalWaves = async () => {
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
        /* コントラクトからgetTotalWavesメソッドを呼び出す */
        const totalWaves = await wavePortalContract.getTotalWaves();
        
        /* UIに必要なのは、トータルウェイブ数 */
        const totalWavesCleaned = totalWaves.toNumber();
        
        /* React Stateにデータを格納する */
        console.log("totalWavesCleaned is ...", totalWavesCleaned);
        setTotalWaves(totalWavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatement = async () => {
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
        
        const statementCleaned = await wavePortalContract.getStatement();
        
        
        //const statementCleaned = statement;
        
        
        console.log("statementCleaned is ...", statementCleaned);
        setStatement(statementCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikesForPic1 = async () => {
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
        /* コントラクトからgetLikesForPic1メソッドを呼び出す */
        const lfp1 = await wavePortalContract.getLikesForPic1();
        
        /* UIに必要なのは、ライク数 */
        const likesForPic1Cleaned = lfp1.toNumber();
        
        /* React Stateにデータを格納する */
        console.log("likesForPic1Cleaned is ...", likesForPic1Cleaned);
        setLikesForPic1(likesForPic1Cleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikesForPic2 = async () => {
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
        /* コントラクトからgetLikesForPic2メソッドを呼び出す */
        const lfp2 = await wavePortalContract.getLikesForPic2();
        
        /* UIに必要なのは、ライク数 */
        const likesForPic2Cleaned = lfp2.toNumber();
        
        /* React Stateにデータを格納する */
        console.log("likesForPic2Cleaned is ...", likesForPic2Cleaned);
        setLikesForPic2(likesForPic2Cleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikesForPic3 = async () => {
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
        /* コントラクトからgetLikesForPic3メソッドを呼び出す */
        const lfp3 = await wavePortalContract.getLikesForPic3();
        
        /* UIに必要なのは、ライク数 */
        const likesForPic3Cleaned = lfp3.toNumber();
        
        /* React Stateにデータを格納する */
        console.log("likesForPic3Cleaned is ...", likesForPic3Cleaned);
        setLikesForPic3(likesForPic3Cleaned);
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

    const onNewTotalWave = (totalWaves) => {
      console.log("NewTotalWave", totalWaves);
      const totalWavesCleaned = totalWaves.toNumber();
      setTotalWaves(totalWavesCleaned);
    };

    const onNewStatement = (statement) => {
      showResults = true;
      console.log("NewStatement", statement);
      const statementCleaned = statement;
      setStatement(statementCleaned);
    };

    const onNewLikeForPic1 = (likesForPic1) => {
      showResults1 = true;
      console.log("NewLikeForPic1", likesForPic1);
      const likesForPic1Cleaned = likesForPic1.toNumber();
      setLikesForPic1(likesForPic1Cleaned);
    };

    const onNewLikeForPic2 = (likesForPic2) => {
      showResults2 = true;
      console.log("NewLikeForPic2", likesForPic2);
      const likesForPic2Cleaned = likesForPic2.toNumber();
      setLikesForPic2(likesForPic2Cleaned);
    };

    const onNewLikeForPic3 = (likesForPic3) => {
      showResults3 = true;
      console.log("NewLikeForPic3", likesForPic3);
      const likesForPic3Cleaned = likesForPic3.toNumber();
      setLikesForPic3(likesForPic3Cleaned);
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
      wavePortalContract.on("NewTotalWave", onNewTotalWave);
      wavePortalContract.on("NewStatement", onNewStatement);
      wavePortalContract.on("NewLikeForPic1", onNewLikeForPic1);
      wavePortalContract.on("NewLikeForPic2", onNewLikeForPic2);
      wavePortalContract.on("NewLikeForPic3", onNewLikeForPic3);
    }
    /*メモリリークを防ぐために、NewWaveのイベントを解除します*/
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
        wavePortalContract.off("NewTotalWave", onNewTotalWave);
        wavePortalContract.off("NewStatement", onNewStatement);
        wavePortalContract.off("NewLikeForPic1", onNewLikeForPic1);
        wavePortalContract.off("NewLikeForPic2", onNewLikeForPic2);
        wavePortalContract.off("NewLikeForPic3", onNewLikeForPic3);
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
        getTotalWaves();
        getStatement();
        getLikesForPic1();
        getLikesForPic2();
        getLikesForPic3();
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
        console.log("He/She has waved!");
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        
        let contractBalance = await provider.getBalance(wavePortalContract.address);
        console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
        
        /* コントラクトに👋（wave）を書き込む */
        const waveTxn = await wavePortalContract.wave(messageValue, {
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        
        let contractBalance_post = await provider.getBalance(
          wavePortalContract.address
        );
        /* コントラクトの残高が減っていることを確認 */
        if (contractBalance_post < contractBalance) {
          /* 減っていたら下記を出力 */
          console.log("User won ETH!");
          alert('User won ETH!');
        } else {
          console.log("User didn't win ETH.");
          alert('User didn\'t win ETH.');
        }
        console.log(
          "Contract balance after wave:",
          ethers.utils.formatEther(contractBalance_post)
        );
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* likeの回数をカウントする関数を実装 */
  const likeForPic1 = async () => {
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
        console.log("He/She has liked Pic1!");
        let count = await wavePortalContract.getLikesForPic1();
        console.log("Retrieved LikesForPic1 count...", count.toNumber());
        
        let contractBalance = await provider.getBalance(wavePortalContract.address);
        console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
        
        /* コントラクトに👍（like）を書き込む */
        const likeTxn = await wavePortalContract.likeForPic1();
        await likeTxn.wait();
        count = await wavePortalContract.getLikesForPic1();
        console.log("Retrieved LikesForPic1 count...", count.toNumber());
        
        let contractBalance_post = await provider.getBalance(
          wavePortalContract.address
        );
        /* コントラクトの残高が減っていることを確認 */
        if (contractBalance_post < contractBalance) {
          /* 減っていたら下記を出力 */
          console.log("User won ETH!");
          alert('User won ETH!');
        } else {
          console.log("User didn't win ETH.");
          alert('User didn\'t win ETH.');
        }
        console.log(
          "Contract balance after wave:",
          ethers.utils.formatEther(contractBalance_post)
        );
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* likeの回数をカウントする関数を実装 */
  const likeForPic2 = async () => {
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
        console.log("He/She has liked Pic2!");
        let count = await wavePortalContract.getLikesForPic2();
        console.log("Retrieved LikesForPic2 count...", count.toNumber());
        
        let contractBalance = await provider.getBalance(wavePortalContract.address);
        console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
        
        /* コントラクトに👍（like）を書き込む */
        const likeTxn = await wavePortalContract.likeForPic2();
        await likeTxn.wait();
        count = await wavePortalContract.getLikesForPic2();
        console.log("Retrieved LikesForPic2 count...", count.toNumber());
        
        let contractBalance_post = await provider.getBalance(
          wavePortalContract.address
        );
        /* コントラクトの残高が減っていることを確認 */
        if (contractBalance_post < contractBalance) {
          /* 減っていたら下記を出力 */
          console.log("User won ETH!");
          alert('User won ETH!');
        } else {
          console.log("User didn't win ETH.");
          alert('User didn\'t win ETH.');
        }
        console.log(
          "Contract balance after wave:",
          ethers.utils.formatEther(contractBalance_post)
        );
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* likeの回数をカウントする関数を実装 */
  const likeForPic3 = async () => {
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
        console.log("He/She has liked Pic3!");
        let count = await wavePortalContract.getLikesForPic3();
        console.log("Retrieved LikesForPic3 count...", count.toNumber());
        
        let contractBalance = await provider.getBalance(wavePortalContract.address);
        console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
        
        /* コントラクトに👍（like）を書き込む */
        const likeTxn = await wavePortalContract.likeForPic3();
        await likeTxn.wait();
        count = await wavePortalContract.getLikesForPic3();
        console.log("Retrieved LikesForPic3 count...", count.toNumber());
        
        let contractBalance_post = await provider.getBalance(
          wavePortalContract.address
        );
        /* コントラクトの残高が減っていることを確認 */
        if (contractBalance_post < contractBalance) {
          /* 減っていたら下記を出力 */
          console.log("User won ETH!");
          alert('User won ETH!');
        } else {
          console.log("User didn't win ETH.");
          alert('User didn\'t win ETH.');
        }
        console.log(
          "Contract balance after wave:",
          ethers.utils.formatEther(contractBalance_post)
        );
        
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
            <h1 class="l_header__logo">
              <a href="index.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="240.381" height="56.64" viewBox="0 0 240.381 56.64">
                    <path d="M 159.57 15.259 L 158.472 15.259 L 158.472 9.985 A 5.328 5.328 0 0 1 158.664 8.694 A 3.504 3.504 0 0 1 159.961 6.787 A 2.813 2.813 0 0 1 160.476 6.48 Q 160.859 6.307 161.242 6.299 A 1.78 1.78 0 0 1 161.279 6.299 A 1.678 1.678 0 0 1 162.099 6.494 Q 162.46 6.691 162.708 7.09 A 2.74 2.74 0 0 1 162.964 7.642 Q 163.159 8.228 163.159 8.96 L 163.159 13.794 Q 163.159 14.596 162.886 14.937 A 0.65 0.65 0 0 1 162.622 15.137 Q 162.28 15.259 161.45 15.259 L 161.45 15.869 L 166.699 15.869 Q 166.699 15.627 166.625 15.484 A 0.364 0.364 0 0 0 166.333 15.283 Q 166.26 15.265 166.16 15.26 A 1.545 1.545 0 0 0 166.089 15.259 L 164.99 15.259 L 164.99 9.204 L 164.99 9.009 A 4.582 4.582 0 0 1 165.371 7.91 A 3.131 3.131 0 0 1 166.724 6.519 A 2.723 2.723 0 0 1 167.178 6.347 A 1.984 1.984 0 0 1 167.7 6.274 A 1.833 1.833 0 0 1 168.531 6.456 Q 168.939 6.66 169.217 7.092 A 2.741 2.741 0 0 1 169.458 7.568 A 3.352 3.352 0 0 1 169.662 8.353 A 4.395 4.395 0 0 1 169.702 8.96 L 169.702 13.794 Q 169.702 14.596 169.429 14.937 A 0.65 0.65 0 0 1 169.165 15.137 Q 168.823 15.259 167.993 15.259 L 167.993 15.869 L 173.389 15.869 Q 173.389 15.627 173.314 15.484 A 0.364 0.364 0 0 0 173.022 15.283 Q 172.95 15.265 172.85 15.26 A 1.545 1.545 0 0 0 172.778 15.259 L 171.533 15.259 L 171.533 9.204 Q 171.533 6.689 169.897 5.688 A 3.029 3.029 0 0 0 168.311 5.249 A 3.27 3.27 0 0 0 165.745 6.432 A 4.818 4.818 0 0 0 165.332 6.982 A 5.048 5.048 0 0 0 164.844 7.91 A 4.616 4.616 0 0 0 164.479 6.862 A 2.828 2.828 0 0 0 162.915 5.42 Q 162.476 5.249 162.012 5.249 A 3.448 3.448 0 0 0 159.384 6.41 A 4.719 4.719 0 0 0 159.106 6.738 A 4.498 4.498 0 0 0 158.447 7.935 L 158.35 5.493 L 154.81 5.493 L 154.81 6.104 L 156.641 6.104 L 156.641 13.794 A 3.033 3.033 0 0 1 156.61 14.242 Q 156.529 14.786 156.227 15.018 A 0.777 0.777 0 0 1 156.006 15.137 Q 155.64 15.259 154.81 15.259 L 154.81 15.869 L 160.181 15.869 Q 160.181 15.622 160.096 15.477 A 0.4 0.4 0 0 0 159.814 15.283 A 1.242 1.242 0 0 0 159.57 15.259 Z M 104.565 15.259 L 103.467 15.259 L 103.467 9.985 A 5.391 5.391 0 0 1 103.654 8.698 A 3.364 3.364 0 0 1 105.078 6.714 A 2.807 2.807 0 0 1 105.738 6.404 A 2.283 2.283 0 0 1 106.421 6.299 Q 107.91 6.299 108.447 7.69 A 3.16 3.16 0 0 1 108.636 8.447 A 4.075 4.075 0 0 1 108.667 8.96 L 108.667 13.794 A 3.033 3.033 0 0 1 108.637 14.242 Q 108.555 14.786 108.254 15.018 A 0.777 0.777 0 0 1 108.032 15.137 Q 107.666 15.259 106.836 15.259 L 106.836 15.869 L 112.329 15.869 Q 112.329 15.627 112.255 15.484 A 0.364 0.364 0 0 0 111.963 15.283 Q 111.89 15.265 111.79 15.26 A 1.545 1.545 0 0 0 111.719 15.259 L 110.498 15.259 L 110.498 9.204 A 5.542 5.542 0 0 0 110.35 7.877 A 3.403 3.403 0 0 0 108.814 5.713 Q 108.032 5.249 107.129 5.249 A 3.634 3.634 0 0 0 104.381 6.427 A 4.664 4.664 0 0 0 104.15 6.689 Q 103.711 7.251 103.442 7.935 L 103.345 5.493 L 99.805 5.493 L 99.805 6.104 L 101.636 6.104 L 101.636 13.794 A 3.033 3.033 0 0 1 101.605 14.242 Q 101.524 14.786 101.222 15.018 A 0.777 0.777 0 0 1 101.001 15.137 Q 100.635 15.259 99.805 15.259 L 99.805 15.869 L 105.176 15.869 Q 105.176 15.627 105.101 15.484 A 0.364 0.364 0 0 0 104.81 15.283 Q 104.737 15.265 104.637 15.26 A 1.545 1.545 0 0 0 104.565 15.259 Z M 190.82 15.259 L 189.722 15.259 L 189.722 9.985 A 5.391 5.391 0 0 1 189.908 8.698 A 3.364 3.364 0 0 1 191.333 6.714 A 2.807 2.807 0 0 1 191.993 6.404 A 2.283 2.283 0 0 1 192.676 6.299 Q 194.165 6.299 194.702 7.69 A 3.16 3.16 0 0 1 194.891 8.447 A 4.075 4.075 0 0 1 194.922 8.96 L 194.922 13.794 A 3.033 3.033 0 0 1 194.892 14.242 Q 194.81 14.786 194.509 15.018 A 0.777 0.777 0 0 1 194.287 15.137 Q 193.921 15.259 193.091 15.259 L 193.091 15.869 L 198.584 15.869 Q 198.584 15.627 198.509 15.484 A 0.364 0.364 0 0 0 198.218 15.283 Q 198.145 15.265 198.045 15.26 A 1.545 1.545 0 0 0 197.974 15.259 L 196.753 15.259 L 196.753 9.204 A 5.542 5.542 0 0 0 196.604 7.877 A 3.403 3.403 0 0 0 195.068 5.713 Q 194.287 5.249 193.384 5.249 A 3.634 3.634 0 0 0 190.635 6.427 A 4.664 4.664 0 0 0 190.405 6.689 Q 189.966 7.251 189.697 7.935 L 189.6 5.493 L 186.06 5.493 L 186.06 6.104 L 187.891 6.104 L 187.891 13.794 A 3.033 3.033 0 0 1 187.86 14.242 Q 187.779 14.786 187.477 15.018 A 0.777 0.777 0 0 1 187.256 15.137 Q 186.89 15.259 186.06 15.259 L 186.06 15.869 L 191.431 15.869 Q 191.431 15.627 191.356 15.484 A 0.364 0.364 0 0 0 191.064 15.283 Q 190.992 15.265 190.892 15.26 A 1.545 1.545 0 0 0 190.82 15.259 Z M 22.095 15.259 L 20.874 15.259 L 20.874 5.493 L 17.041 5.493 L 17.041 6.104 L 19.043 6.104 L 19.043 11.377 A 4.953 4.953 0 0 1 18.893 12.636 A 3.28 3.28 0 0 1 17.505 14.6 A 2.79 2.79 0 0 1 16.82 14.944 A 2.301 2.301 0 0 1 16.089 15.063 A 2.873 2.873 0 0 1 15.169 14.927 Q 14.005 14.535 13.77 13.013 A 4.837 4.837 0 0 1 13.728 12.566 A 5.826 5.826 0 0 1 13.721 12.28 L 13.721 5.493 L 10.01 5.493 L 10.01 6.104 L 11.89 6.104 L 11.89 11.914 A 7.351 7.351 0 0 0 12.05 13.478 Q 12.639 16.094 15.381 16.113 A 3.605 3.605 0 0 0 18.12 14.932 A 4.683 4.683 0 0 0 18.384 14.624 Q 18.823 14.063 19.092 13.379 L 19.263 15.869 L 22.705 15.869 Q 22.705 15.627 22.631 15.484 A 0.364 0.364 0 0 0 22.339 15.283 Q 22.266 15.265 22.166 15.26 A 1.545 1.545 0 0 0 22.095 15.259 Z M 152.808 15.259 L 151.587 15.259 L 151.587 5.493 L 147.754 5.493 L 147.754 6.104 L 149.756 6.104 L 149.756 11.377 A 4.953 4.953 0 0 1 149.606 12.636 A 3.28 3.28 0 0 1 148.218 14.6 A 2.79 2.79 0 0 1 147.533 14.944 A 2.301 2.301 0 0 1 146.802 15.063 A 2.873 2.873 0 0 1 145.881 14.927 Q 144.718 14.535 144.482 13.013 A 4.837 4.837 0 0 1 144.44 12.566 A 5.826 5.826 0 0 1 144.434 12.28 L 144.434 5.493 L 140.723 5.493 L 140.723 6.104 L 142.603 6.104 L 142.603 11.914 A 7.351 7.351 0 0 0 142.763 13.478 Q 143.351 16.094 146.094 16.113 A 3.605 3.605 0 0 0 148.832 14.932 A 4.683 4.683 0 0 0 149.097 14.624 Q 149.536 14.063 149.805 13.379 L 149.976 15.869 L 153.418 15.869 Q 153.418 15.627 153.343 15.484 A 0.364 0.364 0 0 0 153.052 15.283 Q 152.979 15.265 152.879 15.26 A 1.545 1.545 0 0 0 152.808 15.259 Z M 82.105 13.281 L 82.3 15.869 L 85.791 15.869 Q 85.791 15.627 85.716 15.484 A 0.364 0.364 0 0 0 85.425 15.283 Q 85.352 15.265 85.252 15.26 A 1.545 1.545 0 0 0 85.181 15.259 L 83.96 15.259 L 83.911 0 L 79.761 0 L 79.761 0.61 L 82.08 0.61 L 82.08 6.567 Q 80.884 5.249 78.857 5.249 A 4.733 4.733 0 0 0 76.927 5.629 Q 75.627 6.202 74.805 7.642 A 6.438 6.438 0 0 0 73.989 10.458 A 7.773 7.773 0 0 0 73.975 10.937 A 7.573 7.573 0 0 0 74.151 12.63 Q 74.555 14.389 75.879 15.356 A 4.021 4.021 0 0 0 78.247 16.113 A 3.938 3.938 0 0 0 80.389 15.487 Q 81.46 14.782 82.105 13.281 Z M 121.314 5.103 L 121.314 8.154 L 120.679 8.154 A 2.971 2.971 0 0 0 120.52 7.21 Q 120.048 5.902 118.189 5.884 A 4.762 4.762 0 0 0 117.41 5.942 Q 116.255 6.135 115.918 6.958 A 1.572 1.572 0 0 0 115.796 7.568 A 1.472 1.472 0 0 0 116.18 8.546 Q 116.381 8.78 116.687 8.993 A 4.623 4.623 0 0 0 117.31 9.351 A 6.451 6.451 0 0 0 117.505 9.444 Q 117.835 9.595 118.384 9.814 Q 119.905 10.434 120.646 11.011 A 2.889 2.889 0 0 1 121.021 11.353 Q 121.729 12.134 121.729 13.208 Q 121.729 14.75 120.453 15.49 A 4.06 4.06 0 0 1 119.629 15.845 A 5.264 5.264 0 0 1 118.395 16.092 A 6.34 6.34 0 0 1 117.871 16.113 A 6.224 6.224 0 0 1 116.229 15.881 A 5.107 5.107 0 0 1 114.819 15.234 Q 114.819 15.67 114.67 15.852 A 0.344 0.344 0 0 1 114.502 15.967 A 1.663 1.663 0 0 1 114.364 15.983 Q 114.294 15.989 114.214 15.991 A 2.963 2.963 0 0 1 114.16 15.991 L 114.16 12.28 L 114.844 12.28 Q 114.887 15.047 116.965 15.402 A 3.854 3.854 0 0 0 117.578 15.454 A 4.286 4.286 0 0 0 118.385 15.384 Q 119.416 15.186 119.849 14.429 A 1.537 1.537 0 0 0 120.068 13.623 A 1.439 1.439 0 0 0 119.708 12.685 Q 119.335 12.237 118.579 11.865 A 5.821 5.821 0 0 0 118.394 11.771 Q 118.094 11.623 117.583 11.4 A 40.328 40.328 0 0 0 117.529 11.377 A 17.6 17.6 0 0 1 116.612 10.968 Q 115.363 10.364 114.868 9.814 Q 114.16 9.009 114.16 7.935 Q 114.16 6.62 115.29 5.915 A 3.942 3.942 0 0 1 116.016 5.566 A 5.132 5.132 0 0 1 117.471 5.262 A 6.048 6.048 0 0 1 117.871 5.249 Q 119.482 5.249 120.654 5.933 A 2.235 2.235 0 0 1 120.668 5.67 Q 120.7 5.402 120.804 5.263 A 0.358 0.358 0 0 1 120.996 5.127 A 1.786 1.786 0 0 1 121.189 5.106 A 2.208 2.208 0 0 1 121.314 5.103 Z M 63.281 13.574 L 62.647 13.55 Q 62.488 15.207 61.801 15.344 A 0.645 0.645 0 0 1 61.694 15.356 A 0.571 0.571 0 0 1 61.217 15.024 Q 61.08 14.767 61.046 14.311 A 4.091 4.091 0 0 1 61.035 14.087 L 61.035 8.936 A 5.06 5.06 0 0 0 60.845 7.485 Q 60.22 5.399 57.544 5.249 L 57.105 5.249 Q 54.37 5.249 53.442 6.519 A 1.78 1.78 0 0 0 53.253 6.856 A 1.266 1.266 0 0 0 53.149 7.349 Q 53.149 8.015 53.699 8.19 A 1.199 1.199 0 0 0 53.857 8.228 A 1.242 1.242 0 0 0 54.102 8.252 A 0.755 0.755 0 0 0 54.729 7.925 Q 54.822 7.802 54.895 7.633 A 2.032 2.032 0 0 0 54.932 7.544 A 27.544 27.544 0 0 1 55.052 7.231 Q 55.292 6.619 55.392 6.474 A 0.384 0.384 0 0 1 55.396 6.47 A 1.477 1.477 0 0 1 56.225 5.931 Q 56.5 5.859 56.836 5.859 A 3.272 3.272 0 0 1 57.817 6.061 Q 58.847 6.462 59.113 7.626 A 3.894 3.894 0 0 1 59.204 8.374 L 59.204 9.912 Q 53.467 9.912 52.637 12.305 A 3.191 3.191 0 0 0 52.498 13.058 A 3.76 3.76 0 0 0 52.49 13.306 A 3.226 3.226 0 0 0 52.642 14.328 Q 52.955 15.268 53.911 15.746 A 3.46 3.46 0 0 0 54.126 15.845 A 3.653 3.653 0 0 0 55.518 16.113 A 4.286 4.286 0 0 0 57.253 15.769 A 4.119 4.119 0 0 0 58.521 14.893 A 3.665 3.665 0 0 0 58.945 14.355 A 2.991 2.991 0 0 0 59.18 13.916 A 4.225 4.225 0 0 0 59.38 14.777 Q 59.853 16.094 61.182 16.113 Q 62.923 16.113 63.219 14.166 A 5.001 5.001 0 0 0 63.257 13.843 A 1.904 1.904 0 0 0 63.275 13.702 A 1.418 1.418 0 0 0 63.281 13.574 Z M 6.714 1.855 L 8.667 1.855 L 8.667 1.221 L 2.417 1.221 L 2.417 1.855 L 4.614 1.855 L 4.614 11.914 A 18.44 18.44 0 0 1 4.583 13.034 Q 4.486 14.62 4.087 15.243 A 1.019 1.019 0 0 1 3.857 15.503 A 1.162 1.162 0 0 1 3.198 15.698 Q 2.544 15.698 2.323 14.954 A 1.95 1.95 0 0 1 2.319 14.941 A 25.662 25.662 0 0 0 2.225 14.646 Q 2.032 14.059 1.953 13.94 A 0.947 0.947 0 0 0 1.351 13.575 A 1.466 1.466 0 0 0 1.074 13.55 A 1.226 1.226 0 0 0 0.67 13.612 Q 0.318 13.735 0.14 14.097 A 1.393 1.393 0 0 0 0.073 14.258 A 1.236 1.236 0 0 0 0.021 14.436 A 0.91 0.91 0 0 0 0 14.624 A 1.286 1.286 0 0 0 0.547 15.685 Q 0.833 15.905 1.27 16.064 Q 1.953 16.309 2.783 16.309 Q 4.883 16.309 5.957 14.648 Q 6.688 13.493 6.713 11.791 A 8.255 8.255 0 0 0 6.714 11.67 L 6.714 1.855 Z M 69.605 15.259 L 67.847 15.259 L 67.847 10.4 Q 67.847 8.179 69.214 6.836 A 3.686 3.686 0 0 1 69.472 6.61 Q 69.843 6.317 70.117 6.299 A 0.607 0.607 0 0 1 70.478 6.424 Q 70.687 6.575 70.874 6.909 Q 71.16 7.41 71.42 7.596 A 0.611 0.611 0 0 0 71.606 7.69 A 0.923 0.923 0 0 0 71.895 7.739 A 0.873 0.873 0 0 0 71.899 7.739 Q 72.632 7.739 72.827 7.031 A 0.923 0.923 0 0 0 72.876 6.743 A 0.873 0.873 0 0 0 72.876 6.738 Q 72.876 5.64 71.753 5.396 A 2.542 2.542 0 0 0 71.457 5.354 A 2.11 2.11 0 0 0 71.289 5.347 A 3.279 3.279 0 0 0 69.194 6.107 A 4.674 4.674 0 0 0 68.677 6.592 Q 68.14 7.178 67.822 7.91 L 67.725 5.493 L 64.185 5.493 L 64.185 6.104 L 66.016 6.104 L 66.016 13.794 A 3.033 3.033 0 0 1 65.985 14.242 Q 65.904 14.786 65.602 15.018 A 0.777 0.777 0 0 1 65.381 15.137 Q 65.015 15.259 64.185 15.259 L 64.185 15.869 L 70.215 15.869 Q 70.215 15.627 70.14 15.484 A 0.364 0.364 0 0 0 69.849 15.283 Q 69.776 15.265 69.676 15.26 A 1.545 1.545 0 0 0 69.605 15.259 Z M 136.841 15.259 L 135.083 15.259 L 135.083 10.4 Q 135.083 8.179 136.45 6.836 A 3.686 3.686 0 0 1 136.708 6.61 Q 137.079 6.317 137.354 6.299 A 0.607 0.607 0 0 1 137.715 6.424 Q 137.923 6.575 138.11 6.909 Q 138.397 7.41 138.657 7.596 A 0.611 0.611 0 0 0 138.843 7.69 A 0.923 0.923 0 0 0 139.131 7.739 A 0.873 0.873 0 0 0 139.136 7.739 Q 139.868 7.739 140.064 7.031 A 0.923 0.923 0 0 0 140.112 6.743 A 0.873 0.873 0 0 0 140.112 6.738 Q 140.112 5.64 138.989 5.396 A 2.542 2.542 0 0 0 138.694 5.354 A 2.11 2.11 0 0 0 138.525 5.347 A 3.279 3.279 0 0 0 136.43 6.107 A 4.674 4.674 0 0 0 135.913 6.592 Q 135.376 7.178 135.059 7.91 L 134.961 5.493 L 131.421 5.493 L 131.421 6.104 L 133.252 6.104 L 133.252 13.794 A 3.033 3.033 0 0 1 133.222 14.242 Q 133.14 14.786 132.839 15.018 A 0.777 0.777 0 0 1 132.617 15.137 Q 132.251 15.259 131.421 15.259 L 131.421 15.869 L 137.451 15.869 Q 137.451 15.627 137.377 15.484 A 0.364 0.364 0 0 0 137.085 15.283 Q 137.012 15.265 136.912 15.26 A 1.545 1.545 0 0 0 136.841 15.259 Z M 123.193 5.493 L 123.193 6.104 L 124.902 6.104 L 124.902 12.988 Q 125.073 16.04 127.71 16.138 A 2.681 2.681 0 0 0 129.042 15.819 Q 130.147 15.2 130.518 13.379 L 130.518 13.33 L 129.858 13.208 A 6.399 6.399 0 0 1 129.553 14.031 Q 129.148 14.913 128.574 15.235 A 1.43 1.43 0 0 1 128.076 15.405 A 1.34 1.34 0 0 1 127.4 15.215 Q 126.75 14.806 126.733 13.525 L 126.733 6.104 L 130.518 6.104 L 130.518 5.493 L 126.733 5.493 L 126.733 2.661 L 124.902 3.174 L 124.902 5.493 L 123.193 5.493 Z M 199.683 5.493 L 199.683 6.104 L 201.392 6.104 L 201.392 12.988 Q 201.563 16.04 204.199 16.138 A 2.681 2.681 0 0 0 205.531 15.819 Q 206.636 15.2 207.007 13.379 L 207.007 13.33 L 206.348 13.208 A 6.399 6.399 0 0 1 206.042 14.031 Q 205.637 14.913 205.063 15.235 A 1.43 1.43 0 0 1 204.565 15.405 A 1.34 1.34 0 0 1 203.889 15.215 Q 203.24 14.806 203.223 13.525 L 203.223 6.104 L 207.007 6.104 L 207.007 5.493 L 203.223 5.493 L 203.223 2.661 L 201.392 3.174 L 201.392 5.493 L 199.683 5.493 Z M 92.114 15.869 L 98.096 15.869 Q 98.096 15.332 97.705 15.259 A 1.242 1.242 0 0 0 97.461 15.234 L 96.167 15.234 L 96.167 1.855 L 98.096 1.855 L 98.096 1.221 L 92.114 1.221 L 92.114 1.855 L 94.067 1.855 L 94.067 15.234 L 92.114 15.234 L 92.114 15.869 Z M 184.326 13.525 L 183.716 13.306 Q 182.861 15.161 180.957 15.405 A 4.918 4.918 0 0 1 180.633 15.427 A 4.166 4.166 0 0 1 180.493 15.43 A 3.175 3.175 0 0 1 179.016 15.101 Q 177.791 14.468 177.326 12.616 A 7.405 7.405 0 0 1 177.271 12.378 A 8.592 8.592 0 0 1 177.099 11.303 A 10.897 10.897 0 0 1 177.051 10.498 L 179.98 10.547 Q 182.813 10.593 183.724 10.044 A 1.37 1.37 0 0 0 183.814 9.985 A 1.579 1.579 0 0 0 184.461 8.826 A 2.265 2.265 0 0 0 184.473 8.594 Q 184.473 6.934 182.788 5.957 Q 181.592 5.249 180.029 5.249 A 5.693 5.693 0 0 0 178.223 5.519 Q 176.548 6.077 175.659 7.788 A 6.113 6.113 0 0 0 175.013 10.007 A 7.525 7.525 0 0 0 174.976 10.767 A 6.653 6.653 0 0 0 175.21 12.585 A 4.666 4.666 0 0 0 177.148 15.259 A 5.187 5.187 0 0 0 179.871 16.109 A 6.306 6.306 0 0 0 180.103 16.113 A 5.74 5.74 0 0 0 181.666 15.913 A 3.978 3.978 0 0 0 183.984 14.209 Q 184.18 13.867 184.326 13.525 Z M 36.23 15.259 L 34.912 15.259 L 34.912 0 L 31.25 0 L 31.25 0.61 L 33.081 0.61 L 33.081 13.794 A 3.033 3.033 0 0 1 33.051 14.242 Q 32.969 14.786 32.668 15.018 A 0.777 0.777 0 0 1 32.446 15.137 Q 32.08 15.259 31.25 15.259 L 31.25 15.869 L 36.841 15.869 Q 36.841 15.627 36.766 15.484 A 0.364 0.364 0 0 0 36.475 15.283 Q 36.402 15.265 36.302 15.26 A 1.545 1.545 0 0 0 36.23 15.259 Z M 43.286 15.259 L 41.968 15.259 L 41.968 0 L 38.306 0 L 38.306 0.61 L 40.137 0.61 L 40.137 13.794 A 3.033 3.033 0 0 1 40.106 14.242 Q 40.025 14.786 39.723 15.018 A 0.777 0.777 0 0 1 39.502 15.137 Q 39.136 15.259 38.306 15.259 L 38.306 15.869 L 43.897 15.869 Q 43.897 15.627 43.822 15.484 A 0.364 0.364 0 0 0 43.53 15.283 Q 43.457 15.265 43.357 15.26 A 1.545 1.545 0 0 0 43.286 15.259 Z M 29.102 15.259 L 27.881 15.259 L 27.881 5.493 L 24.097 5.493 L 24.097 6.104 L 26.05 6.104 L 26.05 13.794 A 2.526 2.526 0 0 1 26.008 14.272 Q 25.872 14.974 25.293 15.161 Q 25.013 15.236 24.462 15.253 A 11.498 11.498 0 0 1 24.097 15.259 L 24.097 15.869 L 29.712 15.869 Q 29.712 15.627 29.637 15.484 A 0.364 0.364 0 0 0 29.346 15.283 A 1.242 1.242 0 0 0 29.102 15.259 Z M 50.293 15.259 L 49.072 15.259 L 49.072 5.493 L 45.288 5.493 L 45.288 6.104 L 47.241 6.104 L 47.241 13.794 A 2.526 2.526 0 0 1 47.2 14.272 Q 47.064 14.974 46.484 15.161 Q 46.204 15.236 45.653 15.253 A 11.498 11.498 0 0 1 45.288 15.259 L 45.288 15.869 L 50.903 15.869 Q 50.903 15.627 50.829 15.484 A 0.364 0.364 0 0 0 50.537 15.283 A 1.242 1.242 0 0 0 50.293 15.259 Z M 76.159 9.119 A 9.855 9.855 0 0 0 76.05 10.645 Q 76.05 11.792 76.294 12.695 Q 76.671 14.202 77.577 14.779 A 2.423 2.423 0 0 0 78.906 15.137 A 2.547 2.547 0 0 0 79.798 14.981 A 2.742 2.742 0 0 0 80.689 14.429 A 3.85 3.85 0 0 0 81.614 13.143 Q 81.903 12.508 82.037 11.701 A 9.287 9.287 0 0 0 82.153 10.181 A 9.169 9.169 0 0 0 82.152 10.055 Q 82.144 9.451 82.056 8.918 A 5.437 5.437 0 0 0 81.738 7.764 A 4.145 4.145 0 0 0 81.388 7.068 Q 80.619 5.859 79.199 5.859 A 3.122 3.122 0 0 0 79.133 5.86 A 2.658 2.658 0 0 0 77.905 6.177 Q 76.499 6.954 76.159 9.119 Z M 179.639 9.888 L 177.051 9.814 A 7.348 7.348 0 0 1 177.211 8.533 Q 177.366 7.84 177.663 7.321 A 2.856 2.856 0 0 1 178.882 6.152 A 2.549 2.549 0 0 1 180.078 5.859 Q 181.768 5.859 182.336 7.268 A 2.971 2.971 0 0 1 182.349 7.3 A 2.532 2.532 0 0 1 182.543 8.226 A 2.913 2.913 0 0 1 182.544 8.301 A 1.895 1.895 0 0 1 182.461 8.882 Q 182.233 9.593 181.372 9.79 Q 180.813 9.902 179.822 9.891 A 17.601 17.601 0 0 1 179.639 9.888 Z M 59.204 10.571 L 59.204 12.524 A 3.851 3.851 0 0 1 58.782 13.647 A 3.078 3.078 0 0 1 57.422 14.893 A 3.016 3.016 0 0 1 56.806 15.088 A 2.478 2.478 0 0 1 56.323 15.137 A 2.219 2.219 0 0 1 55.595 15.025 Q 54.741 14.729 54.492 13.647 Q 54.419 13.306 54.419 12.891 Q 54.419 11.285 56.229 10.832 A 4.576 4.576 0 0 1 56.299 10.815 A 7.72 7.72 0 0 1 56.973 10.702 Q 57.865 10.588 59.204 10.571 Z M 28.174 1.929 Q 28.174 1.074 27.417 0.708 A 1.668 1.668 0 0 0 27.13 0.616 A 1.291 1.291 0 0 0 26.855 0.586 A 1.444 1.444 0 0 0 26.326 0.678 Q 25.956 0.823 25.728 1.194 A 1.743 1.743 0 0 0 25.635 1.367 A 1.342 1.342 0 0 0 25.513 1.929 A 1.553 1.553 0 0 0 25.591 2.438 Q 25.743 2.876 26.186 3.111 A 1.709 1.709 0 0 0 26.318 3.174 A 1.584 1.584 0 0 0 26.772 3.269 A 1.479 1.479 0 0 0 26.855 3.271 A 1.436 1.436 0 0 0 27.361 3.187 Q 27.743 3.045 27.966 2.66 A 1.68 1.68 0 0 0 28.052 2.49 A 1.342 1.342 0 0 0 28.174 1.929 Z M 49.365 1.929 Q 49.365 1.074 48.608 0.708 A 1.668 1.668 0 0 0 48.322 0.616 A 1.291 1.291 0 0 0 48.047 0.586 A 1.444 1.444 0 0 0 47.517 0.678 Q 47.147 0.823 46.919 1.194 A 1.743 1.743 0 0 0 46.826 1.367 A 1.342 1.342 0 0 0 46.704 1.929 A 1.553 1.553 0 0 0 46.783 2.438 Q 46.934 2.876 47.377 3.111 A 1.709 1.709 0 0 0 47.51 3.174 A 1.584 1.584 0 0 0 47.963 3.269 A 1.479 1.479 0 0 0 48.047 3.271 A 1.436 1.436 0 0 0 48.552 3.187 Q 48.934 3.045 49.157 2.66 A 1.68 1.68 0 0 0 49.243 2.49 A 1.342 1.342 0 0 0 49.365 1.929 Z"></path>
                </svg>
              </a>
            </h1>
        </div>
      </header>
      <div class="c_kv">
          <div class="c_kv__inner">
              <div class="swiper-container _top">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide">
                          
                      </div>
                      <div class="swiper-slide">
                          
                      </div>
                  </div>
                  <div class="swiper-pagination"></div>
              </div>
          </div>
      </div>
      <main class="l_main">
        <section class="c_section">
          <div class="c_section__header">
            <p class="c_section_Title">Connect your Ethereum wallet and</p>
            <p class="c_section_Title">click a like button below!</p>
            <p class="c_section_Title">You may get the Ethereum a bit!</p>
            <div class="p_waveButton">
              {/* ウォレットコネクトのボタンを実装 */}
              {!currentAccount && (
                <button className="waveButton" onClick={connectWallet}>
                  Connect Wallet
                </button>
              )}
              {currentAccount && (
                <button className="waveButton">Wallet Connected</button>
              )}
              <h2 class="c_section__headerTitle">Instruments we built</h2>
            </div>
          </div>
          {/* c_cards START */}
          <div class="c_cards">
            <div class="c_cards__item e_card">
              <a class="e_card__link" href="">
                <picture class="e_card__thumb">
                  <source type="image/webp" src="pic2.jpg"/>
                  <img src="pic2.jpg" alt="Café Guitar"/>
                </picture>
              </a>
                <div class="e_card__body">
                  <h3 class="e_card__title">Café Guitar</h3>
                  {/* likeボタンにlikepic1関数を連動 */}
                  {currentAccount && (
                    <button className="waveButton2" onClick={likeForPic1}>
                      👍Like
                    </button>
                  )}
                  { showResults1 ? <div>+ {likesForPic1}</div> : null }
                  <p class="e_card__price">priceless</p>
                </div>
              
            </div>
            <div class="c_cards__item e_card">
              <a class="e_card__link" href="">
                <picture class="e_card__thumb">
                  <source type="image/webp" src="pic3.jpg"/>
                  <img src="pic3.jpg" alt="adidas Guitar"/>
                </picture>
              </a>
                <div class="e_card__body">
                  <h3 class="e_card__title">adidas Guitar</h3>
                  {/* likeボタンにlikepic2関数を連動 */}
                  {currentAccount && (
                    <button className="waveButton2" onClick={likeForPic2}>
                      👍Like
                    </button>
                  )}
                  { showResults2 ? <div>+ {likesForPic2}</div> : null }
                  <p class="e_card__price">priceless</p>
                </div>
              
            </div>
            <div class="c_cards__item e_card">
              <a class="e_card__link" href="">
                <picture class="e_card__thumb">
                  <source type="image/webp" src="pic4.jpg"/>
                  <img src="pic4.jpg" alt="Flower Guitar"/>
                </picture>
              </a>
                <div class="e_card__body">
                  <h3 class="e_card__title">Flower Guitar</h3>
                  {/* likeボタンにlikepic3関数を連動 */}
                  {currentAccount && (
                    <button className="waveButton2" onClick={likeForPic3}>
                      👍Like
                    </button>
                  )}
                  { showResults3 ? <div>+ {likesForPic3}</div> : null }
                  <p class="e_card__price">priceless</p>
                </div>
              
            </div>
            
          </div>
        </section>
      </main>
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">
            
          </div>
          <div className="bio">
            
            
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};
export default App;