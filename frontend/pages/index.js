import Navbar from "../components/Navbar/Navbar";
import styles from "./index.module.scss";
import Modal from "../components/URLModal/URLModal";
import QRModal from "../components/QRModal/QRModal";
import { useState } from "react";

export default function Home() {
  const [navigation, setNavigation] = useState("URL Short");
  return (
    <div className={styles.background}>
      <Navbar />
      {navigation === "URL Short" ? (
        <Modal setNavigation={setNavigation} />
      ) : (
        <QRModal setNavigation={setNavigation} />
      )}
    </div>
  );
}
