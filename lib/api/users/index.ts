export const loadUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  const users = await response.json();

  return users;
};

export const loadUser = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      cache: "force-cache",
    }
  );
  const user = await response.json();

  return user;
};
