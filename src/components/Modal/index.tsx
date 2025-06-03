interface IProps {
  handleCancel: () => void;
  children: React.ReactNode;
}

const Modal = ({ handleCancel, children }: IProps) => {
  return (
    <div
      className="fixed w-full h-full bg-[rgba(0,0,0,0.5)] top-0 flex items-center justify-center "
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl animate-fadeIn max-h-[76vh] overflow-y-auto !p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
