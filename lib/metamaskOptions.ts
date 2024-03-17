const host =
  typeof window !== "undefined" ? window.location.host : "defaultHost";

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-Posts",
    url: host, // using the host constant defined above
  },
};
export default sdkOptions;
