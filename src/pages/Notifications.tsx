import { useState } from "react";
import { BellDot, Check, Filter, X, MoreHorizontal, Settings, CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  time?: string;
  status: "unread" | "read";
  type?: "info" | "alert" | "success" | "warning";
}

const notificationsData: Notification[] = [
  {
    id: "1",
    title: "New Bug Report",
    message: "A new bug report has been submitted for the dashboard module.",
    date: "Today",
    time: "10:24 AM",
    status: "unread",
    type: "alert"
  },
  {
    id: "2",
    title: "Project Update",
    message: "The project 'Dashboard' has been updated to version 2.3.",
    date: "Yesterday",
    time: "3:45 PM",
    status: "read",
    type: "info"
  },
  {
    id: "3",
    title: "User Feedback",
    message: "You have received feedback from a user regarding the new interface.",
    date: "Mon",
    time: "11:20 AM",
    status: "unread",
    type: "info"
  },
  {
    id: "4",
    title: "System Alert",
    message: "Maintenance scheduled for this weekend. Expected downtime: 2 hours.",
    date: "Sun",
    time: "4:30 PM",
    status: "read",
    type: "warning"
  },
  {
    id: "5",
    title: "Task Completed",
    message: "Your task 'Implement dark mode' has been completed successfully.",
    date: "Sun",
    time: "2:15 PM",
    status: "read",
    type: "success"
  },
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => n.status === "unread") 
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, status: "read"} : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, status: "read"})));
  };

  const getNotificationIcon = (type: Notification["type"] = "info") => {
    const iconConfig = {
      info: { icon: BellDot, color: "text-blue-500" },
      alert: { icon: BellDot, color: "text-red-500" },
      success: { icon: CheckCircle, color: "text-green-500" },
      warning: { icon: BellDot, color: "text-yellow-500" },
    };
    
    const { icon: Icon, color } = iconConfig[type];
    return <Icon className={`h-5 w-5 ${color}`} />;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 px-6 py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setFilter(filter === "all" ? "unread" : "all")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Filter notifications"
            >
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={markAllAsRead}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Mark all as read
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notification settings"
            >
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="flex mt-4 border-b border-gray-200 dark:border-gray-800">
          <button
            className={`pb-2 px-4 font-medium text-sm ${filter === "all" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`pb-2 px-4 font-medium text-sm ${filter === "unread" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
        </div>
      </header>

      {/* Notification List */}
      <main className="flex-1 overflow-y-auto px-2 py-2">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <BellDot className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between p-4 rounded-lg cursor-pointer transition-all 
                  hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700
                  ${notification.status === "unread" ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500" : "bg-white dark:bg-gray-800"}`}
                onClick={() => markAsRead(notification.id)}
              >
                {/* Icon */}
                <div className="mr-3 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-medium text-gray-900 dark:text-gray-100">
                        {notification.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {notification.date}
                        </span>
                        {notification.time && (
                          <span className="block text-xs text-gray-400 dark:text-gray-500">
                            {notification.time}
                          </span>
                        )}
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="ml-3 flex items-center">
                  {notification.status === "unread" && (
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute right-4 top-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-64 z-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Notification Settings</h3>
            <button onClick={() => setShowSettings(false)}>
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Push notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Sound alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};