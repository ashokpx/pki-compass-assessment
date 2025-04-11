// Custom Flowbite theme configuration
export const flowbiteTheme = {
  // Card theme customization
  card: {
    root: {
      base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
      children: "flex h-full flex-col justify-center gap-4 p-6",
      horizontal: {
        off: "flex-col",
        on: "flex-col md:flex-row",
      },
      href: "hover:bg-gray-100 dark:hover:bg-gray-700",
    },
    img: {
      base: "",
      horizontal: {
        off: "rounded-t-lg",
        on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
      },
    },
  },
  
  // Alert theme customization
  alert: {
    root: {
      base: "flex flex-col gap-2 p-4 text-sm",
      borderAccent: "border-t-4",
      wrapper: "flex items-center",
      color: {
        info: "text-blue-700 bg-blue-100 border-blue-500 dark:bg-blue-200 dark:text-blue-800",
        gray: "text-gray-700 bg-gray-100 border-gray-500 dark:bg-gray-200 dark:text-gray-800",
        failure: "text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800",
        success: "text-green-700 bg-green-100 border-green-500 dark:bg-green-200 dark:text-green-800",
        warning: "text-yellow-700 bg-yellow-100 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-800",
      },
      icon: "mr-3 inline h-5 w-5 flex-shrink-0",
      rounded: "rounded-lg",
    },
  },
  
  // Badge theme customization
  badge: {
    root: {
      base: "flex h-fit items-center gap-1 font-semibold",
      color: {
        info: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300",
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600",
        failure: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
        success: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300",
      },
      href: "group",
      size: {
        xs: "p-1 text-xs",
        sm: "p-1.5 text-sm",
      },
    },
    icon: {
      off: "rounded px-2 py-0.5",
      on: "rounded-full p-1.5",
      size: {
        xs: "w-3 h-3",
        sm: "w-3.5 h-3.5",
      },
    },
  },
  
  // Button theme customization
  button: {
    root: {
      base: "group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none",
      color: {
        blue: "text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        gray: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
        green: "text-white bg-green-700 border border-transparent hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        purple: "text-white bg-purple-700 border border-transparent hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
        red: "text-white bg-red-700 border border-transparent hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
        yellow: "text-white bg-yellow-400 border border-transparent hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
      },
      disabled: "cursor-not-allowed opacity-50",
      isProcessing: "cursor-wait",
      outline: {
        off: "",
        on: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
        pill: {
          off: "rounded-lg",
          on: "rounded-full"
        },
        size: {
          xs: "px-2 py-1 text-xs",
          sm: "px-3 py-1.5 text-sm",
          md: "px-4 py-2 text-sm",
          lg: "px-5 py-2.5 text-base",
          xl: "px-6 py-3 text-base",
        },
      },
    },
    inner: {
      base: "flex items-center",
    },
    label: "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800",
    outline: {
      pill: "border",
      color: {
        blue: "border-blue-700 dark:border-blue-500 text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-blue-300 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800",
        gray: "border-gray-600 dark:border-gray-600 text-gray-600 hover:text-white hover:bg-gray-900 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700",
        green: "border-green-700 dark:border-green-500 text-green-700 hover:text-white hover:bg-green-800 focus:ring-green-300 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800",
        purple: "border-purple-700 dark:border-purple-500 text-purple-700 hover:text-white hover:bg-purple-800 focus:ring-purple-300 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-purple-900",
        red: "border-red-700 dark:border-red-500 text-red-700 hover:text-white hover:bg-red-800 focus:ring-red-300 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
        yellow: "border-yellow-400 dark:border-yellow-300 text-yellow-400 hover:text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
      },
    },
  },
  
  // Progress theme customization
  progress: {
    root: {
      base: "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
      label: "mb-1 flex justify-between font-medium dark:text-white",
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
        xl: "h-6",
      },
    },
    bar: {
      base: "rounded-full text-center font-medium leading-none text-blue-300 dark:text-blue-100",
      color: {
        blue: "bg-blue-600 dark:bg-blue-500",
        gray: "bg-gray-600 dark:bg-gray-300",
        green: "bg-green-600 dark:bg-green-500",
        red: "bg-red-600 dark:bg-red-500",
        yellow: "bg-yellow-400 dark:bg-yellow-300",
        purple: "bg-purple-600 dark:bg-purple-500",
        indigo: "bg-indigo-600 dark:bg-indigo-500",
      },
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
        xl: "h-6",
      },
    },
  },
}; 