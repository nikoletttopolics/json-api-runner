let MOCK_USERS = [
  {
    userId: 1,
    name: "John",
  },
  {
    userId: 2,
    name: "Jane",
  },
  {
    userId: 3,
    name: "Chris",
  },
  {
    userId: 4,
    name: "Peter",
  },
];

const result = [];
// todo: bug reset result state when responses sent

const userService = async (payload) => {
  for (let i = 0; i < payload.length; i++) {
    if (payload[i].endpoint === "getUserProfile") {
      getUserProfile(payload[i].params.userId);
    } else if (payload[i].endpoint === "deleteUserProfile") {
      deleteUserProfile(payload[i].params.userId);
    } else {
      result.push({ error: "Unknown endpoint: " + payload[i].endpoint });
    }
  }

  return result;
};

const getUserProfile = (userId) => {
  const selectedUser = MOCK_USERS.find((user) => user.userId === userId);

  if (selectedUser) {
    result.push({ getUserProfileResponse: selectedUser });
  } else {
    result.push({
      getUserProfileError: `No user found with userId: ${userId}`,
    });
  }
};

const deleteUserProfile = (userId) => {
  // megnézzük, hogy a userId benne van e az adott blokkban
  const doesUserExist = MOCK_USERS.some((user) => user.userId === userId);

  if (doesUserExist) {
    MOCK_USERS = MOCK_USERS.filter((user) => user.userId !== userId);
    result.push({
      deleteUserProfileResponse: `User with userId: ${userId} deleted`,
    });
  } else {
    result.push({
      deleteUserProfileError: `No user found with userId: ${userId}`,
    });
  }
};

module.exports = userService;
