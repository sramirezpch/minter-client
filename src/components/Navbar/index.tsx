import { useAppSelector } from "../../hooks";
import WalletButton from "../WalletButton";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const account = useAppSelector((state) => state.account.address);

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
      <div className={styles.logo}>NFT Minter</div>
      <span>{account ? account : <WalletButton />}</span>
    </nav>
  );
};

export default Navbar;
