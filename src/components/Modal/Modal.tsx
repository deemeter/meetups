import "./Modal.styles.css";
import { ReactNode } from "react";

type Props = {
  active: boolean;
  setActive: Function;
  children: ReactNode;
};

const Modal = ({ active, setActive, children }: Props) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
