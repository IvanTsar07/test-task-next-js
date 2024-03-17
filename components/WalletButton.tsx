"use client";

import { useEffect } from "react";
import { Button, Modal } from "antd";
import { useSDK } from "@metamask/sdk-react";

import { formatAddress, formatBalance } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { walletSlice } from "@/lib/features/wallet/walletSlice";

export const WalletButton = () => {
  const dispatch = useAppDispatch();

  const { sdk, connected, connecting, account, balance, chainId, status } =
    useSDK();

  useEffect(() => {
    if (status?.connectionStatus === "disconnected") {
      connect();
    }

    if (connected) {
      dispatch(
        walletSlice.actions.setWalletData({
          account: account!,
          balance: formatBalance(balance!),
          chainId: chainId!,
          initialized: true,
        })
      );
    }

    return () => {
      disconnect();
    };
  }, [
    account,
    balance,
    chainId,
    status?.connectionStatus,
    connected,
    connecting,
  ]);

  const connect = async () => {
    try {
      await sdk?.connect();

      Modal.success({
        title: "Connected",
        content: "You are now connected to MetaMask",
      });
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      dispatch(walletSlice.actions.resetWalletState());
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <>
          <div>{formatAddress(account)}</div>
          <div>
            <Button
              danger
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </div>
        </>
      ) : (
        <Button
          type="primary"
          disabled={connecting}
          onClick={connect}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
