import Link from "next/link";
import { useAppSelector } from "../../hooks";

import styles from "./Navbar.module.css";

export default function () {
  const account = useAppSelector((state) => state.account.address);

  return (
    <nav
      className="bg-slate-500 flex items-center justify-between p-3"
      style={{ height: "64px", backgroundColor: "rgb(113 113 122)" }}
    >
      <div>
        <Link href="/" className={styles.logo}>
          NFT Minter
        </Link>
      </div>
      <div className="ms-auto">
        <span>{account ? account : "No wallet connected"}</span>
      </div>
    </nav>
  );
}
