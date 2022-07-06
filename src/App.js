// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
/* ethers �ϐ����g����悤�ɂ���*/
import { ethers } from "ethers";
/* ABI�t�@�C�����܂�WavePortal.json�t�@�C�����C���|�[�g����*/
import abi from "./utils/WavePortal.json";

const App = () => {
  /* ���[�U�[�̃p�u���b�N�E�H���b�g��ۑ����邽�߂Ɏg�p�����ԕϐ����` */
  const [currentAccount, setCurrentAccount] = useState("");
  /* ���[�U�[�̃��b�Z�[�W��ۑ����邽�߂Ɏg�p�����ԕϐ����` */
  const [messageValue, setMessageValue] = useState("");
  /* ���ׂĂ�waves��ۑ������ԕϐ����` */
  const [allWaves, setAllWaves] = useState([]);
  console.log("currentAccount: ", currentAccount);
  /* �f�v���C���ꂽ�R���g���N�g�̃A�h���X��ێ�����ϐ����쐬 */
  const contractAddress = "0xD71191730B4A55342dea53b45428c7D522f7474c";
  /* �R���g���N�g���炷�ׂĂ�waves���擾���郁�\�b�h���쐬 */
  /* ABI�̓��e���Q�Ƃ���ϐ����쐬 */
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
        /* �R���g���N�g����getAllWaves���\�b�h���Ăяo�� */
        const waves = await wavePortalContract.getAllWaves();
        /* UI�ɕK�v�Ȃ̂́A�A�h���X�A�^�C���X�^���v�A���b�Z�[�W�����Ȃ̂ŁA�ȉ��̂悤�ɐݒ� */
        const wavesCleaned = waves.map((wave) => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          };
        });
        /* React State�Ƀf�[�^���i�[���� */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * `emit`���ꂽ�C�x���g���t�����g�G���h�ɔ��f������
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

    /* NewWave�C�x���g���R���g���N�g���甭�M���ꂽ�Ƃ��ɁA�������󂯎��܂� */
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
    /*���������[�N��h�����߂ɁANewWave�̃C�x���g���������܂�*/
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  /* window.ethereum�ɃA�N�Z�X�ł��邱�Ƃ��m�F����֐������� */
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      /* ���[�U�[�̃E�H���b�g�ւ̃A�N�Z�X��������Ă��邩�ǂ������m�F */
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
  /* connectWallet���\�b�h������ */
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
  /* wave�̉񐔂��J�E���g����֐������� */
  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        /* ABI���Q�� */
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        /* �R���g���N�g��?�iwave�j���������� */
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

  /* WEB�y�[�W�����[�h���ꂽ�Ƃ���checkIfWalletIsConnected()�����s */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="hand-wave">
            ?
          </span>{" "}
          WELCOME!
        </div>
        <div className="bio">
          �C�[�T���A���E�H���b�g��ڑ����āA���b�Z�[�W���쐬������A
          <span role="img" aria-label="hand-wave">
            ?
          </span>
          �𑗂��Ă�������
          <span role="img" aria-label="shine">
            ?
          </span>
        </div>
        <br />
        {/* �E�H���b�g�R�l�N�g�̃{�^�������� */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {currentAccount && (
          <button className="waveButton">Wallet Connected</button>
        )}
        {/* wave�{�^����wave�֐���A�� */}
        {currentAccount && (
          <button className="waveButton" onClick={wave}>
            Wave at Me
          </button>
        )}
        {/* ���b�Z�[�W�{�b�N�X������*/}
        {currentAccount && (
          <textarea
            name="messageArea"
            placeholder="���b�Z�[�W�͂�����"
            type="text"
            id="message"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
        )}
        {/* ������\������ */}
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
  );
};
export default App;