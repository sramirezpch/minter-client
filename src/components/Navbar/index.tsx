import Link from "next/link";

import styles from "./Navbar.module.css";

export default function () {
  return (
    <nav
      className="bg-slate-500 flex items-center p-3"
      style={{ height: "64px", backgroundColor: "rgb(113 113 122)" }}
    >
      <div>
        <Link href="/" className={styles.logo}>
          MARKETPLACE
        </Link>
      </div>
      <div className="flex" style={{ marginLeft: "auto" }}>
        <ul className="flex gap-x-8" style={{ gap: "20px" }}>
          <li>
            <Link href="/transaction">Make a transaction</Link>
          </li>
          <li>
            <Link href="/mint-nft">Mint a NFT</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
