export const loadUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  const users = await response.json();

  return users;
};
