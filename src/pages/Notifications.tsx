import { useState } from "react";
import { BellDot, Check } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

const notificationsData: Notification[] = [
  {
    id: "1",
    title: "New Bug Report",
    message: "A new bug report has been submitted.",
    date: "10:24 AM",
    status: "unread",
  },
  {
    id: "2",
    title: "Project Update",
    message: "The project 'Dashboard' has been updated.",
    date: "Yesterday",
    status: "read",
  },
  {
    id: "3",
    title: "User Feedback",
    message: "You have received feedback from a user.",
    date: "Mon",
    status: "unread",
  },
  {
    id: "4",
    title: "System Alert",
    message: "Maintenance scheduled for this weekend.",
    date: "Sun",
    status: "read",
  },
];

export const Notifications = () => {
  const [notifications] = useState(notificationsData);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 px-4 py-3 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Notifications
        </h1>
      </header>

      {/* Notification List */}
      <main className="flex-1 overflow-y-auto">
        <div className="divide-y dark:divide-gray-800">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                ${notification.status === "unread" ? "bg-blue-50 dark:bg-blue-900/30" : ""}`}
            >
              {/* Left side: title + message */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium text-gray-900 dark:text-gray-100">
                    {notification.title}
                  </h2>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                    {notification.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {notification.message}
                </p>
              </div>

              {/* Right side: status */}
              <div className="ml-3 flex items-center">
                {notification.status === "unread" ? (
                  <BellDot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Check className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
