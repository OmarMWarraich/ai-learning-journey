import CreateCourseForm from '@/components/CreateCourseForm'
import { Card } from '@/components/ui/card'
import { getAuthSession } from '@/lib/auth'
import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const CreatePage = async (props: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect('./gallery')
    }
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
        <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
            Learning Journey
        </h1>
        <Card className="flex p-4 mt-6 rounded-none bg-slate-800">
            <InfoIcon className="w-8 h-8 mr-3 text-blue-400" />
            <div>
                Enter in a course title, or what you want to learn about. 
                Then enter a list of units, which are the specifics you want
                to learn about. And our AI will create a course for you!
            </div>
        </Card>
        <CreateCourseForm />
    </div>
  )
}

export default CreatePage