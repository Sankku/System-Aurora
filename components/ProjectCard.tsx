"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  incrementLikes,
  incrementViews,
  fetchToken,
  decrementLikes,
  getLikes,
} from "@/lib/actions";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikes = async () => {
    setIsLiking(true);

    const { token } = await fetchToken();

    try {
      if (isLiked) {
        await decrementLikes(id, token);
        setLikes(likes - 1);
      } else {
        await incrementLikes(id, token);
        setLikes(likes + 1);
      }

      // Invierte el estado de "isLiked"
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full">
        <Image
          src={image}
          width={414}
          height={314}
          className="max-w-full max-sh-full object-cover rounded-2xl"
          alt="project image"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image
              className={`flexCenter rounded-full border-solid border-2 hover:bg-red-600 ${isLiking} ? bg-[#838383]`}
              src="/hearth.svg"
              width={17}
              height={17}
              alt="heart"
              onClick={handleLikes}
              style={{ cursor: "pointer" }}
            />
            <p className="text-sm">{likes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image
              className="svg-border"
              src="/eye.svg"
              width={17}
              height={17}
              alt="eye"
            />
            <p className="text-sm">{views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
