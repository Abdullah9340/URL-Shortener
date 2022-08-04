import Navbar from "../components/Navbar/Navbar";
import styles from "./index.module.scss";
import Modal from "../components/Modal/Modal";
export default function Home() {
  return (
    <div className={styles.background}>
      <Navbar />
      <Modal />
    </div>
  );
}
// Todo
/*
Create field on homepage for adding urls to database and return the short url
- Error Checking

Dockerize application and use docker-compose to run it

Deploy to K8s or AWS
*/
