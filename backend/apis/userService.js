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

const userService = async (payload) => {
  const result = [];

  for (let i = 0; i < payload.length; i++) {
    if (payload[i].endpoint === "getUserProfile") {
      result.push(getUserProfile(payload[i].params.userId));
    } else if (payload[i].endpoint === "deleteUserProfile") {
      result.push(deleteUserProfile(payload[i].params.userId));
    } else if (payload[i].endpoint === "getUserProfiles") {
      result.push({ getUserProfilesResponse: MOCK_USERS });
    } else {
      result.push({ error: "Unknown endpoint: " + payload[i].endpoint });
    }
  }

  return result;
};

const getUserProfile = (userId) => {
  const selectedUser = MOCK_USERS.find((user) => user.userId === userId);

  if (selectedUser) {
    return { getUserProfileResponse: selectedUser };
  } else {
    return {
      getUserProfileError: `No user found with userId: ${userId}`,
    };
  }
};

const deleteUserProfile = (userId) => {
  const doesUserExist = MOCK_USERS.some((user) => user.userId === userId);

  if (doesUserExist) {
    MOCK_USERS = MOCK_USERS.filter((user) => user.userId !== userId);
    return {
      deleteUserProfileResponse: `User with userId: ${userId} deleted`,
    };
  } else {
    return {
      deleteUserProfileError: `No user found with userId: ${userId}`,
    };
  }
};

module.exports = userService;
