import VideoZooming from '@/components/VideoZooming'

export default function Index() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            Welcome to Our Vision
          </h1>

        </div>
      </section>

      <VideoZooming />
    </>
  )
}
