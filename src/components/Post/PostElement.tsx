import styles from "./Post.module.css";
import type { AllPost, Image } from "../../types/post.ts";
import { convertDate } from "../../utils/convertDate.ts";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export default function PostElement({ post }: { post: AllPost }) {
  const images = post.images.slice(0, 9);
  const slides = images.map((img) => ({ src: img.link }));

  const { hour, min, month, day } = convertDate(post.createdAt);
  const [index, setIndex] = useState<number>(-1);

  return (
    <div className={styles.postik}>
      <p className={styles.title}>{post.title}</p>
      {post.description && (
        <p className={styles.description}>{post.description}</p>
      )}

      {images.length > 0 && (
        <div className={styles.postImages} data-count={images.length}>
          {images.map((image: Image, index: number) => (
            <img
              key={image.id}
              src={image.link}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              onClick={() => setIndex(index)}
            />
          ))}
        </div>
      )}

      <div className={styles.dateAndAll}>
        <p>
          {day}.{month} {hour}:{min}
        </p>
        {post.images.length > 9 && (
          <p className={styles.allPhotos}>Показать все фото</p>
        )}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
