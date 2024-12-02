import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";

type Props = {};

const GalleryPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {courses.map((course) => {
          return <GalleryCourseCard key={course.id} course={course} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
