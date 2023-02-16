import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../../../styles/components/DeleteConfirmation.module.scss";

const DeleteConfirmation = ({
  close,
  deleteItem,
  loading,
  setLoading,
  title,
  warningText,
}) => {
  return (
    <div>
      <div
        className={"modal-dialog modal-dialog-centered " + styles.modalConfirm}
      >
        <div className={"modal-content " + styles.modalContent}>
          <div className={"modal-body " + styles.modalBody}>
            <span className="h4">
              {!title ? "Do you really want to delete this record?" : title}
            </span>
            {warningText && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
                    fill="rgba(231,76,60,1)"
                  />
                </svg>
                <span className="font-italic ml-2">{warningText}</span>
              </div>
            )}
          </div>
          <div
            className={
              "modal-footer justify-content-center " + styles.modalFooter
            }
          >
            <button
              type="button"
              className={
                "btn btn-secondary " + styles.btnSecondary + " " + styles.btn
              }
              onClick={() => {
                close();
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className={
                "btn btn-danger " + styles.btnDanger + " " + styles.btn
              }
              disabled={loading}
              onClick={() => {
                setLoading(true);
                deleteItem();
              }}
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
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
