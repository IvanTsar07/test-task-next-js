"use client";

import { useEffect } from "react";
import { Avatar, Col, Divider, Flex, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { postsSlice } from "@/lib/features/posts/postsSlice";
import { selectPostById } from "@/lib/features/posts/selectors";

export default function PostPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const postId = params.id;
  const post = useAppSelector(selectPostById(Number(postId)));

  useEffect(() => {
    dispatch(postsSlice.actions.loadComments({ postId }));
  }, [postId]);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <main className="mt-20">
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Flex
            justify="start"
            align="center"
            gap={16}
            style={{ width: "100%", height: "100%" }}
          >
            <Avatar
              style={{ background: "rgba(255,255,255, 0.25)" }}
              size={64}
              icon={<UserOutlined />}
            />

            <span>{post.user?.name}</span>
          </Flex>
        </Col>
        <Col span={12}>
          <Typography.Title
            level={1}
            className="text-center"
          >
            {post.title}
          </Typography.Title>
        </Col>
        <Col span={4}>
          <Flex
            justify="end"
            align="center"
            style={{ width: "100%", height: "100%" }}
          >
            <span>{post.user?.email}</span>
          </Flex>
        </Col>
        <Col span={2}></Col>
      </Row>

      <Row className="mt-20">
        <Col span={6}></Col>
        <Col span={12}>{post.body}</Col>
        <Col span={6}></Col>
      </Row>

      <Row className="mt-20">
        <Col span={6}></Col>
        <Col span={12}>
          <Typography.Title level={3}>Comments: </Typography.Title>
          <ul>
            {post.comments.map(comment => (
              <li
                key={comment.id}
                className="m-6"
              >
                <Flex
                  justify="start"
                  align="center"
                  gap={16}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Flex
                    justify="start"
                    align="center"
                    gap={16}
                    style={{ maxWidth: "300px" }}
                  >
                    <Avatar
                      style={{ background: "rgba(255,255,255, 0.25)" }}
                      size={48}
                      icon={<UserOutlined />}
                    />

                    <Paragraph
                      ellipsis
                      style={{ width: 200, color: "#FFFFFFA6" }}
                    >
                      {comment.email}
                    </Paragraph>
                  </Flex>
                  <p>{comment.body}</p>
                </Flex>

                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />
              </li>
            ))}
          </ul>
        </Col>
        <Col span={6}></Col>
      </Row>
    </main>
  );
}
