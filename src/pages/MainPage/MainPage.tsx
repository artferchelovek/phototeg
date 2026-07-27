import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import type { AllPost } from "../../types/post.ts";
import { fetchAllPosts } from "../../utils/post.ts";
import PostElement from "../../components/Post/PostElement.tsx";
import { useNavigate } from "react-router-dom";
import Add from "../../assets/add.svg?react";

export default function MainPage() {
  const [posts, setPosts] = useState<AllPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const posts = await fetchAllPosts();
        console.log(posts);
        if (posts.success) setPosts(posts.data);
      } catch (e) {
        console.error(e);
      }
    };

    getAllPosts();
  }, []);

  return (
    <div className={styles.mainBlock}>
      <div className={styles.addPost} onClick={() => navigate("/create")}>
        <Add />
        <p>Создать пост</p>
      </div>
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostElement key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
