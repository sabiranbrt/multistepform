interface IProps {
  handleCancel: () => void;
}

const Modal = ({ handleCancel }: IProps) => {
  return (
    <div className=" fixed w-full h-full bg-black" onClick={handleCancel}>
      <div>
        <p>asd</p>
      </div>
    </div>
  );
};

export default Modal;
