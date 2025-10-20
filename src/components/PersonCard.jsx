const PersonCard = ({ name, email, initial }) => {
  return (
    <div className="flex flex-col items-center p-6 border border-gray-100 rounded-sm">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
        <span className="text-gray-600 font-medium text-xl">{initial}</span>
      </div>
      <h3 className="font-medium text-gray-900 text-base mb-1">{name}</h3>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  );
};

export default PersonCard;
