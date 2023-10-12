import useOutsideClick from "../../utils/useOutsideClick";
import BackDrop from "./BackDrop";

type ModalProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: React.ComponentProps<"div">["className"];
  footer?: React.ReactNode;
};

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  className,
  footer,
}: ModalProps) => {
  const ref = useOutsideClick(onClose);
  if (!isOpen) return null;
  return (
    <>
      <BackDrop isOpen={isOpen} />
      <div ref={ref} className={`modal-container`}>
        <div className={`modal ${className}`}>
          {title}
          {children}
          {footer}
        </div>
      </div>
    </>
  );
};

export default Modal;
