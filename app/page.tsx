import Feed from "@components/Feed"
const Home : React.FC = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className="head_text text-center">
            Prompts
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">Discover and share</span>
        </h1>
        <p className="desc text-center">
          this is a platform for user to share prompts
        </p>
        <Feed/>
    </section>
  )
}


export default Home