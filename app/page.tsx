"use client";

import { selectWallet } from "@/lib/features/wallet/selectors";
import { useAppSelector } from "@/lib/hooks";
import { Empty, Typography } from "antd";

export default function Home() {
  const wallet = useAppSelector(selectWallet);

  return (
    <main className="flex flex-col items-center justify-center justify-items-center text-center w-full h-dvh">
      <div>
        <Typography.Title level={2}>Welcome to MetaMaskPosts</Typography.Title>

        {!wallet.initialized ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={"No connected wallet yet"}
          />
        ) : (
          <div className="border border-slate-400 rounded-xl divide-y p-3 m-12">
            <Typography.Title level={3}>Wallet state</Typography.Title>
            <div className="p-3">Address: {wallet.account}</div>
            <div className="p-3">Balance: {wallet.balance}</div>
            <div className="p-3">ChainId: {wallet.chainId}</div>
          </div>
        )}
      </div>
    </main>
  );
}
