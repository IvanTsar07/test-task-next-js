"use client";

import Link from "next/link";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { Layout, Menu, Typography } from "antd";
import { gray } from "@ant-design/colors";

import { WalletButton } from "../WalletButton";
import sdkOptions from "@/lib/metamaskOptions";

const { Header } = Layout;

export const NavBar = () => {
  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Typography.Text style={{ fontSize: "24px", color: gray[0] }}>
          MetaMaskPosts
        </Typography.Text>
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          {
            key: "/",
            label: <Link href="/">Home</Link>,
          },
          {
            key: "/posts",
            label: <Link href="/posts">Posts</Link>,
          },
        ]}
        defaultSelectedKeys={["0"]}
        style={{ flex: 1, minWidth: 0, marginLeft: "24px" }}
      />
      <MetaMaskProvider
        debug={false}
        sdkOptions={sdkOptions}
      >
        <WalletButton />
      </MetaMaskProvider>
    </Header>
  );
};

export default NavBar;
