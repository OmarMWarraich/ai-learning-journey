import SignInButton from '@/components/SignInButton'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">AI Course Generator</h1>
      <p className="text-lg text-gray-600">
        with OpenAI
      </p>
      <div className="mt-8 rounded-md bg-slate-700">
        <SignInButton />        
      </div>
    </div>
  )
}
