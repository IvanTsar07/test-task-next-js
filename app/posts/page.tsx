"use client";

import { loadPosts } from "@/lib/api/posts";
import { postsSlice } from "@/lib/features/posts/postsSlice";
import { selectExtendedPostsList } from "@/lib/features/posts/selectors";
import { PostModel } from "@/lib/features/posts/types";
import { usersSlice } from "@/lib/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { randomDate } from "@/lib/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex } from "antd";
import Link from "next/link";
import { useEffect } from "react";

export default function PostsPage() {
  const dispatch = useAppDispatch();
  const postsList = useAppSelector(selectExtendedPostsList);

  useEffect(() => {
    loadPosts().then((posts: PostModel[]) => {
      dispatch(
        postsSlice.actions.setPosts({
          posts: posts.map(post => {
            return {
              ...post,
              createdAt: randomDate(new Date(2023, 0, 1), new Date()),
            };
          }),
        })
      );
      dispatch(usersSlice.actions.loadUsers({}));
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl mb-10">Posts List</h1>

      <ul
        role="list"
        className="divide-y divide-gray-100"
      >
        {postsList.map(post => (
          <li
            key={post.id}
            className="p-3"
          >
            <Flex
              justify="space-between"
              gap={16}
              align="center"
              style={{ width: "100%" }}
            >
              <Flex
                justify="start"
                align="center"
                gap={16}
              >
                <Avatar
                  style={{ background: "rgba(255,255,255, 0.25)" }}
                  size={48}
                  icon={<UserOutlined />}
                />

                <Flex
                  justify="start"
                  wrap="wrap"
                  style={{ maxWidth: 400 }}
                >
                  <p className="text-sm font-semibold leading-6 text-gray-50 w-full">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500 w-full">
                    {post.user?.email || ""}
                  </p>
                </Flex>
              </Flex>

              <div>
                <p className="text-sm leading-6 text-gray-300 w-full text-right">
                  {post.user?.company.name || ""}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500 w-full text-right">
                  <time dateTime={post.formattedCreatedAt}>
                    {post.formattedCreatedAt}
                  </time>
                </p>
              </div>
            </Flex>
          </li>
        ))}
      </ul>
    </main>
  );
}
