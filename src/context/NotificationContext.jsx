import { createContext, useState } from "react";

const duration = 3000;

const ProgressBar = () => {
  return (
    <div className="w-full h-1 bg-gray-200 rounded mt-2 overflow-hidden">
      <div
        className="h-full bg-mydarkgreen animate-progress"
        style={{
          animationDuration: `${duration}ms`,
        }}
      />
    </div>
  );
};

const NotificationComponent = ({ success, description, onClick, fading }) => {
  const title = success ? "Success" : "Fail";

  return (
    <div
      className={`p-4 bg-white shadow-lg rounded-md border mb-2 w-80 max-w-[250px] cursor-pointer transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{title}</h4>
        <p onClick={onClick}>X</p>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <ProgressBar duration={duration} />
    </div>
  );
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, fading: true } : n))
    );
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300);
  };

  const addNotification = (success, description) => {
    const id = Date.now();
    setNotifications((prev) => [
      { id, success, description, fading: false },
      ...prev,
    ]);

    setTimeout(() => removeNotification(id), duration);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 w-full">
        {notifications.map((n) => (
          <NotificationComponent
            key={n.id}
            success={n.success}
            description={n.description}
            fading={n.fading}
            onClick={() => removeNotification(n.id)}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
