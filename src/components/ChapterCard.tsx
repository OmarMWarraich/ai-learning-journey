'use client'

import React from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { useToast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'

type Props = {
    chapter: Chapter;
    chapterIndex: number;
    completedChapters: Set<String>;
    setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
}

export type ChapterCardHandler = {
    triggerLoad: () => void
}

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
    const {toast} = useToast()    
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const {mutate: getChapterInfo, isLoading} = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/chapter/getInfo', {
                chapterId: chapter.id
            })
            return response.data
        }
    })

    const addChapterIdToSet = React.useCallback(() => {
        setCompletedChapters((prev) => {
          const newSet = new Set(prev);
          newSet.add(chapter.id);
          return newSet;
        });
      }, [chapter.id, setCompletedChapters]);

    React.useEffect(() => {
    if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet;
    }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
        async triggerLoad() {
            if (chapter.videoId) {
                addChapterIdToSet()
                return
            }
            getChapterInfo(undefined, {
                onSuccess: () => {
                    setSuccess(true)
                    addChapterIdToSet()
                },
                onError: (err) => {
                    console.error(err)
                    setSuccess(false)
                    toast({
                        title: 'Error',
                        description: 'Failed to load chapter info',
                        variant: 'destructive',
                        duration: 5000,
                    })
                    addChapterIdToSet()
                }
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
            {isLoading && <Loader2 className= "animate-spin" /> }
    </div>
  )
});

ChapterCard.displayName = 'ChapterCard'

export default ChapterCard