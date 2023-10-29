import React from 'react'

import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import CourseSideBar from '@/components/CourseSideBar'


type Props = {
    params: {
        slug: string[]
    }
}

const CoursePage = async ({ params: { slug } } : Props) => {
    const [courseId, unitIndexParam, chapterIndexParam] = slug
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            units: {
                include: {
                    chapters: true
                }
            }
        }
    })
    if (!course) {
        return redirect('/gallery')
    }

    let unitIndex = parseInt(unitIndexParam)
    let chapterIndex = parseInt(chapterIndexParam)

    const unit = course.units[unitIndex]

    if (!unit) {
        return redirect('/gallery')
    }

    const chapter = unit.chapters[chapterIndex]

    if (!chapter) {
        return redirect('/gallery')
    }

  return (
    <div>
        <CourseSideBar course={course} currentChapterId={chapter.id} />
        <div>
            
        </div>
    </div>
  )
}

export default CoursePage