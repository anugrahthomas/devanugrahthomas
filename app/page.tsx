import Header from '@/components/Header';
import Hero from '@/components/Hero';

const Home = () => {
  return (
    <div>
      <Header />

      <div className='lg:mt-24 mt-10 p-4'>
        <Hero />
      </div>

      <div className="h-screen">
        a
      </div>
    </div>
  )
}

export default Home;