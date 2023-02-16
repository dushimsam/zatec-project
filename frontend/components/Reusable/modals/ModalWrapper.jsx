import { Spinner } from "react-bootstrap";
import styles from "../../../styles/components/modal.module.scss";

const ModalWrapper = ({
  title,
  content,
  btnActionText,
  close,
  disable,
  callFun,
  loading,
}) => {
  return (
    <div className={styles.modal}>
      <button className={styles.close} onClick={close}>
        &times;
      </button>
      <Spinner />
      <div className={styles.header}> {title} </div>
      <div className={styles.content}>{content}</div>
      <div className={`row justify-content-center ${styles.actions}`}>
        <div className="col-md-2 col-6 pl-md-3">
          <button
            className="btn  ml-md-0 px-md-3 shadow "
            style={{ backgroundColor: "#3643c7", color: "#fff" }}
            onClick={() => callFun()}
            disabled={!disable || loading}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              btnActionText
            )}
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-danger"
            onClick={() => {
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
