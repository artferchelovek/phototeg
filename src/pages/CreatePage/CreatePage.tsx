import styles from "./CreatePage.module.css";
import { type ChangeEvent, useState } from "react";
import { uploadPost } from "../../utils/post.ts";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import * as React from "react";

interface PostInfo {
  title: string;
  description: string;
  diskLink: string;
}

function InputBlock({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: keyof PostInfo;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.input}>
      <p>{label}</p>
      <input
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        type="text"
      />
    </div>
  );
}

function FromDisk(props: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postInfo: PostInfo;
  navigate: NavigateFunction;
}) {
  const uploadPostFromDisk = async () => {
    const res = await uploadPost(props.postInfo);
    if (!res.success) console.error(res);
    else props.navigate("/");
  };

  return (
    <div className={styles.inputs}>
      <InputBlock
        label="Название поста"
        onChange={props.onChange}
        name="title"
        value={props.postInfo.title}
      />
      <InputBlock
        label="Описание (необязательно)"
        onChange={props.onChange}
        name="description"
        value={props.postInfo.description}
      />
      <InputBlock
        label="Ссылка на диск"
        onChange={props.onChange}
        name="diskLink"
        value={props.postInfo.diskLink}
      />
      <button onClick={() => uploadPostFromDisk()} className={styles.upload}>
        Опубликовать
      </button>
    </div>
  );
}

export default function CreatePage() {
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<PostInfo>({
    title: "",
    description: "",
    diskLink: "",
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.createPageBlock}>
      <div className={styles.chooseUpload}>
        <p className={styles.active}>Ссылка на диск</p>
        <p>Загрузить на диск</p>
      </div>
      <FromDisk
        navigate={navigate}
        onChange={changeInput}
        postInfo={postInfo}
      />
    </div>
  );
}
