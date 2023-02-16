import styles from "../styles/Home.module.scss";

export const  Footer = () =>(
    <footer className={styles.footer}>
    <div className={`row ${styles.divs}`}>
        <div className="col-12 col-md-2">
            <div className={styles.logo}>
                Music App
            </div>
        </div>
        <div className="col-12 col-md-7 d-block d-md-flex">
            <div className={styles.link}>SERVICES</div>
            <div className={styles.link}>BENEFITS</div>
            <div className={styles.link}>GET IN TOUCH</div>
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
     </div>
    </div>
    <hr className={styles.hr} />
    <div className={`row ${styles.divs}`}>
        <div className="col-12 col-md-9">
            <div className={styles.smallLink}>
            {new Date().getFullYear()} Music App by Samuel Dushimimana
            </div>
        </div>
        <div className="col-12 col-md-3 d-block d-md-flex justify-content-end">
            <div className={styles.smallLink}>Terms Or Services</div>
            <div className={styles.smallLink}>Privacy & Policies</div>
        </div>
    </div>
</footer>)

export  default  Footer;
