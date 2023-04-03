import { WalletButton } from "../WalletButton";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav
      className="bg-slate-500 p-3"
      style={{
        height: "64px",
        backgroundColor: "rgb(113 113 122)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo">NFT Minter</div>
      <WalletButton />
    </nav>
  );
};

export default Navbar;
