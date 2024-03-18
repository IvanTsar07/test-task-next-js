export const loadPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  const posts = await response.json();

  return posts;
};

export const loadPost = async (postId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      cache: "force-cache",
    }
  );
  const post = await response.json();

  return post;
};

export const loadComments = async (postId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    {
      cache: "force-cache",
    }
  );
  const comments = await response.json();

  return comments;
};
