import Navbar from "@/components/Navbar"
import TaskBoard from "@/components/task-board"

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-800 dark:bg-[#121212] dark:text-white h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <TaskBoard />
      </div>
    </main>
  )
}