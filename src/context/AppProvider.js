import React, { useState } from "react";

export const AppContext = React.createContext();
function AppProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFriendVisible, setisAddFriendVisible] = useState(false);
  const [userContext, setuserContext] = useState("");
  const [selectedRoomId,setSelectedRoomId]=useState("");

  
  const clearState = () => {
    setIsModalOpen(false);
    setisAddFriendVisible(false);
    setuserContext("");
    setSelectedRoomId("");
  };
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        clearState,
        isAddFriendVisible,
        setisAddFriendVisible,
        userContext,
        setuserContext,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;