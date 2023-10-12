type BackDropProps = {
  onClick?: () => void;
  isOpen: boolean;
};

const BackDrop = ({ onClick, isOpen }: BackDropProps) => {
  return isOpen ? <div className="backdrop" onClick={onClick}></div> : <></>;
};

export default BackDrop;
