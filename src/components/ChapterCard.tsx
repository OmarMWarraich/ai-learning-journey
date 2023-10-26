'use client'

import React from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'

type Props = {
    chapter: Chapter
    chapterIndex: number
}

export type ChapterCardHandler = {
    triggerLoad: () => void
}

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(({ chapter, chapterIndex }, ref) => {
    
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const {mutate: getChapterInfo, isLoading} = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/chapter/getInfo')
            return response.data
        }
    })

    React.useImperativeHandle(ref, () => ({
        async triggerLoad() {
            getChapterInfo(undefined, {
                onSuccess: () => {
                    console.log('success')
                },
                })
        },
    }))

  return (
    <div 
        key={chapter.id} 
        className={cn(
            "px-4 py-2 mt-2 rounded flex justify-between", {
                "bg-secondary": success === null,
                "bg-red-500": success === false,
                "bg-green-500": success === true
            }
        )}
    >
        <h5>
            Chapter {chapterIndex + 1}: {chapter.name}
        </h5>
    </div>
  )
});

ChapterCard.displayName = 'ChapterCard'

export default ChapterCard