export default function RemoveModal({ onClose, onRemove, name, type }) {
  const onSubmit = (e) => {
    e.preventDefault();
    onRemove(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-80 
        flex flex-col justify-center gap-4"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-medium">Remove Your Deck</h2>
          <h3 className="text-xl sm:text-2l">
            Are you sure you want to remove {type}{" "}
            <b className="text-mydarkgreen">{name}</b>?
          </h3>

          <div className="flex justify-end gap-2 flex-col-reverse sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-white cursor-pointer border text-lg sm:text-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border bg-mydarkgreen text-white rounded cursor-pointer text-lg sm:text-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
