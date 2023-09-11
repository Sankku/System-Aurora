import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import LoadMore from "@/components/LoadMore";
import { fetchAllProjects } from "@/lib/actions";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";

import project1 from "../public/project1.png";
import project2 from "../public/project2.png";
import project3 from "../public/project3.png";
import project4 from "../public/project4.png";
import project5 from "../public/project5.png";

const imagesItems = [
  <Image className="h-full w-full" src={project1} alt="teste" />,
  <Image className="h-full w-full" src={project2} alt="teste" />,
  <Image className="h-full w-full" src={project3} alt="teste" />,
  <Image className="h-full w-full" src={project4} alt="teste" />,
  <Image className="h-full w-full" src={project5} alt="teste" />,
];

type SearchParams = {
  category?: string;
  endcursor?: string;
};

type Props = {
  searchParams: SearchParams;
};

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center p-8">
          <div className="mb-10 flex flex-col  justify-center space-y-6">
            <h1 className="text-4xl font-bold md:text-5xl">
              Discover amazing projects and connect with the best developers
            </h1>
          </div>
          <Carousel items={imagesItems} />
        </main>
      </section>
    );
  }

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;
